"use strict";Object.defineProperty(exports,"__esModule",{value:!0});class Stack{constructor(t=[]){this._items=t}push(t){this._items.push(t)}pop(){return this._items.pop()}peek(){return this._items[this._items.length-1]}isEmpty(){return 0===this._items.length}size(){return this._items.length}toString(){return this._items.map(t=>JSON.stringify(t)).join("\n")}}exports.default=Stack;