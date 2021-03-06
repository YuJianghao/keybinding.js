import { StandardKeyboardEvent } from "./lib/keyboardEvent";
export { KeyMod, KeyCode } from "./lib/keyCodes";
import Stack from "./lib/stack";
const scopeReg = /^([a-zA-Z][0-9a-zA-Z]*)+(\.[0-9a-zA-Z]+)*$/;

class Logger {
  constructor(private _debug = false) {}
  log(...args: unknown[]) {
    if (!this._debug) return;
    console.log(
      "%c[keybinding:debug]",
      "font-weight: bold;color:#1e90ff",
      ...args
    );
  }
  warn(...args: unknown[]) {
    console.warn("%c[keybinding]", "font-weight: bold;color:#f39c12", ...args);
  }
  error(...args: unknown[]) {
    console.error("%c[keybinding]", "font-weight: bold;color:#c0392b", ...args);
  }
  public debug(debug = true) {
    this._debug = debug;
  }
}

/**
 * Item used to describe keybindings
 * @param key KeyMod and KeyCode
 * @param exec callback
 */
interface IKeyBindingItem {
  id: string;
  key: number;
  exec: (e: KeyboardEvent) => void;
}

interface IKeyBindingOptions {
  stop?: boolean;
  prevent?: boolean;
}

export class KeyBinding {
  private static _map: Map<string, KeyBinding> = new Map();
  private static _debug = false;
  private _logger: Logger = new Logger(this.debug || KeyBinding._debug);
  private static _logger = new Logger(KeyBinding._debug);
  private _keybindings: Map<string, IKeyBindingItem> = new Map();
  private _ids: string[] = [];
  private _stackMap: Map<string, Stack<IKeyBindingItem>> = new Map();
  /**
   * Handler used to handle keyboard event
   */
  public handler: (e: KeyboardEvent) => Promise<void>;
  private _disposed = false;
  private _stop: number[] = [];
  private _prevent: number[] = [];

  /**
   * Create a KeyBinding instance
   * @param name instance uniq name
   * @param debug true for debug mode
   */
  constructor(public name: string, public debug = false) {
    if (!this.name) {
      this._logger.error("name is required!");
      throw new Error("name is required!");
    }
    if (!scopeReg.test(name)) {
      this._logger.error(`"${name}" does not match pattern\n`, scopeReg);
      throw new Error("pattern not match");
    }
    if (KeyBinding._map.has(this.name)) {
      this._logger.error(`Duplicate name: ${this.name}`);
      throw new Error(`Duplicate name: ${this.name}`);
    }
    KeyBinding._map.set(this.name, this);
    this.handler = async (e) => {
      await this._handler(e);
    };
    this._logger.log(`Create KeyBinding: ${this.name}`);
  }

  private async _handler(e: KeyboardEvent): Promise<void> {
    if (this._disposed) {
      this._logger.warn(`KeyBinding(${this.name}) has been disposed!`);
      return;
    }
    const se = new StandardKeyboardEvent(e);
    this._stop.forEach((key) => {
      if (se.equals(key)) e.stopPropagation();
    });
    this._prevent.forEach((key) => {
      if (se.equals(key)) e.preventDefault();
    });
    const firedKeys: number[] = [];
    for (const i in this._ids) {
      const id = this._ids[this._ids.length - 1 - parseInt(i, 10)];
      const kbd = this._keybindings.get(id);
      if (firedKeys.includes(kbd.key)) break;
      if (se.equals(kbd.key)) {
        firedKeys.push(kbd.key);
        this._logger.log(`Fire keybinding ${this.name}:${id}`);
        kbd.exec(e);
      }
    }
  }

  private _halt(id: string) {
    if (!this._stackMap.has(id))
      this._stackMap.set(id, new Stack<IKeyBindingItem>());
    const kbi = this._keybindings.get(id);
    this._stackMap.get(id).push(kbi);
    this._keybindings.delete(id);
    this._logger.log(`Halt ${this.name}:${id}:${kbi.key}`);
  }

  private _resume(id: string) {
    const stack = this._stackMap.get(id);
    const kbi = stack.pop();
    this._keybindings.set(id, kbi);
    if (stack.isEmpty) this._stackMap.delete(id);
    this._logger.log(`Resumed ${this.name}:${id}:${kbi.key}`);
  }

  /**
   * Enable debug mode
   */
  public static debug(): void {
    KeyBinding._debug = true;
    KeyBinding._logger.debug(true);
  }

  /**
   * Create new instance with name, the same as `new KeyBinding(name)`
   * @param name uniq name for instance
   */
  public static createInstance(name: string): KeyBinding {
    return new KeyBinding(name);
  }

  /**
   * Get an instance with name
   * @param name uniq name for instance
   */
  public static getInstance(name: string): KeyBinding | null {
    if (KeyBinding._map.has(name)) return KeyBinding._map.get(name);
    else return null;
  }

  /**
   * Register a keybinding
   * @param id uniq id for keybinding
   * @param key keys e.g. KeyMod.CtrlCmd | KeyCode.Key_S
   * @param exec callback
   */
  public register(
    id: string,
    key: number,
    exec: (e: KeyboardEvent) => void,
    options: IKeyBindingOptions = {}
  ): void {
    if (!scopeReg.test(id)) {
      this._logger.error(`"${id}" does not match pattern\n`, scopeReg);
      throw new Error("pattern not match");
    }
    if (!id) {
      this._logger.error("id is required!");
      return;
    }
    if (this._keybindings.has(id)) {
      this._halt(id);
    }
    this._keybindings.set(id, { id, key, exec });
    this._ids.push(id);
    this._logger.log(`Registed ${this.name}:${id}:${key}`);
    const { stop, prevent } = options;
    if (stop) this.stop(key);
    if (prevent) this.prevent(key);
  }

  /**
   * Register a keybinding. Will create new instance if not exists.
   * @param name uniq name for instance
   * @param id uniq id for keybinding
   * @param key keys e.g. KeyMod.CtrlCmd | KeyCode.Key_S
   * @param exec callback
   */
  public static register(
    name: string,
    id: string,
    key: number,
    exec: (e: KeyboardEvent) => void
  ): void {
    const kbd = KeyBinding.getInstance(name) || new KeyBinding(name);
    kbd.register(id, key, exec);
  }

  /**
   * Unregister a keybinding
   * @param id uniq id for keybinding
   */
  public unregister(id: string): void {
    if (!this._keybindings.has(id)) {
      this._logger.warn(
        `KeyBindingItem id(${id}) not found in KeyBinding(${this.name})`
      );
      return;
    }
    this._keybindings.delete(id);
    this._ids.splice(this._ids.indexOf(id), 1);
    if (this._stackMap.has(id)) {
      this._resume(id);
    }
    this._logger.log(`Unregisted ${this.name}:${id}`);
  }

  /**
   * Unregister a keybinding
   * @param name uniq name for instance
   * @param id uniq id for keybinding
   */
  public static unregister(name: string, id: string): void {
    const kbd = KeyBinding.getInstance(name);
    if (!kbd) {
      KeyBinding._logger.log(`Instance not found: ${name}`);
      return;
    }
    kbd.unregister(id);
  }

  /**
   * Add key(s) to stoped keys
   * e.stopPropagation() will run when event fired
   * @param key key to prevent
   */
  public stop(key: number): void;
  public stop(keys: number[]): void;
  public stop(args: any): void {
    if (!Array.isArray(args)) this.stop([args]);
    else {
      this._stop = this._stop
        .concat(args)
        .filter((value, index, self) => self.indexOf(value) === index);
    }
  }

  /**
   * Add key(s) to stoped keys
   * e.stopPropagation() will run when event fired
   * @param name uniq name for instance
   * @param key key to prevent
   */
  public static stop(name: string, key: number): void;
  public static stop(name: string, keys: number[]): void;
  public static stop(name: string, arg: any): void {
    const kbd = KeyBinding.getInstance(name) || new KeyBinding(name);
    kbd.stop(arg);
  }

  /**
   * Remove key(s) to stoped keys
   * e.stopPropagation() will run when event fired
   * @param key key to prevent
   */
  public unstop(key: number): void;
  public unstop(keys: number[]): void;
  public unstop(args: any): void {
    if (!Array.isArray(args)) this.unstop([args]);
    else {
      this._stop = this._stop.filter((key) => !args.includes(key));
    }
  }

  /**
   * Remove key(s) to stoped keys
   * e.stopPropagation() will run when event fired
   * @param name uniq name for instance
   * @param key key to prevent
   */
  public static unstop(name: string, key: number): void;
  public static unstop(name: string, keys: number[]): void;
  public static unstop(name: string, arg: any): void {
    const kbd = KeyBinding.getInstance(name) || new KeyBinding(name);
    kbd.unstop(arg);
  }

  /**
   * Add key(s) to prevented keys
   * e.preventDefault() will run when event fired
   * @param key key to prevent
   */
  public prevent(key: number): void;
  public prevent(keys: number[]): void;
  public prevent(args: any): void {
    if (!Array.isArray(args)) this.prevent([args]);
    else {
      this._prevent = this._prevent
        .concat(args)
        .filter((value, index, self) => self.indexOf(value) === index);
    }
  }

  /**
   * Add key(s) to prevented keys
   * e.preventDefault() will run when event fired
   * @param name uniq name for instance
   * @param key key to prevent
   */
  public static prevent(name: string, key: number): void;
  public static prevent(name: string, keys: number[]): void;
  public static prevent(name: string, arg: any): void {
    const kbd = KeyBinding.getInstance(name) || new KeyBinding(name);
    kbd.prevent(arg);
  }

  /**
   * Remove key(s) to prevented keys
   * e.preventDefault() will run when event fired
   * @param key key to prevent
   */
  public unprevent(key: number): void;
  public unprevent(keys: number[]): void;
  public unprevent(args: any): void {
    if (!Array.isArray(args)) this.unprevent([args]);
    else {
      this._stop = this._stop.filter((key) => !args.includes(key));
    }
  }

  /**
   * Remove key(s) to prevented keys
   * e.preventDefault() will run when event fired
   * @param name uniq name for instance
   * @param key key to prevent
   */
  public static unprevent(name: string, key: number): void;
  public static unprevent(name: string, keys: number[]): void;
  public static unprevent(name: string, arg: any): void {
    const kbd = KeyBinding.getInstance(name) || new KeyBinding(name);
    kbd.unprevent(arg);
  }

  /**
   * Unregister all keybinding and remove instance from record.
   * After dispose, hanlder will not work any more.
   */
  public dispose(): void {
    this._keybindings.clear();
    KeyBinding._map.delete(this.name);
    this._disposed = true;
    this._logger.log(`Dispose KeyBinding: ${this.name}`);
  }

  /**
   * Unregister all keybinding and remove all instance from record
   */
  public static dispose(): void {
    KeyBinding._map.forEach((keybinding) => keybinding.dispose());
    KeyBinding._map.clear();
  }
}
