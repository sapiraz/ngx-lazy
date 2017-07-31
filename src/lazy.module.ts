import { LazyParentDirective } from './lazy-parent.directive';
import { LazyChildDirective, LazyVirtualComponent } from './lazy-child.directive';
import { NgModule } from '@angular/core';

@NgModule({
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
})
export class LazyModule{}