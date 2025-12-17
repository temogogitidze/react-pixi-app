import { useEffect, useState } from "react";
import { Assets, type Texture } from "pixi.js";

export function useTexture(src?: string) {
    const [texture, setTexture] = useState<Texture | null>(null);

    useEffect(() => {
        let alive = true;

        if (!src) return;

        (async () => {
            try {
                const tex = await Assets.load<Texture>(src);
                if (alive) setTexture(tex);
            } catch (e) {
                if (alive) setTexture(null);
                console.error("Failed to load texture:", src, e);
            }
        })();

        return () => {
            alive = false;
        };
    }, [src]);

    return texture;
}
