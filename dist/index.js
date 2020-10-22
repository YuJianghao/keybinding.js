"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.KeyBinding=exports.KeyBindingListener=void 0;const keyboardEvent_1=require("./lib/keyboardEvent");let _debug=!1;const logger={log(...e){_debug&&console.log("%c[keybinding:debug]","font-weight: bold;color:#1e90ff",...e)},warn(...e){console.warn("%c[keybinding]","font-weight: bold;color:#f39c12",...e)},error(...e){console.error("%c[keybinding]","font-weight: bold;color:#c0392b",...e)}};class KeyBindingListener{constructor(e){this.elememt=e,this.map=new Map,this.elememt.tabIndex<0&&(this.elememt.tabIndex=0),this._handler=e=>{const t=new keyboardEvent_1.StandardKeyboardEvent(e);this.map.forEach((n,i)=>{("function"!=typeof n.key||n.key(e))&&("number"!=typeof n.key||t.equals(n.key))&&(logger.log(i,"called"),n.exec(e))})},this.elememt.addEventListener("keydown",this._handler)}get empty(){return this.map.size<1}register(e,t){this.map.has(e)&&logger.warn("Override callback",e),this.map.set(e,t)}unregister(e){this.map.has(e)&&this.map.delete(e)}dispose(){this.elememt.removeEventListener("keydown",this._handler)}}exports.KeyBindingListener=KeyBindingListener;class KeyBinding{constructor(e=!1){_debug=e,this.listeners=new Map,this._root=void 0}mount(e){e?this._root=e:logger.error("Trying to mount to null! Did you fetch your HTMLElement correctly?")}register(...e){let t,n,i,r;function o(){logger.error('null root element\nDid you mount kbd plugin to HTML?\n\nInside some kind of App.vue file. Mount keybinding plugin to your \n#app element (or any other html element as your root)\n\n// App.vue\nmounted(){\n  kbd.mount(document.getElementById("app"));\n}\n')}if("string"==typeof e[0]){if(t=this._root,!t)return void o();n=e[0],i=e[1],r=e[2]}else if(e[0])t=e[0],n=e[1],i=e[2],r=e[3];else{if(t=this._root,!t)return void o();n=e[1],i=e[2],r=e[3]}if(!t)return void logger.warn("Trying to add eventHandlers to null. Did you fetch your HTMLElement correctly?");const s=this._addListener(t);null==s||s.register(n,{key:i,exec:r})}unregister(...e){let t,n;if("string"==typeof e[0]?(t=this._root,n=e[0]):e[0]?(t=e[0],n=e[1]):(t=this._root,n=e[1]),!t)return;const i=this.listeners.get(t);i&&(i.unregister(n),i.empty&&(i.dispose(),this.listeners.delete(t)))}dispose(){this.listeners.forEach(e=>e.dispose()),this.listeners.clear()}_addListener(e){if(this.listeners.has(e))return this.listeners.get(e);const t=new KeyBindingListener(e);return this.listeners.set(e,t),t}_removeListener(e){var t;null===(t=this.listeners.get(e))||void 0===t||t.dispose(),this.listeners.delete(e)}}exports.KeyBinding=KeyBinding;