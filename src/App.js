import './index.css'
import styles from './App.module.css'
import { useState } from 'react'

export const App = () => {
    const [value, setValue] = useState('')
    const [list, setList] = useState([])
    const [error, setError] = useState('')
    const [isValueValid, setIsValueValid] = useState(false)

    const onInputButtonClick = () => {
        const promptValue = prompt('Введите значение')
        if (promptValue.length < 3) {
            setError('Введенное значение должно содержать минимум 3 символа')
            setIsValueValid(false)
        } else {
            setValue(promptValue)
            setError('')
            setIsValueValid(true)
        }
    }
    const onAddButtonClick = () => {
        const id = Date.now()
        let date = new Date()
        date = date.toLocaleString('en-US', { hour12: false })
        setList((list) => [...list, { id, value, date }])
        setValue('')
        setIsValueValid(false)
    }

    return (
        <div className={styles.app}>
            <h1 className={styles['page-heading']}>Ввод значения</h1>
            <p className={styles['no-margin-text']}>
                Текущее значение <code>value</code>: "
                <output className={styles['current-value']}>{value}</output>"
            </p>
            {error !== '' ? <div className={styles.error}>{error}</div> : null}
            <div className={styles['buttons-container']}>
                <button className={styles.button} onClick={onInputButtonClick}>
                    Ввести новое
                </button>
                <button
                    className={styles.button}
                    disabled={!isValueValid}
                    onClick={onAddButtonClick}
                >
                    Добавить в список
                </button>
            </div>
            <div className={styles['list-container']}>
                <h2 className={styles['list-heading']}>Список:</h2>
                {list.length === 0 ? (
                    <p className={styles['no-margin-text']}>
                        Нет добавленных элементов
                    </p>
                ) : null}
                <ul className={styles.list}>
                    {list.map(({ id, value, date }) => (
                        <li className={styles['list-item']} key={id}>
                            {value + ' '}
                            Время добавления:
                            {' ' + date}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
