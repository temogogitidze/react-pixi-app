import { Application } from "@pixi/react";
import { useRef } from "react";

import { usePreload } from "./hooks/usePreload";
import Level from "./game/scene/Level";
import Car from "./game/entities/Car";
import styles from "./app.module.css";

export default function App() {
    const parentRef = useRef<HTMLDivElement>(null);
    const preload = usePreload();

    return (
        <div ref={parentRef} className={styles.stage}>
            {preload.status === "loading" && (
                <div className={styles.overlay}>Loading…</div>
            )}

            {preload.status === "error" && (
                <div className={styles.overlay}>
                    <div className={styles.error}>
                        Asset load failed. Check console for details.
                    </div>
                </div>
            )}

            <Application
                resizeTo={parentRef}
                backgroundColor={0x505059}
                backgroundAlpha={1}
                resolution={window.devicePixelRatio || 1}
                autoDensity
                antialias
            >
                {preload.status === "ready" && (
                    <Level>
                        <Car />
                    </Level>
                )}
            </Application>
        </div>
    );
}
