import { Application, extend } from "@pixi/react";
import { Container, Graphics, Sprite } from "pixi.js";

import useDimensions from "./hooks/useDimensions";
import Level from "./components/Level/Level";
import { Car } from "./components/Car/Car";

extend({
    Container,
    Graphics,
    Sprite,
});

export default function App() {
    const { width, height } = useDimensions();

    return (
        <Application
            width={width}
            height={height}
            backgroundColor={0x505059}
            backgroundAlpha={1}
            resolution={window.devicePixelRatio || 1}
            autoDensity={true}
            antialias={true}
        >
            <Level>
                <Car />
            </Level>
        </Application>
    );
}
