import { Application } from "@pixi/react";
import { useMemo, useRef } from "react";
import { usePreload } from "./hooks/usePreload";
import Level from "./game/scene/Level";
import Car from "./game/entities/Car";
import styles from "./app.module.css";

export default function App() {
    const parentRef = useRef<HTMLDivElement>(null);
    const preload = usePreload();

    const overlay = useMemo(() => {
        if (preload.status === "loading") return "Loading…";
        if (preload.status === "error")
            return "Asset load failed. Check console.";
        return null;
    }, [preload.status]);

    return (
        <div ref={parentRef} className={styles.stage}>
            {overlay && <div className={styles.overlay}>{overlay}</div>}

            <Application
                resizeTo={parentRef}
                backgroundColor={0x505059}
                backgroundAlpha={1}
                resolution={window.devicePixelRatio || 1}
                autoDensity
                antialias
            >
                {preload.status === "ready" ? (
                    <Level>
                        <Car />
                    </Level>
                ) : null}
            </Application>
        </div>
    );
}
