define([
    'modules/entity/token'
], function (
    Token
) {
    'use strict';
    var
        tokens;
    tokens = [];
    tokens.cookBatch = function cookBatch(configurations) {
        var
            i,
            length;
        for (i = 0, length = configurations.length; i < length; i += 1) {
            this.push(Token.create(configurations[i]));
        }
        return this;
    }.bind(tokens);
    tokens.draw = function draw(context, metre) {
        var
            i,
            length;
        for (i = 0, length = this.length; i < length; i += 1) {
            this[i].draw(context, metre);
        }
    }.bind(tokens);
    tokens.update = function update(keys, dt, rho, mu, g) {
        var
            i,
            length;
        for (i = 0, length = this.length; i < length; i += 1) {
            this[i].update(keys, dt, rho, mu, g);
        }
    }.bind(tokens);
    return tokens;
});
