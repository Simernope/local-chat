import styles from './App.module.scss';
import Form from "./components/Form/Form";


function App() {
    return (
        <div className={styles.container}>
            <Form title={'Локальный чат'}/>
        </div>
    )
}

export default App;
