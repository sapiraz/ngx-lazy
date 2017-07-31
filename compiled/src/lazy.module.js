import { LazyParentDirective } from './lazy-parent.directive';
import { LazyChildDirective, LazyVirtualComponent } from './lazy-child.directive';
import { NgModule } from '@angular/core';
var LazyModule = (function () {
    function LazyModule() {
    }
    LazyModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        LazyChildDirective,
                        LazyParentDirective,
                        LazyVirtualComponent
                    ],
                    entryComponents: [LazyVirtualComponent],
                    exports: [
                        LazyChildDirective,
                        LazyParentDirective,
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