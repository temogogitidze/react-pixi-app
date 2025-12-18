import { useEffect, useState } from "react";

import { preloadCoreAssets } from "../pixi/assets/preload";

import type React from "react";

type BootState =
    | { status: "loading" }
    | { status: "ready"; Game: React.ComponentType };

export function useBootGame() {
    const [state, setState] = useState<BootState>({ status: "loading" });

    useEffect(() => {
        let aborted = false;

        (async () => {
            try {
                await preloadCoreAssets();
                const mod = await import("../game/Game");
                if (aborted) return;

                setState({ status: "ready", Game: mod.default });
            } catch (error) {
                if (aborted) return;
                console.log(error, "ERROR");
            }
        })();

        return () => {
            aborted = true;
        };
    }, []);

    return state;
}
