import { CartItem, Product, WorkLog } from './models';
export function quantityWithinStock(quantity: number, stock: number): number;
export function cartSubtotal(items: CartItem[]): number;
export function customerLogs(logs: WorkLog[]): WorkLog[];
export function canTransition(current: string, next: string): boolean;
export function filterProducts(products: Product[], filters?: { query?: string; category?: string; brand?: string; inStock?: boolean; maxPrice?: number; sort?: string }): Product[];
