import { Directive, Component, ElementRef, TemplateRef, ViewContainerRef, ComponentFactoryResolver, ReflectiveInjector, ChangeDetectorRef } from '@angular/core';
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
var LazyChildDirective = (function () {
    function LazyChildDirective(templateRef, viewContainer, elementRef, componentFactoryResolver, cd) {
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
    LazyChildDirective.prototype.show = function () {
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
    LazyChildDirective.prototype.hide = function (occupySpace) {
        if (occupySpace === void 0) { occupySpace = false; }
        this.viewContainer.clear();
        this.showing = false;
        if (occupySpace) {
            this.shownElementRef = this.createVirtualComponent();
        }
    };
    LazyChildDirective.prototype.createVirtualComponent = function () {
        var factory = this.componentFactoryResolver.resolveComponentFactory(LazyVirtualComponent);
        var injector = ReflectiveInjector.fromResolvedProviders([], this.viewContainer.parentInjector);
        // create component without adding it directly to the DOM
        var comp = factory.create(injector);
        // Render virtual component
        this.viewContainer.insert(comp.hostView);
        return comp.instance.elementRef;
    };
    LazyChildDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[lazyChild]',
                    exportAs: 'lazyChild'
                },] },
    ];
    /** @nocollapse */
    LazyChildDirective.ctorParameters = function () { return [
        { type: TemplateRef, },
        { type: ViewContainerRef, },
        { type: ElementRef, },
        { type: ComponentFactoryResolver, },
        { type: ChangeDetectorRef, },
    ]; };
    return LazyChildDirective;
}());
export { LazyChildDirective };
//# sourceMappingURL=lazy-child.directive.js.map