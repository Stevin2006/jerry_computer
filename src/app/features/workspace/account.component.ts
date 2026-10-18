import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DataService } from '../../core/data.service';
import { IconComponent } from '../../shared/icon.component';
@Component({ selector: 'j-account-shell', imports: [RouterLink, RouterLinkActive, RouterOutlet, IconComponent], templateUrl: './account.component.html' })
export class AccountShellComponent {
    data = inject(DataService);
    links = [{ label: 'Overview', path: '/account', icon: 'grid' }, { label: 'My orders', path: '/account/orders', icon: 'box' }, { label: 'Service center', path: '/account/services', icon: 'tool' }, { label: 'Notifications', path: '/account/notifications', icon: 'bell' }, { label: 'Profile & settings', path: '/account/profile', icon: 'user' }];
}
