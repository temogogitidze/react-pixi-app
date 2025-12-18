import { useEffect, useState } from "react";
import { Assets, type Texture } from "pixi.js";

export function useTexture(key?: string) {
    const [texture, setTexture] = useState<Texture | null>(() => {
        if (!key) return null;
        return (Assets.cache.get(key) as Texture | null) ?? null;
    });

    useEffect(() => {
        let alive = true;

        if (!key) {
            queueMicrotask(() => {
                if (alive) setTexture(null);
            });
            return () => {
                alive = false;
            };
        }

        const cached = Assets.cache.get(key) as Texture | undefined;
        if (cached) {
            queueMicrotask(() => {
                if (alive) setTexture(cached);
            });
            return () => {
                alive = false;
            };
        }

        Assets.load<Texture>(key)
            .then((tex) => {
                if (alive) setTexture(tex);
            })
            .catch((e) => {
                if (alive) setTexture(null);
                console.error("Failed to load texture:", key, e);
            });

        return () => {
            alive = false;
        };
    }, [key]);

    return texture;
}
