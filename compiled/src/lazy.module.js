import { NgModule } from '@angular/core';
import { LazyListParentDirective } from './lazy-list-parent.directive';
import { LazyListChildDirective } from './lazy-list-child.directive';
import { LazyVirtualComponent } from './lazy-element';
import { LazyImageDirective } from './lazy-image.directive';
var LazyModule = (function () {
    function LazyModule() {
    }
    LazyModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        LazyListChildDirective,
                        LazyListParentDirective,
                        LazyImageDirective,
                        LazyVirtualComponent
                    ],
                    entryComponents: [LazyVirtualComponent],
                    exports: [
                        LazyListChildDirective,
                        LazyListParentDirective,
                        LazyImageDirective,
                        LazyVirtualComponent
                    ],
                    providers: [
                        { provide: "windowObject", useValue: window }
                    ]
                },] },
    ];
    /** @nocollapse */
    LazyModule.ctorParameters = function () { return []; };
    return LazyModule;
}());
export { LazyModule };
//# sourceMappingURL=lazy.module.js.map