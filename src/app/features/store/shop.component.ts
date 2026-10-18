import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CurrencyPipe } from '@angular/common';
import { FocusPanelDirective } from '../../shared/focus-panel.directive';
import { DataService } from '../../core/data.service';
import { filterProducts } from '../../core/domain.mjs';
import { ProductCardComponent } from '../../shared/product-card.component';
import { IconComponent } from '../../shared/icon.component';
import { EmptyComponent, SkeletonComponent } from '../../shared/ui.component';
@Component({ selector: 'j-shop', imports: [RouterLink, CurrencyPipe, ProductCardComponent, IconComponent, EmptyComponent, SkeletonComponent, FocusPanelDirective], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './shop.component.html' })
export class ShopComponent {
    readonly data = inject(DataService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private params = toSignal(this.route.paramMap);
    private queries = toSignal(this.route.queryParamMap);
    query = signal('');
    category = signal('all');
    brand = signal('all');
    maxPrice = signal(100000);
    inStock = signal(false);
    sort = signal('featured');
    layout = signal('grid');
    drawer = signal(false);
    page = signal(1);
    state = signal('ready');
    readonly brands = computed(() => [...new Set(this.data.products().map(p => p.brand))]);
    readonly filtered = computed(() => filterProducts(this.state() === 'empty' ? [] : this.data.products(), { query: this.query(), category: this.category(), brand: this.brand(), maxPrice: this.maxPrice(), inStock: this.inStock(), sort: this.sort() }));
    readonly pages = computed(() => Math.max(1, Math.ceil(this.filtered().length / 6)));
    readonly visible = computed(() => this.filtered().slice((this.page() - 1) * 6, this.page() * 6));
    constructor() { effect(() => { this.query.set(this.queries()?.get('q') ?? ''); this.page.set(1); }); effect(() => { this.category.set(this.params()?.get('slug') ?? 'all'); this.page.set(1); }); }
    selectCategory(value: string): void { this.router.navigate(value === 'all' ? ['/shop'] : ['/shop/categories', value]); this.page.set(1); }
    reset(): void { this.query.set(''); this.category.set('all'); this.brand.set('all'); this.maxPrice.set(100000); this.inStock.set(false); this.page.set(1); this.router.navigate(['/shop']); }
    update(): void { this.page.set(1); }
}
