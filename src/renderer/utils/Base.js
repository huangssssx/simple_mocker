export function curry(f, ...args) {
  const out_args = args;
  return (...in_res) => {
    const in_args = in_res;
    const args = out_args.concat(in_args);
    f(args);
  };
}

// 包装函数符合curry模式
export function thunkify(fn) {
  const that = this;
  return function () {
    const args = Array.from(arguments);
    return function (callback) {
      // console.log("callback:",callback);
      let called;
      const proxyCallBack = function () {
        if (called) {
          return;
        }
        called = true;
        callback(...Array.from(arguments));
      };
      const wholeArgs = [...args, proxyCallBack];
      // console.log("wholeArgs",wholeArgs);
      try {
        return fn.apply(that, wholeArgs);
      } catch (err) {
        callback(err);
      }
    };
  };
}

// 自执行函数
export function autoLancher(...fns) {
  // console.log(this);
  const thunkify_bind = thunkify.bind(this);
  function* gen() {
    for (const fn of fns) {
      // console.log("内部",fn);
      yield thunkify_bind(fn)();
    }
  }
  const genInstance = gen();
  const next = function () {
    const res = genInstance.next();
    if (!res || res.done) return;

    res.value(next);
  };
  next();
}
