import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../core/data.service';
import { EmptyComponent } from '../../shared/ui.component';
import { IconComponent } from '../../shared/icon.component';
@Component({ selector: 'j-checkout', imports: [CurrencyPipe, RouterLink, ReactiveFormsModule, EmptyComponent, IconComponent], templateUrl: './checkout.component.html' })
export class CheckoutComponent {
    data = inject(DataService);
    fb = inject(FormBuilder);
    step = signal(1);
    submitted = signal(false);
    form = this.fb.nonNullable.group({ name: ['', [Validators.required, Validators.minLength(2)]], email: ['', [Validators.required, Validators.email]], phone: ['', [Validators.required, Validators.pattern('^[+0-9 ()-]{8,18}$')]], address: ['', Validators.required], city: ['', Validators.required], state: ['', Validators.required], pin: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]], payment: ['online', Validators.required] });
    next(): void {
        this.submitted.set(true);
        this.form.markAllAsTouched();
        if (this.form.valid) {
            this.step.set(2);
            this.submitted.set(false);
        }
    }
    invalid(name: keyof typeof this.form.controls): boolean { return this.submitted() && this.form.controls[name].invalid; }
}
