import { b as bootstrapLazy } from './index-04fcdc9c.js';
export { s as setNonce } from './index-04fcdc9c.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

const defineCustomElements = async (win, options) => {
  if (typeof window === 'undefined') return undefined;
  await globalScripts();
  return bootstrapLazy(JSON.parse("[[\"gcds-alert_42\",[[81,\"gcds-date-input\",{\"name\":[1],\"legend\":[1],\"format\":[1],\"value\":[1025],\"required\":[4],\"hint\":[1],\"errorMessage\":[1025,\"error-message\"],\"disabled\":[1028],\"validator\":[1040],\"validateOn\":[1025,\"validate-on\"],\"monthValue\":[32],\"dayValue\":[32],\"yearValue\":[32],\"hasError\":[32],\"errors\":[32],\"lang\":[32],\"validate\":[64]},[[4,\"submit\",\"submitListener\"]],{\"name\":[\"validateName\"],\"legend\":[\"validateLegend\"],\"format\":[\"validateFormat\"],\"value\":[\"validateValue\"],\"validator\":[\"validateValidator\"]}],[81,\"gcds-file-uploader\",{\"uploaderId\":[1537,\"uploader-id\"],\"name\":[1],\"label\":[513],\"required\":[516],\"disabled\":[1540],\"value\":[1040],\"accept\":[513],\"multiple\":[516],\"files\":[1040],\"errorMessage\":[1537,\"error-message\"],\"hint\":[513],\"validator\":[1040],\"validateOn\":[1025,\"validate-on\"],\"hasError\":[32],\"inheritedAttributes\":[32],\"lang\":[32],\"validate\":[64]},[[4,\"submit\",\"submitListener\"]],{\"disabled\":[\"validateDisabledSelect\"],\"files\":[\"watchFiles\"],\"errorMessage\":[\"validateErrorMessage\"],\"validator\":[\"validateValidator\"],\"hasError\":[\"validateHasError\"]}],[81,\"gcds-checkbox\",{\"checkboxId\":[1537,\"checkbox-id\"],\"label\":[513],\"name\":[513],\"required\":[516],\"disabled\":[1540],\"value\":[513],\"checked\":[1540],\"errorMessage\":[1537,\"error-message\"],\"hint\":[513],\"validator\":[1040],\"validateOn\":[1025,\"validate-on\"],\"parentError\":[32],\"inheritedAttributes\":[32],\"hasError\":[32],\"lang\":[32],\"validate\":[64]},[[16,\"gcdsGroupError\",\"gcdsGroupError\"],[16,\"gcdsGroupErrorClear\",\"gcdsGroupErrorClear\"],[4,\"submit\",\"submitListener\"]],{\"disabled\":[\"validateDisabledCheckbox\"],\"errorMessage\":[\"validateErrorMessage\"],\"validator\":[\"validateValidator\"],\"hasError\":[\"validateHasError\"]}],[1,\"gcds-header\",{\"langHref\":[513,\"lang-href\"],\"signatureVariant\":[1,\"signature-variant\"],\"signatureHasLink\":[4,\"signature-has-link\"],\"skipToHref\":[1,\"skip-to-href\"],\"lang\":[32]}],[81,\"gcds-textarea\",{\"characterCount\":[2,\"character-count\"],\"cols\":[2],\"disabled\":[1028],\"errorMessage\":[1025,\"error-message\"],\"hideLabel\":[4,\"hide-label\"],\"hint\":[1],\"label\":[1],\"name\":[1],\"required\":[4],\"rows\":[2],\"textareaId\":[1,\"textarea-id\"],\"value\":[1025],\"validator\":[1040],\"validateOn\":[1025,\"validate-on\"],\"inheritedAttributes\":[32],\"hasError\":[32],\"lang\":[32],\"validate\":[64]},[[4,\"submit\",\"submitListener\"]],{\"disabled\":[\"validateDisabledTextarea\"],\"errorMessage\":[\"validateErrorMessage\"],\"value\":[\"watchValue\"],\"validator\":[\"validateValidator\"],\"hasError\":[\"validateHasError\"]}],[1,\"gcds-card\",{\"cardTitle\":[513,\"card-title\"],\"href\":[513],\"cardTitleTag\":[1,\"card-title-tag\"],\"description\":[513],\"badge\":[1537],\"imgSrc\":[513,\"img-src\"],\"imgAlt\":[513,\"img-alt\"],\"lang\":[32],\"errors\":[32]},null,{\"cardTitle\":[\"validateCardTitle\"],\"href\":[\"validateHref\"],\"badge\":[\"validateBadge\"]}],[17,\"gcds-fieldset\",{\"fieldsetId\":[513,\"fieldset-id\"],\"legend\":[513],\"required\":[516],\"errorMessage\":[1537,\"error-message\"],\"hint\":[513],\"disabled\":[1540],\"validator\":[1040],\"validateOn\":[1025,\"validate-on\"],\"hasError\":[32],\"lang\":[32],\"inheritedAttributes\":[32],\"validate\":[64]},[[0,\"gcdsBlur\",\"blurValidate\"],[16,\"gcdsGroupError\",\"gcdsParentGroupError\"],[16,\"gcdsGroupErrorClear\",\"gcdsParentGroupErrorClear\"],[4,\"submit\",\"submitListener\"]],{\"errorMessage\":[\"validateErrorMessage\"],\"disabled\":[\"validateDisabledFieldset\",\"handleDisabledChange\"],\"validator\":[\"validateValidator\"]}],[1,\"gcds-footer\",{\"display\":[1537],\"wordmarkVariant\":[1,\"wordmark-variant\"],\"contextualHeading\":[1,\"contextual-heading\"],\"contextualLinks\":[1025,\"contextual-links\"],\"subLinks\":[1025,\"sub-links\"],\"lang\":[32]},null,{\"contextualLinks\":[\"contextualLinksChanged\"],\"subLinks\":[\"subLinksChanged\"]}],[1,\"gcds-search\",{\"placeholder\":[1],\"action\":[1],\"method\":[1],\"name\":[1],\"searchId\":[1,\"search-id\"],\"value\":[1025],\"suggested\":[16],\"lang\":[32]}],[1,\"gcds-breadcrumbs\",{\"hideCanadaLink\":[4,\"hide-canada-link\"],\"lang\":[32]}],[1,\"gcds-error-summary\",{\"heading\":[513],\"listen\":[1028],\"errorLinks\":[1025,\"error-links\"],\"lang\":[32],\"errorQueue\":[32],\"hasSubmitted\":[32]},[[4,\"gcdsError\",\"errorListener\"],[4,\"gcdsValid\",\"validListener\"],[4,\"submit\",\"submitListener\"]],{\"listen\":[\"listenChanged\"],\"errorLinks\":[\"errorLinksChanged\"]}],[1,\"gcds-notice\",{\"type\":[1],\"noticeTitle\":[1,\"notice-title\"],\"noticeTitleTag\":[1,\"notice-title-tag\"],\"errors\":[32],\"lang\":[32]}],[81,\"gcds-radio-group\",{\"options\":[1],\"name\":[513],\"hasError\":[32],\"parentError\":[32],\"inheritedAttributes\":[32],\"lang\":[32]},[[16,\"gcdsGroupError\",\"gcdsGroupError\"],[16,\"gcdsGroupErrorClear\",\"gcdsGroupErrorClear\"]],{\"options\":[\"validateOptions\"]}],[1,\"gcds-alert\",{\"alertRole\":[1,\"alert-role\"],\"container\":[1],\"heading\":[1],\"hideCloseBtn\":[4,\"hide-close-btn\"],\"hideRoleIcon\":[4,\"hide-role-icon\"],\"isFixed\":[1028,\"is-fixed\"],\"isOpen\":[32],\"lang\":[32]}],[1,\"gcds-side-nav\",{\"label\":[1],\"lang\":[32],\"navItems\":[32],\"navSize\":[32],\"getNavSize\":[64],\"updateNavSize\":[64],\"updateNavItemQueue\":[64]},[[4,\"focusin\",\"focusInListener\"],[4,\"focusout\",\"focusOutListener\"],[4,\"keydown\",\"keyDownListener\"],[4,\"gcdsClick\",\"gcdsClickListener\"]]],[1,\"gcds-stepper\",{\"currentStep\":[1026,\"current-step\"],\"totalSteps\":[1026,\"total-steps\"],\"tag\":[1],\"errors\":[32],\"lang\":[32]},null,{\"currentStep\":[\"validateCurrentStep\"],\"totalSteps\":[\"validateTotalSteps\"]}],[1,\"gcds-top-nav\",{\"label\":[1],\"alignment\":[1],\"lang\":[32],\"navItems\":[32],\"navSize\":[32],\"getNavSize\":[64],\"updateNavSize\":[64],\"updateNavItemQueue\":[64]},[[4,\"focusin\",\"focusInListener\"],[4,\"focusout\",\"focusOutListener\"],[4,\"keydown\",\"keyDownListener\"],[4,\"gcdsClick\",\"gcdsClickListener\"]]],[1,\"gcds-topic-menu\",{\"home\":[4],\"open\":[32],\"lang\":[32],\"navItems\":[32],\"navSize\":[32],\"closeAllMenus\":[64],\"toggleNav\":[64],\"updateNavSize\":[64],\"getNavSize\":[64],\"updateNavItemQueue\":[64]},[[4,\"keydown\",\"keyDownListener\"]]],[1,\"gcds-verify-banner\",{\"container\":[1],\"isFixed\":[4,\"is-fixed\"],\"lang\":[32]}],[1,\"gcds-date-modified\",{\"type\":[1025],\"errors\":[32],\"lang\":[32]}],[1,\"gcds-pagination\",{\"display\":[1],\"label\":[1],\"previousHref\":[1,\"previous-href\"],\"previousLabel\":[513,\"previous-label\"],\"nextHref\":[1,\"next-href\"],\"nextLabel\":[513,\"next-label\"],\"totalPages\":[2,\"total-pages\"],\"currentPage\":[514,\"current-page\"],\"url\":[1],\"currentStep\":[32],\"lang\":[32]},null,{\"currentPage\":[\"watchCurrentPage\"],\"url\":[\"urlChanged\"],\"lang\":[\"watchLang\"]}],[1,\"gcds-phase-banner\",{\"bannerRole\":[1,\"banner-role\"],\"container\":[1],\"isFixed\":[4,\"is-fixed\"],\"lang\":[32]}],[1,\"gcds-details\",{\"detailsTitle\":[1,\"details-title\"],\"open\":[1540],\"toggle\":[64]}],[1,\"gcds-grid-col\",{\"tag\":[1],\"tablet\":[1026],\"desktop\":[1026]},null,{\"tablet\":[\"validateTablet\"],\"desktop\":[\"validateDesktop\"]}],[1,\"gcds-nav-link\",{\"href\":[513],\"current\":[516],\"lang\":[32],\"navStyle\":[32],\"focusLink\":[64]}],[81,\"gcds-input\",{\"disabled\":[1028],\"errorMessage\":[1025,\"error-message\"],\"hideLabel\":[4,\"hide-label\"],\"hint\":[1],\"inputId\":[1,\"input-id\"],\"name\":[1],\"label\":[1],\"required\":[4],\"size\":[2],\"type\":[1],\"value\":[1025],\"autocomplete\":[1],\"validator\":[1040],\"validateOn\":[1025,\"validate-on\"],\"inheritedAttributes\":[32],\"hasError\":[32],\"lang\":[32],\"validate\":[64]},[[4,\"submit\",\"submitListener\"],[4,\"keydown\",\"keyDownListener\"]],{\"disabled\":[\"validateDisabledInput\"],\"errorMessage\":[\"validateErrorMessage\"],\"validator\":[\"validateValidator\"],\"hasError\":[\"validateHasError\"],\"aria-invalid\":[\"ariaInvalidWatcher\"],\"aria-description\":[\"ariaDescriptiondWatcher\"]}],[81,\"gcds-select\",{\"selectId\":[1537,\"select-id\"],\"label\":[513],\"name\":[513],\"required\":[516],\"disabled\":[1540],\"defaultValue\":[513,\"default-value\"],\"value\":[1025],\"errorMessage\":[1537,\"error-message\"],\"hint\":[513],\"validator\":[1040],\"validateOn\":[1025,\"validate-on\"],\"hasError\":[32],\"inheritedAttributes\":[32],\"lang\":[32],\"options\":[32],\"validate\":[64]},[[4,\"submit\",\"submitListener\"]],{\"disabled\":[\"validateDisabledSelect\"],\"errorMessage\":[\"validateErrorMessage\"],\"validator\":[\"validateValidator\"],\"hasError\":[\"validateHasError\"],\"aria-invalid\":[\"ariaInvalidWatcher\"],\"aria-description\":[\"ariaDescriptiondWatcher\"]}],[1,\"gcds-lang-toggle\",{\"href\":[513],\"lang\":[32]}],[1,\"gcds-breadcrumbs-item\",{\"href\":[1]}],[17,\"gcds-button\",{\"type\":[1025],\"buttonRole\":[1025,\"button-role\"],\"size\":[1025],\"buttonId\":[1,\"button-id\"],\"name\":[1],\"disabled\":[4],\"value\":[1],\"href\":[1],\"rel\":[1],\"target\":[1],\"download\":[1],\"inheritedAttributes\":[32],\"lang\":[32]},null,{\"type\":[\"validateType\"],\"buttonRole\":[\"validateButtonRole\"],\"size\":[\"validateSize\"]}],[1,\"gcds-grid\",{\"columns\":[1],\"columnsTablet\":[1,\"columns-tablet\"],\"columnsDesktop\":[1,\"columns-desktop\"],\"container\":[1],\"centered\":[4],\"display\":[1],\"equalRowHeight\":[4,\"equal-row-height\"],\"gap\":[1],\"gapTablet\":[1,\"gap-tablet\"],\"gapDesktop\":[1,\"gap-desktop\"],\"tag\":[1025],\"alignContent\":[1,\"align-content\"],\"justifyContent\":[1,\"justify-content\"],\"placeContent\":[1,\"place-content\"],\"alignItems\":[1,\"align-items\"],\"justifyItems\":[1,\"justify-items\"],\"placeItems\":[1,\"place-items\"]},null,{\"gap\":[\"validateGap\"],\"gapTablet\":[\"validateGapTablet\"],\"gapDesktop\":[\"validateGapDesktop\"],\"tag\":[\"validateTag\"]}],[1,\"gcds-nav-group\",{\"closeTrigger\":[513,\"close-trigger\"],\"menuLabel\":[513,\"menu-label\"],\"openTrigger\":[513,\"open-trigger\"],\"open\":[1540],\"lang\":[32],\"navStyle\":[32],\"navPosiiton\":[32],\"focusTrigger\":[64],\"toggleNav\":[64]},[[4,\"focusout\",\"focusOutListener\"]]],[1,\"gcds-signature\",{\"type\":[1537],\"variant\":[1537],\"hasLink\":[1028,\"has-link\"],\"lang\":[32]},null,{\"type\":[\"validateType\"],\"variant\":[\"validateVariant\"]}],[1,\"gcds-heading\",{\"tag\":[1025],\"characterLimit\":[4,\"character-limit\"],\"marginTop\":[1025,\"margin-top\"],\"marginBottom\":[1025,\"margin-bottom\"]},null,{\"tag\":[\"validateTag\"],\"marginTop\":[\"validateMarginTop\"],\"marginBottom\":[\"validateMarginBottom\"]}],[1,\"gcds-container\",{\"border\":[4],\"centered\":[4],\"mainContainer\":[4,\"main-container\"],\"margin\":[1],\"padding\":[1],\"size\":[1],\"tag\":[1]}],[1,\"gcds-error-message\",{\"messageId\":[1,\"message-id\"]}],[1,\"gcds-link\",{\"variant\":[1025],\"size\":[1025],\"display\":[1025],\"href\":[1],\"rel\":[1],\"target\":[1],\"external\":[4],\"download\":[1],\"type\":[1],\"inheritedAttributes\":[32],\"lang\":[32]},null,{\"variant\":[\"validateVariant\"],\"size\":[\"validateSize\"],\"display\":[\"validateDisplay\"]}],[1,\"gcds-hint\",{\"hintId\":[1,\"hint-id\"]}],[2,\"gcds-label\",{\"hideLabel\":[4,\"hide-label\"],\"label\":[1],\"labelFor\":[1,\"label-for\"],\"required\":[4],\"lang\":[32]}],[1,\"gcds-sr-only\",{\"tag\":[1025]},null,{\"tag\":[\"validateTag\"]}],[1,\"gcds-text\",{\"textRole\":[1025,\"text-role\"],\"characterLimit\":[4,\"character-limit\"],\"display\":[1025],\"marginTop\":[1025,\"margin-top\"],\"marginBottom\":[1025,\"margin-bottom\"],\"size\":[1025]},null,{\"textRole\":[\"validateTextRole\"],\"display\":[\"validateDisplay\"],\"marginTop\":[\"validateMarginTop\"],\"marginBottom\":[\"validateMarginBottom\"],\"size\":[\"validateSize\"]}],[1,\"gcds-icon\",{\"iconStyle\":[1,\"icon-style\"],\"label\":[1],\"marginLeft\":[1,\"margin-left\"],\"marginRight\":[1,\"margin-right\"],\"name\":[1],\"fixedWidth\":[4,\"fixed-width\"],\"size\":[1]}]]]]"), options);
};

export { defineCustomElements };

//# sourceMappingURL=loader.js.map