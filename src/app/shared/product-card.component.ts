import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../core/models';
import { DataService } from '../core/data.service';
import { IconComponent } from './icon.component';
@Component({ selector: 'j-product-card', imports: [CurrencyPipe, RouterLink, IconComponent], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './product-card.component.html' })
export class ProductCardComponent {
    product = input.required<Product>();
    data = inject(DataService);
    discount(): number { return Math.round((1 - this.product().price / (this.product().originalPrice ?? this.product().price)) * 100); }
    spec(): string { return Object.values(this.product().specs).slice(0, 2).join(' · '); }
}
