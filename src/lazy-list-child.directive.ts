import { LazyElement } from './lazy-element';
import {
    Directive,
    Component,
    ElementRef,
    TemplateRef,
    ViewContainerRef,
    Input,
    ComponentFactoryResolver,
    ComponentRef,
    ReflectiveInjector,
    ChangeDetectorRef
} from '@angular/core';

@Directive({
    selector: '[lazyListChild]',
    exportAs: 'lazyChild'
})
export class LazyListChildDirective extends LazyElement{
    constructor(public templateRef: TemplateRef<ElementRef>,
                protected viewContainer: ViewContainerRef,
                public elementRef: ElementRef,
                protected componentFactoryResolver: ComponentFactoryResolver,
                protected cd: ChangeDetectorRef) {
        super(templateRef,
              viewContainer,
              elementRef,
              componentFactoryResolver,
              cd);
    }
}
