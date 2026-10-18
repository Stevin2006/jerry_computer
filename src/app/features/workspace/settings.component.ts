import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DataService } from '../../core/data.service';
import { pageContext } from './context';
import { IconComponent } from '../../shared/icon.component';
import { UploaderComponent } from '../../shared/uploader.component';
@Component({ selector: 'j-settings', imports: [ReactiveFormsModule, RouterLink, IconComponent, UploaderComponent], templateUrl: './settings.component.html' })
export class SettingsComponent {
    data = inject(DataService);
    ctx = pageContext();
    branding = this.ctx.kind() === 'branding';
    profile = this.ctx.kind() === 'profile';
    fb = inject(FormBuilder);
    submitted = signal(false);
    b = this.data.brand();
    form = this.fb.nonNullable.group({ name: [this.branding ? this.b.name : this.profile ? 'Ananya Menon' : 'Jerry preview', Validators.required], email: [this.b.email, Validators.email], phone: [this.b.phone], tagline: [this.b.tagline], primary: [this.b.primary], secondary: [this.b.secondary], branch: [this.b.branches[0]?.name ?? ''], address: [this.b.branches[0]?.address ?? ''], branchPhone: [this.b.branches[0]?.phone ?? ''], branchStatus: ['Active'], theme: ['System'], orderUpdates: [true], serviceUpdates: [true] });
    submit(): void {
        this.submitted.set(true);
        if (this.form.valid)
            this.data.integration(this.branding ? 'Branding settings' : 'Account settings');
    }
}
