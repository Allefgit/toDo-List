import { Task } from './components/Task.tsx'

import logoTodo from './assents/Logo.png'
import { PlusCircle } from 'phosphor-react'
import { v4 as uuidv4 } from 'uuid'

import styles from './App.module.css'
import './global.css'
import { ChangeEvent, useState } from 'react'
import { EmptyInfo } from './components/EmptyInfo.tsx'
import { HeaderTask } from './components/HeaderTask.tsx'

interface Task{
  id: string,
  content: string
  isItDone: boolean
}

export function App() {

  const localStorageTasks = localStorage.getItem('tasks') !== null ? JSON.parse(localStorage.getItem('tasks')!) : []

  const [tasks, setTasks] = useState<Task[]>(localStorageTasks)
  const [newTask, setNewTask] = useState('')

  function updateLocalStorate(value: Task[]){
    localStorage.setItem('tasks', JSON.stringify(value))
  }

  const countTaskDone = tasks.reduce((prevValue, item) =>{
     if(item.isItDone) {
      return prevValue + 1
     } 
     return prevValue
  }, 0)

  function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>){
    setNewTask(event.target.value)
  }

  function deleteTask(id: string){
    const tasksWithoutTheDeletedOne = tasks.filter(task => {
      return task.id !== id
    })

    setTasks(tasksWithoutTheDeletedOne)
    updateLocalStorate(tasksWithoutTheDeletedOne)
  }

  function handleToggleTask(id: string, value: boolean){
    const updatedTask = tasks.map(task =>{
      if(task.id === id){
        return {...task, isItDone: value}
      } else {
        return {...task}
      }
    })

    setTasks(updatedTask)
    updateLocalStorate(updatedTask)
  }

  function handleAddTask(){

    console.log(newTask)
    if(newTask == ''){
      return
    }

    const task = {
      id: uuidv4(),
      content: newTask,
      isItDone: false
    }

    setTasks([...tasks, task])
    updateLocalStorate([...tasks, task])

    setNewTask('')
  }

  return (
    <div className={styles.mainContent}>
        <header>
            <img src={logoTodo} alt="" />
        </header>

        <main className={styles.main}>
          <div className={styles.form}>
            <textarea 
              placeholder='Adicione uma nova tarefa'
              onChange={handleNewTaskChange}
              value={newTask}
              required
            />

            <button 
              onClick={handleAddTask}  
            >
              Criar <PlusCircle size={16} weight="bold"/>
            </button>
          </div>

          <div className={styles.content}>
              <HeaderTask 
                countTaskDone={countTaskDone}
                maxTask={tasks.length}
              />
              
              <section className={styles.contentTasks}>
              {
                tasks.length === 0 ? (
                  <EmptyInfo />
                  ) : (
                  <div className={styles.withTask}>
                    {
                    tasks.map(item => {
                      return (<Task
                        key={item.id}
                        id={item.id}
                        content={item.content}
                        isItDone={item.isItDone}
                        onDeleteTask={deleteTask}
                        onHandleToggleTask={handleToggleTask}
                      />)
                    })
                  }
                  </div>
                )
              }
              </section>
          </div>
        </main>
    </div>
  )
}
