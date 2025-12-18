import { useBootGame } from "./hooks/useBootGame";
import Loader from "./components/Loader";

import styles from "./app.module.css";

export default function App() {
    const boot = useBootGame();

    if (boot.status === "loading") {
        return (
            <div className={styles.app}>
                <Loader />
            </div>
        );
    }

    const Game = boot.Game;

    return (
        <div className={styles.app}>
            <Game />
        </div>
    );
}
