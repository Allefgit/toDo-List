import { Check, Trash } from "phosphor-react";
import styles from './Task.module.css'

interface TaskProps {
    id: string
    content: string,
    isItDone: boolean,
    onDeleteTask: (id: string) => void,
    onHandleToggleTask: (id:string, value:boolean) => void
}

export function Task({id, content, isItDone, onDeleteTask, onHandleToggleTask}: TaskProps){

    const checkboxChecked = isItDone ? styles['checkbox-checked'] : styles['checkbox-not-checked'] 
    const paragraphChecked = isItDone ? styles['paragraph-checked'] : styles[''] 


    function deleteTask(){
        onDeleteTask(id)
    }

    function handleToggleTask(){
        onHandleToggleTask(id, !isItDone )
    }

    return(
        <div className={styles.taskDiv}>
            <div>
                <label htmlFor="checkbox" onClick={handleToggleTask}>
                    <input 
                        readOnly 
                        type="checkbox" 
                        checked={isItDone}
                    />
                    <span className={`${styles.checkbox} ${checkboxChecked}`}>
                        {isItDone && <Check size={12}/>}
                    </span>
                    <p className={`${styles.paragraph} ${paragraphChecked}`}>
                        {content}
                    </p>
                </label>
            </div>

            <button 
                onClick={deleteTask}
            >
                <Trash size={20}/>
            </button>
        </div>
    )
}