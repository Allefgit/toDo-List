

import Clipboard from '../assents/Clipboard.png'
import styles from './EmptyInfo.module.css'

export function EmptyInfo(){
    return(
        <div className={styles.emptyTask}>
            <img src={Clipboard} alt="" />
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <p>Crie tarefas e organize seus itens a fazer</p>
        </div>
    )
}