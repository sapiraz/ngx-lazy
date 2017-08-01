import {
    Directive,
    TemplateRef,
    ElementRef,
    ViewContainerRef,
    ComponentFactoryResolver,
    Input, 
    OnInit,
    Renderer,
    HostListener,
    Inject} from '@angular/core';
import { LazyElement } from './lazy-element';

@Directive({
    selector: '[lazyImage]'
})
export class LazyImageDirective implements OnInit {
    private shown: boolean = false;
    @Input() lazyImage: string;
    constructor(protected viewContainer: ViewContainerRef,
        public elementRef: ElementRef,
        protected componentFactoryResolver: ComponentFactoryResolver,
        private _renderer: Renderer,
        @Inject('windowObject') private windowObject: any) {
    }

    ngOnInit() {
        // Trigger an initial visibility check
        this.onWindowScroll();
    }

    @HostListener("window:scroll", [])
    onWindowScroll() {
        if (this.isInViewport() && !this.shown) {
            this.show();
        }
    }

    /**
     * Renders the image
     * 
     * @memberof LazyImageDirective
     */
    show() {
        this.shown = true;
        this._renderer.setElementAttribute(this.elementRef.nativeElement, 'src', this.lazyImage);
    }

    /**
     * Checks if the element is visible in the window viewport
     * 
     * @returns {boolean} 
     * @memberof LazyImageDirective
     */
    isInViewport(): boolean {
        let result = false;
        let window = this.windowObject; // Todo: Fix that
        let child = this.elementRef.nativeElement;
        var rect = child.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && 
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
}