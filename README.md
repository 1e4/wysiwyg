# ItsaWYSIWYG

A very tiny, highly configurable javascript WYSIWYG editor with zero dependencies.

## Demo

The Demo can be found in the `demo` directory.

## Getting Started

All you need to get started is to instantiate the WYSIWYG, it takes 1 parameter which is the class name of the 
editable content area.

JS

```javascript
new Wysiwyg('editable');
```

HTML

_Note that within the `div.editable` there is another div, this child div must wrap all content, this is to be 
changed by `1.0.0`_

```html
<div class="editable">
    <div>This is just some simple text</div>
</div>
```

## Contributors

I am looking for a contributor that can build up a test suite for the application as well as help with the build chain.

### Currently not stable