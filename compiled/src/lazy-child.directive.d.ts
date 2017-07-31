import { ElementRef, TemplateRef, ViewContainerRef, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core';
export declare class LazyVirtualComponent {
    elementRef: ElementRef;
    constructor(elementRef: ElementRef);
}
export declare class LazyChildDirective {
    templateRef: TemplateRef<ElementRef>;
    private viewContainer;
    elementRef: ElementRef;
    private componentFactoryResolver;
    private cd;
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
