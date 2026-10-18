import { Injectable, computed, signal } from '@angular/core';
import { REPORT_PREVIEWS, DASHBOARD_TREND, ATTENDANCE, BRAND, CATEGORIES, ENGINEERS, ESCALATIONS, NOTIFICATIONS, ORDERS, PAYROLL, PRODUCTS, SHIPMENTS, TICKETS } from './mock-data';
import { AuthPort, CartItem, Product, Role, ServiceTicket, User, WorkLog } from './models';
import { canTransition, cartSubtotal, quantityWithinStock } from './domain.mjs';
@Injectable({ providedIn: 'root' })
export class DataService {
    readonly reportPreviews = REPORT_PREVIEWS;
    readonly dashboardTrend = DASHBOARD_TREND;
    readonly brand = signal(structuredClone(BRAND));
    readonly products = signal(structuredClone(PRODUCTS));
    readonly categories = CATEGORIES;
    readonly orders = signal(structuredClone(ORDERS));
    readonly tickets = signal(structuredClone(TICKETS));
    readonly engineers = signal(structuredClone(ENGINEERS));
    readonly shipments = signal(structuredClone(SHIPMENTS));
    readonly escalations = signal(structuredClone(ESCALATIONS));
    readonly attendance = signal(structuredClone(ATTENDANCE));
    readonly payroll = signal(structuredClone(PAYROLL));
    readonly notifications = signal(structuredClone(NOTIFICATIONS));
    readonly unread = computed(() => this.notifications().filter(n => !n.read).length);
    readonly cart = signal<CartItem[]>([]);
    readonly cartCount = computed(() => this.cart().reduce((s, i) => s + i.quantity, 0));
    readonly subtotal = computed(() => cartSubtotal(this.cart()));
    readonly toast = signal('');
    private toastTimer?: ReturnType<typeof setTimeout>;
    notify(message: string): void { this.toast.set(message); clearTimeout(this.toastTimer); this.toastTimer = setTimeout(() => this.toast.set(''), 5000); }
    integration(action = 'This feature'): void { this.notify(`${action} will be connected to the service API. No changes were submitted.`); }
    addToCart(product: Product, quantity = 1): void {
        if (!product.stock) {
            this.notify('This product is currently out of stock.');
            return;
        }
        const existing = this.cart().find(i => i.product.id === product.id);
        const next = quantityWithinStock((existing?.quantity ?? 0) + quantity, product.stock);
        if (existing && next === existing.quantity) {
            this.notify('Your cart already contains the available demo stock.');
            return;
        }
        if (!next)
            return;
        this.cart.update(items => existing ? items.map(i => i.product.id === product.id ? { ...i, quantity: next } : i) : [...items, { product, quantity: next }]);
        this.notify(`${product.name} added to your demo cart.`);
    }
    changeQuantity(id: string, quantity: number): void { this.cart.update(items => items.map(i => i.product.id === id ? { ...i, quantity: quantityWithinStock(quantity, i.product.stock) } : i).filter(i => i.quantity > 0)); }
    markRead(id?: string): void { this.notifications.update(items => items.map(n => !id || n.id === id ? { ...n, read: true } : n)); }
    transition(id: string, next: string): void {
        const ticket = this.tickets().find(t => t.id === id);
        if (!ticket || !canTransition(ticket.status, next)) {
            this.notify('This transition is unavailable from the current demo status.');
            return;
        }
        this.tickets.update(items => items.map(t => t.id === id ? { ...t, status: next, timeline: [...t.timeline, { title: next, detail: 'Local preview only · not submitted', date: new Date().toLocaleString(), complete: true }] } : t));
        this.notify(`Demo job moved to ${next}. Nothing was sent to the service API.`);
    }
    addWorkLog(id: string, log: WorkLog): void { this.tickets.update(items => items.map(t => t.id === id ? { ...t, logs: [...t.logs, log] } : t)); this.notify('Work log added to this local preview.'); }
    addTicket(ticket: ServiceTicket): void { this.tickets.update(items => [ticket, ...items]); }
}
@Injectable({ providedIn: 'root' })
export class AuthService implements AuthPort {
    readonly currentUser = signal<User | null>(null);
    readonly sessionState = signal<'anonymous' | 'demo' | 'expired'>('anonymous');
    readonly refreshState = signal<'idle' | 'pending' | 'unavailable'>('idle');
    async login(_email: string, _password: string): Promise<void> { throw new Error('Sign-in will be connected to the authentication API. No session was created.'); }
    preview(role: Role): void { this.currentUser.set({ id: 'demo-user', name: role === 'engineer' ? 'Vishnu Kumar' : 'Jerry preview', email: 'demo@example.invalid', role, permissions: role === 'admin' ? ['view', 'manageOrders', 'manageServices', 'manageStaff', 'managePayroll'] : role === 'ecommerce' ? ['view', 'manageOrders'] : role === 'office' ? ['view', 'manageServices'] : role === 'engineer' ? ['view', 'workAssignedJobs'] : ['view'] }); this.sessionState.set('demo'); }
    logout(): void { this.currentUser.set(null); this.sessionState.set('anonymous'); }
    async refreshSession(): Promise<void> { this.refreshState.set('unavailable'); }
    has(permission: User['permissions'][number]): boolean { return this.currentUser()?.permissions.includes(permission) ?? false; }
}
