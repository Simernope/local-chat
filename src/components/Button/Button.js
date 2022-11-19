import styles from './Button.module.scss'

const Button = ({status, text}) => {
    return (
        <div className={`
                                ${styles.button} 
                                ${status === 'disabled' && styles.button_disabled}
                                
                                `}>
            {text}
        </div>
    )
}

export default Button