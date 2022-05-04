import VueRouter from 'vue-router';


const oldPush = VueRouter.prototype.push;
const oldReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function (location, onResolve, onReject) {
    console.log(this);
    // 如果已经设定了成功或失败回调，则调用原始的 push 方法
    if (onResolve || onReject) return oldPush.call(this, location, onResolve, onReject);
    // 否则，直接 catch promise 对象，并且忽略错误
    return oldPush.call(this, location).catch(() => undefined);
};

VueRouter.prototype.replace = function (location, onResolve, onReject) {
    if (onResolve || onReject) return oldReplace.call(this, location, onResolve, onReject);
    return oldReplace.call(this, location).catch(() => undefined);
};
