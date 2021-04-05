import { xf } from '../xf.js';
import { memberOf } from '../functions.js';

class LocalStorageItem {
    constructor(args) {
        this.key      = args.key;
        this.default  = args.default;
        this.validate = args.validate;
        this.init();
    }
    init() {
        const self = this;
        self.restore();
    }
    restore() {
        const self = this;
        const initialValue = self.get();
        if(initialValue === null) {
            self.set(self.default);
        }
        const key   = self.key;
        const value = self.get();
        xf.dispatch(`storage:set:${key}`, value);
    }
    get() {
        const self  = this;
        const key   = self.key;
        const value = window.localStorage.getItem(`${key}`);
        if(value === undefined || value === null) {
            console.warn(`Trying to get non-existing value from Local Storage at key ${key}!`);
        }
        return value;
    }
    set(value) {
        const self    = this;
        const key     = self.key;
        const isValid = self.validate(value);
        if(isValid) {
            window.localStorage.setItem(`${key}`, value);
        } else {
            console.warn(`Trying to enter invalid ${key} value in Local Storage: ${value}`);
            window.localStorage.setItem(`${key}`, self.default);
        }
    }
    delete() {
        const self    = this;
        window.localStorage.removeItem(`${self.key}`);
    }
}

export { LocalStorageItem };