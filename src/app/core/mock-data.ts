import { AttendanceRecord, BrandConfig, Category, Engineer, Notification, Order, PayrollRecord, Product, ServiceEscalation, ServiceTicket, Shipment } from './models';
export const BRAND: BrandConfig = { name: 'Jerry Computers', tagline: 'Good technology. Great people.', logo: '/favicon.svg', favicon: '/favicon.svg', primary: '#174b3b', secondary: '#e5f2a6', email: '', phone: '', branches: [{ id: 'main', name: 'Main showroom · demo', address: 'Store address will be supplied by Jerry Computers', phone: 'Contact details pending', latitude: null, longitude: null, radius: 200, active: true }] };
export const CATEGORIES: Category[] = [
    { slug: 'laptops', name: 'Laptops', icon: 'laptop', description: 'Work. Create. Go anywhere.' }, { slug: 'desktops', name: 'Desktops', icon: 'monitor', description: 'More power at your desk.' }, { slug: 'components', name: 'Components', icon: 'cpu', description: 'Build something brilliant.' }, { slug: 'gaming', name: 'Gaming', icon: 'game', description: 'Your next level starts here.' }, { slug: 'accessories', name: 'Accessories', icon: 'headphones', description: 'The little things, upgraded.' }, { slug: 'networking', name: 'Networking', icon: 'wifi', description: 'Stay effortlessly connected.' }, { slug: 'printers', name: 'Printers', icon: 'printer', description: 'Bring your ideas to paper.' }, { slug: 'cctv', name: 'CCTV', icon: 'camera', description: 'A clearer view of security.' }
];
export const PRODUCTS: Product[] = [
    { id: 'asus-vivobook', name: 'ASUS Vivobook 15', brand: 'ASUS', category: 'laptops', price: 52990, originalPrice: 62990, stock: 12, rating: 4.8, image: '/devices.svg#laptop', label: 'Everyday favourite', specs: { Processor: 'Intel Core i5, 13th Gen', Memory: '16 GB DDR4', Storage: '512 GB SSD', Display: '15.6-inch Full HD', Warranty: 'Confirm manufacturer terms' }, description: 'A capable everyday companion for spreadsheets, study sessions and everything in between. A spacious display and lightweight build make it easy to find your flow.' },
    { id: 'lenovo-loq', name: 'Lenovo LOQ Gaming', brand: 'Lenovo', category: 'gaming', price: 78990, originalPrice: 89990, stock: 6, rating: 4.7, image: '/devices.svg#gaming', label: 'Built to play', specs: { Processor: 'Intel Core i5', Graphics: 'NVIDIA RTX 4050', Memory: '16 GB DDR5', Storage: '512 GB SSD', Display: '144 Hz Full HD' }, description: 'Make room for your favourite games, creative projects and ambitious ideas with dedicated graphics and a fast display.' },
    { id: 'dell-monitor', name: 'Dell 24″ FHD Monitor', brand: 'Dell', category: 'desktops', price: 10990, originalPrice: 13990, stock: 18, rating: 4.6, image: '/devices.svg#monitor', specs: { Panel: 'IPS', Resolution: '1920 × 1080', Refresh: '100 Hz', Connectivity: 'HDMI, DisplayPort' }, description: 'A clearer workspace, with comfortable viewing angles and room for the details that matter.' },
    { id: 'logitech-mouse', name: 'Logitech MX Master 3S', brand: 'Logitech', category: 'accessories', price: 8495, originalPrice: 10995, stock: 9, rating: 4.9, image: '/devices.svg#mouse', label: 'Work smarter', specs: { Sensor: '8,000 DPI', Connectivity: 'Bluetooth / USB receiver', Charging: 'USB-C', Buttons: '7 programmable buttons' }, description: 'Quiet clicks, precise control and a comfortable shape for your everyday workflow.' },
    { id: 'kingston-ssd', name: 'Kingston NV2 1 TB SSD', brand: 'Kingston', category: 'components', price: 5290, stock: 3, rating: 4.7, image: '/devices.svg#ssd', specs: { Capacity: '1 TB', Interface: 'PCIe 4.0 NVMe', Format: 'M.2 2280' }, description: 'Make space for more. An efficient storage upgrade for compatible laptops and desktops.' },
    { id: 'tplink-router', name: 'TP-Link Archer AX23', brand: 'TP-Link', category: 'networking', price: 4499, stock: 0, image: '/devices.svg#router', specs: { Wireless: 'Wi-Fi 6', Speed: 'AX1800', Ports: 'Gigabit Ethernet' }, description: 'Reliable connectivity for a busy home or small office.' },
    { id: 'epson-printer', name: 'Epson EcoTank L3250', brand: 'Epson', category: 'printers', price: 14999, stock: 5, image: '/devices.svg#printer', specs: { Type: 'Ink tank', Functions: 'Print, scan, copy', Wireless: 'Wi-Fi' }, description: 'Everyday documents and colour projects from one compact multifunction printer.' },
    { id: 'security-camera', name: 'TP-Link Tapo C200', brand: 'TP-Link', category: 'cctv', price: 2199, stock: 14, image: '/devices.svg#camera', specs: { Resolution: '1080p', Coverage: 'Pan and tilt', Storage: 'MicroSD supported' }, description: 'An indoor camera with flexible positioning for a clearer view of your space.' }
];
const ORDER_TIMELINE = [{ title: 'Order placed', detail: 'Demo order received', date: '16 Oct, 10:20 AM', complete: true }, { title: 'Verified & packed', detail: 'Items checked and prepared', date: '16 Oct, 3:45 PM', complete: true }, { title: 'Courier dispatched', detail: 'Tracking details awaiting service API', date: '17 Oct, 9:30 AM', complete: true }, { title: 'Delivered', detail: 'Awaiting courier update', date: 'Pending', complete: false }];
export const ORDERS: Order[] = [
    { id: 'JC-1048', customer: 'Ananya Menon', date: '2026-10-18', total: 52990, payment: 'Paid · demo', status: 'Processing', shipment: 'Not dispatched', items: [{ productId: 'asus-vivobook', name: 'ASUS Vivobook 15', quantity: 1, price: 52990 }], timeline: ORDER_TIMELINE.slice(0, 2) },
    { id: 'JC-1047', customer: 'Rahul Nair', date: '2026-10-17', total: 19485, payment: 'Paid · demo', status: 'Shipped', shipment: 'In transit', items: [{ productId: 'dell-monitor', name: 'Dell 24″ FHD Monitor', quantity: 1, price: 10990 }, { productId: 'logitech-mouse', name: 'Logitech MX Master 3S', quantity: 1, price: 8495 }], timeline: ORDER_TIMELINE },
    { id: 'JC-1046', customer: 'Meera Thomas', date: '2026-10-17', total: 78990, payment: 'Awaiting verification', status: 'Verification', shipment: 'Not dispatched', items: [{ productId: 'lenovo-loq', name: 'Lenovo LOQ Gaming', quantity: 1, price: 78990 }], timeline: ORDER_TIMELINE.slice(0, 1) },
    { id: 'JC-1045', customer: 'Arjun Pillai', date: '2026-10-16', total: 5290, payment: 'Paid · demo', status: 'Delivered', shipment: 'Delivered · demo', items: [{ productId: 'kingston-ssd', name: 'Kingston NV2 1 TB SSD', quantity: 1, price: 5290 }], timeline: ORDER_TIMELINE.map(t => ({ ...t, complete: true })) }
];
export const TICKETS: ServiceTicket[] = [
    { id: 'SR-2041', customer: 'Ananya Menon', device: 'HP Pavilion 15', serial: 'DEMO-HP-2041', category: 'Laptop', issue: 'Laptop shuts down under load. Fan is unusually loud.', status: 'In progress', priority: 'High', priorityReason: 'Customer depends on device for work', engineer: 'Vishnu Kumar', appointment: '2026-10-19T10:00', mode: 'In-store', branch: 'Main showroom', address: '', created: '2026-10-17', logs: [{ id: 'log-1', date: '17 Oct, 11:30 AM', author: 'Vishnu Kumar', diagnosis: 'Thermal throttling observed during load test.', work: 'Cooling assembly inspected. Cleaning recommended.', parts: 'None', minutes: 35, tests: 'Temperature exceeds expected range', visibility: 'customer' }, { id: 'log-2', date: '17 Oct, 11:40 AM', author: 'Office team', diagnosis: 'Internal intake note', work: 'Confirm estimate with supervisor before proceeding.', parts: '', minutes: 0, tests: '', visibility: 'internal' }], timeline: [{ title: 'Request received', detail: 'Device checked in at the service desk', date: '17 Oct, 9:45 AM', complete: true }, { title: 'Engineer assigned', detail: 'Vishnu Kumar · Laptop diagnostics', date: '17 Oct, 10:15 AM', complete: true }, { title: 'Diagnosis in progress', detail: 'Cooling system under inspection', date: '17 Oct, 11:30 AM', complete: true }, { title: 'Testing & collection', detail: 'Updates will appear here', date: 'Pending', complete: false }] },
    { id: 'SR-2040', customer: 'Greenleaf Studio', device: 'Office network / CCTV', serial: 'DEMO-CCTV', category: 'CCTV', issue: 'Two cameras disconnect intermittently.', status: 'Unassigned', priority: 'Critical', priorityReason: 'Business security system offline', engineer: 'Unassigned', appointment: '2026-10-19T11:30', mode: 'On-site', branch: 'Main showroom', address: 'Demo address · confirm before visit', created: '2026-10-17', logs: [], timeline: [] },
    { id: 'SR-2039', customer: 'Rahul Nair', device: 'Dell Inspiron 3501', serial: 'DEMO-DL-2039', category: 'Laptop', issue: 'Storage upgrade and data migration requested.', status: 'Awaiting parts', priority: 'Normal', priorityReason: 'Standard service request', engineer: 'Sneha Raj', appointment: '2026-10-19T14:00', mode: 'In-store', branch: 'Main showroom', address: '', created: '2026-10-16', logs: [], timeline: [] },
    { id: 'SR-2038', customer: 'Meera Thomas', device: 'Epson L3150', serial: 'DEMO-EP-2038', category: 'Printer', issue: 'Faded colour prints and paper feed issues.', status: 'Testing', priority: 'Low', priorityReason: 'No urgent deadline', engineer: 'Vishnu Kumar', appointment: '2026-10-19T16:00', mode: 'In-store', branch: 'Main showroom', address: '', created: '2026-10-15', logs: [], timeline: [] }
];
export const ENGINEERS: Engineer[] = [{ id: 'eng-1', name: 'Vishnu Kumar', initials: 'VK', skills: ['Laptop', 'Desktop'], status: 'Busy', jobs: 2, branch: 'Main showroom' }, { id: 'eng-2', name: 'Sneha Raj', initials: 'SR', skills: ['Laptop', 'Networking'], status: 'Available', jobs: 1, branch: 'Main showroom' }, { id: 'eng-3', name: 'Akhil Das', initials: 'AD', skills: ['CCTV', 'Printer'], status: 'Offline', jobs: 0, branch: 'Main showroom' }];
export const SHIPMENTS: Shipment[] = [{ id: 'SH-3101', orderId: 'JC-1047', courier: 'Awaiting courier configuration', awb: 'Not connected', trackingUrl: '', dispatchDate: '2026-10-17', status: 'In transit · demo', notes: 'Tracking information will be supplied by the shipment API.' }];
export const ESCALATIONS: ServiceEscalation[] = [{ id: 'ESC-102', ticketId: 'SR-2040', reason: 'Intermittent network failure', findings: 'Camera power is stable; network disconnects repeat.', troubleshooting: 'Cabling and switch ports checked. Firmware review needed.', senior: 'Awaiting senior engineer', status: 'Open' }];
export const ATTENDANCE: AttendanceRecord[] = [{ id: 'AT-1', name: 'Vishnu Kumar', date: '2026-10-18', checkIn: '09:04', checkOut: '—', duration: 'In progress', verification: 'Pending API verification', branch: 'Main showroom' }, { id: 'AT-2', name: 'Sneha Raj', date: '2026-10-18', checkIn: '08:58', checkOut: '—', duration: 'In progress', verification: 'Pending API verification', branch: 'Main showroom' }, { id: 'AT-3', name: 'Vishnu Kumar', date: '2026-10-17', checkIn: '09:00', checkOut: '18:02', duration: '9h 02m · demo', verification: 'Demo historical record', branch: 'Main showroom' }];
export const PAYROLL: PayrollRecord[] = [{ id: 'PR-101', employee: 'Vishnu Kumar', period: 'October 2026', days: 22, overtime: '4h', allowances: 2000, deductions: 500, bonus: 1000, net: 34500, status: 'Draft · demo' }, { id: 'PR-102', employee: 'Sneha Raj', period: 'October 2026', days: 22, overtime: '2h', allowances: 2000, deductions: 0, bonus: 500, net: 32500, status: 'Draft · demo' }];
export const NOTIFICATIONS: Notification[] = [{ id: 'n1', title: 'A laptop needs a little attention', detail: 'SR-2041 has a new diagnosis update.', category: 'Service', read: false, date: '12 min ago · demo', link: '/account/services/SR-2041' }, { id: 'n2', title: 'Your next upgrade is being prepared', detail: 'Demo order JC-1048 is processing.', category: 'Order', read: false, date: '1 hour ago · demo', link: '/account/orders/JC-1048' }, { id: 'n3', title: 'Welcome to Jerry Computers', detail: 'Your products, orders and service updates, all in one place.', category: 'Admin', read: true, date: 'Yesterday · demo', link: '/account' }];
export interface ReportPreview {
    metrics: {
        label: string;
        value: string;
    }[];
    bars: number[];
    distribution: {
        label: string;
        value: string;
        width: number;
    }[];
}
export const REPORT_PREVIEWS: Record<string, ReportPreview> = {
    "Sales": {
        "metrics": [
            {
                "label": "Sample order value",
                "value": "₹1,56,755"
            },
            {
                "label": "Orders",
                "value": "4"
            },
            {
                "label": "Average order value",
                "value": "₹39,189"
            },
            {
                "label": "Orders shipped",
                "value": "1"
            }
        ],
        "bars": [
            40,
            60,
            48,
            76,
            65,
            88
        ],
        "distribution": [
            {
                "label": "Current sample period",
                "value": "68%",
                "width": 68
            },
            {
                "label": "Previous sample period",
                "value": "54%",
                "width": 54
            },
            {
                "label": "Awaiting API data",
                "value": "—",
                "width": 0
            }
        ]
    },
    "Inventory": {
        "metrics": [
            {
                "label": "Products",
                "value": "8"
            },
            {
                "label": "Low-stock products",
                "value": "2"
            },
            {
                "label": "Out of stock",
                "value": "1"
            },
            {
                "label": "Sample movements",
                "value": "1"
            }
        ],
        "bars": [
            55,
            68,
            60,
            78,
            66,
            84
        ],
        "distribution": [
            {
                "label": "Available",
                "value": "6",
                "width": 75
            },
            {
                "label": "Low stock",
                "value": "1",
                "width": 12.5
            },
            {
                "label": "Out of stock",
                "value": "1",
                "width": 12.5
            }
        ]
    },
    "Service": {
        "metrics": [
            {
                "label": "Open tickets",
                "value": "4"
            },
            {
                "label": "Critical tickets",
                "value": "1"
            },
            {
                "label": "Awaiting parts",
                "value": "1"
            },
            {
                "label": "Sample turnaround",
                "value": "2.4 days"
            }
        ],
        "bars": [
            75,
            62,
            85,
            45,
            58,
            68
        ],
        "distribution": [
            {
                "label": "In progress",
                "value": "1",
                "width": 25
            },
            {
                "label": "Unassigned",
                "value": "1",
                "width": 25
            },
            {
                "label": "Awaiting parts",
                "value": "1",
                "width": 25
            },
            {
                "label": "Testing",
                "value": "1",
                "width": 25
            }
        ]
    },
    "Engineer performance": {
        "metrics": [
            {
                "label": "Jobs completed · sample",
                "value": "18"
            },
            {
                "label": "In progress",
                "value": "1"
            },
            {
                "label": "Average completion · sample",
                "value": "2.1 days"
            },
            {
                "label": "Escalations · sample",
                "value": "1"
            }
        ],
        "bars": [
            55,
            68,
            60,
            78,
            66,
            84
        ],
        "distribution": [
            {
                "label": "Current sample period",
                "value": "68%",
                "width": 68
            },
            {
                "label": "Previous sample period",
                "value": "54%",
                "width": 54
            },
            {
                "label": "Awaiting API data",
                "value": "—",
                "width": 0
            }
        ]
    },
    "Attendance": {
        "metrics": [
            {
                "label": "Records today",
                "value": "2"
            },
            {
                "label": "Pending verification",
                "value": "2"
            },
            {
                "label": "Sample attendance",
                "value": "92%"
            },
            {
                "label": "Sample working hours",
                "value": "176h"
            }
        ],
        "bars": [
            55,
            68,
            60,
            78,
            66,
            84
        ],
        "distribution": [
            {
                "label": "Current sample period",
                "value": "68%",
                "width": 68
            },
            {
                "label": "Previous sample period",
                "value": "54%",
                "width": 54
            },
            {
                "label": "Awaiting API data",
                "value": "—",
                "width": 0
            }
        ]
    },
    "Payroll": {
        "metrics": [
            {
                "label": "Pay period",
                "value": "Oct 2026"
            },
            {
                "label": "Sample employees",
                "value": "2"
            },
            {
                "label": "Supplied payroll total",
                "value": "₹67,000"
            },
            {
                "label": "Approval state",
                "value": "Draft"
            }
        ],
        "bars": [
            55,
            68,
            60,
            78,
            66,
            84
        ],
        "distribution": [
            {
                "label": "Current sample period",
                "value": "68%",
                "width": 68
            },
            {
                "label": "Previous sample period",
                "value": "54%",
                "width": 54
            },
            {
                "label": "Awaiting API data",
                "value": "—",
                "width": 0
            }
        ]
    }
};
export const DASHBOARD_TREND = [42, 65, 48, 78, 58, 92, 72];
