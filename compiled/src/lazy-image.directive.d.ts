import { ElementRef, ViewContainerRef, ComponentFactoryResolver, OnInit, Renderer } from '@angular/core';
export declare class LazyImageDirective implements OnInit {
    protected viewContainer: ViewContainerRef;
    elementRef: ElementRef;
    protected componentFactoryResolver: ComponentFactoryResolver;
    private _renderer;
    private windowObject;
    private shown;
    lazyImage: string;
    constructor(viewContainer: ViewContainerRef, elementRef: ElementRef, componentFactoryResolver: ComponentFactoryResolver, _renderer: Renderer, windowObject: any);
    ngOnInit(): void;
    onWindowScroll(): void;
    show(): void;
    /**
     * Checks whether the image is now visible in it's container
     *
     * @memberof LazyLoadParentDirective
     */
    isInViewport(): boolean;
}
