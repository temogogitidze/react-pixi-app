import { useBootGame } from "./hooks/useBootGame";
import Loader from "./components/Loader";
import styles from "./app.module.css";

export default function App() {
    const boot = useBootGame();

    return (
        <div className={styles.app}>
            {boot.status === "loading" ? <Loader /> : <boot.Game />}
        </div>
    );
}
