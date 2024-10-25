import styles from './HeaderTask.module.css'

interface HeaderTaskProps {
    countTaskDone: number,
    maxTask: number
}

export function HeaderTask({countTaskDone, maxTask}: HeaderTaskProps){
    return(
        <section className={styles.headerTasks}>
            <div>
                <strong>Tarefas Criadas <span> {maxTask} </span></strong>
            </div>

            <div>
                <strong className={styles.concludedTask}> Conluídas <span> { countTaskDone } de {maxTask} </span></strong>
            </div>
        </section>
    )
}