import { NgModule } from '@angular/core';
import { LazyListParentDirective } from './lazy-list-parent.directive';
import { LazyListChildDirective } from './lazy-list-child.directive';
import { LazyVirtualComponent } from './lazy-element';
import { LazyImageDirective } from './lazy-image.directive';

@NgModule({
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
})
export class LazyModule{}