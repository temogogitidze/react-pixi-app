import "../pixi/setup/extend";

import { Application } from "@pixi/react";
import { useRef } from "react";

import Level from "./scene/Level";
import Car from "./entities/Car";

import styles from "./game.module.css";

const Game = () => {
    const parentRef = useRef(null);

    return (
        <div ref={parentRef} className={styles.stage}>
            <Application
                resizeTo={parentRef}
                backgroundColor={0x505059}
                backgroundAlpha={1}
                resolution={window.devicePixelRatio || 1}
                autoDensity
                antialias
            >
                <Level>
                    <Car />
                </Level>
            </Application>
        </div>
    );
};

export default Game;
