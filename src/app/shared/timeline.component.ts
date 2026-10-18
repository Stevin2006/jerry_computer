import { Component, input } from '@angular/core';
import { TimelineEntry } from '../core/models';
import { IconComponent } from './icon.component';
@Component({ selector: 'j-timeline', imports: [IconComponent], template: `<ol class="timeline">@for(entry of entries();track $index){<li [class.complete]="entry.complete"><span class="timeline-marker">@if(entry.complete){<j-icon name="check"/>}@else{<span></span>}</span><div><strong>{{entry.title}}</strong><p>{{entry.detail}}</p><small>{{entry.date}}</small></div></li>}@if(!entries().length){<li><span class="timeline-marker"><j-icon name="clock"/></span><div><strong>Waiting for the next update</strong><p>Service activity will appear here when supplied by the API.</p></div></li>}</ol>` })
export class TimelineComponent {
    entries = input.required<TimelineEntry[]>();
}
