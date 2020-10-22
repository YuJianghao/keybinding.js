"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.StandardKeyboardEvent=exports.printStandardKeyboardEvent=exports.printKeyboardEvent=exports.getCodeForKeyCode=void 0;const keyCodes_1=require("./keyCodes"),platform=require("./platform"),browser=require("./browser"),KEY_CODE_MAP=new Array(230),INVERSE_KEY_CODE_MAP=new Array(keyCodes_1.KeyCode.MAX_VALUE);function extractKeyCode(e){if(e.charCode){const o=String.fromCharCode(e.charCode).toUpperCase();return keyCodes_1.KeyCodeUtils.fromString(o)}return KEY_CODE_MAP[e.keyCode]||keyCodes_1.KeyCode.Unknown}function getCodeForKeyCode(e){return INVERSE_KEY_CODE_MAP[e]}!function(){for(let e=0;e<INVERSE_KEY_CODE_MAP.length;e++)INVERSE_KEY_CODE_MAP[e]=-1;function e(e,o){KEY_CODE_MAP[e]=o,INVERSE_KEY_CODE_MAP[o]=e}e(3,keyCodes_1.KeyCode.PauseBreak),e(8,keyCodes_1.KeyCode.Backspace),e(9,keyCodes_1.KeyCode.Tab),e(13,keyCodes_1.KeyCode.Enter),e(16,keyCodes_1.KeyCode.Shift),e(17,keyCodes_1.KeyCode.Ctrl),e(18,keyCodes_1.KeyCode.Alt),e(19,keyCodes_1.KeyCode.PauseBreak),e(20,keyCodes_1.KeyCode.CapsLock),e(27,keyCodes_1.KeyCode.Escape),e(32,keyCodes_1.KeyCode.Space),e(33,keyCodes_1.KeyCode.PageUp),e(34,keyCodes_1.KeyCode.PageDown),e(35,keyCodes_1.KeyCode.End),e(36,keyCodes_1.KeyCode.Home),e(37,keyCodes_1.KeyCode.LeftArrow),e(38,keyCodes_1.KeyCode.UpArrow),e(39,keyCodes_1.KeyCode.RightArrow),e(40,keyCodes_1.KeyCode.DownArrow),e(45,keyCodes_1.KeyCode.Insert),e(46,keyCodes_1.KeyCode.Delete),e(48,keyCodes_1.KeyCode.KEY_0),e(49,keyCodes_1.KeyCode.KEY_1),e(50,keyCodes_1.KeyCode.KEY_2),e(51,keyCodes_1.KeyCode.KEY_3),e(52,keyCodes_1.KeyCode.KEY_4),e(53,keyCodes_1.KeyCode.KEY_5),e(54,keyCodes_1.KeyCode.KEY_6),e(55,keyCodes_1.KeyCode.KEY_7),e(56,keyCodes_1.KeyCode.KEY_8),e(57,keyCodes_1.KeyCode.KEY_9),e(65,keyCodes_1.KeyCode.KEY_A),e(66,keyCodes_1.KeyCode.KEY_B),e(67,keyCodes_1.KeyCode.KEY_C),e(68,keyCodes_1.KeyCode.KEY_D),e(69,keyCodes_1.KeyCode.KEY_E),e(70,keyCodes_1.KeyCode.KEY_F),e(71,keyCodes_1.KeyCode.KEY_G),e(72,keyCodes_1.KeyCode.KEY_H),e(73,keyCodes_1.KeyCode.KEY_I),e(74,keyCodes_1.KeyCode.KEY_J),e(75,keyCodes_1.KeyCode.KEY_K),e(76,keyCodes_1.KeyCode.KEY_L),e(77,keyCodes_1.KeyCode.KEY_M),e(78,keyCodes_1.KeyCode.KEY_N),e(79,keyCodes_1.KeyCode.KEY_O),e(80,keyCodes_1.KeyCode.KEY_P),e(81,keyCodes_1.KeyCode.KEY_Q),e(82,keyCodes_1.KeyCode.KEY_R),e(83,keyCodes_1.KeyCode.KEY_S),e(84,keyCodes_1.KeyCode.KEY_T),e(85,keyCodes_1.KeyCode.KEY_U),e(86,keyCodes_1.KeyCode.KEY_V),e(87,keyCodes_1.KeyCode.KEY_W),e(88,keyCodes_1.KeyCode.KEY_X),e(89,keyCodes_1.KeyCode.KEY_Y),e(90,keyCodes_1.KeyCode.KEY_Z),e(93,keyCodes_1.KeyCode.ContextMenu),e(96,keyCodes_1.KeyCode.NUMPAD_0),e(97,keyCodes_1.KeyCode.NUMPAD_1),e(98,keyCodes_1.KeyCode.NUMPAD_2),e(99,keyCodes_1.KeyCode.NUMPAD_3),e(100,keyCodes_1.KeyCode.NUMPAD_4),e(101,keyCodes_1.KeyCode.NUMPAD_5),e(102,keyCodes_1.KeyCode.NUMPAD_6),e(103,keyCodes_1.KeyCode.NUMPAD_7),e(104,keyCodes_1.KeyCode.NUMPAD_8),e(105,keyCodes_1.KeyCode.NUMPAD_9),e(106,keyCodes_1.KeyCode.NUMPAD_MULTIPLY),e(107,keyCodes_1.KeyCode.NUMPAD_ADD),e(108,keyCodes_1.KeyCode.NUMPAD_SEPARATOR),e(109,keyCodes_1.KeyCode.NUMPAD_SUBTRACT),e(110,keyCodes_1.KeyCode.NUMPAD_DECIMAL),e(111,keyCodes_1.KeyCode.NUMPAD_DIVIDE),e(112,keyCodes_1.KeyCode.F1),e(113,keyCodes_1.KeyCode.F2),e(114,keyCodes_1.KeyCode.F3),e(115,keyCodes_1.KeyCode.F4),e(116,keyCodes_1.KeyCode.F5),e(117,keyCodes_1.KeyCode.F6),e(118,keyCodes_1.KeyCode.F7),e(119,keyCodes_1.KeyCode.F8),e(120,keyCodes_1.KeyCode.F9),e(121,keyCodes_1.KeyCode.F10),e(122,keyCodes_1.KeyCode.F11),e(123,keyCodes_1.KeyCode.F12),e(124,keyCodes_1.KeyCode.F13),e(125,keyCodes_1.KeyCode.F14),e(126,keyCodes_1.KeyCode.F15),e(127,keyCodes_1.KeyCode.F16),e(128,keyCodes_1.KeyCode.F17),e(129,keyCodes_1.KeyCode.F18),e(130,keyCodes_1.KeyCode.F19),e(144,keyCodes_1.KeyCode.NumLock),e(145,keyCodes_1.KeyCode.ScrollLock),e(186,keyCodes_1.KeyCode.US_SEMICOLON),e(187,keyCodes_1.KeyCode.US_EQUAL),e(188,keyCodes_1.KeyCode.US_COMMA),e(189,keyCodes_1.KeyCode.US_MINUS),e(190,keyCodes_1.KeyCode.US_DOT),e(191,keyCodes_1.KeyCode.US_SLASH),e(192,keyCodes_1.KeyCode.US_BACKTICK),e(193,keyCodes_1.KeyCode.ABNT_C1),e(194,keyCodes_1.KeyCode.ABNT_C2),e(219,keyCodes_1.KeyCode.US_OPEN_SQUARE_BRACKET),e(220,keyCodes_1.KeyCode.US_BACKSLASH),e(221,keyCodes_1.KeyCode.US_CLOSE_SQUARE_BRACKET),e(222,keyCodes_1.KeyCode.US_QUOTE),e(223,keyCodes_1.KeyCode.OEM_8),e(226,keyCodes_1.KeyCode.OEM_102),e(229,keyCodes_1.KeyCode.KEY_IN_COMPOSITION),browser.isFirefox?(e(59,keyCodes_1.KeyCode.US_SEMICOLON),e(107,keyCodes_1.KeyCode.US_EQUAL),e(109,keyCodes_1.KeyCode.US_MINUS),platform.isMacintosh&&e(224,keyCodes_1.KeyCode.Meta)):browser.isWebKit&&(e(91,keyCodes_1.KeyCode.Meta),platform.isMacintosh?e(93,keyCodes_1.KeyCode.Meta):e(92,keyCodes_1.KeyCode.Meta))}(),exports.getCodeForKeyCode=getCodeForKeyCode;const ctrlKeyMod=platform.isMacintosh?keyCodes_1.KeyMod.WinCtrl:keyCodes_1.KeyMod.CtrlCmd,altKeyMod=keyCodes_1.KeyMod.Alt,shiftKeyMod=keyCodes_1.KeyMod.Shift,metaKeyMod=platform.isMacintosh?keyCodes_1.KeyMod.CtrlCmd:keyCodes_1.KeyMod.WinCtrl;function printKeyboardEvent(e){const o=[];return e.ctrlKey&&o.push("ctrl"),e.shiftKey&&o.push("shift"),e.altKey&&o.push("alt"),e.metaKey&&o.push("meta"),`modifiers: [${o.join(",")}], code: ${e.code}, keyCode: ${e.keyCode}, key: ${e.key}`}function printStandardKeyboardEvent(e){const o=[];return e.ctrlKey&&o.push("ctrl"),e.shiftKey&&o.push("shift"),e.altKey&&o.push("alt"),e.metaKey&&o.push("meta"),`modifiers: [${o.join(",")}], code: ${e.code}, keyCode: ${e.keyCode} ('${keyCodes_1.KeyCodeUtils.toString(e.keyCode)}')`}exports.printKeyboardEvent=printKeyboardEvent,exports.printStandardKeyboardEvent=printStandardKeyboardEvent;class StandardKeyboardEvent{constructor(e){this._standardKeyboardEventBrand=!0;const o=e;this.browserEvent=o,this.target=o.target,this.ctrlKey=o.ctrlKey,this.shiftKey=o.shiftKey,this.altKey=o.altKey,this.metaKey=o.metaKey,this.keyCode=extractKeyCode(o),this.code=o.code,this.ctrlKey=this.ctrlKey||this.keyCode===keyCodes_1.KeyCode.Ctrl,this.altKey=this.altKey||this.keyCode===keyCodes_1.KeyCode.Alt,this.shiftKey=this.shiftKey||this.keyCode===keyCodes_1.KeyCode.Shift,this.metaKey=this.metaKey||this.keyCode===keyCodes_1.KeyCode.Meta,this._asKeybinding=this._computeKeybinding(),this._asRuntimeKeybinding=this._computeRuntimeKeybinding()}preventDefault(){this.browserEvent&&this.browserEvent.preventDefault&&this.browserEvent.preventDefault()}stopPropagation(){this.browserEvent&&this.browserEvent.stopPropagation&&this.browserEvent.stopPropagation()}toKeybinding(){return this._asRuntimeKeybinding}equals(e){return this._asKeybinding===e}_computeKeybinding(){let e=keyCodes_1.KeyCode.Unknown;this.keyCode!==keyCodes_1.KeyCode.Ctrl&&this.keyCode!==keyCodes_1.KeyCode.Shift&&this.keyCode!==keyCodes_1.KeyCode.Alt&&this.keyCode!==keyCodes_1.KeyCode.Meta&&(e=this.keyCode);let o=0;return this.ctrlKey&&(o|=ctrlKeyMod),this.altKey&&(o|=altKeyMod),this.shiftKey&&(o|=shiftKeyMod),this.metaKey&&(o|=metaKeyMod),o|=e,o}_computeRuntimeKeybinding(){let e=keyCodes_1.KeyCode.Unknown;return this.keyCode!==keyCodes_1.KeyCode.Ctrl&&this.keyCode!==keyCodes_1.KeyCode.Shift&&this.keyCode!==keyCodes_1.KeyCode.Alt&&this.keyCode!==keyCodes_1.KeyCode.Meta&&(e=this.keyCode),new keyCodes_1.SimpleKeybinding(this.ctrlKey,this.shiftKey,this.altKey,this.metaKey,e)}}exports.StandardKeyboardEvent=StandardKeyboardEvent;