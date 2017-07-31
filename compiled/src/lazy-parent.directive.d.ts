import { OnDestroy, ElementRef, AfterContentInit, QueryList, NgZone } from '@angular/core';
import { LazyChildDirective } from './lazy-child.directive';
export declare class LazyParentDirective implements AfterContentInit, OnDestroy {
    elementRef: ElementRef;
    private windowObject;
    private zone;
    initialBatchSize: number | boolean;
    batchSize: number;
    occupySpaceVirtually: boolean;
    children: QueryList<LazyChildDirective>;
    private visibilityCheckInterval;
    private tasks;
    private visible;
    private lastItemIdx;
    _clearTimeoutFn: typeof clearTimeout;
    _setTimeoutFn: typeof setTimeout;
    constructor(elementRef: ElementRef, windowObject: any, zone: NgZone);
    ngAfterContentInit(): void;
    /**
     * Triggers rendering of hidden children, starting from the last rendered item
     *
     * @param {*} children
     * @param {(number | boolean)} [count]
     * @memberof LazyParentDirective
     */
    renderChildren(children: any, count?: number | boolean): void;
    /**
     * Triggers when the container is visible on screen, otherwise we can't calculate scrolls etc'
     *
     * @memberof LazyParentDirective
     */
    onVisible(): void;
    onInvisible(): void;
    /**
     * Handle scrolling and check whether hidden element should be rendered
     *
     * @memberof LazyLoadParentDirective
     */
    scrollHandler($event: any): void;
    /**
     * Checks whether a child element is now visible in its parent container
     *
     * @memberof LazyLoadParentDirective
     */
    isElementVisible(e: ElementRef): boolean;
    /**
     * Checks if the container has a scrollbar based on scrollHeight
     *
     * @returns {boolean}
     * @memberof LazyLoadParentDirective
     */
    hasScroll(): boolean;
    callAsync(fn: any, idx?: number): void;
    clearTasks(): void;
    ngOnDestroy(): void;
}
