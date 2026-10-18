import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmptyComponent } from '../../shared/ui.component';
@Component({ selector: 'j-not-found', imports: [RouterLink, EmptyComponent], template: '<div class="container page-space"><j-empty title="That page took a different turn." description="Let’s get you back to a familiar place."><a routerLink="/" class="btn btn-primary">Back to Jerry Computers</a></j-empty></div>' })
export class NotFoundComponent {
}
