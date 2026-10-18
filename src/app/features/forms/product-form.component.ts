import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { DataService } from '../../core/data.service';
import { pageContext } from '../workspace/context';
import { UploaderComponent } from '../../shared/uploader.component';
import { IconComponent } from '../../shared/icon.component';
@Component({ selector: 'j-product-form', imports: [ReactiveFormsModule, RouterLink, CurrencyPipe, UploaderComponent, IconComponent], templateUrl: './product-form.component.html' })
export class ProductFormComponent {
    data = inject(DataService);
    ctx = pageContext();
    fb = inject(FormBuilder);
    editing = !!this.ctx.id();
    product = computed(() => this.data.products().find(p => p.id === this.ctx.id()));
    submitted = signal(false);
    p = this.product();
    form = this.fb.nonNullable.group({ name: [this.p?.name ?? '', Validators.required], brand: [this.p?.brand ?? '', Validators.required], sku: [this.p?.id ?? ''], category: [this.p?.category ?? 'laptops'], visibility: ['Draft'], description: [this.p?.description ?? '', [Validators.required, Validators.minLength(20)]], price: [this.p?.price ?? 0, [Validators.required, Validators.min(1)]], originalPrice: [this.p?.originalPrice ?? 0, Validators.min(0)], stock: [this.p?.stock ?? 0, Validators.min(0)], specs: this.fb.array(Object.entries(this.p?.specs ?? {}).map(([key, value]) => this.fb.nonNullable.group({ key: [key, Validators.required], value: [value, Validators.required] }))) });
    get specs() { return this.form.controls.specs; }
    addSpec(): void { this.specs.push(this.fb.nonNullable.group({ key: ['', Validators.required], value: ['', Validators.required] })); }
    submit(): void {
        this.submitted.set(true);
        this.form.markAllAsTouched();
        if (this.form.valid)
            this.data.integration('Product catalogue save');
    }
}
