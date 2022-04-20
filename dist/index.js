var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Colors = {
    white: '#fff',
    offWhite: '#f1f1f1',
    grayLight: '#e6e6e6',
    grayDark: '#454545',
    red: '#e21833',
};
const chevron = `<svg id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103.4 185.34"> <path d="M51.71,185.34A10.74,10.74,0,0,1,44.11,167l74.36-74.35L44.11,18.32A10.73,10.73,0,0,1,59.29,3.14l81.94,81.94a10.73,10.73,0,0,1,0,15.17L59.29,182.19A10.67,10.67,0,0,1,51.71,185.34Z" transform="translate(-40.97 0)" /> </svg>`;
const ELEMENT_NAME = 'umd-scroll-top';
const INNER_ELEMENT_CLASS = 'inner';
const template = document.createElement('template');
template.innerHTML = `
  <style>
  
    :host {
      align-items: center !important;
      justify-content: center !important;
      position: fixed !important;
      right: 0 !important;
      bottom: 20vh;
      transform: translateX(100%);
      height: 60px;
      width: 80px;
      background-color: ${Colors.grayLight};
    } 

    .${INNER_ELEMENT_CLASS} button {
      border: none !important;
      background: transparent !important;
      cursor: pointer !important;
    }

    .${INNER_ELEMENT_CLASS} svg {
      width: 10px;
      transform: rotate(-90deg);
      display: block;
      margin: 0 auto 5px;
    }

    .${INNER_ELEMENT_CLASS} span {
      display: block;
      font-size: 10px;
      font-weight: bold;
      text-align: center;
      color: ${Colors.grayDark} !important;
    }

  </style>
`;
const makeInnerElement = () => {
    const element = document.createElement('div');
    const button = document.createElement('button');
    const text = document.createElement('span');
    element.classList.add(INNER_ELEMENT_CLASS);
    text.innerHTML = 'Scroll To Top';
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    });
    button.innerHTML = chevron;
    button.appendChild(text);
    element.appendChild(button);
    return element;
};
const debounce = function (cb, wait = 20) {
    let h = 0;
    let callable = (...args) => {
        clearTimeout(h);
        h = setTimeout(() => cb(...args), wait);
    };
    return callable;
};
export default class ScrollTop extends HTMLElement {
    constructor() {
        super();
        this._showMobile = false;
        this._isBottomSet = false;
        this._shadow = this.attachShadow({ mode: 'open' });
        this._shadow.appendChild(template.content.cloneNode(true));
    }
    static get observedAttributes() {
        return ['show-mobile', 'position-bottom'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'show-mobile' && newValue) {
            if (newValue === 'true') {
                this._showMobile = true;
            }
        }
        if (name === 'position-bottom' && newValue) {
            this.style.bottom = newValue;
            this._isBottomSet = true;
        }
    }
    connectedCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            this._shadow.appendChild(makeInnerElement());
            setTimeout(() => {
                this.style.transition = 'transform 0.5s ease-in-out';
            }, 100);
            this.style.display = 'flex';
            this.eventResize();
            window.addEventListener('scroll', debounce(() => this.eventScroll()));
            window.addEventListener('resize', debounce(() => this.eventResize()));
        });
    }
    eventScroll() {
        if (this._showMobile || window.innerWidth >= 768) {
            if (window.pageYOffset > window.innerHeight) {
                this.style.transform = 'translateX(0)';
            }
            else {
                this.style.transform = 'translateX(100%)';
            }
            if (!this._isBottomSet) {
                if (document.body.scrollHeight - window.pageYOffset <
                    window.innerHeight * 2) {
                    this.style.transform = 'translateX(100%)';
                }
            }
        }
    }
    eventResize() {
        if (window.innerWidth >= 768) {
            this.style.display = 'flex';
        }
        if (window.innerWidth < 768 && !this._showMobile) {
            this.style.display = 'none';
        }
    }
}
if (!window.customElements.get(ELEMENT_NAME)) {
    window.ScrollTop = ScrollTop;
    window.customElements.define(ELEMENT_NAME, ScrollTop);
}
//# sourceMappingURL=index.js.map