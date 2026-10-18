import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';
import { AuthService, DataService } from './core/data.service';
import { DataTableComponent } from './shared/data-table.component';
import { CheckoutComponent } from './features/forms/checkout.component';
import { ServiceFormComponent } from './features/forms/service-form.component';
import { ProductFormComponent } from './features/forms/product-form.component';
import { NAVIGATION } from './core/navigation';
describe('Jerry frontend workflows', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [provideRouter(routes), provideHttpClient()] });
        Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value() { this.setAttribute('open', ''); } });
        Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value() { this.removeAttribute('open'); this.dispatchEvent(new Event('close')); } });
    });
    it('loads the storefront and product catalogue through lazy routes', async () => {
        const h = await RouterTestingHarness.create('/');
        expect(h.routeNativeElement?.textContent).toContain('Better technology.');
        await h.navigateByUrl('/shop');
        expect(h.routeNativeElement?.querySelectorAll('j-product-card').length).toBe(6);
    });
    it('adds a product to the local cart and enforces display stock', async () => {
        const h = await RouterTestingHarness.create('/shop/products/asus-vivobook');
        const add = [...(h.routeNativeElement?.querySelectorAll('button') ?? [])].find(b => b.textContent?.includes('Add to cart'));
        add?.click();
        await h.fixture.whenStable();
        const data = TestBed.inject(DataService);
        expect(data.cartCount()).toBe(1);
        data.changeQuantity('asus-vivobook', 999);
        expect(data.cartCount()).toBe(12);
        await h.navigateByUrl('/cart');
        expect(h.routeNativeElement?.textContent).toContain('ASUS Vivobook 15');
    });
    it('keeps checkout empty until items exist, then validates delivery data', async () => {
        const h = await RouterTestingHarness.create('/checkout');
        expect(h.routeNativeElement?.textContent).toContain('Your cart needs a little something first.');
        const data = TestBed.inject(DataService);
        data.addToCart(data.products()[0]!);
        const page = await h.navigateByUrl('/checkout', CheckoutComponent);
        page.next();
        expect(page.step()).toBe(1);
        expect(page.form.invalid).toBe(true);
        page.form.setValue({ name: 'Ananya Menon', email: 'ananya@example.invalid', phone: '9876543210', address: 'Demo building, Example road', city: 'Demo city', state: 'Kerala', pin: '682001', payment: 'online' });
        page.next();
        expect(page.step()).toBe(2);
        expect(data.orders().length).toBe(4);
    });
    it('excludes internal notes and other customers from customer ticket views', async () => {
        const h = await RouterTestingHarness.create('/account/services/SR-2041');
        expect(h.routeNativeElement?.textContent).toContain('Thermal throttling');
        expect(h.routeNativeElement?.textContent).not.toContain('Confirm estimate with supervisor');
        await h.navigateByUrl('/account/services/SR-2040');
        expect(h.routeNativeElement?.textContent).toContain('Service request not found');
    });
    it('requires an on-site address and leaves in-store service free of location capture', async () => {
        const h = await RouterTestingHarness.create('/account/services/new');
        const page = await h.navigateByUrl('/account/services/new', ServiceFormComponent);
        expect(h.routeNativeElement?.querySelector('j-location')).toBeNull();
        page.setMode('On-site');
        h.detectChanges();
        expect(page.form.controls.address.invalid).toBe(true);
        expect(h.routeNativeElement?.querySelector('j-location')).not.toBeNull();
        page.setMode('In-store');
        expect(page.form.controls.address.valid).toBe(true);
    });
    it('shows explicit demo permissions and permits only the relevant workspace capabilities', async () => {
        const h = await RouterTestingHarness.create('/ecommerce/orders');
        const auth = TestBed.inject(AuthService);
        expect(auth.sessionState()).toBe('demo');
        expect(auth.has('manageOrders')).toBe(true);
        expect(auth.has('manageStaff')).toBe(false);
        await h.navigateByUrl('/engineer/jobs');
        expect(auth.has('manageOrders')).toBe(false);
        expect(auth.has('workAssignedJobs')).toBe(true);
        expect(NAVIGATION['engineer']?.some(n => n.path === 'shipments')).toBe(false);
    });
    it('appends engineer work history and keeps the original record', async () => {
        await RouterTestingHarness.create('/engineer/jobs/SR-2041');
        const data = TestBed.inject(DataService);
        const initial = data.tickets()[0]!.logs.length;
        data.addWorkLog('SR-2041', { id: 'new-log', date: 'Now', author: 'Vishnu Kumar', diagnosis: 'Cooling test', work: 'Cooling system cleaned and tested.', parts: 'None', minutes: 30, tests: 'Thermal test passed', visibility: 'customer' });
        expect(data.tickets()[0]!.logs.length).toBe(initial + 1);
        expect(data.tickets()[0]!.logs[0]!.id).toBe('log-1');
        data.transition('SR-2041', 'Testing');
        expect(data.tickets()[0]!.status).toBe('Testing');
    });
    it('never requests geolocation when attendance first opens', async () => {
        const getCurrentPosition = vi.fn();
        Object.defineProperty(navigator, 'geolocation', { configurable: true, value: { getCurrentPosition } });
        const h = await RouterTestingHarness.create('/engineer/attendance');
        expect(getCurrentPosition).not.toHaveBeenCalled();
        expect(h.routeNativeElement?.textContent).toContain('200 meters');
    });
    it('validates a new catalogue product instead of publishing an empty record', async () => {
        const h = await RouterTestingHarness.create('/admin/products/new');
        const page = await h.navigateByUrl('/admin/products/new', ProductFormComponent);
        page.submit();
        expect(page.form.invalid).toBe(true);
        expect(TestBed.inject(DataService).products().length).toBe(8);
    });
    it('renders the dispatch queue, priority and engineer availability', async () => {
        const h = await RouterTestingHarness.create('/office/dispatch');
        expect(h.routeNativeElement?.textContent).toContain('SR-2040');
        expect(h.routeNativeElement?.textContent).toContain('Critical');
        expect(h.routeNativeElement?.textContent).toContain('Sneha Raj');
    });
});
describe('shared data table states', () => {
    beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter([])] }));
    it('renders loading, error recovery and empty states', async () => {
        const f = TestBed.createComponent(DataTableComponent);
        f.componentRef.setInput('columns', [{ key: 'id', label: 'Record' }]);
        f.componentRef.setInput('rows', []);
        f.componentRef.setInput('state', 'loading');
        f.detectChanges();
        expect(f.nativeElement.querySelector('j-skeleton')).toBeTruthy();
        f.componentRef.setInput('state', 'error');
        f.detectChanges();
        expect(f.nativeElement.textContent).toContain('Try again');
        f.componentRef.setInput('state', 'ready');
        f.detectChanges();
        expect(f.nativeElement.textContent).toContain('No records match this view');
    });
});
