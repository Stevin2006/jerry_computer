import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../core/data.service';
import { LocationComponent } from '../../shared/location.component';
import { UploaderComponent } from '../../shared/uploader.component';
import { IconComponent } from '../../shared/icon.component';
@Component({ selector: 'j-service-form', imports: [ReactiveFormsModule, RouterLink, LocationComponent, UploaderComponent, IconComponent], templateUrl: './service-form.component.html' })
export class ServiceFormComponent {
    data = inject(DataService);
    router = inject(Router);
    fb = inject(FormBuilder);
    internal = !this.router.url.startsWith('/account');
    back = this.internal ? '/' + this.router.url.split('/')[1] + '/services' : '/account/services';
    mode = signal('In-store');
    submitted = signal(false);
    preview = signal(false);
    form = this.fb.nonNullable.group({ source: ['Website'], customer: ['', Validators.required], email: ['', [Validators.required, Validators.email]], phone: ['', [Validators.required, Validators.pattern('^[+0-9 ()-]{8,18}$')]], category: ['Laptop', Validators.required], brand: ['', Validators.required], model: ['', Validators.required], serial: [''], issue: ['', [Validators.required, Validators.minLength(15)]], priority: ['Normal'], reason: [''], branch: ['main', Validators.required], appointment: ['', Validators.required], address: [''], landmark: [''], notes: [''], internalNotes: [''] });
    invalid(name: keyof typeof this.form.controls): boolean { return this.submitted() && this.form.controls[name].invalid; }
    setMode(value: string): void { this.mode.set(value); this.form.controls.address.setValidators(value === 'On-site' ? [Validators.required, Validators.minLength(10)] : []); this.form.controls.address.updateValueAndValidity(); }
    submit(): void {
        this.submitted.set(true);
        this.form.markAllAsTouched();
        if (this.form.invalid)
            return;
        this.preview.set(true);
        this.data.notify('Service request preview prepared. No request was submitted.');
    }
}
