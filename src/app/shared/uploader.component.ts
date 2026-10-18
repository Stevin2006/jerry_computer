import { Component, input, signal, OnDestroy } from '@angular/core';
import { IconComponent } from './icon.component';
@Component({ selector: 'j-uploader', imports: [IconComponent], template: `<label class="upload-zone"><j-icon name="upload"/><strong>{{title()}}</strong><span>PNG, JPEG or WebP · up to 5 MB each</span><input type="file" accept="image/png,image/jpeg,image/webp" [multiple]="multiple()" (change)="select($event)"/></label>@if(error()){<p class="field-error" role="alert">{{error()}}</p>}<div class="upload-previews">@for(file of files();track file.url;let i=$index){<div><img [src]="file.url" [alt]="file.name" width="80" height="80"/><span>{{file.name}}</span>@if(multiple()&&files().length>1){<div class="upload-order"><button type="button" class="text-button" [disabled]="i===0" [attr.aria-label]="'Move '+file.name+' earlier'" (click)="move(i,-1)">←</button><button type="button" class="text-button" [disabled]="i===files().length-1" [attr.aria-label]="'Move '+file.name+' later'" (click)="move(i,1)">→</button></div>}<button type="button" class="text-button" [attr.aria-label]="'Remove '+file.name" (click)="remove(file.url)">Remove</button></div>}</div><p class="small muted">Local preview only. Files are not uploaded to a server.</p>` })
export class UploaderComponent implements OnDestroy {
    title = input('Add device photos');
    multiple = input(true);
    files = signal<{
        name: string;
        url: string;
    }[]>([]);
    error = signal('');
    select(event: Event): void {
        const selected = Array.from((event.target as HTMLInputElement).files ?? []);
        this.error.set('');
        for (const file of selected) {
            if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) {
                this.error.set('Choose PNG, JPEG or WebP images smaller than 5 MB.');
                continue;
            }
            if (!this.multiple()) {
                this.files().forEach(f => URL.revokeObjectURL(f.url));
                this.files.set([]);
            }
            if (this.files().length >= 6) {
                this.error.set('A maximum of six images can be previewed.');
                break;
            }
            this.files.update(v => [...v, { name: file.name, url: URL.createObjectURL(file) }]);
        }
        (event.target as HTMLInputElement).value = '';
    }
    remove(url: string): void { URL.revokeObjectURL(url); this.files.update(v => v.filter(f => f.url !== url)); }
    move(index: number, delta: number): void { const next = index + delta; if (next < 0 || next >= this.files().length)
        return; this.files.update(items => { const result = [...items]; [result[index], result[next]] = [result[next]!, result[index]!]; return result; }); }
    ngOnDestroy(): void { this.files().forEach(f => URL.revokeObjectURL(f.url)); }
}
