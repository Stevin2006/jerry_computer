import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../core/data.service';
import { IconComponent } from '../../shared/icon.component';
@Component({ selector: 'j-info', imports: [RouterLink, IconComponent], templateUrl: './info.component.html' })
export class InfoComponent {
    data = inject(DataService);
    kind = inject(Router).url.split('/')[1] ?? 'about';
    title = ({ services: 'A little expertise. A lot less downtime.', about: 'Good technology. Great people.', contact: 'Let’s talk tech.', privacy: 'Privacy & your information', terms: 'A few things to know' } as Record<string, string>)[this.kind] ?? 'Store information';
    subtitle = this.kind === 'services' ? 'Practical support for the technology you rely on.' : this.kind === 'contact' ? 'A better connection starts with a conversation.' : 'A thoughtful approach to your everyday technology.';
}
