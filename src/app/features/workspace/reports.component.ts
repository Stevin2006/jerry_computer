import { DataRegionComponent } from '../../shared/data-region.component';
import { Component, computed, inject, signal } from '@angular/core';
import { DataService } from '../../core/data.service';
import { pageContext } from './context';
import { IconComponent } from '../../shared/icon.component';
import { DataTableComponent, TableColumn, TableRow } from '../../shared/data-table.component';
@Component({ selector: 'j-reports', imports: [DataRegionComponent, IconComponent, DataTableComponent], templateUrl: './reports.component.html' })
export class ReportsComponent {
    data = inject(DataService);
    ctx = pageContext();
    engineer = this.ctx.role() === 'engineer';
    tabs = this.engineer ? ['Engineer performance', 'Attendance'] : ['Sales', 'Inventory', 'Service', 'Engineer performance', 'Attendance', 'Payroll'];
    tab = signal(this.tabs[0]!);
    metrics = computed(() => this.data.reportPreviews[this.tab()]?.metrics ?? []);
    bars = computed(() => this.data.reportPreviews[this.tab()]?.bars ?? []);
    distribution = computed(() => this.data.reportPreviews[this.tab()]?.distribution ?? []);
    columns = computed<TableColumn[]>(() => [{ key: 'id', label: 'Reference' }, { key: 'name', label: this.tab() === 'Inventory' ? 'Product' : this.tab() === 'Sales' ? 'Customer' : 'Record' }, { key: 'value', label: 'Value / summary' }, { key: 'status', label: 'Status', badge: true }]);
    rows = computed<TableRow[]>(() => {
        switch (this.tab()) {
            case 'Sales': return this.data.orders().map(o => ({ id: o.id, name: o.customer, value: '₹' + o.total.toLocaleString('en-IN'), status: o.status }));
            case 'Inventory': return this.data.products().map(p => ({ id: p.id, name: p.name, value: p.stock + ' units', status: p.stock ? 'In stock' : 'Out of stock' }));
            case 'Service': return this.data.tickets().map(t => ({ id: t.id, name: t.device, value: t.priority, status: t.status }));
            case 'Attendance': return this.data.attendance().map(a => ({ id: a.id, name: a.name, value: a.duration, status: a.verification }));
            case 'Payroll': return this.data.payroll().map(p => ({ id: p.id, name: p.employee, value: '₹' + p.net.toLocaleString('en-IN'), status: p.status }));
            default: return this.data.engineers().filter(e => !this.engineer || e.name === 'Vishnu Kumar').map(e => ({ id: e.id, name: e.name, value: e.jobs + ' current jobs', status: e.status }));
        }
    });
}
