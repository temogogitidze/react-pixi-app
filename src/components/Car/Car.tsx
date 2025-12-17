import { useMemo } from "react";
import { useTexture } from "../../hooks/useTexture";
import carUrl from "../../assets/RACECAR.png";

export function Car() {
    const texture = useTexture(carUrl);

    // keep props stable
    const props = useMemo(
        () => ({
            x: 200,
            y: 200,
            rotation: Math.PI / 2,
            anchor: 0.5 as const,
            scale: 1,
        }),
        []
    );

    if (!texture) return null;

    return <pixiSprite texture={texture} {...props} />;
}
