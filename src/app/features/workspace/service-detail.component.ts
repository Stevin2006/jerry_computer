import { DataRegionComponent } from '../../shared/data-region.component';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, DataService } from '../../core/data.service';
import { pageContext } from './context';
import { customerLogs } from '../../core/domain.mjs';
import { BadgeComponent, EmptyComponent } from '../../shared/ui.component';
import { IconComponent } from '../../shared/icon.component';
import { TimelineComponent } from '../../shared/timeline.component';
import { UploaderComponent } from '../../shared/uploader.component';
@Component({ selector: 'j-service-detail', imports: [DataRegionComponent, RouterLink, ReactiveFormsModule, BadgeComponent, EmptyComponent, IconComponent, TimelineComponent, UploaderComponent], templateUrl: './service-detail.component.html' })
export class ServiceDetailComponent {
    data = inject(DataService);
    auth = inject(AuthService);
    ctx = pageContext();
    fb = inject(FormBuilder);
    customer = computed(() => this.ctx.role() === 'account');
    engineer = computed(() => this.ctx.role() === 'engineer');
    tab = signal('updates');
    attempted = signal(false);
    ticket = computed(() => this.data.tickets().find(t => t.id === this.ctx.id() && (!this.customer() || t.customer === 'Ananya Menon') && (!this.engineer() || t.engineer === 'Vishnu Kumar')));
    logs = computed(() => { const logs = this.ticket()?.logs ?? []; return this.customer() ? customerLogs(logs) : logs.filter(l => this.tab() === 'internal' ? l.visibility === 'internal' : l.visibility === 'customer'); });
    form = this.fb.nonNullable.group({ diagnosis: ['', Validators.required], work: ['', [Validators.required, Validators.minLength(10)]], parts: ['None'], minutes: [0, [Validators.required, Validators.min(0)]], tests: [''], visibility: ['customer'] });
    addLog(): boolean {
        this.attempted.set(true);
        if (this.form.invalid || this.customer() || !this.ticket())
            return false;
        const v = this.form.getRawValue();
        this.data.addWorkLog(this.ctx.id(), { id: 'log-' + Date.now(), date: new Date().toLocaleString(), author: this.auth.currentUser()?.name ?? 'Demo engineer', diagnosis: v.diagnosis, work: v.work, parts: v.parts, minutes: v.minutes, tests: v.tests, visibility: v.visibility === 'internal' ? 'internal' : 'customer' });
        this.form.reset({ diagnosis: '', work: '', parts: 'None', minutes: 0, tests: '', visibility: 'customer' });
        this.attempted.set(false);
        return true;
    }
    nextActions = computed(() => ({ Assigned: ['Accepted', 'Declined'], Accepted: ['Diagnosis'], Diagnosis: ['In progress', 'Escalated'], 'In progress': ['Awaiting parts', 'Awaiting approval', 'Testing', 'Escalated'], 'Awaiting parts': ['In progress'], Testing: ['Completed', 'In progress'] } as Record<string, string[]>)[this.ticket()?.status ?? ''] ?? []);
    actionLabel(status: string): string { return ({ Accepted: 'Accept job', Declined: 'Decline', Diagnosis: 'Start diagnosis', 'In progress': 'Start work', Testing: 'Mark testing', Completed: 'Complete job', Escalated: 'Escalate', 'Awaiting approval': 'Request approval', 'Awaiting parts': 'Awaiting parts' } as Record<string, string>)[status] ?? status; }
}
