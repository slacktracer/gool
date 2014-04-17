define(function () {
    'use strict';
    var
        startScreenOnlyGridPrototype,
        infiniteGridPrototype,
        fixedSizeGridPrototype;
    startScreenOnlyGridPrototype = {
        draw: function draw(context, metre, zoom) {
            var
                squareSizeInPixels,
                relativeWidth,
                relativeHeight,
                lineWidth,
                whereToStart,
                whereToStop,
                tracer;
            squareSizeInPixels = this.squareSize * metre;
            relativeWidth = context.width / 2 / zoom;
            relativeHeight = context.height / 2 / zoom;
            lineWidth = 1;
            context.beginPath();
            context.lineWidth = lineWidth;
            whereToStart = relativeWidth % squareSizeInPixels - relativeWidth;
            whereToStop = relativeWidth;
            for (tracer = whereToStart; tracer < whereToStop; tracer += squareSizeInPixels) {
                context.moveTo(0.5 + tracer, -relativeHeight);
                context.lineTo(0.5 + tracer, relativeHeight);
            }
            whereToStart = relativeHeight % squareSizeInPixels - relativeHeight;
            whereToStop = relativeHeight;
            for (tracer = whereToStart; tracer < whereToStop; tracer += squareSizeInPixels) {
                context.moveTo(-relativeWidth, 0.5 + tracer);
                context.lineTo(relativeWidth, 0.5 + tracer);
            }
            context.strokeStyle = 'hsla(0, 0%, 70%, ' + this.opacity + ')';
            context.stroke();
        }
    };
    infiniteGridPrototype = {
        draw: function draw(context, metre, zoom, position) {
            var
                squareSizeInPixels,
                relativeWidth,
                relativeHeight,
                positionMinusRelativeWidth,
                positionMinusRelativeHeight,
                lineWidth,
                whereToStart,
                whereToStop,
                tracer;
            squareSizeInPixels = this.squareSize * metre;
            relativeWidth = context.width / 2 / zoom;
            relativeHeight = context.height / 2 / zoom;
            positionMinusRelativeWidth = position[0] - relativeWidth;
            positionMinusRelativeHeight = position[1] - relativeHeight;
            lineWidth = 1;
            context.beginPath();
            context.lineWidth = lineWidth;
            whereToStart = positionMinusRelativeWidth - positionMinusRelativeWidth % squareSizeInPixels;
            whereToStop = relativeWidth + position[0];
            for (tracer = whereToStart; tracer < whereToStop; tracer += squareSizeInPixels) {
                context.moveTo(0.5 + tracer, -relativeHeight + position[1]);
                context.lineTo(0.5 + tracer, relativeHeight + position[1]);
            }
            whereToStart = positionMinusRelativeHeight - positionMinusRelativeHeight % squareSizeInPixels;
            whereToStop = relativeHeight + position[1];
            for (tracer = whereToStart; tracer < whereToStop; tracer += squareSizeInPixels) {
                context.moveTo(-relativeWidth + position[0], 0.5 + tracer);
                context.lineTo(relativeWidth + position[0], 0.5 + tracer);
            }
            context.strokeStyle = 'hsla(0, 0%, 70%, ' + this.opacity + ')';
            context.stroke();
        }
    };
    fixedSizeGridPrototype = {
        draw: function draw(context, metre) {
            var
                squareSizeInPixels,
                width,
                height,
                lineWidth,
                whereToStart,
                whereToStop,
                tracer;
            squareSizeInPixels =  this.squareSize * metre;
            width = this.width;
            height = this.height;
            lineWidth = 1;
            context.beginPath();
            context.lineWidth = lineWidth;
            whereToStart = width % squareSizeInPixels - width;
            whereToStop = width + lineWidth;
            for (tracer = whereToStart; tracer < whereToStop; tracer += squareSizeInPixels) {
                context.moveTo(0.5 + tracer, -height);
                context.lineTo(0.5 + tracer, height);
            }
            whereToStart = height % squareSizeInPixels - height;
            whereToStop = height + lineWidth;
            for (tracer = whereToStart; tracer < whereToStop; tracer += squareSizeInPixels) {
                context.moveTo(-width, 0.5 + tracer);
                context.lineTo(width, 0.5 + tracer);
            }
            context.strokeStyle = 'hsla(0, 0%, 70%, ' + this.opacity + ')';
            context.stroke();
        }
    };
    return {
        create: function create(type, squareSize, opacity, size) {
            var
                grid;
            squareSize = squareSize || 5;
            opacity = opacity || 1;
            size = size || {
                width: 1000,
                height: 1000
            };
            switch (type) {
            case 'infinite':
                grid = Object.create(infiniteGridPrototype);
                break;
            case 'fixed size':
                grid = Object.create(fixedSizeGridPrototype);
                grid.width = size.width;
                grid.height = size.height;
                break;
            default:
                // 'start screen only'
                grid = Object.create(startScreenOnlyGridPrototype);
                break;
            }
            grid.squareSize = squareSize;
            grid.opacity = opacity;
            return grid;
        }
    };
});
