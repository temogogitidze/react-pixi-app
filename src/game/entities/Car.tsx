import { useEffect, useRef, useState } from "react";
import { Assets, type Texture } from "pixi.js";
import { useTick } from "@pixi/react";
import p2 from "p2";

import { ASSET_KEYS } from "../../pixi/assets/manifest";
import { useControls } from "../../hooks/useControls";

const Car = () => {
    const [pos, setPos] = useState({ x: 0, y: 0, rotation: 0 });
    const texture = Assets.get<Texture>(ASSET_KEYS.car);

    const world = useRef(new p2.World({ gravity: [0, 0] }));
    const carBody = useRef<p2.Body | null>(null);

    const { getControlsDirection } = useControls();

    const PHYS = {
        width: 100,
        height: 40,
        mass: 3,
        engine: 900,
        wheel: 100,
        brake: -700,
        grip: { drift: 0.3, normal: 3, lateral: 4.5 },
        drag: { factor: 0.3, max: 1000 },
        drift: { factor: 0.3, min: 300 },
        steer: 35 * (Math.PI / 180),
        step: 1 / 60,
    };

    useEffect(() => {
        const car = new p2.Body({ mass: PHYS.mass, position: [200, 200] });
        car.addShape(new p2.Box({ width: PHYS.width, height: PHYS.height }));
        world.current.addBody(car);

        carBody.current = car;

        return () => world.current.removeBody(car);
    }, []);

    useTick((_ticker) => {
        const delta =
            typeof _ticker === "number"
                ? Math.min(_ticker, 0.016)
                : Math.min(_ticker.deltaMS / 1000, 0.016);

        if (!carBody.current) return;
        const car = carBody.current;

        const { pressedKeys } = getControlsDirection();
        const isUp = pressedKeys.includes("UP");
        const isDown = pressedKeys.includes("DOWN");
        const isLeft = pressedKeys.includes("LEFT");
        const isRight = pressedKeys.includes("RIGHT");

        //vectors
        const forward: [number, number] = [
            Math.cos(car.angle),
            Math.sin(car.angle),
        ];
        const right: [number, number] = [-forward[1], forward[0]];
        const vel = car.velocity;

        //input
        const steerInput = (isRight ? 1 : 0) - (isLeft ? 1 : 0);
        const targetSteer = steerInput * PHYS.steer;

        //force
        let engine = 0;
        if (isUp) engine = PHYS.engine;
        else if (isDown) engine = PHYS.brake;
        if (engine) car.applyForce([forward[0] * engine, forward[1] * engine]);

        //steering
        const fwdSpeed = p2.vec2.dot(vel, forward);
        if (steerInput !== 0 && Math.abs(fwdSpeed) > 0.1) {
            const turnRadius =
                PHYS.wheel / Math.tan(Math.abs(targetSteer) || 0.0001);

            car.angularVelocity = (fwdSpeed / turnRadius) * targetSteer;
        } else {
            car.angularVelocity *= 0.9;
        }

        //drift
        const speed = p2.vec2.length(vel);
        const isDrifting =
            engine > 0 &&
            steerInput !== 0 &&
            speed > PHYS.drift.min &&
            speed / PHYS.drag.max > PHYS.drift.factor;

        //lateral
        const lat = p2.vec2.dot(vel, right);
        const grip = isDrifting
            ? PHYS.grip.drift * (1 + speed / PHYS.drag.max)
            : PHYS.grip.normal;
        car.applyForce([
            -right[0] * lat * PHYS.grip.lateral * grip,
            -right[1] * lat * PHYS.grip.lateral * grip,
        ]);

        //drag
        if (!engine) {
            car.applyForce([
                -forward[0] * fwdSpeed * PHYS.drag.factor,
                -forward[1] * fwdSpeed * PHYS.drag.factor,
            ]);
        }

        world.current.step(PHYS.step, delta);
        setPos({
            x: car.position[0],
            y: car.position[1],
            rotation: car.angle,
        });
    });

    return (
        <pixiSprite
            texture={texture}
            {...pos}
            anchor={0.5}
            rotation={pos.rotation + Math.PI / 2}
        />
    );
};

export default Car;
