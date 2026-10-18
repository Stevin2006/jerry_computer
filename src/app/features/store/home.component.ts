import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../core/data.service';
import { IconComponent } from '../../shared/icon.component';
import { ProductCardComponent } from '../../shared/product-card.component';
@Component({ selector: 'j-home', imports: [RouterLink, IconComponent, ProductCardComponent], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './home.component.html' })
export class HomeComponent {
    readonly data = inject(DataService);
    readonly benefits = [{ icon: 'shield', title: 'Choose with confidence', text: 'Clear product information and guidance on manufacturer warranties.' }, { icon: 'tool', title: 'Support beyond the sale', text: 'From first setup to the next repair, start with our service desk.' }, { icon: 'location', title: 'Real people. Local support.', text: 'Talk through your needs with the team, online or in store.' }];
}
