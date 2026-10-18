import { DataRegionComponent } from '../../shared/data-region.component';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService, AuthService } from '../../core/data.service';
import { IconComponent } from '../../shared/icon.component';
import { BadgeComponent, EmptyComponent } from '../../shared/ui.component';
import { pageContext } from './context';
@Component({ selector: 'j-dispatch', imports: [DataRegionComponent, RouterLink, IconComponent, BadgeComponent, EmptyComponent], templateUrl: './dispatch.component.html' })
export class DispatchComponent {
    data = inject(DataService);
    auth = inject(AuthService);
    ctx = pageContext();
    query = signal('');
    mode = signal('all');
    priority = signal('all');
    selected = signal('');
    tickets = computed(() => this.data.tickets().filter(t => `${t.id} ${t.customer} ${t.device}`.toLowerCase().includes(this.query().toLowerCase()) && (this.mode() === 'all' || t.mode === this.mode()) && (this.priority() === 'all' || t.priority === this.priority())));
}
