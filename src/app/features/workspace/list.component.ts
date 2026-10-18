import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataService } from '../../core/data.service';
import { pageContext } from './context';
import { DataTableComponent, TableColumn, TableRow } from '../../shared/data-table.component';
import { IconComponent } from '../../shared/icon.component';
import { EntityPanelComponent } from './entity-panel.component';
const column = (key: string, label: string, badge = false): TableColumn => ({ key, label, badge });
@Component({ selector: 'j-list', imports: [RouterLink, DataTableComponent, IconComponent, EntityPanelComponent], templateUrl: './list.component.html' })
export class ListComponent {
    queries = toSignal(inject(ActivatedRoute).queryParamMap);
    data = inject(DataService);
    ctx = pageContext();
    kind = this.ctx.kind;
    role = this.ctx.role;
    state = signal('ready');
    priority = signal('all');
    date = signal('');
    selected = signal<TableRow | null>(null);
    title = computed(() => ({ orders: 'Orders', services: 'Service tickets', jobs: 'My jobs', products: 'Products', inventory: 'Inventory', categories: 'Categories', shipments: 'Shipments', customers: 'Customers', staff: 'Staff & access', engineers: 'Engineers', attendance: 'Attendance', locations: 'Office locations', payroll: 'Payroll', escalations: 'Escalations' } as Record<string, string>)[this.kind()] ?? 'Records');
    section = computed(() => ['services', 'jobs', 'engineers', 'escalations'].includes(this.kind()) ? 'SERVICE CENTER' : ['attendance', 'payroll', 'staff', 'locations'].includes(this.kind()) ? 'WORKFORCE' : 'COMMERCE');
    description = computed(() => ({ orders: 'Every order, from a good choice to a happy handover.', services: 'Keep the right details, the right people and the next step in view.', jobs: 'Your assignments, appointments and device care, all together.', products: 'A thoughtful catalogue starts with clear product information.', inventory: 'Know what’s available, what’s running low, and what needs attention.', shipments: 'A clear handover from packed order to courier dispatch.', customers: 'A useful view of the people behind every order and service.', staff: 'The right workspace and capabilities for every team member.', attendance: 'Daily attendance, location status and a clear correction trail.', locations: 'Configure branch locations and the default 200-meter requirement.', payroll: 'Review supplied payroll figures. No calculations or approvals are performed here.', escalations: 'Bring the right expertise to the harder problems.' } as Record<string, string>)[this.kind()] ?? 'Browse and manage sample records.');
    createLink = computed(() => this.kind() === 'products' ? '/admin/products/new' : this.kind() === 'services' ? `/${this.role()}/services/new` : '');
    createLabel = computed(() => this.kind() === 'products' ? 'Add product' : 'Request service');
    columns = computed<TableColumn[]>(() => {
        switch (this.kind()) {
            case 'orders': return [column('id', 'Order'), column('customer', 'Customer'), column('date', 'Placed'), column('total', 'Total'), column('payment', 'Payment', true), column('status', 'Status', true), column('shipment', 'Shipment')];
            case 'services':
            case 'jobs': return [column('id', 'Ticket'), column('device', 'Device & category'), column('customer', 'Customer'), column('priority', 'Priority', true), column('status', 'Status', true), column('engineer', 'Engineer'), column('appointment', 'Appointment')];
            case 'products':
            case 'inventory': return [column('id', 'SKU'), column('name', 'Product'), column('category', 'Category'), column('price', 'Price'), column('stock', 'Stock'), column('status', 'Availability', true)];
            case 'shipments': return [column('id', 'Shipment'), column('order', 'Order'), column('courier', 'Courier'), column('awb', 'AWB'), column('date', 'Dispatch date'), column('status', 'Status', true)];
            case 'engineers':
            case 'staff': return [column('id', 'Staff ID'), column('name', 'Name'), column('skills', 'Skills'), column('branch', 'Branch'), column('jobs', 'Active jobs'), column('status', 'Availability', true)];
            case 'attendance': return [column('id', 'Record'), column('name', 'Employee'), column('date', 'Date'), column('checkIn', 'Check-in'), column('checkOut', 'Check-out'), column('duration', 'Duration'), column('status', 'Verification', true)];
            case 'payroll': return [column('id', 'Payslip'), column('name', 'Employee'), column('period', 'Period'), column('days', 'Days'), column('overtime', 'Overtime'), column('net', 'Sample net pay'), column('status', 'Status', true)];
            case 'customers': return [column('id', 'Customer ID'), column('name', 'Customer'), column('orders', 'Orders'), column('services', 'Services'), column('status', 'Account', true)];
            case 'escalations': return [column('id', 'Escalation'), column('ticket', 'Ticket'), column('reason', 'Reason'), column('senior', 'Senior engineer'), column('status', 'Status', true)];
            case 'locations': return [column('id', 'Branch ID'), column('name', 'Branch'), column('address', 'Address'), column('radius', 'Default requirement'), column('status', 'Status', true)];
            default: return [column('id', 'Category'), column('name', 'Name'), column('description', 'Description'), column('count', 'Products')];
        }
    });
    rows = computed<TableRow[]>(() => {
        const role = this.role();
        switch (this.kind()) {
            case 'orders': return this.data.orders().filter(o => role !== 'account' || o.customer === 'Ananya Menon').map(o => ({ ...o, total: '₹' + o.total.toLocaleString('en-IN'), items: undefined, timeline: undefined, link: `/${role}/orders/${o.id}` }));
            case 'services':
            case 'jobs': return this.data.tickets().filter(t => (role !== 'account' || t.customer === 'Ananya Menon') && (role !== 'engineer' || t.engineer === 'Vishnu Kumar') && (this.priority() === 'all' || t.priority === this.priority())).map(t => ({ id: t.id, device: t.device, customer: t.customer, priority: t.priority, status: t.status, engineer: t.engineer, appointment: t.appointment.replace('T', ' · '), link: `/${role}/${role === 'engineer' ? 'jobs' : 'services'}/${t.id}` }));
            case 'products':
            case 'inventory': return this.data.products().map(p => ({ id: p.id, name: p.name, category: p.category, price: '₹' + p.price.toLocaleString('en-IN'), stock: p.stock, status: p.stock === 0 ? 'Out of stock' : p.stock < 5 ? 'Low stock' : 'In stock', link: this.kind() === 'products' ? `/admin/products/${p.id}/edit` : undefined }));
            case 'shipments': return this.data.shipments().map(s => ({ id: s.id, order: s.orderId, courier: s.courier, awb: s.awb, date: s.dispatchDate, status: s.status }));
            case 'staff':
            case 'engineers': return this.data.engineers().map(e => ({ id: e.id, name: e.name, skills: e.skills.join(' · '), branch: e.branch, jobs: e.jobs, status: e.status, link: this.kind() === 'staff' ? '/admin/staff/' + e.id : undefined }));
            case 'attendance': return this.data.attendance().filter(a => (role !== 'engineer' || a.name === 'Vishnu Kumar') && (!this.date() || a.date === this.date())).map(a => ({ ...a, status: a.verification }));
            case 'payroll': return this.data.payroll().map(p => ({ id: p.id, name: p.employee, period: p.period, days: p.days, overtime: p.overtime, net: '₹' + p.net.toLocaleString('en-IN'), status: p.status, link: '/admin/payroll/' + p.id }));
            case 'customers': return this.data.orders().map((o, i) => ({ id: 'CU-' + (101 + i), name: o.customer, orders: 1, services: this.data.tickets().filter(t => t.customer === o.customer).length, status: 'Demo account' }));
            case 'escalations': return this.data.escalations().map(e => ({ id: e.id, ticket: e.ticketId, reason: e.reason, senior: e.senior, status: e.status }));
            case 'locations': return this.data.brand().branches.map(b => ({ id: b.id, name: b.name, address: b.address, radius: b.radius + ' meters', status: b.active ? 'Active · demo' : 'Inactive' }));
            default: return this.data.categories.map(c => ({ id: c.slug, name: c.name, description: c.description, count: this.data.products().filter(p => p.category === c.slug).length }));
        }
    });
}
