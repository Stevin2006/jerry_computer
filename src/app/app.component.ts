import { Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { AuthService, DataService } from './core/data.service';
import { IconComponent } from './shared/icon.component';
import { FocusPanelDirective } from './shared/focus-panel.directive';
import { NAVIGATION } from './core/navigation';
@Component({ selector: 'app-root', imports: [RouterOutlet, RouterLink, RouterLinkActive, IconComponent, FocusPanelDirective], templateUrl: './app.component.html' })
export class AppComponent {
    readonly data = inject(DataService);
    readonly auth = inject(AuthService);
    readonly router = inject(Router);
    readonly url = toSignal(this.router.events.pipe(filter(e => e instanceof NavigationEnd), map(() => this.router.url)), { initialValue: this.router.url });
    readonly workspace = computed(() => this.url().split('/')[1] ?? '');
    readonly isOps = computed(() => ['admin', 'office', 'engineer', 'ecommerce'].includes(this.workspace()));
    readonly nav = computed(() => NAVIGATION[this.workspace()] ?? []);
    menu = signal(false);
    notifications = signal(false);
    profile = signal(false);
    search = signal('');
    theme = signal('system');
    constructor() { this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => { this.menu.set(false); this.profile.set(false); this.notifications.set(false); }); }
    searchWorkspace(): void { const role = this.workspace(); const target = role === 'engineer' ? 'jobs' : role === 'office' ? 'services' : role === 'admin' ? 'products' : 'orders'; this.router.navigate(['/' + role + '/' + target], { queryParams: { q: this.search() } }); }
    doSearch(): void { this.router.navigate(['/shop'], { queryParams: { q: this.search() } }); }
    setTheme(value: string): void { this.theme.set(value); document.documentElement.dataset['theme'] = value; }
    preview(role: string): void {
        if (role === 'customer' || role === 'admin' || role === 'office' || role === 'engineer' || role === 'ecommerce') {
            this.auth.preview(role);
            this.router.navigate([role === 'customer' ? '/account' : `/${role}/dashboard`]);
        }
    }
}
