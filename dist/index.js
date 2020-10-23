!function (e, t) { "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.kbjs = t() : e.kbjs = t() }(self, (function () { return (() => { "use strict"; var e = { 607: (e, t, o) => { Object.defineProperty(t, "__esModule", { value: !0 }), t.KeyBinding = t.KeyCode = t.KeyMod = void 0; const i = o(525); var n = o(65); Object.defineProperty(t, "KeyMod", { enumerable: !0, get: function () { return n.KeyMod } }), Object.defineProperty(t, "KeyCode", { enumerable: !0, get: function () { return n.KeyCode } }); const s = o(163); class r { constructor(e = !1) { this._debug = e } log(...e) { this._debug && console.log("%c[keybinding:debug]", "font-weight: bold;color:#1e90ff", ...e) } warn(...e) { console.warn("%c[keybinding]", "font-weight: bold;color:#f39c12", ...e) } error(...e) { console.error("%c[keybinding]", "font-weight: bold;color:#c0392b", ...e) } debug(e = !0) { this._debug = e } } class d { constructor(e, t = !1) { this.name = e, this.debug = t, this._keybindings = new Map, this._ids = [], this._stackMap = new Map, this._logger = new r(this.debug || d._debug), this._disposed = !1, this.name ? d.map.has(this.name) ? this._logger.error("Duplicate name:", this.name) : (d.map.set(this.name, this), this.handler = async e => { await this._handler(e) }, this._logger.log("Create KeyBinding: " + this.name)) : this._logger.error("name is required!") } async _handler(e) { if (this._disposed) return void this._logger.warn(`KeyBinding(${this.name}) has been disposed!`); this._logger.log("Keydown detected at " + this.name); const t = new i.StandardKeyboardEvent(e), o = []; for (const i in this._ids) { const n = this._ids[this._ids.length - 1 - parseInt(i, 10)], s = this._keybindings.get(n); if (o.includes(s.key)) break; t.equals(s.key) && (o.push(s.key), this._logger.log(`Fire keybinding ${this.name}:${n}`), s.exec(e)) } } _halt(e) { this._stackMap.has(e) || this._stackMap.set(e, new s.default); const t = this._keybindings.get(e); this._stackMap.get(e).push(t), this._keybindings.delete(e), this._logger.log(`Halt ${this.name}:${e}:${t.key}`) } _resume(e) { const t = this._stackMap.get(e), o = t.pop(); this._keybindings.set(e, o), t.isEmpty && this._stackMap.delete(e), this._logger.log(`Resumed ${this.name}:${e}:${o.key}`) } register(e, t, o) { e ? (this._keybindings.has(e) && this._halt(e), this._keybindings.set(e, { id: e, key: t, exec: o }), this._ids.push(e), this._logger.log(`Registed ${this.name}:${e}:${t}`)) : this._logger.error("id is required!") } unregister(e) { this._keybindings.has(e) ? (this._keybindings.delete(e), this._ids.splice(this._ids.indexOf(e), 1), this._stackMap.has(e) && this._resume(e), this._logger.log(`Unregisted ${this.name}:${e}`)) : this._logger.warn(`KeyBindingItem id(${e}) not found in KeyBinding(${this.name})`) } dispose() { this._keybindings.clear(), d.map.delete(this.name), this._disposed = !0, this._logger.log("Dispose KeyBinding: " + this.name) } static debug() { d._debug = !0, d._logger.debug(!0) } static dispose() { d.map.forEach((e => e.dispose())), d.map.clear() } } t.KeyBinding = d, d.map = new Map, d._debug = !1, d._logger = new r(d._debug) }, 677: (e, t) => { Object.defineProperty(t, "__esModule", { value: !0 }), t.isStandalone = t.isEdgeWebView = t.isIPad = t.isWebkitWebView = t.isSafari = t.isChrome = t.isWebKit = t.isFirefox = t.isOpera = t.isEdge = void 0; const o = navigator.userAgent; t.isEdge = o.indexOf("Edge/") >= 0, t.isOpera = o.indexOf("Opera") >= 0, t.isFirefox = o.indexOf("Firefox") >= 0, t.isWebKit = o.indexOf("AppleWebKit") >= 0, t.isChrome = o.indexOf("Chrome") >= 0, t.isSafari = !t.isChrome && o.indexOf("Safari") >= 0, t.isWebkitWebView = !t.isChrome && !t.isSafari && t.isWebKit, t.isIPad = o.indexOf("iPad") >= 0 || t.isSafari && navigator.maxTouchPoints > 0, t.isEdgeWebView = t.isEdge && o.indexOf("WebView/") >= 0, t.isStandalone = window.matchMedia && window.matchMedia("(display-mode: standalone)").matches }, 527: (e, t) => { Object.defineProperty(t, "__esModule", { value: !0 }), t.illegalArgument = void 0, t.illegalArgument = function (e) { return e ? new Error("Illegal argument: " + e) : new Error("Illegal argument") } }, 65: (e, t, o) => { Object.defineProperty(t, "__esModule", { value: !0 }), t.ResolvedKeybinding = t.ResolvedKeybindingPart = t.ChordKeybinding = t.SimpleKeybinding = t.createSimpleKeybinding = t.createKeybinding = t.KeyChord = t.KeyMod = t.KeyCodeUtils = t.KeyCode = void 0; const i = o(527); var n; !function (e) { e[e.Unknown = 0] = "Unknown", e[e.Backspace = 1] = "Backspace", e[e.Tab = 2] = "Tab", e[e.Enter = 3] = "Enter", e[e.Shift = 4] = "Shift", e[e.Ctrl = 5] = "Ctrl", e[e.Alt = 6] = "Alt", e[e.PauseBreak = 7] = "PauseBreak", e[e.CapsLock = 8] = "CapsLock", e[e.Escape = 9] = "Escape", e[e.Space = 10] = "Space", e[e.PageUp = 11] = "PageUp", e[e.PageDown = 12] = "PageDown", e[e.End = 13] = "End", e[e.Home = 14] = "Home", e[e.LeftArrow = 15] = "LeftArrow", e[e.UpArrow = 16] = "UpArrow", e[e.RightArrow = 17] = "RightArrow", e[e.DownArrow = 18] = "DownArrow", e[e.Insert = 19] = "Insert", e[e.Delete = 20] = "Delete", e[e.KEY_0 = 21] = "KEY_0", e[e.KEY_1 = 22] = "KEY_1", e[e.KEY_2 = 23] = "KEY_2", e[e.KEY_3 = 24] = "KEY_3", e[e.KEY_4 = 25] = "KEY_4", e[e.KEY_5 = 26] = "KEY_5", e[e.KEY_6 = 27] = "KEY_6", e[e.KEY_7 = 28] = "KEY_7", e[e.KEY_8 = 29] = "KEY_8", e[e.KEY_9 = 30] = "KEY_9", e[e.KEY_A = 31] = "KEY_A", e[e.KEY_B = 32] = "KEY_B", e[e.KEY_C = 33] = "KEY_C", e[e.KEY_D = 34] = "KEY_D", e[e.KEY_E = 35] = "KEY_E", e[e.KEY_F = 36] = "KEY_F", e[e.KEY_G = 37] = "KEY_G", e[e.KEY_H = 38] = "KEY_H", e[e.KEY_I = 39] = "KEY_I", e[e.KEY_J = 40] = "KEY_J", e[e.KEY_K = 41] = "KEY_K", e[e.KEY_L = 42] = "KEY_L", e[e.KEY_M = 43] = "KEY_M", e[e.KEY_N = 44] = "KEY_N", e[e.KEY_O = 45] = "KEY_O", e[e.KEY_P = 46] = "KEY_P", e[e.KEY_Q = 47] = "KEY_Q", e[e.KEY_R = 48] = "KEY_R", e[e.KEY_S = 49] = "KEY_S", e[e.KEY_T = 50] = "KEY_T", e[e.KEY_U = 51] = "KEY_U", e[e.KEY_V = 52] = "KEY_V", e[e.KEY_W = 53] = "KEY_W", e[e.KEY_X = 54] = "KEY_X", e[e.KEY_Y = 55] = "KEY_Y", e[e.KEY_Z = 56] = "KEY_Z", e[e.Meta = 57] = "Meta", e[e.ContextMenu = 58] = "ContextMenu", e[e.F1 = 59] = "F1", e[e.F2 = 60] = "F2", e[e.F3 = 61] = "F3", e[e.F4 = 62] = "F4", e[e.F5 = 63] = "F5", e[e.F6 = 64] = "F6", e[e.F7 = 65] = "F7", e[e.F8 = 66] = "F8", e[e.F9 = 67] = "F9", e[e.F10 = 68] = "F10", e[e.F11 = 69] = "F11", e[e.F12 = 70] = "F12", e[e.F13 = 71] = "F13", e[e.F14 = 72] = "F14", e[e.F15 = 73] = "F15", e[e.F16 = 74] = "F16", e[e.F17 = 75] = "F17", e[e.F18 = 76] = "F18", e[e.F19 = 77] = "F19", e[e.NumLock = 78] = "NumLock", e[e.ScrollLock = 79] = "ScrollLock", e[e.US_SEMICOLON = 80] = "US_SEMICOLON", e[e.US_EQUAL = 81] = "US_EQUAL", e[e.US_COMMA = 82] = "US_COMMA", e[e.US_MINUS = 83] = "US_MINUS", e[e.US_DOT = 84] = "US_DOT", e[e.US_SLASH = 85] = "US_SLASH", e[e.US_BACKTICK = 86] = "US_BACKTICK", e[e.US_OPEN_SQUARE_BRACKET = 87] = "US_OPEN_SQUARE_BRACKET", e[e.US_BACKSLASH = 88] = "US_BACKSLASH", e[e.US_CLOSE_SQUARE_BRACKET = 89] = "US_CLOSE_SQUARE_BRACKET", e[e.US_QUOTE = 90] = "US_QUOTE", e[e.OEM_8 = 91] = "OEM_8", e[e.OEM_102 = 92] = "OEM_102", e[e.NUMPAD_0 = 93] = "NUMPAD_0", e[e.NUMPAD_1 = 94] = "NUMPAD_1", e[e.NUMPAD_2 = 95] = "NUMPAD_2", e[e.NUMPAD_3 = 96] = "NUMPAD_3", e[e.NUMPAD_4 = 97] = "NUMPAD_4", e[e.NUMPAD_5 = 98] = "NUMPAD_5", e[e.NUMPAD_6 = 99] = "NUMPAD_6", e[e.NUMPAD_7 = 100] = "NUMPAD_7", e[e.NUMPAD_8 = 101] = "NUMPAD_8", e[e.NUMPAD_9 = 102] = "NUMPAD_9", e[e.NUMPAD_MULTIPLY = 103] = "NUMPAD_MULTIPLY", e[e.NUMPAD_ADD = 104] = "NUMPAD_ADD", e[e.NUMPAD_SEPARATOR = 105] = "NUMPAD_SEPARATOR", e[e.NUMPAD_SUBTRACT = 106] = "NUMPAD_SUBTRACT", e[e.NUMPAD_DECIMAL = 107] = "NUMPAD_DECIMAL", e[e.NUMPAD_DIVIDE = 108] = "NUMPAD_DIVIDE", e[e.KEY_IN_COMPOSITION = 109] = "KEY_IN_COMPOSITION", e[e.ABNT_C1 = 110] = "ABNT_C1", e[e.ABNT_C2 = 111] = "ABNT_C2", e[e.MAX_VALUE = 112] = "MAX_VALUE" }(n = t.KeyCode || (t.KeyCode = {})); class s { constructor() { this._keyCodeToStr = [], this._strToKeyCode = Object.create(null) } define(e, t) { this._keyCodeToStr[e] = t, this._strToKeyCode[t.toLowerCase()] = e } keyCodeToStr(e) { return this._keyCodeToStr[e] } strToKeyCode(e) { return this._strToKeyCode[e.toLowerCase()] || n.Unknown } } const r = new s, d = new s, a = new s; function K(e, t) { const o = !!(2048 & e), i = !!(256 & e); return new l(2 === t ? i : o, !!(1024 & e), !!(512 & e), 2 === t ? o : i, 255 & e) } var _, y; !function () { function e(e, t, o = t, i = o) { r.define(e, t), d.define(e, o), a.define(e, i) } e(n.Unknown, "unknown"), e(n.Backspace, "Backspace"), e(n.Tab, "Tab"), e(n.Enter, "Enter"), e(n.Shift, "Shift"), e(n.Ctrl, "Ctrl"), e(n.Alt, "Alt"), e(n.PauseBreak, "PauseBreak"), e(n.CapsLock, "CapsLock"), e(n.Escape, "Escape"), e(n.Space, "Space"), e(n.PageUp, "PageUp"), e(n.PageDown, "PageDown"), e(n.End, "End"), e(n.Home, "Home"), e(n.LeftArrow, "LeftArrow", "Left"), e(n.UpArrow, "UpArrow", "Up"), e(n.RightArrow, "RightArrow", "Right"), e(n.DownArrow, "DownArrow", "Down"), e(n.Insert, "Insert"), e(n.Delete, "Delete"), e(n.KEY_0, "0"), e(n.KEY_1, "1"), e(n.KEY_2, "2"), e(n.KEY_3, "3"), e(n.KEY_4, "4"), e(n.KEY_5, "5"), e(n.KEY_6, "6"), e(n.KEY_7, "7"), e(n.KEY_8, "8"), e(n.KEY_9, "9"), e(n.KEY_A, "A"), e(n.KEY_B, "B"), e(n.KEY_C, "C"), e(n.KEY_D, "D"), e(n.KEY_E, "E"), e(n.KEY_F, "F"), e(n.KEY_G, "G"), e(n.KEY_H, "H"), e(n.KEY_I, "I"), e(n.KEY_J, "J"), e(n.KEY_K, "K"), e(n.KEY_L, "L"), e(n.KEY_M, "M"), e(n.KEY_N, "N"), e(n.KEY_O, "O"), e(n.KEY_P, "P"), e(n.KEY_Q, "Q"), e(n.KEY_R, "R"), e(n.KEY_S, "S"), e(n.KEY_T, "T"), e(n.KEY_U, "U"), e(n.KEY_V, "V"), e(n.KEY_W, "W"), e(n.KEY_X, "X"), e(n.KEY_Y, "Y"), e(n.KEY_Z, "Z"), e(n.Meta, "Meta"), e(n.ContextMenu, "ContextMenu"), e(n.F1, "F1"), e(n.F2, "F2"), e(n.F3, "F3"), e(n.F4, "F4"), e(n.F5, "F5"), e(n.F6, "F6"), e(n.F7, "F7"), e(n.F8, "F8"), e(n.F9, "F9"), e(n.F10, "F10"), e(n.F11, "F11"), e(n.F12, "F12"), e(n.F13, "F13"), e(n.F14, "F14"), e(n.F15, "F15"), e(n.F16, "F16"), e(n.F17, "F17"), e(n.F18, "F18"), e(n.F19, "F19"), e(n.NumLock, "NumLock"), e(n.ScrollLock, "ScrollLock"), e(n.US_SEMICOLON, ";", ";", "OEM_1"), e(n.US_EQUAL, "=", "=", "OEM_PLUS"), e(n.US_COMMA, ",", ",", "OEM_COMMA"), e(n.US_MINUS, "-", "-", "OEM_MINUS"), e(n.US_DOT, ".", ".", "OEM_PERIOD"), e(n.US_SLASH, "/", "/", "OEM_2"), e(n.US_BACKTICK, "`", "`", "OEM_3"), e(n.ABNT_C1, "ABNT_C1"), e(n.ABNT_C2, "ABNT_C2"), e(n.US_OPEN_SQUARE_BRACKET, "[", "[", "OEM_4"), e(n.US_BACKSLASH, "\\", "\\", "OEM_5"), e(n.US_CLOSE_SQUARE_BRACKET, "]", "]", "OEM_6"), e(n.US_QUOTE, "'", "'", "OEM_7"), e(n.OEM_8, "OEM_8"), e(n.OEM_102, "OEM_102"), e(n.NUMPAD_0, "NumPad0"), e(n.NUMPAD_1, "NumPad1"), e(n.NUMPAD_2, "NumPad2"), e(n.NUMPAD_3, "NumPad3"), e(n.NUMPAD_4, "NumPad4"), e(n.NUMPAD_5, "NumPad5"), e(n.NUMPAD_6, "NumPad6"), e(n.NUMPAD_7, "NumPad7"), e(n.NUMPAD_8, "NumPad8"), e(n.NUMPAD_9, "NumPad9"), e(n.NUMPAD_MULTIPLY, "NumPad_Multiply"), e(n.NUMPAD_ADD, "NumPad_Add"), e(n.NUMPAD_SEPARATOR, "NumPad_Separator"), e(n.NUMPAD_SUBTRACT, "NumPad_Subtract"), e(n.NUMPAD_DECIMAL, "NumPad_Decimal"), e(n.NUMPAD_DIVIDE, "NumPad_Divide") }(), (y = t.KeyCodeUtils || (t.KeyCodeUtils = {})).toString = function (e) { return r.keyCodeToStr(e) }, y.fromString = function (e) { return r.strToKeyCode(e) }, y.toUserSettingsUS = function (e) { return d.keyCodeToStr(e) }, y.toUserSettingsGeneral = function (e) { return a.keyCodeToStr(e) }, y.fromUserSettings = function (e) { return d.strToKeyCode(e) || a.strToKeyCode(e) }, (_ = t.KeyMod || (t.KeyMod = {}))[_.CtrlCmd = 2048] = "CtrlCmd", _[_.Shift = 1024] = "Shift", _[_.Alt = 512] = "Alt", _[_.WinCtrl = 256] = "WinCtrl", t.KeyChord = function (e, t) { return (e | (65535 & t) << 16 >>> 0) >>> 0 }, t.createKeybinding = function (e, t) { if (0 === e) return null; const o = (65535 & e) >>> 0, i = (4294901760 & e) >>> 16; return new C(0 !== i ? [K(o, t), K(i, t)] : [K(o, t)]) }, t.createSimpleKeybinding = K; class l { constructor(e, t, o, i, n) { this.ctrlKey = e, this.shiftKey = t, this.altKey = o, this.metaKey = i, this.keyCode = n } equals(e) { return this.ctrlKey === e.ctrlKey && this.shiftKey === e.shiftKey && this.altKey === e.altKey && this.metaKey === e.metaKey && this.keyCode === e.keyCode } getHashCode() { return `${this.ctrlKey ? "1" : "0"}${this.shiftKey ? "1" : "0"}${this.altKey ? "1" : "0"}${this.metaKey ? "1" : "0"}${this.keyCode}` } isModifierKey() { return this.keyCode === n.Unknown || this.keyCode === n.Ctrl || this.keyCode === n.Meta || this.keyCode === n.Alt || this.keyCode === n.Shift } toChord() { return new C([this]) } isDuplicateModifierCase() { return this.ctrlKey && this.keyCode === n.Ctrl || this.shiftKey && this.keyCode === n.Shift || this.altKey && this.keyCode === n.Alt || this.metaKey && this.keyCode === n.Meta } } t.SimpleKeybinding = l; class C { constructor(e) { if (0 === e.length) throw i.illegalArgument("parts"); this.parts = e } getHashCode() { let e = ""; for (let t = 0, o = this.parts.length; t < o; t++)0 !== t && (e += ";"), e += this.parts[t].getHashCode(); return e } equals(e) { if (null === e) return !1; if (this.parts.length !== e.parts.length) return !1; for (let t = 0; t < this.parts.length; t++)if (!this.parts[t].equals(e.parts[t])) return !1; return !0 } } t.ChordKeybinding = C, t.ResolvedKeybindingPart = class { constructor(e, t, o, i, n, s) { this.ctrlKey = e, this.shiftKey = t, this.altKey = o, this.metaKey = i, this.keyLabel = n, this.keyAriaLabel = s } }, t.ResolvedKeybinding = class { } }, 525: (e, t, o) => { Object.defineProperty(t, "__esModule", { value: !0 }), t.StandardKeyboardEvent = t.printStandardKeyboardEvent = t.printKeyboardEvent = t.getCodeForKeyCode = void 0; const i = o(65), n = o(938), s = o(677), r = new Array(230), d = new Array(i.KeyCode.MAX_VALUE); !function () { for (let e = 0; e < d.length; e++)d[e] = -1; function e(e, t) { r[e] = t, d[t] = e } e(3, i.KeyCode.PauseBreak), e(8, i.KeyCode.Backspace), e(9, i.KeyCode.Tab), e(13, i.KeyCode.Enter), e(16, i.KeyCode.Shift), e(17, i.KeyCode.Ctrl), e(18, i.KeyCode.Alt), e(19, i.KeyCode.PauseBreak), e(20, i.KeyCode.CapsLock), e(27, i.KeyCode.Escape), e(32, i.KeyCode.Space), e(33, i.KeyCode.PageUp), e(34, i.KeyCode.PageDown), e(35, i.KeyCode.End), e(36, i.KeyCode.Home), e(37, i.KeyCode.LeftArrow), e(38, i.KeyCode.UpArrow), e(39, i.KeyCode.RightArrow), e(40, i.KeyCode.DownArrow), e(45, i.KeyCode.Insert), e(46, i.KeyCode.Delete), e(48, i.KeyCode.KEY_0), e(49, i.KeyCode.KEY_1), e(50, i.KeyCode.KEY_2), e(51, i.KeyCode.KEY_3), e(52, i.KeyCode.KEY_4), e(53, i.KeyCode.KEY_5), e(54, i.KeyCode.KEY_6), e(55, i.KeyCode.KEY_7), e(56, i.KeyCode.KEY_8), e(57, i.KeyCode.KEY_9), e(65, i.KeyCode.KEY_A), e(66, i.KeyCode.KEY_B), e(67, i.KeyCode.KEY_C), e(68, i.KeyCode.KEY_D), e(69, i.KeyCode.KEY_E), e(70, i.KeyCode.KEY_F), e(71, i.KeyCode.KEY_G), e(72, i.KeyCode.KEY_H), e(73, i.KeyCode.KEY_I), e(74, i.KeyCode.KEY_J), e(75, i.KeyCode.KEY_K), e(76, i.KeyCode.KEY_L), e(77, i.KeyCode.KEY_M), e(78, i.KeyCode.KEY_N), e(79, i.KeyCode.KEY_O), e(80, i.KeyCode.KEY_P), e(81, i.KeyCode.KEY_Q), e(82, i.KeyCode.KEY_R), e(83, i.KeyCode.KEY_S), e(84, i.KeyCode.KEY_T), e(85, i.KeyCode.KEY_U), e(86, i.KeyCode.KEY_V), e(87, i.KeyCode.KEY_W), e(88, i.KeyCode.KEY_X), e(89, i.KeyCode.KEY_Y), e(90, i.KeyCode.KEY_Z), e(93, i.KeyCode.ContextMenu), e(96, i.KeyCode.NUMPAD_0), e(97, i.KeyCode.NUMPAD_1), e(98, i.KeyCode.NUMPAD_2), e(99, i.KeyCode.NUMPAD_3), e(100, i.KeyCode.NUMPAD_4), e(101, i.KeyCode.NUMPAD_5), e(102, i.KeyCode.NUMPAD_6), e(103, i.KeyCode.NUMPAD_7), e(104, i.KeyCode.NUMPAD_8), e(105, i.KeyCode.NUMPAD_9), e(106, i.KeyCode.NUMPAD_MULTIPLY), e(107, i.KeyCode.NUMPAD_ADD), e(108, i.KeyCode.NUMPAD_SEPARATOR), e(109, i.KeyCode.NUMPAD_SUBTRACT), e(110, i.KeyCode.NUMPAD_DECIMAL), e(111, i.KeyCode.NUMPAD_DIVIDE), e(112, i.KeyCode.F1), e(113, i.KeyCode.F2), e(114, i.KeyCode.F3), e(115, i.KeyCode.F4), e(116, i.KeyCode.F5), e(117, i.KeyCode.F6), e(118, i.KeyCode.F7), e(119, i.KeyCode.F8), e(120, i.KeyCode.F9), e(121, i.KeyCode.F10), e(122, i.KeyCode.F11), e(123, i.KeyCode.F12), e(124, i.KeyCode.F13), e(125, i.KeyCode.F14), e(126, i.KeyCode.F15), e(127, i.KeyCode.F16), e(128, i.KeyCode.F17), e(129, i.KeyCode.F18), e(130, i.KeyCode.F19), e(144, i.KeyCode.NumLock), e(145, i.KeyCode.ScrollLock), e(186, i.KeyCode.US_SEMICOLON), e(187, i.KeyCode.US_EQUAL), e(188, i.KeyCode.US_COMMA), e(189, i.KeyCode.US_MINUS), e(190, i.KeyCode.US_DOT), e(191, i.KeyCode.US_SLASH), e(192, i.KeyCode.US_BACKTICK), e(193, i.KeyCode.ABNT_C1), e(194, i.KeyCode.ABNT_C2), e(219, i.KeyCode.US_OPEN_SQUARE_BRACKET), e(220, i.KeyCode.US_BACKSLASH), e(221, i.KeyCode.US_CLOSE_SQUARE_BRACKET), e(222, i.KeyCode.US_QUOTE), e(223, i.KeyCode.OEM_8), e(226, i.KeyCode.OEM_102), e(229, i.KeyCode.KEY_IN_COMPOSITION), s.isFirefox ? (e(59, i.KeyCode.US_SEMICOLON), e(107, i.KeyCode.US_EQUAL), e(109, i.KeyCode.US_MINUS), n.isMacintosh && e(224, i.KeyCode.Meta)) : s.isWebKit && (e(91, i.KeyCode.Meta), n.isMacintosh ? e(93, i.KeyCode.Meta) : e(92, i.KeyCode.Meta)) }(), t.getCodeForKeyCode = function (e) { return d[e] }; const a = n.isMacintosh ? i.KeyMod.WinCtrl : i.KeyMod.CtrlCmd, K = i.KeyMod.Alt, _ = i.KeyMod.Shift, y = n.isMacintosh ? i.KeyMod.CtrlCmd : i.KeyMod.WinCtrl; t.printKeyboardEvent = function (e) { const t = []; return e.ctrlKey && t.push("ctrl"), e.shiftKey && t.push("shift"), e.altKey && t.push("alt"), e.metaKey && t.push("meta"), `modifiers: [${t.join(",")}], code: ${e.code}, keyCode: ${e.keyCode}, key: ${e.key}` }, t.printStandardKeyboardEvent = function (e) { const t = []; return e.ctrlKey && t.push("ctrl"), e.shiftKey && t.push("shift"), e.altKey && t.push("alt"), e.metaKey && t.push("meta"), `modifiers: [${t.join(",")}], code: ${e.code}, keyCode: ${e.keyCode} ('${i.KeyCodeUtils.toString(e.keyCode)}')` }, t.StandardKeyboardEvent = class { constructor(e) { this._standardKeyboardEventBrand = !0; const t = e; this.browserEvent = t, this.target = t.target, this.ctrlKey = t.ctrlKey, this.shiftKey = t.shiftKey, this.altKey = t.altKey, this.metaKey = t.metaKey, this.keyCode = function (e) { if (e.charCode) { const t = String.fromCharCode(e.charCode).toUpperCase(); return i.KeyCodeUtils.fromString(t) } return r[e.keyCode] || i.KeyCode.Unknown }(t), this.code = t.code, this.ctrlKey = this.ctrlKey || this.keyCode === i.KeyCode.Ctrl, this.altKey = this.altKey || this.keyCode === i.KeyCode.Alt, this.shiftKey = this.shiftKey || this.keyCode === i.KeyCode.Shift, this.metaKey = this.metaKey || this.keyCode === i.KeyCode.Meta, this._asKeybinding = this._computeKeybinding(), this._asRuntimeKeybinding = this._computeRuntimeKeybinding() } preventDefault() { this.browserEvent && this.browserEvent.preventDefault && this.browserEvent.preventDefault() } stopPropagation() { this.browserEvent && this.browserEvent.stopPropagation && this.browserEvent.stopPropagation() } toKeybinding() { return this._asRuntimeKeybinding } equals(e) { return this._asKeybinding === e } _computeKeybinding() { let e = i.KeyCode.Unknown; this.keyCode !== i.KeyCode.Ctrl && this.keyCode !== i.KeyCode.Shift && this.keyCode !== i.KeyCode.Alt && this.keyCode !== i.KeyCode.Meta && (e = this.keyCode); let t = 0; return this.ctrlKey && (t |= a), this.altKey && (t |= K), this.shiftKey && (t |= _), this.metaKey && (t |= y), t |= e, t } _computeRuntimeKeybinding() { let e = i.KeyCode.Unknown; return this.keyCode !== i.KeyCode.Ctrl && this.keyCode !== i.KeyCode.Shift && this.keyCode !== i.KeyCode.Alt && this.keyCode !== i.KeyCode.Meta && (e = this.keyCode), new i.SimpleKeybinding(this.ctrlKey, this.shiftKey, this.altKey, this.metaKey, e) } } }, 938: (e, t, o) => { var i; Object.defineProperty(t, "__esModule", { value: !0 }), t.isLittleEndian = t.OS = t.setImmediate = t.globals = t.translationsConfigFile = t.locale = t.Language = t.language = t.isRootUser = t.userAgent = t.platform = t.isIOS = t.isWeb = t.isNative = t.isLinux = t.isMacintosh = t.isWindows = t.PlatformToString = void 0; const n = "en"; let s = !1, r = !1, d = !1, a = !1, K = !1, _ = !1, y = void 0, l = n, C = void 0, h = void 0; const E = "object" == typeof self ? self : "object" == typeof o.g ? o.g : {}; let c = void 0; "undefined" != typeof process ? c = process : void 0 !== E.vscode && (c = E.vscode.process); const u = "string" == typeof (null === (i = null == c ? void 0 : c.versions) || void 0 === i ? void 0 : i.electron) && "renderer" === c.type; if ("object" != typeof navigator || u) if ("object" == typeof c) { s = "win32" === c.platform, r = "darwin" === c.platform, d = "linux" === c.platform, y = n, l = n; const e = c.env.VSCODE_NLS_CONFIG; if (e) try { const t = JSON.parse(e), o = t.availableLanguages["*"]; y = t.locale, l = o || n, C = t._translationsConfigFile } catch (e) { } a = !0 } else console.error("Unable to resolve platform."); else h = navigator.userAgent, s = h.indexOf("Windows") >= 0, r = h.indexOf("Macintosh") >= 0, _ = (h.indexOf("Macintosh") >= 0 || h.indexOf("iPad") >= 0 || h.indexOf("iPhone") >= 0) && !!navigator.maxTouchPoints && navigator.maxTouchPoints > 0, d = h.indexOf("Linux") >= 0, K = !0, y = navigator.language, l = y; t.PlatformToString = function (e) { switch (e) { case 0: return "Web"; case 1: return "Mac"; case 2: return "Linux"; case 3: return "Windows" } }; let g = 0; var A; r ? g = 1 : s ? g = 3 : d && (g = 2), t.isWindows = s, t.isMacintosh = r, t.isLinux = d, t.isNative = a, t.isWeb = K, t.isIOS = _, t.platform = g, t.userAgent = h, t.isRootUser = function () { return !!c && !s && 0 === c.getuid() }, t.language = l, (A = t.Language || (t.Language = {})).value = function () { return t.language }, A.isDefaultVariant = function () { return 2 === t.language.length ? "en" === t.language : t.language.length >= 3 && "e" === t.language[0] && "n" === t.language[1] && "-" === t.language[2] }, A.isDefault = function () { return "en" === t.language }, t.locale = y, t.translationsConfigFile = C, t.globals = E, t.setImmediate = function () { if (t.globals.setImmediate) return t.globals.setImmediate.bind(t.globals); if ("function" == typeof t.globals.postMessage && !t.globals.importScripts) { const e = []; t.globals.addEventListener("message", (t => { if (t.data && t.data.vscodeSetImmediateId) for (let o = 0, i = e.length; o < i; o++) { const i = e[o]; if (i.id === t.data.vscodeSetImmediateId) return e.splice(o, 1), void i.callback() } })); let o = 0; return i => { const n = ++o; e.push({ id: n, callback: i }), t.globals.postMessage({ vscodeSetImmediateId: n }, "*") } } if (c) return c.nextTick.bind(c); const e = Promise.resolve(); return t => e.then(t) }(), t.OS = r || _ ? 2 : s ? 1 : 3; let M = !0, f = !1; t.isLittleEndian = function () { if (!f) { f = !0; const e = new Uint8Array(2); e[0] = 1, e[1] = 2; const t = new Uint16Array(e.buffer); M = 513 === t[0] } return M } }, 163: (e, t) => { Object.defineProperty(t, "__esModule", { value: !0 }), t.default = class { constructor(e = []) { this._items = e } push(e) { this._items.push(e) } pop() { return this._items.pop() } peek() { return this._items[this._items.length - 1] } isEmpty() { return 0 === this._items.length } size() { return this._items.length } toString() { return this._items.map((e => JSON.stringify(e))).join("\n") } } } }, t = {}; function o(i) { if (t[i]) return t[i].exports; var n = t[i] = { exports: {} }; return e[i](n, n.exports, o), n.exports } return o.g = function () { if ("object" == typeof globalThis) return globalThis; try { return this || new Function("return this")() } catch (e) { if ("object" == typeof window) return window } }(), o(607) })() }));
