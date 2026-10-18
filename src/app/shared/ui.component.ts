import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconComponent } from './icon.component';
@Component({ selector: 'j-badge', changeDetection: ChangeDetectionStrategy.OnPush, template: '<span class="badge" [class.danger]="danger()" [class.warning]="warning()" [class.positive]="positive()"><span class="status-dot"></span>{{ text() }}</span>' })
export class BadgeComponent {
    text = input('');
    danger(): boolean { return /critical|overdue|failed|out of stock/i.test(this.text()); }
    warning(): boolean { return /high|waiting|pending|verification|draft|busy/i.test(this.text()); }
    positive(): boolean { return /delivered|completed|available|paid|testing|in stock/i.test(this.text()); }
}
@Component({ selector: 'j-empty', imports: [IconComponent], template: '<div class="empty-state"><span class="empty-icon"><j-icon [name]="icon()"/></span><h3>{{ title() }}</h3><p>{{ description() }}</p><ng-content/></div>' })
export class EmptyComponent {
    title = input('Nothing here yet');
    description = input('Try changing your filters.');
    icon = input('search');
}
@Component({ selector: 'j-skeleton', template: '<div class="skeleton" aria-label="Loading content" role="status"></div><div class="skeleton short"></div><div class="skeleton"></div>' })
export class SkeletonComponent {
}
