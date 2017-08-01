import { ElementRef, TemplateRef, ViewContainerRef, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core';
export declare class LazyVirtualComponent {
    elementRef: ElementRef;
    constructor(elementRef: ElementRef);
}
export declare class LazyElement {
    templateRef: TemplateRef<ElementRef>;
    protected viewContainer: ViewContainerRef;
    elementRef: ElementRef;
    protected componentFactoryResolver: ComponentFactoryResolver;
    protected cd: ChangeDetectorRef;
    showing: boolean;
    shownElementRef: ElementRef;
    constructor(templateRef: TemplateRef<ElementRef>, viewContainer: ViewContainerRef, elementRef: ElementRef, componentFactoryResolver: ComponentFactoryResolver, cd: ChangeDetectorRef);
    /**
     * Renders the original element
     *
     * @memberof LazyChildDirective
     */
    show(): void;
    /**
     * Hides the content of the element
     *
     * @param {boolean} [occupySpace=false]  Allows occupying space virtually
     * @memberof LazyChildDirective
     */
    hide(occupySpace?: boolean): void;
    createVirtualComponent(): ElementRef;
}
