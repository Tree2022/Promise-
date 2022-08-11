// MyPromise.js

// 先定义三个常量表示状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

// 新建 MyPromise 类
class MyPromise {
  constructor(executor){
    // executor 是一个执行器，进入会立即执行
    // 并传入resolve和reject方法
    executor(this.resolve, this.reject)
  }

  // 储存状态的变量，初始值是 pending
  status = PENDING;

  // resolve和reject为什么要用箭头函数？
  // 如果直接调用的话，普通函数this指向的是window或者undefined
  // 用箭头函数就可以让this指向当前实例对象

  // 成功之后的值
  value = null;
  // 失败之后的原因
  reason = null;

  // 存储成功回调函数
  onFulfilledCallback = null;

  // 存储失败回调函数
  onRejectedCallback = null;

  // 更改成功后的状态
  resolve = (value) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态修改为成功
      this.status = FULFILLED;
      // 保存成功之后的值
      this.value = value;
    }
  }

  // 更改失败后的状态
  reject = (reason) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态成功为失败
      this.status = REJECTED;
      // 保存失败后的原因
      this.reason = reason;
    }
  }

  //then方法去判断状态 然后去执行成功的回调或者是失败的回调
  then(onFulfilled, onRejected) {
     // 判断状态
   if (this.status === FULFILLED) {
     // 调用成功回调，并且把值返回
     onFulfilled(this.value);
   } else if (this.status === REJECTED) {
     // 调用失败回调，并且把原因返回
     onRejected(this.reason);
   } else if (this.status === PENDING) {
     // ==== 新增 ====
     // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
     // 等到执行成功失败函数的时候再传递
     this.onFulfilledCallback = onFulfilled;
     this.onRejectedCallback = onRejected;
   }
  }
}

module.exports = MyPromise
