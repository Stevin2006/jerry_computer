import { Component, inject, signal, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../core/data.service';
import { LocationComponent } from '../../shared/location.component';
import { IconComponent } from '../../shared/icon.component';
import { DataTableComponent, TableColumn, TableRow } from '../../shared/data-table.component';
import { BadgeComponent } from '../../shared/ui.component';
@Component({ selector: 'j-engineer-attendance', imports: [RouterLink, LocationComponent, IconComponent, DataTableComponent, BadgeComponent], templateUrl: './attendance.component.html' })
export class AttendanceComponent {
    data = inject(DataService);
    action = signal('check-in');
    status = signal('Not checked in · demo');
    message = signal('No attendance request has been submitted.');
    @ViewChild('location')
    location?: LocationComponent;
    columns: TableColumn[] = [{ key: 'id', label: 'Record' }, { key: 'date', label: 'Date' }, { key: 'checkIn', label: 'Check-in' }, { key: 'checkOut', label: 'Check-out' }, { key: 'duration', label: 'Duration' }, { key: 'status', label: 'Verification', badge: true }];
    rows: TableRow[] = this.data.attendance().filter(a => a.name === 'Vishnu Kumar').map(a => ({ ...a, status: a.verification }));
    review(): void { const s = this.location?.state(); this.message.set(s === 'granted' || s === 'poor' ? 'Location captured. Verification and attendance submission will be connected to the service API. No attendance was recorded.' : 'Please capture location or contact your office for a manual correction. No attendance was recorded.'); this.status.set(s === 'granted' || s === 'poor' ? 'Verification pending · not submitted' : 'Location required'); }
}
