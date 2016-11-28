define(function () {
    'use strict';
    if (typeof window !== 'undefined') {
        return {
            client: true,
            server: false
        };
    }
    if (typeof global !== 'undefined') {
        return {
            client: false,
            server: true
        };
    }
});
