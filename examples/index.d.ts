declare global {
    interface Window {
        ScrollTop: typeof ScrollTop;
    }
}
export default class ScrollTop extends HTMLElement {
    _shadow: ShadowRoot;
    constructor();
    connectedCallback(): Promise<void>;
    eventScroll(): void;
}
//# sourceMappingURL=index.d.ts.map