# ngx-lazy
Simple lazy loading for Angular 4

## Table of Contents
1. [Description](#description)
2. [Installation](#installation)
2. [Usage Example](#usage-example)

# Description
This library was created lazy loading needs in Angular.

For example, displaying images only when they're in the viewport, 
or for gradually displaying large amounts of items in a list.

For example, if you have a list of 1000 items in a dropdown and they take a lot of effort from Angular to render, you could use the directive to display small portions of the list based on scroll.

# Installation
Installation is done via npm:
```bash
npm install ngx-lazy --save
```

Then, import the **LazyModule** module to your project like so:
```typescript
import { LazyModule } from 'ngx-lazy';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    LazyModule // Importing of the lazy module
  ]
})
...

```

# Usage Example

## Lazy Image
This directive will render the image only when it's in the viewport
Simply replace the `src` attribute with `lazyImage`.
```html
<img lazyImage="http://yourdomain.com/your-image.jpg">
```

## Lazy List
Usage of the module on a simple list of items:
```html
<div class="list-container" lazyListParent [batchSize]=10>
  <ng-template ngFor let-row [ngForOf]="items">
    <!-- This will not be rendered -->
    <div *lazyListChild>Item</div>
  </ng-template>
</div>
```