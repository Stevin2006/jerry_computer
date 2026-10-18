export interface NavItem {
    label: string;
    path: string;
    icon: string;
    group: string;
}
const item = (label: string, path: string, icon: string, group = 'Workspace'): NavItem => ({ label, path, icon, group });
export const NAVIGATION: Record<string, NavItem[]> = {
    admin: [item('Overview', 'dashboard', 'grid', 'Overview'), ...[['Products', 'products', 'box'], ['Categories', 'categories', 'grid'], ['Inventory', 'inventory', 'box'], ['Orders', 'orders', 'orders'], ['Shipments', 'shipments', 'truck'], ['Customers', 'customers', 'user']].map(([l, p, i]) => item(l!, p!, i!, 'Commerce')), ...[['Service tickets', 'services', 'tool'], ['Dispatch', 'dispatch', 'location'], ['Engineers', 'engineers', 'user'], ['Escalations', 'escalations', 'flag']].map(([l, p, i]) => item(l!, p!, i!, 'Service center')), ...[['Attendance', 'attendance', 'clock'], ['Office locations', 'attendance/locations', 'location'], ['Payroll', 'payroll', 'wallet']].map(([l, p, i]) => item(l!, p!, i!, 'Workforce')), item('Reports', 'reports', 'chart', 'Analytics'), item('Notifications', 'notifications', 'bell', 'System'), item('Staff', 'staff', 'user', 'System'), item('Settings', 'settings', 'settings', 'System'), item('Branding', 'settings/branding', 'monitor', 'System')],
    ecommerce: [item('Overview', 'dashboard', 'grid'), item('Orders', 'orders', 'orders'), item('Shipments', 'shipments', 'truck'), item('Customers', 'customers', 'user'), item('Notifications', 'notifications', 'bell'), item('Profile', 'profile', 'user')],
    office: [item('Overview', 'dashboard', 'grid'), item('Service tickets', 'services', 'tool'), item('Dispatch board', 'dispatch', 'location'), item('Engineers', 'engineers', 'user'), item('Escalations', 'escalations', 'flag'), item('Notifications', 'notifications', 'bell'), item('Profile', 'profile', 'user')],
    engineer: [item('Today', 'dashboard', 'grid'), item('My jobs', 'jobs', 'tool'), item('Escalations', 'escalations', 'flag'), item('Attendance', 'attendance', 'clock'), item('Performance', 'performance', 'chart'), item('Notifications', 'notifications', 'bell'), item('Profile', 'profile', 'user')]
};
