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

@Component({
    selector: 'app-virtual-lazyload-component',
    template: `<div class='virtual-element'></div>`
})
export class LazyVirtualComponent {
    constructor(public elementRef: ElementRef) {}
}

@Directive({
    selector: '[lazyChild]',
    exportAs: 'lazyChild'
})
export class LazyChildDirective {
    showing: boolean = false;
    shownElementRef: ElementRef;

    constructor(public templateRef: TemplateRef<ElementRef>,
                private viewContainer: ViewContainerRef,
                public elementRef: ElementRef,
                private componentFactoryResolver: ComponentFactoryResolver,
                private cd: ChangeDetectorRef) {}

    /**
     * Renders the original element
     * 
     * @memberof LazyChildDirective
     */
    show() {
        this.viewContainer.clear();
        this.showing = true;
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.shownElementRef = this.elementRef;
        this.cd.detectChanges();
    }

    /**
     * Hides the content of the element
     * 
     * @param {boolean} [occupySpace=false]  Allows occupying space virtually
     * @memberof LazyChildDirective
     */
    hide(occupySpace: boolean = false) {
        this.viewContainer.clear();
        this.showing = false;
        if (occupySpace) {
            this.shownElementRef = this.createVirtualComponent();
        }
    }

    createVirtualComponent(): ElementRef {
        let factory = this.componentFactoryResolver.resolveComponentFactory(LazyVirtualComponent);
        let injector = ReflectiveInjector.fromResolvedProviders([], this.viewContainer.parentInjector);
        // create component without adding it directly to the DOM
        let comp: ComponentRef<LazyVirtualComponent> = factory.create(injector);
        // Render virtual component
        this.viewContainer.insert(comp.hostView);
        return comp.instance.elementRef;
    }
}
