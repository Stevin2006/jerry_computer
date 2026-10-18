import { Directive, ElementRef, HostBinding, HostListener, OnDestroy, booleanAttribute, effect, inject, input, output } from '@angular/core';
/** Keyboard containment for conditional menus and responsive drawers. Native dialogs handle their own focus. */
@Directive({ selector: '[jFocusPanel]' })
export class FocusPanelDirective implements OnDestroy {
    readonly active = input(true, { alias: 'jFocusPanel', transform: booleanAttribute });
    readonly panelClosed = output<void>();
    private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
    private previous: HTMLElement | null = null;
    private timer?: ReturnType<typeof setTimeout>;
    @HostBinding('attr.role')
    get role(): string | null { return this.active() ? 'dialog' : null; }
    @HostBinding('attr.aria-modal')
    get modal(): string | null { return this.active() ? 'true' : null; }
    constructor() { effect(() => { clearTimeout(this.timer); if (this.active()) {
        this.previous = document.activeElement as HTMLElement;
        this.timer = setTimeout(() => this.items()[0]?.focus(), 0);
    }
    else
        this.restore(); }); }
    private items(): HTMLElement[] { return Array.from(this.element.nativeElement.querySelectorAll<HTMLElement>('a[href],button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex="0"]')).filter(el => el.getClientRects().length > 0); }
    @HostListener('document:keydown', ['$event'])
    onKey(event: KeyboardEvent): void {
        if (!this.active())
            return;
        if (event.key === 'Escape') {
            event.preventDefault();
            this.panelClosed.emit();
            return;
        }
        if (event.key !== 'Tab')
            return;
        const items = this.items();
        const first = items[0];
        const last = items.at(-1);
        if (!first || !last)
            return;
        if (event.shiftKey && (document.activeElement === first || !this.element.nativeElement.contains(document.activeElement))) {
            event.preventDefault();
            last.focus();
        }
        else if (!event.shiftKey && (document.activeElement === last || !this.element.nativeElement.contains(document.activeElement))) {
            event.preventDefault();
            first.focus();
        }
    }
    private restore(): void { if (this.previous?.isConnected)
        this.previous.focus(); this.previous = null; }
    ngOnDestroy(): void { clearTimeout(this.timer); this.restore(); }
}
