import { DataRegionComponent } from '../../shared/data-region.component';
import { Component, computed, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService, AuthService } from '../../core/data.service';
import { pageContext } from './context';
import { BadgeComponent, EmptyComponent } from '../../shared/ui.component';
import { IconComponent } from '../../shared/icon.component';
@Component({ selector: 'j-payroll-detail', imports: [DataRegionComponent, CurrencyPipe, RouterLink, BadgeComponent, EmptyComponent, IconComponent], templateUrl: './payroll-detail.component.html' })
export class PayrollDetailComponent {
    data = inject(DataService);
    auth = inject(AuthService);
    ctx = pageContext();
    record = computed(() => this.data.payroll().find(p => p.id === this.ctx.id()));
}
