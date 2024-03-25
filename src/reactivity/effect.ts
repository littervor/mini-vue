class RecvtiveEffect {
    private _fn: any;
    constructor(fn) {
        this._fn = fn;
    }
    run() {
        activeEffect = this;
        this._fn();
    }
}
let activeEffect;
const targetMap = new Map();
export function track(target, key) {
    //target -> key -> deep
    let depsMap = targetMap.get(target);
    //解决初始化问题
    if (!depsMap) {//当depsMap不存在时，重新创建一个
        depsMap = new Map();
        targetMap.set(target, depsMap)
    }
    let dep = depsMap.get(key);
    //解决初始化问题
    if (!dep) {// if (!depsMap) {//当depsMap不存在时，重新创建一个
        dep = new Set();
    }
    dep.push(activeEffect);
}
export function effect(fn) {
    //fn
    const _effect = new RecvtiveEffect(fn);
    _effect.run();
}