import { useBootGame } from "./hooks/useBootGame";
import styles from "./app.module.css";
import Loader from "./components/Loader";

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
