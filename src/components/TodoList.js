import React, {memo} from 'react'
import Todo from './Todo'

const TodoList = memo (props => {
    const {todolist, isCheckedAll, checkAllTodos} = props;
    
    return(
        <section className="main">
            <input className="toggle-all" type="checkbox" checked={isCheckedAll}/>
            <label htmlFor="toggle-all" onClick={checkAllTodos}></label>
            <ul className="todo-list">
                { 
                    todolist.map((todo, index) => <Todo index={index} key={`todo${todo.id}`} {...{todo}} {...props} />)
                }
            </ul>
        </section>
    )
})

export default TodoList;