import { DataRegionComponent } from '../../shared/data-region.component';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../core/data.service';
import { pageContext } from './context';
import { BadgeComponent, EmptyComponent } from '../../shared/ui.component';
import { IconComponent } from '../../shared/icon.component';
import { EntityPanelComponent } from './entity-panel.component';
@Component({ selector: 'j-staff-detail', imports: [DataRegionComponent, RouterLink, BadgeComponent, EmptyComponent, IconComponent, EntityPanelComponent], templateUrl: './staff-detail.component.html' })
export class StaffDetailComponent {
    data = inject(DataService);
    ctx = pageContext();
    editing = signal(false);
    engineer = computed(() => this.data.engineers().find(e => e.id === this.ctx.id()));
}
