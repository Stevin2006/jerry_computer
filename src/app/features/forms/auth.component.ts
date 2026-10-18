import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../../core/data.service';
import { IconComponent } from '../../shared/icon.component';
@Component({ selector: 'j-auth', imports: [ReactiveFormsModule, RouterLink, IconComponent], templateUrl: './auth.component.html' })
export class AuthComponent {
    auth = inject(AuthService);
    fb = inject(FormBuilder);
    params = toSignal(inject(ActivatedRoute).paramMap);
    mode = computed(() => this.params()?.get('mode') ?? 'login');
    submitted = signal(false);
    loading = signal(false);
    error = signal('');
    showPassword = signal(false);
    form = this.fb.nonNullable.group({ name: [''], email: [''], password: [''], confirm: [''] });
    title(): string { return ({ login: 'Sign in to your space.', register: 'Make yourself at home.', 'forgot-password': 'Forgot your password?', 'reset-password': 'A new password, a fresh start.' } as Record<string, string>)[this.mode()] ?? 'Welcome'; }
    subtitle(): string { return this.mode() === 'forgot-password' ? 'We’ll help you get back to your account.' : 'Keep your orders, service requests and details together.'; }
    action(): string { return ({ login: 'Sign in', register: 'Create account', 'forgot-password': 'Request reset link', 'reset-password': 'Reset password' } as Record<string, string>)[this.mode()] ?? 'Continue'; }
    invalid(name: 'name' | 'email' | 'password'): boolean { return this.submitted() && this.form.controls[name].invalid; }
    async submit(): Promise<void> {
        this.submitted.set(true);
        const mode = this.mode();
        this.form.controls.email.setValidators(mode === 'reset-password' ? [] : [Validators.required, Validators.email]);
        this.form.controls.password.setValidators(mode === 'forgot-password' ? [] : [Validators.required, Validators.minLength(8)]);
        this.form.controls.name.setValidators(mode === 'register' ? [Validators.required, Validators.minLength(2)] : []);
        Object.values(this.form.controls).forEach(c => c.updateValueAndValidity());
        if (this.form.invalid || (['register', 'reset-password'].includes(mode) && this.form.controls.confirm.value !== this.form.controls.password.value))
            return;
        this.loading.set(true);
        this.error.set('');
        await new Promise(r => setTimeout(r, 400));
        try {
            if (mode === 'login')
                await this.auth.login(this.form.controls.email.value, this.form.controls.password.value);
            else
                throw new Error(`${this.action()} will be connected to the authentication API. No request was sent.`);
        }
        catch (e) {
            this.error.set(e instanceof Error ? e.message : 'Unable to connect. Please try again.');
        }
        finally {
            this.loading.set(false);
        }
    }
}
