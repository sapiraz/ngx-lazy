# ngx-lazy
Simple lazy loading for Angular 4

## Table of Contents
1. [Description](#description)
2. [Installation](#installation)
2. [Usage Example](#usage-example)

# Description
This library was created for displaying large amounts of items in a scrolled container.

For example, if you have a list of 1000 list items in a dropdown and they take a lot of effort from Angular to render, you could use the directive to display small portions of the list based on scroll.

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
Usage of the module on a simple list of items:
```html
<div class="list-container" lazyParent [batchSize]=10>
  <ng-template ngFor let-row [ngForOf]="items">
    <!-- This will not be rendered -->
    <div *lazyChild>Item</div>
  </ng-template>
</div>
```