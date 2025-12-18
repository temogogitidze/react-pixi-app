import { useEffect, useState } from "react";
import { preloadCoreAssets } from "../pixi/assets/preload";

type State =
    | { status: "loading" }
    | { status: "ready" }
    | { status: "error"; error: unknown };

export function usePreload() {
    const [state, setState] = useState<State>({ status: "loading" });

    useEffect(() => {
        let alive = true;

        preloadCoreAssets()
            .then(() => alive && setState({ status: "ready" }))
            .catch((error) => alive && setState({ status: "error", error }));

        return () => {
            alive = false;
        };
    }, []);

    return state;
}
