export type Role = 'customer' | 'ecommerce' | 'office' | 'engineer' | 'admin';
export type Permission = 'view' | 'manageOrders' | 'manageServices' | 'manageStaff' | 'managePayroll' | 'workAssignedJobs';
export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    permissions: Permission[];
}
export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
}
export interface Staff extends User {
    branchId: string;
    active: boolean;
    skills: string[];
}
export interface Category {
    slug: string;
    name: string;
    icon: string;
    description: string;
}
export interface Product {
    id: string;
    name: string;
    brand: string;
    category: string;
    price: number;
    originalPrice?: number;
    stock: number;
    rating?: number;
    image: string;
    label?: string;
    specs: Record<string, string>;
    description: string;
}
export interface CartItem {
    product: Product;
    quantity: number;
}
export interface TimelineEntry {
    title: string;
    detail: string;
    date: string;
    complete: boolean;
}
export interface OrderItem {
    productId: string;
    name: string;
    quantity: number;
    price: number;
}
export interface Order {
    id: string;
    customer: string;
    date: string;
    total: number;
    payment: string;
    status: string;
    shipment: string;
    items: OrderItem[];
    timeline: TimelineEntry[];
}
export interface Shipment {
    id: string;
    orderId: string;
    courier: string;
    awb: string;
    trackingUrl: string;
    dispatchDate: string;
    status: string;
    notes: string;
}
export type Priority = 'Critical' | 'High' | 'Normal' | 'Low';
export interface WorkLog {
    id: string;
    date: string;
    author: string;
    diagnosis: string;
    work: string;
    parts: string;
    minutes: number;
    tests: string;
    visibility: 'customer' | 'internal';
}
export interface ServiceTicket {
    id: string;
    customer: string;
    device: string;
    serial: string;
    category: string;
    issue: string;
    status: string;
    priority: Priority;
    priorityReason: string;
    engineer: string;
    appointment: string;
    mode: string;
    branch: string;
    address: string;
    created: string;
    logs: WorkLog[];
    timeline: TimelineEntry[];
}
export interface ServiceAssignment {
    ticketId: string;
    engineerId: string;
    appointment: string;
}
export interface Engineer {
    id: string;
    name: string;
    initials: string;
    skills: string[];
    status: string;
    jobs: number;
    branch: string;
}
export interface ServiceEscalation {
    id: string;
    ticketId: string;
    reason: string;
    findings: string;
    troubleshooting: string;
    senior: string;
    status: string;
}
export interface AttendanceRecord {
    id: string;
    name: string;
    date: string;
    checkIn: string;
    checkOut: string;
    duration: string;
    verification: string;
    branch: string;
}
export interface PayrollRecord {
    id: string;
    employee: string;
    period: string;
    days: number;
    overtime: string;
    allowances: number;
    deductions: number;
    bonus: number;
    net: number;
    status: string;
}
export interface Notification {
    id: string;
    title: string;
    detail: string;
    category: string;
    read: boolean;
    date: string;
    link: string;
}
export interface Branch {
    id: string;
    name: string;
    address: string;
    phone: string;
    latitude: number | null;
    longitude: number | null;
    radius: number;
    active: boolean;
}
export interface DashboardMetric {
    label: string;
    value: string;
    change: string;
    icon: string;
}
export interface BrandConfig {
    name: string;
    tagline: string;
    logo: string;
    favicon: string;
    primary: string;
    secondary: string;
    email: string;
    phone: string;
    branches: Branch[];
}
export interface AuthPort {
    login(email: string, password: string): Promise<void>;
    logout(): void;
    refreshSession(): Promise<void>;
}
export interface RetailApiPort {
    products(): Promise<Product[]>;
    orders(): Promise<Order[]>;
    tickets(): Promise<ServiceTicket[]>;
}
