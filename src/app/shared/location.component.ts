import { Component, signal } from '@angular/core';
import { IconComponent } from './icon.component';
@Component({ selector: 'j-location', imports: [IconComponent], templateUrl: './location.component.html' })
export class LocationComponent {
    state = signal('manual');
    coordinates = signal('');
    accuracy = signal(0);
    message(): string { return ({ manual: 'Manual address mode. Enter the full address below.', loading: 'Waiting for your browser location permission…', granted: 'Permission granted. Location captured; verification is pending the service API.', denied: 'Location permission denied. You can still enter an address manually.', unavailable: 'Location is unavailable. Please enter your address manually.', poor: 'Location captured with low accuracy. Please check your address manually.' } as Record<string, string>)[this.state()] ?? ''; }
    capture(): void {
        if (!navigator.geolocation) {
            this.state.set('unavailable');
            return;
        }
        this.state.set('loading');
        navigator.geolocation.getCurrentPosition(p => { this.coordinates.set(`${p.coords.latitude.toFixed(5)}, ${p.coords.longitude.toFixed(5)} · ±${Math.round(p.coords.accuracy)} m`); this.accuracy.set(p.coords.accuracy); this.state.set(p.coords.accuracy > 200 ? 'poor' : 'granted'); }, e => this.state.set(e.code === 1 ? 'denied' : 'unavailable'), { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 });
    }
}
