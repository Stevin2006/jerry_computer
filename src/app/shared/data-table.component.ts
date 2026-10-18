import { ChangeDetectionStrategy, Component, computed, effect, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BadgeComponent, EmptyComponent, SkeletonComponent } from './ui.component';
import { IconComponent } from './icon.component';
export interface TableColumn {
    key: string;
    label: string;
    badge?: boolean;
    secondary?: boolean;
}
export interface TableRow {
    id: string;
    link?: string;
    [key: string]: string | number | undefined;
}
@Component({ selector: 'j-data-table', imports: [RouterLink, BadgeComponent, EmptyComponent, SkeletonComponent, IconComponent], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './data-table.component.html' })
export class DataTableComponent {
    initialQuery = input('');
    constructor() { effect(() => { this.query.set(this.initialQuery()); this.page.set(1); }); }
    columns = input.required<TableColumn[]>();
    rows = input.required<TableRow[]>();
    label = input('Records');
    state = input('ready');
    retry = output<void>();
    inspect = output<TableRow>();
    query = signal('');
    status = signal('all');
    page = signal(1);
    statusOptions = computed(() => [...new Set(this.rows().map(r => String(r['status'] ?? '')).filter(Boolean))]);
    filtered = computed(() => this.rows().filter(r => Object.values(r).join(' ').toLowerCase().includes(this.query().toLowerCase()) && (this.status() === 'all' || r['status'] === this.status())));
    pages = computed(() => Math.max(1, Math.ceil(this.filtered().length / 8)));
    safePage = computed(() => Math.min(this.page(), this.pages()));
    visible = computed(() => this.filtered().slice((this.safePage() - 1) * 8, this.safePage() * 8));
    cell(row: TableRow, key: string): string { return String(row[key] ?? '—'); }
    exportRows(): void { const escape = (v: unknown): string => { const s = String(v ?? ''); return '"' + (/^[=+\-@\t\r]/.test(s) ? "'" : '') + s.replaceAll('"', '""') + '"'; }; const csv = [this.columns().map(c => escape(c.label)).join(','), ...this.filtered().map(r => this.columns().map(c => escape(r[c.key])).join(','))].join('\r\n'); const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' })); const a = document.createElement('a'); a.href = url; a.download = `jerry-${this.label().toLowerCase().replaceAll(' ', '-')}-demo.csv`; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); }
}
