# keybinding.js

A simple keybinding system for html

> Notes for early versions:
> API may change daily!!

## Installation

```bash
yarn add @winwin/keybinding.js
# npm install @winwin/keybinding.js # or npm
```

## Usage

### Step.01 config keybinding.js

```js
import { KeyBinding, KeyCode, KeyMod } from "@winwin/keybinding.js";

// Create keybinding instance
const kbd = new KeyBinding("myinstancename");
// or
const kbd = KeyBinding.createInstance("myinstancename");

// Register keybind
kbd.register("mykeybindingname", KeyMod.CtrlCmd | KeyCode.KEY_S, (e) => {
  // will fire when press 'ctrl/cmd + s'
  console.log("keydown event with params:", e);
}
// or
KeyBinding.register('myinstancename', 'mykeybindingname', KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KEY_X, (e) => {
  // will fire when press 'ctrl/cmd + s'
  console.log("keydown event with params:", e);
})

// Unregister keybind
kbd.unregister("mykeybindingname");
// or
KeyBinding.unregister('myinstancename', 'mykeybindingname')

// Unregister all keybinding and remove instance from record.
kbd.dispose();
// or
KeyBinding.getInstance('myinstancename').dispose()

// Enable debug mode
KeyBinding.debug()

// Unregister all keybinding and remove all instance from record
KeyBinding.dispose();
```

### Step.02 bind keybinding.js to your element

#### HTML

```js
// Add handler to dom
window.addEventListener('keydown',kbd.handler)
// Then remove in future
window.removeEventListener('keydown',kbd.handler)
```

#### Vue

```vue
<template>
  <!-- Add to keydown event -->
  <!-- Remember to set `tabindex` so that div can emit keydown event -->
  <div @keydown="kbd.handler" tabindex="0">
  </div>
</template>
<script>
// Remember to dispose in future. e.g. beforeUnmount or beforeDestroy
// kbd.dispose()
</script>
```

### For browers

```html
<script src='https://unpkg.com/@winwin/keybinding.js'></script>
```

```js
// After reference keybinding.js
const { KeyBinding, KeyCode, KeyMod } = kbjs // NOTE! name `kbjs` is important
// Do as above
```

## Note

Since `keybinding.js` is pure js/ts without reactive/vue, you can use it any where as long as `kdb.handler` can be called with a `KeybordEvent` passing in.
