declare global {
    interface Window {
        ScrollTop: typeof ScrollTop;
    }
}
export default class ScrollTop extends HTMLElement {
    _shadow: ShadowRoot;
    _showMobile: boolean;
    _isBottomSet: boolean;
    constructor();
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
    connectedCallback(): Promise<void>;
    eventScroll(): void;
    eventResize(): void;
}
//# sourceMappingURL=index.d.ts.map