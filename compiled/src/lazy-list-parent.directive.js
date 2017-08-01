import { Directive, ElementRef, Input, ContentChildren, Inject, NgZone } from '@angular/core';
import { LazyListChildDirective } from './lazy-list-child.directive';
var LazyListParentDirective = (function () {
    function LazyListParentDirective(elementRef, windowObject, zone) {
        this.elementRef = elementRef;
        this.windowObject = windowObject;
        this.zone = zone;
        // Amount of items to render initially, if false, items will keep rendering until there's scroll
        this.initialBatchSize = false;
        this.batchSize = 10; // Amount of additional items to load when reaching bottom
        this.occupySpaceVirtually = false; // Whether to simulate large scroll size
        this.tasks = [];
        this.visible = false;
        this._clearTimeoutFn = clearTimeout;
        this._setTimeoutFn = setTimeout;
        var t = setTimeout(function () { }, 100);
        // Native JS timers (outside of zone.js) seem to perform better, try using them first
        // and fall back to zone ones if no success
        if (typeof this.windowObject['__zone_symbol__setTimeout'] === 'function' &&
            typeof this.windowObject['__zone_symbol__clearTimeout'] === 'function') {
            this._setTimeoutFn = this.windowObject['__zone_symbol__setTimeout'];
            this._clearTimeoutFn = this.windowObject['__zone_symbol__clearTimeout'];
        }
    }
    LazyListParentDirective.prototype.ngAfterContentInit = function () {
        var _this = this;
        // Handle scrolling to determine whether more items should be rendered
        this.elementRef.nativeElement.addEventListener('mousewheel', function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            _this.elementRef.nativeElement.scrollTop += $event.deltaY;
            return false;
        });
        this.elementRef.nativeElement.addEventListener('scroll', function ($event) {
            _this.scrollHandler($event);
        });
        this.children.changes.subscribe(function (children) {
            if (_this.visible) {
                _this.onVisible();
            }
        });
        // onVisible event implementation - important for the element to obtain computed styles
        this.zone.runOutsideAngular(function () {
            _this.visibilityCheckInterval = setInterval(function () {
                var visible = false;
                if (_this.elementRef.nativeElement.offsetWidth > 0 && _this.elementRef.nativeElement.offsetHeight > 0) {
                    visible = true;
                }
                else {
                    visible = false;
                }
                if (_this.visible !== visible) {
                    if (visible) {
                        _this.onVisible();
                    }
                    else {
                        _this.onInvisible();
                    }
                }
                _this.visible = visible;
            }, 10);
        });
    };
    /**
     * Triggers rendering of hidden children, starting from the last rendered item
     *
     * @param {*} children
     * @param {(number | boolean)} [count]
     * @memberof LazyParentDirective
     */
    LazyListParentDirective.prototype.renderChildren = function (children, count) {
        var _this = this;
        if (!count) {
            children.forEach(function (s, idx) {
                _this.callAsync(function () {
                    var child = s;
                    var lastFailed = false;
                    if (!lastFailed && !_this.hasScroll()) {
                        child.show();
                        _this.lastItemIdx = idx;
                    }
                    else {
                        lastFailed = true;
                        if (_this.occupySpaceVirtually) {
                            // Will render a virtual element to hold space in place of the original
                            child.hide(_this.occupySpaceVirtually);
                        }
                    }
                }, idx);
            });
        }
        else {
            var _loop_1 = function (idx) {
                var child = children[idx];
                if (child) {
                    this_1.callAsync(function () {
                        child.show();
                        _this.lastItemIdx = idx;
                    }, idx);
                }
            };
            var this_1 = this;
            for (var idx = this.lastItemIdx + 1; idx < this.lastItemIdx + count + 1; idx++) {
                _loop_1(idx);
            }
        }
    };
    /**
     * Triggers when the container is visible on screen, otherwise we can't calculate scrolls etc'
     *
     * @memberof LazyParentDirective
     */
    LazyListParentDirective.prototype.onVisible = function () {
        if (this.occupySpaceVirtually) {
            this.renderChildren(this.children);
        }
        else {
            this.lastItemIdx = -1;
            this.renderChildren(this.children.toArray(), this.initialBatchSize);
        }
    };
    LazyListParentDirective.prototype.onInvisible = function () {
        this.clearTasks();
    };
    /**
     * Handle scrolling and check whether hidden element should be rendered
     *
     * @memberof LazyLoadParentDirective
     */
    LazyListParentDirective.prototype.scrollHandler = function ($event) {
        var lastFailed = false;
        var children = this.children.toArray();
        if (this.occupySpaceVirtually) {
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
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
    };
    /**
     * Checks whether a child element is now visible in its parent container
     *
     * @memberof LazyLoadParentDirective
     */
    LazyListParentDirective.prototype.isElementVisible = function (e) {
        var result = false;
        var parent = this.elementRef.nativeElement;
        var child = e.nativeElement;
        var parentRect = parent.getClientRects()[0];
        var childRect = child.getClientRects()[0];
        var childTop = childRect.top - parentRect.top;
        if (childTop <= parent.scrollTop + parent.offsetHeight) {
            result = true;
        }
        else {
            result = false;
        }
        return result;
    };
    /**
     * Checks if the container has a scrollbar based on scrollHeight
     *
     * @returns {boolean}
     * @memberof LazyLoadParentDirective
     */
    LazyListParentDirective.prototype.hasScroll = function () {
        var target = this.elementRef.nativeElement;
        var result = target.scrollHeight > target.offsetHeight;
        return result;
    };
    LazyListParentDirective.prototype.callAsync = function (fn, idx) {
        var _this = this;
        var _setTimeoutFn = this._setTimeoutFn;
        this.zone.runOutsideAngular(function () {
            _this.tasks.push(_setTimeoutFn(fn, idx ? idx * 5 : 1));
        });
    };
    LazyListParentDirective.prototype.clearTasks = function () {
        var _this = this;
        var _clearTimeoutFn = this._clearTimeoutFn;
        this.zone.runOutsideAngular(function () {
            _this.tasks.map(function (task) { _clearTimeoutFn(task); return null; });
            _this.tasks = [];
        });
    };
    LazyListParentDirective.prototype.ngOnDestroy = function () {
        this.clearTasks();
        if (this.visibilityCheckInterval) {
            clearInterval(this.visibilityCheckInterval);
        }
    };
    LazyListParentDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[lazyListParent]'
                },] },
    ];
    /** @nocollapse */
    LazyListParentDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: undefined, decorators: [{ type: Inject, args: ['windowObject',] },] },
        { type: NgZone, },
    ]; };
    LazyListParentDirective.propDecorators = {
        'initialBatchSize': [{ type: Input },],
        'batchSize': [{ type: Input },],
        'occupySpaceVirtually': [{ type: Input },],
        'children': [{ type: ContentChildren, args: [LazyListChildDirective, { descendants: true },] },],
    };
    return LazyListParentDirective;
}());
export { LazyListParentDirective };
//# sourceMappingURL=lazy-list-parent.directive.js.map