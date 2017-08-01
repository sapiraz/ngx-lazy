var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { LazyElement } from './lazy-element';
import { Directive, ElementRef, TemplateRef, ViewContainerRef, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core';
var LazyListChildDirective = (function (_super) {
    __extends(LazyListChildDirective, _super);
    function LazyListChildDirective(templateRef, viewContainer, elementRef, componentFactoryResolver, cd) {
        var _this = _super.call(this, templateRef, viewContainer, elementRef, componentFactoryResolver, cd) || this;
        _this.templateRef = templateRef;
        _this.viewContainer = viewContainer;
        _this.elementRef = elementRef;
        _this.componentFactoryResolver = componentFactoryResolver;
        _this.cd = cd;
        return _this;
    }
    LazyListChildDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[lazyListChild]',
                    exportAs: 'lazyChild'
                },] },
    ];
    /** @nocollapse */
    LazyListChildDirective.ctorParameters = function () { return [
        { type: TemplateRef, },
        { type: ViewContainerRef, },
        { type: ElementRef, },
        { type: ComponentFactoryResolver, },
        { type: ChangeDetectorRef, },
    ]; };
    return LazyListChildDirective;
}(LazyElement));
export { LazyListChildDirective };
//# sourceMappingURL=lazy-list-child.directive.js.map