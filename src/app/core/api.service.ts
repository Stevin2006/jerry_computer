import { Injectable, InjectionToken, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Order, Product, RetailApiPort, ServiceTicket } from './models';
/** Integration boundary only. No endpoint names are assumed or requested by the demo UI. */
export interface RetailEndpointConfig {
    products: string;
    orders: string;
    tickets: string;
}
export const RETAIL_ENDPOINTS = new InjectionToken<RetailEndpointConfig>('Jerry retail endpoints');
@Injectable()
export class ApiRetailService implements RetailApiPort {
    private readonly http = inject(HttpClient);
    private readonly endpoints = inject(RETAIL_ENDPOINTS);
    products(): Promise<Product[]> { return firstValueFrom(this.http.get<Product[]>(this.endpoints.products)); }
    orders(): Promise<Order[]> { return firstValueFrom(this.http.get<Order[]>(this.endpoints.orders)); }
    tickets(): Promise<ServiceTicket[]> { return firstValueFrom(this.http.get<ServiceTicket[]>(this.endpoints.tickets)); }
}
