import { Directive, ElementRef, ViewContainerRef, ComponentFactoryResolver, Input, Renderer, HostListener, Inject } from '@angular/core';
var LazyImageDirective = (function () {
    function LazyImageDirective(viewContainer, elementRef, componentFactoryResolver, _renderer, windowObject) {
        this.viewContainer = viewContainer;
        this.elementRef = elementRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this._renderer = _renderer;
        this.windowObject = windowObject;
        this.shown = false;
    }
    LazyImageDirective.prototype.ngOnInit = function () {
        // Trigger an initial visibility check
        this.onWindowScroll();
    };
    LazyImageDirective.prototype.onWindowScroll = function () {
        if (this.isInViewport() && !this.shown) {
            this.show();
        }
    };
    LazyImageDirective.prototype.show = function () {
        this.shown = true;
        this._renderer.setElementAttribute(this.elementRef.nativeElement, 'src', this.lazyImage);
    };
    /**
     * Checks whether the image is now visible in it's container
     *
     * @memberof LazyLoadParentDirective
     */
    LazyImageDirective.prototype.isInViewport = function () {
        var result = false;
        var window = this.windowObject; // Todo: Fix that
        var child = this.elementRef.nativeElement;
        var rect = child.getBoundingClientRect();
        return (rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth));
    };
    LazyImageDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[lazyImage]'
                },] },
    ];
    /** @nocollapse */
    LazyImageDirective.ctorParameters = function () { return [
        { type: ViewContainerRef, },
        { type: ElementRef, },
        { type: ComponentFactoryResolver, },
        { type: Renderer, },
        { type: undefined, decorators: [{ type: Inject, args: ['windowObject',] },] },
    ]; };
    LazyImageDirective.propDecorators = {
        'lazyImage': [{ type: Input },],
        'onWindowScroll': [{ type: HostListener, args: ["window:scroll", [],] },],
    };
    return LazyImageDirective;
}());
export { LazyImageDirective };
//# sourceMappingURL=lazy-image.directive.js.map