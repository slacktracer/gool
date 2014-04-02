define([
    'modules/context'
], function (
    Context
) {
    'use strict';
    var
        prototype;
    prototype = {
        metre: 50,
        dragOn: true,
        rho: 1.22,
        dots: {
            howMany: 40,
            planes: [
                function foreground() {
                    return {
                        delta: Context.random(0, 0.1),
                        glimmer: Context.random(0.4, 0.6),
                        radius: Context.random(0.08, 0.1)
                    };
                },
                function middleground() {
                    return {
                        delta: Context.random(0.1, 0.3),
                        glimmer: Context.random(0.3, 0.5),
                        radius: Context.random(0.06, 0.08)
                    };
                },
                function background() {
                    return {
                        delta: Context.random(0.3, 0.6),
                        glimmer: Context.random(0.2, 0.4),
                        radius: Context.random(0.04, 0.06)
                    };
                }
            ]
        },
        zones: [{
            name: 'goolZone',
            length: 45,
            backgroundColour: 'hsla(190, 50%, 30%, 0.2)',
            dotColour: function dotColour(glimmer) {
                return 'hsla(190, 50%, 50%, ' + glimmer + ')';
            }
        }, {
            name: 'safeZone',
            length: 105,
            backgroundColour: 'hsla(130, 50%, 30%, 0.2)',
            dotColour: function dotColour(glimmer) {
                return 'hsla(130, 50%, 50%, ' + glimmer + ')';
            }
        }, {
            name: 'dangerZone',
            length: 135,
            backgroundColour: 'hsla(0, 50%, 30%, 0.2)',
            dotColour: function dotColour(glimmer) {
                return 'hsla(360, 50%, 50%, ' + glimmer + ')';
            }
        }, {
            name: 'outerZone',
            length: 250,
            backgroundColour: 'hsla(0, 50%, 30%, 0.2)',
            dotColour: function dotColour(glimmer) {
                return 'hsla(360, 50%, 50%, ' + glimmer + ')';
            }
        }],
        limbo: {
            name: 'limbo',
            backgroundColour: 'hsla(360, 100%, 100%, 1)'
        },
        getZoneByPosition: function getZoneByPosition(positionLength) {
            var i,
                length;
            for (i = 0, length = this.zones.length; i < length; i += 1) {
                if (positionLength < this.zones[i].length) {
                    return this.zones[i];
                }
            }
            return this.limbo;
        },
        getZoneByName: function getZoneByName(zoneName) {
            var i,
                length;
            for (i = 0, length = this.zones.length; i < length; i += 1) {
                if (zoneName === this.zones[i].name) {
                    return this.zones[i];
                }
            }
            return this.limbo;
        }
    };
    return {
        create: function create() {
            var world = Object.create(prototype);
            return world;
        }
    };
});
