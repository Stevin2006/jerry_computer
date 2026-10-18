import { DataRegionComponent } from '../../shared/data-region.component';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../core/data.service';
import { IconComponent } from '../../shared/icon.component';
import { BadgeComponent, EmptyComponent } from '../../shared/ui.component';
@Component({ selector: 'j-notifications', imports: [DataRegionComponent, RouterLink, IconComponent, BadgeComponent, EmptyComponent], templateUrl: './notifications.component.html' })
export class NotificationsComponent {
    data = inject(DataService);
    unreadOnly = signal(false);
    category = signal('all');
    visible = computed(() => this.data.notifications().filter(n => (!this.unreadOnly() || !n.read) && (this.category() === 'all' || n.category === this.category())));
}
