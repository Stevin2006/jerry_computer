import { DataRegionComponent } from '../../shared/data-region.component';
import { Component, computed, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService, DataService } from '../../core/data.service';
import { pageContext } from './context';
import { BadgeComponent, EmptyComponent } from '../../shared/ui.component';
import { IconComponent } from '../../shared/icon.component';
import { TimelineComponent } from '../../shared/timeline.component';
@Component({ selector: 'j-order-detail', imports: [DataRegionComponent, RouterLink, CurrencyPipe, BadgeComponent, EmptyComponent, IconComponent, TimelineComponent], templateUrl: './order-detail.component.html' })
export class OrderDetailComponent {
    data = inject(DataService);
    auth = inject(AuthService);
    ctx = pageContext();
    order = computed(() => this.data.orders().find(o => o.id === this.ctx.id() && (this.ctx.role() !== 'account' || o.customer === 'Ananya Menon')));
    image(id: string): string { return this.data.products().find(p => p.id === id)?.image ?? '/devices.svg#laptop'; }
}
