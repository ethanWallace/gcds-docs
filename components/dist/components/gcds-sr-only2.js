import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const gcdsSrOnlyCss = "@layer reset, default;@layer reset{:host slot{display:initial}}@layer default{:host{clip-path:inset(100%);clip:rect(1px,1px,1px,1px);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px}}";
const GcdsSrOnlyStyle0 = gcdsSrOnlyCss;

const GcdsSrOnly = /*@__PURE__*/ proxyCustomElement(class GcdsSrOnly extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.tag = 'p';
    }
    validateTag(newValue) {
        const values = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'];
        if (!values.includes(newValue)) {
            this.tag = 'p';
        }
    }
    componentWillLoad() {
        // Validate attributes and set defaults
        this.validateTag(this.tag);
    }
    render() {
        const Tag = this.tag;
        return (h(Host, { key: 'ca9a1ff72b50c391ac0ce0e4eb8242221aa43820' }, h(Tag, { key: '7e66d8786d82a9f48bd18a029e26d4a16fe825e6' }, h("slot", { key: '16009321706450caf62862686f82ee7158db97f5' }))));
    }
    static get watchers() { return {
        "tag": ["validateTag"]
    }; }
    static get style() { return GcdsSrOnlyStyle0; }
}, [1, "gcds-sr-only", {
        "tag": [1025]
    }, undefined, {
        "tag": ["validateTag"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["gcds-sr-only"];
    components.forEach(tagName => { switch (tagName) {
        case "gcds-sr-only":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, GcdsSrOnly);
            }
            break;
    } });
}

export { GcdsSrOnly as G, defineCustomElement as d };

//# sourceMappingURL=gcds-sr-only2.js.map