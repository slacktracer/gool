define([
    'modules/singleton/physics'
], function (
    physics
) {
    var
        simulation;
    simulation = physics();
    simulation.add(physics.integrator('metre-per-second-squared-verlet', {
        drag: 0.005,
        metre: 100
    }));
    // simulation.add(physics.behavior('constant-acceleration', {
    //     acc: {
    //         x: 0,
    //         y: 9
    //     }
    // }));
    simulation.add(physics.behavior('body-collision-detection'));
    simulation.add(physics.behavior('body-impulse-response'));
    // simulation.add(physics.behavior('sweep-prune'));
    // simulation.on('collisions:detected', function (a) {
    //     a.collisions[0].bodyA.___colliding = true;
    //     a.collisions[0].bodyB.___colliding = true;
    // });
    return simulation;
});
