import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe, KeyValuePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { DataService } from '../../core/data.service';
import { IconComponent } from '../../shared/icon.component';
import { BadgeComponent, EmptyComponent } from '../../shared/ui.component';
import { ProductCardComponent } from '../../shared/product-card.component';
@Component({ selector: 'j-product', imports: [CurrencyPipe, KeyValuePipe, RouterLink, IconComponent, BadgeComponent, ProductCardComponent, EmptyComponent], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './product.component.html' })
export class ProductComponent {
    data = inject(DataService);
    private params = toSignal(inject(ActivatedRoute).paramMap);
    product = computed(() => this.data.products().find(p => p.id === this.params()?.get('id')));
    quantity = signal(1);
    zoom = signal(false);
    excludeCurrent = (p: {
        id: string;
    }): boolean => p.id !== this.product()?.id;
}
