import { LazyElement } from './lazy-element';
import { ElementRef, TemplateRef, ViewContainerRef, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core';
export declare class LazyListChildDirective extends LazyElement {
    templateRef: TemplateRef<ElementRef>;
    protected viewContainer: ViewContainerRef;
    elementRef: ElementRef;
    protected componentFactoryResolver: ComponentFactoryResolver;
    protected cd: ChangeDetectorRef;
    constructor(templateRef: TemplateRef<ElementRef>, viewContainer: ViewContainerRef, elementRef: ElementRef, componentFactoryResolver: ComponentFactoryResolver, cd: ChangeDetectorRef);
}
