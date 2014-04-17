define(function () {
    'use strict';
    var
        Context;
    // extracting Sketch (sketch.js) from the global context
    Context = Sketch;
    Sketch = null;
    return {
        create: function create(layerId) {
            Context.install(this);
            // var
            //     context;
            // context = Context.create({
            //     autopause: false,
            //     autostart: false,
            //     container: document.getElementById(layerId),
            //     globals: false
            // });
            // return context;
        }
    };
});
