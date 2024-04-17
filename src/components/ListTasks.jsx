import { useState } from 'react'
import classes from '../style/listTasks.module.scss'


function Task({note, id, deleteTask}) {
  const [check, setCheck] = useState(false)


  return (
    <div key={id}>
      <li className={classes.listItem}>
        <button className={classes.listButton} onClick={() => setCheck(!check)}><div className={ check ? classes.listButtonCheck : ''}></div></button>
        <div className={classes.blockTaskAndDelete}>
          <p className={classes.task} style={check ? {textDecoration: 'line-through', color: 'rgb(133, 133, 133)'} : {}}>{note.note}</p>
          <button className={classes.delete} onClick={() => deleteTask(id)}></button>
        </div>
      </li>
      <hr className={classes.line}/>
    </div>
  )
}


export default function ListTasks() {
  const [content, setContent] = useState('')
  const [dropMenu, setDropMenu] = useState(false)
  const [id, setId] = useState(3)
  const [notes, setNotes] = useState([
    {
      id: 1,
      note: 'Задача'
    },
    {
      id: 2,
      note: 'Задача'
    }
  ])

  function deleteTask(idTask) {
    setNotes(notes.filter( note => note.id !== idTask))
  }

  const addTask = (event) => {

    if(event.key === 'Enter') {
      const task = document.getElementById('task')
      if(task.value.length === 0) {
        return
      }
      const addnote = {
        id: id,
        note: task.value
      }
      setId(id => id += 1)
      console.log(id)
      console.log(task.value)
      notes.push(addnote)
      setNotes(notes)
      setContent(task.value)
      console.log(notes)
      task.value = ''
    }
    
  }
  

  return(
    <div className={classes.wrapper}>
      <h1 className={classes.label}>todos</h1>
      <div className={classes.tasks}>
        <div className={classes.addTask}>
          <button onClick={() => setDropMenu(!dropMenu)} className={classes.buttonAddTask}><div className={ dropMenu ? classes.arrowDown : classes.arrowUp}></div></button>
          <input type="text" placeholder='Введите задачу' onKeyDownCapture={addTask} className={classes.inputAddTask} id='task'/>
        </div>
        <ul className={ dropMenu ? classes.list : classes.listNone} id='list'>
          <hr className={classes.line}/>
          { notes.map( (note) => <Task key={note.id} note={note} id={note.id} deleteTask={deleteTask}/>)}
        </ul> 
      </div>
    </div>
  )
}