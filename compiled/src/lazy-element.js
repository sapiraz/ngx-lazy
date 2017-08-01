import { Component, ElementRef, ReflectiveInjector } from '@angular/core';
var LazyVirtualComponent = (function () {
    function LazyVirtualComponent(elementRef) {
        this.elementRef = elementRef;
    }
    LazyVirtualComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-virtual-lazyload-component',
                    template: "<div class='virtual-element'></div>"
                },] },
    ];
    /** @nocollapse */
    LazyVirtualComponent.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    return LazyVirtualComponent;
}());
export { LazyVirtualComponent };
var LazyElement = (function () {
    function LazyElement(templateRef, viewContainer, elementRef, componentFactoryResolver, cd) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.elementRef = elementRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.cd = cd;
        this.showing = false;
    }
    /**
     * Renders the original element
     *
     * @memberof LazyChildDirective
     */
    LazyElement.prototype.show = function () {
        this.viewContainer.clear();
        this.showing = true;
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.shownElementRef = this.elementRef;
        this.cd.detectChanges();
    };
    /**
     * Hides the content of the element
     *
     * @param {boolean} [occupySpace=false]  Allows occupying space virtually
     * @memberof LazyChildDirective
     */
    LazyElement.prototype.hide = function (occupySpace) {
        if (occupySpace === void 0) { occupySpace = false; }
        this.viewContainer.clear();
        this.showing = false;
        if (occupySpace) {
            this.shownElementRef = this.createVirtualComponent();
        }
    };
    LazyElement.prototype.createVirtualComponent = function () {
        var factory = this.componentFactoryResolver.resolveComponentFactory(LazyVirtualComponent);
        var injector = ReflectiveInjector.fromResolvedProviders([], this.viewContainer.parentInjector);
        // create component without adding it directly to the DOM
        var comp = factory.create(injector);
        // Render virtual component
        this.viewContainer.insert(comp.hostView);
        return comp.instance.elementRef;
    };
    return LazyElement;
}());
export { LazyElement };
//# sourceMappingURL=lazy-element.js.map