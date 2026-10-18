import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../../core/data.service';
import { IconComponent } from '../../shared/icon.component';
import { EmptyComponent } from '../../shared/ui.component';
@Component({ selector: 'j-cart', imports: [CurrencyPipe, RouterLink, IconComponent, EmptyComponent], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './cart.component.html' })
export class CartComponent {
    data = inject(DataService);
    removeId = signal('');
}
