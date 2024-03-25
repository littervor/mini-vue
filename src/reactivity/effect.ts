class RecvtiveEffect { //创建effect类
    private _fn: any; //用于接收effct函数的容器
    constructor(fn) {
        this._fn = fn;
    }
    run() {           //动态更新时借助这个方法调用函数
        activeEffect = this;//
        return this._fn();
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
        targetMap.set(target, depsMap);
    }
    let dep = depsMap.get(key);
    //解决初始化问题
    if (!dep) {// if (!depsMap) {//当depsMap不存在时，重新创建一个
        dep = new Set();
    }
    dep.add(activeEffect);
}
export function trigger(target, key) {
    let depsMap = targetMap.get(target);
    let dep = depsMap.get(key);
    for (const effect of dep) {
        effect.run()
    }
}
export function effect(fn) {
    //fn
    const _effect = new RecvtiveEffect(fn);
    _effect.run();
    return _effect.run.bind(_effect);
}