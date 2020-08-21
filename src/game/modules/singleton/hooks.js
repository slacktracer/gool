export const hooks = {
  context: {},
  events: {
    context: [
      "touchstart",
      "touchmove",
      "touchend",
      "mouseover",
      "mousedown",
      "mousemove",
      "mouseout",
      "mouseup",
      "click",
      "keydown",
      "keyup",
      "resize",
    ],
  },
  install: function (context) {
    var i, length;
    for (i = 0, length = hooks.events.context.length; i < length; i += 1) {
      hooks.context[hooks.events.context[i]] = [];
      hooks[hooks.events.context[i]] = hooks.createRegisterFunction(
        hooks.events.context[i],
      );
      context[hooks.events.context[i]] = this.createHandlerFunction(
        hooks.events.context[i],
      );
    }
  },
  createHandlerFunction: function (eventName) {
    return function () {
      var i, length;
      for (
        i = 0, length = hooks.context[eventName].length;
        i < length;
        i += 1
      ) {
        hooks.context[eventName][i](event);
      }
    };
  },
  createRegisterFunction: function (eventName) {
    return function (funktion, that) {
      if (that) {
        funktion = funktion.bind(that);
      }
      hooks.context[eventName].push(funktion);
    };
  },
};
