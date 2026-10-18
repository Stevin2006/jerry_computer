import { ActivatedRoute, Router } from '@angular/router';
import { computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
export function pageContext() { const router = inject(Router); const route = inject(ActivatedRoute); const data = toSignal(route.data, { initialValue: route.snapshot.data }); const params = toSignal(route.paramMap, { initialValue: route.snapshot.paramMap }); return { role: computed(() => router.url.split('/')[1] ?? 'account'), kind: computed(() => String(data()['kind'] ?? 'dashboard')), id: computed(() => params().get('id') ?? ''), data }; }
