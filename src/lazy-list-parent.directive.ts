import {
    OnDestroy,
    Directive,
    ElementRef,
    Input,
    AfterContentInit,
    ContentChildren,
    QueryList,
    Inject,
    NgZone
} from '@angular/core';
import { LazyListChildDirective } from './lazy-list-child.directive';

@Directive({
    selector: '[lazyListParent]'
})
export class LazyListParentDirective implements AfterContentInit, OnDestroy {

    // Amount of items to render initially, if false, items will keep rendering until there's scroll
    @Input() initialBatchSize: number | boolean = false;
    @Input() batchSize: number = 10; // Amount of additional items to load when reaching bottom
    @Input() occupySpaceVirtually: boolean = false; // Whether to simulate large scroll size
    @ContentChildren(LazyListChildDirective, { descendants: true }) children: QueryList<LazyListChildDirective>;
    
    private visibilityCheckInterval: any;
    private tasks: any[] = [];
    private visible: boolean = false;
    private lastItemIdx: any;

    _clearTimeoutFn = clearTimeout;
    _setTimeoutFn = setTimeout;

    constructor(public elementRef: ElementRef,
        @Inject('windowObject') private windowObject: any,
                private zone: NgZone) {
        let t = setTimeout(()=>{}, 100);
        
        // Native JS timers (outside of zone.js) seem to perform better, try using them first
        // and fall back to zone ones if no success
        if (typeof this.windowObject['__zone_symbol__setTimeout'] === 'function' &&
            typeof this.windowObject['__zone_symbol__clearTimeout'] === 'function') {
            this._setTimeoutFn = this.windowObject['__zone_symbol__setTimeout'];
            this._clearTimeoutFn = this.windowObject['__zone_symbol__clearTimeout'];
        }
    }

    ngAfterContentInit() {
        // Handle scrolling to determine whether more items should be rendered
        this.elementRef.nativeElement.addEventListener('mousewheel', ($event: any) => {
            $event.preventDefault();
            $event.stopPropagation();
            this.elementRef.nativeElement.scrollTop += $event.deltaY;
            return false;
        });
        this.elementRef.nativeElement.addEventListener('scroll', ($event: any) => {
            this.scrollHandler($event);
        });
        this.children.changes.subscribe(children => {
            if (this.visible) {
                this.onVisible();
            }
        });

        // onVisible event implementation - important for the element to obtain computed styles
        this.zone.runOutsideAngular(() => {
            this.visibilityCheckInterval = setInterval(() => {
                let visible = false;
                if (this.elementRef.nativeElement.offsetWidth > 0 && this.elementRef.nativeElement.offsetHeight > 0) {
                    visible = true;
                }
                else {
                    visible = false;
                }
                if (this.visible !== visible) {
                    if (visible) {
                        this.onVisible();
                    }
                    else {
                        this.onInvisible();
                    }
                }
                this.visible = visible;
            }, 10);
        });
    }

    /**
     * Triggers rendering of hidden children, starting from the last rendered item
     * 
     * @param {*} children 
     * @param {(number | boolean)} [count] 
     * @memberof LazyParentDirective
     */
    renderChildren(children: any, count?: number | boolean) {
        if (!count) {
            children.forEach((s: any, idx: number) => {
                this.callAsync(() => {
                    let child = s;
                    let lastFailed = false;
                    if (!lastFailed && !this.hasScroll()) {
                        child.show();
                        this.lastItemIdx = idx;
                    }
                    else {
                        lastFailed = true;
                        if (this.occupySpaceVirtually) {
                            // Will render a virtual element to hold space in place of the original
                            child.hide(this.occupySpaceVirtually);
                        }
                    }
                }, idx);
            });
        }
        else {
            for (let idx = this.lastItemIdx + 1; idx < this.lastItemIdx + count + 1; idx++) {
                let child = children[idx];
                if (child) {
                    this.callAsync(() => {
                        child.show();
                        this.lastItemIdx = idx;
                    }, idx);
                }
            }
        }
    }

    /**
     * Triggers when the container is visible on screen, otherwise we can't calculate scrolls etc'
     * 
     * @memberof LazyParentDirective
     */
    onVisible() {
        if (this.occupySpaceVirtually) {
            this.renderChildren(this.children);
        }
        else {
            this.lastItemIdx = -1;
            this.renderChildren(this.children.toArray(), this.initialBatchSize);
        }
    }

    onInvisible() {
        this.clearTasks();
    }

    /**
     * Handle scrolling and check whether hidden element should be rendered
     *
     * @memberof LazyLoadParentDirective
     */
    scrollHandler($event: any) {
        let lastFailed = false;
        let children = this.children.toArray();
        if (this.occupySpaceVirtually) {
            for (let i = 0; i < children.length; i++) {
                let child = children[i];
                if (!child.showing && !lastFailed) {
                    if (this.isElementVisible(child.shownElementRef)) {
                        // Showing the item immediately, with no async task,
                        // that's to give this item higher rendering priority over others below it
                        child.show();
                    }
                    else {
                        lastFailed = true;
                        break;
                    }
                }
            }
        }
        else {
            // Check if the scroll reached the bottom, if so, attempt rendering another batch
            if (this.elementRef.nativeElement.scrollTop >=
                this.elementRef.nativeElement.scrollHeight - this.elementRef.nativeElement.offsetHeight) {
                this.renderChildren(this.children.toArray(), this.batchSize);
            }
        }
    }

    /**
     * Checks whether a child element is now visible in its parent container
     *
     * @memberof LazyLoadParentDirective
     */
    isElementVisible(e: ElementRef): boolean {
        let result = false;
        let parent = this.elementRef.nativeElement;
        let child = e.nativeElement;

        let parentRect = parent.getClientRects()[0];
        let childRect = child.getClientRects()[0];

        let childTop = childRect.top - parentRect.top;
        if (childTop <= parent.scrollTop + parent.offsetHeight) {
            result = true;
        }
        else {
            result = false;
        }
        return result;
    }

    /**
     * Checks if the container has a scrollbar based on scrollHeight
     *
     * @returns {boolean}
     * @memberof LazyLoadParentDirective
     */
    hasScroll(): boolean {
        let target = this.elementRef.nativeElement;
        let result = target.scrollHeight > target.offsetHeight;
        return result;
    }

    callAsync(fn: any, idx?: number) {
        let _setTimeoutFn = this._setTimeoutFn;
        this.zone.runOutsideAngular(() => {
            this.tasks.push(_setTimeoutFn(fn, idx ? idx * 5 : 1));
        });
    }

    clearTasks() {
        let _clearTimeoutFn = this._clearTimeoutFn;
        this.zone.runOutsideAngular(() => {
            this.tasks.map(task => { _clearTimeoutFn(task); return null; });
            this.tasks = [];
        });
    }

    ngOnDestroy() {
        this.clearTasks();
        if (this.visibilityCheckInterval) {
            clearInterval(this.visibilityCheckInterval);
        }
    }
}
