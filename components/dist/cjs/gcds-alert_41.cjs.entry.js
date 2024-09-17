'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4d291eea.js');

const inheritAttributes = (el, shadowElement, attributes = []) => {
    let attributeObject = {};
    // Check for any aria attributes
    for (let i = 0; i < el.attributes.length; i++) {
        const attr = el.attributes[i];
        if (attr.name.includes('aria-')) {
            attributeObject[attr.name] = attr.value;
        }
    }
    // Check for attributes defined by component
    attributes.forEach(attr => {
        if (el.hasAttribute(attr) ||
            (shadowElement && shadowElement.hasAttribute(attr))) {
            const value = el.getAttribute(attr) || shadowElement.getAttribute(attr);
            if (value !== null) {
                attributeObject[attr] =
                    el.getAttribute(attr) || shadowElement.getAttribute(attr);
            }
            el.removeAttribute(attr);
        }
    });
    return attributeObject;
};
const assignLanguage = (el) => {
    var _a;
    let lang = '';
    if (!el.getAttribute('lang')) {
        const closestLangAttribute = (_a = closestElement('[lang]', el)) === null || _a === void 0 ? void 0 : _a.getAttribute('lang');
        if (closestLangAttribute == 'en' || !closestLangAttribute) {
            lang = 'en';
        }
        else {
            lang = 'fr';
        }
    }
    else if (el.getAttribute('lang') == 'en') {
        lang = 'en';
    }
    else {
        lang = 'fr';
    }
    return lang;
};
// Allows use of closest() function across shadow boundaries
const closestElement = (selector, el) => {
    if (el) {
        return ((el &&
            el != document &&
            typeof window != 'undefined' &&
            el != window &&
            el.closest(selector)) ||
            closestElement(selector, el.getRootNode().host));
    }
    return null;
};
const observerConfig = {
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ['lang'],
};
// For validation - check if element has a checked checkbox/radio sibling
const elementGroupCheck = name => {
    let hasCheck = false;
    const element = document.querySelectorAll(`input[name=${name}]`);
    for (let i = 0; i < element.length; i++) {
        if (element[i].checked) {
            hasCheck = true;
        }
    }
    return !hasCheck;
};
// Emit event with logic to cancel HTML events
// Returns false if event has been prevented
const emitEvent = (e, customEvent, value) => {
    const event = customEvent.emit(value);
    // Was the custom or native event interrupted
    if (event.defaultPrevented || e.defaultPrevented) {
        // Stop native HTML event in shadow-dom
        e.preventDefault();
        return false;
    }
    return true;
};
/* Log validation error for required properties in components
 * @param name - name of the component i.e. <gcds-*>
 * @param errorArr - array of attributes with errors
 * @param optionalAttrsArrToRemove - array of optional attributes with errors to be removed from this error message
 */
const logError = (name, errorArr, optionalAttrsArrToRemove) => {
    let engMsg = 'Render error, please check required properties.';
    let frMsg = 'Erreur de rendu, veuillez vérifier les propriétés requises.';
    let errors = [...errorArr];
    // remove any potential optional attributes from errors array
    if (optionalAttrsArrToRemove && optionalAttrsArrToRemove.length > 0) {
        for (const optionalAttr of optionalAttrsArrToRemove) {
            if (errors.includes(optionalAttr)) {
                errors.splice(errors.indexOf(optionalAttr), 1);
            }
        }
    }
    console.error(`${name}: ${engMsg} (${errors}) | ${name}: ${frMsg} (${errors})`);
};
/* Check for valid date
 * @param dateString - the date to check
 */
const isValidDate = (dateString, forceFormat) => {
    // Define regex pattern to match YYYY-MM-DD format
    let fullregex = /^\d{4}-\d{2}-\d{2}$/;
    let compactregex = /^\d{4}-\d{2}$/;
    let format = '';
    // Check if the format matches the regex
    if (fullregex.test(dateString)) {
        format = 'full';
    }
    else if (compactregex.test(dateString)) {
        format = 'compact';
    }
    else {
        return false;
    }
    if (forceFormat && format != forceFormat) {
        return false;
    }
    // Parse the date string into a Date object
    const formattedDate = `${dateString}${format === 'compact' ? '-15' : ''}`;
    // Check if the date is valid
    const [year, month, day] = formattedDate.split('-').map(Number);
    const thirtyOneDays = [1, 3, 5, 7, 8, 10, 12];
    const thirtyDays = [4, 6, 9, 11];
    if (month < 1 || month > 12) {
        return false;
    }
    else if (thirtyDays.includes(month) && (day < 1 || day > 30)) {
        return false;
    }
    else if (thirtyOneDays.includes(month) && (day < 1 || day > 31)) {
        return false;
    }
    else if (!isLeapYear(year) && month === 2 && (day < 1 || day > 28)) {
        return false;
    }
    else if (isLeapYear(year) && month === 2 && (day < 1 || day > 29)) {
        return false;
    }
    return true;
};
function isLeapYear(y) {
    return !(y & 3 || (!(y % 25) && y & 15));
}

const I18N$n = {
  en: {
    label: {
      danger: 'This is a critical alert.',
      info: 'This is an info alert.',
      success: 'This is a success alert.',
      warning: 'This is a warning alert.',
    },
    closeBtn: 'Close alert.',
  },
  fr: {
    label: {
      danger: "Ceci est une alerte d'effacement.",
      info: "Ceci est une alerte d'information.",
      success: 'Ceci est une alerte de succès.',
      warning: "Ceci est une alerte d'avertissement.",
    },
    closeBtn: "Fermer l'alerte.",
  },
};

const gcdsAlertCss = "@layer reset, default, fixed, role, wide, compact, hover, focus;@layer reset{:host{display:block}:host .gcds-alert{box-sizing:border-box;text-align:left}:host .gcds-alert .alert__close-btn{box-sizing:border-box;cursor:pointer;padding:0}:host .gcds-alert slot{display:initial}}@layer default{:host .gcds-alert{border-inline-start:var(--gcds-alert-border-width) solid transparent;color:var(--gcds-alert-text);container:component alert/inline-size;font:var(--gcds-alert-font);padding:var(--gcds-alert-padding)}:host .gcds-alert .alert__content{flex:1 1 auto}:host .gcds-alert .alert__content .alert__heading{font:var(--gcds-alert-content-heading-font);margin:var(--gcds-alert-content-heading-margin)}:host .gcds-alert .alert__content ::slotted(*){margin-block-start:0}:host .gcds-alert .alert__content ::slotted(:last-child){margin-block-end:0}:host .gcds-alert .alert__content ::slotted(:not(:last-child)){margin-block-end:var(--gcds-alert-content-slotted-margin)}:host .gcds-alert .alert__content ::slotted(ol),:host .gcds-alert .alert__content ::slotted(ul){margin-inline-start:var(--gcds-alert-content-slotted-list-margin);padding:0}:host .gcds-alert .alert__close-btn{background-color:var(--gcds-alert-button-default-background);border:var(--gcds-alert-button-border-width) solid transparent;border-radius:var(--gcds-alert-button-border-radius);color:var(--gcds-alert-button-default-text);margin:var(--gcds-alert-button-margin);transition:all .15s ease-in-out}:host .gcds-alert .alert__close-btn gcds-icon{align-items:center;display:flex;height:var(--gcds-alert-button-icon-width-and-height);justify-content:center;padding:var(--gcds-alert-button-icon-padding);width:var(--gcds-alert-button-icon-width-and-height)}}@layer fixed{:host .gcds-alert.alert--is-fixed{border:0;position:sticky;top:0;width:100%;z-index:9999}}@layer role{:host .gcds-alert.alert--role-danger{background-color:var(--gcds-alert-danger-background);border-color:var(--gcds-alert-danger-icon);color:var(--gcds-alert-danger-text)}:host .gcds-alert.alert--role-danger .alert__icon{color:var(--gcds-alert-danger-icon)}:host .gcds-alert.alert--role-info{background-color:var(--gcds-alert-info-background);border-color:var(--gcds-alert-info-icon);color:var(--gcds-alert-info-text)}:host .gcds-alert.alert--role-info .alert__icon{color:var(--gcds-alert-info-icon)}:host .gcds-alert.alert--role-success{background-color:var(--gcds-alert-success-background);border-color:var(--gcds-alert-success-icon);color:var(--gcds-alert-success-text)}:host .gcds-alert.alert--role-success .alert__icon{color:var(--gcds-alert-success-icon)}:host .gcds-alert.alert--role-warning{background-color:var(--gcds-alert-warning-background);border-color:var(--gcds-alert-warning-icon);color:var(--gcds-alert-warning-text)}:host .gcds-alert.alert--role-warning .alert__icon{color:var(--gcds-alert-warning-icon)}}@layer wide{@container alert (width >= 36em){:host .gcds-alert .alert__container{align-items:flex-start;display:flex}}}@layer compact{@container alert (width < 36em){:host .gcds-alert .alert__icon{margin:var(--gcds-alert-icon-mobile-margin)}:host .gcds-alert .alert__heading{margin:var(--gcds-alert-content-heading-mobile-margin)}:host .gcds-alert .alert__close-btn{margin:var(--gcds-alert-button-mobile-margin)}}}@layer hover{:is(:host .gcds-alert .alert__close-btn:active,:host .gcds-alert .alert__close-btn:hover){border-color:currentColor}}@layer focus{:host .gcds-alert .alert__close-btn:focus{background-color:var(--gcds-alert-button-focus-background);border-color:var(--gcds-alert-button-focus-background);box-shadow:0 0 0 var(--gcds-alert-button-border-width) var(--gcds-alert-button-focus-text);color:var(--gcds-alert-button-focus-text);outline:var(--gcds-alert-button-outline-width) solid var(--gcds-alert-button-focus-background);outline-offset:var(--gcds-alert-button-border-width)}}";
const GcdsAlertStyle0 = gcdsAlertCss;

const GcdsAlert = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.gcdsDismiss = index.createEvent(this, "gcdsDismiss", 7);
        this.alertRole = 'info';
        this.container = 'full';
        this.heading = undefined;
        this.hideCloseBtn = false;
        this.hideRoleIcon = false;
        this.isFixed = false;
        this.isOpen = true;
        this.lang = undefined;
    }
    /*
     * Observe lang attribute change
     */
    updateLang() {
        const observer = new MutationObserver(mutations => {
            if (mutations[0].oldValue != this.el.lang) {
                this.lang = this.el.lang;
            }
        });
        observer.observe(this.el, observerConfig);
    }
    async componentWillLoad() {
        // Define lang attribute
        this.lang = assignLanguage(this.el);
        this.updateLang();
    }
    render() {
        const { alertRole, container, heading, hideCloseBtn, hideRoleIcon, isFixed, isOpen, lang, } = this;
        return (index.h(index.Host, null, isOpen ? (index.h("div", { class: `gcds-alert alert--role-${alertRole} ${isFixed ? 'alert--is-fixed' : ''}`, role: "alert", "aria-label": alertRole === 'danger'
                ? I18N$n[lang].label.danger
                : alertRole === 'info'
                    ? I18N$n[lang].label.info
                    : alertRole === 'success'
                        ? I18N$n[lang].label.success
                        : alertRole === 'warning'
                            ? I18N$n[lang].label.warning
                            : null }, index.h("gcds-container", { size: isFixed ? container : 'full', centered: true }, index.h("div", { class: "alert__container" }, !hideRoleIcon && (index.h("gcds-icon", { "aria-hidden": "true", class: "alert__icon", size: "h5", "margin-right": "250", name: alertRole === 'danger'
                ? 'exclamation-circle'
                : alertRole === 'info'
                    ? 'info-circle'
                    : alertRole === 'success'
                        ? 'check-circle'
                        : alertRole === 'warning'
                            ? 'exclamation-triangle'
                            : null })), index.h("div", { class: "alert__content" }, index.h("p", { class: "alert__heading" }, index.h("strong", null, heading)), index.h("slot", null)), !hideCloseBtn && (index.h("button", { class: "alert__close-btn", onClick: e => {
                const event = emitEvent(e, this.gcdsDismiss);
                if (event) {
                    this.isOpen = false;
                }
            }, "aria-label": I18N$n[lang].closeBtn }, index.h("gcds-icon", { "aria-hidden": "true", name: "times", size: "text" }))))))) : null));
    }
    get el() { return index.getElement(this); }
};
GcdsAlert.style = GcdsAlertStyle0;

const I18N$m = {
  en: {
    label: 'Breadcrumb',
    link: 'https://www.canada.ca/en.html',
  },
  fr: {
    label: 'Chemin de navigation',
    link: 'https://www.canada.ca/fr.html',
  },
};

const gcdsBreadcrumbsCss = "@layer reset, default;@layer reset{:host{display:block}:host .gcds-breadcrumbs ol{list-style:none;overflow-x:hidden}}@layer default{:host .gcds-breadcrumbs ol{margin:var(--gcds-breadcrumbs-margin);padding:var(--gcds-breadcrumbs-padding)}:host .gcds-breadcrumbs ol.has-canada-link gcds-breadcrumbs-item:first-child,:host .gcds-breadcrumbs ol:not(.has-canada-link) ::slotted(:first-child){margin:var(--gcds-breadcrumbs-item-first-child-margin)!important}:host .gcds-breadcrumbs ol.has-canada-link gcds-breadcrumbs-item:first-child:before{display:none}}";
const GcdsBreadcrumbsStyle0 = gcdsBreadcrumbsCss;

const GcdsBreadcrumbs = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.hideCanadaLink = false;
        this.lang = undefined;
    }
    /*
     * Observe lang attribute change
     */
    updateLang() {
        const observer = new MutationObserver(mutations => {
            if (mutations[0].oldValue != this.el.lang) {
                this.lang = this.el.lang;
            }
        });
        observer.observe(this.el, observerConfig);
    }
    async componentWillLoad() {
        // Define lang attribute
        this.lang = assignLanguage(this.el);
        this.updateLang();
    }
    render() {
        const { hideCanadaLink, lang } = this;
        return (index.h(index.Host, null, index.h("nav", { "aria-label": I18N$m[lang].label, class: "gcds-breadcrumbs" }, index.h("ol", { class: hideCanadaLink ? '' : 'has-canada-link' }, !hideCanadaLink ? (index.h("gcds-breadcrumbs-item", { href: I18N$m[lang].link }, "Canada.ca")) : null, index.h("slot", null)))));
    }
    get el() { return index.getElement(this); }
};
GcdsBreadcrumbs.style = GcdsBreadcrumbsStyle0;

const gcdsBreadcrumbsItemCss = "@layer reset, default, hover, focus, mobile;@layer reset{:host(.gcds-breadcrumbs-item){display:inline-block}:host(.gcds-breadcrumbs-item) gcds-link::part(link){display:inline-block;white-space:normal}:host(.gcds-breadcrumbs-item) slot{display:block}}@layer default{:host(.gcds-breadcrumbs-item){padding:var(--gcds-breadcrumbs-item-padding)!important;position:relative}:host(.gcds-breadcrumbs-item):before{content:url('data:image/svg+xml;charset=utf-8,<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"12\" viewBox=\"0 0 8 14\"><path fill=\"26374a\" d=\"M7.7 6.3c.4.4.4 1 0 1.4l-6 6c-.4.4-1 .4-1.4 0s-.4-1 0-1.4L5.6 7 .3 1.7C-.1 1.3-.1.7.3.3s1-.4 1.4 0z\"/></svg>');left:var(--gcds-breadcrumbs-item-arrow-left);position:absolute;top:var(--gcds-breadcrumbs-item-arrow-top)}:host(.gcds-breadcrumbs-item) gcds-link::part(link){margin:var(--gcds-breadcrumbs-item-margin);padding:var(--gcds-breadcrumbs-item-link-padding)}}@layer mobile{@media screen and (max-width:30rem){:host(.gcds-breadcrumbs-item){display:block}:host(.gcds-breadcrumbs-item):before{top:var(--gcds-breadcrumbs-mobile-item-arrow-top)}:host(.gcds-breadcrumbs-item) gcds-link::part(link){margin:var(--gcds-breadcrumbs-mobile-item-margin);padding:var(--gcds-breadcrumbs-mobile-item-padding)}}}";
const GcdsBreadcrumbsItemStyle0 = gcdsBreadcrumbsItemCss;

const GcdsBreadcrumbsItem = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.href = undefined;
    }
    render() {
        const { href } = this;
        return (index.h(index.Host, { role: "listitem", class: "gcds-breadcrumbs-item" }, index.h("gcds-link", { size: "regular", href: href }, index.h("slot", null))));
    }
    get el() { return index.getElement(this); }
};
GcdsBreadcrumbsItem.style = GcdsBreadcrumbsItemStyle0;

const I18N$l = {
  en: {
    label: 'Opens in a new tab.',
  },
  fr: {
    label: "S'ouvre dans un nouvel onglet.",
  },
};

const gcdsButtonCss = "@layer reset, default, roles, size, disabled, hover, focus, active, mobile;@layer reset{:host{display:inline-block}:host .gcds-button{box-sizing:border-box;cursor:pointer;text-decoration:none}:host slot{display:initial}}@layer default{:host .gcds-button{display:inline-block;font:var(--gcds-button-font);text-align:center;width:var(--gcds-button-width);text-wrap:balance;border:var(--gcds-button-border-width) solid transparent;border-radius:var(--gcds-button-border-radius);padding:var(--gcds-button-padding);transition:all .15s ease-in-out}}@layer roles{:host .gcds-button.button--role-danger{background-color:var(--gcds-button-danger-default-background);color:var(--gcds-button-danger-default-text)}:host .gcds-button.button--role-primary{background-color:var(--gcds-button-primary-default-background);color:var(--gcds-button-primary-default-text)}:host .gcds-button.button--role-secondary{background-color:var(--gcds-button-secondary-default-background);border:var(--gcds-button-border-width) solid;color:var(--gcds-button-secondary-default-text)}}@layer size{:host .gcds-button.button--small{font:var(--gcds-button-small-font);padding:var(--gcds-button-small-padding)}}@layer disabled{:host .gcds-button[aria-disabled=true]{background-color:var(--gcds-button-shared-disabled-background);border:var(--gcds-button-border-width) solid;color:var(--gcds-button-shared-disabled-text);cursor:not-allowed;pointer-events:none}}@layer hover{@media (hover:hover){:host .gcds-button:hover.button--role-danger{background-color:var(--gcds-button-danger-hover-background)}:host .gcds-button:hover.button--role-primary{background-color:var(--gcds-button-primary-hover-background)}:host .gcds-button:hover.button--role-secondary{background-color:var(--gcds-button-secondary-hover-background)}}}@layer focus{:host .gcds-button:focus{background-color:var(--gcds-button-shared-focus-background);border-color:var(--gcds-button-shared-focus-background);box-shadow:var(--gcds-button-shared-focus-box-shadow);color:var(--gcds-button-shared-focus-text);outline:var(--gcds-button-shared-focus-outline-width) solid var(--gcds-button-shared-focus-background);outline-offset:var(--gcds-button-border-width)}}@layer active{:host .gcds-button:active{background-color:var(--gcds-button-shared-active-background);border-color:var(--gcds-button-shared-active-background)}}@layer mobile{@media screen and (max-width:30rem){:host{display:block}:host .gcds-button{margin:var(--gcds-button-mobile-margin);width:var(--gcds-button-mobile-width)}}}";
const GcdsButtonStyle0 = gcdsButtonCss;

const GcdsButton = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.gcdsClick = index.createEvent(this, "gcdsClick", 7);
        this.gcdsFocus = index.createEvent(this, "gcdsFocus", 7);
        this.gcdsBlur = index.createEvent(this, "gcdsBlur", 7);
        this.handleClick = (e) => {
            // Check button type, only emit value if type is "submit"
            const emitValue = this.type === 'submit' ? this.value : undefined;
            const event = emitEvent(e, this.gcdsClick, emitValue);
            if (event) {
                if (!this.disabled && this.type != 'button' && this.type != 'link') {
                    // Attach button to form
                    const form = this.el.closest('form');
                    if (form) {
                        e.preventDefault();
                        const formButton = document.createElement('button');
                        formButton.type = this.type;
                        if (this.name) {
                            formButton.name = this.name;
                        }
                        if (this.value) {
                            formButton.value = this.value;
                        }
                        formButton.style.display = 'none';
                        form.appendChild(formButton);
                        formButton.click();
                        formButton.remove();
                    }
                }
                // Has any inherited attributes changed on click
                this.inheritedAttributes = inheritAttributes(this.el, this.shadowElement);
            }
        };
        this.type = 'button';
        this.buttonRole = 'primary';
        this.size = 'regular';
        this.buttonId = undefined;
        this.name = undefined;
        this.disabled = undefined;
        this.value = undefined;
        this.href = undefined;
        this.rel = undefined;
        this.target = undefined;
        this.download = undefined;
        this.inheritedAttributes = {};
        this.lang = undefined;
    }
    validateType(newValue) {
        const values = ['submit', 'reset', 'button', 'link'];
        if (!values.includes(newValue)) {
            this.type = 'button';
        }
    }
    validateButtonRole(newValue) {
        const values = ['primary', 'secondary', 'danger'];
        if (!values.includes(newValue)) {
            this.buttonRole = 'primary';
        }
    }
    validateSize(newValue) {
        const values = ['regular', 'small'];
        if (!values.includes(newValue)) {
            this.size = 'regular';
        }
    }
    /*
     * Observe lang attribute change
     */
    updateLang() {
        const observer = new MutationObserver(mutations => {
            if (mutations[0].oldValue != this.el.lang) {
                this.lang = this.el.lang;
            }
        });
        observer.observe(this.el, observerConfig);
    }
    componentWillLoad() {
        // Validate attributes and set defaults
        this.validateType(this.type);
        this.validateButtonRole(this.buttonRole);
        this.validateSize(this.size);
        this.inheritedAttributes = inheritAttributes(this.el, this.shadowElement);
        // Define lang attribute
        this.lang = assignLanguage(this.el);
        this.updateLang();
    }
    render() {
        const { type, buttonRole, size, buttonId, disabled, lang, name, href, rel, target, download, value, inheritedAttributes, } = this;
        const Tag = type != 'link' ? 'button' : 'a';
        const attrs = Tag === 'button'
            ? {
                type: type,
                ariaDisabled: disabled,
                name,
                value,
            }
            : {
                href,
                rel,
                target,
                download,
            };
        return (index.h(index.Host, null, index.h(Tag, Object.assign({}, attrs, { id: buttonId, onBlur: () => this.gcdsBlur.emit(), onFocus: () => this.gcdsFocus.emit(), onClick: e => this.handleClick(e), class: `gcds-button button--role-${buttonRole} button--${size}`, ref: element => (this.shadowElement = element) }, inheritedAttributes, { part: "button" }), index.h("slot", null), type === 'link' && target === '_blank' ? (index.h("gcds-icon", { name: "external-link", label: I18N$l[lang].label, "margin-left": "200" })) : null)));
    }
    static get delegatesFocus() { return true; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "type": ["validateType"],
        "buttonRole": ["validateButtonRole"],
        "size": ["validateSize"]
    }; }
};
GcdsButton.style = GcdsButtonStyle0;

const I18N$k = {
  en: {
    tagged: 'Tagged:',
    badgeError: 'gcds-card: The badge attribute has a character limit of 20 characters.',
  },
  fr: {
    tagged: 'Baliser :',
    badgeError: 'gcds-card: L\'attribut badge a une limite de caractères de 20 caractères.',
  },
};

const gcdsCardCss = "@layer reset, default, link, hover, focus;@layer reset{:host{display:block}:host *{box-sizing:border-box;margin:0;padding:0}:host slot{display:initial}}@layer default{:host .gcds-card{background-color:var(--gcds-card-background-color);box-shadow:var(--gcds-card-box-shadow);color:var(--gcds-card-color);display:block;height:100%;max-width:var(--gcds-card-max-width);overflow:hidden;padding:var(--gcds-card-padding);position:relative}:host .gcds-card .gcds-badge{background-color:var(--gcds-card-badge-background-color);left:0;padding:var(--gcds-card-badge-padding);position:absolute;top:0;text-wrap:nowrap}:host .gcds-card .gcds-card__image{margin:var(--gcds-card-image-margin);width:100%}:host .gcds-card .gcds-card__title{font:var(--gcds-card-title-font-desktop);width:fit-content}@media only screen and (width < 48em){:host .gcds-card .gcds-card__title{font:var(--gcds-card-title-font-mobile)}}:host .gcds-card .gcds-card__title:has(+.gcds-card__description){margin:var(--gcds-card-title-margin)}:host .gcds-card .gcds-card__description{--gcds-text-size-body-desktop:var(--gcds-card-description-font-desktop)}@media only screen and (width < 48em){:host .gcds-card .gcds-card__description{font:var(--gcds-card-description-font-mobile)}}}@layer link{:host .gcds-card gcds-link::part(link):after{bottom:0;content:\"\";left:0;pointer-events:auto;position:absolute;right:0;top:0;z-index:1}}@layer hover{@media (hover:hover){:host .gcds-card:hover{background-color:var(--gcds-card-hover-background-color);box-shadow:var(--gcds-card-hover-box-shadow);cursor:pointer}}}@layer focus{:host .gcds-card:has(:focus-within){box-shadow:var(--gcds-card-focus-box-shadow);outline:var(--gcds-card-focus-outline);outline-offset:var(--gcds-card-focus-outline-offset)}:host gcds-link::part(link):focus{background-color:var(--gcds-card-focus-link-background-color);border:var(--gcds-card-focus-link-border);box-shadow:var(--gcds-card-focus-link-box-shadow);color:var(--gcds-card-focus-link-color);outline:var(--gcds-card-focus-link-outline);text-decoration:underline currentColor var(--gcds-card-focus-link-text-decoration-thickness)}}";
const GcdsCardStyle0 = gcdsCardCss;

const GcdsCard = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.gcdsFocus = index.createEvent(this, "gcdsFocus", 7);
        this.gcdsBlur = index.createEvent(this, "gcdsBlur", 7);
        this.gcdsClick = index.createEvent(this, "gcdsClick", 7);
        this.cardTitle = undefined;
        this.href = undefined;
        this.cardTitleTag = 'a';
        this.description = undefined;
        this.badge = undefined;
        this.imgSrc = undefined;
        this.imgAlt = undefined;
        this.lang = undefined;
        this.errors = [];
    }
    validateCardTitle() {
        if (!this.cardTitle || this.cardTitle.trim() == '') {
            this.errors.push('cardTitle');
        }
        else if (this.errors.includes('cardTitle')) {
            this.errors.splice(this.errors.indexOf('cardTitle'), 1);
        }
    }
    validateHref() {
        if (!this.href || this.href.trim() == '') {
            this.errors.push('href');
        }
        else if (this.errors.includes('href')) {
            this.errors.splice(this.errors.indexOf('href'), 1);
        }
    }
    validateBadge() {
        if (this.badge && this.badge.length > 20) {
            console.error(`${I18N$k['en'].badgeError} | ${I18N$k['fr'].badgeError}`);
            this.errors.push('badge');
        }
        else if (this.errors.includes('badge')) {
            this.errors.splice(this.errors.indexOf('badge'), 1);
        }
    }
    /*
     * Observe lang attribute change
     */
    updateLang() {
        const observer = new MutationObserver(mutations => {
            if (mutations[0].oldValue != this.el.lang) {
                this.lang = this.el.lang;
            }
        });
        observer.observe(this.el, observerConfig);
    }
    /*
     * Validate required properties
     */
    validateRequiredProps() {
        this.validateCardTitle();
        this.validateHref();
        if (this.errors.includes('href') || this.errors.includes('cardTitle')) {
            return false;
        }
        return true;
    }
    async componentWillLoad() {
        // Define lang attribute
        this.lang = assignLanguage(this.el);
        this.updateLang();
        this.validateBadge();
        let valid = this.validateRequiredProps();
        if (!valid) {
            logError('gcds-card', this.errors, ['badge']);
        }
    }
    get renderDescription() {
        if (this.el.innerHTML.trim() != '') {
            return index.h("div", { class: "gcds-card__description" }, index.h("slot", null));
        }
        else if (this.description) {
            return index.h("div", { class: "gcds-card__description" }, index.h("gcds-text", { "margin-bottom": '0' }, this.description));
        }
        else {
            return null;
        }
    }
    render() {
        const { cardTitle, cardTitleTag, href, badge, imgSrc, imgAlt, renderDescription, lang, errors, } = this;
        const Element = cardTitleTag;
        const taggedAttr = {};
        if (badge) {
            taggedAttr['aria-describedby'] = 'gcds-badge';
        }
        if (this.validateRequiredProps()) {
            return (index.h(index.Host, null, index.h("div", { class: "gcds-card" }, imgSrc && (index.h("img", { src: imgSrc, alt: imgAlt ? imgAlt : '', class: "gcds-card__image" })), badge && !errors.includes('badge') && (index.h("gcds-text", { id: "gcds-badge", class: "gcds-badge", "text-role": "light", "margin-bottom": "0", size: "caption" }, index.h("strong", null, index.h("gcds-sr-only", null, I18N$k[lang].tagged), badge))), Element != 'a' ? (index.h(Element, Object.assign({ class: "gcds-card__title" }, taggedAttr), index.h("gcds-link", { href: href }, cardTitle))) : (index.h("gcds-link", Object.assign({ href: href, class: "gcds-card__title" }, taggedAttr), cardTitle)), renderDescription)));
        }
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "cardTitle": ["validateCardTitle"],
        "href": ["validateHref"],
        "badge": ["validateBadge"]
    }; }
};
GcdsCard.style = GcdsCardStyle0;

const defaultValidator = {
    validate: (_x) => true,
};
function combineValidators(v1, v2) {
    let combined;
    combined = {
        validate: (x) => {
            const res1 = v1.validate(x);
            const res2 = v2.validate(x);
            if (!res1) {
                combined.errorMessage = v1.errorMessage;
            }
            else if (!res2) {
                combined.errorMessage = v2.errorMessage;
            }
            return res1 && res2;
        },
    };
    return combined;
}
function requiredValidator(element, type, subtype) {
    if (element.required) {
        switch (type) {
            // Components all validate the "value" property
            case 'input':
                switch (subtype) {
                    case 'email':
                        if (element.validator) {
                            element.validator.unshift('requiredEmailField');
                        }
                        else {
                            element.validator = ['requiredEmailField'];
                        }
                        break;
                    default:
                        if (element.validator) {
                            element.validator.unshift('requiredField');
                        }
                        else {
                            element.validator = ['requiredField'];
                        }
                        break;
                }
                break;
            case 'select':
                if (element.validator) {
                    element.validator.unshift('requiredSelectField');
                }
                else {
                    element.validator = ['requiredSelectField'];
                }
                break;
            case 'textarea':
                if (element.validator) {
                    element.validator.unshift('requiredField');
                }
                else {
                    element.validator = ['requiredField'];
                }
                break;
            case 'file':
                if (element.validator) {
                    element.validator.unshift('requiredFileInput');
                }
                else {
                    element.validator = ['requiredFileInput'];
                }
                break;
            case 'checkbox':
                if (element.validator) {
                    element.validator.unshift('requiredCheck');
                }
                else {
                    element.validator = ['requiredCheck'];
                }
                break;
            case 'fieldset':
                if (element.validator) {
                    element.validator.unshift('requiredFieldset');
                }
                else {
                    element.validator = ['requiredFieldset'];
                }
                break;
            case 'date-input':
                if (element.validator) {
                    element.validator.unshift('requiredDateInput');
                }
                else {
                    element.validator = ['requiredDateInput'];
                }
                break;
        }
    }
}
/*
Example of parameter validator

export function getLengthValidator(min: number, max: number): Validator<string> {
    // Create errorMessage object
    let errorMessage = {};
    if (min && max) {
        errorMessage["en"] = `You must enter between ${min} and ${max} characters`;
        errorMessage["fr"] = `French You must enter between ${min} and ${max} characters`;
    } else if (min) {
        errorMessage["en"] = `You must enter at least ${min} characters`;
        errorMessage["fr"] = `French You must enter at least ${min} characters`;
    } else if (max) {
        errorMessage["en"] = `You must enter less than ${max} characters`;
        errorMessage["fr"] = `French You must enter less than ${max} characters`;
    }
    return {
        validate: (value: string) => {
            value = value || '';
            if (min && max) {
                return min <= value.length && value.length <= max;
            }
            if (min) {
                return min <= value.length;
            }
            if (max) {
                return value.length <= max;
            }
            return true;
        },
        errorMessage
    };
}
*/

const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const requiredField = {
    validate: (value) => value != null && value.trim() != '',
    errorMessage: {
        en: 'Enter information to continue.',
        fr: 'Saisissez des renseignements pour continuer.',
    },
};
const requiredEmailField = {
    validate: (value) => value != null &&
        value.trim() != '' &&
        (value.toLowerCase().match(emailPattern) ? true : false),
    errorMessage: {
        en: 'Enter a valid email address to continue. Use a standard format. Example: name@address.ca.',
        fr: 'Saisissez votre adresse courriel pour continuer. Utilisez un format standard. Exemple: nom@adresse.ca.',
    },
};
const requiredFileInput = {
    validate: (value) => value.length > 0,
    errorMessage: {
        en: 'You must upload a file to continue.',
        fr: 'Vous devez téléverser un fichier pour continuer.',
    },
};
const requiredSelectField = {
    validate: (value) => value != null && value.trim() != '',
    errorMessage: {
        en: 'Choose an option to continue.',
        fr: 'Choisissez une option pour continuer.',
    },
};
/*
 * Date input validators
 */
const dateInputErrorMessage = {
    en: {
        all: 'Enter the date.',
        missingmonth: 'Select the month.',
        missingyear: 'Enter the year.',
        missingday: 'Enter the day.',
        missingmonthday: 'Select the month and enter the day.',
        missingmonthyear: 'Select the month and enter the year.',
        missingdayyear: 'Enter the day and year.',
        invalidyearlength: 'Year must be 4 digits.',
        invalidyear: 'Enter a valid year.',
        invalidday: 'Enter a valid day.',
    },
    fr: {
        all: 'Saisissez la date.',
        missingmonth: 'Sélectionnez un mois.',
        missingyear: "Saisissez l'année.",
        missingday: 'Saisissez le jour.',
        missingmonthday: 'Saisissez le jour et sélectionnez un mois.',
        missingmonthyear: "Sélectionnez un mois et saisissez l'année.",
        missingdayyear: "Saisissez le jour et l'année.",
        invalidyearlength: "L'année doit inclure 4 chiffres.",
        invalidyear: 'Entrez une année valide.',
        invalidday: 'Saisissez un jour valide.',
    },
};
const requiredDateInput = {
    validate: (date) => {
        if (isValidDate(date)) {
            return { valid: true };
        }
        let splitDate = date.split('-');
        let dateObject = {
            day: splitDate[2],
            month: splitDate[1],
            year: splitDate[0],
        };
        let format = splitDate.length === 3 ? 'full' : 'compact';
        const error = getDateInputError(dateObject, format);
        return error;
    },
    errorMessage: dateInputErrorMessage,
};
const getDateInputError = (dateValues, format) => {
    const { day, month, year } = dateValues;
    let errorResponse = {
        valid: false,
        errors: {
            day: false,
            month: false,
            year: false,
        },
        reason: {
            en: '',
            fr: '',
        },
    };
    // No values set
    if (!day && !month && !year) {
        errorResponse.errors.day = true;
        errorResponse.errors.month = true;
        errorResponse.errors.year = true;
        errorResponse.reason.en = dateInputErrorMessage.en.all;
        errorResponse.reason.fr = dateInputErrorMessage.fr.all;
        // No day set
    }
    else if (!day && month && year) {
        errorResponse.errors.day = true;
        errorResponse.reason.en = dateInputErrorMessage.en.missingday;
        errorResponse.reason.fr = dateInputErrorMessage.fr.missingday;
        // No month set
    }
    else if ((day && !month && year) ||
        (!day && !month && year && format === 'compact')) {
        errorResponse.errors.month = true;
        errorResponse.reason.en = dateInputErrorMessage.en.missingmonth;
        errorResponse.reason.fr = dateInputErrorMessage.fr.missingmonth;
        // No year set
    }
    else if ((day && month && !year) ||
        (!day && month && !year && format === 'compact')) {
        errorResponse.errors.year = true;
        errorResponse.reason.en = dateInputErrorMessage.en.missingyear;
        errorResponse.reason.fr = dateInputErrorMessage.fr.missingyear;
        // No day and month set
    }
    else if (!day && !month && year) {
        errorResponse.errors.day = true;
        errorResponse.errors.month = true;
        errorResponse.reason.en = dateInputErrorMessage.en.missingmonthday;
        errorResponse.reason.fr = dateInputErrorMessage.fr.missingmonthday;
        // No day and year set
    }
    else if (!day && month && !year) {
        errorResponse.errors.day = true;
        errorResponse.errors.year = true;
        errorResponse.reason.en = dateInputErrorMessage.en.missingdayyear;
        errorResponse.reason.fr = dateInputErrorMessage.fr.missingdayyear;
        // No month and year set
    }
    else if (day && !month && !year) {
        errorResponse.errors.year = true;
        errorResponse.errors.month = true;
        errorResponse.reason.en = dateInputErrorMessage.en.missingmonthyear;
        errorResponse.reason.fr = dateInputErrorMessage.fr.missingmonthyear;
        // Year is formatted incorrectly
    }
    else if (year.length != 4) {
        errorResponse.errors.year = true;
        errorResponse.reason.en = dateInputErrorMessage.en.invalidyearlength;
        errorResponse.reason.fr = dateInputErrorMessage.fr.invalidyearlength;
        // Year format
    }
    else if (year < 0 || year > 9999) {
        errorResponse.errors.year = true;
        errorResponse.reason.en = dateInputErrorMessage.en.invalidyear;
        errorResponse.reason.fr = dateInputErrorMessage.fr.invalidyear;
        // Invalid day
    }
    else {
        errorResponse.errors.day = true;
        errorResponse.reason.en = dateInputErrorMessage.en.invalidday;
        errorResponse.reason.fr = dateInputErrorMessage.fr.invalidday;
    }
    return errorResponse;
};

const requiredCheck = {
    validate: (value) => value,
    errorMessage: {
        en: 'You must check the box to continue.',
        fr: 'Vous devez cocher la case pour continuer.',
    },
};

const requiredFieldset = {
    validate: (id) => {
        const el = document.querySelector(`[fieldset-id=${id}]`);
        const elChildren = el.children;
        const isValid = validateFieldsetElements(el, elChildren);
        return !isValid.includes(false);
    },
    errorMessage: {
        en: 'Choose an option to continue.',
        fr: 'Choisissez une option pour continuer.',
    },
};
function validateFieldsetElements(element, nodeList) {
    let isValid = [];
    for (let i = 0; i < nodeList.length; i++) {
        switch (nodeList[i].nodeName) {
            case 'GCDS-FIELDSET': {
                const validFieldsetChildren = validateFieldsetElements(nodeList[i], nodeList[i].children);
                isValid = isValid.concat(validFieldsetChildren);
                break;
            }
            case 'GCDS-CHECKBOX': {
                // Checkboxes can share name property
                const inputName = nodeList[i].getAttribute('name');
                // Find all inputs with shared name
                const sameNameInputs = element.querySelectorAll(`[name=${inputName}]`);
                let childGroupValid = false;
                // Check if there is more than one input with this name
                if (sameNameInputs.length > 1) {
                    // Validate as group
                    for (let c = 0; c < sameNameInputs.length; c++) {
                        if (sameNameInputs[c].hasAttribute('checked')) {
                            childGroupValid = true;
                        }
                    }
                    isValid.push(childGroupValid);
                }
                else {
                    // Validate as single input
                    isValid.push(nodeList[i].hasAttribute('checked') ? true : false);
                }
                break;
            }
            case 'GCDS-RADIO-GROUP': {
                const inputName = nodeList[i].getAttribute('name');
                // Find all inputs with shared name
                const sameNameInputs = element.querySelector(`[name=${inputName}]`);
                const shadowInputs = sameNameInputs.shadowRoot.querySelectorAll('input');
                let childGroupValid = false;
                for (let r = 0; r < shadowInputs.length; r++) {
                    if (shadowInputs[r].checked) {
                        childGroupValid = true;
                    }
                }
                isValid.push(childGroupValid);
                break;
            }
        }
    }
    return isValid;
}

var ValidatorsName;
(function (ValidatorsName) {
    ValidatorsName["requiredField"] = "requiredField";
    ValidatorsName["requiredEmailField"] = "requiredEmailField";
    ValidatorsName["requiredCheck"] = "requiredCheck";
    ValidatorsName["requiredFieldset"] = "requiredFieldset";
    ValidatorsName["requiredFileInput"] = "requiredFileInput";
    ValidatorsName["requiredSelectField"] = "requiredSelectField";
    ValidatorsName["requiredDateInput"] = "requiredDateInput";
})(ValidatorsName || (ValidatorsName = {}));
function getValidator(list) {
    return (list || [])
        .map(v => {
        if (typeof v === 'string') {
            return validatorFactory(v);
        }
        else if (v && v.name) {
            v = v;
            return validatorFactory(v.name);
        }
        else {
            return v;
        }
    })
        .reduce(combineValidators, defaultValidator);
}
function validatorFactory(name, options) {
    switch (name) {
        case ValidatorsName.requiredField:
            return requiredField;
        case ValidatorsName.requiredEmailField:
            return requiredEmailField;
        case ValidatorsName.requiredSelectField:
            return requiredSelectField;
        case ValidatorsName.requiredCheck:
            return requiredCheck;
        case ValidatorsName.requiredFieldset:
            return requiredFieldset;
        case ValidatorsName.requiredDateInput:
            return requiredDateInput;
        case ValidatorsName.requiredFileInput:
            return requiredFileInput;
        default:
            return defaultValidator;
    }
}

const gcdsCheckboxCss = "@layer reset, default, disabled, error, focus;@layer reset{:host{display:block}:host .gcds-checkbox{padding:0}:host .gcds-checkbox gcds-label:after,:host .gcds-checkbox gcds-label:before{box-sizing:border-box;content:\"\";cursor:pointer}}@layer default{:host .gcds-checkbox{color:var(--gcds-checkbox-default-text);font:var(--gcds-checkbox-font);margin:var(--gcds-checkbox-margin)!important;max-width:var(--gcds-checkbox-max-width);min-height:calc(var(--gcds-checkbox-input-height-and-width) - var(--gcds-checkbox-padding));padding:var(--gcds-checkbox-padding) 0 0;position:relative;transition:color .15s ease-in-out}:host .gcds-checkbox :is(gcds-label,gcds-hint,gcds-error-message){padding:var(--gcds-checkbox-label-padding)!important}:host .gcds-checkbox gcds-hint::part(hint){margin:0}:host .gcds-checkbox gcds-label:after,:host .gcds-checkbox gcds-label:before,:host .gcds-checkbox input{position:absolute}:host .gcds-checkbox gcds-label:before,:host .gcds-checkbox input{height:var(--gcds-checkbox-input-height-and-width);left:0;top:0;width:var(--gcds-checkbox-input-height-and-width)}:host .gcds-checkbox input{opacity:0}:host .gcds-checkbox gcds-label{width:fit-content}:host .gcds-checkbox gcds-label:before{border:var(--gcds-checkbox-input-border-width) solid;border-radius:var(--gcds-checkbox-input-border-radius);transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out,outline .15s ease-in-out}:host .gcds-checkbox gcds-label:after{border:var(--gcds-checkbox-check-border-width) solid;border-block-start:0!important;border-inline-start:0!important;height:var(--gcds-checkbox-check-height);left:var(--gcds-checkbox-check-left);opacity:0;top:var(--gcds-checkbox-check-top);transform:rotate(40deg);transition:opacity .2s ease-in-out;width:var(--gcds-checkbox-check-width)}:host .gcds-checkbox input:checked+gcds-label:after{opacity:1}}@layer disabled{:host .gcds-checkbox.gcds-checkbox--disabled{color:var(--gcds-checkbox-disabled-text)}:host .gcds-checkbox.gcds-checkbox--disabled gcds-label{color:var(--gcds-checkbox-disabled-text)}:host .gcds-checkbox.gcds-checkbox--disabled gcds-label:after,:host .gcds-checkbox.gcds-checkbox--disabled gcds-label:before{cursor:not-allowed}:host .gcds-checkbox.gcds-checkbox--disabled gcds-label:before{background-color:var(--gcds-checkbox-disabled-background);border-color:currentcolor}}@layer error{:host .gcds-checkbox.gcds-checkbox--error:not(:focus-within) gcds-label:before{border-color:var(--gcds-checkbox-danger-border)}:host .gcds-checkbox.gcds-checkbox--error:not(:focus-within) gcds-label:after{color:var(--gcds-checkbox-danger-border)}}@layer focus{:host .gcds-checkbox:focus-within{color:var(--gcds-checkbox-focus-text)}:host .gcds-checkbox:focus-within input:focus+gcds-label:before{background:var(--gcds-checkbox-focus-background);box-shadow:var(--gcds-checkbox-focus-box-shadow);outline:var(--gcds-checkbox-focus-outline-width) solid currentcolor;outline-offset:var(--gcds-checkbox-input-border-width)}}";
const GcdsCheckboxStyle0 = gcdsCheckboxCss;

const GcdsCheckbox = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.gcdsClick = index.createEvent(this, "gcdsClick", 7);
        this.gcdsFocus = index.createEvent(this, "gcdsFocus", 7);
        this.gcdsBlur = index.createEvent(this, "gcdsBlur", 7);
        this.gcdsChange = index.createEvent(this, "gcdsChange", 7);
        this.gcdsError = index.createEvent(this, "gcdsError", 7);
        this.gcdsValid = index.createEvent(this, "gcdsValid", 7);
        if (hostRef.$hostElement$["s-ei"]) {
            this.internals = hostRef.$hostElement$["s-ei"];
        }
        else {
            this.internals = hostRef.$hostElement$.attachInternals();
            hostRef.$hostElement$["s-ei"] = this.internals;
        }
        this._validator = defaultValidator;
        this.onBlur = () => {
            if (this.validateOn == 'blur') {
                this.validate();
            }
            this.gcdsBlur.emit();
        };
        this.onChange = e => {
            this.checked = !this.checked;
            this.internals.setFormValue(e.target.value, 'checked');
            if (!this.checked) {
                this.internals.setFormValue(null, 'checked');
            }
            const changeEvt = new e.constructor(e.type, e);
            this.el.dispatchEvent(changeEvt);
            this.gcdsChange.emit(this.checked);
        };
        this.checkboxId = undefined;
        this.label = undefined;
        this.name = undefined;
        this.required = undefined;
        this.disabled = undefined;
        this.value = undefined;
        this.checked = undefined;
        this.errorMessage = undefined;
        this.hint = undefined;
        this.validator = undefined;
        this.validateOn = undefined;
        this.parentError = undefined;
        this.inheritedAttributes = {};
        this.hasError = undefined;
        this.lang = undefined;
    }
    validateDisabledCheckbox() {
        if (this.required) {
            this.disabled = false;
        }
    }
    validateErrorMessage() {
        if (this.disabled) {
            this.errorMessage = '';
        }
        else if (!this.hasError && this.errorMessage) {
            this.hasError = true;
        }
        else if (this.errorMessage == '') {
            this.hasError = false;
        }
    }
    validateValidator() {
        if (this.validator && !this.validateOn) {
            this.validateOn = 'blur';
        }
    }
    /**
     * Event listener for gcds-fieldset errors
     */
    gcdsGroupError(e) {
        if (e.srcElement.contains(this.el) && elementGroupCheck(this.name)) {
            this.hasError = true;
            this.parentError = e.detail;
        }
        else if (!elementGroupCheck(this.name)) {
            this.hasError = false;
            this.parentError = '';
        }
    }
    gcdsGroupErrorClear(e) {
        if (e.srcElement.contains(this.el) && this.hasError) {
            this.hasError = false;
            this.parentError = '';
        }
    }
    validateHasError() {
        if (this.disabled) {
            this.hasError = false;
        }
    }
    /**
     * Call any active validators
     */
    async validate() {
        if (!this._validator.validate(this.checked) &&
            this._validator.errorMessage) {
            this.errorMessage = this._validator.errorMessage[this.lang];
            this.gcdsError.emit({
                id: `#${this.checkboxId}`,
                message: `${this.label} - ${this.errorMessage}`,
            });
        }
        else {
            this.errorMessage = '';
            this.gcdsValid.emit({ id: `#${this.checkboxId}` });
        }
    }
    submitListener(e) {
        if (e.target == this.el.closest('form')) {
            if (this.validateOn && this.validateOn != 'other') {
                this.validate();
            }
            if (this.hasError) {
                e.preventDefault();
            }
        }
    }
    /*
     * Form internal functions
     */
    formResetCallback() {
        if (this.checked != this.initialState) {
            this.checked = this.initialState;
        }
    }
    formStateRestoreCallback(state) {
        this.internals.setFormValue(state);
        this.checked = state;
    }
    /*
     * Observe lang attribute change
     */
    updateLang() {
        const observer = new MutationObserver(mutations => {
            if (mutations[0].oldValue != this.el.lang) {
                this.lang = this.el.lang;
            }
        });
        observer.observe(this.el, observerConfig);
    }
    async componentWillLoad() {
        // Define lang attribute
        this.lang = assignLanguage(this.el);
        this.updateLang();
        this.validateDisabledCheckbox();
        this.validateHasError();
        this.validateErrorMessage();
        this.validateValidator();
        // Assign required validator if needed
        requiredValidator(this.el, 'checkbox');
        if (this.validator) {
            this._validator = getValidator(this.validator);
        }
        this.inheritedAttributes = inheritAttributes(this.el, this.shadowElement);
        this.internals.setFormValue(this.checked ? this.value : null);
        this.initialState = this.checked ? this.checked : null;
    }
    componentWillUpdate() {
        if (this.validator) {
            this._validator = getValidator(this.validator);
        }
    }
    render() {
        const { lang, checkboxId, label, name, required, disabled, value, checked, hint, errorMessage, hasError, parentError, inheritedAttributes, } = this;
        const attrsInput = Object.assign({ name,
            disabled,
            required,
            value,
            checked }, inheritedAttributes);
        const attrsLabel = {
            label,
            required,
        };
        if (hint || errorMessage || parentError) {
            const hintID = hint ? `hint-${checkboxId} ` : '';
            const errorID = errorMessage ? `error-message-${checkboxId} ` : '';
            const parentErrorID = parentError ? `parent-error-${checkboxId} ` : '';
            attrsInput['aria-describedby'] = `${hintID}${errorID}${parentErrorID}${attrsInput['aria-describedby']
                ? `${attrsInput['aria-describedby']}`
                : ''}`;
        }
        if (hasError) {
            attrsInput['aria-invalid'] = 'true';
        }
        return (index.h(index.Host, null, index.h("div", { class: `gcds-checkbox ${disabled ? 'gcds-checkbox--disabled' : ''} ${hasError ? 'gcds-checkbox--error' : ''}` }, index.h("input", Object.assign({ id: checkboxId, type: "checkbox" }, attrsInput, { onBlur: () => this.onBlur(), onFocus: () => this.gcdsFocus.emit(), onChange: e => this.onChange(e), onClick: e => emitEvent(e, this.gcdsClick), ref: element => (this.shadowElement = element) })), index.h("gcds-label", Object.assign({}, attrsLabel, { "label-for": checkboxId, lang: lang })), hint ? index.h("gcds-hint", { "hint-id": checkboxId }, hint) : null, errorMessage ? (index.h("gcds-error-message", { messageId: checkboxId }, errorMessage)) : null, parentError ? (index.h("span", { id: `parent-error-${checkboxId}`, hidden: true }, parentError)) : null)));
    }
    static get delegatesFocus() { return true; }
    static get formAssociated() { return true; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "disabled": ["validateDisabledCheckbox"],
        "errorMessage": ["validateErrorMessage"],
        "validator": ["validateValidator"],
        "hasError": ["validateHasError"]
    }; }
};
GcdsCheckbox.style = GcdsCheckboxStyle0;

const gcdsContainerCss = "@layer reset, default, border, centered, main, margin, padding, size;@layer reset{:host{display:block}:host .gcds-container{box-sizing:border-box;display:block;margin:0;padding:0}:host .gcds-container slot{display:initial}}@layer default{:host .gcds-container[class*=size]{width:var(--gcds-container-size-full)}}@layer border{:host .gcds-container.container-border{border:var(--gcds-container-border)}}@layer centered{:host .gcds-container.container-centered{margin-inline:auto!important}}@layer main{:host .gcds-container.container-main:not(.size-full){width:90%}}@layer margin{:host .gcds-container.m-0{margin:var(--gcds-container-spacing-0)}:host .gcds-container.m-50{margin:var(--gcds-container-spacing-50)}:host .gcds-container.m-100{margin:var(--gcds-container-spacing-100)}:host .gcds-container.m-150{margin:var(--gcds-container-spacing-150)}:host .gcds-container.m-200{margin:var(--gcds-container-spacing-200)}:host .gcds-container.m-250{margin:var(--gcds-container-spacing-250)}:host .gcds-container.m-300{margin:var(--gcds-container-spacing-300)}:host .gcds-container.m-400{margin:var(--gcds-container-spacing-400)}:host .gcds-container.m-450{margin:var(--gcds-container-spacing-450)}:host .gcds-container.m-500{margin:var(--gcds-container-spacing-500)}:host .gcds-container.m-550{margin:var(--gcds-container-spacing-550)}:host .gcds-container.m-600{margin:var(--gcds-container-spacing-600)}:host .gcds-container.m-700{margin:var(--gcds-container-spacing-700)}:host .gcds-container.m-800{margin:var(--gcds-container-spacing-800)}:host .gcds-container.m-900{margin:var(--gcds-container-spacing-900)}:host .gcds-container.m-1000{margin:var(--gcds-container-spacing-1000)}}@layer padding{:host .gcds-container.p-0{padding:var(--gcds-container-spacing-0)}:host .gcds-container.p-50{padding:var(--gcds-container-spacing-50)}:host .gcds-container.p-100{padding:var(--gcds-container-spacing-100)}:host .gcds-container.p-150{padding:var(--gcds-container-spacing-150)}:host .gcds-container.p-200{padding:var(--gcds-container-spacing-200)}:host .gcds-container.p-250{padding:var(--gcds-container-spacing-250)}:host .gcds-container.p-300{padding:var(--gcds-container-spacing-300)}:host .gcds-container.p-400{padding:var(--gcds-container-spacing-400)}:host .gcds-container.p-450{padding:var(--gcds-container-spacing-450)}:host .gcds-container.p-500{padding:var(--gcds-container-spacing-500)}:host .gcds-container.p-550{padding:var(--gcds-container-spacing-550)}:host .gcds-container.p-600{padding:var(--gcds-container-spacing-600)}:host .gcds-container.p-700{padding:var(--gcds-container-spacing-700)}:host .gcds-container.p-800{padding:var(--gcds-container-spacing-800)}:host .gcds-container.p-900{padding:var(--gcds-container-spacing-900)}:host .gcds-container.p-1000{padding:var(--gcds-container-spacing-1000)}}@layer size{:host .gcds-container.size-xl{max-width:var(--gcds-container-size-xl)}:host .gcds-container.size-lg{max-width:var(--gcds-container-size-lg)}:host .gcds-container.size-md{max-width:var(--gcds-container-size-md)}:host .gcds-container.size-sm{max-width:var(--gcds-container-size-sm)}:host .gcds-container.size-xs{max-width:var(--gcds-container-size-xs)}}";
const GcdsContainerStyle0 = gcdsContainerCss;

const GcdsContainer = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.border = false;
        this.centered = false;
        this.mainContainer = false;
        this.margin = undefined;
        this.padding = undefined;
        this.size = 'full';
        this.tag = 'div';
    }
    render() {
        const { border, centered, mainContainer, margin, padding, size, tag } = this;
        const Tag = tag;
        return (index.h(index.Host, null, index.h(Tag, { class: `
            gcds-container
            ${border ? 'container-border' : ''}
            ${centered ? 'container-centered' : ''}
            ${mainContainer ? 'container-main' : ''}
            ${margin ? `m-${margin}` : ''}
            ${padding ? `p-${padding}` : ''}
            ${size ? `size-${size}` : ''}
          ` }, index.h("slot", null))));
    }
    get el() { return index.getElement(this); }
};
GcdsContainer.style = GcdsContainerStyle0;

const I18N$j = {
  en: {
    year: 'Year',
    month: 'Month',
    day: 'Day',
    selectmonth: 'Select a month',
    months: {
      '01': 'January',
      '02': 'February',
      '03': 'March',
      '04': 'April',
      '05': 'May',
      '06': 'June',
      '07': 'July',
      '08': 'August',
      '09': 'September',
      '10': 'October',
      '11': 'November',
      '12': 'December',
    },
    valueError: 'gcds-date-input:  Value attribute contains an invalid date format. Expected format: ',
    valueFormatfull: 'YYYY-MM-DD',
    valueFormatcompact: 'YYYY-MM'
  },
  fr: {
    year: 'Année',
    month: 'Mois',
    day: 'Jour',
    selectmonth: 'Sélectionnez un mois',
    months : {
      '01': 'janvier',
      '02': 'février',
      '03': 'mars',
      '04': 'avril',
      '05': 'mai',
      '06': 'juin',
      '07': 'juillet',
      '08': 'août',
      '09': 'septembre',
      '10': 'octobre',
      '11': 'novembre',
      '12': 'décembre',
    },
    valueError: 'gcds-date-input:  Value attribute contains an invalid date format. Expected format: ',
    valueFormatfull: 'YYYY-MM-DD',
    valueFormatcompact: 'YYYY-MM'
  },
};

const gcdsDateInputCss = "@layer reset, default, hint, error;@layer reset{:host{display:block}}@layer default{:host .gcds-date-input__fieldset{--gcds-fieldset-font-desktop:var(--gcds-date-input-fieldset-font-desktop);--gcds-fieldset-font-mobile:var(--gcds-date-input-fieldset-font-mobile);--gcds-fieldset-legend-margin:var(--gcds-date-input-fieldset-margin)}:host .gcds-date-input__day,:host .gcds-date-input__month,:host .gcds-date-input__year{display:inline-block;margin-inline-end:var(--gcds-date-input-margin);--gcds-label-font-desktop:var(--gcds-date-input-label-font-desktop);--gcds-label-font-mobile:var(--gcds-date-input-label-font-mobile )}}@layer hint{:host .gcds-date-input--hint{--gcds-fieldset-legend-margin:var(--gcds-date-input-fieldset-hint-margin)}}@layer error{:host .gcds-date-input--error{--gcds-fieldset-legend-margin:var(--gcds-date-input-fieldset-error-margin )}:host gcds-input.gcds-date-input--error::part(input),:host gcds-select.gcds-date-input--error::part(select){border-color:var(--gcds-date-input-danger-border)}}";
const GcdsDateInputStyle0 = gcdsDateInputCss;

const GcdsDateInput = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.gcdsFocus = index.createEvent(this, "gcdsFocus", 7);
        this.gcdsBlur = index.createEvent(this, "gcdsBlur", 7);
        this.gcdsInput = index.createEvent(this, "gcdsInput", 7);
        this.gcdsChange = index.createEvent(this, "gcdsChange", 7);
        this.gcdsError = index.createEvent(this, "gcdsError", 7);
        this.gcdsValid = index.createEvent(this, "gcdsValid", 7);
        if (hostRef.$hostElement$["s-ei"]) {
            this.internals = hostRef.$hostElement$["s-ei"];
        }
        else {
            this.internals = hostRef.$hostElement$.attachInternals();
            hostRef.$hostElement$["s-ei"] = this.internals;
        }
        this._validator = defaultValidator;
        this.onBlur = () => {
            if (this.validateOn == 'blur') {
                this.validate();
            }
        };
        /*
         * Handle input event to update state
         */
        this.handleInput = (e, type) => {
            const val = e.target && e.target.value;
            if (type === 'year') {
                this.yearValue = val;
            }
            else if (type === 'month') {
                this.monthValue = val;
            }
            else if (type === 'day') {
                this.dayValue = val;
            }
            this.setValue();
            if (e.type === 'change') {
                const changeEvt = new e.constructor(e.type, e);
                this.el.dispatchEvent(changeEvt);
            }
        };
        this.name = undefined;
        this.legend = undefined;
        this.format = undefined;
        this.value = undefined;
        this.required = false;
        this.hint = undefined;
        this.errorMessage = undefined;
        this.disabled = false;
        this.validator = undefined;
        this.validateOn = undefined;
        this.monthValue = '';
        this.dayValue = '';
        this.yearValue = '';
        this.hasError = {
            day: false,
            month: false,
            year: false,
        };
        this.errors = [];
        this.lang = undefined;
    }
    validateName() {
        if (!this.name) {
            this.errors.push('name');
        }
        else if (this.errors.includes('name')) {
            this.errors.splice(this.errors.indexOf('name'), 1);
        }
    }
    validateLegend() {
        if (!this.legend) {
            this.errors.push('legend');
        }
        else if (this.errors.includes('legend')) {
            this.errors.splice(this.errors.indexOf('legend'), 1);
        }
    }
    validateFormat() {
        if (!this.format || (this.format != 'full' && this.format != 'compact')) {
            this.errors.push('format');
        }
        else if (this.errors.includes('format')) {
            this.errors.splice(this.errors.indexOf('format'), 1);
        }
    }
    validateValue() {
        if (this.value && !isValidDate(this.value)) {
            this.errors.push('value');
            this.value = '';
            console.error(`${I18N$j['en'].valueError}${I18N$j['en'][`valueFormat${this.format}`]} | ${I18N$j['fr'].valueError}${I18N$j['fr'][`valueFormat${this.format}`]}`);
        }
        else if (this.errors.includes('value')) {
            this.errors.splice(this.errors.indexOf('value'), 1);
        }
    }
    validateValidator() {
        if (this.validator && !this.validateOn) {
            this.validateOn = 'blur';
        }
    }
    /**
     * Call any active validators
     */
    async validate() {
        const validationResult = this._validator.validate(this.format === 'full'
            ? `${this.yearValue}-${this.monthValue}-${this.dayValue}`
            : `${this.yearValue}-${this.monthValue}`);
        if (!validationResult.valid) {
            this.errorMessage = validationResult.reason[this.lang];
            this.hasError = Object.assign({}, validationResult.errors);
            this.gcdsError.emit({
                message: `${this.legend} - ${this.errorMessage}`,
                errors: validationResult.errors,
            });
        }
        else {
            this.errorMessage = '';
            this.gcdsValid.emit();
            this.hasError = {
                day: false,
                month: false,
                year: false,
            };
        }
    }
    /*
     * Event listeners
     */
    async submitListener(e) {
        if (e.target == this.el.closest('form')) {
            if (this.validateOn && this.validateOn != 'other') {
                this.validate();
            }
            for (const key in this.hasError) {
                if (this.hasError[key]) {
                    e.preventDefault();
                }
            }
        }
    }
    /*
     * Form internal functions
     */
    formResetCallback() {
        if (this.value != this.initialValue) {
            this.internals.setFormValue(this.initialValue);
            this.value = this.initialValue;
        }
    }
    formStateRestoreCallback(state) {
        this.internals.setFormValue(state);
        this.value = state;
    }
    /*
     * Observe lang attribute change
     */
    updateLang() {
        const observer = new MutationObserver(mutations => {
            if (mutations[0].oldValue != this.el.lang) {
                this.lang = this.el.lang;
            }
        });
        observer.observe(this.el, observerConfig);
    }
    /**
     * Logic to combine all input values together based on format
     */
    setValue() {
        const { yearValue, dayValue, monthValue, format } = this;
        // All form elements have something entered
        if (yearValue && monthValue && dayValue && format == 'full') {
            // Is the combined value a valid date
            if (isValidDate(`${yearValue}-${monthValue}-${dayValue}`, format)) {
                this.value = `${yearValue}-${monthValue}-${dayValue}`;
                this.internals.setFormValue(this.value);
            }
            else {
                this.value = null;
                this.internals.setFormValue(null);
                return false;
            }
        }
        else if (yearValue && monthValue && format == 'compact') {
            // Is the combined value a valid date
            if (isValidDate(`${yearValue}-${monthValue}`, format)) {
                this.value = `${yearValue}-${monthValue}`;
                this.internals.setFormValue(this.value);
            }
            else {
                this.value = null;
                this.internals.setFormValue(null);
                return false;
            }
        }
        else {
            this.value = null;
            this.internals.setFormValue(null);
            return false;
        }
        return true;
    }
    /**
     * Split value into parts depending on format
     */
    splitFormValue() {
        if (this.value && isValidDate(this.value, this.format)) {
            if (this.format == 'compact') {
                let splitValue = this.value.split('-');
                this.yearValue = splitValue[0];
                this.monthValue = splitValue[1];
            }
            else {
                let splitValue = this.value.split('-');
                this.yearValue = splitValue[0];
                this.monthValue = splitValue[1];
                this.dayValue = splitValue[2];
            }
        }
    }
    /**
     * Format day input value to add 0 to single digit values
     */
    formatDay(e) {
        if (!isNaN(e.target.value) && e.target.value.length === 1) {
            this.dayValue = '0' + e.target.value;
        }
    }
    validateRequiredProps() {
        this.validateName();
        this.validateLegend();
        this.validateFormat();
        if (this.errors.includes('name') ||
            this.errors.includes('legend') ||
            this.errors.includes('format')) {
            return false;
        }
        return true;
    }
    async componentWillLoad() {
        // Define lang attribute
        this.lang = assignLanguage(this.el);
        this.updateLang();
        this.validateValidator();
        // Assign required validator if needed
        requiredValidator(this.el, 'date-input');
        if (this.validator) {
            this._validator = getValidator(this.validator);
        }
        let valid = this.validateRequiredProps();
        if (!valid) {
            logError('gcds-date-input', this.errors);
        }
        this.validateValue();
        if (this.value && isValidDate(this.value)) {
            this.splitFormValue();
            this.setValue();
            this.initialValue = this.value;
        }
    }
    componentWillUpdate() {
        if (this.validator) {
            this._validator = getValidator(this.validator);
        }
    }
    render() {
        const { legend, name, format, required, hint, errorMessage, disabled, lang, hasError, } = this;
        let requiredAttr = {};
        if (required) {
            requiredAttr['aria-required'] = 'true';
        }
        // Array of months 01 - 12
        const options = Array.from({ length: 12 }, (_, i) => i + 1 < 10 ? `0${i + 1}` : `${i + 1}`);
        const month = (index.h("gcds-select", Object.assign({ label: I18N$j[lang].month, selectId: "month", name: "month", defaultValue: I18N$j[lang].selectmonth, disabled: disabled, onInput: e => this.handleInput(e, 'month'), onChange: e => this.handleInput(e, 'month'), value: this.monthValue, class: `gcds-date-input__month ${hasError['month'] ? 'gcds-date-input--error' : ''}` }, requiredAttr, { "aria-invalid": hasError['month'].toString(), "aria-description": hasError['month'] && errorMessage }), options.map(option => (index.h("option", { key: option, value: option }, I18N$j[lang]['months'][option])))));
        const year = (index.h("gcds-input", Object.assign({ name: "year", label: I18N$j[lang].year, inputId: "year", type: "number", size: 4, disabled: disabled, value: this.yearValue, onInput: e => this.handleInput(e, 'year'), onChange: e => this.handleInput(e, 'year'), class: `gcds-date-input__year ${hasError['year'] ? 'gcds-date-input--error' : ''}` }, requiredAttr, { "aria-invalid": hasError['year'].toString(), "aria-description": hasError['year'] && errorMessage })));
        const day = (index.h("gcds-input", Object.assign({ name: "day", label: I18N$j[lang].day, inputId: "day", type: "number", size: 2, disabled: disabled, value: this.dayValue, onInput: e => this.handleInput(e, 'day'), onChange: e => {
                this.handleInput(e, 'day');
                this.formatDay(e);
            }, class: `gcds-date-input__day ${hasError['day'] ? 'gcds-date-input--error' : ''}` }, requiredAttr, { "aria-invalid": hasError['day'].toString(), "aria-description": hasError['day'] && errorMessage })));
        return (index.h(index.Host, { name: name, onBlur: () => this.onBlur() }, this.validateRequiredProps() && (index.h("gcds-fieldset", { legend: legend, fieldsetId: "date-input", hint: hint, errorMessage: errorMessage, required: required, class: `gcds-date-input__fieldset${hint ? ' gcds-date-input--hint' : ''}${errorMessage ? ' gcds-date-input--error' : ''}`, lang: lang, "data-date": "true" }, format == 'compact'
            ? [month, year]
            : lang == 'en'
                ? [month, day, year]
                : [day, month, year]))));
    }
    static get delegatesFocus() { return true; }
    static get formAssociated() { return true; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "name": ["validateName"],
        "legend": ["validateLegend"],
        "format": ["validateFormat"],
        "value": ["validateValue"],
        "validator": ["validateValidator"]
    }; }
};
GcdsDateInput.style = GcdsDateInputStyle0;

const I18N$i = {
  en: {
    date: 'Date modified:',
    version: 'Version ',
  },
  fr: {
    date: 'Date de modification :',
    version: 'Version ',
  },
};

const gcdsDateModifiedCss = "@layer reset, default;@layer reset{:host{display:block}:host dl{margin:0}:host slot{display:initial}}@layer default{:host .gcds-date-modified{margin:var(--gcds-date-modified-margin)}:host .gcds-date-modified :is(dt,gcds-text,dd){display:inline}:host .gcds-date-modified dd{margin:var(--gcds-date-modified-description-margin)}}";
const GcdsDateModifiedStyle0 = gcdsDateModifiedCss;

const GcdsDateModified = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.type = 'date';
        this.lang = undefined;
    }
    /*
     * Observe lang attribute change
     */
    updateLang() {
        const observer = new MutationObserver(mutations => {
            if (mutations[0].oldValue != this.el.lang) {
                this.lang = this.el.lang;
            }
        });
        observer.observe(this.el, observerConfig);
    }
    async componentWillLoad() {
        // Define lang attribute
        this.lang = assignLanguage(this.el);
        this.updateLang();
    }
    render() {
        const { lang, type } = this;
        return (index.h(index.Host, null, index.h("dl", { class: "gcds-date-modified" }, index.h("dt", null, index.h("gcds-text", { display: "inline", "margin-bottom": "0" }, type === 'version' ? I18N$i[lang].version : I18N$i[lang].date)), index.h("dd", null, index.h("gcds-text", { display: "inline", "margin-bottom": "0" }, type === 'version' ? (index.h("slot", null)) : (index.h("time", null, index.h("slot", null))))))));
    }
    get el() { return index.getElement(this); }
};
GcdsDateModified.style = GcdsDateModifiedStyle0;

const gcdsDetailsCss = "@layer reset, default, hover, focus;@layer reset{:host{display:block}:host .details__summary{background-color:transparent;border-color:transparent;cursor:pointer;display:block}:host .details__panel slot{display:initial}:host .details__panel ::slotted(:first-child){margin-block-start:0}:host .details__panel ::slotted(:last-child){margin-block-end:0}:host .details__panel ::slotted(ol),:host .details__panel ::slotted(ul){padding:0}}@layer default{:host .gcds-details .details__summary{color:var(--gcds-details-default-text);font:var(--gcds-details-font);padding:var(--gcds-details-summary-padding);position:relative;text-align:left;text-decoration-color:currentColor;text-decoration-line:underline;text-decoration-style:solid;text-decoration-thickness:var(\n        --gcds-details-default-decoration-thickness\n      );text-underline-offset:.2em;transition:background-color .15s ease-in-out,color .15s ease-in-out}:host .gcds-details .details__summary:before{border-block-end:var(--gcds-details-summary-arrow-border-top-bottom) solid transparent;border-block-start:var(--gcds-details-summary-arrow-border-top-bottom) solid transparent;border-inline-start:var(--gcds-details-summary-arrow-border-left) solid currentColor;content:\"\";height:0;left:var(--gcds-details-summary-arrow-left);position:absolute;top:var(--gcds-details-summary-arrow-top);transition:transform .15s ease-in-out;width:0}:host .gcds-details .details__summary[aria-expanded=false]+.details__panel{display:none}:host .gcds-details .details__summary[aria-expanded=true]:before{transform:rotate(90deg)}:host .gcds-details .details__panel{border-inline-start:var(--gcds-details-panel-border-width) solid var(--gcds-details-panel-border-color);margin:var(--gcds-details-panel-margin);padding:var(--gcds-details-panel-padding)}:host .gcds-details .details__panel ::slotted(*){font:var(--gcds-details-font)}:host .gcds-details .details__panel ::slotted(:not(:last-child)){margin:0 0 var(--gcds-details-panel-slotted-margin)!important}:host .gcds-details .details__panel ::slotted(ol),:host .gcds-details .details__panel ::slotted(ul){margin-inline-start:var(\n          --gcds-details-panel-slotted-margin\n        )!important}:host .gcds-details .details__panel ::slotted(small){font:var(--gcds-details-font-small)}}@layer hover{@media (hover:hover){:host .gcds-details .details__summary:hover:not(:focus){color:var(--gcds-details-hover-text);text-decoration-thickness:var(--gcds-details-hover-decoration-thickness);text-underline-offset:.2em}:host .gcds-details .details__summary:hover:not(:focus):before{color:var(--gcds-details-hover-text)}}}@layer focus{:host .gcds-details .details__summary:focus{background-color:var(--gcds-details-focus-background);border-radius:var(--gcds-details-focus-border-radius);box-shadow:var(--gcds-details-focus-box-shadow);color:var(--gcds-details-focus-text);outline:var(--gcds-details-focus-outline);outline-offset:var(--gcds-details-focus-outline-offset);text-decoration:none}}";
const GcdsDetailsStyle0 = gcdsDetailsCss;

const GcdsDetails = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.gcdsFocus = index.createEvent(this, "gcdsFocus", 7);
        this.gcdsBlur = index.createEvent(this, "gcdsBlur", 7);
        this.gcdsClick = index.createEvent(this, "gcdsClick", 7);
        this.detailsTitle = undefined;
        this.open = false;
    }
    /**
     * Methods
     */
    /*
     * Toggle details open or closed
     */
    async toggle() {
        this.open = !this.open;
    }
    render() {
        const { detailsTitle, open } = this;
        return (index.h(index.Host, null, index.h("div", { class: "gcds-details" }, index.h("button", { "aria-expanded": open.toString(), "aria-controls": "details__panel", onBlur: () => this.gcdsBlur.emit(), onFocus: () => this.gcdsFocus.emit(), onClick: e => {
                const event = emitEvent(e, this.gcdsClick);
                if (event) {
                    this.toggle();
                }
            }, class: "details__summary", id: "details__summary" }, detailsTitle), index.h("div", { id: "details__panel", class: "details__panel", "aria-labelledby": "details__summary" }, index.h("slot", null)))));
    }
    get el() { return index.getElement(this); }
};
GcdsDetails.style = GcdsDetailsStyle0;

const gcdsErrorMessageCss = "@layer reset, default;@layer reset{:host{display:inline-block}:host slot{display:initial}}@layer default{:host .error-message gcds-icon,:host .error-message::part(text){color:var(--gcds-error-message-text-color)}}";
const GcdsErrorMessageStyle0 = gcdsErrorMessageCss;

const GcdsErrorMessage = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.messageId = undefined;
    }
    render() {
        const { messageId } = this;
        return (index.h(index.Host, { id: `error-message-${messageId}`, class: "gcds-error-message-wrapper" }, index.h("gcds-text", { class: "error-message", role: "alert", "margin-bottom": "300" }, index.h("gcds-icon", { name: "triangle-exclamation", "margin-right": "100" }), index.h("strong", null, index.h("slot", null)))));
    }
    get el() { return index.getElement(this); }
};
GcdsErrorMessage.style = GcdsErrorMessageStyle0;

const I18N$h = {
  en: {
    heading: 'There was a problem',
    subheading: 'Errors were found on this page:',
  },
  fr: {
    heading: 'Un problème est survenu',
    subheading: 'Des erreurs ont été trouvées sur cette page :',
  },
};

const gcdsErrorSummaryCss = "@layer reset, default, compact;@layer reset{:host{display:block}}@layer default{:host{container:component summary/inline-size}:host .gcds-error-summary{border:var(--gcds-error-summary-border-width) solid var(--gcds-error-summary-border-color);color:var(--gcds-error-summary-text);display:none;margin:var(--gcds-error-summary-margin);padding:var(--gcds-error-summary-padding);transition:background .15s ease-in-out,border .15s ease-in-out,color .15s ease-in-out}:host .gcds-error-summary.gcds-show{display:block}:host .gcds-error-summary .summary__errorlist{margin:var(--gcds-error-summary-list-margin);padding:0}:host .gcds-error-summary .summary__errorlist .summary__listitem{max-width:var(--gcds-error-summary-max-width)}:host .gcds-error-summary .summary__errorlist .summary__listitem:not(:last-child){padding:var(--gcds-error-summary-list-item-padding)}:host .gcds-error-summary .summary__errorlist .summary__listitem gcds-link::part(link):not(:focus){color:var(--gcds-error-summary-link-color)}}@layer compact{@container summary (width < 24em){:host .gcds-error-summary{padding:var(--gcds-error-summary-mobile-padding)}}}";
const GcdsErrorSummaryStyle0 = gcdsErrorSummaryCss;

const GcdsErrorSummary = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.errorLinksObject = {};
        this.heading = undefined;
        this.listen = true;
        this.errorLinks = undefined;
        this.lang = undefined;
        this.errorQueue = {};
        this.hasSubmitted = false;
    }
    listenChanged() {
        if (this.errorLinks) {
            this.listen = false;
        }
    }
    /**
     * Convert contextual links prop to object
     * (Object props get treated as string when using Stencil components without a framework)
     */
    errorLinksChanged(newErrorLinks) {
        if (typeof newErrorLinks == 'string') {
            this.errorLinks = JSON.parse(newErrorLinks);
        }
        else if (typeof newErrorLinks == 'object') {
            this.errorLinks = newErrorLinks;
        }
        this.errorQueue = this.errorLinks;
        // Turn off listen if error-links is being used
        if (this.listen) {
            this.listen = false;
        }
    }
    errorListener(e) {
        if (this.listen && e.target.closest('form') == this.el.closest('form')) {
            this.errorLinksObject[e.detail.message] = e.target;
        }
    }
    validListener(e) {
        if (this.listen && e.target.closest('form') == this.el.closest('form')) {
            for (const [key, value] of Object.entries(this.errorLinksObject)) {
                if (value == e.target) {
                    delete this.errorLinksObject[key];
                }
            }
            if (this.errorQueue) {
                const sortedErrorList = this.sortErrors();
                this.errorQueue = Object.assign({}, sortedErrorList);
            }
        }
    }
    submitListener(e) {
        if (this.listen && e.target.closest('form') == this.el.closest('form')) {
            this.hasSubmitted = true;
            // Time out to collect gcdsError events before rendering
            setTimeout(() => {
                const sortedErrorList = this.sortErrors();
                this.errorQueue = Object.assign({}, sortedErrorList);
                // Time out to let list render
                setTimeout(() => {
                    this.shadowElement.focus();
                }, 50);
            }, 100);
        }
    }
    /*
     * Sort error object based on the order form compoennts appear in the form
     */
    sortErrors() {
        const sortable = Object.entries(this.errorLinksObject).map(([key, value]) => [
            key,
            value,
            value.getBoundingClientRect().y,
        ]);
        sortable.sort(function (a, b) {
            return a[2] - b[2];
        });
        const objSorted = {};
        sortable.forEach(function (item) {
            objSorted[item[0]] = item[1];
        });
        return objSorted;
    }
    /*
     * Focus element on error link click with label visible
     */
    focusElement(id) {
        const element = document.querySelector(id);
        let target = `[for=${id.replace('#', '')}]`;
        if (element.nodeName == 'FIELDSET') {
            target = `#legend-${id.replace('#', '')}`;
        }
        element.closest('form').querySelector(target).scrollIntoView();
        element.focus();
    }
    /*
     * Observe lang attribute change
     */
    updateLang() {
        const observer = new MutationObserver(mutations => {
            if (mutations[0].oldValue != this.el.lang) {
                this.lang = this.el.lang;
            }
        });
        observer.observe(this.el, observerConfig);
    }
    async componentWillLoad() {
        // Define lang attribute
        this.lang = assignLanguage(this.el);
        this.updateLang();
        this.listenChanged();
        // Format error-links string / object
        if (this.errorLinks && typeof this.errorLinks == 'string') {
            this.errorQueue = Object.assign({}, JSON.parse(this.errorLinks));
        }
        else if (this.errorLinks && typeof this.errorLinks == 'object') {
            this.errorQueue = Object.assign({}, this.errorLinks);
        }
    }
    render() {
        const { heading, errorQueue, lang, hasSubmitted, errorLinks } = this;
        return (index.h(index.Host, null, index.h("div", { role: "alert", tabindex: "-1", ref: element => (this.shadowElement = element), class: `gcds-error-summary ${(hasSubmitted || errorLinks) && Object.keys(errorQueue).length > 0
                ? 'gcds-show'
                : ''}` }, index.h("gcds-heading", { tag: "h2", "margin-top": "0", "margin-bottom": "300" }, heading !== null && heading !== void 0 ? heading : I18N$h[lang].heading), index.h("ol", { class: "summary__errorlist" }, (hasSubmitted || errorLinks) &&
            Object.keys(errorQueue).length > 0 &&
            Object.keys(errorQueue).map(key => {
                return (index.h("li", { class: "summary__listitem" }, index.h("gcds-link", { size: "regular", href: errorLinks ? key : '#', onClick: e => {
                        e.preventDefault();
                        errorLinks
                            ? this.focusElement(key)
                            : errorQueue[key].focus();
                    } }, errorLinks ? errorQueue[key] : key)));
            })))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "listen": ["listenChanged"],
        "errorLinks": ["errorLinksChanged"]
    }; }
};
GcdsErrorSummary.style = GcdsErrorSummaryStyle0;

const I18N$g = {
  en: {
    required: 'required',
  },
  fr: {
    required: 'obligatoire',
  },
};

const gcdsFieldsetCss = "@layer reset, default, disabled, focus;@layer reset{:host{display:block}:host .gcds-fieldset{border:0;padding:0}:host legend{padding:0}:host slot{display:block;margin:0}}@layer default{.gcds-fieldset{color:var(--gcds-fieldset-default-text)}.gcds-fieldset legend{font:var(--gcds-fieldset-font-desktop);margin:var(--gcds-fieldset-legend-margin)!important}@media only screen and (width < 48em){.gcds-fieldset legend{font:var(--gcds-fieldset-font-mobile)}}.gcds-fieldset legend .legend__required{font:var(--gcds-fieldset-legend-required-font-desktop);margin:var(--gcds-fieldset-legend-required-margin)!important;vertical-align:middle}@media only screen and (width < 48em){.gcds-fieldset legend .legend__required{font:var(--gcds-fieldset-legend-required-font-mobile)}}}@layer disabled{:host .gcds-fieldset:disabled{color:var(--gcds-fieldset-disabled-text)}}@layer focus{:host .gcds-fieldset:focus-within{color:var(--gcds-fieldset-focus-text)}}";
const GcdsFieldsetStyle0 = gcdsFieldsetCss;

const GcdsFieldset = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.gcdsGroupError = index.createEvent(this, "gcdsGroupError", 7);
        this.gcdsGroupErrorClear = index.createEvent(this, "gcdsGroupErrorClear", 7);
        this.gcdsError = index.createEvent(this, "gcdsError", 7);
        this.gcdsValid = index.createEvent(this, "gcdsValid", 7);
        this.isDateInput = false;
        this._validator = defaultValidator;
        this.fieldsetId = undefined;
        this.legend = undefined;
        this.required = undefined;
        this.errorMessage = undefined;
        this.hint = undefined;
        this.disabled = undefined;
        this.validator = undefined;
        this.validateOn = undefined;
        this.hasError = undefined;
        this.lang = undefined;
        this.inheritedAttributes = {};
    }
    validateErrorMessage() {
        if (this.disabled) {
            this.errorMessage = '';
        }
        else if (!this.hasError && this.errorMessage) {
            this.hasError = true;
        }
        else if (this.errorMessage == '') {
            this.hasError = false;
        }
    }
    validateDisabledFieldset() {
        if (this.required) {
            this.disabled = false;
        }
        if (this.disabled == true) {
            for (let i = 0; i < this.el.children.length; i++) {
                this.el.children[i].setAttribute('disabled', '');
            }
        }
    }
    handleDisabledChange(newValue, _oldValue) {
        if (_oldValue && newValue != _oldValue) {
            for (let i = 0; i < this.el.children.length; i++) {
                this.el.children[i].removeAttribute('disabled');
            }
        }
    }
    validateValidator() {
        if (this.validator && !this.validateOn) {
            this.validateOn = 'blur';
        }
    }
    /**
     * Call any active validators
     */
    async validate() {
        if (!this._validator.validate(this.fieldsetId) &&
            this._validator.errorMessage) {
            this.errorMessage = this._validator.errorMessage[this.lang];
            this.gcdsGroupError.emit(this.errorMessage);
            this.gcdsError.emit({
                id: `#${this.fieldsetId}`,
                message: `${this.legend} - ${this.errorMessage}`,
            });
        }
        else {
            this.errorMessage = '';
            this.gcdsGroupErrorClear.emit();
            this.gcdsValid.emit({ id: `#${this.fieldsetId}` });
        }
    }
    blurValidate() {
        if (this.validator &&
            this.validateOn == 'blur' &&
            !this.el.matches(':focus-within')) {
            this.validate();
        }
    }
    /**
     * Event listener for gcds-fieldset errors
     */
    gcdsParentGroupError(e) {
        if (e.srcElement == this.el &&
            validateFieldsetElements(this.el, this.el.children).includes(false)) {
            this.hasError = true;
        }
    }
    gcdsParentGroupErrorClear(e) {
        if (e.srcElement == this.el && this.hasError) {
            this.hasError = false;
        }
    }
    submitListener(e) {
        if (e.target == this.el.closest('form')) {
            if (this.validateOn && this.validateOn != 'other') {
                this.validate();
            }
            if (this.hasError) {
                e.preventDefault();
            }
        }
    }
    /*
     * Observe lang attribute change
     */
    updateLang() {
        const observer = new MutationObserver(mutations => {
            if (mutations[0].oldValue != this.el.lang) {
                this.lang = this.el.lang;
            }
        });
        observer.observe(this.el, observerConfig);
    }
    async componentWillLoad() {
        // Define lang attribute
        this.lang = assignLanguage(this.el);
        this.updateLang();
        this.validateDisabledFieldset();
        this.validateErrorMessage();
        this.validateValidator();
        // Assign required validator if needed
        if (this.el.getAttribute('data-date')) {
            this.isDateInput = true;
        }
        else {
            requiredValidator(this.el, 'fieldset');
        }
        if (this.validator) {
            this._validator = getValidator(this.validator);
        }
        this.inheritedAttributes = inheritAttributes(this.el, this.shadowElement);
    }
    componentWillUpdate() {
        if (this.validator) {
            this._validator = getValidator(this.validator);
        }
    }
    render() {
        const { lang, fieldsetId, legend, required, errorMessage, hasError, hint, disabled, inheritedAttributes, } = this;
        const fieldsetAttrs = Object.assign({ disabled }, inheritedAttributes);
        if (errorMessage) {
            fieldsetAttrs['aria-describedby'] = `error-message-${fieldsetId} ${fieldsetAttrs['aria-describedby']
                ? ` ${fieldsetAttrs['aria-describedby']}`
                : ''}`;
        }
        return (index.h(index.Host, null, index.h("fieldset", Object.assign({ class: `gcds-fieldset ${hasError ? 'gcds-fieldset--error' : ''}`, id: fieldsetId }, fieldsetAttrs, { "aria-labelledby": hint
                ? `legend-${fieldsetId} hint-${fieldsetId}`
                : `legend-${fieldsetId}`, tabindex: "-1", ref: element => (this.shadowElement = element) }), index.h("legend", { id: `legend-${fieldsetId}` }, legend, required ? (index.h("span", { class: "legend__required" }, "(", I18N$g[lang].required, ")")) : null), hint ? index.h("gcds-hint", { "hint-id": fieldsetId }, hint) : null, errorMessage ? (index.h("gcds-error-message", { messageId: fieldsetId }, errorMessage)) : null, index.h("slot", null))));
    }
    static get delegatesFocus() { return true; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "errorMessage": ["validateErrorMessage"],
        "disabled": ["validateDisabledFieldset", "handleDisabledChange"],
        "validator": ["validateValidator"]
    }; }
};
GcdsFieldset.style = GcdsFieldsetStyle0;

const I18N$f = {
  en: {
    button: {
      remove: 'Remove',
      upload: 'Choose file',
    },
    summary: {
      selected: 'Currently selected:',
      unselected: 'No file currently selected.',
    },
    removeFile: 'Remove file',
  },
  fr: {
    button: {
      remove: 'Supprimer',
      upload: 'Choisir un fichier',
    },
    summary: {
      selected: 'Actuellement sélectionné:',
      unselected: 'Aucun fichier actuellement sélectionné.',
    },
    removeFile: 'Supprimer le fichier',
  },
};

const gcdsFileUploaderCss = "@layer reset, default, input, files, disabled, error, focus, active;@layer reset{:host{display:block}:host .gcds-file-uploader-wrapper{border:0;margin:0;padding:0}:host .gcds-file-uploader-wrapper button{cursor:pointer;font:inherit;outline:0}}@layer default{:host .gcds-file-uploader-wrapper{align-items:flex-start;color:var(--gcds-file-uploader-default-text);display:flex;flex-direction:column;font:var(--gcds-file-uploader-font);max-width:90%;transition:color .15s ease-in-out}:host .gcds-file-uploader-wrapper button{border-radius:var(--gcds-file-uploader-file-button-border-radius);transition:all .15s ease-in-out}}@layer input{:host .gcds-file-uploader-wrapper .file-uploader__input{display:inline-block;position:relative}:host .gcds-file-uploader-wrapper .file-uploader__input button{background-color:var(--gcds-file-uploader-button-background);border:var(--gcds-file-uploader-button-border-width) solid var(--gcds-file-uploader-button-text);color:var(--gcds-file-uploader-button-text);font-weight:var(--gcds-file-uploader-button-font-weight);margin:var(--gcds-file-uploader-button-margin);padding:var(--gcds-file-uploader-button-padding)}:host .gcds-file-uploader-wrapper .file-uploader__input input{cursor:pointer;height:100%;left:0;opacity:0;position:absolute;top:0;width:100%}:host .gcds-file-uploader-wrapper .file-uploader__input #file-uploader__summary{height:0;margin:0;overflow:hidden;visibility:hidden}}@layer files{:host .gcds-file-uploader-wrapper .file-uploader__uploaded-file{align-items:center;border:var(--gcds-file-uploader-file-border-width) solid var(--gcds-file-uploader-file-border-color);cursor:pointer;display:flex;justify-content:space-between;max-width:var(--gcds-file-uploader-file-max-width);padding:var(--gcds-file-uploader-file-padding);width:100%}:host .gcds-file-uploader-wrapper .file-uploader__uploaded-file:not(:last-of-type){border-block-end:0}:host .gcds-file-uploader-wrapper .file-uploader__uploaded-file:last-of-type{margin:var(--gcds-file-uploader-button-margin)}:host .gcds-file-uploader-wrapper .file-uploader__uploaded-file gcds-text{overflow:auto}:host .gcds-file-uploader-wrapper .file-uploader__uploaded-file gcds-text::part(text){overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host .gcds-file-uploader-wrapper .file-uploader__uploaded-file button{align-items:center;background:transparent;border:0;color:var(--gcds-file-uploader-file-button-default-text);display:flex;font-weight:var(--gcds-file-uploader-button-font-weight);margin:var(--gcds-file-uploader-file-button-margin);padding:var(--gcds-file-uploader-file-button-padding)}:host .gcds-file-uploader-wrapper .file-uploader__uploaded-file button:not(:focus) span{overflow:visible;text-decoration:underline var(--gcds-file-uploader-file-button-default-decoration-thickness);text-underline-offset:var(\n          --gcds-file-uploader-file-button-underline-offset\n        )}}@layer disabled{:host .gcds-file-uploader-wrapper.gcds-disabled{color:var(--gcds-file-uploader-disabled-text)}:host .gcds-file-uploader-wrapper.gcds-disabled :is(.file-uploader__input,.file-uploader__uploaded-file){pointer-events:none}:host .gcds-file-uploader-wrapper.gcds-disabled .file-uploader__input button,:host .gcds-file-uploader-wrapper.gcds-disabled .file-uploader__uploaded-file,:host .gcds-file-uploader-wrapper.gcds-disabled .file-uploader__uploaded-file button{color:inherit}:host .gcds-file-uploader-wrapper.gcds-disabled .file-uploader__input button{background-color:var(--gcds-file-uploader-disabled-background);border-color:currentColor}}@layer error{:host .gcds-file-uploader-wrapper.gcds-error .file-uploader__uploaded-file{border-color:var(--gcds-file-uploader-file-danger-border-color)}}@layer hover{@media (hover:hover){:host .gcds-file-uploader-wrapper .file-uploader__input:not(:focus-within):hover button{background-color:var(--gcds-file-uploader-hover-button-background)}:host .gcds-file-uploader-wrapper .file-uploader__uploaded-file button:not(:focus):hover{color:var(--gcds-file-uploader-file-button-hover-text)}:host .gcds-file-uploader-wrapper .file-uploader__uploaded-file button:not(:focus):hover span{text-decoration-thickness:var(\n            --gcds-file-uploader-file-button-hover-decoration-thickness\n          )}}}@layer focus{:host .gcds-file-uploader-wrapper:focus-within{color:var(--gcds-file-uploader-focus-text)}:host .gcds-file-uploader-wrapper:focus-within .file-uploader__uploaded-file:focus-within{border-color:var(--gcds-file-uploader-file-focus-border-color)}:host .gcds-file-uploader-wrapper:focus-within .file-uploader__input:focus-within button,:host .gcds-file-uploader-wrapper:focus-within .file-uploader__uploaded-file button:focus{background-color:var(--gcds-file-uploader-focus-button-background);border-color:var(--gcds-file-uploader-focus-button-background);color:var(--gcds-file-uploader-focus-button-text);outline:var(--gcds-file-uploader-button-outline-width) solid var(--gcds-file-uploader-focus-button-background);outline-offset:var(--gcds-file-uploader-focus-button-outline-offset)}}@layer active{:host .gcds-file-uploader-wrapper .file-uploader__input:has(input:active) button{background-color:var(--gcds-file-uploader-active-button-background);border-color:var(--gcds-file-uploader-active-button-background);color:var(--gcds-file-uploader-active-button-text)}}";
const GcdsFileUploaderStyle0 = gcdsFileUploaderCss;

const GcdsFileUploader = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.gcdsFocus = index.createEvent(this, "gcdsFocus", 7);
        this.gcdsBlur = index.createEvent(this, "gcdsBlur", 7);
        this.gcdsChange = index.createEvent(this, "gcdsChange", 7);
        this.gcdsInput = index.createEvent(this, "gcdsInput", 7);
        this.gcdsRemoveFile = index.createEvent(this, "gcdsRemoveFile", 7);
        this.gcdsError = index.createEvent(this, "gcdsError", 7);
        this.gcdsValid = index.createEvent(this, "gcdsValid", 7);
        if (hostRef.$hostElement$["s-ei"]) {
            this.internals = hostRef.$hostElement$["s-ei"];
        }
        else {
            this.internals = hostRef.$hostElement$.attachInternals();
            hostRef.$hostElement$["s-ei"] = this.internals;
        }
        this._validator = defaultValidator;
        this.onBlur = () => {
            if (this.validateOn == 'blur') {
                this.validate();
            }
            this.gcdsBlur.emit();
        };
        this.handleInput = (e, customEvent) => {
            const filesContainer = [];
            const files = Array.from(e.target.files);
            files.map(file => {
                filesContainer.push(file['name']);
            });
            this.addFilesToFormData(files);
            this.value = [...filesContainer];
            // Validate since the input loses focus when dialog opens
            if (this.validateOn == 'blur') {
                setTimeout(() => {
                    this.validate();
                }, 100);
            }
            if (e.type === 'change') {
                const changeEvt = new e.constructor(e.type, e);
                this.el.dispatchEvent(changeEvt);
            }
            customEvent.emit(this.value);
        };
        this.removeFile = e => {
            e.preventDefault();
            const fileName = e.target.closest('.file-uploader__uploaded-file')
                .childNodes[0].textContent;
            const filesContainer = this.value;
            const file = filesContainer.indexOf(fileName);
            if (file > -1) {
                filesContainer.splice(file, 1);
                // Add additional logic to remove file from input
                const dt = new DataTransfer();
                for (let f = 0; f < this.shadowElement.files.length; f++) {
                    if (this.shadowElement.files[f].name != fileName) {
                        dt.items.add(this.shadowElement.files[f]);
                    }
                }
                this.shadowElement.files = dt.files;
                this.addFilesToFormData(this.shadowElement.files);
            }
            this.value = [...filesContainer];
            this.gcdsRemoveFile.emit(this.value);
        };
        /*
         * Set form data for internals
         */
        this.addFilesToFormData = files => {
            const formData = new FormData();
            files.forEach(file => {
                formData.append(this.name, file, file.name);
            });
            this.internals.setFormValue(formData);
        };
        this.uploaderId = undefined;
        this.name = undefined;
        this.label = undefined;
        this.required = false;
        this.disabled = false;
        this.value = [];
        this.accept = undefined;
        this.multiple = undefined;
        this.errorMessage = undefined;
        this.hint = undefined;
        this.validator = undefined;
        this.validateOn = undefined;
        this.hasError = undefined;
        this.inheritedAttributes = {};
        this.lang = undefined;
    }
    validateDisabledSelect() {
        if (this.required) {
            this.disabled = false;
        }
    }
    validateErrorMessage() {
        if (this.disabled) {
            this.errorMessage = '';
        }
        else if (!this.hasError && this.errorMessage) {
            this.hasError = true;
        }
        else if (this.errorMessage == '') {
            this.hasError = false;
        }
    }
    validateValidator() {
        if (this.validator && !this.validateOn) {
            this.validateOn = 'blur';
        }
    }
    validateHasError() {
        if (this.disabled) {
            this.hasError = false;
        }
    }
    /**
     * Call any active validators
     */
    async validate() {
        if (!this._validator.validate(this.shadowElement.files) &&
            this._validator.errorMessage) {
            this.errorMessage = this._validator.errorMessage[this.lang];
            this.gcdsError.emit({
                id: `#${this.uploaderId}`,
                message: `${this.label} - ${this.errorMessage}`,
            });
        }
        else {
            this.errorMessage = '';
            this.gcdsValid.emit({ id: `#${this.uploaderId}` });
        }
    }
    submitListener(e) {
        if (e.target == this.el.closest('form')) {
            if (this.validateOn && this.validateOn != 'other') {
                this.validate();
            }
            if (this.hasError) {
                e.preventDefault();
            }
        }
    }
    /*
     * Form internal functions
     */
    formResetCallback() {
        this.internals.setFormValue('');
        this.value = [];
    }
    formStateRestoreCallback(state) {
        this.internals.setFormValue(state);
        this.value = state;
    }
    /*
     * Observe lang attribute change
     */
    updateLang() {
        const observer = new MutationObserver(mutations => {
            if (mutations[0].oldValue != this.el.lang) {
                this.lang = this.el.lang;
            }
        });
        observer.observe(this.el, observerConfig);
    }
    async componentWillLoad() {
        // Define lang attribute
        this.lang = assignLanguage(this.el);
        this.updateLang();
        this.validateDisabledSelect();
        this.validateHasError();
        this.validateErrorMessage();
        this.validateValidator();
        // Assign required validator if needed
        requiredValidator(this.el, 'file');
        if (this.validator) {
            this._validator = getValidator(this.validator);
        }
        this.inheritedAttributes = inheritAttributes(this.el, this.shadowElement);
    }
    componentWillUpdate() {
        if (this.validator) {
            this._validator = getValidator(this.validator);
        }
    }
    render() {
        const { accept, disabled, errorMessage, hasError, hint, label, lang, multiple, name, required, uploaderId, value, inheritedAttributes, } = this;
        const attrsInput = Object.assign(Object.assign({ accept,
            disabled,
            multiple,
            name,
            required,
            value }, inheritedAttributes), { 'aria-describedby': `${inheritedAttributes['aria-describedby']
                ? `${inheritedAttributes['aria-describedby']} `
                : ''}file-uploader__summary` });
        const attrsLabel = {
            label,
            required,
        };
        if (hint || errorMessage) {
            const hintID = hint ? `hint-${uploaderId} ` : '';
            const errorID = errorMessage ? `error-message-${uploaderId} ` : '';
            attrsInput['aria-describedby'] =
                `${hintID}${errorID}${attrsInput['aria-describedby']}`;
        }
        return (index.h(index.Host, null, index.h("div", { class: `gcds-file-uploader-wrapper ${disabled ? 'gcds-disabled' : ''} ${hasError ? 'gcds-error' : ''}` }, index.h("gcds-label", Object.assign({}, attrsLabel, { "label-for": uploaderId, lang: lang })), hint ? index.h("gcds-hint", { "hint-id": uploaderId }, hint) : null, errorMessage ? (index.h("gcds-error-message", { messageId: uploaderId }, errorMessage)) : null, index.h("div", { class: `file-uploader__input ${value.length > 0 ? 'uploaded-files' : ''}` }, index.h("button", { type: "button", tabindex: "-1", onClick: () => this.shadowElement.click() }, I18N$f[lang].button.upload), index.h("input", Object.assign({ type: "file", id: uploaderId }, attrsInput, { onBlur: () => this.onBlur(), onFocus: () => this.gcdsFocus.emit(), onInput: e => this.handleInput(e, this.gcdsInput), onChange: e => this.handleInput(e, this.gcdsChange), "aria-invalid": hasError ? 'true' : 'false', ref: element => (this.shadowElement = element) })), value.length > 0 ? (index.h("gcds-sr-only", { id: "file-uploader__summary" }, index.h("span", null, I18N$f[lang].summary.selected, " "), value.map(file => (index.h("span", null, file, " "))))) : (index.h("gcds-sr-only", { id: "file-uploader__summary" }, I18N$f[lang].summary.unselected))), value.length > 0
            ? value.map(file => (index.h("div", { class: "file-uploader__uploaded-file", "aria-label": `${I18N$f[lang].removeFile} ${file}.` }, index.h("gcds-text", { "margin-bottom": "0" }, file), index.h("button", { onClick: e => this.removeFile(e) }, index.h("span", null, I18N$f[lang].button.remove), index.h("gcds-icon", { name: "times", size: "text", "margin-left": "200" })))))
            : null)));
    }
    static get delegatesFocus() { return true; }
    static get formAssociated() { return true; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "disabled": ["validateDisabledSelect"],
        "errorMessage": ["validateErrorMessage"],
        "validator": ["validateValidator"],
        "hasError": ["validateHasError"]
    }; }
};
GcdsFileUploader.style = GcdsFileUploaderStyle0;

const I18N$e = {
  en: {
    gov: {
      heading: 'Government of Canada',
      menu: {
        contacts: {
          text: 'All Contacts',
          link: 'https://www.canada.ca/en/contact.html',
        },
        dept: {
          text: 'Departments and agencies',
          link: 'https://www.canada.ca/en/government/dept.html',
        },
        about: {
          text: 'About government',
          link: 'https://www.canada.ca/en/government/system.html',
        },
      },
    },
    themes: {
      heading: 'Themes and topics',
      menu: {
        jobs: {
          text: 'Jobs',
          link: 'https://www.canada.ca/en/services/jobs.html',
        },
        immigration: {
          text: 'Immigration and citizenship',
          link: 'https://www.canada.ca/en/services/immigration-citizenship.html',
        },
        travel: {
          text: 'Travel and tourism',
          link: 'https://travel.gc.ca/',
        },
        business: {
          text: 'Business',
          link: 'https://www.canada.ca/en/services/business.html',
        },
        benefits: {
          text: 'Benefits',
          link: 'https://www.canada.ca/en/services/benefits.html',
        },
        health: {
          text: 'Health',
          link: 'https://www.canada.ca/en/services/health.html',
        },
        taxes: {
          text: 'Taxes',
          link: 'https://www.canada.ca/en/services/taxes.html',
        },
        enviro: {
          text: 'Environment and natural resources',
          link: 'https://www.canada.ca/en/services/environment.html',
        },
        defence: {
          text: 'National security and defence',
          link: 'https://www.canada.ca/en/services/defence.html',
        },
        culture: {
          text: 'Culture, history and sport',
          link: 'https://www.canada.ca/en/services/culture.html',
        },
        policing: {
          text: 'Policing, justice and emergencies',
          link: 'https://www.canada.ca/en/services/policing.html',
        },
        transport: {
          text: 'Transport and infrastructure',
          link: 'https://www.canada.ca/en/services/transport.html',
        },
        world: {
          text: 'Canada and the world',
          link: 'https://international.gc.ca/world-monde/index.aspx?lang=eng',
        },
        finance: {
          text: 'Money and finance',
          link: 'https://www.canada.ca/en/services/finance.html',
        },
        science: {
          text: 'Science and innovation',
          link: 'https://www.canada.ca/en/services/science.html',
        },
        indigenous: {
          text: 'Indigenous peoples',
          link: 'https://www.canada.ca/en/services/indigenous-peoples.html',
        },
        veterans: {
          text: 'Veterans and military',
          link: 'https://www.canada.ca/en/services/veterans.html',
        },
        youth: {
          text: 'Youth',
          link: 'https://www.canada.ca/en/services/youth.html',
        },
      },
    },
    site: {
      heading: 'Government of Canada Corporate',
      menu: {
        social: {
          text: 'Social media',
          link: 'https://www.canada.ca/en/social.html',
        },
        mobile: {
          text: 'Mobile applications',
          link: 'https://www.canada.ca/en/mobile.html',
        },
        about: {
          text: 'About Canada.ca',
          link: 'https://www.canada.ca/en/government/about.html',
        },
        terms: {
          text: 'Terms and conditions',
          link: 'https://www.canada.ca/en/transparency/terms.html',
        },
        privacy: {
          text: 'Privacy',
          link: 'https://www.canada.ca/en/transparency/privacy.html',
        },
      },
    },
    about: 'About this site',
    topofpage: 'Top of page',
  },
  fr: {
    gov: {
      heading: 'Gouvernement du Canada',
      menu: {
        contacts: {
          text: 'Toutes les coordonnées',
          link: 'https://www.canada.ca/fr/contact.html',
        },
        dept: {
          text: 'Ministères et organismes',
          link: 'https://www.canada.ca/fr/gouvernement/min.html',
        },
        about: {
          text: 'À propos du gouvernement',
          link: 'https://www.canada.ca/fr/gouvernement/systeme.html',
        },
      },
    },
    themes: {
      heading: 'Thèmes et sujets',
      menu: {
        jobs: {
          text: 'Emplois',
          link: 'https://www.canada.ca/fr/services/emplois.html',
        },
        immigration: {
          text: 'Immigration et citoyenneté',
          link: 'https://www.canada.ca/fr/services/immigration-citoyennete.html',
        },
        travel: {
          text: 'Voyage et tourisme',
          link: 'https://voyage.gc.ca/',
        },
        business: {
          text: 'Entreprises',
          link: 'https://www.canada.ca/fr/services/entreprises.html',
        },
        benefits: {
          text: 'Prestations',
          link: 'https://www.canada.ca/fr/services/prestations.html',
        },
        health: {
          text: 'Santé',
          link: 'https://www.canada.ca/fr/services/sante.html',
        },
        taxes: {
          text: 'Impôts',
          link: 'https://www.canada.ca/fr/services/impots.html',
        },
        enviro: {
          text: 'Environnement et ressources naturelles',
          link: 'https://www.canada.ca/fr/services/environnement.html',
        },
        defence: {
          text: 'Sécurité nationale et défense',
          link: 'https://www.canada.ca/fr/services/defense.html',
        },
        culture: {
          text: 'Culture, histoire et sport',
          link: 'https://www.canada.ca/fr/services/culture.html',
        },
        policing: {
          text: 'Services de police, justice et urgences',
          link: 'https://www.canada.ca/fr/services/police.html',
        },
        transport: {
          text: 'Transport et infrastructure',
          link: 'https://www.canada.ca/fr/services/transport.html',
        },
        world: {
          text: ' Le Canada et le monde',
          link: 'https://www.international.gc.ca/world-monde/index.aspx?lang=fra',
        },
        finance: {
          text: 'Argent et finance',
          link: 'https://www.canada.ca/fr/services/finance.html',
        },
        science: {
          text: 'Science et innovation',
          link: 'https://www.canada.ca/fr/services/science.html',
        },
        indigenous: {
          text: 'Autochtones',
          link: 'https://www.canada.ca/fr/services/autochtones.html',
        },
        veterans: {
          text: 'Vétérans et militaires',
          link: 'https://www.canada.ca/fr/services/veterans.html',
        },
        youth: {
          text: 'Jeunesse',
          link: 'https://www.canada.ca/fr/services/jeunesse.html',
        },
      },
    },
    site: {
      heading: 'Organisation du gouvernement du Canada',
      menu: {
        social: {
          text: 'Médias sociaux',
          link: 'https://www.canada.ca/fr/sociaux.html',
        },
        mobile: {
          text: 'Applications mobiles',
          link: 'https://www.canada.ca/fr/mobile.html',
        },
        about: {
          text: 'À propos de Canada.ca',
          link: 'https://www.canada.ca/fr/gouvernement/a-propos.html',
        },
        terms: {
          text: 'Avis',
          link: 'https://www.canada.ca/fr/transparence/avis.html',
        },
        privacy: {
          text: 'Confidentialité',
          link: 'https://www.canada.ca/fr/transparence/confidentialite.html',
        },
      },
    },
    about: 'À propos de ce site',
    topofpage: 'Haut de la page',
  },
};

const gcdsFooterCss = "@layer reset, default, contextual, main, sub, small, compact, medium, wide;@layer reset{:host{display:block}:host slot{display:initial}:host gcds-link::part(link):not(:hover){text-decoration:none}:host .gcds-footer__sub ul{list-style-type:none;margin:0;padding:0}:host .gcds-footer__sub ul li{display:block}}@layer default{:host{font:var(--gcds-footer-font)}:host .gcds-footer__header,:host .sub__header,:host .themenav__header{clip:rect(1px,1px,1px,1px);height:1px;margin:0;overflow:hidden;position:absolute;width:1px}:host [class$=__container]{justify-content:space-between;margin:var(--gcds-footer-container-margin);max-width:var(--gcds-footer-container-width);width:90%}:host nav{position:relative}:host nav li{margin:var(--gcds-footer-listitem-margin)}:host [class$=__list]{display:grid;grid-template-columns:1fr;list-style:none;padding:var(--gcds-footer-list-padding);grid-gap:var(--gcds-footer-list-grid-gap)}:host [class$=__list] li gcds-link::part(link){color:var(--gcds-footer-main-text)}:host h3{font:var(--gcds-footer-font-heading-desktop)}@media only screen and (width < 48em){:host h3{font:var(--gcds-footer-font-heading-mobile)}}}@layer contextual{:host .gcds-footer__contextual{background-color:var(--gcds-footer-contextual-background);color:var(--gcds-footer-contextual-text);container:component contextual/inline-size;margin-block-end:-1px;padding:var(--gcds-footer-contextual-padding)}}@layer main{:host .gcds-footer__main{background-color:var(--gcds-footer-main-background);background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmgAAAC9CAMAAAAwXXHOAAAAe1BMVEUAAAAYJjgbKDogIDkcOTkgMDgoKEMdJzgdKDcAAAAgKTkfLj4gKDgfKjgeJjgeKjgcKDgfJzhAQEAfKzceKDgdKDcdKjcAVVUhN0MeKDceKzcAAFUdKjgcKzkeLTwaMzMdKjcfKTYZJjIcKzkaKDgcKDgYKjgbKTgYKDjo9/gwAAAAKXRSTlMASTkoCSATe/8BUCHNSWXct1sEU+D9nQMXeIoD8zYiCsN1PST/bZK221OBjhQAAA8qSURBVHgB7NVVAUNRDAWwPr5jZp5/jwMR/Us0HAgAAAAAAAAAAAAAAAAAAAAgS1U3TRt/XdNHEqiGUurReBIxLUOQSNBm88VytRa0ZIK22Zbd/iBo2Vzn8XS+hKCRqDpdr7e4PyKe11ckger9Zdc+bGULYSAMj2uZMab/Bl/mJoWXLiuvNV8HiH/PYgSGMIdmFvhjZg7NHJoZEcRtZmQEbjOj5NDMoZlDM3No1kxIidvMUlowuy2lgtltS9qE2WUlTwN2H7fGTQMkrBtqYGhBWDMhjRs7KcKaSWnc2BkOrZ8lSRujpALWMjQOW1PCmil9F8PWtNCQbzekHLamgvUSmhda9DsLWOqHmramgHUMbU+bbxLWypLGjZ3V7wraSj/FsPmm0JCHTimHzTc7YI2E5oWWjRfk0Na00AKNWOqXcmgX2ZLuj50OzUoHh/14Em1Y5NaRgSGq26HTUm/UrBubTZhDe8CiAheZQ1uPuBk0hxaPGKPNobHZciz4PjSmv2gXWOmDTQ8DduMa4KOYFFqiBQsdVXvQ3lTPZwJ+xL1IxJzbdO53w42RPUJbQACsKXsTzU6cDm3pbEec/dl4fvn+xGmMZIPQCj9D45TQlo6EgVnKDjuyfjQ/KLTSsWAAI7PLXyeCI/46480scE6cRAs+o+ln7lwDQstz1nwzDSR6cGh7EYilIV+01KtoFJpDk3bVloZ80ZZeJcBEEw7teP7QikDp1QJi+bl+Ep/NoXHrVQFZvt8Ih/a5vrJ3J8iJK0EQQCvPkplVdf8T/rBFB61vYYStMWCTMYA2b82j1Qti2A5rSuMFLcKMOwZVvQGtKhnPGmpAG0HkayIK94Vm5AY0w4xnDVSRmpNRr4moRNw3/m2nTqtZmlPsF7QXtKNjbcWvXide0A5NvqBthDIfAFq5ytnv988OrbSV+vPQKh4AGoLjH+u5obG1lWbcP68ajXFOqn9dE+31/kf/ROvhBe3VSKsXtB9oor0aaUjJeEE7LmhtpxF/ON5TqTv8gnZ7hdZlzcn4u2G9oP2TPmdXGkEtsV1/u9+JXZ/mWd0vaHuTGn8Ps7WEoy38Z2MT16u0Ur2g3dbpBJylke7uPz2+wUKA14bS2Gq+oO0MtJ0/DQ1CICj5WtE5vpoXtHb/dWi5QCMyLoeWlIwb8oJWTI048o9DY5FEIGB+7kwy/ym0mtK/ABrCtE7mgv23oUEIMBCQr54K/Hqb0A3QGAyfCy7/MDRGpDygZQTvCq0M1/vdnaBhvfJtaDGgYSz+VWhkyeEIBGHyvtAQEXBEsO4DzeuVY6CNRfxlaJKIBVqAKdwVGge0uBO05LzygnZYqKJjQAsLsRVCOro3AD4gtMJ5mfUNsBehOf5koIwFmhnmJWjQiOOo2I8Hje0YCTe/DvYitPqr0IpFNqIcKf1xaFDOvxIOaAnkq0abBRmdURfLAVLa6d8OzXOFk/KrjfYPhq8a/Rk0RAR/O7RUcyyzlS9ox0Jrd7sq+97QAMAJAPeBVhMESv2CdiC0ZmZUhSvqX0LjuF/CLnyA5rekfaeZAc6vNEjNx4BGgPF0sWOEASnDiHIgwxL+GTSP+yUp1aVTJxZoxTu0WHP+jXBEZ+AAaBLj6QLEEhphyZGMdLACljfn1iFVZta3oPEtu6ClluAODYmah8L8GNAs5RPXaBTYSkZFlCOKkSpCvNDrtOsb0Fpvae6AVlriO0BLTtBya84udgRHQmNLxXi2ZK4Ko4K5QLNHk3z71ImI/DY07YDGPvqKIe+/Sgdz8xUbFnFcG42xI6xeGhLxXGHVqjAc9glajuuh7gvtH1xtm/t7nZwaRrVFsWIz4M3QiJuGOhlPFai5LoxEvN/YDO+p0bhoI/GFSx25vJBRUuEKtGZ8P+Q7NB8AjWGpHdysNG+GBt801Il4qiw9y3PrgWySCZICKUn5CbQ0gx0Rkb2cWjjcxhL6tM7zIyLQo7jYCL6v1SVoR5YtHChGHQDNWZIqt4AUbm6juX4ztJSWko+l0LIqz3fVkvoTaNKAVpISgI33JN5CuPiezOWxEJERqSUZkIPaBc3x/djVatfuNtrlcTRfbjuyfTO0auzDv8RPd1V6BevcrbLfln2qypFS7YHm1s50MokeazxD6/bn0PK4WbY6YHjDl9uOVt06qc7eY4edlqRMM54oXJ7rikCDzYjigLbwIwufQatgB7P19VTmkPQ5tIrvp3Z/ugprOo4tqbgJrRng5VnSwUsgUHpPvmUNzbv+PmRw+TriCWfRmyyHvehaoC3mkOHiJ9Aa7Codk21oR/YGsH+sBJokbI30pE5BJDcnr0a84wLi2qMfVcSpyZHJZ/wM3yKLEfYZ2gKPkb4IbeRnoMk2D/qDi/ug5apOiiksnWK2Pw71fnYBcb1FkjDblHe/TipsxBNCay+eEmdoyIhwBhv3hzaCoz5L1vtq+5oLynFJjz8Ua/MytI3OgPe1DWZoT/kGtAo2Y7kb0FjvdwwXfwZafXz3Rh4KzRpR3QStPpxv2RegjV3YD21Ibvx6aFhwOeMMLZLLJpZ/CFqeUroUHPURn43boXnjzLmk/OEE50+hcQVtsM1fD62rGRGJGZodSyWHRkzJ46Ft5Xhobp2T+9tom52B1Bx/8MxPoeWAtjqi+cuhjZIqztCQY9o9ay62flZoqSnNPdD8BWi+XqO5sYKWV/88cgWNzwUNGilOb+UoTxMpaIPKGGHpSaGxt2wcX6NRb8m9n4+GStZ2NevyWMx2eK6S8zmheSF1AjbA1fu9iu7yVAsOaOXM0V7PsdynhXTXer9G1JnLv/pBaNYqxX3Q3N09+uZ7oGHUmPvG0WY97VVSg1OWHP20n+jtdYU2iqtrnn7D22qNP5k9QcsAhlaM5Qpw6TDUej9XzwsjOCZi0EvRWWN1PC5uM13O+jo0AhG1H+0MDXMt4vRWZ0Bd57QkMLu6q97u+lNo0TtGfEoyW3Pq2Wq0ZLVXb+PrHA651NoMdGFZ0QwN9kmHPJbrtGBUrfdvVABYlNcYY1mqgtTyWEt5EhGIwJehoVS31WhTrxMzp1ZXdXW3Pg0itSMgydbllAe0D2k+WY3GcMdiiOOSpIhJHoSIHKfXGdrN2YZ2+lYZUWN1PC7Q/C1orJJMUqs49kCDSzdnQDsgnbwATc8HLTNIogTAdqr9FljJt8gRHLPCzwctv9TcS30nRumTJOq20cXe2sHngobwtTNBV5VGjoCWPiUljT5BZfZYPf/QApyAAR8KrXk0tP0pBkvfzvNBU6XtUgIArSLeYtl2tmoN8bmGN3gBWtwPmiPC+ka6+qmgYfmrfRquFdafokNhtN2I1BTDQOlH0tXVN0IDpmXdAVqxr1RF0MWYLTWtOY1pPQP9dNBwGVpjQIvwsXhqvCyvJgNRRdB7odFlg2P5SGiVWVlVWedfvqpWt7dk9Mbez6E1OXaXlAHNqeDsOOoZT50DGtfQYgx7XIZWrrHY6ezTQvWy0/OG+ZAgu4KLdBCWigBLTYA5VsdHWFfc0BkYw3Ek0tIx0Exa8scZejPI6ZaSTqOrydUeXoEWu6FpBzQ8HrS8Bg2XqvriAKj2fN2cW0pGcN7QY0F9GhbGVOy5PL01X/af16DBhZjDjUbZMdAi1tDyvGOEY/uAFqv8KLTsR4NGtBwR7P4/tMrlqOIlaOftOb6jV9eqcWzI88IZGr8HjU6J6w2gtSfNGCHSV6FVVUk9ZexYZ1TmvbHrMrQVpXRJ5dScct4Cza0HnIJaoKljA9rAw3ECAQ6DNmagAEsFAKUGgByry49kFkmvoY2qC4kATSCQ2h/O3wY/2uvcbopUWntT1VegSfEwQc8TtD5DqwGtlsPW/6cM90DLz6GNfGt4g1qSJ7BZX/lWbkkwgjSJa52BVme936RyjW2n28hYHijKdRXakeNozAeC5p6bVyz5/1clun2SlhHuAe37NZoyO6uzDoFmWrcn17PjRUqS19DM1hKAHj0nywEta2pGje0aWfaryK5lf34JWldfh0YsRW1yHk94OGfKpbybA9pYOk+3N5ai91sOqNEYDjqgkXOvEzBLSp78NNBmJlMSGOdY30luVouFNbSoM3FIDAjB99uypgq6GRaDGsGynBGZERY9gyFWv3yyB+qmNdK0KnLynqwBeRpHQypP7VVj6ZO47wmNxLSSvWoWW8qPl7+WihHBvjBrUnbeCs1LG80Ra2g5/c/GOdWdFVEIYzl4ftXWhp6sL0KrU4HcBo1SZakjLHwCbbMLO4LI5aFWfcsMqsf7wmscOJ6yAS2yJJDQW8oEy6U7QqNV2JqX8ekE4o8X9KeEsxJrM9+Axv9/g7wGTUozgsSWMyGsnSkjIgitU7wIjVvQ3nIztMK8jZHjIcPb0HL113VwQMvWhcR9gpREbjR1x1Pqc42GiJUOS833e9tuzfnJGm1Qy9R2TGp3ENxwSeKWU+eoYSwE9kLTRWiTm+Jn0LQUMEsPBW38QpUkQdRoBEg9RnUcLOP0LC8Z9Rwk5Tu0ZeuqF7Yk8ZaUjLfUacHnDedD1EACxg3QDOvgmOnSxyQHNJ0PSNuSnUpb6dSyNvbWqmeZ9qlpUTWOmtPchLZx3DVoejRoWjLXzfW+XEMSAlKaE7ScoBVT6mF2eiUflK6q6vGgestpe1f1MW8E25cB7YeyDW1kExoHND8uNGjEYalBBi3J5ocxJsmrrkOTqM1e54PEAX07noc3Nh2XS4cFN0IbIeF6NGj+2C0zF0j8WGr48KldpTnfhVakpSRTByeD+nZyo42mJtQMH+d5xK7boY08ADQmyLkrsD1NzPpkXPRwaOsuXEAHx5n/ClpANQoSpI4OXNeg8RGhwWPYiUB//taLi9BqQOsngXZI0t6G1oTukanqfzho41ezndrOdWgsJf8eNKm8eep8qsQPhLFtaO/oJhkRXCrFdETwAjTAvwza/k7sCxozsaeAMlIX0mmjRs8rgjo0/x6aXol/HLoOuYLiHAd9NDRSAuH/2rtXI4tiIAaidizSfPKPcGvBpQ9ZrA+ZBLqGykg5YeXXpsdv7a4Rlv9nSSC0K527jgKhadw1TgCh6buSY0BodWtuSe0cENr9xlvbOSA0+V/XHceA0DROA6HptNNAaJoqh4HQ1E4CoamqZ9c5IDTVrMNAaBrHgdDuOg+E1s4DoWmcBkJTrdNAaGrngdDaT4DQ9jc/AULzM8Af2qL98u71t1EAAAAASUVORK5CYII=);background-position:100% 100%;background-repeat:no-repeat;color:var(--gcds-footer-main-text);container:component main/inline-size}:host .gcds-footer__main nav:first-of-type:after{border-block-end:var(--gcds-footer-main-nav-first-after-border-width) solid var(--gcds-footer-main-nav-first-after-border-color);content:\"\";display:block;width:var(--gcds-footer-main-nav-first-after-width)}:host .gcds-footer__main nav.main__govnav{padding:var(--gcds-footer-main-govnav-padding)}:host .gcds-footer__main nav.main__themenav{padding:var(--gcds-footer-main-themenav-padding)}:host .gcds-footer__main nav.main__themenav .themenav__list{display:grid;grid-auto-flow:column;grid-template-rows:repeat(18,1fr)}}@layer sub{:host .gcds-footer__sub{background-color:var(--gcds-footer-sub-background);container:component sub/inline-size}:host .gcds-footer__sub .sub__container{display:grid;grid-gap:var(--gcds-footer-sub-grid-gap);grid-template-areas:\"list wordmark\";grid-template-columns:3fr 1fr}:host .gcds-footer__sub .sub__container nav{align-items:center;display:flex;grid-area:list;padding:var(--gcds-footer-sub-nav-padding)}:host .gcds-footer__sub .sub__container .sub__wordmark,:host .gcds-footer__sub .sub__container slot[name=wordmark]{display:flex;grid-area:wordmark}:host .gcds-footer__sub .sub__container .sub__wordmark gcds-signature,:host .gcds-footer__sub .sub__container slot[name=wordmark] gcds-signature{align-self:end;width:var(--gcds-footer-sub-signature-md-width)}}@layer small{@layer compact{@container sub (width <= 19em){:host .gcds-footer__sub .sub__container .sub__wordmark gcds-signature,:host .gcds-footer__sub .sub__container slot[name=wordmark] gcds-signature{width:var(--gcds-footer-sub-signature-sm-width)}}}}@layer compact{@container sub (width >= 28.2em){:host .gcds-footer__sub .sub__container .sub__wordmark gcds-signature,:host .gcds-footer__sub .sub__container slot[name=wordmark] gcds-signature{margin:var(--gcds-footer-sub-signature-margin);min-width:var(--gcds-footer-sub-signature-lg-min-width);width:var(--gcds-footer-sub-signature-lg-width)!important}}}@layer medium{@container contextual (width >= 45em){:host .gcds-footer__contextual [class$=__list]{grid-template-columns:1fr 1fr}}@container main (width >= 45em){:host .gcds-footer__main [class$=__list]{grid-template-columns:1fr 1fr}:host .gcds-footer__main nav.main__themenav .themenav__list{grid-template-rows:repeat(9,1fr)}}}@layer wide{@container contextual (width >= 60.2em){:host .gcds-footer__contextual [class$=__list]{grid-template-columns:1fr 1fr 1fr}}@container main (width >= 60.2em){:host .gcds-footer__main [class$=__list]{grid-template-columns:1fr 1fr 1fr}:host .gcds-footer__main nav.main__themenav .themenav__list{grid-template-rows:repeat(6,1fr)}}@container sub (width >= 60.2em){:host .gcds-footer__sub .sub__container ul li{display:inline-block;margin-block-end:0}:host .gcds-footer__sub .sub__container ul li:first-of-type:before{content:\"\";margin:0}:host .gcds-footer__sub .sub__container ul li:before{content:\"\\2022\";display:inline;margin:var(--gcds-footer-sub-listitem-before-margin)}:host .gcds-footer__sub .sub__container .sub__wordmark,:host .gcds-footer__sub .sub__container slot[name=wordmark]{display:inline-block}:host .gcds-footer__sub .sub__container .sub__wordmark gcds-signature,:host .gcds-footer__sub .sub__container slot[name=wordmark] gcds-signature{margin:var(--gcds-footer-sub-signature-lg-margin)}}}";
const GcdsFooterStyle0 = gcdsFooterCss;

const GcdsFooter = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.display = 'compact';
        this.wordmarkVariant = undefined;
        this.contextualHeading = undefined;
        this.contextualLinks = undefined;
        this.subLinks = undefined;
        this.lang = undefined;
    }
    /**
     * Convert contextual links prop to object
     * (Object props get treated as string when using Stencil components without a framework)
     */
    contextualLinksChanged(newContextualLinks) {
        if (typeof newContextualLinks == 'string') {
            this.contextualLinksObject = JSON.parse(newContextualLinks);
        }
        else if (typeof newContextualLinks == 'object') {
            this.contextualLinksObject = newContextualLinks;
        }
    }
    /**
     * Convert sub links prop to object
     * (Object props get treated as string when using Stencil components without a framework)
     */
    subLinksChanged(newSubLinks) {
        if (typeof newSubLinks == 'string') {
            this.subLinksObject = JSON.parse(newSubLinks);
        }
        else if (typeof newSubLinks == 'object') {
            this.subLinksObject = newSubLinks;
        }
    }
    /*
     * Observe lang attribute change
     */
    updateLang() {
        const observer = new MutationObserver(mutations => {
            if (mutations[0].oldValue != this.el.lang) {
                this.lang = this.el.lang;
            }
        });
        observer.observe(this.el, observerConfig);
    }
    async componentWillLoad() {
        // Define lang attribute
        this.lang = assignLanguage(this.el);
        this.updateLang();
        if (this.contextualLinks && typeof this.contextualLinks == 'string') {
            this.contextualLinksObject = JSON.parse(this.contextualLinks);
        }
        else if (this.contextualLinks &&
            typeof this.contextualLinks == 'object') {
            this.contextualLinksObject = this.contextualLinks;
        }
        if (this.subLinks && typeof this.subLinks == 'string') {
            this.subLinksObject = JSON.parse(this.subLinks);
        }
        else if (this.subLinks && typeof this.subLinks == 'object') {
            this.subLinksObject = this.subLinks;
        }
    }
    get renderSignature() {
        const signVariant = this.wordmarkVariant ? this.wordmarkVariant : 'colour';
        if (this.el.querySelector('[slot="signature"]')) {
            return index.h("slot", { name: "wordmark" });
        }
        else {
            return (index.h("div", { class: "sub__wordmark" }, index.h("gcds-signature", { type: "wordmark", variant: signVariant, lang: this.lang })));
        }
    }
    render() {
        const { lang, display, contextualHeading, contextualLinksObject, subLinks, subLinksObject, renderSignature, } = this;
        const govNav = I18N$e[lang].gov.menu;
        const themeNav = I18N$e[lang].themes.menu;
        const siteNav = I18N$e[lang].site.menu;
        let contextualLinkCount = 0;
        let subLinkCount = 0;
        return (index.h(index.Host, { role: "contentinfo", "aria-label": "Footer" }, index.h("gcds-sr-only", { tag: "h2" }, I18N$e[lang].about), contextualLinksObject && contextualHeading && (index.h("div", { class: "gcds-footer__contextual" }, index.h("div", { class: "contextual__container" }, index.h("nav", { "aria-labelledby": "contextual__heading" }, index.h("h3", { id: "contextual__heading", class: "contextual__heading" }, contextualHeading), index.h("ul", { class: "contextual__list" }, Object.keys(contextualLinksObject).map(key => {
            if (contextualLinkCount < 3) {
                contextualLinkCount++;
                return (index.h("li", null, index.h("gcds-link", { size: "small", href: contextualLinksObject[key] }, key)));
            }
        })))))), display === 'full' ? (index.h("div", { class: "gcds-footer__main" }, index.h("div", { class: "main__container" }, index.h("nav", { class: "main__govnav", "aria-labelledby": "govnav__heading" }, index.h("h3", { id: "govnav__heading" }, I18N$e[lang].gov.heading), index.h("ul", { class: "govnav__list" }, Object.keys(govNav).map(value => (index.h("li", null, index.h("gcds-link", { size: "small", href: govNav[value].link }, govNav[value].text)))))), index.h("nav", { class: "main__themenav", "aria-labelledby": "themenav__heading" }, index.h("gcds-sr-only", { tag: "h4", id: "themenav__heading" }, I18N$e[lang].themes.heading), index.h("ul", { class: "themenav__list" }, Object.keys(themeNav).map(value => (index.h("li", null, index.h("gcds-link", { size: "small", href: themeNav[value].link }, themeNav[value].text))))))))) : null, index.h("div", { class: "gcds-footer__sub" }, index.h("div", { class: "sub__container" }, index.h("nav", { "aria-labelledby": "sub__heading" }, index.h("gcds-sr-only", { tag: "h3", id: "sub__heading" }, I18N$e[lang].site.heading), index.h("ul", null, subLinks
            ? Object.keys(subLinksObject).map(key => {
                if (subLinkCount < 5) {
                    subLinkCount++;
                    return (index.h("li", null, index.h("gcds-link", { size: "small", href: subLinksObject[key] }, key)));
                }
            })
            : Object.keys(siteNav).map(value => {
                return (index.h("li", null, index.h("gcds-link", { size: "small", href: siteNav[value].link }, siteNav[value].text)));
            }))), renderSignature))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "contextualLinks": ["contextualLinksChanged"],
        "subLinks": ["subLinksChanged"]
    }; }
};
GcdsFooter.style = GcdsFooterStyle0;

const gcdsGridCss = "@layer reset, default, display, align, justify, place, equalHeight, tablet, desktop;@layer reset{:host{display:block}:host .gcds-grid{box-sizing:border-box;margin:0;padding:0}}@layer default{:host .gcds-grid{gap:var(--gcds-grid-gap);grid-template-columns:var(--gcds-grid-columns,1fr)}}@layer display{:host .gcds-grid.display-grid-with-cols{display:grid;grid-template-columns:1fr}:host .gcds-grid.display-grid{display:grid}:host .gcds-grid.display-inline-grid{display:inline-grid}}@layer align{:host .gcds-grid.align-content-center{align-content:center}:host .gcds-grid.align-content-end{align-content:end}:host .gcds-grid.align-content-space-around{align-content:space-around}:host .gcds-grid.align-content-space-between{align-content:space-between}:host .gcds-grid.align-content-space-evenly{align-content:space-evenly}:host .gcds-grid.align-content-start{align-content:start}:host .gcds-grid.align-content-stretch{align-content:stretch}:host .gcds-grid.align-items-baseline{align-items:baseline}:host .gcds-grid.align-items-center{align-items:center}:host .gcds-grid.align-items-end{align-items:end}:host .gcds-grid.align-items-start{align-items:start}:host .gcds-grid.align-items-stretch{align-items:stretch}}@layer justify{:host .gcds-grid.justify-content-center{justify-content:center}:host .gcds-grid.justify-content-end{justify-content:end}:host .gcds-grid.justify-content-space-around{justify-content:space-around}:host .gcds-grid.justify-content-space-between{justify-content:space-between}:host .gcds-grid.justify-content-space-evenly{justify-content:space-evenly}:host .gcds-grid.justify-content-start{justify-content:start}:host .gcds-grid.justify-content-stretch{justify-content:stretch}:host .gcds-grid.justify-items-center{justify-items:center}:host .gcds-grid.justify-items-end{justify-items:end}:host .gcds-grid.justify-items-start{justify-items:start}:host .gcds-grid.justify-items-stretch{justify-items:stretch}}@layer place{:host .gcds-grid.place-content-center{place-content:center}:host .gcds-grid.place-content-end{place-content:end}:host .gcds-grid.place-content-space-around{place-content:space-around}:host .gcds-grid.place-content-space-between{place-content:space-between}:host .gcds-grid.place-content-space-evenly{place-content:space-evenly}:host .gcds-grid.place-content-start{place-content:start}:host .gcds-grid.place-content-stretch{place-content:stretch}:host .gcds-grid.place-items-center{place-items:center}:host .gcds-grid.place-items-end{place-items:end}:host .gcds-grid.place-items-start{place-items:start}:host .gcds-grid.place-items-stretch{place-items:stretch}}@layer equalHeight{:host .gcds-grid.equal-row-height{align-items:stretch;grid-auto-rows:1fr}}@layer tablet{@media screen and (width >= 48em){:host .gcds-grid{grid-template-columns:var(\n        --gcds-grid-columns-tablet,var(--gcds-grid-columns,1fr)\n      )}:host .gcds-grid.display-grid-with-cols{grid-template-columns:repeat(var(--gcds-grid-columns-default-tablet),minmax(0,1fr))}}}@layer desktop{@media screen and (width >= 64em){:host .gcds-grid{grid-template-columns:var(\n        --gcds-grid-columns-desktop,var(--gcds-grid-columns-tablet,var(--gcds-grid-columns,1fr))\n      )}:host .gcds-grid.display-grid-with-cols{grid-template-columns:repeat(var(--gcds-grid-columns-default-desktop),minmax(0,1fr))}}}";
const GcdsGridStyle0 = gcdsGridCss;

const GcdsGrid = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.columns = undefined;
        this.columnsTablet = undefined;
        this.columnsDesktop = undefined;
        this.container = undefined;
        this.centered = false;
        this.display = 'grid';
        this.equalRowHeight = false;
        this.tag = 'div';
        this.alignContent = undefined;
        this.justifyContent = undefined;
        this.placeContent = undefined;
        this.alignItems = undefined;
        this.justifyItems = undefined;
        this.placeItems = undefined;
    }
    validateTag(newValue) {
        const values = [
            'article',
            'aside',
            'div',
            'dl',
            'main',
            'nav',
            'ol',
            'section',
            'ul',
        ];
        if (!values.includes(newValue)) {
            this.tag = 'div';
        }
    }
    componentWillLoad() {
        // Validate attributes and set defaults
        this.validateTag(this.tag);
    }
    render() {
        const { alignContent, alignItems, columns, columnsDesktop, columnsTablet, container, centered, display, equalRowHeight, justifyContent, justifyItems, placeContent, placeItems, tag, } = this;
        const Tag = tag;
        const classNames = `
      gcds-grid
      ${alignContent ? `align-content-${alignContent}` : ''}
      ${alignItems ? `align-items-${alignItems}` : ''}
      ${(columns || columnsTablet || columnsDesktop) === undefined
            ? `display-grid-with-cols`
            : `display-${display}`}
      ${equalRowHeight ? 'equal-row-height' : ''}
      ${justifyContent ? `justify-content-${justifyContent}` : ''}
      ${justifyItems ? `justify-items-${justifyItems}` : ''}
      ${placeContent ? `place-content-${placeContent}` : ''}
      ${placeItems ? `place-items-${placeItems}` : ''}
    `;
        // Set CSS variables in style attribute based on passed column properties
        function handleColumns() {
            const responsiveColumns = {};
            if (columns) {
                responsiveColumns['--gcds-grid-columns'] = columns;
            }
            if (columnsTablet) {
                responsiveColumns['--gcds-grid-columns-tablet'] = columnsTablet;
            }
            if (columnsDesktop) {
                responsiveColumns['--gcds-grid-columns-desktop'] = columnsDesktop;
            }
            return responsiveColumns;
        }
        return (index.h(index.Host, null, container ? (index.h("gcds-container", { size: container, centered: centered }, index.h(Tag, { class: classNames, style: handleColumns() }, index.h("slot", null)))) : (index.h(Tag, { class: classNames, style: handleColumns() }, index.h("slot", null)))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "tag": ["validateTag"]
    }; }
};
GcdsGrid.style = GcdsGridStyle0;

const gcdsGridColCss = "@layer reset, default, tablet, desktop;@layer reset{:host{display:block}:host .gcds-grid-col{box-sizing:border-box;display:block;margin:0;padding:0}}@layer default{:host{grid-column:span var(--gcds-grid-columns-default-base) /span var(--gcds-grid-columns-default-base)}:host .gcds-grid-col{height:100%;width:100%}}@layer tablet{@media screen and (width >= 48em){:host{grid-column:span var(--gcds-grid-col-tablet,var(--gcds-grid-columns-default-tablet)) /span var(---gcds-grid-col-tablet,var(--gcds-grid-columns-default-tablet))}}}@layer desktop{@media screen and (width >= 64em){:host{grid-column:span var(--gcds-grid-col-desktop,var(--gcds-grid-columns-default-desktop)) /span var(--gcds-grid-col-desktop,var(--gcds-grid-columns-default-desktop))}}}";
const GcdsGridColStyle0 = gcdsGridColCss;

const GcdsGridCol = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.tag = 'div';
        this.tablet = 6;
        this.desktop = undefined;
    }
    validateTablet(newValue) {
        const values = [1, 2, 3, 4, 5, 6];
        if (!values.includes(newValue)) {
            this.tablet = 6;
        }
    }
    validateDesktop(newValue) {
        const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        if (this.desktop && !values.includes(newValue)) {
            this.desktop = 12;
        }
    }
    componentWillLoad() {
        // Validate attributes and set defaults
        this.validateTablet(this.tablet);
        this.validateDesktop(this.desktop);
    }
    render() {
        const { desktop, tablet, tag } = this;
        const Tag = tag;
        function handleColSize() {
            const colSize = {};
            if (tablet) {
                colSize['--gcds-grid-col-tablet'] = tablet;
            }
            if (desktop) {
                colSize['--gcds-grid-col-desktop'] = desktop;
            }
            else if (tablet) {
                colSize['--gcds-grid-col-desktop'] = tablet * 2;
            }
            return colSize;
        }
        return (index.h(index.Host, { style: handleColSize() }, index.h(Tag, { class: "gcds-grid-col" }, index.h("slot", null))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "tablet": ["validateTablet"],
        "desktop": ["validateDesktop"]
    }; }
};
GcdsGridCol.style = GcdsGridColStyle0;

const I18N$d = {
  en: {
    skip: 'Skip to main content',
    skipLabel: 'Skip to',
  },
  fr: {
    skip: 'Passer au contenu principal',
    skipLabel: 'Passer au',
  },
};

const gcdsHeaderCss = "@layer reset, default, brand, wide;@layer reset{:host{display:block}:host slot{display:initial}}@layer default{:host{margin:var(--gcds-header-margin)!important}:host .gcds-header__container{justify-content:space-between;margin:0 auto;max-width:var(--gcds-header-container-max-width);width:90%}:host .gcds-header__skip-to-nav{margin-inline:auto;position:absolute;text-align:center;top:var(--gcds-header-skiptonav-top);width:100%}:host .gcds-header__skip-to-nav gcds-link{left:0;position:absolute;top:var(--gcds-header-skiptonav-top);width:inherit;z-index:3}:host .gcds-header__skip-to-nav gcds-link:not(:focus){height:0;overflow:hidden;width:0;clip:rect(0,0,0,0)}}@layer brand{:host .gcds-header__brand{border-block-end:var(--gcds-header-brand-border-width) solid var(--gcds-header-brand-border-color);container:component brand/inline-size;margin:var(--gcds-header-brand-margin);padding:var(--gcds-header-brand-padding)}:host .gcds-header__brand .brand__container{display:grid;grid-gap:var(--gcds-header-brand-grid-gap);grid-template-areas:\"signature toggle\" \"search search\";grid-template-columns:1fr .1fr;margin:0 auto;max-width:var(--gcds-header-container-max-width);width:90%}:host .gcds-header__brand .brand__container.container--simple{grid-template-areas:\"signature toggle\"}:host .gcds-header__brand .brand__container :is(.brand__toggle,slot[name=toggle]){grid-area:toggle;text-align:right}:host .gcds-header__brand .brand__container :is(.brand__signature,slot[name=signature]){grid-area:signature}:host .gcds-header__brand .brand__container :is(.brand__signature,slot[name=signature]) gcds-signature{margin:var(--gcds-header-brand-signature-margin)}:host .gcds-header__brand .brand__container .brand__search{display:block;grid-area:search;max-width:100%}}@layer wide{@container brand (width >= 51em){:host .gcds-header__brand .brand__container{grid-template-areas:\"toggle toggle\" \"signature search\";grid-template-columns:1fr 1fr}:host .gcds-header__brand .brand__container .brand__search,:host .gcds-header__brand .brand__container slot[name=search]{margin-inline-start:auto;width:fit-content}}}";
const GcdsHeaderStyle0 = gcdsHeaderCss;

const GcdsHeader = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.langHref = undefined;
        this.signatureVariant = undefined;
        this.signatureHasLink = true;
        this.skipToHref = undefined;
        this.lang = undefined;
    }
    /*
     * Observe lang attribute change
     */
    updateLang() {
        const observer = new MutationObserver(mutations => {
            if (mutations[0].oldValue != this.el.lang) {
                this.lang = this.el.lang;
            }
        });
        observer.observe(this.el, observerConfig);
    }
    async componentWillLoad() {
        // Define lang attribute
        this.lang = assignLanguage(this.el);
        this.updateLang();
    }
    get renderSkipToNav() {
        if (this.el.querySelector('[slot="skip-to-nav"]')) {
            return index.h("slot", { name: "skip-to-nav" });
        }
        else if (this.skipToHref) {
            return (index.h("nav", { class: "gcds-header__skip-to-nav", "aria-label": I18N$d[this.lang].skipLabel }, index.h("gcds-link", { href: this.skipToHref }, I18N$d[this.lang].skip)));
        }
        else {
            return;
        }
    }
    get renderToggle() {
        if (this.el.querySelector('[slot="toggle"]')) {
            return index.h("slot", { name: "toggle" });
        }
        else if (this.langHref) {
            return (index.h("section", { class: "brand__toggle" }, index.h("gcds-lang-toggle", { lang: this.lang, href: this.langHref })));
        }
        else {
            return;
        }
    }
    get renderSignature() {
        const signVariant = this.signatureVariant
            ? this.signatureVariant
            : 'colour';
        if (this.el.querySelector('[slot="signature"]')) {
            return index.h("slot", { name: "signature" });
        }
        else {
            return (index.h("div", { class: "brand__signature" }, index.h("gcds-signature", { type: "signature", variant: signVariant, "has-link": this.signatureHasLink, lang: this.lang })));
        }
    }
    get renderSearch() {
        if (this.el.querySelector('[slot="search"]')) {
            return (index.h("div", { class: "brand__search" }, index.h("slot", { name: "search" })));
        }
        else {
            return;
        }
    }
    get hasSearch() {
        return !!this.el.querySelector('[slot="search"]');
    }
    get hasBanner() {
        return !!this.el.querySelector('[slot="banner"]');
    }
    get hasBreadcrumb() {
        return !!this.el.querySelector('[slot="breadcrumb"]');
    }
    render() {
        const { renderSkipToNav, renderToggle, renderSignature, renderSearch, hasSearch, hasBanner, hasBreadcrumb, } = this;
        return (index.h(index.Host, { role: "banner" }, renderSkipToNav, hasBanner ? index.h("slot", { name: "banner" }) : null, index.h("div", { class: "gcds-header__brand" }, index.h("div", { class: `brand__container ${!hasSearch ? 'container--simple' : ''}` }, renderToggle, renderSignature, renderSearch)), index.h("slot", { name: "menu" }), hasBreadcrumb ? (index.h("div", { class: "gcds-header__container" }, index.h("slot", { name: "breadcrumb" }))) : null));
    }
    get el() { return index.getElement(this); }
};
GcdsHeader.style = GcdsHeaderStyle0;

const gcdsHeadingCss = "@layer reset, default, limit, margin;@layer reset{:host{color:var(--gcds-heading-default-text);display:block}:host :is(h1,h2,h3,h4,h5,h6){box-sizing:border-box;margin:0}:host slot{display:initial}}@layer default{:host :is(h1,h2,h3,h4,h5,h6){text-wrap:balance}:host h1.gcds-heading{font:var(--gcds-heading-h1-desktop)}@media only screen and (width < 48em){:host h1.gcds-heading{font:var(--gcds-heading-h1-mobile)}}:host h1.gcds-heading:after{background-color:var(--gcds-heading-h1-border-background);content:\"\";display:block;height:var(--gcds-heading-h1-border-height);margin-block-start:var(--gcds-heading-h1-border-margin);width:var(--gcds-heading-h1-border-width)}:host h2.gcds-heading{font:var(--gcds-heading-h2-desktop)}@media only screen and (width < 48em){:host h2.gcds-heading{font:var(--gcds-heading-h2-mobile)}}:host h3.gcds-heading{font:var(--gcds-heading-h3-desktop)}@media only screen and (width < 48em){:host h3.gcds-heading{font:var(--gcds-heading-h3-mobile)}}:host h4.gcds-heading{font:var(--gcds-heading-h4-desktop)}@media only screen and (width < 48em){:host h4.gcds-heading{font:var(--gcds-heading-h4-mobile)}}:host h5.gcds-heading{font:var(--gcds-heading-h5-desktop)}@media only screen and (width < 48em){:host h5.gcds-heading{font:var(--gcds-heading-h5-mobile)}}:host h6.gcds-heading{font:var(--gcds-heading-h6-desktop)}@media only screen and (width < 48em){:host h6.gcds-heading{font:var(--gcds-heading-h6-mobile)}}}@layer limit{:host h1.limit{max-width:var(--gcds-heading-character-limit-h1)}:host h2.limit{max-width:var(--gcds-heading-character-limit-h2)}:host h3.limit{max-width:var(--gcds-heading-character-limit-h3)}:host h4.limit{max-width:var(--gcds-heading-character-limit-h4)}:host h5.limit{max-width:var(--gcds-heading-character-limit-h5)}:host h6.limit{max-width:var(--gcds-heading-character-limit-h6)}}@layer margin{:host :is(h1,h2,h3,h4,h5,h6).mt-0{margin-block-start:var(--gcds-heading-spacing-0)}:host :is(h1,h2,h3,h4,h5,h6).mt-50{margin-block-start:var(--gcds-heading-spacing-50)}:host :is(h1,h2,h3,h4,h5,h6).mt-100{margin-block-start:var(--gcds-heading-spacing-100)}:host :is(h1,h2,h3,h4,h5,h6).mt-150{margin-block-start:var(--gcds-heading-spacing-150)}:host :is(h1,h2,h3,h4,h5,h6).mt-200{margin-block-start:var(--gcds-heading-spacing-200)}:host :is(h1,h2,h3,h4,h5,h6).mt-250{margin-block-start:var(--gcds-heading-spacing-250)}:host :is(h1,h2,h3,h4,h5,h6).mt-300{margin-block-start:var(--gcds-heading-spacing-300)}:host :is(h1,h2,h3,h4,h5,h6).mt-400{margin-block-start:var(--gcds-heading-spacing-400)}:host :is(h1,h2,h3,h4,h5,h6).mt-450{margin-block-start:var(--gcds-heading-spacing-450)}:host :is(h1,h2,h3,h4,h5,h6).mt-500{margin-block-start:var(--gcds-heading-spacing-500)}:host :is(h1,h2,h3,h4,h5,h6).mt-550{margin-block-start:var(--gcds-heading-spacing-550)}:host :is(h1,h2,h3,h4,h5,h6).mt-600{margin-block-start:var(--gcds-heading-spacing-600)}:host :is(h1,h2,h3,h4,h5,h6).mt-700{margin-block-start:var(--gcds-heading-spacing-700)}:host :is(h1,h2,h3,h4,h5,h6).mt-800{margin-block-start:var(--gcds-heading-spacing-800)}:host :is(h1,h2,h3,h4,h5,h6).mt-900{margin-block-start:var(--gcds-heading-spacing-900)}:host :is(h1,h2,h3,h4,h5,h6).mt-1000{margin-block-start:var(--gcds-heading-spacing-1000)}:host :is(h1,h2,h3,h4,h5,h6).mb-0{margin-block-end:var(--gcds-heading-spacing-0)}:host :is(h1,h2,h3,h4,h5,h6).mb-50{margin-block-end:var(--gcds-heading-spacing-50)}:host :is(h1,h2,h3,h4,h5,h6).mb-100{margin-block-end:var(--gcds-heading-spacing-100)}:host :is(h1,h2,h3,h4,h5,h6).mb-150{margin-block-end:var(--gcds-heading-spacing-150)}:host :is(h1,h2,h3,h4,h5,h6).mb-200{margin-block-end:var(--gcds-heading-spacing-200)}:host :is(h1,h2,h3,h4,h5,h6).mb-250{margin-block-end:var(--gcds-heading-spacing-250)}:host :is(h1,h2,h3,h4,h5,h6).mb-300{margin-block-end:var(--gcds-heading-spacing-300)}:host :is(h1,h2,h3,h4,h5,h6).mb-400{margin-block-end:var(--gcds-heading-spacing-400)}:host :is(h1,h2,h3,h4,h5,h6).mb-450{margin-block-end:var(--gcds-heading-spacing-450)}:host :is(h1,h2,h3,h4,h5,h6).mb-500{margin-block-end:var(--gcds-heading-spacing-500)}:host :is(h1,h2,h3,h4,h5,h6).mb-550{margin-block-end:var(--gcds-heading-spacing-550)}:host :is(h1,h2,h3,h4,h5,h6).mb-600{margin-block-end:var(--gcds-heading-spacing-600)}:host :is(h1,h2,h3,h4,h5,h6).mb-700{margin-block-end:var(--gcds-heading-spacing-700)}:host :is(h1,h2,h3,h4,h5,h6).mb-800{margin-block-end:var(--gcds-heading-spacing-800)}:host :is(h1,h2,h3,h4,h5,h6).mb-900{margin-block-end:var(--gcds-heading-spacing-900)}:host :is(h1,h2,h3,h4,h5,h6).mb-1000{margin-block-end:var(--gcds-heading-spacing-1000)}}";
const GcdsHeadingStyle0 = gcdsHeadingCss;

const GcdsHeading = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.tag = undefined;
        this.characterLimit = true;
        this.marginTop = undefined;
        this.marginBottom = '400';
    }
    validateTag(newValue) {
        const values = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
        if (!values.includes(newValue)) {
            console.error('Not a valid tag.');
        }
    }
    validateMarginTop(newValue) {
        const values = [
            '0',
            '50',
            '100',
            '150',
            '200',
            '250',
            '300',
            '400',
            '450',
            '500',
            '550',
            '600',
            '700',
            '800',
            '900',
            '1000',
        ];
        if (!this.marginTop || (this.marginTop && !values.includes(newValue))) {
            if (this.tag !== 'h1') {
                this.marginTop = '500';
            }
            else {
                this.marginTop = '0';
            }
        }
    }
    validateMarginBottom(newValue) {
        const values = [
            '0',
            '50',
            '100',
            '150',
            '200',
            '250',
            '300',
            '400',
            '450',
            '500',
            '550',
            '600',
            '700',
            '800',
            '900',
            '1000',
        ];
        if (this.marginBottom && !values.includes(newValue)) {
            this.marginBottom = '400';
        }
    }
    componentWillLoad() {
        // Validate attributes and set defaults
        this.validateTag(this.tag);
        this.validateMarginTop(this.marginTop);
        this.validateMarginBottom(this.marginBottom);
    }
    render() {
        const { characterLimit, marginTop, marginBottom, tag } = this;
        const Tag = tag;
        return (index.h(index.Host, null, index.h(Tag, { class: `
            gcds-heading
            ${characterLimit ? 'limit' : ''}
            ${marginTop ? `mt-${marginTop}` : ''}
            ${marginBottom ? `mb-${marginBottom}` : ''}
          ` }, index.h("slot", null))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "tag": ["validateTag"],
        "marginTop": ["validateMarginTop"],
        "marginBottom": ["validateMarginBottom"]
    }; }
};
GcdsHeading.style = GcdsHeadingStyle0;

const gcdsHintCss = "@layer reset, default;@layer reset{:host{display:block}:host slot{display:initial}}@layer default{:host .gcds-hint,:host gcds-text::part(text){color:inherit}:host .gcds-hint{margin:var(--gcds-hint-margin)}}";
const GcdsHintStyle0 = gcdsHintCss;

const GcdsHint = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.hintId = undefined;
    }
    render() {
        const { hintId } = this;
        return (index.h(index.Host, { id: `hint-${hintId}` }, index.h("gcds-text", { class: "gcds-hint", "margin-bottom": "0", part: "hint" }, index.h("slot", null))));
    }
    get el() { return index.getElement(this); }
};
GcdsHint.style = GcdsHintStyle0;

const gcdsIconCss = "/*!\n * Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n * Copyright 2023 Fonticons, Inc.\n */.fa{font-family:var(--fa-style-family, \"Font Awesome 6 Free\");font-weight:var(--fa-style, 900)}.fa,.fa-brands,.fa-classic,.fa-regular,.fa-sharp,.fa-solid,.fab,.far,.fas{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:var(--fa-display, inline-block);font-style:normal;font-variant:normal;line-height:1;text-rendering:auto}.fa-classic,.fa-regular,.fa-solid,.far,.fas{font-family:\"Font Awesome 6 Free\"}.fa-brands,.fab{font-family:\"Font Awesome 6 Brands\"}.fa-1x{font-size:1em}.fa-2x{font-size:2em}.fa-3x{font-size:3em}.fa-4x{font-size:4em}.fa-5x{font-size:5em}.fa-6x{font-size:6em}.fa-7x{font-size:7em}.fa-8x{font-size:8em}.fa-9x{font-size:9em}.fa-10x{font-size:10em}.fa-2xs{font-size:0.625em;line-height:0.1em;vertical-align:0.225em}.fa-xs{font-size:0.75em;line-height:0.08333em;vertical-align:0.125em}.fa-sm{font-size:0.875em;line-height:0.07143em;vertical-align:0.05357em}.fa-lg{font-size:1.25em;line-height:0.05em;vertical-align:-0.075em}.fa-xl{font-size:1.5em;line-height:0.04167em;vertical-align:-0.125em}.fa-2xl{font-size:2em;line-height:0.03125em;vertical-align:-0.1875em}.fa-fw{text-align:center;width:1.25em}.fa-ul{list-style-type:none;margin-left:var(--fa-li-margin, 2.5em);padding-left:0}.fa-ul>li{position:relative}.fa-li{left:calc(var(--fa-li-width, 2em) * -1);position:absolute;text-align:center;width:var(--fa-li-width, 2em);line-height:inherit}.fa-border{border-radius:var(--fa-border-radius, 0.1em);border:var(--fa-border-width, 0.08em) var(--fa-border-style, solid) var(--fa-border-color, #eee);padding:var(--fa-border-padding, 0.2em 0.25em 0.15em)}.fa-pull-left{float:left;margin-right:var(--fa-pull-margin, 0.3em)}.fa-pull-right{float:right;margin-left:var(--fa-pull-margin, 0.3em)}.fa-beat{-webkit-animation-name:fa-beat;animation-name:fa-beat;-webkit-animation-delay:var(--fa-animation-delay, 0s);animation-delay:var(--fa-animation-delay, 0s);-webkit-animation-direction:var(--fa-animation-direction, normal);animation-direction:var(--fa-animation-direction, normal);-webkit-animation-duration:var(--fa-animation-duration, 1s);animation-duration:var(--fa-animation-duration, 1s);-webkit-animation-iteration-count:var(--fa-animation-iteration-count, infinite);animation-iteration-count:var(--fa-animation-iteration-count, infinite);-webkit-animation-timing-function:var(--fa-animation-timing, ease-in-out);animation-timing-function:var(--fa-animation-timing, ease-in-out)}.fa-bounce{-webkit-animation-name:fa-bounce;animation-name:fa-bounce;-webkit-animation-delay:var(--fa-animation-delay, 0s);animation-delay:var(--fa-animation-delay, 0s);-webkit-animation-direction:var(--fa-animation-direction, normal);animation-direction:var(--fa-animation-direction, normal);-webkit-animation-duration:var(--fa-animation-duration, 1s);animation-duration:var(--fa-animation-duration, 1s);-webkit-animation-iteration-count:var(--fa-animation-iteration-count, infinite);animation-iteration-count:var(--fa-animation-iteration-count, infinite);-webkit-animation-timing-function:var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));animation-timing-function:var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1))}.fa-fade{-webkit-animation-name:fa-fade;animation-name:fa-fade;-webkit-animation-iteration-count:var(--fa-animation-iteration-count, infinite);animation-iteration-count:var(--fa-animation-iteration-count, infinite);-webkit-animation-timing-function:var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));animation-timing-function:var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1))}.fa-beat-fade,.fa-fade{-webkit-animation-delay:var(--fa-animation-delay, 0s);animation-delay:var(--fa-animation-delay, 0s);-webkit-animation-direction:var(--fa-animation-direction, normal);animation-direction:var(--fa-animation-direction, normal);-webkit-animation-duration:var(--fa-animation-duration, 1s);animation-duration:var(--fa-animation-duration, 1s)}.fa-beat-fade{-webkit-animation-name:fa-beat-fade;animation-name:fa-beat-fade;-webkit-animation-iteration-count:var(--fa-animation-iteration-count, infinite);animation-iteration-count:var(--fa-animation-iteration-count, infinite);-webkit-animation-timing-function:var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));animation-timing-function:var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1))}.fa-flip{-webkit-animation-name:fa-flip;animation-name:fa-flip;-webkit-animation-delay:var(--fa-animation-delay, 0s);animation-delay:var(--fa-animation-delay, 0s);-webkit-animation-direction:var(--fa-animation-direction, normal);animation-direction:var(--fa-animation-direction, normal);-webkit-animation-duration:var(--fa-animation-duration, 1s);animation-duration:var(--fa-animation-duration, 1s);-webkit-animation-iteration-count:var(--fa-animation-iteration-count, infinite);animation-iteration-count:var(--fa-animation-iteration-count, infinite);-webkit-animation-timing-function:var(--fa-animation-timing, ease-in-out);animation-timing-function:var(--fa-animation-timing, ease-in-out)}.fa-shake{-webkit-animation-name:fa-shake;animation-name:fa-shake;-webkit-animation-duration:var(--fa-animation-duration, 1s);animation-duration:var(--fa-animation-duration, 1s);-webkit-animation-iteration-count:var(--fa-animation-iteration-count, infinite);animation-iteration-count:var(--fa-animation-iteration-count, infinite);-webkit-animation-timing-function:var(--fa-animation-timing, linear);animation-timing-function:var(--fa-animation-timing, linear)}.fa-shake,.fa-spin{-webkit-animation-delay:var(--fa-animation-delay, 0s);animation-delay:var(--fa-animation-delay, 0s);-webkit-animation-direction:var(--fa-animation-direction, normal);animation-direction:var(--fa-animation-direction, normal)}.fa-spin{-webkit-animation-name:fa-spin;animation-name:fa-spin;-webkit-animation-duration:var(--fa-animation-duration, 2s);animation-duration:var(--fa-animation-duration, 2s);-webkit-animation-iteration-count:var(--fa-animation-iteration-count, infinite);animation-iteration-count:var(--fa-animation-iteration-count, infinite);-webkit-animation-timing-function:var(--fa-animation-timing, linear);animation-timing-function:var(--fa-animation-timing, linear)}.fa-spin-reverse{--fa-animation-direction:reverse}.fa-pulse,.fa-spin-pulse{-webkit-animation-name:fa-spin;animation-name:fa-spin;-webkit-animation-direction:var(--fa-animation-direction, normal);animation-direction:var(--fa-animation-direction, normal);-webkit-animation-duration:var(--fa-animation-duration, 1s);animation-duration:var(--fa-animation-duration, 1s);-webkit-animation-iteration-count:var(--fa-animation-iteration-count, infinite);animation-iteration-count:var(--fa-animation-iteration-count, infinite);-webkit-animation-timing-function:var(--fa-animation-timing, steps(8));animation-timing-function:var(--fa-animation-timing, steps(8))}@media (prefers-reduced-motion: reduce){.fa-beat,.fa-beat-fade,.fa-bounce,.fa-fade,.fa-flip,.fa-pulse,.fa-shake,.fa-spin,.fa-spin-pulse{-webkit-animation-delay:-1ms;animation-delay:-1ms;-webkit-animation-duration:1ms;animation-duration:1ms;-webkit-animation-iteration-count:1;animation-iteration-count:1;-webkit-transition-delay:0s;transition-delay:0s;-webkit-transition-duration:0s;transition-duration:0s}}@-webkit-keyframes fa-beat{0%,90%{-webkit-transform:scale(1);transform:scale(1)}45%{-webkit-transform:scale(var(--fa-beat-scale, 1.25));transform:scale(var(--fa-beat-scale, 1.25))}}@keyframes fa-beat{0%,90%{-webkit-transform:scale(1);transform:scale(1)}45%{-webkit-transform:scale(var(--fa-beat-scale, 1.25));transform:scale(var(--fa-beat-scale, 1.25))}}@-webkit-keyframes fa-bounce{0%{-webkit-transform:scale(1) translateY(0);transform:scale(1) translateY(0)}10%{-webkit-transform:scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);transform:scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0)}30%{-webkit-transform:scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));transform:scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em))}50%{-webkit-transform:scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);transform:scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0)}57%{-webkit-transform:scale(1) translateY(var(--fa-bounce-rebound, -0.125em));transform:scale(1) translateY(var(--fa-bounce-rebound, -0.125em))}64%{-webkit-transform:scale(1) translateY(0);transform:scale(1) translateY(0)}to{-webkit-transform:scale(1) translateY(0);transform:scale(1) translateY(0)}}@keyframes fa-bounce{0%{-webkit-transform:scale(1) translateY(0);transform:scale(1) translateY(0)}10%{-webkit-transform:scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);transform:scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0)}30%{-webkit-transform:scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));transform:scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em))}50%{-webkit-transform:scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);transform:scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0)}57%{-webkit-transform:scale(1) translateY(var(--fa-bounce-rebound, -0.125em));transform:scale(1) translateY(var(--fa-bounce-rebound, -0.125em))}64%{-webkit-transform:scale(1) translateY(0);transform:scale(1) translateY(0)}to{-webkit-transform:scale(1) translateY(0);transform:scale(1) translateY(0)}}@-webkit-keyframes fa-fade{50%{opacity:var(--fa-fade-opacity, 0.4)}}@keyframes fa-fade{50%{opacity:var(--fa-fade-opacity, 0.4)}}@-webkit-keyframes fa-beat-fade{0%,to{opacity:var(--fa-beat-fade-opacity, 0.4);-webkit-transform:scale(1);transform:scale(1)}50%{opacity:1;-webkit-transform:scale(var(--fa-beat-fade-scale, 1.125));transform:scale(var(--fa-beat-fade-scale, 1.125))}}@keyframes fa-beat-fade{0%,to{opacity:var(--fa-beat-fade-opacity, 0.4);-webkit-transform:scale(1);transform:scale(1)}50%{opacity:1;-webkit-transform:scale(var(--fa-beat-fade-scale, 1.125));transform:scale(var(--fa-beat-fade-scale, 1.125))}}@-webkit-keyframes fa-flip{50%{-webkit-transform:rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));transform:rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg))}}@keyframes fa-flip{50%{-webkit-transform:rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));transform:rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg))}}@-webkit-keyframes fa-shake{0%{-webkit-transform:rotate(-15deg);transform:rotate(-15deg)}4%{-webkit-transform:rotate(15deg);transform:rotate(15deg)}8%,24%{-webkit-transform:rotate(-18deg);transform:rotate(-18deg)}12%,28%{-webkit-transform:rotate(18deg);transform:rotate(18deg)}16%{-webkit-transform:rotate(-22deg);transform:rotate(-22deg)}20%{-webkit-transform:rotate(22deg);transform:rotate(22deg)}32%{-webkit-transform:rotate(-12deg);transform:rotate(-12deg)}36%{-webkit-transform:rotate(12deg);transform:rotate(12deg)}40%,to{-webkit-transform:rotate(0deg);transform:rotate(0deg)}}@keyframes fa-shake{0%{-webkit-transform:rotate(-15deg);transform:rotate(-15deg)}4%{-webkit-transform:rotate(15deg);transform:rotate(15deg)}8%,24%{-webkit-transform:rotate(-18deg);transform:rotate(-18deg)}12%,28%{-webkit-transform:rotate(18deg);transform:rotate(18deg)}16%{-webkit-transform:rotate(-22deg);transform:rotate(-22deg)}20%{-webkit-transform:rotate(22deg);transform:rotate(22deg)}32%{-webkit-transform:rotate(-12deg);transform:rotate(-12deg)}36%{-webkit-transform:rotate(12deg);transform:rotate(12deg)}40%,to{-webkit-transform:rotate(0deg);transform:rotate(0deg)}}@-webkit-keyframes fa-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes fa-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.fa-rotate-90{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.fa-rotate-180{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.fa-rotate-270{-webkit-transform:rotate(270deg);transform:rotate(270deg)}.fa-flip-horizontal{-webkit-transform:scaleX(-1);transform:scaleX(-1)}.fa-flip-vertical{-webkit-transform:scaleY(-1);transform:scaleY(-1)}.fa-flip-both,.fa-flip-horizontal.fa-flip-vertical{-webkit-transform:scale(-1);transform:scale(-1)}.fa-rotate-by{-webkit-transform:rotate(var(--fa-rotate-angle, none));transform:rotate(var(--fa-rotate-angle, none))}.fa-stack{display:inline-block;height:2em;line-height:2em;position:relative;vertical-align:middle;width:2.5em}.fa-stack-1x,.fa-stack-2x{left:0;position:absolute;text-align:center;width:100%;z-index:var(--fa-stack-z-index, auto)}.fa-stack-1x{line-height:inherit}.fa-stack-2x{font-size:2em}.fa-inverse{color:var(--fa-inverse, #fff)}.fa-0:before{content:\"0\"}.fa-1:before{content:\"1\"}.fa-2:before{content:\"2\"}.fa-3:before{content:\"3\"}.fa-4:before{content:\"4\"}.fa-5:before{content:\"5\"}.fa-6:before{content:\"6\"}.fa-7:before{content:\"7\"}.fa-8:before{content:\"8\"}.fa-9:before{content:\"9\"}.fa-fill-drip:before{content:\"\\f576\"}.fa-arrows-to-circle:before{content:\"\\e4bd\"}.fa-chevron-circle-right:before,.fa-circle-chevron-right:before{content:\"\\f138\"}.fa-at:before{content:\"@\"}.fa-trash-alt:before,.fa-trash-can:before{content:\"\\f2ed\"}.fa-text-height:before{content:\"\\f034\"}.fa-user-times:before,.fa-user-xmark:before{content:\"\\f235\"}.fa-stethoscope:before{content:\"\\f0f1\"}.fa-comment-alt:before,.fa-message:before{content:\"\\f27a\"}.fa-info:before{content:\"\\f129\"}.fa-compress-alt:before,.fa-down-left-and-up-right-to-center:before{content:\"\\f422\"}.fa-explosion:before{content:\"\\e4e9\"}.fa-file-alt:before,.fa-file-lines:before,.fa-file-text:before{content:\"\\f15c\"}.fa-wave-square:before{content:\"\\f83e\"}.fa-ring:before{content:\"\\f70b\"}.fa-building-un:before{content:\"\\e4d9\"}.fa-dice-three:before{content:\"\\f527\"}.fa-calendar-alt:before,.fa-calendar-days:before{content:\"\\f073\"}.fa-anchor-circle-check:before{content:\"\\e4aa\"}.fa-building-circle-arrow-right:before{content:\"\\e4d1\"}.fa-volleyball-ball:before,.fa-volleyball:before{content:\"\\f45f\"}.fa-arrows-up-to-line:before{content:\"\\e4c2\"}.fa-sort-desc:before,.fa-sort-down:before{content:\"\\f0dd\"}.fa-circle-minus:before,.fa-minus-circle:before{content:\"\\f056\"}.fa-door-open:before{content:\"\\f52b\"}.fa-right-from-bracket:before,.fa-sign-out-alt:before{content:\"\\f2f5\"}.fa-atom:before{content:\"\\f5d2\"}.fa-soap:before{content:\"\\e06e\"}.fa-heart-music-camera-bolt:before,.fa-icons:before{content:\"\\f86d\"}.fa-microphone-alt-slash:before,.fa-microphone-lines-slash:before{content:\"\\f539\"}.fa-bridge-circle-check:before{content:\"\\e4c9\"}.fa-pump-medical:before{content:\"\\e06a\"}.fa-fingerprint:before{content:\"\\f577\"}.fa-hand-point-right:before{content:\"\\f0a4\"}.fa-magnifying-glass-location:before,.fa-search-location:before{content:\"\\f689\"}.fa-forward-step:before,.fa-step-forward:before{content:\"\\f051\"}.fa-face-smile-beam:before,.fa-smile-beam:before{content:\"\\f5b8\"}.fa-flag-checkered:before{content:\"\\f11e\"}.fa-football-ball:before,.fa-football:before{content:\"\\f44e\"}.fa-school-circle-exclamation:before{content:\"\\e56c\"}.fa-crop:before{content:\"\\f125\"}.fa-angle-double-down:before,.fa-angles-down:before{content:\"\\f103\"}.fa-users-rectangle:before{content:\"\\e594\"}.fa-people-roof:before{content:\"\\e537\"}.fa-people-line:before{content:\"\\e534\"}.fa-beer-mug-empty:before,.fa-beer:before{content:\"\\f0fc\"}.fa-diagram-predecessor:before{content:\"\\e477\"}.fa-arrow-up-long:before,.fa-long-arrow-up:before{content:\"\\f176\"}.fa-burn:before,.fa-fire-flame-simple:before{content:\"\\f46a\"}.fa-male:before,.fa-person:before{content:\"\\f183\"}.fa-laptop:before{content:\"\\f109\"}.fa-file-csv:before{content:\"\\f6dd\"}.fa-menorah:before{content:\"\\f676\"}.fa-truck-plane:before{content:\"\\e58f\"}.fa-record-vinyl:before{content:\"\\f8d9\"}.fa-face-grin-stars:before,.fa-grin-stars:before{content:\"\\f587\"}.fa-bong:before{content:\"\\f55c\"}.fa-pastafarianism:before,.fa-spaghetti-monster-flying:before{content:\"\\f67b\"}.fa-arrow-down-up-across-line:before{content:\"\\e4af\"}.fa-spoon:before,.fa-utensil-spoon:before{content:\"\\f2e5\"}.fa-jar-wheat:before{content:\"\\e517\"}.fa-envelopes-bulk:before,.fa-mail-bulk:before{content:\"\\f674\"}.fa-file-circle-exclamation:before{content:\"\\e4eb\"}.fa-circle-h:before,.fa-hospital-symbol:before{content:\"\\f47e\"}.fa-pager:before{content:\"\\f815\"}.fa-address-book:before,.fa-contact-book:before{content:\"\\f2b9\"}.fa-strikethrough:before{content:\"\\f0cc\"}.fa-k:before{content:\"K\"}.fa-landmark-flag:before{content:\"\\e51c\"}.fa-pencil-alt:before,.fa-pencil:before{content:\"\\f303\"}.fa-backward:before{content:\"\\f04a\"}.fa-caret-right:before{content:\"\\f0da\"}.fa-comments:before{content:\"\\f086\"}.fa-file-clipboard:before,.fa-paste:before{content:\"\\f0ea\"}.fa-code-pull-request:before{content:\"\\e13c\"}.fa-clipboard-list:before{content:\"\\f46d\"}.fa-truck-loading:before,.fa-truck-ramp-box:before{content:\"\\f4de\"}.fa-user-check:before{content:\"\\f4fc\"}.fa-vial-virus:before{content:\"\\e597\"}.fa-sheet-plastic:before{content:\"\\e571\"}.fa-blog:before{content:\"\\f781\"}.fa-user-ninja:before{content:\"\\f504\"}.fa-person-arrow-up-from-line:before{content:\"\\e539\"}.fa-scroll-torah:before,.fa-torah:before{content:\"\\f6a0\"}.fa-broom-ball:before,.fa-quidditch-broom-ball:before,.fa-quidditch:before{content:\"\\f458\"}.fa-toggle-off:before{content:\"\\f204\"}.fa-archive:before,.fa-box-archive:before{content:\"\\f187\"}.fa-person-drowning:before{content:\"\\e545\"}.fa-arrow-down-9-1:before,.fa-sort-numeric-desc:before,.fa-sort-numeric-down-alt:before{content:\"\\f886\"}.fa-face-grin-tongue-squint:before,.fa-grin-tongue-squint:before{content:\"\\f58a\"}.fa-spray-can:before{content:\"\\f5bd\"}.fa-truck-monster:before{content:\"\\f63b\"}.fa-w:before{content:\"W\"}.fa-earth-africa:before,.fa-globe-africa:before{content:\"\\f57c\"}.fa-rainbow:before{content:\"\\f75b\"}.fa-circle-notch:before{content:\"\\f1ce\"}.fa-tablet-alt:before,.fa-tablet-screen-button:before{content:\"\\f3fa\"}.fa-paw:before{content:\"\\f1b0\"}.fa-cloud:before{content:\"\\f0c2\"}.fa-trowel-bricks:before{content:\"\\e58a\"}.fa-face-flushed:before,.fa-flushed:before{content:\"\\f579\"}.fa-hospital-user:before{content:\"\\f80d\"}.fa-tent-arrow-left-right:before{content:\"\\e57f\"}.fa-gavel:before,.fa-legal:before{content:\"\\f0e3\"}.fa-binoculars:before{content:\"\\f1e5\"}.fa-microphone-slash:before{content:\"\\f131\"}.fa-box-tissue:before{content:\"\\e05b\"}.fa-motorcycle:before{content:\"\\f21c\"}.fa-bell-concierge:before,.fa-concierge-bell:before{content:\"\\f562\"}.fa-pen-ruler:before,.fa-pencil-ruler:before{content:\"\\f5ae\"}.fa-people-arrows-left-right:before,.fa-people-arrows:before{content:\"\\e068\"}.fa-mars-and-venus-burst:before{content:\"\\e523\"}.fa-caret-square-right:before,.fa-square-caret-right:before{content:\"\\f152\"}.fa-cut:before,.fa-scissors:before{content:\"\\f0c4\"}.fa-sun-plant-wilt:before{content:\"\\e57a\"}.fa-toilets-portable:before{content:\"\\e584\"}.fa-hockey-puck:before{content:\"\\f453\"}.fa-table:before{content:\"\\f0ce\"}.fa-magnifying-glass-arrow-right:before{content:\"\\e521\"}.fa-digital-tachograph:before,.fa-tachograph-digital:before{content:\"\\f566\"}.fa-users-slash:before{content:\"\\e073\"}.fa-clover:before{content:\"\\e139\"}.fa-mail-reply:before,.fa-reply:before{content:\"\\f3e5\"}.fa-star-and-crescent:before{content:\"\\f699\"}.fa-house-fire:before{content:\"\\e50c\"}.fa-minus-square:before,.fa-square-minus:before{content:\"\\f146\"}.fa-helicopter:before{content:\"\\f533\"}.fa-compass:before{content:\"\\f14e\"}.fa-caret-square-down:before,.fa-square-caret-down:before{content:\"\\f150\"}.fa-file-circle-question:before{content:\"\\e4ef\"}.fa-laptop-code:before{content:\"\\f5fc\"}.fa-swatchbook:before{content:\"\\f5c3\"}.fa-prescription-bottle:before{content:\"\\f485\"}.fa-bars:before,.fa-navicon:before{content:\"\\f0c9\"}.fa-people-group:before{content:\"\\e533\"}.fa-hourglass-3:before,.fa-hourglass-end:before{content:\"\\f253\"}.fa-heart-broken:before,.fa-heart-crack:before{content:\"\\f7a9\"}.fa-external-link-square-alt:before,.fa-square-up-right:before{content:\"\\f360\"}.fa-face-kiss-beam:before,.fa-kiss-beam:before{content:\"\\f597\"}.fa-film:before{content:\"\\f008\"}.fa-ruler-horizontal:before{content:\"\\f547\"}.fa-people-robbery:before{content:\"\\e536\"}.fa-lightbulb:before{content:\"\\f0eb\"}.fa-caret-left:before{content:\"\\f0d9\"}.fa-circle-exclamation:before,.fa-exclamation-circle:before{content:\"\\f06a\"}.fa-school-circle-xmark:before{content:\"\\e56d\"}.fa-arrow-right-from-bracket:before,.fa-sign-out:before{content:\"\\f08b\"}.fa-chevron-circle-down:before,.fa-circle-chevron-down:before{content:\"\\f13a\"}.fa-unlock-alt:before,.fa-unlock-keyhole:before{content:\"\\f13e\"}.fa-cloud-showers-heavy:before{content:\"\\f740\"}.fa-headphones-alt:before,.fa-headphones-simple:before{content:\"\\f58f\"}.fa-sitemap:before{content:\"\\f0e8\"}.fa-circle-dollar-to-slot:before,.fa-donate:before{content:\"\\f4b9\"}.fa-memory:before{content:\"\\f538\"}.fa-road-spikes:before{content:\"\\e568\"}.fa-fire-burner:before{content:\"\\e4f1\"}.fa-flag:before{content:\"\\f024\"}.fa-hanukiah:before{content:\"\\f6e6\"}.fa-feather:before{content:\"\\f52d\"}.fa-volume-down:before,.fa-volume-low:before{content:\"\\f027\"}.fa-comment-slash:before{content:\"\\f4b3\"}.fa-cloud-sun-rain:before{content:\"\\f743\"}.fa-compress:before{content:\"\\f066\"}.fa-wheat-alt:before,.fa-wheat-awn:before{content:\"\\e2cd\"}.fa-ankh:before{content:\"\\f644\"}.fa-hands-holding-child:before{content:\"\\e4fa\"}.fa-asterisk:before{content:\"*\"}.fa-check-square:before,.fa-square-check:before{content:\"\\f14a\"}.fa-peseta-sign:before{content:\"\\e221\"}.fa-header:before,.fa-heading:before{content:\"\\f1dc\"}.fa-ghost:before{content:\"\\f6e2\"}.fa-list-squares:before,.fa-list:before{content:\"\\f03a\"}.fa-phone-square-alt:before,.fa-square-phone-flip:before{content:\"\\f87b\"}.fa-cart-plus:before{content:\"\\f217\"}.fa-gamepad:before{content:\"\\f11b\"}.fa-circle-dot:before,.fa-dot-circle:before{content:\"\\f192\"}.fa-dizzy:before,.fa-face-dizzy:before{content:\"\\f567\"}.fa-egg:before{content:\"\\f7fb\"}.fa-house-medical-circle-xmark:before{content:\"\\e513\"}.fa-campground:before{content:\"\\f6bb\"}.fa-folder-plus:before{content:\"\\f65e\"}.fa-futbol-ball:before,.fa-futbol:before,.fa-soccer-ball:before{content:\"\\f1e3\"}.fa-paint-brush:before,.fa-paintbrush:before{content:\"\\f1fc\"}.fa-lock:before{content:\"\\f023\"}.fa-gas-pump:before{content:\"\\f52f\"}.fa-hot-tub-person:before,.fa-hot-tub:before{content:\"\\f593\"}.fa-map-location:before,.fa-map-marked:before{content:\"\\f59f\"}.fa-house-flood-water:before{content:\"\\e50e\"}.fa-tree:before{content:\"\\f1bb\"}.fa-bridge-lock:before{content:\"\\e4cc\"}.fa-sack-dollar:before{content:\"\\f81d\"}.fa-edit:before,.fa-pen-to-square:before{content:\"\\f044\"}.fa-car-side:before{content:\"\\f5e4\"}.fa-share-alt:before,.fa-share-nodes:before{content:\"\\f1e0\"}.fa-heart-circle-minus:before{content:\"\\e4ff\"}.fa-hourglass-2:before,.fa-hourglass-half:before{content:\"\\f252\"}.fa-microscope:before{content:\"\\f610\"}.fa-sink:before{content:\"\\e06d\"}.fa-bag-shopping:before,.fa-shopping-bag:before{content:\"\\f290\"}.fa-arrow-down-z-a:before,.fa-sort-alpha-desc:before,.fa-sort-alpha-down-alt:before{content:\"\\f881\"}.fa-mitten:before{content:\"\\f7b5\"}.fa-person-rays:before{content:\"\\e54d\"}.fa-users:before{content:\"\\f0c0\"}.fa-eye-slash:before{content:\"\\f070\"}.fa-flask-vial:before{content:\"\\e4f3\"}.fa-hand-paper:before,.fa-hand:before{content:\"\\f256\"}.fa-om:before{content:\"\\f679\"}.fa-worm:before{content:\"\\e599\"}.fa-house-circle-xmark:before{content:\"\\e50b\"}.fa-plug:before{content:\"\\f1e6\"}.fa-chevron-up:before{content:\"\\f077\"}.fa-hand-spock:before{content:\"\\f259\"}.fa-stopwatch:before{content:\"\\f2f2\"}.fa-face-kiss:before,.fa-kiss:before{content:\"\\f596\"}.fa-bridge-circle-xmark:before{content:\"\\e4cb\"}.fa-face-grin-tongue:before,.fa-grin-tongue:before{content:\"\\f589\"}.fa-chess-bishop:before{content:\"\\f43a\"}.fa-face-grin-wink:before,.fa-grin-wink:before{content:\"\\f58c\"}.fa-deaf:before,.fa-deafness:before,.fa-ear-deaf:before,.fa-hard-of-hearing:before{content:\"\\f2a4\"}.fa-road-circle-check:before{content:\"\\e564\"}.fa-dice-five:before{content:\"\\f523\"}.fa-rss-square:before,.fa-square-rss:before{content:\"\\f143\"}.fa-land-mine-on:before{content:\"\\e51b\"}.fa-i-cursor:before{content:\"\\f246\"}.fa-stamp:before{content:\"\\f5bf\"}.fa-stairs:before{content:\"\\e289\"}.fa-i:before{content:\"I\"}.fa-hryvnia-sign:before,.fa-hryvnia:before{content:\"\\f6f2\"}.fa-pills:before{content:\"\\f484\"}.fa-face-grin-wide:before,.fa-grin-alt:before{content:\"\\f581\"}.fa-tooth:before{content:\"\\f5c9\"}.fa-v:before{content:\"V\"}.fa-bangladeshi-taka-sign:before{content:\"\\e2e6\"}.fa-bicycle:before{content:\"\\f206\"}.fa-rod-asclepius:before,.fa-rod-snake:before,.fa-staff-aesculapius:before,.fa-staff-snake:before{content:\"\\e579\"}.fa-head-side-cough-slash:before{content:\"\\e062\"}.fa-ambulance:before,.fa-truck-medical:before{content:\"\\f0f9\"}.fa-wheat-awn-circle-exclamation:before{content:\"\\e598\"}.fa-snowman:before{content:\"\\f7d0\"}.fa-mortar-pestle:before{content:\"\\f5a7\"}.fa-road-barrier:before{content:\"\\e562\"}.fa-school:before{content:\"\\f549\"}.fa-igloo:before{content:\"\\f7ae\"}.fa-joint:before{content:\"\\f595\"}.fa-angle-right:before{content:\"\\f105\"}.fa-horse:before{content:\"\\f6f0\"}.fa-q:before{content:\"Q\"}.fa-g:before{content:\"G\"}.fa-notes-medical:before{content:\"\\f481\"}.fa-temperature-2:before,.fa-temperature-half:before,.fa-thermometer-2:before,.fa-thermometer-half:before{content:\"\\f2c9\"}.fa-dong-sign:before{content:\"\\e169\"}.fa-capsules:before{content:\"\\f46b\"}.fa-poo-bolt:before,.fa-poo-storm:before{content:\"\\f75a\"}.fa-face-frown-open:before,.fa-frown-open:before{content:\"\\f57a\"}.fa-hand-point-up:before{content:\"\\f0a6\"}.fa-money-bill:before{content:\"\\f0d6\"}.fa-bookmark:before{content:\"\\f02e\"}.fa-align-justify:before{content:\"\\f039\"}.fa-umbrella-beach:before{content:\"\\f5ca\"}.fa-helmet-un:before{content:\"\\e503\"}.fa-bullseye:before{content:\"\\f140\"}.fa-bacon:before{content:\"\\f7e5\"}.fa-hand-point-down:before{content:\"\\f0a7\"}.fa-arrow-up-from-bracket:before{content:\"\\e09a\"}.fa-folder-blank:before,.fa-folder:before{content:\"\\f07b\"}.fa-file-medical-alt:before,.fa-file-waveform:before{content:\"\\f478\"}.fa-radiation:before{content:\"\\f7b9\"}.fa-chart-simple:before{content:\"\\e473\"}.fa-mars-stroke:before{content:\"\\f229\"}.fa-vial:before{content:\"\\f492\"}.fa-dashboard:before,.fa-gauge-med:before,.fa-gauge:before,.fa-tachometer-alt-average:before{content:\"\\f624\"}.fa-magic-wand-sparkles:before,.fa-wand-magic-sparkles:before{content:\"\\e2ca\"}.fa-e:before{content:\"E\"}.fa-pen-alt:before,.fa-pen-clip:before{content:\"\\f305\"}.fa-bridge-circle-exclamation:before{content:\"\\e4ca\"}.fa-user:before{content:\"\\f007\"}.fa-school-circle-check:before{content:\"\\e56b\"}.fa-dumpster:before{content:\"\\f793\"}.fa-shuttle-van:before,.fa-van-shuttle:before{content:\"\\f5b6\"}.fa-building-user:before{content:\"\\e4da\"}.fa-caret-square-left:before,.fa-square-caret-left:before{content:\"\\f191\"}.fa-highlighter:before{content:\"\\f591\"}.fa-key:before{content:\"\\f084\"}.fa-bullhorn:before{content:\"\\f0a1\"}.fa-globe:before{content:\"\\f0ac\"}.fa-synagogue:before{content:\"\\f69b\"}.fa-person-half-dress:before{content:\"\\e548\"}.fa-road-bridge:before{content:\"\\e563\"}.fa-location-arrow:before{content:\"\\f124\"}.fa-c:before{content:\"C\"}.fa-tablet-button:before{content:\"\\f10a\"}.fa-building-lock:before{content:\"\\e4d6\"}.fa-pizza-slice:before{content:\"\\f818\"}.fa-money-bill-wave:before{content:\"\\f53a\"}.fa-area-chart:before,.fa-chart-area:before{content:\"\\f1fe\"}.fa-house-flag:before{content:\"\\e50d\"}.fa-person-circle-minus:before{content:\"\\e540\"}.fa-ban:before,.fa-cancel:before{content:\"\\f05e\"}.fa-camera-rotate:before{content:\"\\e0d8\"}.fa-air-freshener:before,.fa-spray-can-sparkles:before{content:\"\\f5d0\"}.fa-star:before{content:\"\\f005\"}.fa-repeat:before{content:\"\\f363\"}.fa-cross:before{content:\"\\f654\"}.fa-box:before{content:\"\\f466\"}.fa-venus-mars:before{content:\"\\f228\"}.fa-arrow-pointer:before,.fa-mouse-pointer:before{content:\"\\f245\"}.fa-expand-arrows-alt:before,.fa-maximize:before{content:\"\\f31e\"}.fa-charging-station:before{content:\"\\f5e7\"}.fa-shapes:before,.fa-triangle-circle-square:before{content:\"\\f61f\"}.fa-random:before,.fa-shuffle:before{content:\"\\f074\"}.fa-person-running:before,.fa-running:before{content:\"\\f70c\"}.fa-mobile-retro:before{content:\"\\e527\"}.fa-grip-lines-vertical:before{content:\"\\f7a5\"}.fa-spider:before{content:\"\\f717\"}.fa-hands-bound:before{content:\"\\e4f9\"}.fa-file-invoice-dollar:before{content:\"\\f571\"}.fa-plane-circle-exclamation:before{content:\"\\e556\"}.fa-x-ray:before{content:\"\\f497\"}.fa-spell-check:before{content:\"\\f891\"}.fa-slash:before{content:\"\\f715\"}.fa-computer-mouse:before,.fa-mouse:before{content:\"\\f8cc\"}.fa-arrow-right-to-bracket:before,.fa-sign-in:before{content:\"\\f090\"}.fa-shop-slash:before,.fa-store-alt-slash:before{content:\"\\e070\"}.fa-server:before{content:\"\\f233\"}.fa-virus-covid-slash:before{content:\"\\e4a9\"}.fa-shop-lock:before{content:\"\\e4a5\"}.fa-hourglass-1:before,.fa-hourglass-start:before{content:\"\\f251\"}.fa-blender-phone:before{content:\"\\f6b6\"}.fa-building-wheat:before{content:\"\\e4db\"}.fa-person-breastfeeding:before{content:\"\\e53a\"}.fa-right-to-bracket:before,.fa-sign-in-alt:before{content:\"\\f2f6\"}.fa-venus:before{content:\"\\f221\"}.fa-passport:before{content:\"\\f5ab\"}.fa-heart-pulse:before,.fa-heartbeat:before{content:\"\\f21e\"}.fa-people-carry-box:before,.fa-people-carry:before{content:\"\\f4ce\"}.fa-temperature-high:before{content:\"\\f769\"}.fa-microchip:before{content:\"\\f2db\"}.fa-crown:before{content:\"\\f521\"}.fa-weight-hanging:before{content:\"\\f5cd\"}.fa-xmarks-lines:before{content:\"\\e59a\"}.fa-file-prescription:before{content:\"\\f572\"}.fa-weight-scale:before,.fa-weight:before{content:\"\\f496\"}.fa-user-friends:before,.fa-user-group:before{content:\"\\f500\"}.fa-arrow-up-a-z:before,.fa-sort-alpha-up:before{content:\"\\f15e\"}.fa-chess-knight:before{content:\"\\f441\"}.fa-face-laugh-squint:before,.fa-laugh-squint:before{content:\"\\f59b\"}.fa-wheelchair:before{content:\"\\f193\"}.fa-arrow-circle-up:before,.fa-circle-arrow-up:before{content:\"\\f0aa\"}.fa-toggle-on:before{content:\"\\f205\"}.fa-person-walking:before,.fa-walking:before{content:\"\\f554\"}.fa-l:before{content:\"L\"}.fa-fire:before{content:\"\\f06d\"}.fa-bed-pulse:before,.fa-procedures:before{content:\"\\f487\"}.fa-shuttle-space:before,.fa-space-shuttle:before{content:\"\\f197\"}.fa-face-laugh:before,.fa-laugh:before{content:\"\\f599\"}.fa-folder-open:before{content:\"\\f07c\"}.fa-heart-circle-plus:before{content:\"\\e500\"}.fa-code-fork:before{content:\"\\e13b\"}.fa-city:before{content:\"\\f64f\"}.fa-microphone-alt:before,.fa-microphone-lines:before{content:\"\\f3c9\"}.fa-pepper-hot:before{content:\"\\f816\"}.fa-unlock:before{content:\"\\f09c\"}.fa-colon-sign:before{content:\"\\e140\"}.fa-headset:before{content:\"\\f590\"}.fa-store-slash:before{content:\"\\e071\"}.fa-road-circle-xmark:before{content:\"\\e566\"}.fa-user-minus:before{content:\"\\f503\"}.fa-mars-stroke-up:before,.fa-mars-stroke-v:before{content:\"\\f22a\"}.fa-champagne-glasses:before,.fa-glass-cheers:before{content:\"\\f79f\"}.fa-clipboard:before{content:\"\\f328\"}.fa-house-circle-exclamation:before{content:\"\\e50a\"}.fa-file-arrow-up:before,.fa-file-upload:before{content:\"\\f574\"}.fa-wifi-3:before,.fa-wifi-strong:before,.fa-wifi:before{content:\"\\f1eb\"}.fa-bath:before,.fa-bathtub:before{content:\"\\f2cd\"}.fa-underline:before{content:\"\\f0cd\"}.fa-user-edit:before,.fa-user-pen:before{content:\"\\f4ff\"}.fa-signature:before{content:\"\\f5b7\"}.fa-stroopwafel:before{content:\"\\f551\"}.fa-bold:before{content:\"\\f032\"}.fa-anchor-lock:before{content:\"\\e4ad\"}.fa-building-ngo:before{content:\"\\e4d7\"}.fa-manat-sign:before{content:\"\\e1d5\"}.fa-not-equal:before{content:\"\\f53e\"}.fa-border-style:before,.fa-border-top-left:before{content:\"\\f853\"}.fa-map-location-dot:before,.fa-map-marked-alt:before{content:\"\\f5a0\"}.fa-jedi:before{content:\"\\f669\"}.fa-poll:before,.fa-square-poll-vertical:before{content:\"\\f681\"}.fa-mug-hot:before{content:\"\\f7b6\"}.fa-battery-car:before,.fa-car-battery:before{content:\"\\f5df\"}.fa-gift:before{content:\"\\f06b\"}.fa-dice-two:before{content:\"\\f528\"}.fa-chess-queen:before{content:\"\\f445\"}.fa-glasses:before{content:\"\\f530\"}.fa-chess-board:before{content:\"\\f43c\"}.fa-building-circle-check:before{content:\"\\e4d2\"}.fa-person-chalkboard:before{content:\"\\e53d\"}.fa-mars-stroke-h:before,.fa-mars-stroke-right:before{content:\"\\f22b\"}.fa-hand-back-fist:before,.fa-hand-rock:before{content:\"\\f255\"}.fa-caret-square-up:before,.fa-square-caret-up:before{content:\"\\f151\"}.fa-cloud-showers-water:before{content:\"\\e4e4\"}.fa-bar-chart:before,.fa-chart-bar:before{content:\"\\f080\"}.fa-hands-bubbles:before,.fa-hands-wash:before{content:\"\\e05e\"}.fa-less-than-equal:before{content:\"\\f537\"}.fa-train:before{content:\"\\f238\"}.fa-eye-low-vision:before,.fa-low-vision:before{content:\"\\f2a8\"}.fa-crow:before{content:\"\\f520\"}.fa-sailboat:before{content:\"\\e445\"}.fa-window-restore:before{content:\"\\f2d2\"}.fa-plus-square:before,.fa-square-plus:before{content:\"\\f0fe\"}.fa-torii-gate:before{content:\"\\f6a1\"}.fa-frog:before{content:\"\\f52e\"}.fa-bucket:before{content:\"\\e4cf\"}.fa-image:before{content:\"\\f03e\"}.fa-microphone:before{content:\"\\f130\"}.fa-cow:before{content:\"\\f6c8\"}.fa-caret-up:before{content:\"\\f0d8\"}.fa-screwdriver:before{content:\"\\f54a\"}.fa-folder-closed:before{content:\"\\e185\"}.fa-house-tsunami:before{content:\"\\e515\"}.fa-square-nfi:before{content:\"\\e576\"}.fa-arrow-up-from-ground-water:before{content:\"\\e4b5\"}.fa-glass-martini-alt:before,.fa-martini-glass:before{content:\"\\f57b\"}.fa-rotate-back:before,.fa-rotate-backward:before,.fa-rotate-left:before,.fa-undo-alt:before{content:\"\\f2ea\"}.fa-columns:before,.fa-table-columns:before{content:\"\\f0db\"}.fa-lemon:before{content:\"\\f094\"}.fa-head-side-mask:before{content:\"\\e063\"}.fa-handshake:before{content:\"\\f2b5\"}.fa-gem:before{content:\"\\f3a5\"}.fa-dolly-box:before,.fa-dolly:before{content:\"\\f472\"}.fa-smoking:before{content:\"\\f48d\"}.fa-compress-arrows-alt:before,.fa-minimize:before{content:\"\\f78c\"}.fa-monument:before{content:\"\\f5a6\"}.fa-snowplow:before{content:\"\\f7d2\"}.fa-angle-double-right:before,.fa-angles-right:before{content:\"\\f101\"}.fa-cannabis:before{content:\"\\f55f\"}.fa-circle-play:before,.fa-play-circle:before{content:\"\\f144\"}.fa-tablets:before{content:\"\\f490\"}.fa-ethernet:before{content:\"\\f796\"}.fa-eur:before,.fa-euro-sign:before,.fa-euro:before{content:\"\\f153\"}.fa-chair:before{content:\"\\f6c0\"}.fa-check-circle:before,.fa-circle-check:before{content:\"\\f058\"}.fa-circle-stop:before,.fa-stop-circle:before{content:\"\\f28d\"}.fa-compass-drafting:before,.fa-drafting-compass:before{content:\"\\f568\"}.fa-plate-wheat:before{content:\"\\e55a\"}.fa-icicles:before{content:\"\\f7ad\"}.fa-person-shelter:before{content:\"\\e54f\"}.fa-neuter:before{content:\"\\f22c\"}.fa-id-badge:before{content:\"\\f2c1\"}.fa-marker:before{content:\"\\f5a1\"}.fa-face-laugh-beam:before,.fa-laugh-beam:before{content:\"\\f59a\"}.fa-helicopter-symbol:before{content:\"\\e502\"}.fa-universal-access:before{content:\"\\f29a\"}.fa-chevron-circle-up:before,.fa-circle-chevron-up:before{content:\"\\f139\"}.fa-lari-sign:before{content:\"\\e1c8\"}.fa-volcano:before{content:\"\\f770\"}.fa-person-walking-dashed-line-arrow-right:before{content:\"\\e553\"}.fa-gbp:before,.fa-pound-sign:before,.fa-sterling-sign:before{content:\"\\f154\"}.fa-viruses:before{content:\"\\e076\"}.fa-square-person-confined:before{content:\"\\e577\"}.fa-user-tie:before{content:\"\\f508\"}.fa-arrow-down-long:before,.fa-long-arrow-down:before{content:\"\\f175\"}.fa-tent-arrow-down-to-line:before{content:\"\\e57e\"}.fa-certificate:before{content:\"\\f0a3\"}.fa-mail-reply-all:before,.fa-reply-all:before{content:\"\\f122\"}.fa-suitcase:before{content:\"\\f0f2\"}.fa-person-skating:before,.fa-skating:before{content:\"\\f7c5\"}.fa-filter-circle-dollar:before,.fa-funnel-dollar:before{content:\"\\f662\"}.fa-camera-retro:before{content:\"\\f083\"}.fa-arrow-circle-down:before,.fa-circle-arrow-down:before{content:\"\\f0ab\"}.fa-arrow-right-to-file:before,.fa-file-import:before{content:\"\\f56f\"}.fa-external-link-square:before,.fa-square-arrow-up-right:before{content:\"\\f14c\"}.fa-box-open:before{content:\"\\f49e\"}.fa-scroll:before{content:\"\\f70e\"}.fa-spa:before{content:\"\\f5bb\"}.fa-location-pin-lock:before{content:\"\\e51f\"}.fa-pause:before{content:\"\\f04c\"}.fa-hill-avalanche:before{content:\"\\e507\"}.fa-temperature-0:before,.fa-temperature-empty:before,.fa-thermometer-0:before,.fa-thermometer-empty:before{content:\"\\f2cb\"}.fa-bomb:before{content:\"\\f1e2\"}.fa-registered:before{content:\"\\f25d\"}.fa-address-card:before,.fa-contact-card:before,.fa-vcard:before{content:\"\\f2bb\"}.fa-balance-scale-right:before,.fa-scale-unbalanced-flip:before{content:\"\\f516\"}.fa-subscript:before{content:\"\\f12c\"}.fa-diamond-turn-right:before,.fa-directions:before{content:\"\\f5eb\"}.fa-burst:before{content:\"\\e4dc\"}.fa-house-laptop:before,.fa-laptop-house:before{content:\"\\e066\"}.fa-face-tired:before,.fa-tired:before{content:\"\\f5c8\"}.fa-money-bills:before{content:\"\\e1f3\"}.fa-smog:before{content:\"\\f75f\"}.fa-crutch:before{content:\"\\f7f7\"}.fa-cloud-arrow-up:before,.fa-cloud-upload-alt:before,.fa-cloud-upload:before{content:\"\\f0ee\"}.fa-palette:before{content:\"\\f53f\"}.fa-arrows-turn-right:before{content:\"\\e4c0\"}.fa-vest:before{content:\"\\e085\"}.fa-ferry:before{content:\"\\e4ea\"}.fa-arrows-down-to-people:before{content:\"\\e4b9\"}.fa-seedling:before,.fa-sprout:before{content:\"\\f4d8\"}.fa-arrows-alt-h:before,.fa-left-right:before{content:\"\\f337\"}.fa-boxes-packing:before{content:\"\\e4c7\"}.fa-arrow-circle-left:before,.fa-circle-arrow-left:before{content:\"\\f0a8\"}.fa-group-arrows-rotate:before{content:\"\\e4f6\"}.fa-bowl-food:before{content:\"\\e4c6\"}.fa-candy-cane:before{content:\"\\f786\"}.fa-arrow-down-wide-short:before,.fa-sort-amount-asc:before,.fa-sort-amount-down:before{content:\"\\f160\"}.fa-cloud-bolt:before,.fa-thunderstorm:before{content:\"\\f76c\"}.fa-remove-format:before,.fa-text-slash:before{content:\"\\f87d\"}.fa-face-smile-wink:before,.fa-smile-wink:before{content:\"\\f4da\"}.fa-file-word:before{content:\"\\f1c2\"}.fa-file-powerpoint:before{content:\"\\f1c4\"}.fa-arrows-h:before,.fa-arrows-left-right:before{content:\"\\f07e\"}.fa-house-lock:before{content:\"\\e510\"}.fa-cloud-arrow-down:before,.fa-cloud-download-alt:before,.fa-cloud-download:before{content:\"\\f0ed\"}.fa-children:before{content:\"\\e4e1\"}.fa-blackboard:before,.fa-chalkboard:before{content:\"\\f51b\"}.fa-user-alt-slash:before,.fa-user-large-slash:before{content:\"\\f4fa\"}.fa-envelope-open:before{content:\"\\f2b6\"}.fa-handshake-alt-slash:before,.fa-handshake-simple-slash:before{content:\"\\e05f\"}.fa-mattress-pillow:before{content:\"\\e525\"}.fa-guarani-sign:before{content:\"\\e19a\"}.fa-arrows-rotate:before,.fa-refresh:before,.fa-sync:before{content:\"\\f021\"}.fa-fire-extinguisher:before{content:\"\\f134\"}.fa-cruzeiro-sign:before{content:\"\\e152\"}.fa-greater-than-equal:before{content:\"\\f532\"}.fa-shield-alt:before,.fa-shield-halved:before{content:\"\\f3ed\"}.fa-atlas:before,.fa-book-atlas:before{content:\"\\f558\"}.fa-virus:before{content:\"\\e074\"}.fa-envelope-circle-check:before{content:\"\\e4e8\"}.fa-layer-group:before{content:\"\\f5fd\"}.fa-arrows-to-dot:before{content:\"\\e4be\"}.fa-archway:before{content:\"\\f557\"}.fa-heart-circle-check:before{content:\"\\e4fd\"}.fa-house-chimney-crack:before,.fa-house-damage:before{content:\"\\f6f1\"}.fa-file-archive:before,.fa-file-zipper:before{content:\"\\f1c6\"}.fa-square:before{content:\"\\f0c8\"}.fa-glass-martini:before,.fa-martini-glass-empty:before{content:\"\\f000\"}.fa-couch:before{content:\"\\f4b8\"}.fa-cedi-sign:before{content:\"\\e0df\"}.fa-italic:before{content:\"\\f033\"}.fa-church:before{content:\"\\f51d\"}.fa-comments-dollar:before{content:\"\\f653\"}.fa-democrat:before{content:\"\\f747\"}.fa-z:before{content:\"Z\"}.fa-person-skiing:before,.fa-skiing:before{content:\"\\f7c9\"}.fa-road-lock:before{content:\"\\e567\"}.fa-a:before{content:\"A\"}.fa-temperature-arrow-down:before,.fa-temperature-down:before{content:\"\\e03f\"}.fa-feather-alt:before,.fa-feather-pointed:before{content:\"\\f56b\"}.fa-p:before{content:\"P\"}.fa-snowflake:before{content:\"\\f2dc\"}.fa-newspaper:before{content:\"\\f1ea\"}.fa-ad:before,.fa-rectangle-ad:before{content:\"\\f641\"}.fa-arrow-circle-right:before,.fa-circle-arrow-right:before{content:\"\\f0a9\"}.fa-filter-circle-xmark:before{content:\"\\e17b\"}.fa-locust:before{content:\"\\e520\"}.fa-sort:before,.fa-unsorted:before{content:\"\\f0dc\"}.fa-list-1-2:before,.fa-list-numeric:before,.fa-list-ol:before{content:\"\\f0cb\"}.fa-person-dress-burst:before{content:\"\\e544\"}.fa-money-check-alt:before,.fa-money-check-dollar:before{content:\"\\f53d\"}.fa-vector-square:before{content:\"\\f5cb\"}.fa-bread-slice:before{content:\"\\f7ec\"}.fa-language:before{content:\"\\f1ab\"}.fa-face-kiss-wink-heart:before,.fa-kiss-wink-heart:before{content:\"\\f598\"}.fa-filter:before{content:\"\\f0b0\"}.fa-question:before{content:\"?\"}.fa-file-signature:before{content:\"\\f573\"}.fa-arrows-alt:before,.fa-up-down-left-right:before{content:\"\\f0b2\"}.fa-house-chimney-user:before{content:\"\\e065\"}.fa-hand-holding-heart:before{content:\"\\f4be\"}.fa-puzzle-piece:before{content:\"\\f12e\"}.fa-money-check:before{content:\"\\f53c\"}.fa-star-half-alt:before,.fa-star-half-stroke:before{content:\"\\f5c0\"}.fa-code:before{content:\"\\f121\"}.fa-glass-whiskey:before,.fa-whiskey-glass:before{content:\"\\f7a0\"}.fa-building-circle-exclamation:before{content:\"\\e4d3\"}.fa-magnifying-glass-chart:before{content:\"\\e522\"}.fa-arrow-up-right-from-square:before,.fa-external-link:before{content:\"\\f08e\"}.fa-cubes-stacked:before{content:\"\\e4e6\"}.fa-krw:before,.fa-won-sign:before,.fa-won:before{content:\"\\f159\"}.fa-virus-covid:before{content:\"\\e4a8\"}.fa-austral-sign:before{content:\"\\e0a9\"}.fa-f:before{content:\"F\"}.fa-leaf:before{content:\"\\f06c\"}.fa-road:before{content:\"\\f018\"}.fa-cab:before,.fa-taxi:before{content:\"\\f1ba\"}.fa-person-circle-plus:before{content:\"\\e541\"}.fa-chart-pie:before,.fa-pie-chart:before{content:\"\\f200\"}.fa-bolt-lightning:before{content:\"\\e0b7\"}.fa-sack-xmark:before{content:\"\\e56a\"}.fa-file-excel:before{content:\"\\f1c3\"}.fa-file-contract:before{content:\"\\f56c\"}.fa-fish-fins:before{content:\"\\e4f2\"}.fa-building-flag:before{content:\"\\e4d5\"}.fa-face-grin-beam:before,.fa-grin-beam:before{content:\"\\f582\"}.fa-object-ungroup:before{content:\"\\f248\"}.fa-poop:before{content:\"\\f619\"}.fa-location-pin:before,.fa-map-marker:before{content:\"\\f041\"}.fa-kaaba:before{content:\"\\f66b\"}.fa-toilet-paper:before{content:\"\\f71e\"}.fa-hard-hat:before,.fa-hat-hard:before,.fa-helmet-safety:before{content:\"\\f807\"}.fa-eject:before{content:\"\\f052\"}.fa-arrow-alt-circle-right:before,.fa-circle-right:before{content:\"\\f35a\"}.fa-plane-circle-check:before{content:\"\\e555\"}.fa-face-rolling-eyes:before,.fa-meh-rolling-eyes:before{content:\"\\f5a5\"}.fa-object-group:before{content:\"\\f247\"}.fa-chart-line:before,.fa-line-chart:before{content:\"\\f201\"}.fa-mask-ventilator:before{content:\"\\e524\"}.fa-arrow-right:before{content:\"\\f061\"}.fa-map-signs:before,.fa-signs-post:before{content:\"\\f277\"}.fa-cash-register:before{content:\"\\f788\"}.fa-person-circle-question:before{content:\"\\e542\"}.fa-h:before{content:\"H\"}.fa-tarp:before{content:\"\\e57b\"}.fa-screwdriver-wrench:before,.fa-tools:before{content:\"\\f7d9\"}.fa-arrows-to-eye:before{content:\"\\e4bf\"}.fa-plug-circle-bolt:before{content:\"\\e55b\"}.fa-heart:before{content:\"\\f004\"}.fa-mars-and-venus:before{content:\"\\f224\"}.fa-home-user:before,.fa-house-user:before{content:\"\\e1b0\"}.fa-dumpster-fire:before{content:\"\\f794\"}.fa-house-crack:before{content:\"\\e3b1\"}.fa-cocktail:before,.fa-martini-glass-citrus:before{content:\"\\f561\"}.fa-face-surprise:before,.fa-surprise:before{content:\"\\f5c2\"}.fa-bottle-water:before{content:\"\\e4c5\"}.fa-circle-pause:before,.fa-pause-circle:before{content:\"\\f28b\"}.fa-toilet-paper-slash:before{content:\"\\e072\"}.fa-apple-alt:before,.fa-apple-whole:before{content:\"\\f5d1\"}.fa-kitchen-set:before{content:\"\\e51a\"}.fa-r:before{content:\"R\"}.fa-temperature-1:before,.fa-temperature-quarter:before,.fa-thermometer-1:before,.fa-thermometer-quarter:before{content:\"\\f2ca\"}.fa-cube:before{content:\"\\f1b2\"}.fa-bitcoin-sign:before{content:\"\\e0b4\"}.fa-shield-dog:before{content:\"\\e573\"}.fa-solar-panel:before{content:\"\\f5ba\"}.fa-lock-open:before{content:\"\\f3c1\"}.fa-elevator:before{content:\"\\e16d\"}.fa-money-bill-transfer:before{content:\"\\e528\"}.fa-money-bill-trend-up:before{content:\"\\e529\"}.fa-house-flood-water-circle-arrow-right:before{content:\"\\e50f\"}.fa-poll-h:before,.fa-square-poll-horizontal:before{content:\"\\f682\"}.fa-circle:before{content:\"\\f111\"}.fa-backward-fast:before,.fa-fast-backward:before{content:\"\\f049\"}.fa-recycle:before{content:\"\\f1b8\"}.fa-user-astronaut:before{content:\"\\f4fb\"}.fa-plane-slash:before{content:\"\\e069\"}.fa-trademark:before{content:\"\\f25c\"}.fa-basketball-ball:before,.fa-basketball:before{content:\"\\f434\"}.fa-satellite-dish:before{content:\"\\f7c0\"}.fa-arrow-alt-circle-up:before,.fa-circle-up:before{content:\"\\f35b\"}.fa-mobile-alt:before,.fa-mobile-screen-button:before{content:\"\\f3cd\"}.fa-volume-high:before,.fa-volume-up:before{content:\"\\f028\"}.fa-users-rays:before{content:\"\\e593\"}.fa-wallet:before{content:\"\\f555\"}.fa-clipboard-check:before{content:\"\\f46c\"}.fa-file-audio:before{content:\"\\f1c7\"}.fa-burger:before,.fa-hamburger:before{content:\"\\f805\"}.fa-wrench:before{content:\"\\f0ad\"}.fa-bugs:before{content:\"\\e4d0\"}.fa-rupee-sign:before,.fa-rupee:before{content:\"\\f156\"}.fa-file-image:before{content:\"\\f1c5\"}.fa-circle-question:before,.fa-question-circle:before{content:\"\\f059\"}.fa-plane-departure:before{content:\"\\f5b0\"}.fa-handshake-slash:before{content:\"\\e060\"}.fa-book-bookmark:before{content:\"\\e0bb\"}.fa-code-branch:before{content:\"\\f126\"}.fa-hat-cowboy:before{content:\"\\f8c0\"}.fa-bridge:before{content:\"\\e4c8\"}.fa-phone-alt:before,.fa-phone-flip:before{content:\"\\f879\"}.fa-truck-front:before{content:\"\\e2b7\"}.fa-cat:before{content:\"\\f6be\"}.fa-anchor-circle-exclamation:before{content:\"\\e4ab\"}.fa-truck-field:before{content:\"\\e58d\"}.fa-route:before{content:\"\\f4d7\"}.fa-clipboard-question:before{content:\"\\e4e3\"}.fa-panorama:before{content:\"\\e209\"}.fa-comment-medical:before{content:\"\\f7f5\"}.fa-teeth-open:before{content:\"\\f62f\"}.fa-file-circle-minus:before{content:\"\\e4ed\"}.fa-tags:before{content:\"\\f02c\"}.fa-wine-glass:before{content:\"\\f4e3\"}.fa-fast-forward:before,.fa-forward-fast:before{content:\"\\f050\"}.fa-face-meh-blank:before,.fa-meh-blank:before{content:\"\\f5a4\"}.fa-parking:before,.fa-square-parking:before{content:\"\\f540\"}.fa-house-signal:before{content:\"\\e012\"}.fa-bars-progress:before,.fa-tasks-alt:before{content:\"\\f828\"}.fa-faucet-drip:before{content:\"\\e006\"}.fa-cart-flatbed:before,.fa-dolly-flatbed:before{content:\"\\f474\"}.fa-ban-smoking:before,.fa-smoking-ban:before{content:\"\\f54d\"}.fa-terminal:before{content:\"\\f120\"}.fa-mobile-button:before{content:\"\\f10b\"}.fa-house-medical-flag:before{content:\"\\e514\"}.fa-basket-shopping:before,.fa-shopping-basket:before{content:\"\\f291\"}.fa-tape:before{content:\"\\f4db\"}.fa-bus-alt:before,.fa-bus-simple:before{content:\"\\f55e\"}.fa-eye:before{content:\"\\f06e\"}.fa-face-sad-cry:before,.fa-sad-cry:before{content:\"\\f5b3\"}.fa-audio-description:before{content:\"\\f29e\"}.fa-person-military-to-person:before{content:\"\\e54c\"}.fa-file-shield:before{content:\"\\e4f0\"}.fa-user-slash:before{content:\"\\f506\"}.fa-pen:before{content:\"\\f304\"}.fa-tower-observation:before{content:\"\\e586\"}.fa-file-code:before{content:\"\\f1c9\"}.fa-signal-5:before,.fa-signal-perfect:before,.fa-signal:before{content:\"\\f012\"}.fa-bus:before{content:\"\\f207\"}.fa-heart-circle-xmark:before{content:\"\\e501\"}.fa-home-lg:before,.fa-house-chimney:before{content:\"\\e3af\"}.fa-window-maximize:before{content:\"\\f2d0\"}.fa-face-frown:before,.fa-frown:before{content:\"\\f119\"}.fa-prescription:before{content:\"\\f5b1\"}.fa-shop:before,.fa-store-alt:before{content:\"\\f54f\"}.fa-floppy-disk:before,.fa-save:before{content:\"\\f0c7\"}.fa-vihara:before{content:\"\\f6a7\"}.fa-balance-scale-left:before,.fa-scale-unbalanced:before{content:\"\\f515\"}.fa-sort-asc:before,.fa-sort-up:before{content:\"\\f0de\"}.fa-comment-dots:before,.fa-commenting:before{content:\"\\f4ad\"}.fa-plant-wilt:before{content:\"\\e5aa\"}.fa-diamond:before{content:\"\\f219\"}.fa-face-grin-squint:before,.fa-grin-squint:before{content:\"\\f585\"}.fa-hand-holding-dollar:before,.fa-hand-holding-usd:before{content:\"\\f4c0\"}.fa-bacterium:before{content:\"\\e05a\"}.fa-hand-pointer:before{content:\"\\f25a\"}.fa-drum-steelpan:before{content:\"\\f56a\"}.fa-hand-scissors:before{content:\"\\f257\"}.fa-hands-praying:before,.fa-praying-hands:before{content:\"\\f684\"}.fa-arrow-right-rotate:before,.fa-arrow-rotate-forward:before,.fa-arrow-rotate-right:before,.fa-redo:before{content:\"\\f01e\"}.fa-biohazard:before{content:\"\\f780\"}.fa-location-crosshairs:before,.fa-location:before{content:\"\\f601\"}.fa-mars-double:before{content:\"\\f227\"}.fa-child-dress:before{content:\"\\e59c\"}.fa-users-between-lines:before{content:\"\\e591\"}.fa-lungs-virus:before{content:\"\\e067\"}.fa-face-grin-tears:before,.fa-grin-tears:before{content:\"\\f588\"}.fa-phone:before{content:\"\\f095\"}.fa-calendar-times:before,.fa-calendar-xmark:before{content:\"\\f273\"}.fa-child-reaching:before{content:\"\\e59d\"}.fa-head-side-virus:before{content:\"\\e064\"}.fa-user-cog:before,.fa-user-gear:before{content:\"\\f4fe\"}.fa-arrow-up-1-9:before,.fa-sort-numeric-up:before{content:\"\\f163\"}.fa-door-closed:before{content:\"\\f52a\"}.fa-shield-virus:before{content:\"\\e06c\"}.fa-dice-six:before{content:\"\\f526\"}.fa-mosquito-net:before{content:\"\\e52c\"}.fa-bridge-water:before{content:\"\\e4ce\"}.fa-person-booth:before{content:\"\\f756\"}.fa-text-width:before{content:\"\\f035\"}.fa-hat-wizard:before{content:\"\\f6e8\"}.fa-pen-fancy:before{content:\"\\f5ac\"}.fa-digging:before,.fa-person-digging:before{content:\"\\f85e\"}.fa-trash:before{content:\"\\f1f8\"}.fa-gauge-simple-med:before,.fa-gauge-simple:before,.fa-tachometer-average:before{content:\"\\f629\"}.fa-book-medical:before{content:\"\\f7e6\"}.fa-poo:before{content:\"\\f2fe\"}.fa-quote-right-alt:before,.fa-quote-right:before{content:\"\\f10e\"}.fa-shirt:before,.fa-t-shirt:before,.fa-tshirt:before{content:\"\\f553\"}.fa-cubes:before{content:\"\\f1b3\"}.fa-divide:before{content:\"\\f529\"}.fa-tenge-sign:before,.fa-tenge:before{content:\"\\f7d7\"}.fa-headphones:before{content:\"\\f025\"}.fa-hands-holding:before{content:\"\\f4c2\"}.fa-hands-clapping:before{content:\"\\e1a8\"}.fa-republican:before{content:\"\\f75e\"}.fa-arrow-left:before{content:\"\\f060\"}.fa-person-circle-xmark:before{content:\"\\e543\"}.fa-ruler:before{content:\"\\f545\"}.fa-align-left:before{content:\"\\f036\"}.fa-dice-d6:before{content:\"\\f6d1\"}.fa-restroom:before{content:\"\\f7bd\"}.fa-j:before{content:\"J\"}.fa-users-viewfinder:before{content:\"\\e595\"}.fa-file-video:before{content:\"\\f1c8\"}.fa-external-link-alt:before,.fa-up-right-from-square:before{content:\"\\f35d\"}.fa-table-cells:before,.fa-th:before{content:\"\\f00a\"}.fa-file-pdf:before{content:\"\\f1c1\"}.fa-bible:before,.fa-book-bible:before{content:\"\\f647\"}.fa-o:before{content:\"O\"}.fa-medkit:before,.fa-suitcase-medical:before{content:\"\\f0fa\"}.fa-user-secret:before{content:\"\\f21b\"}.fa-otter:before{content:\"\\f700\"}.fa-female:before,.fa-person-dress:before{content:\"\\f182\"}.fa-comment-dollar:before{content:\"\\f651\"}.fa-briefcase-clock:before,.fa-business-time:before{content:\"\\f64a\"}.fa-table-cells-large:before,.fa-th-large:before{content:\"\\f009\"}.fa-book-tanakh:before,.fa-tanakh:before{content:\"\\f827\"}.fa-phone-volume:before,.fa-volume-control-phone:before{content:\"\\f2a0\"}.fa-hat-cowboy-side:before{content:\"\\f8c1\"}.fa-clipboard-user:before{content:\"\\f7f3\"}.fa-child:before{content:\"\\f1ae\"}.fa-lira-sign:before{content:\"\\f195\"}.fa-satellite:before{content:\"\\f7bf\"}.fa-plane-lock:before{content:\"\\e558\"}.fa-tag:before{content:\"\\f02b\"}.fa-comment:before{content:\"\\f075\"}.fa-birthday-cake:before,.fa-cake-candles:before,.fa-cake:before{content:\"\\f1fd\"}.fa-envelope:before{content:\"\\f0e0\"}.fa-angle-double-up:before,.fa-angles-up:before{content:\"\\f102\"}.fa-paperclip:before{content:\"\\f0c6\"}.fa-arrow-right-to-city:before{content:\"\\e4b3\"}.fa-ribbon:before{content:\"\\f4d6\"}.fa-lungs:before{content:\"\\f604\"}.fa-arrow-up-9-1:before,.fa-sort-numeric-up-alt:before{content:\"\\f887\"}.fa-litecoin-sign:before{content:\"\\e1d3\"}.fa-border-none:before{content:\"\\f850\"}.fa-circle-nodes:before{content:\"\\e4e2\"}.fa-parachute-box:before{content:\"\\f4cd\"}.fa-indent:before{content:\"\\f03c\"}.fa-truck-field-un:before{content:\"\\e58e\"}.fa-hourglass-empty:before,.fa-hourglass:before{content:\"\\f254\"}.fa-mountain:before{content:\"\\f6fc\"}.fa-user-doctor:before,.fa-user-md:before{content:\"\\f0f0\"}.fa-circle-info:before,.fa-info-circle:before{content:\"\\f05a\"}.fa-cloud-meatball:before{content:\"\\f73b\"}.fa-camera-alt:before,.fa-camera:before{content:\"\\f030\"}.fa-square-virus:before{content:\"\\e578\"}.fa-meteor:before{content:\"\\f753\"}.fa-car-on:before{content:\"\\e4dd\"}.fa-sleigh:before{content:\"\\f7cc\"}.fa-arrow-down-1-9:before,.fa-sort-numeric-asc:before,.fa-sort-numeric-down:before{content:\"\\f162\"}.fa-hand-holding-droplet:before,.fa-hand-holding-water:before{content:\"\\f4c1\"}.fa-water:before{content:\"\\f773\"}.fa-calendar-check:before{content:\"\\f274\"}.fa-braille:before{content:\"\\f2a1\"}.fa-prescription-bottle-alt:before,.fa-prescription-bottle-medical:before{content:\"\\f486\"}.fa-landmark:before{content:\"\\f66f\"}.fa-truck:before{content:\"\\f0d1\"}.fa-crosshairs:before{content:\"\\f05b\"}.fa-person-cane:before{content:\"\\e53c\"}.fa-tent:before{content:\"\\e57d\"}.fa-vest-patches:before{content:\"\\e086\"}.fa-check-double:before{content:\"\\f560\"}.fa-arrow-down-a-z:before,.fa-sort-alpha-asc:before,.fa-sort-alpha-down:before{content:\"\\f15d\"}.fa-money-bill-wheat:before{content:\"\\e52a\"}.fa-cookie:before{content:\"\\f563\"}.fa-arrow-left-rotate:before,.fa-arrow-rotate-back:before,.fa-arrow-rotate-backward:before,.fa-arrow-rotate-left:before,.fa-undo:before{content:\"\\f0e2\"}.fa-hard-drive:before,.fa-hdd:before{content:\"\\f0a0\"}.fa-face-grin-squint-tears:before,.fa-grin-squint-tears:before{content:\"\\f586\"}.fa-dumbbell:before{content:\"\\f44b\"}.fa-list-alt:before,.fa-rectangle-list:before{content:\"\\f022\"}.fa-tarp-droplet:before{content:\"\\e57c\"}.fa-house-medical-circle-check:before{content:\"\\e511\"}.fa-person-skiing-nordic:before,.fa-skiing-nordic:before{content:\"\\f7ca\"}.fa-calendar-plus:before{content:\"\\f271\"}.fa-plane-arrival:before{content:\"\\f5af\"}.fa-arrow-alt-circle-left:before,.fa-circle-left:before{content:\"\\f359\"}.fa-subway:before,.fa-train-subway:before{content:\"\\f239\"}.fa-chart-gantt:before{content:\"\\e0e4\"}.fa-indian-rupee-sign:before,.fa-indian-rupee:before,.fa-inr:before{content:\"\\e1bc\"}.fa-crop-alt:before,.fa-crop-simple:before{content:\"\\f565\"}.fa-money-bill-1:before,.fa-money-bill-alt:before{content:\"\\f3d1\"}.fa-left-long:before,.fa-long-arrow-alt-left:before{content:\"\\f30a\"}.fa-dna:before{content:\"\\f471\"}.fa-virus-slash:before{content:\"\\e075\"}.fa-minus:before,.fa-subtract:before{content:\"\\f068\"}.fa-chess:before{content:\"\\f439\"}.fa-arrow-left-long:before,.fa-long-arrow-left:before{content:\"\\f177\"}.fa-plug-circle-check:before{content:\"\\e55c\"}.fa-street-view:before{content:\"\\f21d\"}.fa-franc-sign:before{content:\"\\e18f\"}.fa-volume-off:before{content:\"\\f026\"}.fa-american-sign-language-interpreting:before,.fa-asl-interpreting:before,.fa-hands-american-sign-language-interpreting:before,.fa-hands-asl-interpreting:before{content:\"\\f2a3\"}.fa-cog:before,.fa-gear:before{content:\"\\f013\"}.fa-droplet-slash:before,.fa-tint-slash:before{content:\"\\f5c7\"}.fa-mosque:before{content:\"\\f678\"}.fa-mosquito:before{content:\"\\e52b\"}.fa-star-of-david:before{content:\"\\f69a\"}.fa-person-military-rifle:before{content:\"\\e54b\"}.fa-cart-shopping:before,.fa-shopping-cart:before{content:\"\\f07a\"}.fa-vials:before{content:\"\\f493\"}.fa-plug-circle-plus:before{content:\"\\e55f\"}.fa-place-of-worship:before{content:\"\\f67f\"}.fa-grip-vertical:before{content:\"\\f58e\"}.fa-arrow-turn-up:before,.fa-level-up:before{content:\"\\f148\"}.fa-u:before{content:\"U\"}.fa-square-root-alt:before,.fa-square-root-variable:before{content:\"\\f698\"}.fa-clock-four:before,.fa-clock:before{content:\"\\f017\"}.fa-backward-step:before,.fa-step-backward:before{content:\"\\f048\"}.fa-pallet:before{content:\"\\f482\"}.fa-faucet:before{content:\"\\e005\"}.fa-baseball-bat-ball:before{content:\"\\f432\"}.fa-s:before{content:\"S\"}.fa-timeline:before{content:\"\\e29c\"}.fa-keyboard:before{content:\"\\f11c\"}.fa-caret-down:before{content:\"\\f0d7\"}.fa-clinic-medical:before,.fa-house-chimney-medical:before{content:\"\\f7f2\"}.fa-temperature-3:before,.fa-temperature-three-quarters:before,.fa-thermometer-3:before,.fa-thermometer-three-quarters:before{content:\"\\f2c8\"}.fa-mobile-android-alt:before,.fa-mobile-screen:before{content:\"\\f3cf\"}.fa-plane-up:before{content:\"\\e22d\"}.fa-piggy-bank:before{content:\"\\f4d3\"}.fa-battery-3:before,.fa-battery-half:before{content:\"\\f242\"}.fa-mountain-city:before{content:\"\\e52e\"}.fa-coins:before{content:\"\\f51e\"}.fa-khanda:before{content:\"\\f66d\"}.fa-sliders-h:before,.fa-sliders:before{content:\"\\f1de\"}.fa-folder-tree:before{content:\"\\f802\"}.fa-network-wired:before{content:\"\\f6ff\"}.fa-map-pin:before{content:\"\\f276\"}.fa-hamsa:before{content:\"\\f665\"}.fa-cent-sign:before{content:\"\\e3f5\"}.fa-flask:before{content:\"\\f0c3\"}.fa-person-pregnant:before{content:\"\\e31e\"}.fa-wand-sparkles:before{content:\"\\f72b\"}.fa-ellipsis-v:before,.fa-ellipsis-vertical:before{content:\"\\f142\"}.fa-ticket:before{content:\"\\f145\"}.fa-power-off:before{content:\"\\f011\"}.fa-long-arrow-alt-right:before,.fa-right-long:before{content:\"\\f30b\"}.fa-flag-usa:before{content:\"\\f74d\"}.fa-laptop-file:before{content:\"\\e51d\"}.fa-teletype:before,.fa-tty:before{content:\"\\f1e4\"}.fa-diagram-next:before{content:\"\\e476\"}.fa-person-rifle:before{content:\"\\e54e\"}.fa-house-medical-circle-exclamation:before{content:\"\\e512\"}.fa-closed-captioning:before{content:\"\\f20a\"}.fa-hiking:before,.fa-person-hiking:before{content:\"\\f6ec\"}.fa-venus-double:before{content:\"\\f226\"}.fa-images:before{content:\"\\f302\"}.fa-calculator:before{content:\"\\f1ec\"}.fa-people-pulling:before{content:\"\\e535\"}.fa-n:before{content:\"N\"}.fa-cable-car:before,.fa-tram:before{content:\"\\f7da\"}.fa-cloud-rain:before{content:\"\\f73d\"}.fa-building-circle-xmark:before{content:\"\\e4d4\"}.fa-ship:before{content:\"\\f21a\"}.fa-arrows-down-to-line:before{content:\"\\e4b8\"}.fa-download:before{content:\"\\f019\"}.fa-face-grin:before,.fa-grin:before{content:\"\\f580\"}.fa-backspace:before,.fa-delete-left:before{content:\"\\f55a\"}.fa-eye-dropper-empty:before,.fa-eye-dropper:before,.fa-eyedropper:before{content:\"\\f1fb\"}.fa-file-circle-check:before{content:\"\\e5a0\"}.fa-forward:before{content:\"\\f04e\"}.fa-mobile-android:before,.fa-mobile-phone:before,.fa-mobile:before{content:\"\\f3ce\"}.fa-face-meh:before,.fa-meh:before{content:\"\\f11a\"}.fa-align-center:before{content:\"\\f037\"}.fa-book-dead:before,.fa-book-skull:before{content:\"\\f6b7\"}.fa-drivers-license:before,.fa-id-card:before{content:\"\\f2c2\"}.fa-dedent:before,.fa-outdent:before{content:\"\\f03b\"}.fa-heart-circle-exclamation:before{content:\"\\e4fe\"}.fa-home-alt:before,.fa-home-lg-alt:before,.fa-home:before,.fa-house:before{content:\"\\f015\"}.fa-calendar-week:before{content:\"\\f784\"}.fa-laptop-medical:before{content:\"\\f812\"}.fa-b:before{content:\"B\"}.fa-file-medical:before{content:\"\\f477\"}.fa-dice-one:before{content:\"\\f525\"}.fa-kiwi-bird:before{content:\"\\f535\"}.fa-arrow-right-arrow-left:before,.fa-exchange:before{content:\"\\f0ec\"}.fa-redo-alt:before,.fa-rotate-forward:before,.fa-rotate-right:before{content:\"\\f2f9\"}.fa-cutlery:before,.fa-utensils:before{content:\"\\f2e7\"}.fa-arrow-up-wide-short:before,.fa-sort-amount-up:before{content:\"\\f161\"}.fa-mill-sign:before{content:\"\\e1ed\"}.fa-bowl-rice:before{content:\"\\e2eb\"}.fa-skull:before{content:\"\\f54c\"}.fa-broadcast-tower:before,.fa-tower-broadcast:before{content:\"\\f519\"}.fa-truck-pickup:before{content:\"\\f63c\"}.fa-long-arrow-alt-up:before,.fa-up-long:before{content:\"\\f30c\"}.fa-stop:before{content:\"\\f04d\"}.fa-code-merge:before{content:\"\\f387\"}.fa-upload:before{content:\"\\f093\"}.fa-hurricane:before{content:\"\\f751\"}.fa-mound:before{content:\"\\e52d\"}.fa-toilet-portable:before{content:\"\\e583\"}.fa-compact-disc:before{content:\"\\f51f\"}.fa-file-arrow-down:before,.fa-file-download:before{content:\"\\f56d\"}.fa-caravan:before{content:\"\\f8ff\"}.fa-shield-cat:before{content:\"\\e572\"}.fa-bolt:before,.fa-zap:before{content:\"\\f0e7\"}.fa-glass-water:before{content:\"\\e4f4\"}.fa-oil-well:before{content:\"\\e532\"}.fa-vault:before{content:\"\\e2c5\"}.fa-mars:before{content:\"\\f222\"}.fa-toilet:before{content:\"\\f7d8\"}.fa-plane-circle-xmark:before{content:\"\\e557\"}.fa-cny:before,.fa-jpy:before,.fa-rmb:before,.fa-yen-sign:before,.fa-yen:before{content:\"\\f157\"}.fa-rouble:before,.fa-rub:before,.fa-ruble-sign:before,.fa-ruble:before{content:\"\\f158\"}.fa-sun:before{content:\"\\f185\"}.fa-guitar:before{content:\"\\f7a6\"}.fa-face-laugh-wink:before,.fa-laugh-wink:before{content:\"\\f59c\"}.fa-horse-head:before{content:\"\\f7ab\"}.fa-bore-hole:before{content:\"\\e4c3\"}.fa-industry:before{content:\"\\f275\"}.fa-arrow-alt-circle-down:before,.fa-circle-down:before{content:\"\\f358\"}.fa-arrows-turn-to-dots:before{content:\"\\e4c1\"}.fa-florin-sign:before{content:\"\\e184\"}.fa-arrow-down-short-wide:before,.fa-sort-amount-desc:before,.fa-sort-amount-down-alt:before{content:\"\\f884\"}.fa-less-than:before{content:\"<\"}.fa-angle-down:before{content:\"\\f107\"}.fa-car-tunnel:before{content:\"\\e4de\"}.fa-head-side-cough:before{content:\"\\e061\"}.fa-grip-lines:before{content:\"\\f7a4\"}.fa-thumbs-down:before{content:\"\\f165\"}.fa-user-lock:before{content:\"\\f502\"}.fa-arrow-right-long:before,.fa-long-arrow-right:before{content:\"\\f178\"}.fa-anchor-circle-xmark:before{content:\"\\e4ac\"}.fa-ellipsis-h:before,.fa-ellipsis:before{content:\"\\f141\"}.fa-chess-pawn:before{content:\"\\f443\"}.fa-first-aid:before,.fa-kit-medical:before{content:\"\\f479\"}.fa-person-through-window:before{content:\"\\e5a9\"}.fa-toolbox:before{content:\"\\f552\"}.fa-hands-holding-circle:before{content:\"\\e4fb\"}.fa-bug:before{content:\"\\f188\"}.fa-credit-card-alt:before,.fa-credit-card:before{content:\"\\f09d\"}.fa-automobile:before,.fa-car:before{content:\"\\f1b9\"}.fa-hand-holding-hand:before{content:\"\\e4f7\"}.fa-book-open-reader:before,.fa-book-reader:before{content:\"\\f5da\"}.fa-mountain-sun:before{content:\"\\e52f\"}.fa-arrows-left-right-to-line:before{content:\"\\e4ba\"}.fa-dice-d20:before{content:\"\\f6cf\"}.fa-truck-droplet:before{content:\"\\e58c\"}.fa-file-circle-xmark:before{content:\"\\e5a1\"}.fa-temperature-arrow-up:before,.fa-temperature-up:before{content:\"\\e040\"}.fa-medal:before{content:\"\\f5a2\"}.fa-bed:before{content:\"\\f236\"}.fa-h-square:before,.fa-square-h:before{content:\"\\f0fd\"}.fa-podcast:before{content:\"\\f2ce\"}.fa-temperature-4:before,.fa-temperature-full:before,.fa-thermometer-4:before,.fa-thermometer-full:before{content:\"\\f2c7\"}.fa-bell:before{content:\"\\f0f3\"}.fa-superscript:before{content:\"\\f12b\"}.fa-plug-circle-xmark:before{content:\"\\e560\"}.fa-star-of-life:before{content:\"\\f621\"}.fa-phone-slash:before{content:\"\\f3dd\"}.fa-paint-roller:before{content:\"\\f5aa\"}.fa-hands-helping:before,.fa-handshake-angle:before{content:\"\\f4c4\"}.fa-location-dot:before,.fa-map-marker-alt:before{content:\"\\f3c5\"}.fa-file:before{content:\"\\f15b\"}.fa-greater-than:before{content:\">\"}.fa-person-swimming:before,.fa-swimmer:before{content:\"\\f5c4\"}.fa-arrow-down:before{content:\"\\f063\"}.fa-droplet:before,.fa-tint:before{content:\"\\f043\"}.fa-eraser:before{content:\"\\f12d\"}.fa-earth-america:before,.fa-earth-americas:before,.fa-earth:before,.fa-globe-americas:before{content:\"\\f57d\"}.fa-person-burst:before{content:\"\\e53b\"}.fa-dove:before{content:\"\\f4ba\"}.fa-battery-0:before,.fa-battery-empty:before{content:\"\\f244\"}.fa-socks:before{content:\"\\f696\"}.fa-inbox:before{content:\"\\f01c\"}.fa-section:before{content:\"\\e447\"}.fa-gauge-high:before,.fa-tachometer-alt-fast:before,.fa-tachometer-alt:before{content:\"\\f625\"}.fa-envelope-open-text:before{content:\"\\f658\"}.fa-hospital-alt:before,.fa-hospital-wide:before,.fa-hospital:before{content:\"\\f0f8\"}.fa-wine-bottle:before{content:\"\\f72f\"}.fa-chess-rook:before{content:\"\\f447\"}.fa-bars-staggered:before,.fa-reorder:before,.fa-stream:before{content:\"\\f550\"}.fa-dharmachakra:before{content:\"\\f655\"}.fa-hotdog:before{content:\"\\f80f\"}.fa-blind:before,.fa-person-walking-with-cane:before{content:\"\\f29d\"}.fa-drum:before{content:\"\\f569\"}.fa-ice-cream:before{content:\"\\f810\"}.fa-heart-circle-bolt:before{content:\"\\e4fc\"}.fa-fax:before{content:\"\\f1ac\"}.fa-paragraph:before{content:\"\\f1dd\"}.fa-check-to-slot:before,.fa-vote-yea:before{content:\"\\f772\"}.fa-star-half:before{content:\"\\f089\"}.fa-boxes-alt:before,.fa-boxes-stacked:before,.fa-boxes:before{content:\"\\f468\"}.fa-chain:before,.fa-link:before{content:\"\\f0c1\"}.fa-assistive-listening-systems:before,.fa-ear-listen:before{content:\"\\f2a2\"}.fa-tree-city:before{content:\"\\e587\"}.fa-play:before{content:\"\\f04b\"}.fa-font:before{content:\"\\f031\"}.fa-rupiah-sign:before{content:\"\\e23d\"}.fa-magnifying-glass:before,.fa-search:before{content:\"\\f002\"}.fa-ping-pong-paddle-ball:before,.fa-table-tennis-paddle-ball:before,.fa-table-tennis:before{content:\"\\f45d\"}.fa-diagnoses:before,.fa-person-dots-from-line:before{content:\"\\f470\"}.fa-trash-can-arrow-up:before,.fa-trash-restore-alt:before{content:\"\\f82a\"}.fa-naira-sign:before{content:\"\\e1f6\"}.fa-cart-arrow-down:before{content:\"\\f218\"}.fa-walkie-talkie:before{content:\"\\f8ef\"}.fa-file-edit:before,.fa-file-pen:before{content:\"\\f31c\"}.fa-receipt:before{content:\"\\f543\"}.fa-pen-square:before,.fa-pencil-square:before,.fa-square-pen:before{content:\"\\f14b\"}.fa-suitcase-rolling:before{content:\"\\f5c1\"}.fa-person-circle-exclamation:before{content:\"\\e53f\"}.fa-chevron-down:before{content:\"\\f078\"}.fa-battery-5:before,.fa-battery-full:before,.fa-battery:before{content:\"\\f240\"}.fa-skull-crossbones:before{content:\"\\f714\"}.fa-code-compare:before{content:\"\\e13a\"}.fa-list-dots:before,.fa-list-ul:before{content:\"\\f0ca\"}.fa-school-lock:before{content:\"\\e56f\"}.fa-tower-cell:before{content:\"\\e585\"}.fa-down-long:before,.fa-long-arrow-alt-down:before{content:\"\\f309\"}.fa-ranking-star:before{content:\"\\e561\"}.fa-chess-king:before{content:\"\\f43f\"}.fa-person-harassing:before{content:\"\\e549\"}.fa-brazilian-real-sign:before{content:\"\\e46c\"}.fa-landmark-alt:before,.fa-landmark-dome:before{content:\"\\f752\"}.fa-arrow-up:before{content:\"\\f062\"}.fa-television:before,.fa-tv-alt:before,.fa-tv:before{content:\"\\f26c\"}.fa-shrimp:before{content:\"\\e448\"}.fa-list-check:before,.fa-tasks:before{content:\"\\f0ae\"}.fa-jug-detergent:before{content:\"\\e519\"}.fa-circle-user:before,.fa-user-circle:before{content:\"\\f2bd\"}.fa-user-shield:before{content:\"\\f505\"}.fa-wind:before{content:\"\\f72e\"}.fa-car-burst:before,.fa-car-crash:before{content:\"\\f5e1\"}.fa-y:before{content:\"Y\"}.fa-person-snowboarding:before,.fa-snowboarding:before{content:\"\\f7ce\"}.fa-shipping-fast:before,.fa-truck-fast:before{content:\"\\f48b\"}.fa-fish:before{content:\"\\f578\"}.fa-user-graduate:before{content:\"\\f501\"}.fa-adjust:before,.fa-circle-half-stroke:before{content:\"\\f042\"}.fa-clapperboard:before{content:\"\\e131\"}.fa-circle-radiation:before,.fa-radiation-alt:before{content:\"\\f7ba\"}.fa-baseball-ball:before,.fa-baseball:before{content:\"\\f433\"}.fa-jet-fighter-up:before{content:\"\\e518\"}.fa-diagram-project:before,.fa-project-diagram:before{content:\"\\f542\"}.fa-copy:before{content:\"\\f0c5\"}.fa-volume-mute:before,.fa-volume-times:before,.fa-volume-xmark:before{content:\"\\f6a9\"}.fa-hand-sparkles:before{content:\"\\e05d\"}.fa-grip-horizontal:before,.fa-grip:before{content:\"\\f58d\"}.fa-share-from-square:before,.fa-share-square:before{content:\"\\f14d\"}.fa-child-combatant:before,.fa-child-rifle:before{content:\"\\e4e0\"}.fa-gun:before{content:\"\\e19b\"}.fa-phone-square:before,.fa-square-phone:before{content:\"\\f098\"}.fa-add:before,.fa-plus:before{content:\"+\"}.fa-expand:before{content:\"\\f065\"}.fa-computer:before{content:\"\\e4e5\"}.fa-close:before,.fa-multiply:before,.fa-remove:before,.fa-times:before,.fa-xmark:before{content:\"\\f00d\"}.fa-arrows-up-down-left-right:before,.fa-arrows:before{content:\"\\f047\"}.fa-chalkboard-teacher:before,.fa-chalkboard-user:before{content:\"\\f51c\"}.fa-peso-sign:before{content:\"\\e222\"}.fa-building-shield:before{content:\"\\e4d8\"}.fa-baby:before{content:\"\\f77c\"}.fa-users-line:before{content:\"\\e592\"}.fa-quote-left-alt:before,.fa-quote-left:before{content:\"\\f10d\"}.fa-tractor:before{content:\"\\f722\"}.fa-trash-arrow-up:before,.fa-trash-restore:before{content:\"\\f829\"}.fa-arrow-down-up-lock:before{content:\"\\e4b0\"}.fa-lines-leaning:before{content:\"\\e51e\"}.fa-ruler-combined:before{content:\"\\f546\"}.fa-copyright:before{content:\"\\f1f9\"}.fa-equals:before{content:\"=\"}.fa-blender:before{content:\"\\f517\"}.fa-teeth:before{content:\"\\f62e\"}.fa-ils:before,.fa-shekel-sign:before,.fa-shekel:before,.fa-sheqel-sign:before,.fa-sheqel:before{content:\"\\f20b\"}.fa-map:before{content:\"\\f279\"}.fa-rocket:before{content:\"\\f135\"}.fa-photo-film:before,.fa-photo-video:before{content:\"\\f87c\"}.fa-folder-minus:before{content:\"\\f65d\"}.fa-store:before{content:\"\\f54e\"}.fa-arrow-trend-up:before{content:\"\\e098\"}.fa-plug-circle-minus:before{content:\"\\e55e\"}.fa-sign-hanging:before,.fa-sign:before{content:\"\\f4d9\"}.fa-bezier-curve:before{content:\"\\f55b\"}.fa-bell-slash:before{content:\"\\f1f6\"}.fa-tablet-android:before,.fa-tablet:before{content:\"\\f3fb\"}.fa-school-flag:before{content:\"\\e56e\"}.fa-fill:before{content:\"\\f575\"}.fa-angle-up:before{content:\"\\f106\"}.fa-drumstick-bite:before{content:\"\\f6d7\"}.fa-holly-berry:before{content:\"\\f7aa\"}.fa-chevron-left:before{content:\"\\f053\"}.fa-bacteria:before{content:\"\\e059\"}.fa-hand-lizard:before{content:\"\\f258\"}.fa-notdef:before{content:\"\\e1fe\"}.fa-disease:before{content:\"\\f7fa\"}.fa-briefcase-medical:before{content:\"\\f469\"}.fa-genderless:before{content:\"\\f22d\"}.fa-chevron-right:before{content:\"\\f054\"}.fa-retweet:before{content:\"\\f079\"}.fa-car-alt:before,.fa-car-rear:before{content:\"\\f5de\"}.fa-pump-soap:before{content:\"\\e06b\"}.fa-video-slash:before{content:\"\\f4e2\"}.fa-battery-2:before,.fa-battery-quarter:before{content:\"\\f243\"}.fa-radio:before{content:\"\\f8d7\"}.fa-baby-carriage:before,.fa-carriage-baby:before{content:\"\\f77d\"}.fa-traffic-light:before{content:\"\\f637\"}.fa-thermometer:before{content:\"\\f491\"}.fa-vr-cardboard:before{content:\"\\f729\"}.fa-hand-middle-finger:before{content:\"\\f806\"}.fa-percent:before,.fa-percentage:before{content:\"%\"}.fa-truck-moving:before{content:\"\\f4df\"}.fa-glass-water-droplet:before{content:\"\\e4f5\"}.fa-display:before{content:\"\\e163\"}.fa-face-smile:before,.fa-smile:before{content:\"\\f118\"}.fa-thumb-tack:before,.fa-thumbtack:before{content:\"\\f08d\"}.fa-trophy:before{content:\"\\f091\"}.fa-person-praying:before,.fa-pray:before{content:\"\\f683\"}.fa-hammer:before{content:\"\\f6e3\"}.fa-hand-peace:before{content:\"\\f25b\"}.fa-rotate:before,.fa-sync-alt:before{content:\"\\f2f1\"}.fa-spinner:before{content:\"\\f110\"}.fa-robot:before{content:\"\\f544\"}.fa-peace:before{content:\"\\f67c\"}.fa-cogs:before,.fa-gears:before{content:\"\\f085\"}.fa-warehouse:before{content:\"\\f494\"}.fa-arrow-up-right-dots:before{content:\"\\e4b7\"}.fa-splotch:before{content:\"\\f5bc\"}.fa-face-grin-hearts:before,.fa-grin-hearts:before{content:\"\\f584\"}.fa-dice-four:before{content:\"\\f524\"}.fa-sim-card:before{content:\"\\f7c4\"}.fa-transgender-alt:before,.fa-transgender:before{content:\"\\f225\"}.fa-mercury:before{content:\"\\f223\"}.fa-arrow-turn-down:before,.fa-level-down:before{content:\"\\f149\"}.fa-person-falling-burst:before{content:\"\\e547\"}.fa-award:before{content:\"\\f559\"}.fa-ticket-alt:before,.fa-ticket-simple:before{content:\"\\f3ff\"}.fa-building:before{content:\"\\f1ad\"}.fa-angle-double-left:before,.fa-angles-left:before{content:\"\\f100\"}.fa-qrcode:before{content:\"\\f029\"}.fa-clock-rotate-left:before,.fa-history:before{content:\"\\f1da\"}.fa-face-grin-beam-sweat:before,.fa-grin-beam-sweat:before{content:\"\\f583\"}.fa-arrow-right-from-file:before,.fa-file-export:before{content:\"\\f56e\"}.fa-shield-blank:before,.fa-shield:before{content:\"\\f132\"}.fa-arrow-up-short-wide:before,.fa-sort-amount-up-alt:before{content:\"\\f885\"}.fa-house-medical:before{content:\"\\e3b2\"}.fa-golf-ball-tee:before,.fa-golf-ball:before{content:\"\\f450\"}.fa-chevron-circle-left:before,.fa-circle-chevron-left:before{content:\"\\f137\"}.fa-house-chimney-window:before{content:\"\\e00d\"}.fa-pen-nib:before{content:\"\\f5ad\"}.fa-tent-arrow-turn-left:before{content:\"\\e580\"}.fa-tents:before{content:\"\\e582\"}.fa-magic:before,.fa-wand-magic:before{content:\"\\f0d0\"}.fa-dog:before{content:\"\\f6d3\"}.fa-carrot:before{content:\"\\f787\"}.fa-moon:before{content:\"\\f186\"}.fa-wine-glass-alt:before,.fa-wine-glass-empty:before{content:\"\\f5ce\"}.fa-cheese:before{content:\"\\f7ef\"}.fa-yin-yang:before{content:\"\\f6ad\"}.fa-music:before{content:\"\\f001\"}.fa-code-commit:before{content:\"\\f386\"}.fa-temperature-low:before{content:\"\\f76b\"}.fa-biking:before,.fa-person-biking:before{content:\"\\f84a\"}.fa-broom:before{content:\"\\f51a\"}.fa-shield-heart:before{content:\"\\e574\"}.fa-gopuram:before{content:\"\\f664\"}.fa-earth-oceania:before,.fa-globe-oceania:before{content:\"\\e47b\"}.fa-square-xmark:before,.fa-times-square:before,.fa-xmark-square:before{content:\"\\f2d3\"}.fa-hashtag:before{content:\"#\"}.fa-expand-alt:before,.fa-up-right-and-down-left-from-center:before{content:\"\\f424\"}.fa-oil-can:before{content:\"\\f613\"}.fa-t:before{content:\"T\"}.fa-hippo:before{content:\"\\f6ed\"}.fa-chart-column:before{content:\"\\e0e3\"}.fa-infinity:before{content:\"\\f534\"}.fa-vial-circle-check:before{content:\"\\e596\"}.fa-person-arrow-down-to-line:before{content:\"\\e538\"}.fa-voicemail:before{content:\"\\f897\"}.fa-fan:before{content:\"\\f863\"}.fa-person-walking-luggage:before{content:\"\\e554\"}.fa-arrows-alt-v:before,.fa-up-down:before{content:\"\\f338\"}.fa-cloud-moon-rain:before{content:\"\\f73c\"}.fa-calendar:before{content:\"\\f133\"}.fa-trailer:before{content:\"\\e041\"}.fa-bahai:before,.fa-haykal:before{content:\"\\f666\"}.fa-sd-card:before{content:\"\\f7c2\"}.fa-dragon:before{content:\"\\f6d5\"}.fa-shoe-prints:before{content:\"\\f54b\"}.fa-circle-plus:before,.fa-plus-circle:before{content:\"\\f055\"}.fa-face-grin-tongue-wink:before,.fa-grin-tongue-wink:before{content:\"\\f58b\"}.fa-hand-holding:before{content:\"\\f4bd\"}.fa-plug-circle-exclamation:before{content:\"\\e55d\"}.fa-chain-broken:before,.fa-chain-slash:before,.fa-link-slash:before,.fa-unlink:before{content:\"\\f127\"}.fa-clone:before{content:\"\\f24d\"}.fa-person-walking-arrow-loop-left:before{content:\"\\e551\"}.fa-arrow-up-z-a:before,.fa-sort-alpha-up-alt:before{content:\"\\f882\"}.fa-fire-alt:before,.fa-fire-flame-curved:before{content:\"\\f7e4\"}.fa-tornado:before{content:\"\\f76f\"}.fa-file-circle-plus:before{content:\"\\e494\"}.fa-book-quran:before,.fa-quran:before{content:\"\\f687\"}.fa-anchor:before{content:\"\\f13d\"}.fa-border-all:before{content:\"\\f84c\"}.fa-angry:before,.fa-face-angry:before{content:\"\\f556\"}.fa-cookie-bite:before{content:\"\\f564\"}.fa-arrow-trend-down:before{content:\"\\e097\"}.fa-feed:before,.fa-rss:before{content:\"\\f09e\"}.fa-draw-polygon:before{content:\"\\f5ee\"}.fa-balance-scale:before,.fa-scale-balanced:before{content:\"\\f24e\"}.fa-gauge-simple-high:before,.fa-tachometer-fast:before,.fa-tachometer:before{content:\"\\f62a\"}.fa-shower:before{content:\"\\f2cc\"}.fa-desktop-alt:before,.fa-desktop:before{content:\"\\f390\"}.fa-m:before{content:\"M\"}.fa-table-list:before,.fa-th-list:before{content:\"\\f00b\"}.fa-comment-sms:before,.fa-sms:before{content:\"\\f7cd\"}.fa-book:before{content:\"\\f02d\"}.fa-user-plus:before{content:\"\\f234\"}.fa-check:before{content:\"\\f00c\"}.fa-battery-4:before,.fa-battery-three-quarters:before{content:\"\\f241\"}.fa-house-circle-check:before{content:\"\\e509\"}.fa-angle-left:before{content:\"\\f104\"}.fa-diagram-successor:before{content:\"\\e47a\"}.fa-truck-arrow-right:before{content:\"\\e58b\"}.fa-arrows-split-up-and-left:before{content:\"\\e4bc\"}.fa-fist-raised:before,.fa-hand-fist:before{content:\"\\f6de\"}.fa-cloud-moon:before{content:\"\\f6c3\"}.fa-briefcase:before{content:\"\\f0b1\"}.fa-person-falling:before{content:\"\\e546\"}.fa-image-portrait:before,.fa-portrait:before{content:\"\\f3e0\"}.fa-user-tag:before{content:\"\\f507\"}.fa-rug:before{content:\"\\e569\"}.fa-earth-europe:before,.fa-globe-europe:before{content:\"\\f7a2\"}.fa-cart-flatbed-suitcase:before,.fa-luggage-cart:before{content:\"\\f59d\"}.fa-rectangle-times:before,.fa-rectangle-xmark:before,.fa-times-rectangle:before,.fa-window-close:before{content:\"\\f410\"}.fa-baht-sign:before{content:\"\\e0ac\"}.fa-book-open:before{content:\"\\f518\"}.fa-book-journal-whills:before,.fa-journal-whills:before{content:\"\\f66a\"}.fa-handcuffs:before{content:\"\\e4f8\"}.fa-exclamation-triangle:before,.fa-triangle-exclamation:before,.fa-warning:before{content:\"\\f071\"}.fa-database:before{content:\"\\f1c0\"}.fa-mail-forward:before,.fa-share:before{content:\"\\f064\"}.fa-bottle-droplet:before{content:\"\\e4c4\"}.fa-mask-face:before{content:\"\\e1d7\"}.fa-hill-rockslide:before{content:\"\\e508\"}.fa-exchange-alt:before,.fa-right-left:before{content:\"\\f362\"}.fa-paper-plane:before{content:\"\\f1d8\"}.fa-road-circle-exclamation:before{content:\"\\e565\"}.fa-dungeon:before{content:\"\\f6d9\"}.fa-align-right:before{content:\"\\f038\"}.fa-money-bill-1-wave:before,.fa-money-bill-wave-alt:before{content:\"\\f53b\"}.fa-life-ring:before{content:\"\\f1cd\"}.fa-hands:before,.fa-sign-language:before,.fa-signing:before{content:\"\\f2a7\"}.fa-calendar-day:before{content:\"\\f783\"}.fa-ladder-water:before,.fa-swimming-pool:before,.fa-water-ladder:before{content:\"\\f5c5\"}.fa-arrows-up-down:before,.fa-arrows-v:before{content:\"\\f07d\"}.fa-face-grimace:before,.fa-grimace:before{content:\"\\f57f\"}.fa-wheelchair-alt:before,.fa-wheelchair-move:before{content:\"\\e2ce\"}.fa-level-down-alt:before,.fa-turn-down:before{content:\"\\f3be\"}.fa-person-walking-arrow-right:before{content:\"\\e552\"}.fa-envelope-square:before,.fa-square-envelope:before{content:\"\\f199\"}.fa-dice:before{content:\"\\f522\"}.fa-bowling-ball:before{content:\"\\f436\"}.fa-brain:before{content:\"\\f5dc\"}.fa-band-aid:before,.fa-bandage:before{content:\"\\f462\"}.fa-calendar-minus:before{content:\"\\f272\"}.fa-circle-xmark:before,.fa-times-circle:before,.fa-xmark-circle:before{content:\"\\f057\"}.fa-gifts:before{content:\"\\f79c\"}.fa-hotel:before{content:\"\\f594\"}.fa-earth-asia:before,.fa-globe-asia:before{content:\"\\f57e\"}.fa-id-card-alt:before,.fa-id-card-clip:before{content:\"\\f47f\"}.fa-magnifying-glass-plus:before,.fa-search-plus:before{content:\"\\f00e\"}.fa-thumbs-up:before{content:\"\\f164\"}.fa-user-clock:before{content:\"\\f4fd\"}.fa-allergies:before,.fa-hand-dots:before{content:\"\\f461\"}.fa-file-invoice:before{content:\"\\f570\"}.fa-window-minimize:before{content:\"\\f2d1\"}.fa-coffee:before,.fa-mug-saucer:before{content:\"\\f0f4\"}.fa-brush:before{content:\"\\f55d\"}.fa-mask:before{content:\"\\f6fa\"}.fa-magnifying-glass-minus:before,.fa-search-minus:before{content:\"\\f010\"}.fa-ruler-vertical:before{content:\"\\f548\"}.fa-user-alt:before,.fa-user-large:before{content:\"\\f406\"}.fa-train-tram:before{content:\"\\e5b4\"}.fa-user-nurse:before{content:\"\\f82f\"}.fa-syringe:before{content:\"\\f48e\"}.fa-cloud-sun:before{content:\"\\f6c4\"}.fa-stopwatch-20:before{content:\"\\e06f\"}.fa-square-full:before{content:\"\\f45c\"}.fa-magnet:before{content:\"\\f076\"}.fa-jar:before{content:\"\\e516\"}.fa-note-sticky:before,.fa-sticky-note:before{content:\"\\f249\"}.fa-bug-slash:before{content:\"\\e490\"}.fa-arrow-up-from-water-pump:before{content:\"\\e4b6\"}.fa-bone:before{content:\"\\f5d7\"}.fa-user-injured:before{content:\"\\f728\"}.fa-face-sad-tear:before,.fa-sad-tear:before{content:\"\\f5b4\"}.fa-plane:before{content:\"\\f072\"}.fa-tent-arrows-down:before{content:\"\\e581\"}.fa-exclamation:before{content:\"!\"}.fa-arrows-spin:before{content:\"\\e4bb\"}.fa-print:before{content:\"\\f02f\"}.fa-try:before,.fa-turkish-lira-sign:before,.fa-turkish-lira:before{content:\"\\e2bb\"}.fa-dollar-sign:before,.fa-dollar:before,.fa-usd:before{content:\"$\"}.fa-x:before{content:\"X\"}.fa-magnifying-glass-dollar:before,.fa-search-dollar:before{content:\"\\f688\"}.fa-users-cog:before,.fa-users-gear:before{content:\"\\f509\"}.fa-person-military-pointing:before{content:\"\\e54a\"}.fa-bank:before,.fa-building-columns:before,.fa-institution:before,.fa-museum:before,.fa-university:before{content:\"\\f19c\"}.fa-umbrella:before{content:\"\\f0e9\"}.fa-trowel:before{content:\"\\e589\"}.fa-d:before{content:\"D\"}.fa-stapler:before{content:\"\\e5af\"}.fa-masks-theater:before,.fa-theater-masks:before{content:\"\\f630\"}.fa-kip-sign:before{content:\"\\e1c4\"}.fa-hand-point-left:before{content:\"\\f0a5\"}.fa-handshake-alt:before,.fa-handshake-simple:before{content:\"\\f4c6\"}.fa-fighter-jet:before,.fa-jet-fighter:before{content:\"\\f0fb\"}.fa-share-alt-square:before,.fa-square-share-nodes:before{content:\"\\f1e1\"}.fa-barcode:before{content:\"\\f02a\"}.fa-plus-minus:before{content:\"\\e43c\"}.fa-video-camera:before,.fa-video:before{content:\"\\f03d\"}.fa-graduation-cap:before,.fa-mortar-board:before{content:\"\\f19d\"}.fa-hand-holding-medical:before{content:\"\\e05c\"}.fa-person-circle-check:before{content:\"\\e53e\"}.fa-level-up-alt:before,.fa-turn-up:before{content:\"\\f3bf\"}.fa-sr-only,.fa-sr-only-focusable:not(:focus),.sr-only,.sr-only-focusable:not(:focus){position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}:host,:root{--fa-style-family-brands:\"Font Awesome 6 Brands\";--fa-font-brands:normal 400 1em/1 \"Font Awesome 6 Brands\"}@font-face{font-family:\"Font Awesome 6 Brands\";font-style:normal;font-weight:400;font-display:block;src:url(../webfonts/fa-brands-400.woff2) format(\"woff2\"), url(../webfonts/fa-brands-400.ttf) format(\"truetype\")}.fa-brands,.fab{font-weight:400}.fa-monero:before{content:\"\\f3d0\"}.fa-hooli:before{content:\"\\f427\"}.fa-yelp:before{content:\"\\f1e9\"}.fa-cc-visa:before{content:\"\\f1f0\"}.fa-lastfm:before{content:\"\\f202\"}.fa-shopware:before{content:\"\\f5b5\"}.fa-creative-commons-nc:before{content:\"\\f4e8\"}.fa-aws:before{content:\"\\f375\"}.fa-redhat:before{content:\"\\f7bc\"}.fa-yoast:before{content:\"\\f2b1\"}.fa-cloudflare:before{content:\"\\e07d\"}.fa-ups:before{content:\"\\f7e0\"}.fa-pixiv:before{content:\"\\e640\"}.fa-wpexplorer:before{content:\"\\f2de\"}.fa-dyalog:before{content:\"\\f399\"}.fa-bity:before{content:\"\\f37a\"}.fa-stackpath:before{content:\"\\f842\"}.fa-buysellads:before{content:\"\\f20d\"}.fa-first-order:before{content:\"\\f2b0\"}.fa-modx:before{content:\"\\f285\"}.fa-guilded:before{content:\"\\e07e\"}.fa-vnv:before{content:\"\\f40b\"}.fa-js-square:before,.fa-square-js:before{content:\"\\f3b9\"}.fa-microsoft:before{content:\"\\f3ca\"}.fa-qq:before{content:\"\\f1d6\"}.fa-orcid:before{content:\"\\f8d2\"}.fa-java:before{content:\"\\f4e4\"}.fa-invision:before{content:\"\\f7b0\"}.fa-creative-commons-pd-alt:before{content:\"\\f4ed\"}.fa-centercode:before{content:\"\\f380\"}.fa-glide-g:before{content:\"\\f2a6\"}.fa-drupal:before{content:\"\\f1a9\"}.fa-hire-a-helper:before{content:\"\\f3b0\"}.fa-creative-commons-by:before{content:\"\\f4e7\"}.fa-unity:before{content:\"\\e049\"}.fa-whmcs:before{content:\"\\f40d\"}.fa-rocketchat:before{content:\"\\f3e8\"}.fa-vk:before{content:\"\\f189\"}.fa-untappd:before{content:\"\\f405\"}.fa-mailchimp:before{content:\"\\f59e\"}.fa-css3-alt:before{content:\"\\f38b\"}.fa-reddit-square:before,.fa-square-reddit:before{content:\"\\f1a2\"}.fa-vimeo-v:before{content:\"\\f27d\"}.fa-contao:before{content:\"\\f26d\"}.fa-square-font-awesome:before{content:\"\\e5ad\"}.fa-deskpro:before{content:\"\\f38f\"}.fa-brave:before{content:\"\\e63c\"}.fa-sistrix:before{content:\"\\f3ee\"}.fa-instagram-square:before,.fa-square-instagram:before{content:\"\\e055\"}.fa-battle-net:before{content:\"\\f835\"}.fa-the-red-yeti:before{content:\"\\f69d\"}.fa-hacker-news-square:before,.fa-square-hacker-news:before{content:\"\\f3af\"}.fa-edge:before{content:\"\\f282\"}.fa-threads:before{content:\"\\e618\"}.fa-napster:before{content:\"\\f3d2\"}.fa-snapchat-square:before,.fa-square-snapchat:before{content:\"\\f2ad\"}.fa-google-plus-g:before{content:\"\\f0d5\"}.fa-artstation:before{content:\"\\f77a\"}.fa-markdown:before{content:\"\\f60f\"}.fa-sourcetree:before{content:\"\\f7d3\"}.fa-google-plus:before{content:\"\\f2b3\"}.fa-diaspora:before{content:\"\\f791\"}.fa-foursquare:before{content:\"\\f180\"}.fa-stack-overflow:before{content:\"\\f16c\"}.fa-github-alt:before{content:\"\\f113\"}.fa-phoenix-squadron:before{content:\"\\f511\"}.fa-pagelines:before{content:\"\\f18c\"}.fa-algolia:before{content:\"\\f36c\"}.fa-red-river:before{content:\"\\f3e3\"}.fa-creative-commons-sa:before{content:\"\\f4ef\"}.fa-safari:before{content:\"\\f267\"}.fa-google:before{content:\"\\f1a0\"}.fa-font-awesome-alt:before,.fa-square-font-awesome-stroke:before{content:\"\\f35c\"}.fa-atlassian:before{content:\"\\f77b\"}.fa-linkedin-in:before{content:\"\\f0e1\"}.fa-digital-ocean:before{content:\"\\f391\"}.fa-nimblr:before{content:\"\\f5a8\"}.fa-chromecast:before{content:\"\\f838\"}.fa-evernote:before{content:\"\\f839\"}.fa-hacker-news:before{content:\"\\f1d4\"}.fa-creative-commons-sampling:before{content:\"\\f4f0\"}.fa-adversal:before{content:\"\\f36a\"}.fa-creative-commons:before{content:\"\\f25e\"}.fa-watchman-monitoring:before{content:\"\\e087\"}.fa-fonticons:before{content:\"\\f280\"}.fa-weixin:before{content:\"\\f1d7\"}.fa-shirtsinbulk:before{content:\"\\f214\"}.fa-codepen:before{content:\"\\f1cb\"}.fa-git-alt:before{content:\"\\f841\"}.fa-lyft:before{content:\"\\f3c3\"}.fa-rev:before{content:\"\\f5b2\"}.fa-windows:before{content:\"\\f17a\"}.fa-wizards-of-the-coast:before{content:\"\\f730\"}.fa-square-viadeo:before,.fa-viadeo-square:before{content:\"\\f2aa\"}.fa-meetup:before{content:\"\\f2e0\"}.fa-centos:before{content:\"\\f789\"}.fa-adn:before{content:\"\\f170\"}.fa-cloudsmith:before{content:\"\\f384\"}.fa-opensuse:before{content:\"\\e62b\"}.fa-pied-piper-alt:before{content:\"\\f1a8\"}.fa-dribbble-square:before,.fa-square-dribbble:before{content:\"\\f397\"}.fa-codiepie:before{content:\"\\f284\"}.fa-node:before{content:\"\\f419\"}.fa-mix:before{content:\"\\f3cb\"}.fa-steam:before{content:\"\\f1b6\"}.fa-cc-apple-pay:before{content:\"\\f416\"}.fa-scribd:before{content:\"\\f28a\"}.fa-debian:before{content:\"\\e60b\"}.fa-openid:before{content:\"\\f19b\"}.fa-instalod:before{content:\"\\e081\"}.fa-expeditedssl:before{content:\"\\f23e\"}.fa-sellcast:before{content:\"\\f2da\"}.fa-square-twitter:before,.fa-twitter-square:before{content:\"\\f081\"}.fa-r-project:before{content:\"\\f4f7\"}.fa-delicious:before{content:\"\\f1a5\"}.fa-freebsd:before{content:\"\\f3a4\"}.fa-vuejs:before{content:\"\\f41f\"}.fa-accusoft:before{content:\"\\f369\"}.fa-ioxhost:before{content:\"\\f208\"}.fa-fonticons-fi:before{content:\"\\f3a2\"}.fa-app-store:before{content:\"\\f36f\"}.fa-cc-mastercard:before{content:\"\\f1f1\"}.fa-itunes-note:before{content:\"\\f3b5\"}.fa-golang:before{content:\"\\e40f\"}.fa-kickstarter:before{content:\"\\f3bb\"}.fa-grav:before{content:\"\\f2d6\"}.fa-weibo:before{content:\"\\f18a\"}.fa-uncharted:before{content:\"\\e084\"}.fa-firstdraft:before{content:\"\\f3a1\"}.fa-square-youtube:before,.fa-youtube-square:before{content:\"\\f431\"}.fa-wikipedia-w:before{content:\"\\f266\"}.fa-rendact:before,.fa-wpressr:before{content:\"\\f3e4\"}.fa-angellist:before{content:\"\\f209\"}.fa-galactic-republic:before{content:\"\\f50c\"}.fa-nfc-directional:before{content:\"\\e530\"}.fa-skype:before{content:\"\\f17e\"}.fa-joget:before{content:\"\\f3b7\"}.fa-fedora:before{content:\"\\f798\"}.fa-stripe-s:before{content:\"\\f42a\"}.fa-meta:before{content:\"\\e49b\"}.fa-laravel:before{content:\"\\f3bd\"}.fa-hotjar:before{content:\"\\f3b1\"}.fa-bluetooth-b:before{content:\"\\f294\"}.fa-square-letterboxd:before{content:\"\\e62e\"}.fa-sticker-mule:before{content:\"\\f3f7\"}.fa-creative-commons-zero:before{content:\"\\f4f3\"}.fa-hips:before{content:\"\\f452\"}.fa-behance:before{content:\"\\f1b4\"}.fa-reddit:before{content:\"\\f1a1\"}.fa-discord:before{content:\"\\f392\"}.fa-chrome:before{content:\"\\f268\"}.fa-app-store-ios:before{content:\"\\f370\"}.fa-cc-discover:before{content:\"\\f1f2\"}.fa-wpbeginner:before{content:\"\\f297\"}.fa-confluence:before{content:\"\\f78d\"}.fa-shoelace:before{content:\"\\e60c\"}.fa-mdb:before{content:\"\\f8ca\"}.fa-dochub:before{content:\"\\f394\"}.fa-accessible-icon:before{content:\"\\f368\"}.fa-ebay:before{content:\"\\f4f4\"}.fa-amazon:before{content:\"\\f270\"}.fa-unsplash:before{content:\"\\e07c\"}.fa-yarn:before{content:\"\\f7e3\"}.fa-square-steam:before,.fa-steam-square:before{content:\"\\f1b7\"}.fa-500px:before{content:\"\\f26e\"}.fa-square-vimeo:before,.fa-vimeo-square:before{content:\"\\f194\"}.fa-asymmetrik:before{content:\"\\f372\"}.fa-font-awesome-flag:before,.fa-font-awesome-logo-full:before,.fa-font-awesome:before{content:\"\\f2b4\"}.fa-gratipay:before{content:\"\\f184\"}.fa-apple:before{content:\"\\f179\"}.fa-hive:before{content:\"\\e07f\"}.fa-gitkraken:before{content:\"\\f3a6\"}.fa-keybase:before{content:\"\\f4f5\"}.fa-apple-pay:before{content:\"\\f415\"}.fa-padlet:before{content:\"\\e4a0\"}.fa-amazon-pay:before{content:\"\\f42c\"}.fa-github-square:before,.fa-square-github:before{content:\"\\f092\"}.fa-stumbleupon:before{content:\"\\f1a4\"}.fa-fedex:before{content:\"\\f797\"}.fa-phoenix-framework:before{content:\"\\f3dc\"}.fa-shopify:before{content:\"\\e057\"}.fa-neos:before{content:\"\\f612\"}.fa-square-threads:before{content:\"\\e619\"}.fa-hackerrank:before{content:\"\\f5f7\"}.fa-researchgate:before{content:\"\\f4f8\"}.fa-swift:before{content:\"\\f8e1\"}.fa-angular:before{content:\"\\f420\"}.fa-speakap:before{content:\"\\f3f3\"}.fa-angrycreative:before{content:\"\\f36e\"}.fa-y-combinator:before{content:\"\\f23b\"}.fa-empire:before{content:\"\\f1d1\"}.fa-envira:before{content:\"\\f299\"}.fa-google-scholar:before{content:\"\\e63b\"}.fa-gitlab-square:before,.fa-square-gitlab:before{content:\"\\e5ae\"}.fa-studiovinari:before{content:\"\\f3f8\"}.fa-pied-piper:before{content:\"\\f2ae\"}.fa-wordpress:before{content:\"\\f19a\"}.fa-product-hunt:before{content:\"\\f288\"}.fa-firefox:before{content:\"\\f269\"}.fa-linode:before{content:\"\\f2b8\"}.fa-goodreads:before{content:\"\\f3a8\"}.fa-odnoklassniki-square:before,.fa-square-odnoklassniki:before{content:\"\\f264\"}.fa-jsfiddle:before{content:\"\\f1cc\"}.fa-sith:before{content:\"\\f512\"}.fa-themeisle:before{content:\"\\f2b2\"}.fa-page4:before{content:\"\\f3d7\"}.fa-hashnode:before{content:\"\\e499\"}.fa-react:before{content:\"\\f41b\"}.fa-cc-paypal:before{content:\"\\f1f4\"}.fa-squarespace:before{content:\"\\f5be\"}.fa-cc-stripe:before{content:\"\\f1f5\"}.fa-creative-commons-share:before{content:\"\\f4f2\"}.fa-bitcoin:before{content:\"\\f379\"}.fa-keycdn:before{content:\"\\f3ba\"}.fa-opera:before{content:\"\\f26a\"}.fa-itch-io:before{content:\"\\f83a\"}.fa-umbraco:before{content:\"\\f8e8\"}.fa-galactic-senate:before{content:\"\\f50d\"}.fa-ubuntu:before{content:\"\\f7df\"}.fa-draft2digital:before{content:\"\\f396\"}.fa-stripe:before{content:\"\\f429\"}.fa-houzz:before{content:\"\\f27c\"}.fa-gg:before{content:\"\\f260\"}.fa-dhl:before{content:\"\\f790\"}.fa-pinterest-square:before,.fa-square-pinterest:before{content:\"\\f0d3\"}.fa-xing:before{content:\"\\f168\"}.fa-blackberry:before{content:\"\\f37b\"}.fa-creative-commons-pd:before{content:\"\\f4ec\"}.fa-playstation:before{content:\"\\f3df\"}.fa-quinscape:before{content:\"\\f459\"}.fa-less:before{content:\"\\f41d\"}.fa-blogger-b:before{content:\"\\f37d\"}.fa-opencart:before{content:\"\\f23d\"}.fa-vine:before{content:\"\\f1ca\"}.fa-signal-messenger:before{content:\"\\e663\"}.fa-paypal:before{content:\"\\f1ed\"}.fa-gitlab:before{content:\"\\f296\"}.fa-typo3:before{content:\"\\f42b\"}.fa-reddit-alien:before{content:\"\\f281\"}.fa-yahoo:before{content:\"\\f19e\"}.fa-dailymotion:before{content:\"\\e052\"}.fa-affiliatetheme:before{content:\"\\f36b\"}.fa-pied-piper-pp:before{content:\"\\f1a7\"}.fa-bootstrap:before{content:\"\\f836\"}.fa-odnoklassniki:before{content:\"\\f263\"}.fa-nfc-symbol:before{content:\"\\e531\"}.fa-mintbit:before{content:\"\\e62f\"}.fa-ethereum:before{content:\"\\f42e\"}.fa-speaker-deck:before{content:\"\\f83c\"}.fa-creative-commons-nc-eu:before{content:\"\\f4e9\"}.fa-patreon:before{content:\"\\f3d9\"}.fa-avianex:before{content:\"\\f374\"}.fa-ello:before{content:\"\\f5f1\"}.fa-gofore:before{content:\"\\f3a7\"}.fa-bimobject:before{content:\"\\f378\"}.fa-brave-reverse:before{content:\"\\e63d\"}.fa-facebook-f:before{content:\"\\f39e\"}.fa-google-plus-square:before,.fa-square-google-plus:before{content:\"\\f0d4\"}.fa-mandalorian:before{content:\"\\f50f\"}.fa-first-order-alt:before{content:\"\\f50a\"}.fa-osi:before{content:\"\\f41a\"}.fa-google-wallet:before{content:\"\\f1ee\"}.fa-d-and-d-beyond:before{content:\"\\f6ca\"}.fa-periscope:before{content:\"\\f3da\"}.fa-fulcrum:before{content:\"\\f50b\"}.fa-cloudscale:before{content:\"\\f383\"}.fa-forumbee:before{content:\"\\f211\"}.fa-mizuni:before{content:\"\\f3cc\"}.fa-schlix:before{content:\"\\f3ea\"}.fa-square-xing:before,.fa-xing-square:before{content:\"\\f169\"}.fa-bandcamp:before{content:\"\\f2d5\"}.fa-wpforms:before{content:\"\\f298\"}.fa-cloudversify:before{content:\"\\f385\"}.fa-usps:before{content:\"\\f7e1\"}.fa-megaport:before{content:\"\\f5a3\"}.fa-magento:before{content:\"\\f3c4\"}.fa-spotify:before{content:\"\\f1bc\"}.fa-optin-monster:before{content:\"\\f23c\"}.fa-fly:before{content:\"\\f417\"}.fa-aviato:before{content:\"\\f421\"}.fa-itunes:before{content:\"\\f3b4\"}.fa-cuttlefish:before{content:\"\\f38c\"}.fa-blogger:before{content:\"\\f37c\"}.fa-flickr:before{content:\"\\f16e\"}.fa-viber:before{content:\"\\f409\"}.fa-soundcloud:before{content:\"\\f1be\"}.fa-digg:before{content:\"\\f1a6\"}.fa-tencent-weibo:before{content:\"\\f1d5\"}.fa-letterboxd:before{content:\"\\e62d\"}.fa-symfony:before{content:\"\\f83d\"}.fa-maxcdn:before{content:\"\\f136\"}.fa-etsy:before{content:\"\\f2d7\"}.fa-facebook-messenger:before{content:\"\\f39f\"}.fa-audible:before{content:\"\\f373\"}.fa-think-peaks:before{content:\"\\f731\"}.fa-bilibili:before{content:\"\\e3d9\"}.fa-erlang:before{content:\"\\f39d\"}.fa-x-twitter:before{content:\"\\e61b\"}.fa-cotton-bureau:before{content:\"\\f89e\"}.fa-dashcube:before{content:\"\\f210\"}.fa-42-group:before,.fa-innosoft:before{content:\"\\e080\"}.fa-stack-exchange:before{content:\"\\f18d\"}.fa-elementor:before{content:\"\\f430\"}.fa-pied-piper-square:before,.fa-square-pied-piper:before{content:\"\\e01e\"}.fa-creative-commons-nd:before{content:\"\\f4eb\"}.fa-palfed:before{content:\"\\f3d8\"}.fa-superpowers:before{content:\"\\f2dd\"}.fa-resolving:before{content:\"\\f3e7\"}.fa-xbox:before{content:\"\\f412\"}.fa-searchengin:before{content:\"\\f3eb\"}.fa-tiktok:before{content:\"\\e07b\"}.fa-facebook-square:before,.fa-square-facebook:before{content:\"\\f082\"}.fa-renren:before{content:\"\\f18b\"}.fa-linux:before{content:\"\\f17c\"}.fa-glide:before{content:\"\\f2a5\"}.fa-linkedin:before{content:\"\\f08c\"}.fa-hubspot:before{content:\"\\f3b2\"}.fa-deploydog:before{content:\"\\f38e\"}.fa-twitch:before{content:\"\\f1e8\"}.fa-ravelry:before{content:\"\\f2d9\"}.fa-mixer:before{content:\"\\e056\"}.fa-lastfm-square:before,.fa-square-lastfm:before{content:\"\\f203\"}.fa-vimeo:before{content:\"\\f40a\"}.fa-mendeley:before{content:\"\\f7b3\"}.fa-uniregistry:before{content:\"\\f404\"}.fa-figma:before{content:\"\\f799\"}.fa-creative-commons-remix:before{content:\"\\f4ee\"}.fa-cc-amazon-pay:before{content:\"\\f42d\"}.fa-dropbox:before{content:\"\\f16b\"}.fa-instagram:before{content:\"\\f16d\"}.fa-cmplid:before{content:\"\\e360\"}.fa-upwork:before{content:\"\\e641\"}.fa-facebook:before{content:\"\\f09a\"}.fa-gripfire:before{content:\"\\f3ac\"}.fa-jedi-order:before{content:\"\\f50e\"}.fa-uikit:before{content:\"\\f403\"}.fa-fort-awesome-alt:before{content:\"\\f3a3\"}.fa-phabricator:before{content:\"\\f3db\"}.fa-ussunnah:before{content:\"\\f407\"}.fa-earlybirds:before{content:\"\\f39a\"}.fa-trade-federation:before{content:\"\\f513\"}.fa-autoprefixer:before{content:\"\\f41c\"}.fa-whatsapp:before{content:\"\\f232\"}.fa-slideshare:before{content:\"\\f1e7\"}.fa-google-play:before{content:\"\\f3ab\"}.fa-viadeo:before{content:\"\\f2a9\"}.fa-line:before{content:\"\\f3c0\"}.fa-google-drive:before{content:\"\\f3aa\"}.fa-servicestack:before{content:\"\\f3ec\"}.fa-simplybuilt:before{content:\"\\f215\"}.fa-bitbucket:before{content:\"\\f171\"}.fa-imdb:before{content:\"\\f2d8\"}.fa-deezer:before{content:\"\\e077\"}.fa-raspberry-pi:before{content:\"\\f7bb\"}.fa-jira:before{content:\"\\f7b1\"}.fa-docker:before{content:\"\\f395\"}.fa-screenpal:before{content:\"\\e570\"}.fa-bluetooth:before{content:\"\\f293\"}.fa-gitter:before{content:\"\\f426\"}.fa-d-and-d:before{content:\"\\f38d\"}.fa-microblog:before{content:\"\\e01a\"}.fa-cc-diners-club:before{content:\"\\f24c\"}.fa-gg-circle:before{content:\"\\f261\"}.fa-pied-piper-hat:before{content:\"\\f4e5\"}.fa-kickstarter-k:before{content:\"\\f3bc\"}.fa-yandex:before{content:\"\\f413\"}.fa-readme:before{content:\"\\f4d5\"}.fa-html5:before{content:\"\\f13b\"}.fa-sellsy:before{content:\"\\f213\"}.fa-sass:before{content:\"\\f41e\"}.fa-wirsindhandwerk:before,.fa-wsh:before{content:\"\\e2d0\"}.fa-buromobelexperte:before{content:\"\\f37f\"}.fa-salesforce:before{content:\"\\f83b\"}.fa-octopus-deploy:before{content:\"\\e082\"}.fa-medapps:before{content:\"\\f3c6\"}.fa-ns8:before{content:\"\\f3d5\"}.fa-pinterest-p:before{content:\"\\f231\"}.fa-apper:before{content:\"\\f371\"}.fa-fort-awesome:before{content:\"\\f286\"}.fa-waze:before{content:\"\\f83f\"}.fa-cc-jcb:before{content:\"\\f24b\"}.fa-snapchat-ghost:before,.fa-snapchat:before{content:\"\\f2ab\"}.fa-fantasy-flight-games:before{content:\"\\f6dc\"}.fa-rust:before{content:\"\\e07a\"}.fa-wix:before{content:\"\\f5cf\"}.fa-behance-square:before,.fa-square-behance:before{content:\"\\f1b5\"}.fa-supple:before{content:\"\\f3f9\"}.fa-webflow:before{content:\"\\e65c\"}.fa-rebel:before{content:\"\\f1d0\"}.fa-css3:before{content:\"\\f13c\"}.fa-staylinked:before{content:\"\\f3f5\"}.fa-kaggle:before{content:\"\\f5fa\"}.fa-space-awesome:before{content:\"\\e5ac\"}.fa-deviantart:before{content:\"\\f1bd\"}.fa-cpanel:before{content:\"\\f388\"}.fa-goodreads-g:before{content:\"\\f3a9\"}.fa-git-square:before,.fa-square-git:before{content:\"\\f1d2\"}.fa-square-tumblr:before,.fa-tumblr-square:before{content:\"\\f174\"}.fa-trello:before{content:\"\\f181\"}.fa-creative-commons-nc-jp:before{content:\"\\f4ea\"}.fa-get-pocket:before{content:\"\\f265\"}.fa-perbyte:before{content:\"\\e083\"}.fa-grunt:before{content:\"\\f3ad\"}.fa-weebly:before{content:\"\\f5cc\"}.fa-connectdevelop:before{content:\"\\f20e\"}.fa-leanpub:before{content:\"\\f212\"}.fa-black-tie:before{content:\"\\f27e\"}.fa-themeco:before{content:\"\\f5c6\"}.fa-python:before{content:\"\\f3e2\"}.fa-android:before{content:\"\\f17b\"}.fa-bots:before{content:\"\\e340\"}.fa-free-code-camp:before{content:\"\\f2c5\"}.fa-hornbill:before{content:\"\\f592\"}.fa-js:before{content:\"\\f3b8\"}.fa-ideal:before{content:\"\\e013\"}.fa-git:before{content:\"\\f1d3\"}.fa-dev:before{content:\"\\f6cc\"}.fa-sketch:before{content:\"\\f7c6\"}.fa-yandex-international:before{content:\"\\f414\"}.fa-cc-amex:before{content:\"\\f1f3\"}.fa-uber:before{content:\"\\f402\"}.fa-github:before{content:\"\\f09b\"}.fa-php:before{content:\"\\f457\"}.fa-alipay:before{content:\"\\f642\"}.fa-youtube:before{content:\"\\f167\"}.fa-skyatlas:before{content:\"\\f216\"}.fa-firefox-browser:before{content:\"\\e007\"}.fa-replyd:before{content:\"\\f3e6\"}.fa-suse:before{content:\"\\f7d6\"}.fa-jenkins:before{content:\"\\f3b6\"}.fa-twitter:before{content:\"\\f099\"}.fa-rockrms:before{content:\"\\f3e9\"}.fa-pinterest:before{content:\"\\f0d2\"}.fa-buffer:before{content:\"\\f837\"}.fa-npm:before{content:\"\\f3d4\"}.fa-yammer:before{content:\"\\f840\"}.fa-btc:before{content:\"\\f15a\"}.fa-dribbble:before{content:\"\\f17d\"}.fa-stumbleupon-circle:before{content:\"\\f1a3\"}.fa-internet-explorer:before{content:\"\\f26b\"}.fa-stubber:before{content:\"\\e5c7\"}.fa-telegram-plane:before,.fa-telegram:before{content:\"\\f2c6\"}.fa-old-republic:before{content:\"\\f510\"}.fa-odysee:before{content:\"\\e5c6\"}.fa-square-whatsapp:before,.fa-whatsapp-square:before{content:\"\\f40c\"}.fa-node-js:before{content:\"\\f3d3\"}.fa-edge-legacy:before{content:\"\\e078\"}.fa-slack-hash:before,.fa-slack:before{content:\"\\f198\"}.fa-medrt:before{content:\"\\f3c8\"}.fa-usb:before{content:\"\\f287\"}.fa-tumblr:before{content:\"\\f173\"}.fa-vaadin:before{content:\"\\f408\"}.fa-quora:before{content:\"\\f2c4\"}.fa-square-x-twitter:before{content:\"\\e61a\"}.fa-reacteurope:before{content:\"\\f75d\"}.fa-medium-m:before,.fa-medium:before{content:\"\\f23a\"}.fa-amilia:before{content:\"\\f36d\"}.fa-mixcloud:before{content:\"\\f289\"}.fa-flipboard:before{content:\"\\f44d\"}.fa-viacoin:before{content:\"\\f237\"}.fa-critical-role:before{content:\"\\f6c9\"}.fa-sitrox:before{content:\"\\e44a\"}.fa-discourse:before{content:\"\\f393\"}.fa-joomla:before{content:\"\\f1aa\"}.fa-mastodon:before{content:\"\\f4f6\"}.fa-airbnb:before{content:\"\\f834\"}.fa-wolf-pack-battalion:before{content:\"\\f514\"}.fa-buy-n-large:before{content:\"\\f8a6\"}.fa-gulp:before{content:\"\\f3ae\"}.fa-creative-commons-sampling-plus:before{content:\"\\f4f1\"}.fa-strava:before{content:\"\\f428\"}.fa-ember:before{content:\"\\f423\"}.fa-canadian-maple-leaf:before{content:\"\\f785\"}.fa-teamspeak:before{content:\"\\f4f9\"}.fa-pushed:before{content:\"\\f3e1\"}.fa-wordpress-simple:before{content:\"\\f411\"}.fa-nutritionix:before{content:\"\\f3d6\"}.fa-wodu:before{content:\"\\e088\"}.fa-google-pay:before{content:\"\\e079\"}.fa-intercom:before{content:\"\\f7af\"}.fa-zhihu:before{content:\"\\f63f\"}.fa-korvue:before{content:\"\\f42f\"}.fa-pix:before{content:\"\\e43a\"}.fa-steam-symbol:before{content:\"\\f3f6\"}:host,:root{--fa-font-regular:normal 400 1em/1 \"Font Awesome 6 Free\"}@font-face{font-family:\"Font Awesome 6 Free\";font-style:normal;font-weight:400;font-display:block;src:url(../webfonts/fa-regular-400.woff2) format(\"woff2\"), url(../webfonts/fa-regular-400.ttf) format(\"truetype\")}.fa-regular,.far{font-weight:400}:host,:root{--fa-style-family-classic:\"Font Awesome 6 Free\";--fa-font-solid:normal 900 1em/1 \"Font Awesome 6 Free\"}@font-face{font-family:\"Font Awesome 6 Free\";font-style:normal;font-weight:900;font-display:block;src:url(../webfonts/fa-solid-900.woff2) format(\"woff2\"), url(../webfonts/fa-solid-900.ttf) format(\"truetype\")}.fa-solid,.fas{font-weight:900}@font-face{font-family:\"Font Awesome 5 Brands\";font-display:block;font-weight:400;src:url(../webfonts/fa-brands-400.woff2) format(\"woff2\"), url(../webfonts/fa-brands-400.ttf) format(\"truetype\")}@font-face{font-family:\"Font Awesome 5 Free\";font-display:block;font-weight:900;src:url(../webfonts/fa-solid-900.woff2) format(\"woff2\"), url(../webfonts/fa-solid-900.ttf) format(\"truetype\")}@font-face{font-family:\"Font Awesome 5 Free\";font-display:block;font-weight:400;src:url(../webfonts/fa-regular-400.woff2) format(\"woff2\"), url(../webfonts/fa-regular-400.ttf) format(\"truetype\")}@font-face{font-family:\"FontAwesome\";font-display:block;src:url(../webfonts/fa-solid-900.woff2) format(\"woff2\"), url(../webfonts/fa-solid-900.ttf) format(\"truetype\")}@font-face{font-family:\"FontAwesome\";font-display:block;src:url(../webfonts/fa-brands-400.woff2) format(\"woff2\"), url(../webfonts/fa-brands-400.ttf) format(\"truetype\")}@font-face{font-family:\"FontAwesome\";font-display:block;src:url(../webfonts/fa-regular-400.woff2) format(\"woff2\"), url(../webfonts/fa-regular-400.ttf) format(\"truetype\");unicode-range:u+f003, u+f006, u+f014, u+f016-f017, u+f01a-f01b, u+f01d, u+f022, u+f03e, u+f044, u+f046, u+f05c-f05d, u+f06e, u+f070, u+f087-f088, u+f08a, u+f094, u+f096-f097, u+f09d, u+f0a0, u+f0a2, u+f0a4-f0a7, u+f0c5, u+f0c7, u+f0e5-f0e6, u+f0eb, u+f0f6-f0f8, u+f10c, u+f114-f115, u+f118-f11a, u+f11c-f11d, u+f133, u+f147, u+f14e, u+f150-f152, u+f185-f186, u+f18e, u+f190-f192, u+f196, u+f1c1-f1c9, u+f1d9, u+f1db, u+f1e3, u+f1ea, u+f1f7, u+f1f9, u+f20a, u+f247-f248, u+f24a, u+f24d, u+f255-f25b, u+f25d, u+f271-f274, u+f278, u+f27b, u+f28c, u+f28e, u+f29c, u+f2b5, u+f2b7, u+f2ba, u+f2bc, u+f2be, u+f2c0-f2c1, u+f2c3, u+f2d0, u+f2d2, u+f2d4, u+f2dc}@font-face{font-family:\"FontAwesome\";font-display:block;src:url(../webfonts/fa-v4compatibility.woff2) format(\"woff2\"), url(../webfonts/fa-v4compatibility.ttf) format(\"truetype\");unicode-range:u+f041, u+f047, u+f065-f066, u+f07d-f07e, u+f080, u+f08b, u+f08e, u+f090, u+f09a, u+f0ac, u+f0ae, u+f0b2, u+f0d0, u+f0d6, u+f0e4, u+f0ec, u+f10a-f10b, u+f123, u+f13e, u+f148-f149, u+f14c, u+f156, u+f15e, u+f160-f161, u+f163, u+f175-f178, u+f195, u+f1f8, u+f219, u+f27a}:host .gcds-icon{font-family:var(--gcds-icon-font-family);font-size:inherit;line-height:inherit;color:inherit;}:host .gcds-icon.ml-0{margin-inline-start:var(--gcds-icon-margin-0)}:host .gcds-icon.ml-50{margin-inline-start:var(--gcds-icon-margin-50)}:host .gcds-icon.ml-100{margin-inline-start:var(--gcds-icon-margin-100)}:host .gcds-icon.ml-150{margin-inline-start:var(--gcds-icon-margin-150)}:host .gcds-icon.ml-200{margin-inline-start:var(--gcds-icon-margin-200)}:host .gcds-icon.ml-250{margin-inline-start:var(--gcds-icon-margin-250)}:host .gcds-icon.ml-300{margin-inline-start:var(--gcds-icon-margin-300)}:host .gcds-icon.ml-400{margin-inline-start:var(--gcds-icon-margin-400)}:host .gcds-icon.ml-450{margin-inline-start:var(--gcds-icon-margin-450)}:host .gcds-icon.ml-500{margin-inline-start:var(--gcds-icon-margin-500)}:host .gcds-icon.ml-550{margin-inline-start:var(--gcds-icon-margin-550)}:host .gcds-icon.ml-600{margin-inline-start:var(--gcds-icon-margin-600)}:host .gcds-icon.ml-700{margin-inline-start:var(--gcds-icon-margin-700)}:host .gcds-icon.ml-800{margin-inline-start:var(--gcds-icon-margin-800)}:host .gcds-icon.ml-900{margin-inline-start:var(--gcds-icon-margin-900)}:host .gcds-icon.ml-1000{margin-inline-start:var(--gcds-icon-margin-1000)}:host .gcds-icon.mr-0{margin-inline-end:var(--gcds-icon-margin-0)}:host .gcds-icon.mr-50{margin-inline-end:var(--gcds-icon-margin-50)}:host .gcds-icon.mr-100{margin-inline-end:var(--gcds-icon-margin-100)}:host .gcds-icon.mr-150{margin-inline-end:var(--gcds-icon-margin-150)}:host .gcds-icon.mr-200{margin-inline-end:var(--gcds-icon-margin-200)}:host .gcds-icon.mr-250{margin-inline-end:var(--gcds-icon-margin-250)}:host .gcds-icon.mr-300{margin-inline-end:var(--gcds-icon-margin-300)}:host .gcds-icon.mr-400{margin-inline-end:var(--gcds-icon-margin-400)}:host .gcds-icon.mr-450{margin-inline-end:var(--gcds-icon-margin-450)}:host .gcds-icon.mr-500{margin-inline-end:var(--gcds-icon-margin-500)}:host .gcds-icon.mr-550{margin-inline-end:var(--gcds-icon-margin-550)}:host .gcds-icon.mr-600{margin-inline-end:var(--gcds-icon-margin-600)}:host .gcds-icon.mr-700{margin-inline-end:var(--gcds-icon-margin-700)}:host .gcds-icon.mr-800{margin-inline-end:var(--gcds-icon-margin-800)}:host .gcds-icon.mr-900{margin-inline-end:var(--gcds-icon-margin-900)}:host .gcds-icon.mr-1000{margin-inline-end:var(--gcds-icon-margin-1000)}:host .gcds-icon.fixed-width{text-align:center}:host .gcds-icon.size-caption.fixed-width{width:calc(var(--gcds-icon-fixed-width-caption) * 1em)}:host .gcds-icon.size-text.fixed-width{width:calc(var(--gcds-icon-fixed-width-text) * 1em)}:host .gcds-icon.size-h6.fixed-width{width:calc(var(--gcds-icon-fixed-width-h6) * 1em)}:host .gcds-icon.size-h5.fixed-width{width:calc(var(--gcds-icon-fixed-width-h5) * 1em)}:host .gcds-icon.size-h4.fixed-width{width:calc(var(--gcds-icon-fixed-width-h4) * 1em)}:host .gcds-icon.size-h3.fixed-width{width:calc(var(--gcds-icon-fixed-width-h3) * 1em)}:host .gcds-icon.size-h2.fixed-width{width:calc(var(--gcds-icon-fixed-width-h2) * 1em)}:host .gcds-icon.size-h1.fixed-width{width:calc(var(--gcds-icon-fixed-width-h1) * 1em)}:host .gcds-icon.size-caption{font-size:var(--gcds-icon-font-size-caption);line-height:var(--gcds-icon-line-height-caption)}:host .gcds-icon.size-text{font-size:var(--gcds-icon-font-size-text);line-height:var(--gcds-icon-line-height-text)}:host .gcds-icon.size-h6{font-size:var(--gcds-icon-font-size-h6);line-height:var(--gcds-icon-line-height-h6)}:host .gcds-icon.size-h5{font-size:var(--gcds-icon-font-size-h5);line-height:var(--gcds-icon-line-height-h5)}:host .gcds-icon.size-h4{font-size:var(--gcds-icon-font-size-h4);line-height:var(--gcds-icon-line-height-h4)}:host .gcds-icon.size-h3{font-size:var(--gcds-icon-font-size-h3);line-height:var(--gcds-icon-line-height-h3)}:host .gcds-icon.size-h2{font-size:var(--gcds-icon-font-size-h2);line-height:var(--gcds-icon-line-height-h2)}:host .gcds-icon.size-h1{font-size:var(--gcds-icon-font-size-h1);line-height:var(--gcds-icon-line-height-h1)}";
const GcdsIconStyle0 = gcdsIconCss;

const GcdsIcon = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.iconStyle = 'solid';
        this.label = undefined;
        this.marginLeft = undefined;
        this.marginRight = undefined;
        this.name = undefined;
        this.fixedWidth = false;
        this.size = 'text';
    }
    render() {
        const { iconStyle, label, marginLeft, marginRight, name, fixedWidth, size, } = this;
        return (index.h(index.Host, null, index.h("span", { class: `
            gcds-icon fa fa-${iconStyle} fa-${name}
            ${marginLeft ? `ml-${marginLeft}` : ''}
            ${marginRight ? `mr-${marginRight}` : ''}
            ${size ? `size-${size}` : ''}
            ${fixedWidth ? `fixed-width` : ''}
          `, role: "img", "aria-label": label ? label : false, "aria-hidden": label ? 'false' : 'true' })));
    }
    get el() { return index.getElement(this); }
};
GcdsIcon.style = GcdsIconStyle0;

const gcdsInputCss = "@layer reset, default, disabled, error, focus;@layer reset{:host{display:block}:host .gcds-input-wrapper{border:0;margin:0;padding:0}:host .gcds-input-wrapper input{box-sizing:border-box}}@layer default{:host .gcds-input-wrapper{color:var(--gcds-input-default-text);font:var(--gcds-input-font);max-width:75ch;transition:color .15s ease-in-out;width:100%}:host .gcds-input-wrapper input{background-color:var(--gcds-input-default-background);background-image:none;border:var(--gcds-input-border-width) solid;border-radius:var(--gcds-input-border-radius);color:var(--gcds-input-default-text);display:block;font:inherit!important;height:auto;margin:var(--gcds-input-margin)!important;max-width:100%;min-height:var(--gcds-input-min-width-and-height);min-width:var(--gcds-input-min-width-and-height);padding:var(--gcds-input-padding)!important;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out,outline .15s ease-in-out;width:100%}:host .gcds-input-wrapper input[type=number]{-moz-appearance:textfield}:host .gcds-input-wrapper input[type=number]::-webkit-inner-spin-button,:host .gcds-input-wrapper input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none}}@layer disabled{:host .gcds-input-wrapper.gcds-disabled{color:var(--gcds-input-disabled-text)}:host .gcds-input-wrapper.gcds-disabled input:disabled{background-color:var(--gcds-input-disabled-background);border-color:var(--gcds-input-disabled-text);cursor:not-allowed}}@layer error{:host .gcds-input-wrapper input.gcds-error:not(:focus){border-color:var(--gcds-input-danger-border)}}@layer focus{:host .gcds-input-wrapper:focus-within{color:var(--gcds-input-focus-text)}:host .gcds-input-wrapper:focus-within input:focus{border-color:var(--gcds-input-focus-text);box-shadow:var(--gcds-input-focus-box-shadow);outline:var(--gcds-input-outline-width) solid var(--gcds-input-focus-text);outline-offset:var(--gcds-input-border-width)}}";
const GcdsInputStyle0 = gcdsInputCss;

const GcdsInput = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.gcdsFocus = index.createEvent(this, "gcdsFocus", 7);
        this.gcdsBlur = index.createEvent(this, "gcdsBlur", 7);
        this.gcdsInput = index.createEvent(this, "gcdsInput", 7);
        this.gcdsChange = index.createEvent(this, "gcdsChange", 7);
        this.gcdsError = index.createEvent(this, "gcdsError", 7);
        this.gcdsValid = index.createEvent(this, "gcdsValid", 7);
        if (hostRef.$hostElement$["s-ei"]) {
            this.internals = hostRef.$hostElement$["s-ei"];
        }
        else {
            this.internals = hostRef.$hostElement$.attachInternals();
            hostRef.$hostElement$["s-ei"] = this.internals;
        }
        this._validator = defaultValidator;
        this.onBlur = () => {
            if (this.validateOn == 'blur') {
                this.validate();
            }
            this.gcdsBlur.emit();
        };
        this.handleInput = (e, customEvent) => {
            const val = e.target && e.target.value;
            this.value = val;
            this.internals.setFormValue(val ? val : null);
            if (e.type === 'change') {
                const changeEvt = new e.constructor(e.type, e);
                this.el.dispatchEvent(changeEvt);
            }
            customEvent.emit(this.value);
        };
        this.disabled = false;
        this.errorMessage = undefined;
        this.hideLabel = false;
        this.hint = undefined;
        this.inputId = undefined;
        this.name = undefined;
        this.label = undefined;
        this.required = false;
        this.size = undefined;
        this.type = 'text';
        this.value = undefined;
        this.autocomplete = undefined;
        this.validator = undefined;
        this.validateOn = undefined;
        this.inheritedAttributes = {};
        this.hasError = undefined;
        this.lang = undefined;
    }
    validateDisabledInput() {
        if (this.required) {
            this.disabled = false;
        }
    }
    validateErrorMessage() {
        if (this.disabled) {
            this.errorMessage = '';
        }
        else if (!this.hasError && this.errorMessage) {
            this.hasError = true;
        }
        else if (this.errorMessage == '') {
            this.hasError = false;
        }
    }
    validateValidator() {
        if (this.validator && !this.validateOn) {
            this.validateOn = 'blur';
        }
    }
    validateHasError() {
        if (this.disabled) {
            this.hasError = false;
        }
    }
    /**
     * Watch HTML attributes to inherit changes
     */
    ariaInvalidWatcher() {
        this.inheritedAttributes = inheritAttributes(this.el, this.shadowElement, [
            'placeholder',
        ]);
    }
    ariaDescriptiondWatcher() {
        this.inheritedAttributes = inheritAttributes(this.el, this.shadowElement, [
            'placeholder',
        ]);
    }
    /**
     * Call any active validators
     */
    async validate() {
        if (!this._validator.validate(this.value) && this._validator.errorMessage) {
            this.errorMessage = this._validator.errorMessage[this.lang];
            this.gcdsError.emit({
                id: `#${this.inputId}`,
                message: `${this.label} - ${this.errorMessage}`,
            });
        }
        else {
            this.errorMessage = '';
            this.gcdsValid.emit({ id: `#${this.inputId}` });
        }
    }
    submitListener(e) {
        if (e.target == this.el.closest('form')) {
            if (this.validateOn && this.validateOn != 'other') {
                this.validate();
            }
            if (this.hasError) {
                e.preventDefault();
            }
        }
    }
    keyDownListener(e) {
        if (e.target == this.el && e.key === 'Enter') {
            const formButton = document.createElement('button');
            formButton.type = 'submit';
            formButton.style.display = 'none';
            this.el.closest('form').appendChild(formButton);
            formButton.click();
            formButton.remove();
        }
    }
    /*
     * Form internal functions
     */
    formResetCallback() {
        if (this.value != this.initialValue) {
            this.internals.setFormValue(this.initialValue);
            this.value = this.initialValue;
        }
    }
    formStateRestoreCallback(state) {
        this.internals.setFormValue(state);
        this.value = state;
    }
    /*
     * Observe lang attribute change
     */
    updateLang() {
        const observer = new MutationObserver(mutations => {
            if (mutations[0].oldValue != this.el.lang) {
                this.lang = this.el.lang;
            }
        });
        observer.observe(this.el, observerConfig);
    }
    async componentWillLoad() {
        // Define lang attribute
        this.lang = assignLanguage(this.el);
        this.updateLang();
        this.validateDisabledInput();
        this.validateHasError();
        this.validateErrorMessage();
        this.validateValidator();
        // Assign required validator if needed
        requiredValidator(this.el, 'input', this.type);
        if (this.validator) {
            this._validator = getValidator(this.validator);
        }
        this.inheritedAttributes = inheritAttributes(this.el, this.shadowElement, [
            'placeholder',
        ]);
        this.internals.setFormValue(this.value ? this.value : null);
        this.initialValue = this.value ? this.value : null;
    }
    componentWillUpdate() {
        if (this.validator) {
            this._validator = getValidator(this.validator);
        }
    }
    render() {
        const { disabled, errorMessage, hideLabel, hint, inputId, name, label, required, size, type, value, hasError, autocomplete, inheritedAttributes, lang, } = this;
        // Use max-width to keep field responsive
        const style = {
            maxWidth: `calc(${size * 2}ch + (2 * var(--gcds-input-padding)))`,
        };
        const attrsInput = Object.assign({ disabled,
            required,
            type,
            value,
            autocomplete }, inheritedAttributes);
        const attrsLabel = {
            label,
            required,
        };
        if (hint || errorMessage) {
            const hintID = hint ? `hint-${inputId} ` : '';
            const errorID = errorMessage ? `error-message-${inputId} ` : '';
            attrsInput['aria-describedby'] = `${hintID}${errorID}${attrsInput['aria-describedby']
                ? ` ${attrsInput['aria-describedby']}`
                : ''}`;
        }
        return (index.h(index.Host, null, index.h("div", { class: `gcds-input-wrapper ${disabled ? 'gcds-disabled' : ''} ${hasError ? 'gcds-error' : ''}` }, index.h("gcds-label", Object.assign({}, attrsLabel, { "hide-label": hideLabel, "label-for": inputId, lang: lang })), hint ? index.h("gcds-hint", { "hint-id": inputId }, hint) : null, errorMessage ? (index.h("gcds-error-message", { messageId: inputId }, errorMessage)) : null, index.h("input", Object.assign({}, attrsInput, { class: hasError ? 'gcds-error' : null, id: inputId, name: name, onBlur: () => this.onBlur(), onFocus: () => this.gcdsFocus.emit(), onInput: e => this.handleInput(e, this.gcdsInput), onChange: e => this.handleInput(e, this.gcdsChange), "aria-labelledby": `label-for-${inputId}`, "aria-invalid": inheritedAttributes['aria-invalid'] === 'true'
                ? inheritedAttributes['aria-invalid']
                : errorMessage
                    ? 'true'
                    : 'false', size: size, style: size ? style : null, part: "input", ref: element => (this.shadowElement = element) })))));
    }
    static get delegatesFocus() { return true; }
    static get formAssociated() { return true; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "disabled": ["validateDisabledInput"],
        "errorMessage": ["validateErrorMessage"],
        "validator": ["validateValidator"],
        "hasError": ["validateHasError"],
        "aria-invalid": ["ariaInvalidWatcher"],
        "aria-description": ["ariaDescriptiondWatcher"]
    }; }
};
GcdsInput.style = GcdsInputStyle0;

const I18N$c = {
  en: {
    required: 'required',
  },
  fr: {
    required: 'obligatoire',
  },
};

const gcdsLabelCss = "@layer reset, default;@layer reset{.sc-gcds-label-h{display:block}.sc-gcds-label-h .gcds-label{color:inherit}}@layer default{.sc-gcds-label-h .gcds-label{cursor:pointer;display:block;font:var(--gcds-label-font-desktop);margin:var(--gcds-label-margin)!important;max-width:100%}@media only screen and (width < 48em){.sc-gcds-label-h .gcds-label{font:var(--gcds-label-font-mobile)}}.sc-gcds-label-h .gcds-label.label--hidden{height:0;margin:0;opacity:0;overflow:hidden;width:0}.sc-gcds-label-h .gcds-label .label--required{font-weight:var(--gcds-label-required-font-weight);margin:var(--gcds-label-required-margin)!important}}";
const GcdsLabelStyle0 = gcdsLabelCss;

const GcdsLabel = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.onClick = (ev) => {
            if (ev.srcElement.tagName == 'GCDS-LABEL') {
                this.clickEl();
            }
        };
        this.hideLabel = undefined;
        this.label = undefined;
        this.labelFor = undefined;
        this.required = undefined;
        this.lang = undefined;
    }
    /*
     * Observe lang attribute change
     */
    updateLang() {
        const observer = new MutationObserver(mutations => {
            if (mutations[0].oldValue != this.el.lang) {
                this.lang = this.el.lang;
            }
        });
        observer.observe(this.el, observerConfig);
    }
    async componentWillLoad() {
        // Define lang attribute
        this.lang = assignLanguage(this.el);
        this.updateLang();
    }
    /**
     * Click label if host element is clicked
     */
    clickEl() {
        if (this.focusEl) {
            this.focusEl.click();
        }
    }
    render() {
        const { hideLabel, labelFor, label, required, lang } = this;
        return (index.h(index.Host, { id: `label-for-${labelFor}`, onClick: this.onClick }, index.h("label", { htmlFor: labelFor, class: `gcds-label ${hideLabel ? 'label--hidden' : ''}`, ref: focusEl => (this.focusEl = focusEl) }, index.h("span", null, label), required ? (index.h("span", { "aria-hidden": "true", class: "label--required" }, "(", I18N$c[lang].required, ")")) : null)));
    }
    get el() { return index.getElement(this); }
};
GcdsLabel.style = GcdsLabelStyle0;

const I18N$b = {
  en: {
    abbreviation: 'fr',
    heading: 'Language selection',
    language: 'Français',
  },
  fr: {
    abbreviation: 'en',
    heading: 'Sélection de la langue',
    language: 'English',
  },
};

const gcdsLangToggleCss = "@layer reset, default, desktop;@layer reset{:host{display:block}:host .gcds-lang-toggle h2{margin:0;overflow:hidden;position:absolute;width:0}}@layer default{:host .gcds-lang-toggle gcds-link::part(link){padding:var(--gcds-lang-toggle-padding)}:host .gcds-lang-toggle span{display:none}:host .gcds-lang-toggle abbr{text-decoration:none;text-transform:uppercase}}@layer desktop{@media screen and (width >= 64em){:host .gcds-lang-toggle gcds-link::part(link){padding:0}:host .gcds-lang-toggle span{display:initial}:host .gcds-lang-toggle abbr{display:none}}}";
const GcdsLangToggleStyle0 = gcdsLangToggleCss;

const GcdsLangToggle = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.href = undefined;
        this.lang = undefined;
    }
    /*
     * Observe lang attribute change
     */
    updateLang() {
        const observer = new MutationObserver(mutations => {
            if (mutations[0].oldValue != this.el.lang) {
                this.lang = this.el.lang;
            }
        });
        observer.observe(this.el, observerConfig);
    }
    async componentWillLoad() {
        // Define lang attribute
        this.lang = assignLanguage(this.el);
        this.updateLang();
    }
    render() {
        const { lang, href } = this;
        return (index.h(index.Host, null, index.h("div", { class: "gcds-lang-toggle" }, index.h("gcds-sr-only", { id: "lang-toggle__heading", tag: "h2" }, I18N$b[lang].heading), index.h("gcds-link", { size: "regular", href: href, lang: I18N$b[lang].abbreviation }, index.h("span", null, I18N$b[lang].language), index.h("abbr", { title: I18N$b[lang].language }, I18N$b[lang].abbreviation)))));
    }
    get el() { return index.getElement(this); }
};
GcdsLangToggle.style = GcdsLangToggleStyle0;

const I18N$a = {
  en: {
    external: ' (Opens destination in a new tab.)',
    phone: ' (Attempts to open a phone app.)',
    download: ' (Attempts to download a file to the device.)',
    email: ' (Opens new message in email program.)',
  },
  fr: {
    external: " (Ouvre l'emplacement dans un nouvel onglet.)",
    phone: " (Tente d'ouvrir une application de téléphonie.)",
    download: " (Tente de télécharger un fichier sur l'appareil.)",
    email: ' (Ouvre un nouveau message dans le logiciel de messagerie.)',
  },
};

const gcdsLinkCss = "@layer reset, default, display, size, variant, hover, visited, focus;@layer reset{:host{display:inline-block}:host slot{display:initial}}@layer default{:host .gcds-link{color:var(--gcds-link-default);cursor:pointer;text-decoration-color:currentColor;text-decoration-style:solid;text-decoration-thickness:var(--gcds-link-decoration-thickness);text-underline-offset:var(--gcds-link-underline-offset);transition:all .35s}}@layer display{:host .gcds-link.d-block{display:block}}@layer size{:host .gcds-link.link--small{font:var(--gcds-link-font-small-desktop)}@media only screen and (width < 48em){:host .gcds-link.link--small{font:var(--gcds-link-font-small-mobile)}}:host .gcds-link.link--regular{font:var(--gcds-link-font-regular-desktop)}@media only screen and (width < 48em){:host .gcds-link.link--regular{font:var(--gcds-link-font-regular-mobile)}}:host .gcds-link.link--inherit{font:inherit}}@layer variant{:host .gcds-link.variant-light{color:var(--gcds-link-light)}}@layer hover{@media (hover:hover){:host .gcds-link:hover{text-decoration-thickness:var(--gcds-link-hover-decoration-thickness)}:host .gcds-link:hover:not(.variant-light){color:var(--gcds-link-hover)}}}@layer visited{:host .gcds-link:not(.variant-light):visited{color:var(--gcds-link-visited)}}@layer focus{:host .gcds-link:focus{background-color:var(--gcds-link-focus-background);border-radius:var(--gcds-link-focus-border-radius);box-shadow:var(--gcds-link-focus-box-shadow);color:var(--gcds-link-focus-text);outline:var(--gcds-link-focus-outline-width) solid var(--gcds-link-focus-background);outline-offset:var(--gcds-link-focus-outline-offset);text-decoration:none}}";
const GcdsLinkStyle0 = gcdsLinkCss;

const GcdsLink = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.gcdsFocus = index.createEvent(this, "gcdsFocus", 7);
        this.gcdsBlur = index.createEvent(this, "gcdsBlur", 7);
        this.gcdsClick = index.createEvent(this, "gcdsClick", 7);
        this.variant = 'default';
        this.size = 'inherit';
        this.display = 'inline';
        this.href = undefined;
        this.rel = undefined;
        this.target = '_self';
        this.external = false;
        this.download = undefined;
        this.type = undefined;
        this.inheritedAttributes = {};
        this.lang = undefined;
    }
    validateVariant(newValue) {
        const values = ['default', 'light'];
        if (!values.includes(newValue)) {
            this.variant = 'default';
        }
    }
    validateSize(newValue) {
        const values = ['regular', 'small', 'inherit'];
        if (!values.includes(newValue)) {
            this.size = 'inherit';
        }
    }
    validateDisplay(newValue) {
        const values = ['block', 'inline'];
        if (!values.includes(newValue)) {
            this.display = 'inline';
        }
    }
    /*
     * Observe lang attribute change
     */
    updateLang() {
        const observer = new MutationObserver(mutations => {
            if (mutations[0].oldValue != this.el.lang) {
                this.lang = this.el.lang;
            }
        });
        observer.observe(this.el, observerConfig);
    }
    componentWillLoad() {
        // Validate attributes and set defaults
        this.validateVariant(this.variant);
        this.validateSize(this.size);
        this.validateDisplay(this.display);
        this.inheritedAttributes = inheritAttributes(this.el, this.shadowElement, [
            'referrerpolicy',
        ]);
        // Define lang attribute
        this.lang = assignLanguage(this.el);
        this.updateLang();
    }
    render() {
        const { size, lang, display, href, rel, target, external, download, type, inheritedAttributes, variant, } = this;
        const attrs = {
            href,
            rel,
            target,
            download,
            type,
        };
        const isExternal = target === '_blank' || external;
        return (index.h(index.Host, null, index.h("a", Object.assign({ role: "link", tabIndex: 0 }, attrs, { class: `gcds-link link--${size} ${display != 'inline' ? `d-${display}` : ''} ${variant != 'default' ? `variant-${variant}` : ''}`, ref: element => (this.shadowElement = element), target: isExternal ? '_blank' : target, rel: isExternal ? 'noopener noreferrer' : rel }, inheritedAttributes, { part: "link", onBlur: () => this.gcdsBlur.emit(), onFocus: () => this.gcdsFocus.emit(), onClick: e => emitEvent(e, this.gcdsClick, href) }), index.h("slot", null), target === '_blank' || external ? (index.h("gcds-icon", { name: "external-link", label: I18N$a[lang].external, "margin-left": "100" })) : download !== undefined ? (index.h("gcds-icon", { name: "download", label: I18N$a[lang].download, "margin-left": "100" })) : href && href.toLowerCase().startsWith('mailto:') ? (index.h("gcds-icon", { "icon-style": "regular", name: "envelope", label: I18N$a[lang].email, "margin-left": "100" })) : (href &&
            href.toLowerCase().startsWith('tel:') && (index.h("gcds-icon", { name: "phone", label: I18N$a[lang].phone, "margin-left": "100" }))))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "variant": ["validateVariant"],
        "size": ["validateSize"],
        "display": ["validateDisplay"]
    }; }
};
GcdsLink.style = GcdsLinkStyle0;

const gcdsNavGroupCss = "@layer reset, defaults, sideNav, topNav, mobileNav, desktop, mobile, hover, focus;@layer reset{:host *{box-sizing:border-box;margin:0;padding:0}}@layer defaults{:host{align-self:flex-end;display:flex;flex-direction:column;position:relative}:host .gcds-nav-group__trigger{align-items:center;background:transparent;border:0;color:var(--gcds-nav-group-trigger-text);cursor:pointer;display:flex;font:var(--gcds-nav-group-trigger-font);padding:var(--gcds-nav-group-trigger-padding);text-align:left;width:100%}:host .gcds-nav-group__trigger[aria-expanded=false]+.gcds-nav-group__list{display:none}:host .gcds-nav-group__trigger-desc{display:none}:host ul{list-style:none}}@layer sideNav{:host .gcds-trigger--expandable{font-weight:var(--gcds-nav-group-side-nav-trigger-font-weight);margin-block-end:var(--gcds-nav-group-side-nav-trigger-margin)}:host .gcds-trigger--expandable gcds-icon{margin-inline-end:var(--gcds-nav-group-side-nav-trigger-icon-margin)}}@layer topNav{:host .gcds-trigger--dropdown{border-block-end:var(--gcds-nav-group-top-nav-trigger-border-width) solid transparent;margin-inline-start:var(\n      --gcds-nav-group-top-nav-trigger-margin-inline-start\n    );padding:var(--gcds-nav-group-top-nav-trigger-padding);text-decoration:underline solid currentColor var(--gcds-nav-group-top-nav-trigger-decoration-thickness);text-decoration-color:transparent;text-underline-offset:var(\n      --gcds-nav-group-top-nav-trigger-underline-offset\n    );transition:all .25s ease-in-out}:host .gcds-trigger--dropdown[aria-expanded=true]{background-color:var(\n        --gcds-nav-group-top-nav-trigger-expanded-background-color\n      )}:host .gcds-trigger--dropdown gcds-icon{margin-inline-start:var(--gcds-nav-group-top-nav-trigger-icon-margin);order:2}}@layer mobileNav{:host(.gcds-mobile-nav){width:100%}:host(.gcds-mobile-nav) .gcds-trigger--expandable{border:var(--gcds-nav-group-mobile-trigger-border-width) solid;border-radius:var(--gcds-nav-group-mobile-trigger-border-radius);color:var(--gcds-nav-group-mobile-trigger-text);flex-direction:row-reverse;justify-content:center;margin-block-start:var(--gcds-nav-group-mobile-trigger-margin);text-align:center}:host(.gcds-mobile-nav) .gcds-trigger--expandable gcds-icon{display:none}:host([open].gcds-mobile-nav){background-color:var(--gcds-nav-group-mobile-background);height:100vh;left:0;overflow-y:scroll;padding:var(--gcds-nav-group-mobile-padding);position:fixed;top:0;width:100%;z-index:100}}@layer desktop{@media only screen and (width >= 64em){:host .gcds-nav-group__trigger{max-width:var(--gcds-nav-group-trigger-max-width)}:host .gcds-nav--expandable{padding-inline-start:var(--gcds-nav-group-side-nav-dropdown-padding)}:host .gcds-nav--dropdown{background-color:var(--gcds-nav-group-top-nav-dropdown-background);border-radius:var(--gcds-border-radius-md);box-shadow:var(--gcds-nav-group-top-nav-dropdown-box-shadow);margin-block-start:var(--gcds-spacing-200);padding:var(--gcds-nav-group-top-nav-dropdown-padding);position:absolute;top:100%;width:var(--gcds-nav-group-top-nav-dropdown-width);z-index:1}:host(.gcds-mobile-nav)>.gcds-nav--expandable{display:block;padding:0}:host(.gcds-mobile-nav) .gcds-trigger--expandable{display:none}:host(.gcds-mobile-nav-topnav)>.gcds-nav--expandable{display:flex}}@media only screen and (width >= 64em) and (width < 96em){:host .gcds-nav--dropdown{right:0}}}@layer mobile{@media only screen and (width < 64em){:host(.gcds-mobile-nav)>.gcds-nav--expandable{margin:var(--gcds-nav-group-mobile-list-margin)}:host([open]:not(.gcds-mobile-nav)) .gcds-nav-group__list{padding-inline-start:var(--gcds-nav-group-side-nav-dropdown-padding)}}@media only screen and (48em < width < 64em){:host(.gcds-mobile-nav) .gcds-trigger--expandable{align-self:flex-start;width:auto}}}@layer hover{@media (hover:hover){:host .gcds-nav-group__trigger:hover{color:var(--gcds-nav-group-trigger-hover-text)}:host .gcds-trigger--dropdown:hover{color:var(--gcds-nav-group-top-nav-trigger-hover-text);text-decoration-color:var(--gcds-nav-group-top-nav-trigger-hover-text);text-decoration-thickness:var(\n          --gcds-nav-group-top-nav-trigger-hover-decoration-thickness\n        )}:host .gcds-trigger--expandable:hover{background-color:var(\n          --gcds-nav-group-side-nav-trigger-hover-background\n        )}}}@layer focus{:host .gcds-nav-group__trigger:focus{background-color:var(--gcds-nav-group-trigger-focus-background);border-color:var(--gcds-nav-group-trigger-focus-background);border-radius:var(--gcds-nav-group-trigger-focus-border-radius);box-shadow:var(--gcds-nav-group-trigger-focus-box-shadow);color:var(--gcds-nav-group-trigger-focus-text);outline:var(--gcds-nav-group-trigger-focus-outline);outline-offset:var(--gcds-nav-group-trigger-focus-outline-offset);text-decoration:none}}";
const GcdsNavGroupStyle0 = gcdsNavGroupCss;

const GcdsNavGroup = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.gcdsClick = index.createEvent(this, "gcdsClick", 7);
        this.gcdsFocus = index.createEvent(this, "gcdsFocus", 7);
        this.gcdsBlur = index.createEvent(this, "gcdsBlur", 7);
        this.closeTrigger = undefined;
        this.menuLabel = undefined;
        this.openTrigger = undefined;
        this.open = false;
        this.lang = undefined;
        this.navStyle = undefined;
    }
    async focusOutListener(e) {
        if ((e.target === this.el || this.el.contains(e.target)) &&
            !this.el.contains(e.relatedTarget) &&
            this.navStyle === 'dropdown' &&
            this.open) {
            setTimeout(() => this.toggleNav(), 200);
        }
    }
    /**
     * Focus button element
     */
    async focusTrigger() {
        this.triggerElement.focus();
    }
    /**
     * Toggle the nav open or closed
     */
    async toggleNav() {
        this.open = !this.open;
        // Close any child nav-groups
        for (let i = 0; i < this.el.children.length; i++) {
            if (this.el.children[i].nodeName == 'GCDS-NAV-GROUP' &&
                this.el.children[i].hasAttribute('open')) {
                this.el.children[i].toggleNav();
            }
        }
    }
    /*
     * Observe lang attribute change
     */
    updateLang() {
        const observer = new MutationObserver(mutations => {
            if (mutations[0].oldValue != this.el.lang) {
                this.lang = this.el.lang;
            }
        });
        observer.observe(this.el, observerConfig);
    }
    async componentWillLoad() {
        // Define lang attribute
        this.lang = assignLanguage(this.el);
        this.updateLang();
        if (this.el.parentNode.nodeName == 'GCDS-TOP-NAV') {
            this.navStyle = 'dropdown';
            if (this.open) {
                this.open = false;
            }
        }
        else {
            this.navStyle = 'expandable';
        }
        if (this.el.parentNode.nodeName == 'GCDS-NAV-GROUP' &&
            !this.el.parentNode.classList.contains('gcds-mobile-nav') &&
            this.el.closest('gcds-top-nav')) {
            this.el.remove();
        }
    }
    render() {
        const { closeTrigger, menuLabel, open, openTrigger } = this;
        return (index.h(index.Host, { role: "listitem", open: open }, index.h("button", { "aria-haspopup": "true", "aria-expanded": open.toString(), ref: element => (this.triggerElement = element), class: `gcds-nav-group__trigger gcds-trigger--${this.navStyle}`, onBlur: () => this.gcdsBlur.emit(), onFocus: () => this.gcdsFocus.emit(), onClick: e => {
                const event = emitEvent(e, this.gcdsClick);
                if (event) {
                    this.toggleNav();
                }
            } }, index.h("gcds-icon", { name: open ? 'angle-up' : 'angle-down' }), closeTrigger && open ? closeTrigger : openTrigger), index.h("ul", { "aria-label": menuLabel, class: `gcds-nav-group__list gcds-nav--${this.navStyle}` }, index.h("slot", null))));
    }
    get el() { return index.getElement(this); }
};
GcdsNavGroup.style = GcdsNavGroupStyle0;

const gcdsNavLinkCss = "@layer reset, default, variants, hover, active, focus;@layer reset{:host .gcds-nav-link{box-sizing:border-box}:host .gcds-nav-link slot{display:initial}}@layer default{:host .gcds-nav-link{border-inline:var(--gcds-nav-link-border-width) solid transparent;color:var(--gcds-nav-link-default-text);display:flex;font:var(---gcds-nav-link-font);margin-block-end:var(--gcds-nav-link-margin);padding:var(--gcds-nav-link-padding);text-decoration-color:currentColor;text-decoration-line:underline;text-decoration-style:solid;text-decoration-thickness:var(--gcds-nav-link-default-decoration-thickness);text-underline-offset:var(--gcds-nav-link-default-underline-offset);transition:all .25s ease-in-out}@media only screen and (width < 64em){:host .gcds-nav-link{min-width:50%}}@media only screen and (width > 48em){:host .gcds-nav-link{max-width:var(--gcds-nav-link-default-max-width)}}:host .gcds-nav-link[aria-current=page]{pointer-events:none;text-decoration:none}}@layer variants{@media only screen and (width >= 64em){:host>.gcds-nav-link--topnav.gcds-nav-link{border-block-end:var(--gcds-nav-link-border-width) solid transparent;border-inline:0;color:var(--gcds-nav-link-top-nav-text);margin:var(--gcds-nav-link-top-nav-margin);padding:var(--gcds-nav-link-top-nav-padding)}:host>.gcds-nav-link--topnav.gcds-nav-link:not(:hover){text-decoration-color:transparent}:host([slot=home])>.gcds-nav-link{font:var(--gcds-nav-link-top-nav-home-font);padding:var(--gcds-nav-link-top-nav-home-padding)}}:host>.gcds-nav-link--sidenav.gcds-nav-link{padding:var(--gcds-nav-link-side-nav-padding)}}@layer hover{@media (hover:hover){:host .gcds-nav-link:hover{color:var(--gcds-nav-link-hover-text);text-decoration-thickness:var(\n        --gcds-nav-link-hover-decoration-thickness\n      )}:host>.gcds-nav-link--dropdown.gcds-nav-link:hover,:host>.gcds-nav-link--sidenav.gcds-nav-link:hover{color:var(--gcds-nav-link-hover-text)}:host>.gcds-nav-link--sidenav.gcds-nav-link:hover{background-color:var(--gcds-nav-link-side-nav-hover-background)}:host>.gcds-nav-link--dropdown.gcds-nav-link:hover{background-color:var(--gcds-nav-link-top-nav-hover-background)}}}@layer active{:host .gcds-nav-link[aria-current=page]{background-color:var(--gcds-nav-link-active-background);border-inline-start-color:var(--gcds-nav-link-active-border-color);color:var(--gcds-nav-link-active-text);font-weight:var(--gcds-nav-link-active-font-weight)}@media only screen and (width >= 64em){:host>.gcds-nav-link--topnav.gcds-nav-link[aria-current=page]{background-color:transparent;border-block-end-color:var(--gcds-nav-link-active-border-color);color:var(--gcds-nav-link-top-nav-text);font:var(--gcds-nav-link-font)}}}@layer focus{:host .gcds-nav-link:focus{background-color:var(--gcds-nav-link-focus-background);border-color:var(--gcds-nav-link-focus-background);border-radius:var(--gcds-nav-link-focus-border-radius);box-shadow:var(--gcds-nav-link-focus-box-shadow);color:var(--gcds-nav-link-focus-text);outline:var(--gcds-nav-link-focus-outline);outline-offset:var(--gcds-nav-link-focus-outline-offset);text-decoration:none}}";
const GcdsNavLinkStyle0 = gcdsNavLinkCss;

const GcdsNavLink = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.gcdsClick = index.createEvent(this, "gcdsClick", 7);
        this.gcdsFocus = index.createEvent(this, "gcdsFocus", 7);
        this.gcdsBlur = index.createEvent(this, "gcdsBlur", 7);
        this.href = undefined;
        this.current = undefined;
        this.lang = undefined;
        this.navStyle = undefined;
    }
    /**
     * Focus the link element
     */
    async focusLink() {
        this.linkElement.focus();
    }
    /*
     * Observe lang attribute change
     */
    updateLang() {
        const observer = new MutationObserver(mutations => {
            if (mutations[0].oldValue != this.el.lang) {
                this.lang = this.el.lang;
            }
        });
        observer.observe(this.el, observerConfig);
    }
    async componentWillLoad() {
        // Define lang attribute
        this.lang = assignLanguage(this.el);
        this.updateLang();
        if (this.el.closest('gcds-top-nav')) {
            if (this.el.parentNode.nodeName == 'GCDS-TOP-NAV') {
                this.navStyle = 'topnav';
            }
            else {
                this.navStyle = 'dropdown';
            }
        }
        else {
            this.navStyle = 'sidenav';
        }
    }
    render() {
        const { current, href } = this;
        const linkAttrs = {};
        if (current) {
            linkAttrs['aria-current'] = 'page';
        }
        return (index.h(index.Host, { role: "listitem" }, index.h("a", Object.assign({ class: `gcds-nav-link gcds-nav-link--${this.navStyle}`, href: href }, linkAttrs, { onBlur: () => this.gcdsBlur.emit(), onFocus: () => this.gcdsFocus.emit(), onClick: e => emitEvent(e, this.gcdsClick, href), ref: element => (this.linkElement = element) }), index.h("slot", null))));
    }
    get el() { return index.getElement(this); }
};
GcdsNavLink.style = GcdsNavLinkStyle0;

const I18N$9 = {
  en: {
    next: 'Next',
    previous: 'Previous',
    previousMobile: 'Prev',
    nextPage: 'Next page',
    previousPage: 'Previous page',
    pageNumber: 'Page {#}',
    pageNumberOf: 'Page {#} of {total} of {label}',
  },
  fr: {
    next: 'Suivante',
    previous: 'Précédent',
    previousMobile: 'Préc.',
    nextPage: 'Page suivante',
    previousPage: 'Page précédente',
    pageNumber: 'Page {#}',
    pageNumberOf: 'Page {#} sur {total} des {label}',
  },
};

/**
 * Function to constuct href attribute from url object
 * Also looks for ::offset and ::match to increment query string values
 */
function constructHref(url, page, end) {
    let fragment = '';
    let qs = '';
    let count = 0;
    for (const key in url.queryStrings) {
        let queryKey = key;
        let queryValue = url.queryStrings[key];
        if (key.includes('::')) {
            const incrementer = key.split('::')[1];
            const regExp = /\{\{([^)]+)\}\}/;
            const matches = regExp.exec(url.queryStrings[key]);
            // Offeset numbers
            if (incrementer == 'offset') {
                let pageNumber = page;
                if (end == 'next') {
                    ++pageNumber;
                }
                else if (end == 'previous') {
                    --pageNumber;
                }
                queryValue = matches
                    ? url.queryStrings[key].replace(`{{${matches[1]}}}`, `${(pageNumber - 1) * Number(matches[1])}`)
                    : (pageNumber - 1) * url.queryStrings[key];
                queryKey = queryKey.replace('::offset', '');
            }
            // Match page number
            if (incrementer == 'match') {
                let pageNumber = page;
                if (end == 'next') {
                    ++pageNumber;
                }
                else if (end == 'previous') {
                    --pageNumber;
                }
                queryValue = matches
                    ? url.queryStrings[key].replace(`{{${matches[1]}}}`, `${pageNumber * Number(matches[1])}`)
                    : pageNumber * url.queryStrings[key];
                queryKey = queryKey.replace('::match', '');
            }
        }
        if (count == 0) {
            qs += `?${queryKey}=${queryValue}`;
        }
        else {
            qs += `&${queryKey}=${queryValue}`;
        }
        ++count;
    }
    if (url.fragment) {
        fragment = `#${url.fragment}`;
    }
    const href = `${qs}${fragment}`;
    return href;
}
/**
 * Function to constuct classes to help with mobile sizing
 */
function constructClasses(page, current, total) {
    if (total <= 5) {
        return '';
    }
    else if (current == 1 || current == total) {
        if (current - page == 4 || current - page == -4) {
            return 'gcds-pagination-list-breakpoint-xxs';
        }
        else if (current - page == 5 || current - page == -5) {
            return 'gcds-pagination-list-breakpoint-xs';
        }
        else if (current - page > 5 || current - page < -5) {
            return 'gcds-pagination-list-breakpoint-sm';
        }
    }
    else if (current == 2 || current == total - 1) {
        if (current - page == 3 || current - page == -3) {
            return 'gcds-pagination-list-breakpoint-xxs';
        }
        else if (current - page == 4 || current - page == -4) {
            return 'gcds-pagination-list-breakpoint-xs';
        }
        else if (current - page > 4 || current - page < -4) {
            return 'gcds-pagination-list-breakpoint-sm';
        }
    }
    else if (current > 2 && current < total - 1 && total < 10 && current == 5) {
        if (current - page == 2 || current - page == -2) {
            return 'gcds-pagination-list-breakpoint-xs';
        }
        else if (current - page >= 3 || current - page <= -3) {
            return 'gcds-pagination-list-breakpoint-sm';
        }
    }
    else if (current > 2 && current < total - 1) {
        if (current - page == 2 || current - page == -2) {
            return 'gcds-pagination-list-breakpoint-xxs';
        }
        else if (current - page == 3 || current - page == -3) {
            return 'gcds-pagination-list-breakpoint-xs';
        }
        else if (current - page > 3 || current - page < -3) {
            return 'gcds-pagination-list-breakpoint-sm';
        }
    }
}

const gcdsPaginationCss = "@layer reset, default, list, simple, wide, compact, hover, active, focus;@layer reset{:host{display:block}:host .gcds-pagination ul{list-style:none;padding:0}}@layer default{:host .gcds-pagination{container:component pagination/inline-size}:host .gcds-pagination li{margin:var(--gcds-pagination-listitem-margin)}:host .gcds-pagination li a{border-radius:var(--gcds-pagination-border-radius);color:var(--gcds-pagination-default-text);font:var(--gcds-pagination-font)}}@layer list{:host .gcds-pagination :is(.gcds-pagination-list,.gcds-pagination-list-mobile-prevnext){display:flex;flex-direction:row;margin:0 auto;width:fit-content}:host .gcds-pagination :is(.gcds-pagination-list,.gcds-pagination-list-mobile-prevnext) li a,:host .gcds-pagination :is(.gcds-pagination-list,.gcds-pagination-list-mobile-prevnext) li>span.gcds-pagination-list-ellipses{align-items:center;display:flex;height:2.75rem;justify-content:center;min-width:2.75rem}:host .gcds-pagination :is(.gcds-pagination-list,.gcds-pagination-list-mobile-prevnext) li a.gcds-pagination-end-button,:host .gcds-pagination :is(.gcds-pagination-list,.gcds-pagination-list-mobile-prevnext) li a.gcds-pagination-end-button-mobile,:host .gcds-pagination :is(.gcds-pagination-list,.gcds-pagination-list-mobile-prevnext) li>span.gcds-pagination-list-ellipses.gcds-pagination-end-button,:host .gcds-pagination :is(.gcds-pagination-list,.gcds-pagination-list-mobile-prevnext) li>span.gcds-pagination-list-ellipses.gcds-pagination-end-button-mobile{height:auto;min-width:auto;padding:var(--gcds-pagination-list-end-button-padding);width:auto}:host .gcds-pagination :is(.gcds-pagination-list,.gcds-pagination-list-mobile-prevnext) li.gcds-pagination-mobile-prevnext{display:none}:host .gcds-pagination :is(.gcds-pagination-list,.gcds-pagination-list-mobile-prevnext) li.gcds-pagination-list-mobile-ellipses{display:none}:host .gcds-pagination .gcds-pagination-list-mobile-prevnext{display:flex;margin:var(--gcds-pagination-mobile-list-prevnext-margin)}}@layer simple{:host .gcds-pagination-simple{display:flex;flex-direction:column;justify-content:space-between}:host .gcds-pagination-simple li{display:inline-block;justify-content:space-between;margin:var(--gcds-pagination-simple-listitem-margin);width:fit-content}:host .gcds-pagination-simple li a{display:grid;padding:var(--gcds-pagination-simple-padding)}:host .gcds-pagination-simple li a>gcds-icon{grid-area:icon}:host .gcds-pagination-simple li a>.gcds-pagination-simple-text{grid-area:text;margin:var(--gcds-pagination-simple-listitem-text-margin)}:host .gcds-pagination-simple li a>span{font-weight:var(--gcds-pagination-simple-label-font-weight);grid-area:label}:host .gcds-pagination-simple .gcds-pagination-simple-previous a{grid-template-areas:\"icon text\" \"icon label\";grid-template-columns:.25fr 1fr}:host .gcds-pagination-simple .gcds-pagination-simple-next a{grid-template-areas:\"text icon\" \"label icon\";grid-template-columns:1fr .25fr}}@layer wide{@container pagination (width > 44em){:host .gcds-pagination-list-mobile-prevnext{display:none}}@container pagination (width > 20em){:host .gcds-pagination-simple{flex-direction:row}:host .gcds-pagination-simple .gcds-pagination-simple-next{margin-left:auto}}}@layer compact{@container pagination (width <= 44em){:host .gcds-pagination :is(.gcds-pagination-list,.gcds-pagination-list-mobile-prevnext) li a{border:var(--gcds-pagination-border-width) solid}:host .gcds-pagination :is(.gcds-pagination-list,.gcds-pagination-list-mobile-prevnext) li>span.gcds-pagination-list-ellipses{min-width:auto}:host .gcds-pagination :is(.gcds-pagination-list,.gcds-pagination-list-mobile-prevnext) li:has(>a.gcds-pagination-end-button){margin:0}:host .gcds-pagination :is(.gcds-pagination-list,.gcds-pagination-list-mobile-prevnext) li .gcds-pagination-end-button{display:none}:host .gcds-pagination :is(.gcds-pagination-list,.gcds-pagination-list-mobile-prevnext) li.gcds-pagination-mobile-prevnext{display:block}}@container pagination (width <= 30em){:host .gcds-pagination-list .gcds-pagination-list-breakpoint-sm{display:none}}@container pagination (width <= 27.5em){:host .gcds-pagination-list .gcds-pagination-list-breakpoint-xs{display:none}}@container pagination (width <= 25em){:host .gcds-pagination-list .gcds-pagination-list-breakpoint-xxs{display:none}}@container pagination (width <= 19em){:host .gcds-pagination-list li{margin:var(--gcds-pagination-mobile-list-item-margin)}}}@layer hover{@media (hover:hover){:host .gcds-pagination ul li a:hover{background:var(--gcds-pagination-hover-background);color:var(--gcds-pagination-hover-text)}}}@layer active{:host .gcds-pagination ul li a:active:not(:focus),:host .gcds-pagination ul li a[aria-current*=page]:not(:focus){background:var(--gcds-pagination-active-background);border-color:var(--gcds-pagination-active-background);color:var(--gcds-pagination-active-text);pointer-events:none;text-decoration:none}}@layer focus{:host .gcds-pagination ul li a:focus{background-color:var(--gcds-pagination-focus-background);border-color:var(--gcds-pagination-focus-background);box-shadow:var(--gcds-pagination-focus-box-shadow);color:var(--gcds-pagination-focus-text);outline:var(--gcds-pagination-focus-outline-width) solid var(--gcds-pagination-focus-background);outline-offset:var(--gcds-pagination-border-width);text-decoration:none}}";
const GcdsPaginationStyle0 = gcdsPaginationCss;

const GcdsPagination = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.gcdsFocus = index.createEvent(this, "gcdsFocus", 7);
        this.gcdsBlur = index.createEvent(this, "gcdsBlur", 7);
        this.gcdsClick = index.createEvent(this, "gcdsClick", 7);
        this.listitems = [];
        this.mobilePrevNext = [];
        this.display = 'list';
        this.label = undefined;
        this.previousHref = undefined;
        this.previousLabel = undefined;
        this.nextHref = undefined;
        this.nextLabel = undefined;
        this.totalPages = undefined;
        this.currentPage = undefined;
        this.url = undefined;
        this.currentStep = undefined;
        this.lang = undefined;
    }
    watchCurrentPage(newValue) {
        this.currentStep = newValue;
    }
    /**
     * Convert url prop to object
     * (Object props get treated as string when using Stencil components without a framework)
     */
    urlChanged(newUrl) {
        if (typeof newUrl == 'string') {
            this.urlObject = JSON.parse(newUrl);
        }
        else if (typeof newUrl == 'object') {
            this.urlObject = newUrl;
        }
    }
    watchLang() {
        if (this.display == 'list') {
            this.configureListPagination();
        }
    }
    /**
     * Function to constuct <li> and <a> tags for display="list" pagination
     */
    configurePaginationStep(page, end, mobile) {
        const href = this.urlObject
            ? constructHref(this.urlObject, page, end)
            : 'javascript:void(0)';
        const linkAttrs = {
            'href': href,
            'aria-label': !end
                ? I18N$9[this.lang].pageNumberOf
                    .replace('{#}', page)
                    .replace('{total}', this.totalPages)
                    .replace('{label}', this.label)
                : end == 'next'
                    ? `${I18N$9[this.lang].nextPage}: ${I18N$9[this.lang].pageNumberOf
                        .replace('{#}', ++page)
                        .replace('{total}', this.totalPages)
                        .replace('{label}', this.label)}`
                    : `${I18N$9[this.lang].previousPage}: ${I18N$9[this.lang].pageNumberOf
                        .replace('{#}', --page)
                        .replace('{total}', this.totalPages)
                        .replace('{label}', this.label)}`,
            'onBlur': () => this.gcdsBlur.emit(),
            'onFocus': () => this.gcdsFocus.emit(),
            'onClick': e => emitEvent(e, this.gcdsClick, { page: page, href }),
        };
        if (page == this.currentPage && !end) {
            linkAttrs['aria-current'] = 'page';
        }
        if (end) {
            return (index.h("li", null, end === 'next' ? (index.h("a", Object.assign({}, linkAttrs, { class: !mobile
                    ? 'gcds-pagination-end-button'
                    : 'gcds-pagination-end-button-mobile' }), I18N$9[this.lang].next, index.h("gcds-icon", { "margin-left": "200", name: "arrow-right" }))) : (index.h("a", Object.assign({}, linkAttrs, { class: !mobile
                    ? 'gcds-pagination-end-button'
                    : 'gcds-pagination-end-button-mobile' }), index.h("gcds-icon", { "margin-right": "200", name: "arrow-left" }), mobile
                ? I18N$9[this.lang].previousMobile
                : I18N$9[this.lang].previous))));
        }
        else {
            return (index.h("li", { class: page != 1 && page != this.totalPages
                    ? constructClasses(page, this.currentPage, this.totalPages)
                    : '' }, index.h("a", Object.assign({}, linkAttrs), page)));
        }
    }
    /**
     * Function to render the right steps for display="list" pagination
     */
    configureListPagination() {
        this.listitems = [];
        this.mobilePrevNext = [];
        if (this.currentPage != 1) {
            this.listitems.push(this.configurePaginationStep(this.currentPage, 'previous'));
            this.mobilePrevNext.push(this.configurePaginationStep(this.currentPage, 'previous', true));
        }
        // Flags to see if ellipses already rendered
        let previousEllipses = false;
        let nextEllipses = false;
        for (let i = 1; i <= this.totalPages; i++) {
            // Left side mobile ellipses
            if (i == 2 &&
                this.currentPage < 6 &&
                this.currentPage > 3 &&
                this.totalPages > 9) {
                this.listitems.push(index.h("li", { class: `gcds-pagination-list-mobile-ellipses`, "aria-hidden": "true" }, index.h("span", { class: "gcds-pagination-list-ellipses" }, "...")));
            }
            else if (i == 2 &&
                this.totalPages < 10 &&
                this.totalPages > 5 &&
                this.currentPage > 3) {
                this.listitems.push(index.h("li", { class: `gcds-pagination-list-mobile-ellipses`, "aria-hidden": "true" }, index.h("span", { class: "gcds-pagination-list-ellipses" }, "...")));
            }
            if (i == this.currentPage ||
                i == 1 ||
                i == this.totalPages ||
                (i >= this.currentPage - 2 && i <= this.currentPage + 2) ||
                this.totalPages < 10) {
                this.listitems.push(this.configurePaginationStep(i));
            }
            else if ((this.currentPage <= 5 && i <= 7) ||
                (this.currentPage >= this.totalPages - 4 && i >= this.totalPages - 6)) {
                this.listitems.push(this.configurePaginationStep(i));
            }
            else if ((this.currentPage == 5 && i == 2) ||
                (this.currentPage == this.totalPages - 4 && i == this.totalPages - 1)) {
                this.listitems.push(this.configurePaginationStep(i));
            }
            else if (!previousEllipses && i < this.currentPage - 2) {
                this.listitems.push(index.h("li", { "aria-hidden": "true" }, index.h("span", { class: "gcds-pagination-list-ellipses" }, "...")));
                previousEllipses = true;
            }
            else if (!nextEllipses &&
                i > this.currentPage + 2 &&
                i < this.totalPages) {
                this.listitems.push(index.h("li", { "aria-hidden": "true" }, index.h("span", { class: "gcds-pagination-list-ellipses" }, "...")));
                nextEllipses = true;
            }
            // Right side mobile ellipses
            if (i == this.totalPages - 1 &&
                this.currentPage > this.totalPages - 5 &&
                this.currentPage < this.totalPages - 2 &&
                this.totalPages > 9) {
                this.listitems.push(index.h("li", { class: `gcds-pagination-list-mobile-ellipses`, "aria-hidden": "true" }, index.h("span", { class: "gcds-pagination-list-ellipses" }, "...")));
            }
            else if (i == this.totalPages - 1 &&
                this.totalPages < 10 &&
                this.totalPages > 5 &&
                this.currentPage < this.totalPages - 2) {
                this.listitems.push(index.h("li", { class: `gcds-pagination-list-mobile-ellipses`, "aria-hidden": "true" }, index.h("span", { class: "gcds-pagination-list-ellipses" }, "...")));
            }
        }
        if (this.currentPage != this.totalPages) {
            this.listitems.push(this.configurePaginationStep(this.currentPage, 'next'));
            this.mobilePrevNext.push(this.configurePaginationStep(this.currentPage, 'next', true));
        }
    }
    /*
     * Observe lang attribute change
     */
    updateLang() {
        const observer = new MutationObserver(mutations => {
            if (mutations[0].oldValue != this.el.lang) {
                this.lang = this.el.lang;
            }
        });
        observer.observe(this.el, observerConfig);
    }
    async componentWillLoad() {
        // Define lang attribute
        this.lang = assignLanguage(this.el);
        this.updateLang();
        if (this.url && typeof this.url == 'string') {
            this.urlObject = JSON.parse(this.url);
        }
        else if (this.url && typeof this.url == 'object') {
            this.urlObject = this.url;
        }
        if (this.display == 'list') {
            this.configureListPagination();
        }
    }
    componentDidUpdate() {
        if (this.display == 'list') {
            this.configureListPagination();
        }
    }
    render() {
        const { display, label, previousHref, previousLabel, nextHref, nextLabel, lang, } = this;
        return (index.h(index.Host, { role: "navigation", "aria-label": label }, index.h("div", { class: "gcds-pagination" }, display === 'list' ? (index.h("div", null, index.h("ul", { class: "gcds-pagination-list" }, this.listitems), index.h("ul", { class: "gcds-pagination-list-mobile-prevnext" }, this.mobilePrevNext))) : (index.h("ul", { class: "gcds-pagination-simple" }, previousHref && (index.h("li", { class: "gcds-pagination-simple-previous" }, index.h("a", { href: previousHref, "aria-label": `${I18N$9[lang].previousPage}${previousLabel ? `: ${previousLabel}` : ''}`, onBlur: () => this.gcdsBlur.emit(), onFocus: () => this.gcdsFocus.emit(), onClick: e => emitEvent(e, this.gcdsClick, previousHref) }, index.h("gcds-icon", { "margin-right": "200", name: "arrow-left" }), index.h("div", { class: "gcds-pagination-simple-text" }, I18N$9[lang].previous), index.h("span", null, previousLabel)))), nextHref && (index.h("li", { class: "gcds-pagination-simple-next" }, index.h("a", { href: nextHref, "aria-label": `${I18N$9[lang].nextPage}${nextLabel ? `: ${nextLabel}` : ''}`, onBlur: () => this.gcdsBlur.emit(), onFocus: () => this.gcdsFocus.emit(), onClick: e => emitEvent(e, this.gcdsClick, nextHref) }, index.h("div", { class: "gcds-pagination-simple-text" }, I18N$9[lang].next), index.h("span", null, nextLabel), index.h("gcds-icon", { "margin-left": "200", name: "arrow-right" })))))))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "currentPage": ["watchCurrentPage"],
        "url": ["urlChanged"],
        "lang": ["watchLang"]
    }; }
};
GcdsPagination.style = GcdsPaginationStyle0;

const I18N$8 = {
  en: {
    label: 'Banner',
  },
  fr: {
    label: 'Bannière',
  },
};

const gcdsPhaseBannerCss = "@layer reset, default, fixed, role, wide, compact;@layer reset{:host{display:block}:host slot{display:initial}}@layer default{:host .gcds-phase-banner{container:component banner/inline-size;font:var(--gcds-phase-banner-font);line-height:var(--gcds-phase-banner-line-height)}:host .gcds-phase-banner .banner__content{padding:var(--gcds-phase-banner-padding)}:host .gcds-phase-banner .banner__icon{display:flex;margin:0}:host .gcds-phase-banner .banner__icon.icon--left{margin-inline-end:var(--gcds-phase-banner-icon-margin)}:host .gcds-phase-banner .banner__icon.icon--right{margin-inline-start:var(--gcds-phase-banner-icon-margin)}:host .gcds-phase-banner .banner__icon ::slotted(img),:host .gcds-phase-banner .banner__icon ::slotted(svg){max-height:var(--gcds-phase-banner-icon-max-height)}:host .gcds-phase-banner .banner__details{align-items:baseline;display:flex;flex-wrap:wrap}:host .gcds-phase-banner .banner__details ::slotted(a),:host .gcds-phase-banner .banner__details ::slotted(gcds-button){flex:0 0 auto}:host .gcds-phase-banner .banner__details ::slotted(a),:host .gcds-phase-banner .banner__details ::slotted(small),:host .gcds-phase-banner .banner__details ::slotted(span){font-size:80%!important}:host .gcds-phase-banner .banner__details ::slotted(p){font:var(--gcds-phase-banner-font);margin:0}:host .gcds-phase-banner .banner__details ::slotted(a){color:inherit}:host .gcds-phase-banner .banner__details ::slotted(gcds-button){margin:var(--gcds-phase-banner-details-cta-margin);transform:scale(90%)}}@layer fixed{:host .gcds-phase-banner.banner-is-fixed{position:sticky;top:0;width:100%;z-index:9999}}@layer role{:host .gcds-phase-banner.banner--role-primary{background-color:var(--gcds-phase-banner-primary-background);color:var(--gcds-phase-banner-primary-text)}:host .gcds-phase-banner.banner--role-secondary{background-color:var(--gcds-phase-banner-secondary-background);color:var(--gcds-phase-banner-secondary-text)}}@layer wide{@container banner (width >= 36em){:host .gcds-phase-banner .banner__content{display:flex}}}@layer compact{@container banner (width < 36em){:host .gcds-phase-banner .banner__content .banner__icon{display:none}}}";
const GcdsPhaseBannerStyle0 = gcdsPhaseBannerCss;

const GcdsPhaseBanner = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.bannerRole = 'primary';
        this.container = 'xl';
        this.isFixed = undefined;
        this.lang = undefined;
    }
    /**
     * Events
     */
    /*
     * Observe lang attribute change
     */
    updateLang() {
        const observer = new MutationObserver(mutations => {
            if (mutations[0].oldValue != this.el.lang) {
                this.lang = this.el.lang;
            }
        });
        observer.observe(this.el, observerConfig);
    }
    async componentWillLoad() {
        // Define lang attribute
        this.lang = assignLanguage(this.el);
        this.updateLang();
    }
    render() {
        const { bannerRole, container, isFixed, lang } = this;
        return (index.h(index.Host, null, index.h("div", { class: `gcds-phase-banner banner--role-${bannerRole} ${isFixed ? 'banner--is-fixed' : ''}`, role: "status", "aria-label": I18N$8[lang].label }, index.h("gcds-container", { size: container, centered: true }, index.h("div", { class: "banner__content" }, index.h("figure", { class: "banner__icon icon--left" }, index.h("slot", { name: "banner-icon-left" })), index.h("div", { class: "banner__details" }, index.h("slot", { name: "banner-text" }), index.h("slot", { name: "banner-cta" })), index.h("figure", { class: "banner__icon icon--right" }, index.h("slot", { name: "banner-icon-right" })))))));
    }
    get el() { return index.getElement(this); }
};
GcdsPhaseBanner.style = GcdsPhaseBannerStyle0;

const gcdsRadioGroupCss = "@layer reset, default, disabled, error, focus;@layer reset{:host{display:block}:host .gcds-radio{border:0;padding:0}:host .gcds-radio gcds-label:after,:host .gcds-radio gcds-label:before{box-sizing:border-box;content:\"\";cursor:pointer}}@layer default{:host .gcds-radio{color:var(--gcds-radio-default-text);font:var(--gcds-radio-font);margin:var(--gcds-radio-margin)!important;max-width:var(--gcds-radio-max-width);min-height:calc(var(--gcds-radio-input-height-and-width) - var(--gcds-radio-padding));padding:var(--gcds-radio-padding) 0 0;position:relative;transition:color .15s ease-in-out}:host .gcds-radio :is(gcds-label,gcds-hint){padding:var(--gcds-radio-label-padding)!important}:host .gcds-radio gcds-hint::part(hint){margin:0}:host .gcds-radio gcds-label:after,:host .gcds-radio gcds-label:before,:host .gcds-radio input{position:absolute}:host .gcds-radio gcds-label:before,:host .gcds-radio input{height:var(--gcds-radio-input-height-and-width);left:0;top:0;width:var(--gcds-radio-input-height-and-width)}:host .gcds-radio input{opacity:0}:host .gcds-radio gcds-label{width:fit-content}:host .gcds-radio gcds-label:after,:host .gcds-radio gcds-label:before{border-radius:var(--gcds-radio-border-radius)}:host .gcds-radio gcds-label:before{border:var(--gcds-radio-input-border-width) solid;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out,outline .15s ease-in-out}:host .gcds-radio gcds-label:after{background-color:currentcolor;height:var(--gcds-radio-check-height-and-width);left:var(--gcds-radio-check-left);opacity:0;top:var(--gcds-radio-check-top);transition:opacity .2s ease-in-out;width:var(--gcds-radio-check-height-and-width)}:host .gcds-radio input:checked+gcds-label:after{opacity:1}}@layer disabled{:host .gcds-radio.gcds-radio--disabled{color:var(--gcds-radio-disabled-text)}:host .gcds-radio.gcds-radio--disabled gcds-label:after,:host .gcds-radio.gcds-radio--disabled gcds-label:before{cursor:not-allowed}:host .gcds-radio.gcds-radio--disabled gcds-label:before{background-color:var(--gcds-radio-disabled-background);border-color:var(--gcds-radio-disabled-border)}}@layer error{:host .gcds-radio.gcds-radio--error:not(:focus-within) gcds-label:before{border-color:var(--gcds-radio-danger-border)}:host .gcds-radio.gcds-radio--error:not(:focus-within) gcds-label:after{background-color:var(--gcds-radio-danger-border)}}@layer focus{:host .gcds-radio:focus-within{color:var(--gcds-radio-focus-text)}:host .gcds-radio:focus-within input:focus+gcds-label:before{background:var(--gcds-radio-focus-background);box-shadow:var(--gcds-radio-focus-box-shadow);outline:var(--gcds-radio-focus-outline-width) solid currentcolor;outline-offset:var(--gcds-radio-input-border-width)}:host .gcds-radio:focus-within input:focus+gcds-label:after{background-color:currentcolor}}";
const GcdsRadioGroupStyle0 = gcdsRadioGroupCss;

const GcdsRadioGroup = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.gcdsChange = index.createEvent(this, "gcdsChange", 7);
        this.gcdsFocus = index.createEvent(this, "gcdsFocus", 7);
        this.gcdsBlur = index.createEvent(this, "gcdsBlur", 7);
        if (hostRef.$hostElement$["s-ei"]) {
            this.internals = hostRef.$hostElement$["s-ei"];
        }
        else {
            this.internals = hostRef.$hostElement$.attachInternals();
            hostRef.$hostElement$["s-ei"] = this.internals;
        }
        this.onBlur = () => {
            this.gcdsBlur.emit();
        };
        this.onChange = e => {
            this.gcdsChange.emit(e.target.value);
            this.internals.setFormValue(e.target.value, 'checked');
            const changeEvt = new e.constructor(e.type, e);
            this.el.dispatchEvent(changeEvt);
        };
        this.options = undefined;
        this.name = undefined;
        this.hasError = undefined;
        this.parentError = undefined;
        this.inheritedAttributes = {};
        this.lang = undefined;
    }
    validateOptions() {
        if (typeof this.options == 'object') {
            this.optionObject = this.options;
        }
        else if (typeof this.options == 'string') {
            this.optionObject = JSON.parse(this.options);
        }
    }
    /*
     * Observe lang attribute change
     */
    updateLang() {
        const observer = new MutationObserver(mutations => {
            if (mutations[0].oldValue != this.el.lang) {
                this.lang = this.el.lang;
            }
        });
        observer.observe(this.el, observerConfig);
    }
    async componentWillLoad() {
        // Define lang attribute
        this.lang = assignLanguage(this.el);
        this.updateLang();
        this.validateOptions();
        this.inheritedAttributes = inheritAttributes(this.el, this.shadowElement);
        this.optionObject &&
            this.optionObject.map(radio => {
                if (radio.checked) {
                    this.internals.setFormValue(radio.value, 'checked');
                }
            });
    }
    /**
     * Event listener for gcds-fieldset errors
     */
    gcdsGroupError(e) {
        if (e.srcElement.contains(this.el)) {
            this.hasError = true;
            this.parentError = e.detail;
        }
    }
    gcdsGroupErrorClear(e) {
        if (e.srcElement.contains(this.el) && this.hasError) {
            this.hasError = false;
            this.parentError = '';
        }
    }
    render() {
        const { lang, name, hasError, parentError, inheritedAttributes } = this;
        return (index.h(index.Host, null, this.optionObject &&
            this.optionObject.map(radio => {
                const attrsInput = Object.assign({ name, disabled: radio.disabled, required: radio.required, value: radio.value, checked: radio.checked }, inheritedAttributes);
                if (radio.hint || parentError) {
                    const hintID = radio.hint ? `hint-${radio.id} ` : '';
                    const errorID = parentError ? `parent-error ` : '';
                    attrsInput['aria-describedby'] = `${hintID}${errorID}${attrsInput['aria-describedby']
                        ? `${attrsInput['aria-describedby']}`
                        : ''}`;
                }
                if (hasError) {
                    attrsInput['aria-invalid'] = 'true';
                }
                return (index.h("div", { class: `gcds-radio ${radio.disabled ? 'gcds-radio--disabled' : ''} ${hasError ? 'gcds-radio--error' : ''}` }, index.h("input", Object.assign({ id: radio.id, type: "radio" }, attrsInput, { onChange: e => this.onChange(e), onBlur: () => this.onBlur(), onFocus: () => this.gcdsFocus.emit(), ref: element => (this.shadowElement = element) })), index.h("gcds-label", { label: radio.label, "label-for": radio.id, lang: lang }), radio.hint ? (index.h("gcds-hint", { "hint-id": radio.id }, radio.hint)) : null));
            }), parentError && (index.h("span", { id: `parent-error`, hidden: true }, parentError))));
    }
    static get delegatesFocus() { return true; }
    static get formAssociated() { return true; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "options": ["validateOptions"]
    }; }
};
GcdsRadioGroup.style = GcdsRadioGroupStyle0;

const I18N$7 = {
  en: {
    search: 'Search',
    searchLabel: 'Search {$}',
  },
  fr: {
    search: 'Recherche',
    searchLabel: 'Rechercher dans {$}',
  },
};

const gcdsSearchCss = "@layer reset, default, focus;@layer reset{:host{display:block}:host .gcds-search input{background-image:none;box-sizing:border-box}:host [type=search]::-webkit-search-cancel-button,:host [type=search]::-webkit-search-decoration{-webkit-appearance:none;appearance:none}}@layer default{:host .gcds-search .gcds-search__header{display:block;height:0;margin:0;overflow:hidden;width:0}:host .gcds-search .gcds-search__form{display:flex;margin:var(--gcds-search-margin)!important}:host .gcds-search input{font:var(--gcds-search-font-desktop);height:auto;min-height:var(--gcds-search-min-width-and-height);width:100%}@media only screen and (width < 48em){:host .gcds-search input{font:var(--gcds-search-font-mobile)}}:host .gcds-search input{background-color:var(--gcds-search-default-background);border:var(--gcds-search-border-width) solid;border-radius:var(--gcds-search-border-radius);color:var(--gcds-search-default-text);padding:var(--gcds-search-padding)!important;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}:host .gcds-search ::part(button){border-end-start-radius:0;border-start-start-radius:0;height:100%;margin:0}}@layer focus{:host .gcds-search input:focus{border-color:var(--gcds-search-focus-text);border-radius:var(--gcds-search-focus-border-radius);box-shadow:var(--gcds-search-focus-box-shadow);outline:var(--gcds-search-outline-width) solid var(--gcds-search-focus-text);outline-offset:var(--gcds-search-border-width);z-index:30}:host .gcds-search ::part(button):focus{border-radius:var(--gcds-search-focus-border-radius);box-shadow:var(--gcds-search-focus-box-shadow)}}";
const GcdsSearchStyle0 = gcdsSearchCss;

const GcdsSearch = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.gcdsInput = index.createEvent(this, "gcdsInput", 7);
        this.gcdsChange = index.createEvent(this, "gcdsChange", 7);
        this.gcdsFocus = index.createEvent(this, "gcdsFocus", 7);
        this.gcdsBlur = index.createEvent(this, "gcdsBlur", 7);
        this.gcdsSubmit = index.createEvent(this, "gcdsSubmit", 7);
        this.handleInput = (e, customEvent) => {
            const input = e.target;
            this.value = input.value;
            customEvent.emit(this.value);
        };
        this.placeholder = 'Canada.ca';
        this.action = '/sr/srb.html';
        this.method = 'get';
        this.name = 'q';
        this.searchId = 'search';
        this.value = undefined;
        this.suggested = undefined;
        this.lang = undefined;
    }
    /*
     * Observe lang attribute change
     */
    updateLang() {
        const observer = new MutationObserver(mutations => {
            if (mutations[0].oldValue != this.el.lang) {
                this.lang = this.el.lang;
            }
        });
        observer.observe(this.el, observerConfig);
    }
    async componentWillLoad() {
        // Define lang attribute
        this.lang = assignLanguage(this.el);
    }
    render() {
        const { placeholder, action, method, name, value, lang, searchId, suggested, } = this;
        const labelText = `${I18N$7[lang].searchLabel.replace('{$}', placeholder)}`;
        const attrsInput = {
            name,
            placeholder: labelText,
        };
        const formAction = action === '/sr/srb.html'
            ? `https://www.canada.ca/${lang}/sr/srb.html`
            : action;
        return (index.h(index.Host, null, index.h("div", { class: "gcds-search" }, index.h("gcds-sr-only", { tag: "h2" }, I18N$7[lang].search), index.h("form", { action: formAction, method: method, role: "search", onSubmit: e => emitEvent(e, this.gcdsSubmit, this.value), class: "gcds-search__form" }, index.h("gcds-label", { label: labelText, "label-for": searchId, "hide-label": true }), index.h("input", Object.assign({ type: "search", id: searchId, list: "search-list", size: 34, maxLength: 170, onInput: e => this.handleInput(e, this.gcdsInput), onChange: e => this.handleInput(e, this.gcdsChange), onFocus: () => this.gcdsFocus.emit(), onBlur: () => this.gcdsBlur.emit() }, attrsInput, { class: "gcds-search__input", value: value })), suggested && (index.h("datalist", { id: "search-list" }, suggested.map((k, v) => (index.h("option", { value: k, key: v }))))), index.h("gcds-button", { type: "submit", class: "gcds-search__button", exportparts: "button" }, index.h("gcds-icon", { name: "search", label: I18N$7[lang].search, "fixed-width": true }))))));
    }
    get el() { return index.getElement(this); }
};
GcdsSearch.style = GcdsSearchStyle0;

const gcdsSelectCss = "@layer reset, default, disabled, error, focus;@layer reset{:host{display:block}:host .gcds-select-wrapper{border:0;margin:0;padding:0}:host .gcds-select-wrapper select{box-sizing:border-box}:host .gcds-select-wrapper slot{display:initial}}@layer default{:host .gcds-select-wrapper{color:var(--gcds-select-default-text);font:var(--gcds-select-font);max-width:75ch;transition:color .15s ease-in-out}:host .gcds-select-wrapper select{-webkit-appearance:none;-moz-appearance:none;background-color:var(--gcds-select-default-background);background-image:url(\"data:image/svg+xml;utf8,<svg width='16' height='10' viewBox='0 0 16 10' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M0.799988 0.900024L7.79999 7.90003L14.8 0.900024' stroke='currentColor' stroke-width='2'/></svg>\");background-position-x:var(--gcds-select-arrow-position-x);background-position-y:50%;background-repeat:no-repeat;border:var(--gcds-select-border-width) solid;border-radius:var(--gcds-select-border-radius);box-sizing:border-box;color:var(--gcds-select-default-text);display:block;font:inherit;height:auto;margin:var(--gcds-select-margin)!important;max-width:100%;min-height:var(--gcds-select-min-width-and-height);min-width:var(--gcds-select-min-width-and-height);padding:var(--gcds-select-padding)!important;transition:all .15s ease-in-out}}@layer disabled{:host .gcds-select-wrapper.gcds-disabled{color:var(--gcds-select-disabled-text)}:host .gcds-select-wrapper.gcds-disabled select:disabled{background-color:var(--gcds-select-disabled-background);border-color:var(--gcds-select-disabled-text);cursor:not-allowed}}@layer error{:host .gcds-select-wrapper.gcds-error:not(:focus-within) select{border-color:var(--gcds-select-danger-border)}}@layer focus{:host .gcds-select-wrapper:focus-within{color:var(--gcds-select-focus-text)}:host .gcds-select-wrapper:focus-within select:focus{border-color:var(--gcds-select-focus-text);box-shadow:var(--gcds-select-focus-box-shadow);outline:var(--gcds-select-outline-width) solid var(--gcds-select-focus-text);outline-offset:var(--gcds-select-border-width)}}";
const GcdsSelectStyle0 = gcdsSelectCss;

const GcdsSelect = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.gcdsChange = index.createEvent(this, "gcdsChange", 7);
        this.gcdsInput = index.createEvent(this, "gcdsInput", 7);
        this.gcdsFocus = index.createEvent(this, "gcdsFocus", 7);
        this.gcdsBlur = index.createEvent(this, "gcdsBlur", 7);
        this.gcdsError = index.createEvent(this, "gcdsError", 7);
        this.gcdsValid = index.createEvent(this, "gcdsValid", 7);
        if (hostRef.$hostElement$["s-ei"]) {
            this.internals = hostRef.$hostElement$["s-ei"];
        }
        else {
            this.internals = hostRef.$hostElement$.attachInternals();
            hostRef.$hostElement$["s-ei"] = this.internals;
        }
        this._validator = defaultValidator;
        this.handleInput = (e, customEvent) => {
            const val = e.target && e.target.value;
            this.value = val;
            this.internals.setFormValue(val);
            if (e.type === 'change') {
                const changeEvt = new e.constructor(e.type, e);
                this.el.dispatchEvent(changeEvt);
            }
            customEvent.emit(this.value);
        };
        this.onBlur = () => {
            if (this.validateOn === 'blur') {
                this.validate();
            }
            this.gcdsBlur.emit();
        };
        this.selectId = undefined;
        this.label = undefined;
        this.name = undefined;
        this.required = false;
        this.disabled = false;
        this.defaultValue = undefined;
        this.value = undefined;
        this.errorMessage = undefined;
        this.hint = undefined;
        this.validator = undefined;
        this.validateOn = undefined;
        this.hasError = undefined;
        this.inheritedAttributes = {};
        this.lang = undefined;
        this.options = undefined;
    }
    validateDisabledSelect() {
        if (this.required) {
            this.disabled = false;
        }
    }
    validateErrorMessage() {
        if (this.disabled) {
            this.errorMessage = '';
        }
        else if (!this.hasError && this.errorMessage) {
            this.hasError = true;
        }
        else if (this.errorMessage == '') {
            this.hasError = false;
        }
    }
    validateValidator() {
        if (this.validator && !this.validateOn) {
            this.validateOn = 'blur';
        }
    }
    validateHasError() {
        if (this.disabled) {
            this.hasError = false;
        }
    }
    /**
     * Watch HTML attribute aria-invalid to inherit changes
     */
    ariaInvalidWatcher() {
        this.inheritedAttributes = inheritAttributes(this.el, this.shadowElement);
    }
    ariaDescriptiondWatcher() {
        this.inheritedAttributes = inheritAttributes(this.el, this.shadowElement);
    }
    /**
     * Call any active validators
     */
    async validate() {
        if (!this._validator.validate(this.value) && this._validator.errorMessage) {
            this.errorMessage = this._validator.errorMessage[this.lang];
            this.gcdsError.emit({
                id: `#${this.selectId}`,
                message: `${this.label} - ${this.errorMessage}`,
            });
        }
        else {
            this.errorMessage = '';
            this.gcdsValid.emit({ id: `#${this.selectId}` });
        }
    }
    submitListener(e) {
        if (e.target == this.el.closest('form')) {
            if (this.validateOn && this.validateOn != 'other') {
                this.validate();
            }
            if (this.hasError) {
                e.preventDefault();
            }
        }
    }
    /**
     * Check if an option is selected or value matches an option's value
     */
    checkValueOrSelected(option) {
        const value = option.getAttribute('value');
        if (this.value === value) {
            option.setAttribute('selected', 'true');
            this.internals.setFormValue(value);
            this.initialValue = this.value;
        }
        if (option.hasAttribute('selected')) {
            this.value = value;
            this.initialValue = this.value ? this.value : null;
        }
    }
    /*
     * Form internal functions
     */
    formResetCallback() {
        if (this.value != this.initialValue) {
            this.internals.setFormValue(this.initialValue);
            this.value = this.initialValue;
        }
    }
    formStateRestoreCallback(state) {
        this.internals.setFormValue(state);
        this.value = state;
    }
    /*
     * Observe lang attribute change
     */
    updateLang() {
        const observer = new MutationObserver(mutations => {
            if (mutations[0].oldValue != this.el.lang) {
                this.lang = this.el.lang;
            }
        });
        observer.observe(this.el, observerConfig);
    }
    async componentWillLoad() {
        // Define lang attribute
        this.lang = assignLanguage(this.el);
        this.updateLang();
        this.validateDisabledSelect();
        this.validateHasError();
        this.validateErrorMessage();
        this.validateValidator();
        // Assign required validator if needed
        requiredValidator(this.el, 'select');
        if (this.validator) {
            this._validator = getValidator(this.validator);
        }
        this.inheritedAttributes = inheritAttributes(this.el, this.shadowElement);
        if (this.el.children) {
            this.options = Array.from(this.el.children);
            this.options.forEach(option => {
                if (option.nodeName === 'OPTION') {
                    this.checkValueOrSelected(option);
                }
                else if (option.nodeName === 'OPTGROUP') {
                    const subOptions = Array.from(option.children);
                    subOptions.map(sub => {
                        this.checkValueOrSelected(sub);
                    });
                }
            });
        }
    }
    componentWillUpdate() {
        if (this.validator) {
            this._validator = getValidator(this.validator);
        }
    }
    render() {
        const { lang, selectId, label, required, disabled, defaultValue, value, hint, errorMessage, inheritedAttributes, hasError, name, options, } = this;
        const attrsSelect = Object.assign({ name,
            disabled,
            required,
            value }, inheritedAttributes);
        const attrsLabel = {
            label,
            required,
        };
        if (hint || errorMessage) {
            const hintID = hint ? `hint-${selectId} ` : '';
            const errorID = errorMessage ? `error-message-${selectId} ` : '';
            attrsSelect['aria-describedby'] = `${hintID}${errorID}${attrsSelect['aria-describedby']
                ? `${attrsSelect['aria-describedby']}`
                : ''}`;
        }
        return (index.h(index.Host, null, index.h("div", { class: `gcds-select-wrapper ${disabled ? 'gcds-disabled' : ''} ${hasError ? 'gcds-error' : ''}` }, index.h("gcds-label", Object.assign({}, attrsLabel, { "label-for": selectId, lang: lang })), hint ? index.h("gcds-hint", { "hint-id": selectId }, hint) : null, errorMessage ? (index.h("gcds-error-message", { messageId: selectId }, errorMessage)) : null, index.h("select", Object.assign({}, attrsSelect, { id: selectId, onBlur: () => this.onBlur(), onFocus: () => this.gcdsFocus.emit(), onInput: e => this.handleInput(e, this.gcdsInput), onChange: e => this.handleInput(e, this.gcdsChange), "aria-invalid": inheritedAttributes['aria-invalid'] === 'true'
                ? inheritedAttributes['aria-invalid']
                : errorMessage
                    ? 'true'
                    : 'false', part: "select", ref: element => (this.shadowElement = element) }), defaultValue ? (index.h("option", { value: "", disabled: true, selected: true }, defaultValue)) : null, options.map(opt => {
            if (opt.nodeName === 'OPTION') {
                const selected = opt.hasAttribute('selected')
                    ? { selected: true }
                    : null;
                return (index.h("option", Object.assign({ value: opt.getAttribute('value') }, selected), opt.innerHTML));
            }
            else if (opt.nodeName === 'OPTGROUP') {
                const optGroupChildren = Array.from(opt.children).map(sub => {
                    const selected = sub.hasAttribute('selected')
                        ? { selected: true }
                        : null;
                    return (index.h("option", Object.assign({ value: sub.getAttribute('value') }, selected), sub.innerHTML));
                });
                return (index.h("optgroup", { label: opt.getAttribute('label') }, optGroupChildren));
            }
        })))));
    }
    static get delegatesFocus() { return true; }
    static get formAssociated() { return true; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "disabled": ["validateDisabledSelect"],
        "errorMessage": ["validateErrorMessage"],
        "validator": ["validateValidator"],
        "hasError": ["validateHasError"],
        "aria-invalid": ["ariaInvalidWatcher"],
        "aria-description": ["ariaDescriptiondWatcher"]
    }; }
};
GcdsSelect.style = GcdsSelectStyle0;

/**
 * Handle event for keyboard control of nav
 * @param {Event} event
 * @param {Element} nav
 * @param {any[]} queue
 */
async function handleKeyDownNav(event, nav, queue) {
    const key = event.key;
    const currentIndex = queue.indexOf(document.activeElement == nav
        ? document.activeElement.shadowRoot.activeElement
        : document.activeElement);
    const activeElement = queue[currentIndex];
    switch (key) {
        // Down arrow
        case 'ArrowDown':
            event.preventDefault();
            // If on last item, jump to first item
            if (currentIndex + 1 > queue.length - 1) {
                await focusNavItem(0, queue);
                // Jump to next item
            }
            else {
                await focusNavItem(currentIndex + 1, queue);
            }
            break;
        // Up arrow
        case 'ArrowUp':
            event.preventDefault();
            // If on first item, jump to last item
            if (currentIndex - 1 < 0) {
                await focusNavItem(queue.length - 1, queue);
                // Jump to previous item
            }
            else {
                await focusNavItem(currentIndex - 1, queue);
            }
            break;
        // Right arrow
        case 'ArrowRight':
            event.preventDefault();
            if (activeElement.nodeName == 'GCDS-NAV-GROUP' &&
                !activeElement.hasAttribute('open')) {
                await toggleNavGroup(activeElement, nav);
            }
            break;
        // Left arrow || ESC
        case 'ArrowLeft':
        case 'Escape':
            event.preventDefault();
            // Currently focusing a gcds-nav-group
            if (activeElement.nodeName == 'GCDS-NAV-GROUP' &&
                activeElement.hasAttribute('open')) {
                await toggleNavGroup(activeElement, nav);
                // Currently focus within a gcds-nav-group
            }
            else if (activeElement.parentNode.nodeName == 'GCDS-NAV-GROUP') {
                await toggleNavGroup(activeElement.parentNode, nav);
            }
            else if (activeElement.parentNode == nav &&
                (await activeElement.parentNode.getNavSize()) == 'mobile') {
                await toggleNavGroup(queue[queue.length - 1], nav);
            }
            break;
        // Tab - only in top-nav
        case 'Tab':
            if (nav.nodeName != 'GCDS-SIDE-NAV') {
                // On open nav trigger
                if (activeElement.nodeName == 'GCDS-NAV-GROUP' &&
                    activeElement.hasAttribute('open')) {
                    event.preventDefault();
                    await toggleNavGroup(activeElement, nav);
                    // In open nav group
                }
                else if (activeElement.parentNode.nodeName == 'GCDS-NAV-GROUP') {
                    event.preventDefault();
                    await toggleNavGroup(activeElement.parentNode, nav);
                }
            }
            break;
        // ENTER || SPACEBAR
        case 'Enter':
        case ' ':
            if (activeElement.nodeName == 'GCDS-NAV-GROUP') {
                event.preventDefault();
                await toggleNavGroup(activeElement, nav);
            }
            break;
    }
}
/**
 * Focus nav element
 * @param {Number} index
 * @param {any[]} queue
 */
async function focusNavItem(index, queue) {
    if (queue[index].nodeName == 'GCDS-NAV-LINK') {
        queue[index].focusLink();
    }
    else if (queue[index].nodeName == 'GCDS-NAV-GROUP') {
        queue[index].focusTrigger();
    }
}
/**
 *
 * @param {Element} group
 * @param {Element} nav
 */
async function toggleNavGroup(group, nav) {
    const navGroup = group;
    // Close nav group
    if (navGroup.hasAttribute('open')) {
        await navGroup.toggleNav();
        navGroup.focusTrigger();
        nav.updateNavItemQueue(nav);
        // Open nav group
    }
    else {
        await navGroup.toggleNav();
        setTimeout(async () => {
            await focusNavItem(0, document.activeElement == nav ? nav.children : navGroup.children);
        }, 10);
        if (nav.nodeName == 'GCDS-SIDE-NAV') {
            nav.updateNavItemQueue(nav);
        }
        else {
            nav.updateNavItemQueue(document.activeElement == nav ? nav : navGroup, document.activeElement == nav ? false : true);
        }
    }
}
/**
 * Return array of child elements of passed element
 * @param {Element} el
 * @return {any[]} indexedItems
 */
async function getNavItems(el) {
    const indexedItems = Array.from(el.children);
    indexedItems.forEach(async (item) => {
        if (item.nodeName == 'GCDS-NAV-GROUP' &&
            item.open) {
            const groupChildren = await getNavItems(item);
            indexedItems.splice(indexedItems.indexOf(item) + 1, 0, ...groupChildren);
        }
    });
    return indexedItems;
}

const I18N$6 = {
  en: {
    closeTrigger: 'Close',
    menuLabel: 'Menu',
    navLabel:
      ' - Use the enter key to select a menu item and travel to its page. Use the left and right arrow keys to navigate between menu and submenu items. Use the right arrow key to open submenus when they are available. Use the left arrow or escape keys to close a menu.',
  },
  fr: {
    closeTrigger: 'Fermer',
    menuLabel: 'Menu',
    navLabel:
      " - Utiliser la touche d'entrée pour sélectionner un élément du menu et voyager à la page indiquée. Utiliser les flèches gauches et droites pour naviguer entre les éléments et les sous-éléments du menu. Ouvrir les sous-éléments du menu avec la flèche droite lorsqu'il sont disponible. Fermer le menu avec la flèche gauche ou la touche d'échappement.",
  },
};

const gcdsSideNavCss = "@layer reset, default, desktop, mobile;@layer reset{:host{display:block}:host *{box-sizing:border-box;margin:0;padding:0}}@layer default{:host{width:100%}:host .gcds-side-nav__heading{font:var(--gcds-side-nav-heading-font);margin-block-end:var(--gcds-side-nav-heading-margin);padding:var(--gcds-side-nav-heading-padding)}}@layer desktop{@media only screen and (width >= 64em){:host .gcds-side-nav{max-width:var(--gcds-side-nav-max-width)}}}@layer mobile{@media only screen and (width < 64em){:host .gcds-side-nav__heading{display:block;height:0;margin:0;overflow:hidden;padding:0;width:0}}}";
const GcdsSideNavStyle0 = gcdsSideNavCss;

const GcdsSideNav = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.label = undefined;
        this.lang = undefined;
        this.navItems = [];
        this.navSize = undefined;
    }
    async focusInListener(e) {
        if (this.el.contains(e.target) && !this.navSize) {
            const mediaQuery = window.matchMedia('screen and (min-width: 64em)');
            const nav = this.el;
            const mobileTrigger = this.mobile;
            if (mediaQuery.matches) {
                this.navSize = 'desktop';
            }
            else {
                this.navSize = 'mobile';
            }
            await this.updateNavItemQueue(this.el);
            mediaQuery.addEventListener('change', async function (e) {
                if (e.matches) {
                    nav.updateNavSize('desktop');
                    await nav.updateNavItemQueue(nav);
                    if (mobileTrigger.hasAttribute('open')) {
                        mobileTrigger.toggleNav();
                    }
                }
                else {
                    nav.updateNavSize('mobile');
                    await nav.updateNavItemQueue(nav);
                }
            });
        }
    }
    async focusOutListener(e) {
        if (!this.el.contains(e.relatedTarget)) {
            if (this.navSize == 'mobile') {
                if (this.mobile.hasAttribute('open')) {
                    await this.mobile.toggleNav();
                }
            }
        }
    }
    async keyDownListener(e) {
        if (this.el.contains(document.activeElement)) {
            handleKeyDownNav(e, this.el, this.navItems);
        }
    }
    async gcdsClickListener(e) {
        if (this.el.contains(e.target)) {
            // Update tab queue when clicking mobile menu
            if (e.target == this.el && this.navSize == 'mobile') {
                await this.updateNavItemQueue(e.target);
                // Update tab queue when clicking dropdown
            }
            else if (e.target.nodeName == 'GCDS-NAV-GROUP' &&
                !e.target.hasAttribute('open')) {
                await this.updateNavItemQueue(this.el);
            }
        }
    }
    /*
     * Observe lang attribute change
     */
    updateLang() {
        const observer = new MutationObserver(mutations => {
            if (mutations[0].oldValue != this.el.lang) {
                this.lang = this.el.lang;
            }
        });
        observer.observe(this.el, observerConfig);
    }
    /*
     * Get current navSize state
     */
    async getNavSize() {
        return this.navSize;
    }
    /*
     * Pass new window size: desktop or mobile
     */
    async updateNavSize(size) {
        this.navSize = size;
    }
    /*
     * Update item queue for keyboard navigation based on passed element
     */
    async updateNavItemQueue(el, includeElement) {
        if (includeElement) {
            const childElements = await getNavItems(el);
            this.navItems = [el, ...childElements];
        }
        else {
            this.navItems = await getNavItems(el);
        }
        if (this.navSize == 'mobile') {
            this.navItems = [...this.navItems, this.mobile];
        }
    }
    async componentWillLoad() {
        // Define lang attribute
        this.lang = assignLanguage(this.el);
        this.updateLang();
    }
    render() {
        const { label, lang } = this;
        return (index.h(index.Host, null, index.h("nav", { "aria-label": `${label}${I18N$6[lang].navLabel}`, class: "gcds-side-nav" }, index.h("h2", { class: "gcds-side-nav__heading" }, label), index.h("ul", null, index.h("gcds-nav-group", { menuLabel: I18N$6[lang].menuLabel, closeTrigger: I18N$6[lang].closeTrigger, openTrigger: I18N$6[lang].menuLabel, class: "gcds-mobile-nav", ref: element => (this.mobile = element), lang: lang }, index.h("slot", null))))));
    }
    get el() { return index.getElement(this); }
};
GcdsSideNav.style = GcdsSideNavStyle0;

const I18N$5 = {
  en: {
    link: 'https://canada.ca/en.html',
  },
  fr: {
    link: 'https://canada.ca/fr.html',
  },
};

const SignatureEn = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 819 75.97" preserveAspectRatio="xMinYMin meet" role="img" aria-labelledby="signature-en-title">
	<title id="signature-en-title">Government of Canada</title>
	<path d="M0,0 36.84,0 36.84,75.01 0,75.01z M118.54,0 155.38,0 155.38,75.01 118.54,75.01z M72.58,15.61,77.84,4.9l5.22,10.32c.65,1.09,1.18,1,2.22.48l4.49-2.22L86.85,27.89c-.61,2.83,1,3.66,2.75,1.74L96,22.79l1.7,3.87c.57,1.17,1.43,1,2.57.79l6.61-1.39-2.22,8.35,0,.18c-.26,1.09-.78,2,.44,2.53l2.35,1.17L93.77,49.82c-1.39,1.43-.91,1.87-.39,3.48l1.26,3.87-12.71-2.3c-1.57-.39-2.66-.39-2.7.87l.52,14.58H75.93l.52-14.54c0-1.43-1.09-1.39-3.66-.86L61,57.18l1.52-3.87c.52-1.48.66-2.48-.52-3.48L48.11,38.46l2.57-1.57c.74-.57.78-1.17.39-2.44L48.46,26l6.7,1.43c1.87.44,2.39,0,2.87-1l1.87-3.83L66.52,30c1.17,1.39,2.83.48,2.31-1.52L65.65,12.86l4.92,2.83c.78.48,1.61.61,2.09-.3" class="fip_flag" />
	<path d="M29.4,31.73h-3.46l-.82-3.63c-2.9,3.29-5.53,4.37-9.3,4.37-9.25,0-14.79-7.35-14.79-16.17S6.57.12,15.82.12c6.75,0,12.41,3.59,13.23,10.55h-5.27c-.52-4.06-4.06-6.14-8-6.14-6.62,0-9.38,5.84-9.38,11.76s2.77,11.76,9.38,11.76c5.53.08,8.56-3.24,8.65-8.48h-8.21V15.47H29.4ZM44.83,28.44c-4.41,0-6.36-4-6.36-7.91s1.95-7.87,6.36-7.87,6.36,4,6.36,7.87S49.24,28.44,44.83,28.44Zm0,3.89c7.18,0,11.29-4.93,11.29-11.8S52,8.77,44.83,8.77s-11.29,4.93-11.29,11.76S37.65,32.34,44.83,32.34ZM58,9.38h5.36L69,26.54h.09l5.45-17.17h5.1l-8,22.35h-5.53ZM86.51,18.58a5.84,5.84,0,0,1,5.88-5.92c3.33,0,5.45,2.81,5.62,5.92Zm16.43,3.25c.82-6.7-3.5-13.06-10.55-13.06-6.66,0-10.81,5.45-10.81,11.8,0,6.87,3.94,11.76,10.94,11.76,4.89,0,9-2.72,10.12-7.61H98c-.87,2.47-2.59,3.72-5.45,3.72-4.11,0-6-3.11-6-6.62ZM106.7,9.38h4.63V13.7h.09a7.21,7.21,0,0,1,6.53-4.93,11.69,11.69,0,0,1,1.86.13v4.76a17.6,17.6,0,0,0-2.12-.22c-3.37,0-6.05,2.72-6.05,7.65V31.73H106.7V9.38ZM121.92,9.38h4.67v3.29l.09.09a8,8,0,0,1,7-4c4.84,0,7.91,2.59,7.91,7.61V31.73h-4.93V17.68c-.09-3.5-1.47-5-4.37-5-3.29,0-5.41,2.59-5.41,5.88V31.73h-4.93V9.38ZM146.74,9.38h4.67v3.11h.13a7.47,7.47,0,0,1,6.87-3.72c2.72,0,5.28,1.17,6.27,3.72a8.07,8.07,0,0,1,7-3.72c4.71,0,7.48,2.08,7.48,7.52V31.73h-4.93V18.67c0-3.55-.22-6-4.06-6-3.33,0-4.76,2.21-4.76,6v13.1h-4.93V17.38c0-3.07-1-4.71-3.93-4.71-2.55,0-4.89,2.08-4.89,5.79V31.73h-4.93V9.38ZM188.21,18.58a5.84,5.84,0,0,1,5.88-5.92c3.33,0,5.45,2.81,5.62,5.92Zm16.43,3.25c.82-6.7-3.5-13.06-10.55-13.06-6.66,0-10.81,5.45-10.81,11.8,0,6.87,3.93,11.76,10.94,11.76,4.89,0,9-2.72,10.12-7.61h-4.67c-.86,2.47-2.59,3.72-5.45,3.72-4.11,0-6-3.11-6-6.62ZM208.4,9.38h4.67v3.29l.09.09a8,8,0,0,1,7-4c4.84,0,7.91,2.59,7.91,7.61V31.73H223.1V17.68c-.09-3.5-1.47-5-4.37-5-3.29,0-5.41,2.59-5.41,5.88V31.73H208.4V9.38ZM231,9.38h3.71V2.67h4.93v6.7h4.45v3.68h-4.45V25c0,2,.17,3.07,2.38,3.07a8.25,8.25,0,0,0,2.08-.18v3.81c-1.08.08-2.12.26-3.2.26-5.15,0-6.1-2-6.19-5.71V13.05H231V9.38ZM12,71.68c-4.41,0-6.36-4-6.36-7.91S7.6,55.9,12,55.9s6.36,4,6.36,7.87S16.43,71.68,12,71.68Zm0,3.89c7.18,0,11.28-4.93,11.28-11.8S19.19,52,12,52s-11.29,4.93-11.29,11.76S4.83,75.57,12,75.57ZM25.2,52.61h3.67V50.76c0-5.71,3-6.66,6.18-6.66a13.89,13.89,0,0,1,3.46.3v3.85a8.32,8.32,0,0,0-2.29-.26c-1.34,0-2.42.48-2.42,2.33v2.29H38v3.68H33.8V75h-4.93V56.29H25.2ZM74.58,53.91c-.91-3.55-3.2-6.14-7.7-6.14-6.62,0-9.38,5.84-9.38,11.76s2.77,11.76,9.38,11.76c4.8,0,7.44-3.59,7.87-8.09H80c-.43,7.39-5.66,12.5-13.14,12.5-9.25,0-14.79-7.35-14.79-16.17s5.54-16.17,14.79-16.17c7,0,12.45,3.89,13.1,10.55h-5.4ZM98.06,67.45c0,3.11-3.37,4.24-5.54,4.24-1.73,0-4.54-.65-4.54-2.85,0-2.59,1.9-3.37,4-3.72s4.54-.35,6.05-1.34Zm4.93-9c0-4.71-4.58-6.48-9-6.48-4.93,0-9.82,1.69-10.16,7.44h4.93C89,57,91,55.9,93.73,55.9c2,0,4.63.48,4.63,3,0,2.9-3.16,2.51-6.7,3.16-4.15.47-8.6,1.38-8.6,7,0,4.37,3.63,6.53,7.65,6.53a11.47,11.47,0,0,0,7.74-2.72c.39,2,1.82,2.72,3.8,2.72a12.36,12.36,0,0,0,3.11-.56V71.6a7.18,7.18,0,0,1-1.21.08c-.91,0-1.17-.47-1.17-1.69ZM108.3,52.61H113V55.9l.09.09a8,8,0,0,1,7-4c4.84,0,7.91,2.59,7.91,7.61V75H123V60.92c-.09-3.5-1.47-5-4.37-5-3.29,0-5.41,2.59-5.41,5.88V75H108.3V52.61ZM146.91,67.45c0,3.11-3.37,4.24-5.53,4.24-1.73,0-4.54-.65-4.54-2.85,0-2.59,1.9-3.37,4-3.72s4.54-.35,6.05-1.34Zm4.93-9c0-4.71-4.58-6.48-9-6.48-4.93,0-9.81,1.69-10.16,7.44h4.93c.22-2.42,2.16-3.54,4.93-3.54,2,0,4.63.48,4.63,3,0,2.9-3.16,2.51-6.7,3.16-4.15.47-8.6,1.38-8.6,7,0,4.37,3.63,6.53,7.65,6.53a11.47,11.47,0,0,0,7.74-2.72c.39,2,1.82,2.72,3.8,2.72a12.36,12.36,0,0,0,3.11-.56V71.6a7.19,7.19,0,0,1-1.21.08c-.91,0-1.17-.47-1.17-1.69ZM161,64c0-4,1.64-8.13,6.27-8.13,3.8,0,6.18,2.94,6.18,7.87,0,3.89-1.86,7.91-6.27,7.91S161,67.88,161,64ZM178.22,44.1h-4.93V55.51h-.09c-1.51-2.46-4.63-3.5-7.44-3.5-4.89,0-9.68,3.54-9.68,11.63,0,6.7,3.41,11.93,10.46,11.93,2.81,0,5.62-1.08,6.92-3.63h.09v3h4.67V44.1ZM197.37,67.45c0,3.11-3.37,4.24-5.54,4.24-1.73,0-4.54-.65-4.54-2.85,0-2.59,1.9-3.37,4-3.72s4.54-.35,6.05-1.34Zm4.93-9c0-4.71-4.58-6.48-9-6.48-4.93,0-9.82,1.69-10.16,7.44h4.93c.22-2.42,2.16-3.54,4.93-3.54,2,0,4.63.48,4.63,3,0,2.9-3.16,2.51-6.7,3.16-4.15.47-8.6,1.38-8.6,7,0,4.37,3.63,6.53,7.65,6.53a11.46,11.46,0,0,0,7.74-2.72c.39,2,1.82,2.72,3.8,2.72a12.35,12.35,0,0,0,3.11-.56V71.6a7.18,7.18,0,0,1-1.21.08c-.91,0-1.17-.47-1.17-1.69Z" class="fip_text" transform="translate(218,0)" />
	<path d="M29.47,32H26l-.82-3.63c-2.9,3.29-5.53,4.37-9.3,4.37-9.25,0-14.79-7.35-14.79-16.17S6.64.4,15.89.4C22.64.4,28.3,4,29.12,11h-5.27c-.52-4.06-4.06-6.14-8-6.14-6.62,0-9.38,5.84-9.38,11.76s2.77,11.76,9.38,11.76c5.53.09,8.56-3.24,8.65-8.47h-8.21V15.75h13.14V32ZM44.9,28.72c-4.41,0-6.36-4-6.36-7.91s1.95-7.87,6.36-7.87,6.36,4,6.36,7.87S49.31,28.72,44.9,28.72Zm0,3.89c7.18,0,11.29-4.93,11.29-11.8S52.08,9,44.9,9,33.62,14,33.62,20.81,37.73,32.61,44.9,32.61ZM79.93,32h-4.84V28.9H75a7.51,7.51,0,0,1-6.36,3.72c-5.84,0-8.34-2.94-8.34-8.78V9.65h4.93V23.36c0,3.94,1.6,5.36,4.28,5.36,4.11,0,5.49-2.63,5.49-6.1v-13h4.93V32ZM82.91,9.65h5.36l5.66,17.17H94l5.45-17.17h5.1l-8,22.35H91ZM111.4,18.86a5.84,5.84,0,0,1,5.88-5.92c3.33,0,5.45,2.81,5.62,5.92Zm16.43,3.24C128.66,15.4,124.33,9,117.28,9c-6.66,0-10.81,5.45-10.81,11.8,0,6.87,3.93,11.76,10.94,11.76,4.88,0,9-2.72,10.12-7.61h-4.67c-.86,2.47-2.59,3.72-5.45,3.72-4.11,0-6-3.11-6-6.62ZM131.6,9.65h4.63V14h.08A7.22,7.22,0,0,1,142.84,9a11.75,11.75,0,0,1,1.86.13v4.76a17.5,17.5,0,0,0-2.12-.22c-3.37,0-6.05,2.72-6.05,7.65V32H131.6V9.65ZM146.81,9.65h4.67v3.29l.09.09a8,8,0,0,1,7-4c4.85,0,7.91,2.59,7.91,7.61V32h-4.93V18c-.08-3.5-1.47-5-4.37-5-3.29,0-5.4,2.59-5.4,5.88V32h-4.93ZM175.48,18.86a5.84,5.84,0,0,1,5.88-5.92c3.33,0,5.45,2.81,5.62,5.92Zm16.43,3.24C192.73,15.4,188.41,9,181.36,9c-6.66,0-10.81,5.45-10.81,11.8,0,6.87,3.94,11.76,10.94,11.76,4.89,0,9-2.72,10.12-7.61h-4.67c-.87,2.47-2.6,3.72-5.45,3.72-4.11,0-6-3.11-6-6.62ZM195.67,9.65h4.67v3.11h.13A7.47,7.47,0,0,1,207.34,9c2.73,0,5.28,1.17,6.27,3.72a8.07,8.07,0,0,1,7-3.72c4.71,0,7.48,2.08,7.48,7.52V32h-4.93V19c0-3.55-.22-6-4.06-6-3.33,0-4.76,2.21-4.76,6V32h-4.93V17.65c0-3.07-1-4.71-3.93-4.71-2.55,0-4.88,2.08-4.88,5.79V32h-4.93V9.65ZM237.14,18.86A5.84,5.84,0,0,1,243,12.94c3.33,0,5.45,2.81,5.62,5.92Zm16.43,3.24C254.39,15.4,250.06,9,243,9c-6.66,0-10.81,5.45-10.81,11.8,0,6.87,3.93,11.76,10.94,11.76,4.88,0,9-2.72,10.12-7.61h-4.67c-.86,2.47-2.59,3.72-5.45,3.72-4.11,0-6-3.11-6-6.62ZM257.33,9.65H262v3.29l.09.09a8,8,0,0,1,7-4c4.85,0,7.91,2.59,7.91,7.61V32H272V18c-.08-3.5-1.47-5-4.37-5-3.29,0-5.41,2.59-5.41,5.88V32h-4.93ZM279.9,9.65h3.72V3h4.93v6.7H293v3.68h-4.45V25.27c0,2,.17,3.07,2.38,3.07a8.43,8.43,0,0,0,2.08-.17V32c-1.08.08-2.12.26-3.2.26-5.14,0-6.09-2-6.18-5.71V13.33h-3.72V9.65ZM5.69,64.31c0-4,1.64-8.13,6.27-8.13,3.8,0,6.18,2.94,6.18,7.87,0,3.89-1.86,7.91-6.27,7.91S5.69,68.15,5.69,64.31ZM22.9,44.37H18V55.79h-.09c-1.51-2.46-4.63-3.5-7.43-3.5-4.89,0-9.69,3.54-9.69,11.63,0,6.7,3.42,11.93,10.46,11.93,2.81,0,5.62-1.08,6.92-3.63h.08v3h4.67V44.37ZM47.89,75.25H43V72.13H43a7.51,7.51,0,0,1-6.36,3.72c-5.84,0-8.34-2.94-8.34-8.78V52.89h4.93V66.59c0,3.94,1.6,5.36,4.28,5.36,4.11,0,5.49-2.63,5.49-6.1v-13h4.93V75.25ZM86.63,54.19c-.91-3.55-3.2-6.14-7.7-6.14-6.62,0-9.38,5.84-9.38,11.76s2.77,11.76,9.38,11.76c4.8,0,7.43-3.58,7.87-8.08h5.28c-.43,7.39-5.66,12.5-13.14,12.5-9.25,0-14.79-7.35-14.79-16.17s5.53-16.17,14.79-16.17c7,0,12.45,3.89,13.1,10.55h-5.41ZM110.11,67.72c0,3.11-3.37,4.24-5.53,4.24-1.73,0-4.54-.65-4.54-2.85,0-2.59,1.9-3.37,4-3.72s4.54-.35,6.05-1.34v3.68Zm4.93-9c0-4.71-4.58-6.49-9-6.49-4.93,0-9.81,1.69-10.16,7.44h4.93c.22-2.42,2.17-3.55,4.93-3.55,2,0,4.63.48,4.63,3,0,2.9-3.16,2.51-6.7,3.16-4.15.47-8.6,1.38-8.6,7,0,4.37,3.63,6.53,7.65,6.53a11.46,11.46,0,0,0,7.74-2.72c.39,2,1.82,2.72,3.81,2.72a12.37,12.37,0,0,0,3.11-.56V71.88a7.21,7.21,0,0,1-1.21.08c-.91,0-1.17-.47-1.17-1.69V58.77ZM120.35,52.89H125v3.29l.09.09a8,8,0,0,1,7-4c4.85,0,7.91,2.59,7.91,7.61V75.25h-4.93V61.19c-.08-3.5-1.47-5-4.37-5-3.29,0-5.4,2.59-5.4,5.88V75.25h-4.93ZM159,67.72c0,3.11-3.37,4.24-5.54,4.24-1.73,0-4.54-.65-4.54-2.85,0-2.59,1.9-3.37,4-3.72S157.45,65,159,64v3.68Zm4.93-9c0-4.71-4.58-6.49-8.95-6.49-4.93,0-9.82,1.69-10.16,7.44h4.93c.22-2.42,2.16-3.55,4.93-3.55,2,0,4.62.48,4.62,3,0,2.9-3.16,2.51-6.7,3.16-4.15.47-8.61,1.38-8.61,7,0,4.37,3.64,6.53,7.65,6.53a11.46,11.46,0,0,0,7.74-2.72c.39,2,1.82,2.72,3.81,2.72a12.33,12.33,0,0,0,3.11-.56V71.88a7.17,7.17,0,0,1-1.21.08c-.91,0-1.17-.47-1.17-1.69V58.77ZM173.06,64.31c0-4,1.64-8.13,6.27-8.13,3.8,0,6.18,2.94,6.18,7.87,0,3.89-1.86,7.91-6.27,7.91S173.06,68.15,173.06,64.31Zm17.21-19.93h-4.93V55.79h-.09c-1.51-2.46-4.62-3.5-7.43-3.5-4.89,0-9.68,3.54-9.68,11.63,0,6.7,3.42,11.93,10.46,11.93,2.81,0,5.62-1.08,6.92-3.63h.09v3h4.67V44.37ZM209.42,67.72c0,3.11-3.37,4.24-5.53,4.24-1.73,0-4.54-.65-4.54-2.85,0-2.59,1.9-3.37,4-3.72s4.54-.35,6.05-1.34v3.68Zm4.93-9c0-4.71-4.58-6.49-8.95-6.49-4.93,0-9.82,1.69-10.16,7.44h4.93c.22-2.42,2.16-3.55,4.93-3.55,2,0,4.62.48,4.62,3,0,2.9-3.16,2.51-6.7,3.16-4.15.47-8.61,1.38-8.61,7,0,4.37,3.64,6.53,7.65,6.53a11.47,11.47,0,0,0,7.74-2.72c.39,2,1.82,2.72,3.8,2.72a12.34,12.34,0,0,0,3.11-.56V71.88a7.18,7.18,0,0,1-1.21.08c-.91,0-1.17-.47-1.17-1.69V58.77Z" class="fip_text" transform="translate(526,0)" />
</svg>
`;

const SignatureFr = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 819 75.97" preserveAspectRatio="xMinYMin meet" role="img" aria-labelledby="signature-fr-title">
	<title id="signature-fr-title">Gouvernement du Canada</title>
	<path d="M0,0 36.84,0 36.84,75.01 0,75.01z M118.54,0 155.38,0 155.38,75.01 118.54,75.01z M72.58,15.61,77.84,4.9l5.22,10.32c.65,1.09,1.18,1,2.22.48l4.49-2.22L86.85,27.89c-.61,2.83,1,3.66,2.75,1.74L96,22.79l1.7,3.87c.57,1.17,1.43,1,2.57.79l6.61-1.39-2.22,8.35,0,.18c-.26,1.09-.78,2,.44,2.53l2.35,1.17L93.77,49.82c-1.39,1.43-.91,1.87-.39,3.48l1.26,3.87-12.71-2.3c-1.57-.39-2.66-.39-2.7.87l.52,14.58H75.93l.52-14.54c0-1.43-1.09-1.39-3.66-.86L61,57.18l1.52-3.87c.52-1.48.66-2.48-.52-3.48L48.11,38.46l2.57-1.57c.74-.57.78-1.17.39-2.44L48.46,26l6.7,1.43c1.87.44,2.39,0,2.87-1l1.87-3.83L66.52,30c1.17,1.39,2.83.48,2.31-1.52L65.65,12.86l4.92,2.83c.78.48,1.61.61,2.09-.3" class="fip_flag" />
	<path d="M29.47,32H26l-.82-3.63c-2.9,3.29-5.53,4.37-9.3,4.37-9.25,0-14.79-7.35-14.79-16.17S6.64.4,15.89.4C22.64.4,28.3,4,29.12,11h-5.27c-.52-4.06-4.06-6.14-8-6.14-6.62,0-9.38,5.84-9.38,11.76s2.77,11.76,9.38,11.76c5.53.09,8.56-3.24,8.65-8.47h-8.21V15.75h13.14V32ZM44.9,28.72c-4.41,0-6.36-4-6.36-7.91s1.95-7.87,6.36-7.87,6.36,4,6.36,7.87S49.31,28.72,44.9,28.72Zm0,3.89c7.18,0,11.29-4.93,11.29-11.8S52.08,9,44.9,9,33.62,14,33.62,20.81,37.73,32.61,44.9,32.61ZM79.93,32h-4.84V28.9H75a7.51,7.51,0,0,1-6.36,3.72c-5.84,0-8.34-2.94-8.34-8.78V9.65h4.93V23.36c0,3.94,1.6,5.36,4.28,5.36,4.11,0,5.49-2.63,5.49-6.1v-13h4.93V32ZM82.91,9.65h5.36l5.66,17.17H94l5.45-17.17h5.1l-8,22.35H91ZM111.4,18.86a5.84,5.84,0,0,1,5.88-5.92c3.33,0,5.45,2.81,5.62,5.92Zm16.43,3.24C128.66,15.4,124.33,9,117.28,9c-6.66,0-10.81,5.45-10.81,11.8,0,6.87,3.93,11.76,10.94,11.76,4.88,0,9-2.72,10.12-7.61h-4.67c-.86,2.47-2.59,3.72-5.45,3.72-4.11,0-6-3.11-6-6.62ZM131.6,9.65h4.63V14h.08A7.22,7.22,0,0,1,142.84,9a11.75,11.75,0,0,1,1.86.13v4.76a17.5,17.5,0,0,0-2.12-.22c-3.37,0-6.05,2.72-6.05,7.65V32H131.6V9.65ZM146.81,9.65h4.67v3.29l.09.09a8,8,0,0,1,7-4c4.85,0,7.91,2.59,7.91,7.61V32h-4.93V18c-.08-3.5-1.47-5-4.37-5-3.29,0-5.4,2.59-5.4,5.88V32h-4.93ZM175.48,18.86a5.84,5.84,0,0,1,5.88-5.92c3.33,0,5.45,2.81,5.62,5.92Zm16.43,3.24C192.73,15.4,188.41,9,181.36,9c-6.66,0-10.81,5.45-10.81,11.8,0,6.87,3.94,11.76,10.94,11.76,4.89,0,9-2.72,10.12-7.61h-4.67c-.87,2.47-2.6,3.72-5.45,3.72-4.11,0-6-3.11-6-6.62ZM195.67,9.65h4.67v3.11h.13A7.47,7.47,0,0,1,207.34,9c2.73,0,5.28,1.17,6.27,3.72a8.07,8.07,0,0,1,7-3.72c4.71,0,7.48,2.08,7.48,7.52V32h-4.93V19c0-3.55-.22-6-4.06-6-3.33,0-4.76,2.21-4.76,6V32h-4.93V17.65c0-3.07-1-4.71-3.93-4.71-2.55,0-4.88,2.08-4.88,5.79V32h-4.93V9.65ZM237.14,18.86A5.84,5.84,0,0,1,243,12.94c3.33,0,5.45,2.81,5.62,5.92Zm16.43,3.24C254.39,15.4,250.06,9,243,9c-6.66,0-10.81,5.45-10.81,11.8,0,6.87,3.93,11.76,10.94,11.76,4.88,0,9-2.72,10.12-7.61h-4.67c-.86,2.47-2.59,3.72-5.45,3.72-4.11,0-6-3.11-6-6.62ZM257.33,9.65H262v3.29l.09.09a8,8,0,0,1,7-4c4.85,0,7.91,2.59,7.91,7.61V32H272V18c-.08-3.5-1.47-5-4.37-5-3.29,0-5.41,2.59-5.41,5.88V32h-4.93ZM279.9,9.65h3.72V3h4.93v6.7H293v3.68h-4.45V25.27c0,2,.17,3.07,2.38,3.07a8.43,8.43,0,0,0,2.08-.17V32c-1.08.08-2.12.26-3.2.26-5.14,0-6.09-2-6.18-5.71V13.33h-3.72V9.65ZM5.69,64.31c0-4,1.64-8.13,6.27-8.13,3.8,0,6.18,2.94,6.18,7.87,0,3.89-1.86,7.91-6.27,7.91S5.69,68.15,5.69,64.31ZM22.9,44.37H18V55.79h-.09c-1.51-2.46-4.63-3.5-7.43-3.5-4.89,0-9.69,3.54-9.69,11.63,0,6.7,3.42,11.93,10.46,11.93,2.81,0,5.62-1.08,6.92-3.63h.08v3h4.67V44.37ZM47.89,75.25H43V72.13H43a7.51,7.51,0,0,1-6.36,3.72c-5.84,0-8.34-2.94-8.34-8.78V52.89h4.93V66.59c0,3.94,1.6,5.36,4.28,5.36,4.11,0,5.49-2.63,5.49-6.1v-13h4.93V75.25ZM86.63,54.19c-.91-3.55-3.2-6.14-7.7-6.14-6.62,0-9.38,5.84-9.38,11.76s2.77,11.76,9.38,11.76c4.8,0,7.43-3.58,7.87-8.08h5.28c-.43,7.39-5.66,12.5-13.14,12.5-9.25,0-14.79-7.35-14.79-16.17s5.53-16.17,14.79-16.17c7,0,12.45,3.89,13.1,10.55h-5.41ZM110.11,67.72c0,3.11-3.37,4.24-5.53,4.24-1.73,0-4.54-.65-4.54-2.85,0-2.59,1.9-3.37,4-3.72s4.54-.35,6.05-1.34v3.68Zm4.93-9c0-4.71-4.58-6.49-9-6.49-4.93,0-9.81,1.69-10.16,7.44h4.93c.22-2.42,2.17-3.55,4.93-3.55,2,0,4.63.48,4.63,3,0,2.9-3.16,2.51-6.7,3.16-4.15.47-8.6,1.38-8.6,7,0,4.37,3.63,6.53,7.65,6.53a11.46,11.46,0,0,0,7.74-2.72c.39,2,1.82,2.72,3.81,2.72a12.37,12.37,0,0,0,3.11-.56V71.88a7.21,7.21,0,0,1-1.21.08c-.91,0-1.17-.47-1.17-1.69V58.77ZM120.35,52.89H125v3.29l.09.09a8,8,0,0,1,7-4c4.85,0,7.91,2.59,7.91,7.61V75.25h-4.93V61.19c-.08-3.5-1.47-5-4.37-5-3.29,0-5.4,2.59-5.4,5.88V75.25h-4.93ZM159,67.72c0,3.11-3.37,4.24-5.54,4.24-1.73,0-4.54-.65-4.54-2.85,0-2.59,1.9-3.37,4-3.72S157.45,65,159,64v3.68Zm4.93-9c0-4.71-4.58-6.49-8.95-6.49-4.93,0-9.82,1.69-10.16,7.44h4.93c.22-2.42,2.16-3.55,4.93-3.55,2,0,4.62.48,4.62,3,0,2.9-3.16,2.51-6.7,3.16-4.15.47-8.61,1.38-8.61,7,0,4.37,3.64,6.53,7.65,6.53a11.46,11.46,0,0,0,7.74-2.72c.39,2,1.82,2.72,3.81,2.72a12.33,12.33,0,0,0,3.11-.56V71.88a7.17,7.17,0,0,1-1.21.08c-.91,0-1.17-.47-1.17-1.69V58.77ZM173.06,64.31c0-4,1.64-8.13,6.27-8.13,3.8,0,6.18,2.94,6.18,7.87,0,3.89-1.86,7.91-6.27,7.91S173.06,68.15,173.06,64.31Zm17.21-19.93h-4.93V55.79h-.09c-1.51-2.46-4.62-3.5-7.43-3.5-4.89,0-9.68,3.54-9.68,11.63,0,6.7,3.42,11.93,10.46,11.93,2.81,0,5.62-1.08,6.92-3.63h.09v3h4.67V44.37ZM209.42,67.72c0,3.11-3.37,4.24-5.53,4.24-1.73,0-4.54-.65-4.54-2.85,0-2.59,1.9-3.37,4-3.72s4.54-.35,6.05-1.34v3.68Zm4.93-9c0-4.71-4.58-6.49-8.95-6.49-4.93,0-9.82,1.69-10.16,7.44h4.93c.22-2.42,2.16-3.55,4.93-3.55,2,0,4.62.48,4.62,3,0,2.9-3.16,2.51-6.7,3.16-4.15.47-8.61,1.38-8.61,7,0,4.37,3.64,6.53,7.65,6.53a11.47,11.47,0,0,0,7.74-2.72c.39,2,1.82,2.72,3.8,2.72a12.34,12.34,0,0,0,3.11-.56V71.88a7.18,7.18,0,0,1-1.21.08c-.91,0-1.17-.47-1.17-1.69V58.77Z" class="fip_text" transform="translate(218,0)" />
	<path d="M29.4,31.73h-3.46l-.82-3.63c-2.9,3.29-5.53,4.37-9.3,4.37-9.25,0-14.79-7.35-14.79-16.17S6.57.12,15.82.12c6.75,0,12.41,3.59,13.23,10.55h-5.27c-.52-4.06-4.06-6.14-8-6.14-6.62,0-9.38,5.84-9.38,11.76s2.77,11.76,9.38,11.76c5.53.08,8.56-3.24,8.65-8.48h-8.21V15.47H29.4ZM44.83,28.44c-4.41,0-6.36-4-6.36-7.91s1.95-7.87,6.36-7.87,6.36,4,6.36,7.87S49.24,28.44,44.83,28.44Zm0,3.89c7.18,0,11.29-4.93,11.29-11.8S52,8.77,44.83,8.77s-11.29,4.93-11.29,11.76S37.65,32.34,44.83,32.34ZM58,9.38h5.36L69,26.54h.09l5.45-17.17h5.1l-8,22.35h-5.53ZM86.51,18.58a5.84,5.84,0,0,1,5.88-5.92c3.33,0,5.45,2.81,5.62,5.92Zm16.43,3.25c.82-6.7-3.5-13.06-10.55-13.06-6.66,0-10.81,5.45-10.81,11.8,0,6.87,3.94,11.76,10.94,11.76,4.89,0,9-2.72,10.12-7.61H98c-.87,2.47-2.59,3.72-5.45,3.72-4.11,0-6-3.11-6-6.62ZM106.7,9.38h4.63V13.7h.09a7.21,7.21,0,0,1,6.53-4.93,11.69,11.69,0,0,1,1.86.13v4.76a17.6,17.6,0,0,0-2.12-.22c-3.37,0-6.05,2.72-6.05,7.65V31.73H106.7V9.38ZM121.92,9.38h4.67v3.29l.09.09a8,8,0,0,1,7-4c4.84,0,7.91,2.59,7.91,7.61V31.73h-4.93V17.68c-.09-3.5-1.47-5-4.37-5-3.29,0-5.41,2.59-5.41,5.88V31.73h-4.93V9.38ZM146.74,9.38h4.67v3.11h.13a7.47,7.47,0,0,1,6.87-3.72c2.72,0,5.28,1.17,6.27,3.72a8.07,8.07,0,0,1,7-3.72c4.71,0,7.48,2.08,7.48,7.52V31.73h-4.93V18.67c0-3.55-.22-6-4.06-6-3.33,0-4.76,2.21-4.76,6v13.1h-4.93V17.38c0-3.07-1-4.71-3.93-4.71-2.55,0-4.89,2.08-4.89,5.79V31.73h-4.93V9.38ZM188.21,18.58a5.84,5.84,0,0,1,5.88-5.92c3.33,0,5.45,2.81,5.62,5.92Zm16.43,3.25c.82-6.7-3.5-13.06-10.55-13.06-6.66,0-10.81,5.45-10.81,11.8,0,6.87,3.93,11.76,10.94,11.76,4.89,0,9-2.72,10.12-7.61h-4.67c-.86,2.47-2.59,3.72-5.45,3.72-4.11,0-6-3.11-6-6.62ZM208.4,9.38h4.67v3.29l.09.09a8,8,0,0,1,7-4c4.84,0,7.91,2.59,7.91,7.61V31.73H223.1V17.68c-.09-3.5-1.47-5-4.37-5-3.29,0-5.41,2.59-5.41,5.88V31.73H208.4V9.38ZM231,9.38h3.71V2.67h4.93v6.7h4.45v3.68h-4.45V25c0,2,.17,3.07,2.38,3.07a8.25,8.25,0,0,0,2.08-.18v3.81c-1.08.08-2.12.26-3.2.26-5.15,0-6.1-2-6.19-5.71V13.05H231V9.38ZM12,71.68c-4.41,0-6.36-4-6.36-7.91S7.6,55.9,12,55.9s6.36,4,6.36,7.87S16.43,71.68,12,71.68Zm0,3.89c7.18,0,11.28-4.93,11.28-11.8S19.19,52,12,52s-11.29,4.93-11.29,11.76S4.83,75.57,12,75.57ZM25.2,52.61h3.67V50.76c0-5.71,3-6.66,6.18-6.66a13.89,13.89,0,0,1,3.46.3v3.85a8.32,8.32,0,0,0-2.29-.26c-1.34,0-2.42.48-2.42,2.33v2.29H38v3.68H33.8V75h-4.93V56.29H25.2ZM74.58,53.91c-.91-3.55-3.2-6.14-7.7-6.14-6.62,0-9.38,5.84-9.38,11.76s2.77,11.76,9.38,11.76c4.8,0,7.44-3.59,7.87-8.09H80c-.43,7.39-5.66,12.5-13.14,12.5-9.25,0-14.79-7.35-14.79-16.17s5.54-16.17,14.79-16.17c7,0,12.45,3.89,13.1,10.55h-5.4ZM98.06,67.45c0,3.11-3.37,4.24-5.54,4.24-1.73,0-4.54-.65-4.54-2.85,0-2.59,1.9-3.37,4-3.72s4.54-.35,6.05-1.34Zm4.93-9c0-4.71-4.58-6.48-9-6.48-4.93,0-9.82,1.69-10.16,7.44h4.93C89,57,91,55.9,93.73,55.9c2,0,4.63.48,4.63,3,0,2.9-3.16,2.51-6.7,3.16-4.15.47-8.6,1.38-8.6,7,0,4.37,3.63,6.53,7.65,6.53a11.47,11.47,0,0,0,7.74-2.72c.39,2,1.82,2.72,3.8,2.72a12.36,12.36,0,0,0,3.11-.56V71.6a7.18,7.18,0,0,1-1.21.08c-.91,0-1.17-.47-1.17-1.69ZM108.3,52.61H113V55.9l.09.09a8,8,0,0,1,7-4c4.84,0,7.91,2.59,7.91,7.61V75H123V60.92c-.09-3.5-1.47-5-4.37-5-3.29,0-5.41,2.59-5.41,5.88V75H108.3V52.61ZM146.91,67.45c0,3.11-3.37,4.24-5.53,4.24-1.73,0-4.54-.65-4.54-2.85,0-2.59,1.9-3.37,4-3.72s4.54-.35,6.05-1.34Zm4.93-9c0-4.71-4.58-6.48-9-6.48-4.93,0-9.81,1.69-10.16,7.44h4.93c.22-2.42,2.16-3.54,4.93-3.54,2,0,4.63.48,4.63,3,0,2.9-3.16,2.51-6.7,3.16-4.15.47-8.6,1.38-8.6,7,0,4.37,3.63,6.53,7.65,6.53a11.47,11.47,0,0,0,7.74-2.72c.39,2,1.82,2.72,3.8,2.72a12.36,12.36,0,0,0,3.11-.56V71.6a7.19,7.19,0,0,1-1.21.08c-.91,0-1.17-.47-1.17-1.69ZM161,64c0-4,1.64-8.13,6.27-8.13,3.8,0,6.18,2.94,6.18,7.87,0,3.89-1.86,7.91-6.27,7.91S161,67.88,161,64ZM178.22,44.1h-4.93V55.51h-.09c-1.51-2.46-4.63-3.5-7.44-3.5-4.89,0-9.68,3.54-9.68,11.63,0,6.7,3.41,11.93,10.46,11.93,2.81,0,5.62-1.08,6.92-3.63h.09v3h4.67V44.1ZM197.37,67.45c0,3.11-3.37,4.24-5.54,4.24-1.73,0-4.54-.65-4.54-2.85,0-2.59,1.9-3.37,4-3.72s4.54-.35,6.05-1.34Zm4.93-9c0-4.71-4.58-6.48-9-6.48-4.93,0-9.82,1.69-10.16,7.44h4.93c.22-2.42,2.16-3.54,4.93-3.54,2,0,4.63.48,4.63,3,0,2.9-3.16,2.51-6.7,3.16-4.15.47-8.6,1.38-8.6,7,0,4.37,3.63,6.53,7.65,6.53a11.46,11.46,0,0,0,7.74-2.72c.39,2,1.82,2.72,3.8,2.72a12.35,12.35,0,0,0,3.11-.56V71.6a7.18,7.18,0,0,1-1.21.08c-.91,0-1.17-.47-1.17-1.69Z" class="fip_text" transform="translate(575,0)" />
</svg>
`;

const WordmarkEn = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 143 34" preserveAspectRatio="xMinYMin meet" role="img" aria-labelledby="wordmark-en-title">
	<title id="wordmark-en-title">Symbol of the Government of Canada</title>
	<g id="wmms" transform="translate(-1, -1)">
		<path class="fip_flag" d="M137.9,1.2h5.2v10.4h-5.2V1.2z M128.9,6.4l-0.3,0.1c0,0,1.8,1.5,1.8,1.6c0.1,0.1,0.2,0.1,0.1,0.4 c-0.1,0.3-0.2,0.6-0.2,0.6s1.6-0.3,1.8-0.4c0.2,0,0.3,0,0.3,0.2c0,0.2-0.1,1.9-0.1,1.9h0.5c0,0-0.1-1.8-0.1-1.9 c0-0.2,0.1-0.2,0.3-0.2c0.2,0,1.8,0.4,1.8,0.4s-0.1-0.4-0.2-0.6c-0.1-0.3,0-0.3,0.1-0.4c0.1-0.1,1.8-1.6,1.8-1.6l-0.3-0.1 c-0.2-0.1-0.1-0.2-0.1-0.3s0.3-1.1,0.3-1.1s-0.8,0.2-0.9,0.2c-0.1,0-0.2,0-0.2-0.1s-0.2-0.5-0.2-0.5s-0.9,1-1,1.1 c-0.2,0.2-0.4,0-0.3-0.2c0-0.2,0.5-2.3,0.5-2.3s-0.5,0.3-0.7,0.4s-0.3,0.1-0.3-0.1c-0.1-0.2-0.7-1.3-0.7-1.4c0,0-0.6,1.2-0.7,1.4 s-0.2,0.2-0.3,0.1c-0.2-0.1-0.7-0.4-0.7-0.4s0.5,2.1,0.5,2.3s-0.1,0.3-0.3,0.2l-1-1.1c0,0-0.1,0.3-0.2,0.4c0,0.1-0.1,0.2-0.2,0.1 c-0.2,0-1-0.2-1-0.2s0.3,1,0.4,1.1C129.1,6.1,129.1,6.3,128.9,6.4z M122.2,1.2h5.2v10.4h-5.2V1.2z"/>
		<path class="fip_text" d="M144.2,32.4c-0.4,0.9-1.2,1.2-1.7,1.2c-0.6,0-2.4-0.1-2.4-4.8c0,0,0-9.5,0-10.1c0-3.1-2.4-5.6-8.6-5.6 c-6.7,0-6.8,3.3-6.8,4.1c-0.1,0.9,0.4,1.9,2.1,1.9c1.5,0,1.9-1.7,2.1-2.3c0.2-0.7,0.3-2.7,3-2.7c2.3,0,3.7,2,3.8,4.9 c0,0.5,0,0.8,0,1.1c0,0.2,0,0.3,0,0.5l0,0l0,0v0.1c-0.2,1-0.7,1.5-1.6,1.9c-1.2,0.6-4.7,1.1-5.1,1.2c-1.4,0.3-5.3,1.3-5.2,5.4 c0.1,4,4.1,5.4,6.9,5.3c2.7-0.1,4.3-1.2,5-1.8c0.4-0.3,0.4-0.3,0.7,0.1c0.4,0.4,1.7,1.7,4.8,1.7c3.2,0,3.6-1.5,3.8-2 C145.1,32.2,144.4,31.9,144.2,32.4z M131.7,33.5c-2.8,0-3.5-2.3-3.5-3.5c0-1.1,0.6-3.4,3.4-5c0,0,1.3-0.8,3.8-1.8 c0.1,0,0.2,0,0.2,0s0.1,0.1,0.1,0.2l0,0l0,0v0.1l0,0l0,0v0.1l0,0l0,0l0,0v4.2C135.7,31.1,134.1,33.5,131.7,33.5z M122.5,33.4 c-0.4-0.1-2.9,0.2-2.9-7.4s0-23.9,0-23.9c0-0.3,0-1.1-0.9-1.1c-0.9,0-6.9,0.3-7.3,0.4c-0.4,0-0.7,0.5,0,0.5 c0.7,0.1,3.9,0.3,3.9,5.6c0,2.6,0,5.2,0,7.1c0,0.1,0,0.2,0,0.2c0,0.2,0,0.3-0.1,0.4c0,0,0,0,0,0.1l0,0c-0.1,0.1-0.2,0-0.5-0.2 c-0.5-0.4-2.8-1.8-5.7-1.8c-4.7,0-10.5,3.4-10.5,10.4c0,7.5,5.3,11.1,10.8,11.1c2.7,0,4.6-1.2,5.3-1.6c0.8-0.5,0.7-0.4,0.8,0.3 c0.1,0.5,0,1.5,1.4,1.4c1.5-0.2,5.1-0.6,5.8-0.7C123.3,33.9,123.1,33.5,122.5,33.4z M110.1,33.7c-4.4,0-6.7-5.2-6.7-10.2 c0-5.5,3.1-9.2,6.4-9c4.3,0.3,5.4,3.7,5.5,9.8c0,0.4,0,0.8,0,1.3C115.2,31.6,112.7,33.7,110.1,33.7z M98.4,32.4 c-0.4,0.9-1.2,1.2-1.7,1.2c-0.6,0-2.4-0.1-2.4-4.8c0,0,0-9.5,0-10.1c0-3.1-2.4-5.6-8.6-5.6c-6.7,0-6.8,3.3-6.8,4.1 c-0.1,0.9,0.4,1.9,2.1,1.9c1.5,0,1.9-1.7,2.1-2.3c0.2-0.7,0.3-2.7,3-2.7c2.3,0,3.8,2,3.8,5v0.1c0,0.1,0,0.2,0,0.2v0.3 c0,0.1,0,0.3,0,0.4c-0.1,1.5-0.5,2-1.7,2.6c-1.2,0.6-4.7,1.1-5.1,1.2c-1.4,0.3-5.3,1.3-5.2,5.4c0.1,4,4.1,5.4,6.9,5.3 c2.7-0.1,4.3-1.2,5-1.8c0.4-0.3,0.4-0.3,0.7,0.1c0.4,0.4,1.7,1.7,4.8,1.7c3.2,0,3.6-1.5,3.8-2C99.3,32.2,98.7,31.9,98.4,32.4z  M86,33.5c-2.8,0-3.5-2.3-3.5-3.5c0-1.1,0.6-3.4,3.4-5c0,0,1.3-0.8,3.8-1.8c0.1,0,0.2,0,0.2,0v0.1l0,0l0,0c0,0.1,0,0.2,0,0.4v-0.1 c0,0,0,0,0,0.1v4.2C89.9,31.1,88.3,33.5,86,33.5z M76.4,33.4c-0.8-0.2-2.2-1.1-2.2-5.5v-8c0-1.9,0.2-6.8-7.3-6.8 c-3.9,0-6.1,2-6.3,2.1c-0.3,0.3-0.5,0.4-0.6-0.1c-0.1-0.4-0.3-1-0.4-1.4c-0.1-0.3-0.3-0.6-1-0.5c-0.7,0.1-5.1,0.8-5.9,1 c-0.7,0.2-0.5,0.5,0,0.6c0.5,0.1,2.9,0.3,2.9,4.4s0,8.6,0,8.6c0,5-1,5.4-1.9,5.7c-1.2,0.3-0.6,0.7-0.1,0.7c0,0,8.9,0,9.1,0 c0.6,0,0.9-0.6-0.3-0.8c-1.2-0.2-2.3-0.9-2.3-4.8c0-0.4,0-4.7,0-5.5c0-2.1-0.5-8.5,5.3-8.6c4.1-0.1,4.5,3.3,4.5,5.5v8.5 c0,3.5-1,4.6-2.2,4.8c-1.1,0.2-0.9,0.7-0.3,0.7c0.2,0,9.3,0,9.3,0C77.2,34.2,77.7,33.7,76.4,33.4z M52.1,32.4 c-0.4,0.9-1.2,1.2-1.7,1.2c-0.6,0-2.4-0.1-2.4-4.8c0,0,0-9.5,0-10.1c0-3.1-2.4-5.6-8.6-5.6c-6.7,0-6.8,3.3-6.8,4.1 c-0.1,0.9,0.4,1.9,2.1,1.9c1.5,0,1.9-1.7,2.1-2.3c0.2-0.7,0.3-2.7,3-2.7c2.3,0,3.7,2,3.8,4.9c0,0.5,0,0.8,0,1.1 c0,0.2,0,0.4-0.1,0.5v0.1l0,0c-0.2,1-0.7,1.5-1.6,1.9c-1.2,0.6-4.7,1.1-5.1,1.2c-1.4,0.3-5.3,1.3-5.2,5.4c0.1,4,4.1,5.4,6.9,5.3 c2.7-0.1,4.3-1.2,5-1.8c0.4-0.3,0.4-0.3,0.7,0.1c0.4,0.4,1.7,1.7,4.8,1.7c3.2,0,3.6-1.5,3.8-2C53,32.2,52.3,31.9,52.1,32.4z  M39.6,33.5c-2.8,0-3.5-2.3-3.5-3.5s0.6-3.4,3.4-5c0,0,1.3-0.8,3.8-1.8c0.1,0,0.2,0,0.2,0s0.1,0.1,0.1,0.2l0,0l0,0l0,0 c0,0,0,0.1,0,0.2l0,0l0,0v0.1l0,0l0,0l0,0v4.2C43.6,31.1,42,33.5,39.6,33.5z M30,24.8c-1,3.2-2.9,8.4-9.8,8.6 C13,33.5,8.7,28.6,8.5,19.5C8.2,9.8,12.4,2.4,18.9,2.2c7.3-0.1,9.9,8.6,10,9.9c0.1,1,1.4,0.9,1.4-0.1c0-0.5-0.6-9.1-0.8-10.1 c-0.2-1-1-0.6-1.2-0.2C28.2,2,28.4,1.4,28,2.3c-0.4,0.9-1.5,0.4-1.9,0.3c-1.2-0.5-3.5-1.7-7.2-1.6c-8.5,0.2-17.2,6.5-17,17.5 c0.2,10.7,8.8,16.7,16.8,16.6c7.3-0.1,11.4-4.7,12.6-10C31.7,23.8,30.4,23.5,30,24.8z"/>
	</g>
</svg>`;

const WordmarkFr = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 143 34" preserveAspectRatio="xMinYMin meet" role="img" aria-labelledby="wordmark-fr-title">
	<title id="wordmark-fr-title">Symbole du Gouvernement du Canada</title>
	<g id="wmms" transform="translate(-1, -1)">
		<path class="fip_flag" d="M137.9,1.2h5.2v10.4h-5.2V1.2z M128.9,6.4l-0.3,0.1c0,0,1.8,1.5,1.8,1.6c0.1,0.1,0.2,0.1,0.1,0.4 c-0.1,0.3-0.2,0.6-0.2,0.6s1.6-0.3,1.8-0.4c0.2,0,0.3,0,0.3,0.2c0,0.2-0.1,1.9-0.1,1.9h0.5c0,0-0.1-1.8-0.1-1.9 c0-0.2,0.1-0.2,0.3-0.2c0.2,0,1.8,0.4,1.8,0.4s-0.1-0.4-0.2-0.6c-0.1-0.3,0-0.3,0.1-0.4c0.1-0.1,1.8-1.6,1.8-1.6l-0.3-0.1 c-0.2-0.1-0.1-0.2-0.1-0.3s0.3-1.1,0.3-1.1s-0.8,0.2-0.9,0.2c-0.1,0-0.2,0-0.2-0.1s-0.2-0.5-0.2-0.5s-0.9,1-1,1.1 c-0.2,0.2-0.4,0-0.3-0.2c0-0.2,0.5-2.3,0.5-2.3s-0.5,0.3-0.7,0.4s-0.3,0.1-0.3-0.1c-0.1-0.2-0.7-1.3-0.7-1.4c0,0-0.6,1.2-0.7,1.4 s-0.2,0.2-0.3,0.1c-0.2-0.1-0.7-0.4-0.7-0.4s0.5,2.1,0.5,2.3s-0.1,0.3-0.3,0.2l-1-1.1c0,0-0.1,0.3-0.2,0.4c0,0.1-0.1,0.2-0.2,0.1 c-0.2,0-1-0.2-1-0.2s0.3,1,0.4,1.1C129.1,6.1,129.1,6.3,128.9,6.4z M122.2,1.2h5.2v10.4h-5.2V1.2z"/>
		<path class="fip_text" d="M144.2,32.4c-0.4,0.9-1.2,1.2-1.7,1.2c-0.6,0-2.4-0.1-2.4-4.8c0,0,0-9.5,0-10.1c0-3.1-2.4-5.6-8.6-5.6 c-6.7,0-6.8,3.3-6.8,4.1c-0.1,0.9,0.4,1.9,2.1,1.9c1.5,0,1.9-1.7,2.1-2.3c0.2-0.7,0.3-2.7,3-2.7c2.3,0,3.7,2,3.8,4.9 c0,0.5,0,0.8,0,1.1c0,0.2,0,0.3,0,0.5l0,0l0,0v0.1c-0.2,1-0.7,1.5-1.6,1.9c-1.2,0.6-4.7,1.1-5.1,1.2c-1.4,0.3-5.3,1.3-5.2,5.4 c0.1,4,4.1,5.4,6.9,5.3c2.7-0.1,4.3-1.2,5-1.8c0.4-0.3,0.4-0.3,0.7,0.1c0.4,0.4,1.7,1.7,4.8,1.7c3.2,0,3.6-1.5,3.8-2 C145.1,32.2,144.4,31.9,144.2,32.4z M131.7,33.5c-2.8,0-3.5-2.3-3.5-3.5c0-1.1,0.6-3.4,3.4-5c0,0,1.3-0.8,3.8-1.8 c0.1,0,0.2,0,0.2,0s0.1,0.1,0.1,0.2l0,0l0,0v0.1l0,0l0,0v0.1l0,0l0,0l0,0v4.2C135.7,31.1,134.1,33.5,131.7,33.5z M122.5,33.4 c-0.4-0.1-2.9,0.2-2.9-7.4s0-23.9,0-23.9c0-0.3,0-1.1-0.9-1.1c-0.9,0-6.9,0.3-7.3,0.4c-0.4,0-0.7,0.5,0,0.5 c0.7,0.1,3.9,0.3,3.9,5.6c0,2.6,0,5.2,0,7.1c0,0.1,0,0.2,0,0.2c0,0.2,0,0.3-0.1,0.4c0,0,0,0,0,0.1l0,0c-0.1,0.1-0.2,0-0.5-0.2 c-0.5-0.4-2.8-1.8-5.7-1.8c-4.7,0-10.5,3.4-10.5,10.4c0,7.5,5.3,11.1,10.8,11.1c2.7,0,4.6-1.2,5.3-1.6c0.8-0.5,0.7-0.4,0.8,0.3 c0.1,0.5,0,1.5,1.4,1.4c1.5-0.2,5.1-0.6,5.8-0.7C123.3,33.9,123.1,33.5,122.5,33.4z M110.1,33.7c-4.4,0-6.7-5.2-6.7-10.2 c0-5.5,3.1-9.2,6.4-9c4.3,0.3,5.4,3.7,5.5,9.8c0,0.4,0,0.8,0,1.3C115.2,31.6,112.7,33.7,110.1,33.7z M98.4,32.4 c-0.4,0.9-1.2,1.2-1.7,1.2c-0.6,0-2.4-0.1-2.4-4.8c0,0,0-9.5,0-10.1c0-3.1-2.4-5.6-8.6-5.6c-6.7,0-6.8,3.3-6.8,4.1 c-0.1,0.9,0.4,1.9,2.1,1.9c1.5,0,1.9-1.7,2.1-2.3c0.2-0.7,0.3-2.7,3-2.7c2.3,0,3.8,2,3.8,5v0.1c0,0.1,0,0.2,0,0.2v0.3 c0,0.1,0,0.3,0,0.4c-0.1,1.5-0.5,2-1.7,2.6c-1.2,0.6-4.7,1.1-5.1,1.2c-1.4,0.3-5.3,1.3-5.2,5.4c0.1,4,4.1,5.4,6.9,5.3 c2.7-0.1,4.3-1.2,5-1.8c0.4-0.3,0.4-0.3,0.7,0.1c0.4,0.4,1.7,1.7,4.8,1.7c3.2,0,3.6-1.5,3.8-2C99.3,32.2,98.7,31.9,98.4,32.4z  M86,33.5c-2.8,0-3.5-2.3-3.5-3.5c0-1.1,0.6-3.4,3.4-5c0,0,1.3-0.8,3.8-1.8c0.1,0,0.2,0,0.2,0v0.1l0,0l0,0c0,0.1,0,0.2,0,0.4v-0.1 c0,0,0,0,0,0.1v4.2C89.9,31.1,88.3,33.5,86,33.5z M76.4,33.4c-0.8-0.2-2.2-1.1-2.2-5.5v-8c0-1.9,0.2-6.8-7.3-6.8 c-3.9,0-6.1,2-6.3,2.1c-0.3,0.3-0.5,0.4-0.6-0.1c-0.1-0.4-0.3-1-0.4-1.4c-0.1-0.3-0.3-0.6-1-0.5c-0.7,0.1-5.1,0.8-5.9,1 c-0.7,0.2-0.5,0.5,0,0.6c0.5,0.1,2.9,0.3,2.9,4.4s0,8.6,0,8.6c0,5-1,5.4-1.9,5.7c-1.2,0.3-0.6,0.7-0.1,0.7c0,0,8.9,0,9.1,0 c0.6,0,0.9-0.6-0.3-0.8c-1.2-0.2-2.3-0.9-2.3-4.8c0-0.4,0-4.7,0-5.5c0-2.1-0.5-8.5,5.3-8.6c4.1-0.1,4.5,3.3,4.5,5.5v8.5 c0,3.5-1,4.6-2.2,4.8c-1.1,0.2-0.9,0.7-0.3,0.7c0.2,0,9.3,0,9.3,0C77.2,34.2,77.7,33.7,76.4,33.4z M52.1,32.4 c-0.4,0.9-1.2,1.2-1.7,1.2c-0.6,0-2.4-0.1-2.4-4.8c0,0,0-9.5,0-10.1c0-3.1-2.4-5.6-8.6-5.6c-6.7,0-6.8,3.3-6.8,4.1 c-0.1,0.9,0.4,1.9,2.1,1.9c1.5,0,1.9-1.7,2.1-2.3c0.2-0.7,0.3-2.7,3-2.7c2.3,0,3.7,2,3.8,4.9c0,0.5,0,0.8,0,1.1 c0,0.2,0,0.4-0.1,0.5v0.1l0,0c-0.2,1-0.7,1.5-1.6,1.9c-1.2,0.6-4.7,1.1-5.1,1.2c-1.4,0.3-5.3,1.3-5.2,5.4c0.1,4,4.1,5.4,6.9,5.3 c2.7-0.1,4.3-1.2,5-1.8c0.4-0.3,0.4-0.3,0.7,0.1c0.4,0.4,1.7,1.7,4.8,1.7c3.2,0,3.6-1.5,3.8-2C53,32.2,52.3,31.9,52.1,32.4z  M39.6,33.5c-2.8,0-3.5-2.3-3.5-3.5s0.6-3.4,3.4-5c0,0,1.3-0.8,3.8-1.8c0.1,0,0.2,0,0.2,0s0.1,0.1,0.1,0.2l0,0l0,0l0,0 c0,0,0,0.1,0,0.2l0,0l0,0v0.1l0,0l0,0l0,0v4.2C43.6,31.1,42,33.5,39.6,33.5z M30,24.8c-1,3.2-2.9,8.4-9.8,8.6 C13,33.5,8.7,28.6,8.5,19.5C8.2,9.8,12.4,2.4,18.9,2.2c7.3-0.1,9.9,8.6,10,9.9c0.1,1,1.4,0.9,1.4-0.1c0-0.5-0.6-9.1-0.8-10.1 c-0.2-1-1-0.6-1.2-0.2C28.2,2,28.4,1.4,28,2.3c-0.4,0.9-1.5,0.4-1.9,0.3c-1.2-0.5-3.5-1.7-7.2-1.6c-8.5,0.2-17.2,6.5-17,17.5 c0.2,10.7,8.8,16.7,16.8,16.6c7.3-0.1,11.4-4.7,12.6-10C31.7,23.8,30.4,23.5,30,24.8z"/>
	</g>
</svg>`;

const gcdsSignatureCss = "@layer reset, default, type.signature, type.wordmark, variant.colour, variant.white, desktop;@layer reset{:host{display:block;width:fit-content}}@layer default{:host .gcds-signature{display:flex}:host svg{max-width:100%}:host svg .fip_flag{fill:var(--gcds-signature-color-flag)}}@layer type.signature{:host(:not([type=wordmark])) svg{height:var(--gcds-signature-signature-height)}}@layer type.wordmark{:host([type=wordmark]) svg{height:var(--gcds-signature-wordmark-height);width:auto}}@layer variant.colour{:host(:not([variant=white])) svg .fip_text{fill:var(--gcds-signature-color-text)}}@layer variant.white{:host([variant=white]) svg :is(.fip_text){fill:var(--gcds-signature-white-default)}}@layer desktop{@media screen and (width >= 64em){:host(:not([type=wordmark])) svg{height:2.125rem}}}";
const GcdsSignatureStyle0 = gcdsSignatureCss;

const GcdsSignature = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.type = 'signature';
        this.variant = 'colour';
        this.hasLink = false;
        this.lang = undefined;
    }
    validateType(newValue) {
        if (newValue != 'signature' && newValue != 'wordmark') {
            this.type = 'signature';
        }
    }
    validateVariant(newValue) {
        if (newValue != 'colour' && newValue != 'white') {
            this.variant = 'colour';
        }
    }
    /*
     * Observe lang attribute change
     */
    updateLang() {
        const observer = new MutationObserver(mutations => {
            if (mutations[0].oldValue != this.el.lang) {
                this.lang = this.el.lang;
            }
        });
        observer.observe(this.el, observerConfig);
    }
    async componentWillLoad() {
        // Define lang attribute
        this.lang = assignLanguage(this.el);
        this.updateLang();
    }
    get selectSVG() {
        switch (this.type) {
            case 'wordmark':
                if (this.lang == 'en') {
                    return WordmarkEn;
                }
                else {
                    return WordmarkFr;
                }
            case 'signature':
            default:
                if (this.lang == 'en') {
                    return SignatureEn;
                }
                else {
                    return SignatureFr;
                }
        }
    }
    render() {
        const { type, hasLink, lang, selectSVG } = this;
        return (index.h(index.Host, null, hasLink && type === 'signature' ? (
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        index.h("a", { class: "gcds-signature", href: I18N$5[lang].link, innerHTML: selectSVG })) : (index.h("div", { class: "gcds-signature", innerHTML: selectSVG }))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "type": ["validateType"],
        "variant": ["validateVariant"]
    }; }
};
GcdsSignature.style = GcdsSignatureStyle0;

const gcdsSrOnlyCss = "@layer reset, default;@layer reset{:host slot{display:initial}}@layer default{:host{display:inline-block;height:0;margin:0;overflow:hidden;width:0}}";
const GcdsSrOnlyStyle0 = gcdsSrOnlyCss;

const GcdsSrOnly = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
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
        return (index.h(index.Host, null, index.h(Tag, null, index.h("slot", null))));
    }
    static get watchers() { return {
        "tag": ["validateTag"]
    }; }
};
GcdsSrOnly.style = GcdsSrOnlyStyle0;

const I18N$4 = {
  en: {
    step: 'Step',
    of: 'of',
  },
  fr: {
    step: 'Étape',
    of: 'sur',
  },
};

const gcdsStepperCss = "@layer reset, default;@layer reset{:host{display:block}}@layer default{:host .gcds-stepper .gcds-stepper__steps{display:block;font:var(--gcds-stepper-font-desktop);margin:var(--gcds-stepper-margin-desktop)}@media only screen and (width < 48em){:host .gcds-stepper .gcds-stepper__steps{font:var(--gcds-stepper-font-mobile);margin:var(--gcds-stepper-margin-mobile)}}}";
const GcdsStepperStyle0 = gcdsStepperCss;

const GcdsStepper = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.currentStep = undefined;
        this.totalSteps = undefined;
        this.tag = 'h2';
        this.errors = [];
        this.lang = undefined;
    }
    validateCurrentStep() {
        if (this.currentStep <= 0 ||
            isNaN(this.currentStep) ||
            this.currentStep > this.totalSteps) {
            this.errors.push('currentStep');
        }
        else if (this.errors.includes('currentStep')) {
            this.errors.splice(this.errors.indexOf('currentStep'), 1);
        }
    }
    validateTotalSteps() {
        if (this.totalSteps <= 0 ||
            isNaN(this.totalSteps) ||
            this.totalSteps < this.currentStep) {
            this.errors.push('totalSteps');
        }
        else if (this.errors.includes('totalSteps')) {
            this.errors.splice(this.errors.indexOf('totalSteps'), 1);
        }
    }
    /*
     * Observe lang attribute change
     */
    updateLang() {
        const observer = new MutationObserver(mutations => {
            if (mutations[0].oldValue != this.el.lang) {
                this.lang = this.el.lang;
            }
        });
        observer.observe(this.el, observerConfig);
    }
    validateChildren() {
        if (this.el.innerHTML.trim() == '') {
            this.errors.push('children');
        }
        else if (this.errors.includes('children')) {
            this.errors.splice(this.errors.indexOf('children'), 1);
        }
    }
    validateRequiredProps() {
        this.validateCurrentStep();
        this.validateTotalSteps();
        this.validateChildren();
        if (this.errors.includes('totalSteps') ||
            this.errors.includes('currentStep') ||
            this.errors.includes('children')) {
            return false;
        }
        return true;
    }
    async componentWillLoad() {
        // Define lang attribute
        this.lang = assignLanguage(this.el);
        this.updateLang();
        let valid = this.validateRequiredProps();
        if (!valid) {
            logError('gcds-stepper', this.errors);
        }
    }
    render() {
        const { currentStep, lang, totalSteps, tag } = this;
        return (index.h(index.Host, null, this.validateRequiredProps() && (index.h("gcds-heading", { tag: tag, class: "gcds-stepper", "margin-top": "0", "margin-bottom": "300" }, index.h("span", { class: "gcds-stepper__steps" }, `${I18N$4[lang].step} ${currentStep} ${I18N$4[lang].of} ${totalSteps}`, index.h("gcds-sr-only", null, " : ")), index.h("slot", null)))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "currentStep": ["validateCurrentStep"],
        "totalSteps": ["validateTotalSteps"]
    }; }
};
GcdsStepper.style = GcdsStepperStyle0;

const gcdsTextCss = "@layer reset, default, display, limit, margin, role, size, style, weight;@layer reset{:host{color:var(--gcds-text-role-primary);display:block}:host .gcds-text{box-sizing:border-box;display:inherit;margin:0}:host .gcds-text slot{display:initial}}@layer default{:host .gcds-text{font:var(--gcds-text-size-body-desktop)}@media only screen and (width < 48em){:host .gcds-text{font:var(--gcds-text-size-body-mobile)}}}@layer display{:host.d-block{display:block}:host.d-flex{display:flex}:host.d-inline{display:inline}:host.d-inline-block{display:inline-block}:host.d-inline-flex{display:inline-flex}:host.d-none{display:none}}@layer limit{:host .gcds-text.limit{max-width:var(--gcds-text-character-limit)}}@layer margin{:host .gcds-text.mt-0{margin-block-start:var(--gcds-text-spacing-0)}:host .gcds-text.mt-50{margin-block-start:var(--gcds-text-spacing-50)}:host .gcds-text.mt-100{margin-block-start:var(--gcds-text-spacing-100)}:host .gcds-text.mt-150{margin-block-start:var(--gcds-text-spacing-150)}:host .gcds-text.mt-200{margin-block-start:var(--gcds-text-spacing-200)}:host .gcds-text.mt-250{margin-block-start:var(--gcds-text-spacing-250)}:host .gcds-text.mt-300{margin-block-start:var(--gcds-text-spacing-300)}:host .gcds-text.mt-400{margin-block-start:var(--gcds-text-spacing-400)}:host .gcds-text.mt-450{margin-block-start:var(--gcds-text-spacing-450)}:host .gcds-text.mt-500{margin-block-start:var(--gcds-text-spacing-500)}:host .gcds-text.mt-550{margin-block-start:var(--gcds-text-spacing-550)}:host .gcds-text.mt-600{margin-block-start:var(--gcds-text-spacing-600)}:host .gcds-text.mt-700{margin-block-start:var(--gcds-text-spacing-700)}:host .gcds-text.mt-800{margin-block-start:var(--gcds-text-spacing-800)}:host .gcds-text.mt-900{margin-block-start:var(--gcds-text-spacing-900)}:host .gcds-text.mt-1000{margin-block-start:var(--gcds-text-spacing-1000)}:host .gcds-text.mb-0{margin-block-end:var(--gcds-text-spacing-0)}:host .gcds-text.mb-50{margin-block-end:var(--gcds-text-spacing-50)}:host .gcds-text.mb-100{margin-block-end:var(--gcds-text-spacing-100)}:host .gcds-text.mb-150{margin-block-end:var(--gcds-text-spacing-150)}:host .gcds-text.mb-200{margin-block-end:var(--gcds-text-spacing-200)}:host .gcds-text.mb-250{margin-block-end:var(--gcds-text-spacing-250)}:host .gcds-text.mb-300{margin-block-end:var(--gcds-text-spacing-300)}:host .gcds-text.mb-400{margin-block-end:var(--gcds-text-spacing-400)}:host .gcds-text.mb-450{margin-block-end:var(--gcds-text-spacing-450)}:host .gcds-text.mb-500{margin-block-end:var(--gcds-text-spacing-500)}:host .gcds-text.mb-550{margin-block-end:var(--gcds-text-spacing-550)}:host .gcds-text.mb-600{margin-block-end:var(--gcds-text-spacing-600)}:host .gcds-text.mb-700{margin-block-end:var(--gcds-text-spacing-700)}:host .gcds-text.mb-800{margin-block-end:var(--gcds-text-spacing-800)}:host .gcds-text.mb-900{margin-block-end:var(--gcds-text-spacing-900)}:host .gcds-text.mb-1000{margin-block-end:var(--gcds-text-spacing-1000)}}@layer variants.role{:host .gcds-text.role-primary{color:var(--gcds-text-role-primary)}:host .gcds-text.role-secondary{color:var(--gcds-text-role-secondary)}:host .gcds-text.role-light{color:var(--gcds-text-role-light)}}@layer variants.size{:host .gcds-text :is(small,::slotted(small)){font:var(--gcds-text-size-caption-desktop)}@media only screen and (width < 48em){:host .gcds-text :is(small,::slotted(small)){font:var(--gcds-text-size-caption-mobile)}}}@layer variants.style{:host .gcds-text ::slotted(em){font-style:italic}}@layer variants.weight{:host .gcds-text ::slotted(strong){font-weight:var(--gcds-text-weight-bold)}}";
const GcdsTextStyle0 = gcdsTextCss;

const GcdsText = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.textRole = 'primary';
        this.characterLimit = true;
        this.display = 'block';
        this.marginTop = '0';
        this.marginBottom = '400';
        this.size = 'body';
    }
    validateTextRole(newValue) {
        const values = ['light', 'primary', 'secondary'];
        if (!values.includes(newValue)) {
            this.textRole = 'primary';
        }
    }
    validateDisplay(newValue) {
        const values = [
            'block',
            'flex',
            'inline',
            'inline-block',
            'inline-flex',
            'none',
        ];
        if (!values.includes(newValue)) {
            this.display = 'block';
        }
    }
    validateMarginTop(newValue) {
        const values = [
            '0',
            '50',
            '100',
            '150',
            '200',
            '250',
            '300',
            '400',
            '450',
            '500',
            '550',
            '600',
            '700',
            '800',
            '900',
            '1000',
        ];
        if (!values.includes(newValue)) {
            this.marginTop = '0';
        }
    }
    validateMarginBottom(newValue) {
        const values = [
            '0',
            '50',
            '100',
            '150',
            '200',
            '250',
            '300',
            '400',
            '450',
            '500',
            '550',
            '600',
            '700',
            '800',
            '900',
            '1000',
        ];
        if (!values.includes(newValue)) {
            this.marginBottom = '400';
        }
    }
    validateSize(newValue) {
        const values = ['body', 'caption'];
        if (!values.includes(newValue)) {
            this.size = 'body';
        }
    }
    componentWillLoad() {
        // Validate attributes and set defaults
        this.validateTextRole(this.textRole);
        this.validateDisplay(this.display);
        this.validateMarginTop(this.marginTop);
        this.validateMarginBottom(this.marginBottom);
        this.validateSize(this.size);
    }
    render() {
        const { characterLimit, display, marginTop, marginBottom, size, textRole } = this;
        return (index.h(index.Host, { class: `${display != 'block' ? `d-${display}` : ''}` }, index.h("p", { class: `
            gcds-text
            ${textRole ? `role-${textRole}` : ''}
            ${characterLimit ? 'limit' : ''}
            ${marginTop ? `mt-${marginTop}` : ''}
            ${marginBottom ? `mb-${marginBottom}` : ''}
          `, part: "text" }, size === 'caption' ? (index.h("small", null, index.h("slot", null))) : (index.h("slot", null)))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "textRole": ["validateTextRole"],
        "display": ["validateDisplay"],
        "marginTop": ["validateMarginTop"],
        "marginBottom": ["validateMarginBottom"],
        "size": ["validateSize"]
    }; }
};
GcdsText.style = GcdsTextStyle0;

const I18N$3 = {
  en: {
    characters: {
      allowed: 'characters allowed',
      left: 'characters left',
    },
  },
  fr: {
    characters: {
      allowed: 'caractères maximum',
      left: 'caractères restants',
    },
  },
};

const gcdsTextareaCss = "@layer reset, default, disabled, error, focus;@layer reset{:host{display:block}:host .gcds-textarea-wrapper{border:0;margin:0;padding:0}:host .gcds-textarea-wrapper textarea{box-sizing:border-box}}@layer default{:host .gcds-textarea-wrapper{color:var(--gcds-textarea-default-text);font:var(--gcds-textarea-font);max-width:75ch;transition:color .15s ease-in-out;width:100%}:host .gcds-textarea-wrapper textarea{background-color:var(--gcds-textarea-default-background);background-image:none;border:var(--gcds-textarea-border-width) solid;border-radius:var(--gcds-textarea-border-radius);color:var(--gcds-textarea-default-text);display:block;font:inherit;height:auto;margin:var(--gcds-textarea-margin)!important;max-width:100%;min-height:var(--gcds-textarea-min-height);min-width:50%;padding:var(--gcds-textarea-padding)!important;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out,outline .15s ease-in-out;width:100%}}@layer disabled{:host .gcds-textarea-wrapper.gcds-disabled{color:var(--gcds-textarea-disabled-text)}:host .gcds-textarea-wrapper.gcds-disabled textarea:disabled{background-color:var(--gcds-textarea-disabled-background);border-color:var(--gcds-textarea-disabled-text);cursor:not-allowed}}@layer error{:host .gcds-textarea-wrapper .error-message-container{display:block}:host .gcds-textarea-wrapper textarea.gcds-error:not(:focus){border-color:var(--gcds-textarea-danger-border)}}@layer focus{:host .gcds-textarea-wrapper:focus-within{color:var(--gcds-textarea-focus-text)}:host .gcds-textarea-wrapper:focus-within textarea:focus{border-color:var(--gcds-textarea-focus-text);box-shadow:var(--gcds-textarea-focus-box-shadow);outline:var(--gcds-textarea-outline-width) solid var(--gcds-textarea-focus-text);outline-offset:var(--gcds-textarea-border-width)}}";
const GcdsTextareaStyle0 = gcdsTextareaCss;

const GcdsTextarea = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.gcdsFocus = index.createEvent(this, "gcdsFocus", 7);
        this.gcdsBlur = index.createEvent(this, "gcdsBlur", 7);
        this.gcdsChange = index.createEvent(this, "gcdsChange", 7);
        this.gcdsInput = index.createEvent(this, "gcdsInput", 7);
        this.gcdsError = index.createEvent(this, "gcdsError", 7);
        this.gcdsValid = index.createEvent(this, "gcdsValid", 7);
        if (hostRef.$hostElement$["s-ei"]) {
            this.internals = hostRef.$hostElement$["s-ei"];
        }
        else {
            this.internals = hostRef.$hostElement$.attachInternals();
            hostRef.$hostElement$["s-ei"] = this.internals;
        }
        this._validator = defaultValidator;
        this.onBlur = () => {
            if (this.validateOn == 'blur') {
                this.validate();
            }
            this.gcdsBlur.emit();
        };
        this.handleInput = (e, customEvent) => {
            const val = e.target && e.target.value;
            this.value = val;
            this.internals.setFormValue(val ? val : null);
            if (e.type === 'change') {
                const changeEvt = new e.constructor(e.type, e);
                this.el.dispatchEvent(changeEvt);
            }
            customEvent.emit(this.value);
        };
        this.characterCount = undefined;
        this.cols = undefined;
        this.disabled = false;
        this.errorMessage = undefined;
        this.hideLabel = false;
        this.hint = undefined;
        this.label = undefined;
        this.name = undefined;
        this.required = false;
        this.rows = 5;
        this.textareaId = undefined;
        this.value = undefined;
        this.validator = undefined;
        this.validateOn = undefined;
        this.inheritedAttributes = {};
        this.hasError = undefined;
        this.lang = undefined;
    }
    validateDisabledTextarea() {
        if (this.required) {
            this.disabled = false;
        }
    }
    validateErrorMessage() {
        if (this.disabled) {
            this.errorMessage = '';
        }
        else if (!this.hasError && this.errorMessage) {
            this.hasError = true;
        }
        else if (this.errorMessage == '') {
            this.hasError = false;
        }
    }
    validateValidator() {
        if (this.validator && !this.validateOn) {
            this.validateOn = 'blur';
        }
    }
    validateHasError() {
        if (this.disabled) {
            this.hasError = false;
        }
    }
    /**
     * Call any active validators
     */
    async validate() {
        if (!this._validator.validate(this.value) && this._validator.errorMessage) {
            this.errorMessage = this._validator.errorMessage[this.lang];
            this.gcdsError.emit({
                id: `#${this.textareaId}`,
                message: `${this.label} - ${this.errorMessage}`,
            });
        }
        else {
            this.errorMessage = '';
            this.gcdsValid.emit({ id: `#${this.textareaId}` });
        }
    }
    submitListener(e) {
        if (e.target == this.el.closest('form')) {
            if (this.validateOn && this.validateOn != 'other') {
                this.validate();
            }
            if (this.hasError) {
                e.preventDefault();
            }
        }
    }
    /*
     * Form internal functions
     */
    formResetCallback() {
        if (this.value != this.initialValue) {
            this.internals.setFormValue(this.initialValue);
            this.value = this.initialValue;
            this.shadowElement.value = this.initialValue;
        }
    }
    formStateRestoreCallback(state) {
        this.internals.setFormValue(state);
        this.value = state;
    }
    /*
     * Observe lang attribute change
     */
    updateLang() {
        const observer = new MutationObserver(mutations => {
            if (mutations[0].oldValue != this.el.lang) {
                this.lang = this.el.lang;
            }
        });
        observer.observe(this.el, observerConfig);
    }
    async componentWillLoad() {
        // Define lang attribute
        this.lang = assignLanguage(this.el);
        this.updateLang();
        this.validateDisabledTextarea();
        this.validateHasError();
        this.validateErrorMessage();
        this.validateValidator();
        // Assign required validator if needed
        requiredValidator(this.el, 'textarea');
        if (this.validator) {
            this._validator = getValidator(this.validator);
        }
        this.inheritedAttributes = inheritAttributes(this.el, this.shadowElement, [
            'placeholder',
        ]);
        this.internals.setFormValue(this.value ? this.value : null);
        this.initialValue = this.value ? this.value : null;
    }
    componentWillUpdate() {
        if (this.validator) {
            this._validator = getValidator(this.validator);
        }
    }
    render() {
        const { characterCount, cols, disabled, errorMessage, hideLabel, hint, label, required, rows, textareaId, value, hasError, inheritedAttributes, lang, name, } = this;
        // Use max-width instead of cols attribute to keep field responsive
        const style = {
            maxWidth: `${cols * 1.5}ch`,
        };
        const attrsLabel = {
            label,
            required,
        };
        const attrsTextarea = Object.assign({ name,
            disabled,
            required,
            rows }, inheritedAttributes);
        if (hint || errorMessage || characterCount) {
            const hintID = hint ? `hint-${textareaId} ` : '';
            const errorID = errorMessage ? `error-message-${textareaId} ` : '';
            const countID = characterCount ? `textarea__count-${textareaId} ` : '';
            attrsTextarea['aria-describedby'] = `${hintID}${errorID}${countID}${attrsTextarea['aria-describedby']
                ? `${attrsTextarea['aria-describedby']}`
                : ''}`;
        }
        return (index.h(index.Host, null, index.h("div", { class: `gcds-textarea-wrapper ${disabled ? 'gcds-disabled' : ''} ${hasError ? 'gcds-error' : ''}` }, index.h("gcds-label", Object.assign({}, attrsLabel, { "hide-label": hideLabel, "label-for": textareaId, lang: lang })), hint ? index.h("gcds-hint", { "hint-id": textareaId }, hint) : null, errorMessage ? (index.h("gcds-error-message", { messageId: textareaId }, errorMessage)) : null, index.h("textarea", Object.assign({}, attrsTextarea, { class: hasError ? 'gcds-error' : null, id: textareaId, onBlur: () => this.onBlur(), onFocus: () => this.gcdsFocus.emit(), onInput: e => this.handleInput(e, this.gcdsInput), onChange: e => this.handleInput(e, this.gcdsChange), "aria-labelledby": `label-for-${textareaId}`, "aria-invalid": errorMessage ? 'true' : 'false', maxlength: characterCount ? characterCount : null, style: cols ? style : null, ref: element => (this.shadowElement = element) }), value), characterCount ? (index.h("gcds-text", { id: `textarea__count-${textareaId}`, "aria-live": "polite" }, value == undefined
            ? `${characterCount} ${I18N$3[lang].characters.allowed}`
            : `${characterCount - value.length} ${I18N$3[lang].characters.left}`)) : null)));
    }
    static get delegatesFocus() { return true; }
    static get formAssociated() { return true; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "disabled": ["validateDisabledTextarea"],
        "errorMessage": ["validateErrorMessage"],
        "validator": ["validateValidator"],
        "hasError": ["validateHasError"]
    }; }
};
GcdsTextarea.style = GcdsTextareaStyle0;

const I18N$2 = {
  en: {
    closeTrigger: 'Close',
    menuLabel: 'Menu',
    navLabel:
      ' - Use the enter key to select a menu item and travel to its page. Use the left and right arrow keys to navigate between menu and submenu items. Use the right arrow key to open submenus when they are available. Use the left arrow or escape keys to close a menu.',
  },
  fr: {
    closeTrigger: 'Fermer',
    menuLabel: 'Menu',
    navLabel:
      " - Utiliser la touche d'entrée pour sélectionner un élément du menu et voyager à la page indiquée. Utiliser les flèches gauches et droites pour naviguer entre les éléments et les sous-éléments du menu. Ouvrir les sous-éléments du menu avec la flèche droite lorsqu'il sont disponible. Fermer le menu avec la flèche gauche ou la touche d'échappement.",
  },
};

const gcdsTopNavCss = "@layer reset, default, desktop;@layer reset{:host{display:block}:host *{box-sizing:border-box;margin:0}:host ul{padding:0}}@layer default{:host .gcds-top-nav .gcds-top-nav__container{display:flex;flex-direction:column;margin-inline:auto;max-width:var(--gcds-top-nav-max-width);width:90%}}@layer desktop{@media only screen and (width >= 64em){:host .gcds-top-nav{background-color:var(--gcds-top-nav-background)}:host .gcds-top-nav .gcds-top-nav__container{align-items:flex-end;flex-direction:row}:host .gcds-top-nav .nav-container__list{align-items:flex-end;display:flex;width:fit-content}:host .gcds-top-nav .nav-container__list.nav-list--right{margin-inline-start:auto}:host .gcds-top-nav .nav-container__list.nav-list--center{margin-inline:auto}}}";
const GcdsTopNavStyle0 = gcdsTopNavCss;

const GcdsTopNav = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.label = undefined;
        this.alignment = 'left';
        this.lang = undefined;
        this.navItems = [];
        this.navSize = undefined;
    }
    async focusInListener(e) {
        if (this.el.contains(e.target) && !this.navSize) {
            const mediaQuery = window.matchMedia('screen and (min-width: 64em)');
            const nav = this.el;
            const mobileTrigger = this.mobile;
            if (mediaQuery.matches) {
                this.navSize = 'desktop';
            }
            else {
                this.navSize = 'mobile';
            }
            await this.updateNavItemQueue(this.el);
            mediaQuery.addEventListener('change', async function (e) {
                if (e.matches) {
                    nav.updateNavSize('desktop');
                    await nav.updateNavItemQueue(nav);
                    if (mobileTrigger.hasAttribute('open')) {
                        mobileTrigger.toggleNav();
                    }
                }
                else {
                    nav.updateNavSize('mobile');
                    await nav.updateNavItemQueue(nav);
                }
            });
        }
    }
    async focusOutListener(e) {
        if (!this.el.contains(e.relatedTarget)) {
            if (this.navSize == 'mobile') {
                if (this.mobile.hasAttribute('open')) {
                    await this.mobile.toggleNav();
                }
            }
        }
    }
    async keyDownListener(e) {
        if (this.el.contains(document.activeElement)) {
            handleKeyDownNav(e, this.el, this.navItems);
        }
    }
    async gcdsClickListener(e) {
        if (this.el.contains(e.target)) {
            // Update tab queue when clicking mobile menu
            if (e.target == this.el && this.navSize == 'mobile') {
                await this.updateNavItemQueue(e.target);
                // Update tab queue when clicking dropdown
            }
            else if (e.target.nodeName == 'GCDS-NAV-GROUP' &&
                !e.target.hasAttribute('open')) {
                await this.updateNavItemQueue(e.target, true);
                e.target.focusTrigger();
            }
        }
    }
    /*
     * Observe lang attribute change
     */
    updateLang() {
        const observer = new MutationObserver(mutations => {
            if (mutations[0].oldValue != this.el.lang) {
                this.lang = this.el.lang;
            }
        });
        observer.observe(this.el, observerConfig);
    }
    /*
     * Get current navSize state
     */
    async getNavSize() {
        return this.navSize;
    }
    /*
     * Pass new window size: desktop or mobile
     */
    async updateNavSize(size) {
        this.navSize = size;
    }
    /*
     * Update item queue for keyboard navigation based on passed element
     */
    async updateNavItemQueue(el, includeElement) {
        if (includeElement) {
            const childElements = await getNavItems(el);
            this.navItems = [el, ...childElements];
        }
        else {
            this.navItems = await getNavItems(el);
        }
        if (el == this.el && this.navSize == 'mobile') {
            this.navItems = [...this.navItems, this.mobile];
        }
    }
    async componentWillLoad() {
        // Define lang attribute
        this.lang = assignLanguage(this.el);
        this.updateLang();
    }
    render() {
        const { label, alignment, lang } = this;
        return (index.h(index.Host, null, index.h("div", { class: "gcds-top-nav" }, index.h("nav", { "aria-label": `${label}${I18N$2[lang].navLabel}` }, index.h("ul", { class: "gcds-top-nav__container" }, index.h("gcds-nav-group", { menuLabel: I18N$2[lang].menuLabel, closeTrigger: I18N$2[lang].closeTrigger, openTrigger: I18N$2[lang].menuLabel, class: "gcds-mobile-nav gcds-mobile-nav-topnav", ref: element => (this.mobile = element), lang: lang }, index.h("slot", { name: "home" }), index.h("li", { class: `nav-container__list nav-list--${alignment}` }, index.h("ul", { class: `nav-container__list nav-list--${alignment}` }, index.h("slot", null)))))))));
    }
    get el() { return index.getElement(this); }
};
GcdsTopNav.style = GcdsTopNavStyle0;

const I18N$1 = {
  en: {
    buttonLabel:
      'Press the SPACEBAR to expand or the escape key to collapse this menu. Use the Up and Down arrow keys to choose a submenu item. Press the Enter or Right arrow key to expand it, or the Left arrow or Escape key to collapse it. Use the Up and Down arrow keys to choose an item on that level and the Enter key to access it.',
    menuLabelFull: 'Main menu',
    menuLabelHidden: 'Main ',
    menuToggle: 'Menu',
  },
  fr: {
    buttonLabel:
      "Appuyez sur la barre d'espacement pour ouvrir ou sur la touche d'échappement pour fermer le menu. Utilisez les flèches haut et bas pour choisir un élément de sous-menu. Appuyez sur la touche Entrée ou sur la flèche vers la droite pour le développer, ou sur la flèche vers la gauche ou la touche Échap pour le réduire. Utilisez les flèches haut et bas pour choisir un élément de ce niveau et la touche Entrée pour y accéder.",
    menuLabelFull: 'Menu principal',
    menuLabelHidden: ' principal',
    menuToggle: 'Menu',
  },
};

const snapshots = {
  en: '<li role="presentation"><a role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-jobs" aria-expanded="false" href="#">Jobs and the workplace</a><ul id="gc-mnu-jobs" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/jobs.html">Jobs<span class="visible-xs-inline visible-sm-inline">: home</span></a></li><li role="separator"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/jobs/opportunities.html">Find a job</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/jobs/training.html">Training</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/business/hire.html">Hiring and managing employees</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/start-business">Starting a business</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/jobs/workplace.html">Workplace standards</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/finance/pensions.html">Pensions and retirement</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/benefits/ei.html">Employment Insurance benefits and leave</a></li><li role="separator" aria-orientation="vertical"></li><li role="presentation"><a data-keep-expanded="md-min" href="#" role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-jobs-sub" aria-expanded="true">Most requested</a><ul id="gc-mnu-jobs-sub" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/employment-social-development/programs/ei/ei-list/ei-roe/access-roe.html">View your Records of Employment</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/employment-social-development/services/sin.html">Apply for a Social Insurance Number (SIN)</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/employment-social-development/services/foreign-workers.html">Hire a temporary foreign worker</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html">Immigrate as a skilled worker</a></li></ul></li></ul></li><li role="presentation"><a role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-cit" aria-expanded="false" href="#">Immigration and citizenship</a><ul id="gc-mnu-cit" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/immigration-citizenship.html">Immigration<span class="hidden-xs hidden-sm">and citizenship</span><span class="visible-xs-inline visible-sm-inline">: home</span></a></li><li role="separator"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/immigration-refugees-citizenship/services/application.html">My application</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html">Visit</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada.html">Immigrate</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada.html">Work</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html">Study</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship.html">Citizenship</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/immigration-refugees-citizenship/services/new-immigrants.html">New immigrants</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/immigration-refugees-citizenship/services/canadians.html">Canadians</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/immigration-refugees-citizenship/services/refugees.html">Refugees and asylum</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/immigration-citizenship/enforcement-violations.html">Enforcement and violations</a></li><li role="separator" aria-orientation="vertical"></li><li role="presentation"><a data-keep-expanded="md-min" href="#" role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-cit-sub" aria-expanded="true">Most requested</a><ul id="gc-mnu-cit-sub" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/immigration-refugees-citizenship/services/application/account.html">Sign in or create an account to apply online</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-status.html">Check your application status</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-processing-times.html">Check application processing times</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides.html">Find an application form</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.cic.gc.ca/english/information/fees/index.asp">Pay your fees</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.cic.gc.ca/english/visit/visas.asp">Find out if you need an eTA or a visa to visit Canada</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.cic.gc.ca/english/helpcentre/index-featured-can.asp">Have questions? Find answers in the Help Centre</a></li></ul></li></ul></li><li role="presentation"><a role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-travel" aria-expanded="false" href="#">Travel and tourism</a><ul id="gc-mnu-travel" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://travel.gc.ca/">Travel<span class="hidden-xs hidden-sm">and tourism</span><span class="visible-xs-inline visible-sm-inline">: home</span></a></li><li role="separator"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://travel.gc.ca/travelling/advisories">Travel advice and advisories</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://travel.gc.ca/travel-covid">COVID-19: Travel, testing and borders</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html?outside">Visit Canada</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://travel.gc.ca/travelling">Travel outside Canada</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://travel.gc.ca/air">Air travel</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://travel.gc.ca/returning">Return to Canada</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports.html">Canadian passports and travel documents</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://travel.gc.ca/canadian-tourism">Canadian attractions, events and experiences</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://travel.gc.ca/assistance">Assistance outside Canada</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://travel.gc.ca/stay-connected">Stay connected</a></li><li role="separator" aria-orientation="vertical"></li><li role="presentation"><a data-keep-expanded="md-min" href="#" role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-travel-sub" aria-expanded="true">Most requested</a><ul id="gc-mnu-travel-sub" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://travel.gc.ca/assistance/emergency-assistance">Emergency assistance abroad</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.cic.gc.ca/english/visit/visas.asp">Find out if you need a visa to travel to Canada</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html">Apply for an eTA</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.cbsa-asfc.gc.ca/services/travel-voyage/prog/nexus/menu-eng.html">Apply for NEXUS</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://travel.gc.ca/travelling/registration">Register as a Canadian abroad</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://travel.gc.ca/travelling/documents/travel-insurance">Travel insurance</a></li></ul></li></ul></li><li role="presentation"><a role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-biz" aria-expanded="false" href="#">Business and industry</a><ul id="gc-mnu-biz" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/business.html">Business<span class="hidden-xs hidden-sm">and industry</span><span class="visible-xs-inline visible-sm-inline">: home</span></a></li><li role="separator"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/business/start.html">Starting a business</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/business/grants.html">Business grants and financing</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/business/taxes.html">Business taxes</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/business/federal-corporations.html">Federal corporations</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/business/hire.html">Hiring and managing employees</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/business/trade.html">International trade and investment</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/business/permits.html">Permits, licences and regulations</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/business/doing-business.html">Doing business with government</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/science/innovation.html">R&D and innovation</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/business/research.html">Research and business intelligence</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/business/ip.html">Intellectual property and copyright</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/business/maintaingrowimprovebusiness.html">Maintaining your business</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/business/protecting.html">Protecting your business</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/business/bankruptcy.html">Insolvency for business</a></li><li role="separator" aria-orientation="vertical"></li><li role="presentation"><a data-keep-expanded="md-min" href="#" role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-biz-sub" aria-expanded="true">Most requested</a><ul id="gc-mnu-biz-sub" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.ic.gc.ca/app/scr/cc/CorporationsCanada/fdrlCrpSrch.html?locale=en_CA">Find a corporation</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.cbsa-asfc.gc.ca/prog/manif/portal-portail-eng.html">Report your imported goods</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://ised-isde.canada.ca/cipo/trademark-search/srch?null=&lang=eng">Search for trademarks</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.cbsa-asfc.gc.ca/trade-commerce/tariff-tarif/2018/html/tblmod-1-eng.html">Review custom tariffs for importing goods</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.ic.gc.ca/opic-cipo/cpd/eng/introduction.html">Find a patent</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.cbsa-asfc.gc.ca/comm-eng.html">Import and export from Canada</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://ic.gc.ca/eic/site/cd-dgc.nsf/eng/h_cs03922.html">Name a business</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.ic.gc.ca/app/scr/cc/CorporationsCanada/hm.html?locale=en_CA">Make changes to your corporation (Online Filing Centre)</a></li></ul></li></ul></li><li role="presentation"><a role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-benny" aria-expanded="false" href="#">Benefits</a><ul id="gc-mnu-benny" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/benefits.html">Benefits<span class="visible-xs-inline visible-sm-inline">: home</span></a></li><li role="separator"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/benefits/ei.html">Employment Insurance benefits and leave</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/benefits/family.html">Family and caregiving benefits</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/benefits/publicpensions.html">Public pensions</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/benefits/education.html">Student aid and education planning</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/benefits/housing.html">Housing benefits</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/benefits/disability.html">Disability benefits</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.canada.ca/en/services/benefits/audience.html">Benefits by audience</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/benefits/calendar.html">Benefits payment dates</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://benefitsfinder.services.gc.ca/hm?GoCTemplateCulture=en-CA">Benefits finder</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/benefits/notify-government-death.html">Notify the government of a death</a></li><li role="separator" aria-orientation="vertical"></li><li role="presentation"><a data-keep-expanded="md-min" href="#" role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-benny-sub" aria-expanded="true">Most requested</a><ul id="gc-mnu-benny-sub" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/benefits/ei/ei-regular-benefit.html">Apply for Employment Insurance</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/benefits/education/student-aid/grants-loans.html">Apply for student loans and grants</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/government/sign-in-online-account.html">Sign in to a Government of Canada online account</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.tpsgc-pwgsc.gc.ca/recgen/txt/depot-deposit-eng.html">Sign up for direct deposit</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/benefits/ei/ei-internet-reporting.html">Submit your EI report</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.cra-arc.gc.ca/bnfts/clcltr/cfbc-eng.html">Child and family benefits calculators</a></li></ul></li></ul></li><li role="presentation"><a role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-health" aria-expanded="false" href="#">Health</a><ul id="gc-mnu-health" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/health.html">Health<span class="visible-xs-inline visible-sm-inline">: home</span></a></li><li role="separator"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/health/food-nutrition.html">Food and nutrition</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/public-health/services/diseases.html">Diseases and conditions</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/public-health/topics/immunization-vaccines.html">Vaccines and immunization</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/health/drug-health-products.html">Drug and health products</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/health/product-safety.html">Product safety</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/health/health-risks-safety.html">Health risks and safety</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/health/healthy-living.html">Healthy living</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/health/aboriginal-health.html">Indigenous health</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/health/health-system-services.html">Health system and services</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/health/science-research-data.html">Science, research and data</a></li><li role="separator" aria-orientation="vertical"></li><li role="presentation"><a data-keep-expanded="md-min" href="#" role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-health-sub" aria-expanded="true">Most requested</a><ul id="gc-mnu-health-sub" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/health-canada/services/drugs-medication/cannabis/industry-licensees-applicants/licensed-cultivators-processors-sellers.html">Licensed cultivators, processors and seller of cannabis</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://healthycanadians.gc.ca/recall-alert-rappel-avis/index-eng.php">Food and product recalls and safety alerts</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/health-canada/services/canada-food-guides.html">Canada\'s food guide</a></li></ul></li></ul></li><li role="presentation"><a role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-taxes" aria-expanded="false" href="#">Taxes</a><ul id="gc-mnu-taxes" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/taxes.html">Taxes<span class="visible-xs-inline visible-sm-inline">: home</span></a></li><li role="separator"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/taxes/income-tax.html">Income tax</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses.html">GST/HST</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll.html">Payroll</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/taxes/business-number.html">Business number</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/taxes/savings-and-pension-plans.html">Savings and pension plans</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/taxes/child-and-family-benefits.html">Tax credits and benefits for individuals</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/taxes/excise-taxes-duties-and-levies.html">Excise taxes, duties, and levies</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/taxes/charities.html">Charities and giving</a></li><li role="separator" aria-orientation="vertical"></li><li role="presentation"><a data-keep-expanded="md-min" href="#" role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-taxes-sub" aria-expanded="true">Most requested</a><ul id="gc-mnu-taxes-sub" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/revenue-agency/services/e-services/digital-services-individuals/account-individuals.html">My Account</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/revenue-agency/services/e-services/digital-services-businesses/business-account.html">My Business Account</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/revenue-agency/services/e-services/represent-a-client.html">Represent a Client</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/revenue-agency/services/e-services/digital-services-businesses/gst-hst-netfile.html">File a GST/HST return (NETFILE)</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/revenue-agency/services/make-a-payment-canada-revenue-agency.html">Make a payment to the Canada Revenue Agency</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/revenue-agency/services/child-family-benefits/benefit-payment-dates.html">Find the next benefit payment date</a></li></ul></li></ul></li><li role="presentation"><a role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-enviro" aria-expanded="false" href="#">Environment and natural resources</a><ul id="gc-mnu-enviro" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/environment.html">Environment<span class="hidden-xs hidden-sm">and natural resources</span><span class="visible-xs-inline visible-sm-inline">: home</span></a></li><li role="separator"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/environment/weather.html">Weather, climate and hazards</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/environment/energy.html">Energy</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/environment/natural-resources.html">Natural resources</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://agriculture.canada.ca/en/agriculture-and-environment">Agriculture and the environment</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/environment/fisheries.html">Fisheries</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/environment/wildlife-plants-species.html">Wildlife, plants and species</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/environment/pollution-waste-management.html">Pollution and waste management</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/environment/conservation.html">Environmental conservation and protection</a></li><li role="separator" aria-orientation="vertical"></li><li role="presentation"><a data-keep-expanded="md-min" href="#" role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-enviro-sub" aria-expanded="true">Most requested</a><ul id="gc-mnu-enviro-sub" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://weather.gc.ca/canada_e.html">Local weather forecast</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.nrcan.gc.ca/energy/efficiency/transportation/20996">Fuel-efficient vehicles</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.nrcan.gc.ca/homes">Home energy efficiency</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/environment-climate-change/services/species-risk-public-registry.html">Species at risk</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/environment-climate-change/services/seasonal-weather-hazards.html">Prepare for severe weather</a></li></ul></li></ul></li><li role="presentation"><a role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-defence" aria-expanded="false" href="#">National security and defence</a><ul id="gc-mnu-defence" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/defence.html"><span class="hidden-xs hidden-sm">National security and defence</span><span class="visible-xs-inline visible-sm-inline">Defence: home</span></a></li><li role="separator"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/defence/nationalsecurity.html">National security</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/defence/caf.html">Canadian Armed Forces</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/defence/defence-equipment-purchases-upgrades.html">Defence equipment purchases and upgrades</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.tc.gc.ca/en/services/transportation-security.html">Transportation security</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/defence/securingborder.html">Securing the border</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/defence/cybersecurity.html">Cyber security</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/defence/jobs.html">Jobs in national security and defence</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/government/publicservice/benefitsmilitary.html">Services and benefits for the military</a></li><li role="separator" aria-orientation="vertical"></li><li role="presentation"><a data-keep-expanded="md-min" href="#" role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-defence-sub" aria-expanded="true">Most requested</a><ul id="gc-mnu-defence-sub" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://forces.ca/en/careers/">Jobs in the Canadian Armed Forces</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/department-national-defence/services/military-history/history-heritage/insignia-flags/ranks/rank-appointment-insignia.html">Military ranks</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/defence/caf/equipment.html">Defence equipment</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.publicsafety.gc.ca/cnt/ntnl-scrt/cntr-trrrsm/lstd-ntts/crrnt-lstd-ntts-en.aspx">Current list of terrorist entities</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/department-national-defence/services/cadets-junior-canadian-rangers/cadets/join-us.html">Join the Cadet Program</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://dgpaapp.forces.gc.ca/en/canada-defence-policy/index.asp">Canada\'s Defence policy</a></li></ul></li></ul></li><li role="presentation"><a role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-culture" aria-expanded="false" href="#">Culture, history and sport</a><ul id="gc-mnu-culture" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/culture.html">Culture<span class="hidden-xs hidden-sm">, history and sport</span><span class="visible-xs-inline visible-sm-inline">: home</span></a></li><li role="separator"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/canadian-heritage/services/funding.html">Funding - Culture, history and sport</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/culture/events-celebrations-commemorations.html">Events, celebrations and commemorations</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/culture/cultural-attractions.html">Cultural landmarks and attractions</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/culture/canadian-identity-society.html">Canadian identity and society</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/culture/sport.html">Sport</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/culture/history-heritage.html">History and heritage</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/culture/arts-media.html">Arts and media</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/culture/cultural-youth-programs.html">Cultural youth programs</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/culture/cultural-trade-investment.html">Cultural trade and investment</a></li><li role="separator" aria-orientation="vertical"></li><li role="presentation"><a data-keep-expanded="md-min" href="#" role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-culture-sub" aria-expanded="true">Most requested</a><ul id="gc-mnu-culture-sub" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.veterans.gc.ca/eng/remembrance/memorials/canadian-virtual-war-memorial">Visit the Canadian Virtual War Memorial</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/culture/canadian-identity-society/anthems-symbols.html">Anthems and symbols of Canada</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://crtc.gc.ca/eng/8045/d2018.htm">Find a CRTC decision</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://library-archives.canada.ca/eng/collection/research-help/genealogy-family-history/pages/genealogy-family-history.aspx">Research your family history</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.bac-lac.gc.ca/eng/census/Pages/census.aspx">Search census records</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/culture/cultural-attractions/attractions-canada-capital.html">Landmarks and attractions in Canada\'s capital</a></li></ul></li></ul></li><li role="presentation"><a role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-policing" aria-expanded="false" href="#">Policing, justice and emergencies</a><ul id="gc-mnu-policing" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/policing.html">Policing<span class="hidden-xs hidden-sm">, justice and emergencies</span><span class="visible-xs-inline visible-sm-inline">: home</span></a></li><li role="separator"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/policing/police/index.html">Policing</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/policing/justice.html">Justice</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/policing/emergencies.html">Emergencies</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/policing/corrections.html">Corrections</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/policing/parole.html">Parole, record suspension, expungement and clemency</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/policing/victims.html">Victims of crime</a></li><li role="separator" aria-orientation="vertical"></li><li role="presentation"><a data-keep-expanded="md-min" href="#" role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-policing-sub" aria-expanded="true">Most requested</a><ul id="gc-mnu-policing-sub" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.rcmp-grc.gc.ca/cfp-pcaf/online_en-ligne/index-eng.htm">Apply/Renew a firearms licence</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.rcmp-grc.gc.ca/en/criminal-record-checks">Get a criminal records check</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/parole-board/services/record-suspensions/official-pbc-application-guide-and-forms.html">Apply for a criminal record suspension</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.getprepared.gc.ca/cnt/hzd/drng-en.aspx">What to do during an emergency</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/policing/police/community-safety-policing/impaired-driving.html">Know the law on impaired driving</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/policing/police/help-solve-crime.html">Help solve a crime</a></li></ul></li></ul></li><li role="presentation"><a role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-trans" aria-expanded="false" href="#">Transport and infrastructure</a><ul id="gc-mnu-trans" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/transport.html">Transport<span class="hidden-xs hidden-sm">and infrastructure</span><span class="visible-xs-inline visible-sm-inline">: home</span></a></li><li role="separator"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.tc.gc.ca/en/services/aviation.html">Aviation</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.tc.gc.ca/en/services/marine.html">Marine transportation</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.tc.gc.ca/en/services/road.html">Road transportation</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.tc.gc.ca/en/services/rail.html">Rail transportation</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.tc.gc.ca/en/services/dangerous-goods.html">Dangerous goods</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.tc.gc.ca/en/services/infrastructure.html">Infrastructure</a></li><li role="separator" aria-orientation="vertical"></li><li role="presentation"><a data-keep-expanded="md-min" href="#" role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-trans-sub" aria-expanded="true">Most requested</a><ul id="gc-mnu-trans-sub" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/transport/zero-emission-vehicles.html">Zero-emission vehicles</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.tc.gc.ca/en/services/aviation/drone-safety.html">Drone safety</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://tc.canada.ca/en/aviation/aviation-security/what-not-bring-plane">What you can\'t bring on an airplane</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.tc.gc.ca/eng/marinesafety/oep-vesselreg-menu-728.htm">Register your vessel</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.tc.gc.ca/en/services/road/child-car-seat-safety.html">Child car seat safety</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.tc.gc.ca/eng/tdg/clear-tofc-211.htm">Transporting dangerous goods - Regulations</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.tc.gc.ca/eng/acts-regulations/regulations-sor96-433.htm">Canadian Aviation Regulations</a></li></ul></li></ul></li><li role="presentation"><a role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-canworld" aria-expanded="false" href="#">Canada and the world</a><ul id="gc-mnu-canworld" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.international.gc.ca/world-monde/index.aspx?lang=eng">Canada and the world<span class="visible-xs-inline visible-sm-inline">: home</span></a></li><li role="separator"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.international.gc.ca/world-monde/offices-bureaux/index.aspx?lang=eng">International offices and emergency contacts</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.international.gc.ca/world-monde/study_work_travel-etude_travail_voyage/index.aspx?lang=eng">Study, work and travel worldwide</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.international.gc.ca/world-monde/country-pays/index.aspx?lang=eng">Information by countries and territories</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.international.gc.ca/world-monde/stories-histoires/index.aspx?lang=eng">Stories</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.international.gc.ca/world-monde/international_relations-relations_internationales/index.aspx?lang=eng">International relations</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.international.gc.ca/world-monde/issues_development-enjeux_developpement/index.aspx?lang=eng">Global issues and international assistance</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.international.gc.ca/world-monde/funding-financement/index.aspx?lang=eng">Funding for international initiatives</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/business/trade.html">International trade and investment</a></li><li role="separator" aria-orientation="vertical"></li><li role="presentation"><a data-keep-expanded="md-min" href="#" role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-canworld-sub" aria-expanded="true">Most requested</a><ul id="gc-mnu-canworld-sub" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.educanada.ca/scholarships-bourses/non_can/index.aspx?lang=eng">Find a Canadian scholarship as an international student</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.treaty-accord.gc.ca/index.aspx?Lang=eng">International treaties signed by Canada</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.educanada.ca/index.aspx?lang=eng">Find international study or research opportunities in Canada</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://travel.gc.ca/assistance/embassies-consulates">Contact an embassy or consulate</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.international.gc.ca/protocol-protocole/reps.aspx?lang=eng">Contact a foreign representative in Canada</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.international.gc.ca/gac-amc/about-a_propos/services/authentication-authentification/step-etape-1.aspx?lang=eng">Authenticate a document</a></li></ul></li></ul></li><li role="presentation"><a role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-money" aria-expanded="false" href="#">Money and finances</a><ul id="gc-mnu-money" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/finance.html"><span class="hidden-xs hidden-sm">Money and finances</span><span class="visible-xs-inline visible-sm-inline">Finance: home</span></a></li><li role="separator"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/finance/manage.html">Managing your money</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/finance/debt.html">Debt and borrowing</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/finance/savings.html">Savings and investments</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/finance/educationfunding.html">Education funding</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/finance/pensions.html">Pensions and retirement</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/finance/fraud.html">Protection from frauds and scams</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/finance/tools.html">Financial tools and calculators</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/financial-consumer-agency/services/financial-literacy-programs.html">Financial literacy programs</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/finance/consumer-affairs.html">Consumer affairs</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/finance/bankruptcy.html">Insolvency</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/taxes.html">Taxes</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/government/system/finances.html">Government finances</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/business/grants.html">Business grants and financing</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/business/permits/federallyregulatedindustrysectors/financialservicesregulation.html">Financial and money services regulation</a></li><li role="separator" aria-orientation="vertical"></li><li role="presentation"><a data-keep-expanded="md-min" href="#" role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-money-sub" aria-expanded="true">Most requested</a><ul id="gc-mnu-money-sub" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.ic.gc.ca/app/scr/bsf-osb/ins/login.html?lang=eng">Find a bankruptcy or insolvency record</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/jobs/education/student-financial-aid/student-loan.html">Student loans</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.tpsgc-pwgsc.gc.ca/recgen/txt/depot-deposit-eng.html">Set up direct deposit</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/financial-consumer-agency/services/mortgages.html">Mortgages</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/financial-consumer-agency/services/credit-reports-score.html">Credit report and scores</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://itools-ioutils.fcac-acfc.gc.ca/BP-PB/budget-planner">Make a budget</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/revenue-agency/services/tax/registered-plans-administrators/pspa/mp-rrsp-dpsp-tfsa-limits-ympe.html">Rates and contribution limits</a></li></ul></li></ul></li><li role="presentation"><a role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-science" aria-expanded="false" href="#">Science and innovation</a><ul id="gc-mnu-science" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/science.html">Science<span class="hidden-xs hidden-sm">and innovation</span><span class="visible-xs-inline visible-sm-inline">: home</span></a></li><li role="separator"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/science/researchfunding.html">Research funding and awards</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/science/sciencesubjects.html">Science subjects</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/science/open-data.html">Open data, statistics and archives</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/science/institutes.html">Research institutes and facilities</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/science/innovation.html">R&D and innovation</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/business/ip.html">Intellectual property and copyright</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/science/scientistsdirectory.html">Directory of scientists and research professionals</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/en/services/science/educationalresources.html">Science education resources</a></li><li role="separator" aria-orientation="vertical"></li><li role="presentation"><a data-keep-expanded="md-min" href="#" role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-science-sub" aria-expanded="true">Most requested</a><ul id="gc-mnu-science-sub" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://nrc.canada.ca/en/certifications-evaluations-standards/codes-canada/codes-canada-publications">National building codes</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://nrc.canada.ca/en/web-clock/">Official times across Canada</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://nrc.canada.ca/en/research-development/products-services/software-applications/sun-calculator/">Check sunrise and sunset times</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://nrc.canada.ca/en/support-technology-innovation/financial-support-technology-innovation-through-nrc-irap">Grants for technological innovation (IRAP)</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://science-libraries.canada.ca/eng/home/">Federal Science Library</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://asc-csa.gc.ca/eng/astronomy/auroramax/hd-480.asp">Live view of northern lights cam</a></li></ul></li></ul></li>',
  fr: '<li role="presentation"><a role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-jobs" aria-expanded="false" href="#">Emplois et milieu de travail</a><ul id="gc-mnu-jobs" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/emplois.html">Emplois<span class="visible-xs-inline visible-sm-inline">: accueil</span></a></li><li role="separator"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/emplois/opportunites.html">Trouver un emploi</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/emplois/formation.html">Formation</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/gestion-entreprise">Embauche et gestion de personnel</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/demarrage-entreprise">Démarrage d\'entreprise</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/emplois/milieu-travail.html">Normes en milieu de travail</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/finance/pensions.html">Pensions et retraite</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/prestations/ae.html">Prestations d\'assurance-emploi et congés</a></li><li role="separator" aria-orientation="vertical"></li><li role="presentation"><a data-keep-expanded="md-min" href="#" role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-jobs-sub" aria-expanded="true">En demande</a><ul id="gc-mnu-jobs-sub" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/emploi-developpement-social/programmes/assurance-emploi/ae-liste/assurance-emploi-re/acceder-re.html">Voir vos Relevés d’emploi</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale.html">Demander un numéro d’assurance-sociale</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/emploi-developpement-social/services/travailleurs-etrangers.html">Embaucher un travailleur étranger temporaire</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/immigration-refugies-citoyennete/services/immigrer-canada/entree-express.html">Immigrer en tant que travailleur qualifié</a></li></ul></li></ul></li><li role="presentation"><a role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-cit" aria-expanded="false" href="#">Immigration et citoyenneté</a><ul id="gc-mnu-cit" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/immigration-citoyennete.html">Immigration<span class="hidden-xs hidden-sm">et citoyenneté</span><span class="visible-xs-inline visible-sm-inline">: accueil</span></a></li><li role="separator"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/immigration-refugies-citoyennete/services/demande.html">Ma demande</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/immigration-refugies-citoyennete/services/visiter-canada.html">Visiter</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/immigration-refugies-citoyennete/services/immigrer-canada.html">Immigrer</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/immigration-refugies-citoyennete/services/travailler-canada.html">Travailler</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/immigration-refugies-citoyennete/services/etudier-canada.html">Étudier</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/immigration-refugies-citoyennete/services/citoyennete-canadienne.html">Citoyenneté</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants.html">Nouveaux immigrants</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/immigration-refugies-citoyennete/services/canadiens.html">Canadiens</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/immigration-refugies-citoyennete/services/refugies.html">Réfugiés et octroi de l’asile</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/immigration-citoyennete/application-loi-infractions.html">Application de la loi et infractions</a></li><li role="separator" aria-orientation="vertical"></li><li role="presentation"><a data-keep-expanded="md-min" href="#" role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-cit-sub" aria-expanded="true">En demande</a><ul id="gc-mnu-cit-sub" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/immigration-refugies-citoyennete/services/demande/compte.html">Se connecter ou créer un compte pour présenter une demande en ligne</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/immigration-refugies-citoyennete/services/demande/verifier-etat.html">Vérifier l’état de sa demande</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.cic.gc.ca/francais/information/delais/index.asp">Vérifier les délais de traitement des demandes</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/immigration-refugies-citoyennete/services/demande/formulaires-demande-guides.html">Trouver un formulaire de demande</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.cic.gc.ca/francais/information/frais/index.asp">Payer les frais</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.cic.gc.ca/francais/visiter/visas.asp">Déterminer si vous avez besoin d’une AVE ou d’un visa pour visiter le Canada</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.cic.gc.ca/francais/centre-aide/index-en-vedette-can.asp">Trouver réponse à ses questions dans le Centre d’aide</a></li></ul></li></ul></li><li role="presentation"><a role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-travel" aria-expanded="false" href="#">Voyage et tourisme</a><ul id="gc-mnu-travel" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://voyage.gc.ca/">Voyage<span class="hidden-xs hidden-sm">et tourisme</span><span class="visible-xs-inline visible-sm-inline">: accueil</span></a></li><li role="separator"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://voyage.gc.ca/voyager/avertissements">Conseils aux voyageurs et avertissements</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://voyage.gc.ca/voyage-covid">COVID-19 : voyage, dépistage et frontières</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/immigration-refugies-citoyennete/services/visiter-canada.html?outside">Visiter le Canada</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://voyage.gc.ca/voyager">Voyager à l’étranger</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://voyage.gc.ca/avion">Voyager en avion</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://voyage.gc.ca/retour">Retour au Canada</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/immigration-refugies-citoyennete/services/passeports-canadiens.html">Passeports et documents de voyage canadiens</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://voyage.gc.ca/tourisme-canadien">Attraits touristiques, événements et expériences au Canada</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://voyage.gc.ca/assistance">Assistance à l’extérieur du Canada</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://voyage.gc.ca/restez-branches">Restez branchés</a></li><li role="separator" aria-orientation="vertical"></li><li role="presentation"><a data-keep-expanded="md-min" href="#" role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-travel-sub" aria-expanded="true">En demande</a><ul id="gc-mnu-travel-sub" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://voyage.gc.ca/assistance/assistance-d-urgence">Assistance d\'urgence à l\'étranger</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.cic.gc.ca/francais/visiter/visas.asp">Vérifiez si vous avez besoin d’un visa pour voyager au Canada</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/immigration-refugies-citoyennete/services/visiter-canada/ave.html">Présentez une demande d’Autorisation de voyage électronique (AVE)</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.cbsa-asfc.gc.ca/services/travel-voyage/prog/nexus/menu-fra.html">Adhérez à NEXUS</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://voyage.gc.ca/voyager/inscription">Inscrivez-vous comme Canadien à l’étranger</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://voyage.gc.ca/voyager/documents/assurance-voyage">Assurance voyage</a></li></ul></li></ul></li><li role="presentation"><a role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-biz" aria-expanded="false" href="#">Entreprises et industrie</a><ul id="gc-mnu-biz" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/entreprises.html">Entreprises<span class="hidden-xs hidden-sm">et industrie</span><span class="visible-xs-inline visible-sm-inline">: accueil</span></a></li><li role="separator"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/entreprises/lancer.html">Démarrage d\'entreprise</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/entreprises/subventions.html">Subventions et financement pour les entreprises</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/entreprises/impots.html">Taxes et impôt des entreprises</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/entreprises/societes-de-regime-federal.html">Sociétés de régime fédéral</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/entreprises/engager.html">Embauche et gestion de personnel</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/entreprises/commerce.html">Commerce international et investissements</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/entreprises/permis.html">Permis, licences et règlements</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/entreprises/faire-affaire.html">Faire affaire avec le gouvernement</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/science/innovation.html">Recherche-développement et innovation</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/entreprises/recherche.html">Recherche et renseignements d\'affaires</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/entreprises/pi.html">Propriété intellectuelle et droit d\'auteur</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/entreprises/maintenirfairecroitreameliorerentreprise.html">Administration de votre entreprise</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/entreprises/proteger.html">Protection de votre entreprise</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/entreprises/faillites.html">Insolvabilité pour les entreprises</a></li><li role="separator" aria-orientation="vertical"></li><li role="presentation"><a data-keep-expanded="md-min" href="#" role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-biz-sub" aria-expanded="true">En demande</a><ul id="gc-mnu-biz-sub" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://ised-isde.canada.ca/cc/lgcy/fdrlCrpSrch.html?lang=fra">Trouver une société</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.cbsa-asfc.gc.ca/prog/manif/portal-portail-fra.html">Déclarer vos produits importés</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://ised-isde.canada.ca/opic/recherche-marques/srch?null=&lang=fre">Chercher des marques de commerce</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.cbsa-asfc.gc.ca/trade-commerce/tariff-tarif/2018/html/tblmod-1-fra.html">Réviser les tarifs des douanes pour l’importation de produits</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.ic.gc.ca/opic-cipo/cpd/fra/introduction.html">Trouver un brevet</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.cbsa-asfc.gc.ca/comm-fra.html">Importer et exporter à partir du Canada</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://ic.gc.ca/eic/site/cd-dgc.nsf/fra/h_cs03922.html">Trouver un nom pour votre compagnie</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://ised-isde.canada.ca/cc/lgcy/hm.html?locale=fr_CA">Apporter des changements à votre société (Centre de dépôt en ligne)</a></li></ul></li></ul></li><li role="presentation"><a role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-benny" aria-expanded="false" href="#">Prestations</a><ul id="gc-mnu-benny" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/prestations.html">Prestations<span class="visible-xs-inline visible-sm-inline">: accueil</span></a></li><li role="separator"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/prestations/ae.html">Prestations d&#39;assurance-emploi et cong&eacute;s</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/prestations/famille.html">Prestations pour les familles et les proches aidants</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/prestations/pensionspubliques.html">Pensions publiques</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/prestations/etudes.html">Aide financière aux étudiants et planification des études</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/prestations/logement.html">Prestations relatives au logement</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/prestations/handicap.html">Prestations d’invalidité</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.canada.ca/fr/services/prestations/clientele.html">Prestations par clientèle</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/prestations/calendrier.html">Dates de paiement des prestations</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://benefitsfinder.services.gc.ca/hm?GoCTemplateCulture=fr-CA&cl=true">Chercheur de prestations</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/prestations/aviser-gouvernement-deces.html">Aviser le gouvernement d’un décès</a></li><li role="separator" aria-orientation="vertical"></li><li role="presentation"><a data-keep-expanded="md-min" href="#" role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-benny-sub" aria-expanded="true">En demande</a><ul id="gc-mnu-benny-sub" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/prestations/ae/assurance-emploi-reguliere.html">Présenter une demande d’assurance-emploi</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/prestations/education/aide-etudiants/bourses-prets.html">Faire une demande de bourses et de prêts d’études</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/gouvernement/ouvrir-session-dossier-compte-en-ligne.html">Ouvrir une session pour un compte en ligne du gouvernement du Canada</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.tpsgc-pwgsc.gc.ca/recgen/txt/depot-deposit-fra.html">Inscrivez-vous au dépôt direct</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/agence-revenu/services/prestations-enfants-familles/calculateur-prestations-enfants-familles.html">Calculateur de prestations pour enfants et familles</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/prestations/ae/assurance-emploi-declaration-internet.html">Soumettre une déclaration d’assurance-emploi</a></li></ul></li></ul></li><li role="presentation"><a role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-health" aria-expanded="false" href="#">Santé</a><ul id="gc-mnu-health" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/sante.html">Santé<span class="visible-xs-inline visible-sm-inline">: accueil</span></a></li><li role="separator"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/sante/aliments-et-nutrition.html">Aliments et nutrition</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/sante-publique/services/maladies.html">Maladies et affections</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/sante-publique/sujets/immunisation-et-vaccins.html">Vaccins et immunisation</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/sante/medicaments-et-produits-sante.html">Médicaments et produits de santé</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/sante/securite-produits.html">Sécurité des produits</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/sante/securite-et-risque-pour-sante.html">Sécurité et risque pour la santé</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/sante/vie-saine.html">Vie saine</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/sante/sante-autochtones.html">Santé des Autochtones</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/sante/systeme-et-services-sante.html">Système et services de santé</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/sante/science-recherche-et-donnees.html">Science, recherche et données</a></li><li role="separator" aria-orientation="vertical"></li><li role="presentation"><a data-keep-expanded="md-min" href="#" role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-health-sub" aria-expanded="true">En demande</a><ul id="gc-mnu-health-sub" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/sante-canada/services/drogues-medicaments/cannabis/titulaires-licences-demandeurs-industrie/cultivateurs-transformateurs-vendeurs-autorises.html">Cultivateurs, transformateurs et vendeurs de cannabis qui détiennent une licence</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.canadiensensante.gc.ca/recall-alert-rappel-avis/index-fra.php">Rappels d\'aliments et de produits et alertes de sécurité</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/sante-canada/services/guides-alimentaires-canada.html">Guide alimentaire du Canada</a></li></ul></li></ul></li><li role="presentation"><a role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-taxes" aria-expanded="false" href="#">Impôts</a><ul id="gc-mnu-taxes" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/impots.html">Impôts<span class="visible-xs-inline visible-sm-inline">: accueil</span></a></li><li role="separator"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/impots/impot-sur-le-revenu.html">Impôt sur le revenu</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/agence-revenu/services/impot/entreprises/sujets/tps-tvh-entreprises.html">TPS/TVH</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/agence-revenu/services/impot/entreprises/sujets/retenues-paie.html">Retenues sur la paie</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/impots/numero-dentreprise.html">Numéro d\'entreprise</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/impots/regimes-depargne-et-de-pension.html">Régimes d’épargne et de pension</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/impots/prestations-pour-enfants-et-familles.html">Crédits d’impôt et prestations pour les particuliers</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/impots/taxes-daccise-droits-et-prelevements.html">Taxes d’accise, droits et prélèvements</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/impots/bienfaisance.html">Organismes de bienfaisance et dons</a></li><li role="separator" aria-orientation="vertical"></li><li role="presentation"><a data-keep-expanded="md-min" href="#" role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-taxes-sub" aria-expanded="true">En demande</a><ul id="gc-mnu-taxes-sub" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/agence-revenu/services/services-electroniques/services-numeriques-particuliers/dossier-particuliers.html">Mon dossier</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/agence-revenu/services/services-electroniques/services-numeriques-entreprises/dossier-entreprise.html">Mon dossier d\'entreprise</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/agence-revenu/services/services-electroniques/representer-client.html">Représenter un client</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/agence-revenu/services/services-electroniques/services-numeriques-entreprises/impotnet-tps-tvh.html">Transmettre une déclaration de TPS/TVH (IMPÔTNET)</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/agence-revenu/services/faire-paiement-a-agence-revenu-canada.html">Faire un paiement à l\'Agence du revenu du Canada</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/agence-revenu/services/prestations-enfants-familles/dates-versement-prestations.html">Trouver la date du prochain versement des prestations</a></li></ul></li></ul></li><li role="presentation"><a role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-enviro" aria-expanded="false" href="#">Environnement et ressources naturelles</a><ul id="gc-mnu-enviro" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/environnement.html">Environnement<span class="hidden-xs hidden-sm">et ressources naturelles</span><span class="visible-xs-inline visible-sm-inline">: accueil</span></a></li><li role="separator"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/environnement/meteo.html">Météo, climat et catastrophes naturelles</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/environnement/energie.html">Énergie</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/environnement/ressources-naturelles.html">Ressources naturelles</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://agriculture.canada.ca/fr/agriculture-environnement">Agriculture et environnement</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/environnement/peches.html">Pêches</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/environnement/faune-flore-especes.html">Faune, flore et espèces</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/environnement/pollution-gestion-dechets.html">Pollution et gestion des déchets</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/environnement/conservation.html">Conservation et protection de l\'environnement</a></li><li role="separator" aria-orientation="vertical"></li><li role="presentation"><a data-keep-expanded="md-min" href="#" role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-enviro-sub" aria-expanded="true">En demande</a><ul id="gc-mnu-enviro-sub" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://meteo.gc.ca/canada_f.html">Prévisions météo locales</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.rncan.gc.ca/energie/efficacite/transports/20997">Véhicules écoénergétiques</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.rncan.gc.ca/maisons">Efficacité énergétique des maisons</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/environnement-changement-climatique/services/registre-public-especes-peril.html">Espèces en péril</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/environnement-changement-climatique/services/meteo-saisonniere-dangereuse.html">Préparation aux conditions météorologiques dangereuses</a></li></ul></li></ul></li><li role="presentation"><a role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-defence" aria-expanded="false" href="#">Sécurité nationale et défense</a><ul id="gc-mnu-defence" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/defense.html"><span class="hidden-xs hidden-sm">Sécurité nationale et défense</span><span class="visible-xs-inline visible-sm-inline">Défense : accueil</span></a></li><li role="separator"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/defense/securitenationale.html">Sécurité nationale</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/defense/fac.html">Forces armées canadiennes</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/defense/achat-mise-a-niveau-equipement-defense.html">Achat et mise à niveau d’équipement de la Défense</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.tc.gc.ca/fr/services/surete-transports.html">Sûreté des transports</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/defense/securiserfrontiere.html">Sécuriser la frontière</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/defense/cybersecurite.html">Cybersécurité</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/defense/emplois.html">Emplois en sécurité nationale et en défense</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/gouvernement/fonctionpublique/avantagesmilitaires.html">Services et avantages sociaux du personnel militaire</a></li><li role="separator" aria-orientation="vertical"></li><li role="presentation"><a data-keep-expanded="md-min" href="#" role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-defence-sub" aria-expanded="true">En demande</a><ul id="gc-mnu-defence-sub" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://forces.ca/fr/carrieres/">Emplois dans les Forces armées canadiennes</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/ministere-defense-nationale/services/histoire-militaire/histoire-patrimoine/insignes-drapeaux/grades/insignes-grade-fonction.html">Grades militaires</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/defense/fac/equipement.html">Équipement de la Défense</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/ministere-defense-nationale/services/cadets-rangers-juniors-canadiens/cadets/rejoignez-nous.html">Joignez-vous aux cadets</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://dgpaapp.forces.gc.ca/fr/politique-defense-canada/index.asp">Politique de défense du Canada</a></li></ul></li></ul></li><li role="presentation"><a role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-culture" aria-expanded="false" href="#">Culture, histoire et sport</a><ul id="gc-mnu-culture" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/culture.html">Culture<span class="hidden-xs hidden-sm">, histoire et sport</span><span class="visible-xs-inline visible-sm-inline">: accueil</span></a></li><li role="separator"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/patrimoine-canadien/services/financement.html">Financement - Culture, histoire et sport</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/culture/evenements-celebrations-commemorations.html">Événements, célébrations et commémorations</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/culture/attraits-culturels.html">Lieux et attraits culturels</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/culture/identite-canadienne-societe.html">Identité canadienne et société</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/culture/sport.html">Sport</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/culture/histoire-patrimoine.html">Histoire et patrimoine</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/culture/arts-media.html">Arts et média</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/culture/programmes-culturels-jeunes.html">Programmes culturels pour les jeunes</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/culture/commerce-investissement-culturels.html">Commerce et investissement culturels</a></li><li role="separator" aria-orientation="vertical"></li><li role="presentation"><a data-keep-expanded="md-min" href="#" role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-culture-sub" aria-expanded="true">En demande</a><ul id="gc-mnu-culture-sub" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.veterans.gc.ca/fra/remembrance/memorials/canadian-virtual-war-memorial">Visitez le Mémorial virtuel de guerre du Canada</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/culture/identite-canadienne-societe/hymnes-symboles.html">Hymnes et symboles du Canada</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://crtc.gc.ca/fra/8045/d2018.htm">Trouvez une décision du CRTC</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://bibliotheque-archives.canada.ca/fra/collection/aide-recherche/genealogie-histoire-famille/Pages/genealogie-histoire-famille.aspx">Faites des recherches sur votre histoire familiale</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.bac-lac.gc.ca/fra/recensements/Pages/recensements.aspx">Cherchez des documents de recensement</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/culture/attraits-culturels/attraits-capitale-canada.html">Lieux et attraits dans la capitale du Canada</a></li></ul></li></ul></li><li role="presentation"><a role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-policing" aria-expanded="false" href="#">Services de police, justice et urgences</a><ul id="gc-mnu-policing" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/police.html">Services de police<span class="hidden-xs hidden-sm">, justice et urgences</span><span class="visible-xs-inline visible-sm-inline">: accueil</span></a></li><li role="separator"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/police/servicespolice.html">Services de police</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/police/justice.html">Justice</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/police/urgences.html">Urgences</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/police/correctionnels.html">Services correctionnels</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/police/liberationconditionnelle.html">Libération conditionnelle, suspension du casier, radiation et clémence</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/police/victimes.html">Victimes d\'actes criminels</a></li><li role="separator" aria-orientation="vertical"></li><li role="presentation"><a data-keep-expanded="md-min" href="#" role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-policing-sub" aria-expanded="true">En demande</a><ul id="gc-mnu-policing-sub" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.rcmp-grc.gc.ca/cfp-pcaf/online_en-ligne/index-fra.htm">Demander ou renouveler un permis d\'arme à feu</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.rcmp-grc.gc.ca/fr/verification-casier-judiciaire">Obtenir une attestation de vérification de casier judiciaire</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/commission-liberations-conditionnelles/services/suspension-du-casier/guide-et-formulaires-de-demande.html">Demander la suspension d’un casier judiciaire</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.preparez-vous.gc.ca/cnt/hzd/drng-fr.aspx">Que faire durant une urgence</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/police/servicespolice/securite-communautaire-police/conduite-facultes-affaiblies.html">Connaissez la loi sur la conduite avec facultés affaiblies</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/police/servicespolice/aider-resoudre-un-crime.html">Aidez à résoudre un crime</a></li></ul></li></ul></li><li role="presentation"><a role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-trans" aria-expanded="false" href="#">Transport et infrastructure</a><ul id="gc-mnu-trans" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/transport.html">Transport<span class="hidden-xs hidden-sm">et infrastructure</span><span class="visible-xs-inline visible-sm-inline">: accueil</span></a></li><li role="separator"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.tc.gc.ca/fr/services/aviation.html">Aviation</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.tc.gc.ca/fr/services/maritime.html">Transport maritime</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.tc.gc.ca/fr/services/routier.html">Transport routier</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.tc.gc.ca/fr/services/ferroviaire.html">Transport ferroviaire</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.tc.gc.ca/fr/services/marchandises-dangereuses.html">Marchandises dangereuses</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.tc.gc.ca/fr/services/infrastructures.html">Infrastructure</a></li><li role="separator" aria-orientation="vertical"></li><li role="presentation"><a data-keep-expanded="md-min" href="#" role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-trans-sub" aria-expanded="true">En demande</a><ul id="gc-mnu-trans-sub" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/transport/vehicules-zero-emission.html">Véhicules zéro émission</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.tc.gc.ca/fr/services/aviation/securite-drones.html">Sécurité des drones</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.tc.gc.ca/fr/services/surete-transports/aerienne/articles-interdits-bord-avion.html">Articles interdits à bord d’un avion</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.tc.gc.ca/fra/securitemaritime/epe-immabatiments-menu-728.htm">Immatriculer votre bâtiment</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.tc.gc.ca/fr/services/routier/securite-sieges-auto-enfants.html">Sécurité des sièges d\'auto pour enfants</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.tc.gc.ca/fra/tmd/clair-tdesm-211.htm">Transporter des marchandises dangereuses - Règlements</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://www.tc.gc.ca/fr/transports-canada/organisation/lois-reglements/reglements/sor-96-433.html">Règlement de l’aviation canadien</a></li></ul></li></ul></li><li role="presentation"><a role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-canworld" aria-expanded="false" href="#">Canada et le monde</a><ul id="gc-mnu-canworld" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.international.gc.ca/world-monde/index.aspx?lang=fra">Le Canada et le monde<span class="visible-xs-inline visible-sm-inline">: accueil</span></a></li><li role="separator"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.international.gc.ca/world-monde/offices-bureaux/index.aspx?lang=fra">Bureaux internationaux et contacts d’urgence</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.international.gc.ca/world-monde/study_work_travel-etude_travail_voyage/index.aspx?lang=fra">Étude, travail et voyage partout dans le monde</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.international.gc.ca/world-monde/country-pays/index.aspx?lang=fra">Information par pays et territoires</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.international.gc.ca/world-monde/stories-histoires/index.aspx?lang=fra">Histoires</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.international.gc.ca/world-monde/international_relations-relations_internationales/index.aspx?lang=fra">Relations internationales</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.international.gc.ca/world-monde/issues_development-enjeux_developpement/index.aspx?lang=fra">Enjeux mondiaux et aide internationale</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.international.gc.ca/world-monde/funding-financement/index.aspx?lang=fra">Financement d’initiatives internationales</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/entreprises/commerce.html">Commerce international et investissement</a></li><li role="separator" aria-orientation="vertical"></li><li role="presentation"><a data-keep-expanded="md-min" href="#" role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-canworld-sub" aria-expanded="true">En demande</a><ul id="gc-mnu-canworld-sub" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.educanada.ca/scholarships-bourses/non_can/index.aspx?lang=fra">Trouver une bourse d’études canadienne en tant qu’étudiant international</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://treaty-accord.gc.ca/index.aspx?Lang=fra">Traités internationaux signés par le Canada</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.educanada.ca/index.aspx?lang=fra">Trouver des occasions d’étude ou de recherche au Canada</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://voyage.gc.ca/assistance/ambassades-consulats">Communiquer avec une ambassade ou un consulat</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.international.gc.ca/protocol-protocole/reps.aspx?lang=fra">Communiquer avec un représentant étranger au Canada</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.international.gc.ca/gac-amc/about-a_propos/services/authentication-authentification/step-etape-1.aspx?lang=fra">Authentifier un document</a></li></ul></li></ul></li><li role="presentation"><a role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-money" aria-expanded="false" href="#">Argent et finances</a><ul id="gc-mnu-money" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/finance.html"><span class="hidden-xs hidden-sm">Argent et finances</span><span class="visible-xs-inline visible-sm-inline">Finances : accueil</span></a></li><li role="separator"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/finance/gerer.html">Gérer votre argent</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/finance/dettes.html">Dettes et emprunts</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/finance/epargne.html">Épargne et investissement</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/finance/financementetudes.html">Financement des études</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/finance/pensions.html">Pensions et retraite</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/finance/fraude.html">Protection contre la fraude et les escroqueries</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/finance/outils.html">Calculatrices et outils financiers</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/programmes-litteratie-financiere.html">Programmes de littératie financière</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/finance/questions-consommation.html">Questions de consommation</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/finance/faillite.html">Insolvabilité</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/impots.html">Impôts</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/gouvernement/systeme/finances.html">Finances publiques</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/entreprises/subventions.html">Subventions et financement pour les entreprises</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/entreprises/permis/secteursindustriereglementationfederale/regleservicesfinanciers.html">Réglementation des services financiers et monétaires</a></li><li role="separator" aria-orientation="vertical"></li><li role="presentation"><a data-keep-expanded="md-min" href="#" role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-money-sub" aria-expanded="true">En demande</a><ul id="gc-mnu-money-sub" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.ic.gc.ca/app/scr/bsf-osb/ins/connexion.html?lang=fra">Trouver un dossier de faillite ou d’insolvabilité</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/emplois/education/aide-financiere-etudiants/pret-etudiants.html">Prêts étudiants</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.tpsgc-pwgsc.gc.ca/recgen/txt/depot-deposit-fra.html">Inscrivez-vous au dépôt direct</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/hypotheques.html">Obtenir des renseignements sur les hypothèques</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/agence-consommation-matiere-financiere/services/dossier-pointage-credit.html">Dossiers et cotes de crédit</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://itools-ioutils.fcac-acfc.gc.ca/BP-PB/planificateur-budgetaire">Faire un budget</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/agence-revenu/services/impot/administrateurs-regimes-enregistres/fesp/plafonds-cd-reer-rpdb-celi-mgap.html">Taux et limites de contribution</a></li></ul></li></ul></li><li role="presentation"><a role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-science" aria-expanded="false" href="#">Science et innovation</a><ul id="gc-mnu-science" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/science.html">Science<span class="hidden-xs hidden-sm">et innovation</span><span class="visible-xs-inline visible-sm-inline">: accueil</span></a></li><li role="separator"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/science/financementrecherche.html">Financement, subventions et prix pour la recherche</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/science/themesscientifiques.html">Thèmes scientifiques</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/science/donnees-ouvertes.html">Données ouvertes, statistiques et archives</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/science/instituts.html">Instituts et établissements de recherches</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/science/innovation.html">R-D et innovation</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/entreprises/pi.html">Propriété intellectuelle et droit d\'auteur</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/science/repertoirescientifiques.html">Répertoire des scientifiques et des professionnels de la recherche</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://www.canada.ca/fr/services/science/ressourcespedagogiques.html">Ressources pédagogiques scientifiques</a></li><li role="separator" aria-orientation="vertical"></li><li role="presentation"><a data-keep-expanded="md-min" href="#" role="menuitem" tabindex="-1" aria-haspopup="true" aria-controls="gc-mnu-science-sub" aria-expanded="true">En demande</a><ul id="gc-mnu-science-sub" role="menu" aria-orientation="vertical"><li role="presentation"><a role="menuitem" tabindex="-1" href="https://cnrc.canada.ca/fr/certifications-evaluations-normes/codes-canada/publications-codes-canada">Code national du bâtiment</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://cnrc.canada.ca/fr/horloge-web/">Heures officielles au Canada</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://cnrc.canada.ca/fr/recherche-developpement/produits-services/logiciels-applications/calculatrice-soleil/">Trouver les heures de levers et de couchers du soleil</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://cnrc.canada.ca/fr/soutien-linnovation-technologique/soutien-financier-linnovation-technologique-pari-cnrc">Bourses pour l’innovation technologique (PARI)</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="https://science-libraries.canada.ca/fra/accueil/">Bibliothèque scientifique fédérale</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="http://asc-csa.gc.ca/fra/astronomie/auroramax/hd-480.asp">Aurores boréales en direct</a></li></ul></li></ul></li>',
};

const gcdsTopicMenuCss = "@layer reset, default, mobile, xsMobile, focus;@layer reset{:host{display:block}:host *{box-sizing:border-box;margin:0}}@layer default{:host .gcds-topic-menu__heading,:host .gcds-topic-menu__main{display:inherit;height:0;margin:0;overflow:hidden;width:0}:host .visible-sm-inline{display:none}:host .gcds-topic-menu{font:var(--gcds-topic-menu-font);margin-inline:auto;max-width:var(--gcds-topic-menu-max-width);position:relative;width:90%}:host .gcds-topic-menu button[aria-haspopup=true]{background-color:var(--gcds-topic-menu-button-background);border:var(--gcds-topic-menu-border-width) solid var(--gcds-topic-menu-button-border);color:var(--gcds-topic-menu-button-text);cursor:pointer;font:var(--gcds-topic-menu-button-font);margin-inline-start:0;padding:var(--gcds-topic-menu-button-padding);text-transform:uppercase}:host .gcds-topic-menu button[aria-haspopup=true].gcds-topic-menu--home{background-color:var(--gcds-topic-menu-button-home-background);border-color:var(--gcds-topic-menu-button-home-border-color);color:var(--gcds-topic-menu-button-home-text)}:host .gcds-topic-menu button[aria-haspopup=true]:hover,:host .gcds-topic-menu button[aria-haspopup=true][aria-expanded=true]{background-color:var(--gcds-topic-menu-button-expanded-background);border-color:var(--gcds-topic-menu-button-expanded-border-color);color:var(--gcds-topic-menu-button-expanded-text)}:host .gcds-topic-menu [aria-haspopup=true][aria-expanded=false]+[role=menu]{display:none}:host .gcds-topic-menu button[aria-haspopup=true][aria-expanded=true]+[role=menu]{z-index:9999}:host .gcds-topic-menu button[aria-haspopup=true][aria-expanded=true]+[role=menu] [role=menuitem]{position:relative;z-index:9999}:host .gcds-topic-menu [aria-haspopup=true][aria-expanded=true]+[role=menu]{z-index:9998}:host .gcds-topic-menu [role=menu]{background-color:var(--gcds-topic-menu-themelist-background);color:var(--gcds-topic-menu-themelist-text);list-style:none;margin:0;padding:0;position:absolute;width:var(--gcds-topic-menu-themelist-width)}:host .gcds-topic-menu [role=menu]>li{border-inline-start:var(--gcds-topic-menu-border-width) solid var(--gcds-topic-menu-themelist-item-border)}:host .gcds-topic-menu [role=menu]>li:first-child{border-block-start:var(--gcds-topic-menu-border-width) solid var(--gcds-topic-menu-themelist-item-border)}:host .gcds-topic-menu [role=menu]>li:last-child{border-block-end:var(--gcds-topic-menu-border-width) solid var(--gcds-topic-menu-themelist-item-border)}:host .gcds-topic-menu [role=menu] [role=menu]{background-color:var(--gcds-topic-menu-topiclist-background);border-block-start:var(--gcds-topic-menu-border-width) solid var(--gcds-topic-menu-topiclist-border);-webkit-box-shadow:var(--gcds-topic-menu-topiclist-box-shadow);box-shadow:var(--gcds-topic-menu-topiclist-box-shadow);color:var(--gcds-topic-menu-topiclist-text);left:var(--gcds-topic-menu-topiclist-left);margin-block-end:var(--gcds-topic-menu-topiclist-margin-block-end);min-height:var(--gcds-topic-menu-topiclist-min-height);padding:var(--gcds-topic-menu-topiclist-padding);top:0;width:var(--gcds-topic-menu-topiclist-width)}:host .gcds-topic-menu [role=menu] [role=menu] li{border:0;width:45%}:host .gcds-topic-menu [role=menu] [role=menu] li [role=menuitem]{border-block-end:0;border-inline-end:0;color:var(--gcds-topic-menu-topiclist-menuitem-text);padding:var(--gcds-topic-menu-topiclist-menuitem-padding);text-decoration:underline;width:auto}:host .gcds-topic-menu [role=menu] [role=menu] li [role=menuitem][aria-haspopup=true],:host .gcds-topic-menu [role=menu] [role=menu] li [role=menuitem][aria-haspopup=true]:hover{color:var(--gcds-topic-menu-topiclist-menuitem-popup-text);font:var(--gcds-topic-menu-topiclist-menuitem-popup-font);text-decoration:none}@media (hover:hover){:host .gcds-topic-menu [role=menu] [role=menu] li [role=menuitem]:hover{color:var(--gcds-topic-menu-topiclist-menuitem-hover-text);text-decoration-thickness:var(\n                    --gcds-topic-menu-topiclist-menuitem-hover-text-decoration-thickness\n                  )}}:host .gcds-topic-menu [role=menu] [role=menu] li:first-child{margin-block-end:var(\n                --gcds-topic-menu-topiclist-item-first-margin-block-end\n              );width:100%}:host .gcds-topic-menu [role=menu] [role=menu] li:first-child [role=menuitem]{font:var(--gcds-topic-menu-topiclist-item-first-font);text-decoration:underline}:host .gcds-topic-menu [role=menu] [role=menu] li:last-child{left:var(--gcds-topic-menu-topiclist-item-last-left);position:absolute;top:var(--gcds-topic-menu-topiclist-item-last-top)}:host .gcds-topic-menu [role=menu] [role=menu] li:last-child [aria-expanded=true]{background:transparent}:host .gcds-topic-menu [role=menu] [role=menu] li:last-child [role=menu]{list-style:disc;padding-block-start:0}:host .gcds-topic-menu [role=menu] [role=menu] [role=menu]{background:transparent;border-block-start:0;-webkit-box-shadow:none;box-shadow:none;left:auto;min-height:auto;top:auto;width:auto}:host .gcds-topic-menu [role=menu] [role=menu] [role=menu] li{width:var(--gcds-topic-menu-mostrequested-item-width)}:host .gcds-topic-menu [role=menu] [role=menu] [role=menu] li:first-child{margin-block-end:var(\n                  --gcds-topic-menu-mostrequested-item-first-margin-block-end\n                )}:host .gcds-topic-menu [role=menu] [role=menu] [role=menu] li:first-child [role=menuitem]{font:var(--gcds-topic-menu-mostrequested-item-first-font);text-decoration:underline;width:auto}:host .gcds-topic-menu [role=menu] [role=menu] [role=menu] li:last-child{left:auto;position:relative;top:auto}@media screen and (61.9375rem <= width <= 74.9375rem){:host .gcds-topic-menu [role=menu] [role=menu] li{width:auto}:host .gcds-topic-menu [role=menu] [role=menu] li:last-child{left:auto;margin-block-start:var(\n                --gcds-topic-menu-mostrequested-item-last-margin-block-start\n              );position:relative;top:auto}:host .gcds-topic-menu [role=menu] [role=menu] [role=menu]{margin-block-end:0;padding-block-end:0;position:relative}:host .gcds-topic-menu [role=menu] [role=menu] [role=menu] li:last-child{margin-block-start:0}}:host .gcds-topic-menu [role=menuitem],:host .gcds-topic-menu [role=menuitem]:visited{border-block-end:var(--gcds-topic-menu-border-width) solid var(--gcds-topic-menu-menuitem-border-block-end);border-inline-end:var(--gcds-topic-menu-border-width) solid var(--gcds-topic-menu-menuitem-border-inline-end);box-sizing:border-box;color:var(--gcds-topic-menu-menuitem-text);display:block;font:var(--gcds-topic-menu-menuitem-font);padding:var(--gcds-topic-menu-menuitem-padding);text-decoration:none;text-underline-offset:var(\n          --gcds-topic-menu-menuitem-text-underline-offset\n        );width:var(--gcds-topic-menu-menuitem-width)}:host .gcds-topic-menu [role=menuitem]:hover,:host .gcds-topic-menu [role=menuitem]:visited:hover,:host .gcds-topic-menu [role=menuitem]:visited[aria-expanded=true],:host .gcds-topic-menu [role=menuitem][aria-expanded=true]{background-color:var(--gcds-topic-menu-menuitem-expanded-background);color:var(--gcds-topic-menu-menuitem-expanded-text)}}@layer mobile{@media screen and (width <= 61.9375rem){:host .gcds-topic-menu .visible-sm-inline{display:inline-block;text-decoration:underline}:host .gcds-topic-menu .hidden-sm{display:none}:host .gcds-topic-menu [role=menu]{margin-block-end:var(\n          --gcds-topic-menu-mobile-themelist-margin-block-start\n        );position:static;width:auto}:host .gcds-topic-menu [role=menu] [role=menu]{border-block-start:0;-webkit-box-shadow:none;box-shadow:none;margin-block-end:0;min-height:auto;padding:0;width:auto}:host .gcds-topic-menu [role=menu] [role=menu] li{width:auto}:host .gcds-topic-menu [role=menu] [role=menu] li [role=menuitem]{border-block-end:var(--gcds-topic-menu-border-width) solid var(\n                  --gcds-topic-menu-mobile-topiclist-menuitem-border-block-end\n                );padding:var(--gcds-topic-menu-mobile-topiclist-menuitem-padding)}@media (hover:hover){:host .gcds-topic-menu [role=menu] [role=menu] li [role=menuitem]:hover{background-color:transparent;color:var(\n                    --gcds-topic-menu-mobile-topiclist-menuitem-hover-text\n                  )}}:host .gcds-topic-menu [role=menu] [role=menu] li [role=menuitem][aria-haspopup]{font:var(\n                  --gcds-topic-menu-mobile-topiclist-menuitem-haspopup-font\n                )}:host .gcds-topic-menu [role=menu] [role=menu] li:first-child{margin-block-end:0}:host .gcds-topic-menu [role=menu] [role=menu] li:first-child [role=menuitem]{border-block-end:var(--gcds-topic-menu-border-width) solid var(\n                  --gcds-topic-menu-mobile-topiclist-item-first-menuitem-border\n                );color:var(\n                --gcds-topic-menu-mobile-topiclist-item-first-menuitem-text\n              );font:var(\n                --gcds-topic-menu-mobile-topiclist-menuitem-haspopup-font\n              );text-decoration:underline;width:auto}:host .gcds-topic-menu [role=menu] [role=menu] li:last-child{left:auto;position:static;top:auto}:host .gcds-topic-menu [role=menu] [role=menu] li:last-child [role=menuitem]{border-block-end:var(--gcds-topic-menu-border-width) solid var(--gcds-topic-menu-mobile-mostrequested-border);color:var(\n                --gcds-topic-menu-mobile-topiclist-item-last-menuitem-text\n              );text-decoration:none}@media (hover:hover){:host .gcds-topic-menu [role=menu] [role=menu] li:last-child [role=menuitem]:hover{color:var(\n                    --gcds-topic-menu-mobile-topiclist-item-last-menuitem-hover-text\n                  );text-decoration:underline}}:host .gcds-topic-menu [role=menu] [role=menu] li:last-child [role=menu]{list-style:none;padding-block-start:0}:host .gcds-topic-menu [role=menu] [role=menu] li:last-child [role=menu] li{width:auto}:host .gcds-topic-menu [role=menu] [role=menu] li:last-child [role=menu] li [role=menuitem]{border-block-end:var(--gcds-topic-menu-border-width) solid var(--gcds-topic-menu-mobile-mostrequested-border)}@media (hover:hover){:host .gcds-topic-menu [role=menu] [role=menu] li:last-child [role=menu] li [role=menuitem]:hover{color:var(\n                        --gcds-topic-menu-mobile-mostrequested-hover-text\n                      );text-decoration:underline}}:host .gcds-topic-menu [role=menu] [role=menu] li:first-child,:host .gcds-topic-menu [role=menu] [role=menu] li:last-child{background-color:var(\n              --gcds-topic-menu-mobile-mostrequested-background\n            )}:host .gcds-topic-menu [role=menuitem]{width:auto}:host .gcds-topic-menu [aria-expanded=true]:not(button)+[role=menu] li{margin-inline-start:var(\n              --gcds-topic-menu-mobile-item-expanded-margin-inline-start\n            )}:host .gcds-topic-menu [aria-expanded=true]:not(button)+[role=menu] li:first-child,:host .gcds-topic-menu [aria-expanded=true]:not(button)+[role=menu] li:last-child{margin-inline-start:0}:host .gcds-topic-menu [aria-expanded=true]:not(button)+[role=menu] li:first-child [role=menuitem],:host .gcds-topic-menu [aria-expanded=true]:not(button)+[role=menu] li:last-child [role=menuitem]{padding-inline-start:var(\n                  --gcds-topic-menu-mobile-item-expanded-padding-inline-start\n                )}:host .gcds-topic-menu [aria-expanded=true]:not(button)+[role=menu] li:last-child [role=menu] [role=menuitem]{padding-inline-start:0}:host .gcds-topic-menu [aria-expanded=true]:not(button)+[role=menu] [role=menu] li{margin-inline-start:var(\n              --gcds-topic-menu-mobile-mostrequested-expanded-margin-inline-start\n            )}:host .gcds-topic-menu [aria-expanded=true]+[role=menu] [role=menu] [role=menu]{background-color:var(\n            --gcds-topic-menu-mobile-mostrequested-background\n          )}:host .gcds-topic-menu [aria-haspopup]:not(button):before{content:\"\\25BA\\a0\"}:host .gcds-topic-menu [aria-haspopup][aria-expanded=true]:not(button):before{content:\"\\25BC\\a0\"}:host .gcds-topic-menu button[aria-haspopup=true][aria-expanded=true]+[role=menu]{border-inline-end:var(--gcds-topic-menu-border-width) solid var(--gcds-topic-menu-mobile-themelist-border)}}}@layer xsMobile{@media screen and (width <= 47.9375rem){:host .gcds-topic-menu>[role=menu]{margin-inline:calc(-50vw - -50%)}}}@layer focus{:host .gcds-topic-menu :is(button[aria-haspopup=true],[role=menuitem]):focus{background-color:var(--gcds-topic-menu-focus-background);border-color:var(--gcds-topic-menu-focus-background);border-inline-end:0;border-radius:var(--gcds-topic-menu-focus-border-radius);box-shadow:var(--gcds-topic-menu-focus-box-shadow);color:var(--gcds-topic-menu-focus-text);outline:var(--gcds-topic-menu-focus-outline);outline-offset:var(--gcds-topic-menu-focus-outline-offset)}}";
const GcdsTopicMenuStyle0 = gcdsTopicMenuCss;

const GcdsTopicMenu = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.home = false;
        this.open = false;
        this.lang = undefined;
        this.navItems = [];
        this.navSize = undefined;
    }
    /**
     * Keyboard controls of theme and topic menu
     */
    async keyDownListener(e) {
        if (this.el == document.activeElement &&
            this.themeList.contains(document.activeElement.shadowRoot.activeElement)) {
            const key = e.key;
            const currentIndex = this.navItems.indexOf(document.activeElement.shadowRoot.activeElement);
            const activeElement = this.navItems[currentIndex];
            switch (key) {
                case 'ArrowDown':
                    e.preventDefault();
                    // If on last item, jump to first item
                    if (currentIndex + 1 > this.navItems.length - 1) {
                        await this.focusMenuLink(this.navItems, activeElement, 0);
                        // Jump to next item
                    }
                    else {
                        await this.focusMenuLink(this.navItems, activeElement, currentIndex + 1);
                    }
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    // If on first item, jump to last
                    if (currentIndex - 1 < 0) {
                        await this.focusMenuLink(this.navItems, activeElement, this.navItems.length - 1);
                        // Jump to next item
                    }
                    else {
                        await this.focusMenuLink(this.navItems, activeElement, currentIndex - 1);
                    }
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    // Theme links
                    if (activeElement.hasAttribute('aria-haspopup') &&
                        !activeElement.hasAttribute('data-keep-expanded')) {
                        await this.updateNavItemQueue(activeElement.parentNode.children[1]);
                        activeElement.setAttribute('aria-expanded', 'true');
                        this.navItems[0].focus();
                        // Most requested link - desktop
                    }
                    else if (activeElement.hasAttribute('aria-haspopup') &&
                        this.navSize == 'desktop') {
                        await this.focusMenuLink(this.navItems, activeElement, currentIndex + 1);
                        // Most requested link - mobile
                    }
                    else if (activeElement.hasAttribute('aria-haspopup') &&
                        this.navSize == 'mobile') {
                        await this.updateNavItemQueue(activeElement.parentNode.children[1]);
                        activeElement.setAttribute('aria-expanded', 'true');
                        this.navItems[0].focus();
                    }
                    break;
                case 'Enter':
                    if (activeElement.closest('ul').hasAttribute('data-top-menu')) {
                        await this.updateNavItemQueue(activeElement.parentNode.children[1]);
                        this.navItems[0].focus();
                    }
                    break;
                case 'ArrowLeft':
                case 'Escape': {
                    e.preventDefault();
                    const parentList = activeElement.closest('ul');
                    // In most requested menu
                    if (parentList.parentNode
                        .querySelector('a')
                        .hasAttribute('data-keep-expanded')) {
                        await this.updateNavItemQueue(parentList.parentNode.closest('ul'));
                        await this.focusMenuLink(this.navItems, activeElement, this.navItems.indexOf(parentList.parentNode.querySelector('a')));
                        // on mobile, close expandable area
                        if (this.navSize == 'mobile') {
                            parentList.parentNode
                                .querySelector('a')
                                .setAttribute('aria-expanded', 'false');
                        }
                        // Exit menu
                    }
                    else if (parentList.parentNode.closest('ul')) {
                        await this.updateNavItemQueue(parentList.parentNode.closest('ul'));
                        await this.focusMenuLink(this.navItems, activeElement, this.navItems.indexOf(parentList.parentNode.querySelector('a')));
                        if (this.navSize == 'mobile') {
                            parentList.parentNode
                                .querySelector('a')
                                .setAttribute('aria-expanded', 'false');
                        }
                        // Close theme and topic menu, focus menu button
                    }
                    else {
                        this.menuButton.focus();
                        await this.toggleNav();
                    }
                    break;
                }
                case 'Tab':
                    await this.toggleNav();
                    break;
            }
        }
    }
    /**
     * Close all theme menus
     */
    async closeAllMenus() {
        for (let x = 0; x < this.themeList.children.length; x++) {
            const themeLink = this.themeList.children[x].querySelector('a');
            themeLink.setAttribute('aria-expanded', 'false');
        }
    }
    /**
     * Toggle open theme and topic menu
     */
    async toggleNav() {
        this.open = !this.open;
        if (this.open) {
            // Check window size to set the state
            const mediaQuery = window.matchMedia('screen and (max-width: 991px)');
            const nav = this.el;
            if (mediaQuery.matches) {
                this.navSize = 'mobile';
            }
            else {
                this.navSize = 'desktop';
            }
            // Add change event listener to keep track of window changing size
            mediaQuery.addEventListener('change', async (e) => {
                if (e.matches) {
                    nav.updateNavSize('mobile');
                    nav.shadowRoot
                        .querySelectorAll('[data-keep-expanded]')
                        .forEach(el => {
                        el.setAttribute('aria-expanded', 'false');
                    });
                }
                else {
                    nav.updateNavSize('desktop');
                    nav.shadowRoot
                        .querySelectorAll('[data-keep-expanded]')
                        .forEach(el => {
                        el.setAttribute('aria-expanded', 'true');
                    });
                }
            });
            if (this.navSize == 'desktop') {
                this.themeList.children[0].children[0].setAttribute('aria-expanded', 'true');
            }
            else {
                // Close most requested on mobile
                this.el.shadowRoot
                    .querySelectorAll('[data-keep-expanded]')
                    .forEach(el => {
                    el.setAttribute('aria-expanded', 'false');
                });
            }
            setTimeout(() => {
                this.themeList.children[0].querySelector('a').focus();
            }, 50);
            await this.updateNavItemQueue(this.themeList);
        }
        else {
            this.closeAllMenus();
        }
    }
    /*
     * Pass new window size: desktop or mobile
     */
    async updateNavSize(size) {
        this.navSize = size;
    }
    /*
     * Get current navSize state
     */
    async getNavSize() {
        return this.navSize;
    }
    /**
     * Update keyboard focus queue
     */
    async updateNavItemQueue(parent) {
        const focusableElements = [];
        for (let x = 0; x < parent.children.length; x++) {
            const link = parent.children[x].querySelector('a');
            if (link) {
                focusableElements.push(link);
                if (link.hasAttribute('data-keep-expanded') &&
                    this.navSize == 'desktop') {
                    for (let c = 0; c < link.parentNode.children[1].children.length; c++) {
                        focusableElements.push(link.parentNode.children[1].children[c].querySelector('a'));
                    }
                }
            }
        }
        this.navItems = focusableElements;
    }
    /**
     * Focus menu link
     */
    focusMenuLink(queue, activeElement, nextStep) {
        if (activeElement.closest('ul').hasAttribute('data-top-menu') &&
            activeElement.hasAttribute('aria-haspopup') &&
            !activeElement.hasAttribute('data-keep-expanded')) {
            this.closeAllMenus();
        }
        else if (activeElement.hasAttribute('aria-haspopup') &&
            !activeElement.hasAttribute('data-keep-expanded')) {
            activeElement.setAttribute('aria-expanded', 'false');
        }
        queue[nextStep].focus();
        if (queue[nextStep].hasAttribute('aria-haspopup') &&
            this.navSize == 'desktop') {
            queue[nextStep].setAttribute('aria-expanded', 'true');
        }
    }
    /*
     * Observe lang attribute change
     */
    updateLang() {
        const observer = new MutationObserver(mutations => {
            if (mutations[0].oldValue != this.el.lang) {
                this.lang = this.el.lang;
            }
        });
        observer.observe(this.el, observerConfig);
    }
    async componentWillLoad() {
        // Define lang attribute
        this.lang = assignLanguage(this.el);
        this.updateLang();
        try {
            const response = await fetch(`https://www.canada.ca/content/dam/canada/sitemenu/sitemenu-v2-${this.lang}.html`);
            this.listItems = await response.text();
        }
        catch (error) {
            this.listItems = snapshots[this.lang];
        }
    }
    async componentDidLoad() {
        const hostElement = this.el;
        let menuEnterTimer;
        // Since we load the HTML, loop through elements and add event listeners to add functionality
        for (let x = 0; x < this.themeList.children.length; x++) {
            const themeLink = this.themeList.children[x].querySelector('a');
            // Click
            themeLink.addEventListener('click', async (e) => {
                e.preventDefault();
                // Open topic lists
                if ((await hostElement.getNavSize()) == 'desktop') {
                    await hostElement.closeAllMenus();
                    themeLink.setAttribute('aria-expanded', 'true');
                }
                else {
                    if (themeLink.getAttribute('aria-expanded') == 'false') {
                        themeLink.setAttribute('aria-expanded', 'true');
                        await hostElement.updateNavItemQueue(themeLink.parentNode.children[1]);
                        setTimeout(() => {
                            themeLink.parentNode.children[1].children[0]
                                .querySelector('a')
                                .focus();
                        }, 50);
                    }
                    else {
                        await hostElement.closeAllMenus();
                        await hostElement.updateNavItemQueue(themeLink.closest('ul'));
                        setTimeout(() => {
                            themeLink.focus();
                        }, 50);
                    }
                }
            });
            // Hover actions
            themeLink.addEventListener('mouseenter', async () => {
                // Change active theme if hovering on menuitem
                if ((await hostElement.getNavSize()) == 'desktop') {
                    menuEnterTimer = setTimeout(async function () {
                        await hostElement.closeAllMenus();
                        themeLink.setAttribute('aria-expanded', 'true');
                    }, 400);
                }
            });
            // Cancel hover timer if mouseut before completes
            themeLink.addEventListener('mouseleave', () => {
                clearTimeout(menuEnterTimer);
            });
            // Most requested click
            const mostRequested = this.themeList.children[x]
                .querySelector('ul')
                .querySelector('[aria-haspopup]');
            mostRequested.addEventListener('click', async (e) => {
                e.preventDefault();
                if ((await hostElement.getNavSize()) == 'mobile') {
                    if (mostRequested.getAttribute('aria-expanded') == 'true') {
                        mostRequested.setAttribute('aria-expanded', 'false');
                    }
                    else {
                        mostRequested.setAttribute('aria-expanded', 'true');
                        const mostRequestedList = mostRequested.parentNode.querySelector('ul');
                        mostRequestedList.children[0].querySelector('a').focus();
                        await hostElement.updateNavItemQueue(mostRequestedList);
                    }
                }
            });
        }
    }
    render() {
        const { home, lang } = this;
        return (index.h(index.Host, null, index.h("nav", { class: "gcds-topic-menu", "aria-labelledby": "gcds-topic-menu__heading" }, index.h("gcds-sr-only", { id: "gcds-topic-menu__heading", tag: "h2" }, I18N$1[lang].menuLabelFull), index.h("button", { "aria-haspopup": "true", "aria-expanded": this.open.toString(), "aria-label": I18N$1[lang].buttonLabel, onClick: async () => await this.toggleNav(), ref: element => (this.menuButton = element), class: home && 'gcds-topic-menu--home' }, this.lang == 'en' ? (index.h(index.Fragment, null, index.h("gcds-sr-only", { tag: "span" }, I18N$1[lang].menuLabelHidden), I18N$1[lang].menuToggle)) : (index.h(index.Fragment, null, I18N$1[lang].menuToggle, index.h("gcds-sr-only", { tag: "span" }, I18N$1[lang].menuLabelHidden))), index.h("gcds-icon", { name: "chevron-down", "margin-left": "150", size: "caption" })), index.h("ul", { role: "menu", "aria-orientation": "vertical", "data-top-menu": true, innerHTML: this.listItems, ref: element => (this.themeList = element) }))));
    }
    get el() { return index.getElement(this); }
};
GcdsTopicMenu.style = GcdsTopicMenuStyle0;

const I18N = {
  en: {
    summary: {
      text: 'An official website of the Government of Canada.',
      link: 'Learn to recognize one',
    },
    content: {
      description:
        "It can be hard to know what sites to trust. Here's how to identify a Government of Canada website before you share any info:",
      url: {
        heading: 'Canada.ca or gc.ca',
        text: "Government of Canada website's normally use Canada.ca or gc.ca in the URL.",
      },
      languages: {
        heading: "Available in both of Canada's Official Languages",
        text: 'Information will be available in both English and French.',
      },
      https: {
        heading: 'HTTPS',
        text: 'Secure Government of Canada websites use',
      },
      contact: {
        heading: 'A point of contact',
        text: 'Contact information will have Canada.ca, gc.ca, or the department name in the email address.',
      },
    },
  },
  fr: {
    summary: {
      text: 'Les sites Web officiels du gouvernement du Canada.',
      link: 'Comment les reconnaître',
    },
    content: {
      description:
        "Il peut être difficile de savoir quels sites sont fiables. Avant de partager des renseignements, vérifiez les points suivant pour déterminer s'il s'agit bien d'un site du gouvernement du Canada:",
      url: {
        heading: 'Canada.ca ou gc.ca',
        text: "On retrouve normalement Canada.ca ou gc.ca dans l'adresse URL d'un site Web du gouvernement du Canada.",
      },
      languages: {
        heading: 'Offert dans les deux langues officielles',
        text: 'Vérifiez que les renseignements sont accessibles en français et en anglais.',
      },
      https: {
        heading: 'HTTPS',
        text: "Lorsqu'un navigateur affiche les sites Web sécuritaires du gouvernement du Canada, on retrouve",
      },
      contact: {
        heading: 'Un point de communication',
        text: "On retrouve Canada.ca, gc.ca ou le nom du ministère dans l'URL de toute adresse courriel du gouvernement du Canada.",
      },
    },
  },
};

const CanadaFlag = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 67.3 33" width="25">
  <path fill="#FF0000" d="M0,0h16v32.5H0V0z M46.5,16.6l-1-0.5c-0.5-0.2-0.3-0.6-0.2-1.1v-0.2l1-3.6l-2.9,0.6c-0.5,0.1-0.9,0.2-1.1-0.3 l-0.7-1.7l-2.8,3c-0.8,0.8-1.5,0.4-1.2-0.8l1.3-6.2l-1.9,1c-0.5,0.2-0.7,0.3-1-0.2l-2.2-4.4l-2.3,4.6c-0.2,0.3-0.6,0.2-0.9-0.1 l-2.1-1.2l1.4,6.8c0.2,0.9-0.5,1.3-1,0.7L26,9.8l-0.9,1.7c-0.2,0.4-0.4,0.6-1.2,0.4L21,11.3l1.2,3.6c0.1,0.6,0.1,0.9-0.2,1.1 l-1.3,0.7l6,4.9c0.5,0.4,0.4,0.9,0.2,1.5l-0.7,1.7l5.1-1c1.1-0.2,1.6-0.2,1.6,0.4l-0.2,6.3h1.7l-0.2-6.3c0-0.6,0.5-0.6,1.2-0.4 l5.5,1l-0.5-1.7c-0.2-0.7-0.4-0.9,0.2-1.5L46.5,16.6z M51.4,0v32.5h16V0H51.4z" />
</svg>`;

const ContentToggleArrow = `<svg xmlns="http://www.w3.org/2000/svg"  width="12" height="7.4" viewBox="0 0 12 7.4">
  <path d="M10.6,0L6,4.6L1.4,0L0,1.4l6,6l6-6L10.6,0z" />
</svg>`;

const gcdsVerifyBannerCss = "@layer reset, default, fixed, container;@layer reset{:host{display:block}}@layer default{:host .gcds-verify-banner{background-color:var(--gcds-verify-banner-background);color:var(--gcds-verify-banner-text);font:var(--gcds-verify-banner-font)}:host .gcds-verify-banner :is(summary,.verify-banner__content){font-size:90%}:host .gcds-verify-banner summary{cursor:pointer;display:flex;margin-inline:auto;padding-block:var(--gcds-verify-banner-summary-padding)}:host .gcds-verify-banner summary :is(.svg-container,p small){margin:var(--gcds-verify-banner-summary-content-margin)}:host .gcds-verify-banner summary p{align-items:center;display:flex;flex-wrap:wrap;line-height:var(--gcds-verify-banner-line-height);margin:0}:host .gcds-verify-banner summary .verify-banner__toggle{background:none;border:0;color:var(--gcds-verify-banner-toggle-text);flex:0 0 auto;font-weight:var(--gcds-verify-banner-toggle-font-weight);padding:0;pointer-events:none;text-decoration:underline}:host .gcds-verify-banner summary .verify-banner__toggle .svg-container path{fill:var(--gcds-verify-banner-toggle-text)}:host .gcds-verify-banner .verify-banner__content{border-block-start:var(--gcds-verify-banner-content-border-width) solid var(--gcds-verify-banner-content-border-color);margin:0 auto;padding-block-end:var(--gcds-verify-banner-content-padding-block-end);padding-block-start:var(\n        --gcds-verify-banner-content-padding-block-start\n      )}:host .gcds-verify-banner .verify-banner__content li{list-style:none}:host .gcds-verify-banner .verify-banner__content li :is(h4,p){width:90%}:host .gcds-verify-banner .verify-banner__content h4{margin:var(--gcds-verify-banner-content-heading-margin)}:host .gcds-verify-banner .verify-banner__content p{line-height:var(--gcds-verify-banner-line-height);margin:0}:host .gcds-verify-banner[open] summary .verify-banner__toggle svg{transform:rotate(-180deg)}}@layer fixed{:host .gcds-verify-banner.verify-banner--is-fixed{position:sticky;top:0;width:var(--gcds-verify-banner-max-content-width-full);z-index:9999}}@layer container{:host .gcds-verify-banner .container-lg,:host .gcds-verify-banner .container-md,:host .gcds-verify-banner .container-sm,:host .gcds-verify-banner .container-xl,:host .gcds-verify-banner .container-xs{width:90%}:host .gcds-verify-banner .container-full{max-width:var(--gcds-verify-banner-container-full);padding-inline:var(--gcds-verify-banner-container-padding)}:host .gcds-verify-banner .container-xl{max-width:var(--gcds-verify-banner-container-xl)}:host .gcds-verify-banner .container-lg{max-width:var(--gcds-verify-banner-container-lg)}:host .gcds-verify-banner .container-md{max-width:var(--gcds-verify-banner-container-md)}:host .gcds-verify-banner .container-sm{max-width:var(--gcds-verify-banner-container-sm)}:host .gcds-verify-banner .container-xs{max-width:var(--gcds-verify-banner-container-xs)}}";
const GcdsVerifyBannerStyle0 = gcdsVerifyBannerCss;

const GcdsVerifyBanner = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.container = 'xl';
        this.isFixed = false;
        this.lang = undefined;
    }
    /*
     * Observe lang attribute change
     */
    updateLang() {
        const observer = new MutationObserver(mutations => {
            if (mutations[0].oldValue != this.el.lang) {
                this.lang = this.el.lang;
            }
        });
        observer.observe(this.el, observerConfig);
    }
    async componentWillLoad() {
        // Define lang attribute
        this.lang = assignLanguage(this.el);
        this.updateLang();
    }
    render() {
        const { container, isFixed, lang } = this;
        return (index.h(index.Host, null, index.h("details", { class: `gcds-verify-banner ${isFixed ? 'verify-banner--is-fixed' : ''}` }, index.h("summary", { class: container ? `container-${container}` : '', "aria-expanded": "false", role: "button" }, index.h("span", { class: "svg-container", innerHTML: CanadaFlag }), index.h("p", null, index.h("small", null, I18N[lang].summary.text), index.h("button", { class: "verify-banner__toggle" }, index.h("small", null, I18N[lang].summary.link), index.h("span", { class: "svg-container", innerHTML: ContentToggleArrow })))), index.h("div", { class: `verify-banner__content ${container ? `container-${container}` : ''}` }, index.h("p", null, index.h("small", null, I18N[lang].content.description)), index.h("br", null), index.h("gcds-grid", { tag: "ul", container: "lg", columns: "1fr", "columns-tablet": container === 'xs' || container === 'sm' ? '1fr' : '1fr 1fr' }, index.h("li", null, index.h("h4", null, I18N[lang].content.url.heading), index.h("p", null, index.h("small", null, I18N[lang].content.url.text))), index.h("li", null, index.h("h4", null, I18N[lang].content.languages.heading), index.h("p", null, index.h("small", null, I18N[lang].content.languages.text))), index.h("li", null, index.h("h4", null, I18N[lang].content.https.heading), index.h("p", null, index.h("small", null, I18N[lang].content.https.text, " ", index.h("strong", null, "https://"), "."))), index.h("li", null, index.h("h4", null, I18N[lang].content.contact.heading), index.h("p", null, index.h("small", null, I18N[lang].content.contact.text))))))));
    }
    get el() { return index.getElement(this); }
};
GcdsVerifyBanner.style = GcdsVerifyBannerStyle0;

exports.gcds_alert = GcdsAlert;
exports.gcds_breadcrumbs = GcdsBreadcrumbs;
exports.gcds_breadcrumbs_item = GcdsBreadcrumbsItem;
exports.gcds_button = GcdsButton;
exports.gcds_card = GcdsCard;
exports.gcds_checkbox = GcdsCheckbox;
exports.gcds_container = GcdsContainer;
exports.gcds_date_input = GcdsDateInput;
exports.gcds_date_modified = GcdsDateModified;
exports.gcds_details = GcdsDetails;
exports.gcds_error_message = GcdsErrorMessage;
exports.gcds_error_summary = GcdsErrorSummary;
exports.gcds_fieldset = GcdsFieldset;
exports.gcds_file_uploader = GcdsFileUploader;
exports.gcds_footer = GcdsFooter;
exports.gcds_grid = GcdsGrid;
exports.gcds_grid_col = GcdsGridCol;
exports.gcds_header = GcdsHeader;
exports.gcds_heading = GcdsHeading;
exports.gcds_hint = GcdsHint;
exports.gcds_icon = GcdsIcon;
exports.gcds_input = GcdsInput;
exports.gcds_label = GcdsLabel;
exports.gcds_lang_toggle = GcdsLangToggle;
exports.gcds_link = GcdsLink;
exports.gcds_nav_group = GcdsNavGroup;
exports.gcds_nav_link = GcdsNavLink;
exports.gcds_pagination = GcdsPagination;
exports.gcds_phase_banner = GcdsPhaseBanner;
exports.gcds_radio_group = GcdsRadioGroup;
exports.gcds_search = GcdsSearch;
exports.gcds_select = GcdsSelect;
exports.gcds_side_nav = GcdsSideNav;
exports.gcds_signature = GcdsSignature;
exports.gcds_sr_only = GcdsSrOnly;
exports.gcds_stepper = GcdsStepper;
exports.gcds_text = GcdsText;
exports.gcds_textarea = GcdsTextarea;
exports.gcds_top_nav = GcdsTopNav;
exports.gcds_topic_menu = GcdsTopicMenu;
exports.gcds_verify_banner = GcdsVerifyBanner;

//# sourceMappingURL=gcds-alert_41.cjs.entry.js.map