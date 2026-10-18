import { AfterViewInit, OnInit, Component, ElementRef, ViewChild, computed, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TimelineComponent } from '../../shared/timeline.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService, AuthService } from '../../core/data.service';
import { TableRow } from '../../shared/data-table.component';
import { IconComponent } from '../../shared/icon.component';
import { UploaderComponent } from '../../shared/uploader.component';
interface FieldSpec {
    name: string;
    label: string;
    type?: string;
    options?: string[];
    required?: boolean;
}
@Component({ selector: 'j-entity-panel', imports: [ReactiveFormsModule, IconComponent, UploaderComponent, RouterLink, TimelineComponent], templateUrl: './entity-panel.component.html' })
export class EntityPanelComponent implements OnInit, AfterViewInit {
    kind = input.required<string>();
    row = input.required<TableRow>();
    closed = output<void>();
    data = inject(DataService);
    auth = inject(AuthService);
    fb = inject(FormBuilder);
    form = this.fb.record<string | boolean>({});
    attempted = false;
    @ViewChild('dialog')
    dialog!: ElementRef<HTMLDialogElement>;
    title = computed(() => ({ shipments: 'Shipment details', staff: 'Staff profile & access', engineers: 'Engineer availability', customers: 'Customer overview', inventory: 'Stock adjustment', categories: 'Category details', attendance: 'Attendance correction', locations: 'Office location', escalations: 'Escalation review' } as Record<string, string>)[this.kind()] ?? 'Record details');
    fields = computed<FieldSpec[]>(() => {
        switch (this.kind()) {
            case 'shipments': return [{ name: 'order', label: 'Related order', required: true }, { name: 'courier', label: 'Courier company', required: true }, { name: 'awb', label: 'AWB / tracking number' }, { name: 'trackingUrl', label: 'Tracking URL', type: 'url' }, { name: 'date', label: 'Dispatch date', type: 'date' }, { name: 'status', label: 'Shipment status', options: ['Awaiting courier', 'Packed', 'Dispatched', 'In transit', 'Delivered', 'Issue'] }, { name: 'notes', label: 'Shipment notes', type: 'textarea' }];
            case 'staff':
            case 'engineers': return [{ name: 'name', label: 'Full name', required: true }, { name: 'email', label: 'Email', type: 'email', required: true }, { name: 'role', label: 'Role / privilege level', options: ['Engineer', 'Office staff', 'E-commerce staff', 'Administrator'] }, { name: 'branch', label: 'Branch', options: ['Main showroom · demo'] }, { name: 'skills', label: 'Skills' }, { name: 'status', label: 'Availability', options: ['Available', 'Busy', 'Offline', 'Overloaded', 'Delayed'] }, { name: 'active', label: 'Account state', options: ['Active', 'Inactive'] }];
            case 'inventory': return [{ name: 'product', label: 'Product', options: this.data.products().map(p => p.name) }, { name: 'branch', label: 'Branch', options: ['Main showroom · demo'] }, { name: 'movement', label: 'Adjustment type', options: ['Add stock', 'Remove stock', 'Recount'] }, { name: 'quantity', label: 'Units', type: 'number', required: true }, { name: 'reason', label: 'Adjustment reason', type: 'textarea', required: true }];
            case 'attendance': return [{ name: 'name', label: 'Employee', required: true }, { name: 'date', label: 'Date', type: 'date', required: true }, { name: 'checkIn', label: 'Corrected check-in', type: 'time' }, { name: 'checkOut', label: 'Corrected check-out', type: 'time' }, { name: 'reason', label: 'Correction reason', type: 'textarea', required: true }, { name: 'audit', label: 'Audit history', type: 'textarea' }];
            case 'locations': return [{ name: 'name', label: 'Branch name', required: true }, { name: 'address', label: 'Address', type: 'textarea', required: true }, { name: 'latitude', label: 'Latitude', type: 'number' }, { name: 'longitude', label: 'Longitude', type: 'number' }, { name: 'radius', label: 'Geofence radius (meters)', type: 'number', required: true }, { name: 'staff', label: 'Authorized staff', type: 'textarea' }, { name: 'active', label: 'Branch state', options: ['Active', 'Inactive'] }];
            case 'escalations': return [{ name: 'ticket', label: 'Service ticket', required: true }, { name: 'reason', label: 'Reason', required: true }, { name: 'findings', label: 'Engineer findings', type: 'textarea', required: true }, { name: 'troubleshooting', label: 'Troubleshooting history', type: 'textarea' }, { name: 'senior', label: 'Senior engineer', options: ['Awaiting assignment', ...this.data.engineers().map(e => e.name)] }, { name: 'status', label: 'Escalation status', options: ['Open', 'Under review', 'Resolved'] }, { name: 'notes', label: 'Additional notes', type: 'textarea' }];
            case 'customers': return [{ name: 'name', label: 'Customer name', required: true }, { name: 'email', label: 'Email address', type: 'email' }, { name: 'phone', label: 'Contact number', type: 'tel' }, { name: 'orders', label: 'Order count', type: 'number' }, { name: 'services', label: 'Service requests', type: 'number' }, { name: 'notes', label: 'Contact preferences', type: 'textarea' }];
            default: return [{ name: 'name', label: 'Category name', required: true }, { name: 'slug', label: 'Category URL slug', required: true }, { name: 'description', label: 'Description', type: 'textarea' }, { name: 'active', label: 'Visibility', options: ['Active', 'Inactive'] }];
        }
    });
    relatedOrders = computed(() => this.data.orders().filter(o => o.customer === this.row()['name']));
    relatedTickets = computed(() => this.data.tickets().filter(t => t.customer === this.row()['name']));
    shipmentTimeline = computed(() => this.data.orders().find(o => o.id === this.row()['order'])?.timeline ?? []);
    historyBase(): string { return this.auth.currentUser()?.role === 'ecommerce' ? '/ecommerce' : '/admin'; }
    permitted(): boolean {
        const k = this.kind();
        if (k === 'escalations' && this.auth.has('workAssignedJobs'))
            return true;
        return this.auth.has(k === 'staff' ? 'manageStaff' : ['inventory', 'shipments'].includes(k) ? 'manageOrders' : ['escalations', 'engineers'].includes(k) ? 'manageServices' : 'view');
    }
    ngOnInit(): void {
        for (const field of this.fields()) {
            let value = this.row()[field.name];
            if (this.kind() === 'inventory' && field.name === 'product')
                value = this.row()['name'];
            if (this.kind() === 'locations' && field.name === 'radius')
                value = 200;
            const escalation = this.kind() === 'escalations' ? this.data.escalations().find(e => e.id === this.row().id) : undefined;
            if (escalation && field.name in escalation)
                value = String(escalation[field.name as keyof typeof escalation]);
            const fallback = field.options?.[0] ?? '';
            this.form.addControl(field.name, this.fb.nonNullable.control(String(value ?? fallback), field.required ? [Validators.required, ...(field.type === 'number' ? [Validators.min(field.name === 'quantity' ? 1 : 0)] : [])] : []));
        }
        for (const cap of ['view', 'manageOrders', 'manageServices', 'manageStaff'])
            this.form.addControl(cap, this.fb.nonNullable.control(cap === 'view'));
    }
    ngAfterViewInit(): void { this.dialog.nativeElement.showModal(); }
    submit(): void {
        this.attempted = true;
        if (this.form.invalid || !this.permitted())
            return;
        this.data.integration(this.title());
    }
}
