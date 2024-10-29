"use strict";
var Engine = Matter.Engine, Render = Matter.Render, Runner = Matter.Runner, Bodies = Matter.Bodies, Composite = Matter.Composite;
var engine = Engine.create({
    gravity: { x: 0, y: 0 },
});
// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        height: window.innerHeight,
        width: window.innerWidth,
    },
});
// create  a ground
var ball = Bodies.circle(window.innerWidth / 2, window.innerHeight / 2, 20, {
    restitution: 0,
});
// left
let a = Bodies.rectangle(0, window.innerHeight / 2, 20, window.innerHeight, {
    isStatic: true,
    restitution: 0,
});
// top
let b = Bodies.rectangle(window.innerWidth / 2, 0, window.innerWidth, 20, {
    isStatic: true,
    restitution: 0,
});
// right
let c = Bodies.rectangle(window.innerWidth, window.innerHeight / 2, 20, window.innerHeight, {
    isStatic: true,
});
// bottom
let d = Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 20, {
    isStatic: true,
});
// add all of the bodies to the world
Composite.add(engine.world, [ball, a, b, c, d]);
// run the renderer
Render.run(render);
// create runner
var runner = Runner.create();
// run the engine
Runner.run(runner, engine);
window.addEventListener('deviceorientation', handleMotion, true);
let fx = 0, fy = 0, px = -1000, py = -1000;
function handleMotion(e) {
    if (!e.alpha) {
        return;
    }
    const N = 0.003;
    let y = e.beta / 1000, x = e.gamma / 1000;
    let _fx, _fy;
    _fx = x > 0 ? Math.min(N, x) : Math.max(-N, x);
    _fy = y > 0 ? Math.min(N, y) : Math.max(-N, y);
    if (px === _fx && py === _fy) {
        return;
    }
    px = _fx;
    py = _fy;
    fx = _fx;
    fy = _fy;
    // console.log(fx, fy)
    changeGravity();
}
let changeGravity = throttle(() => {
    engine.gravity.y = fy > 0 ? 1 : -1;
    engine.gravity.x = fx > 0 ? 1 : -1;
}, 100);
function throttle(cb, interval) {
    let prevTime = Date.now();
    return function (...args) {
        let currTime = Date.now();
        if (currTime - prevTime > interval) {
            // @ts-ignore
            cb.apply(this, args);
            prevTime = currTime;
        }
    };
}
