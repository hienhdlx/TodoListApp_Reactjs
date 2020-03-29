import React, { PureComponent } from 'react';

//components
import TodoList from './components/TodoList';
import Header from './components/Header';
import Footer from './components/Footer';


//css
import './components/Todo.css';
import './App.css';

const isNotCheckAll = (todo = []) => {
  var ischeck = todo.filter(todo => !todo.isCompleted)
  if(!ischeck.length){
    return false
  } else{
    return true
  }
}

const filterByStatus = (todo = [], status = '', id = '') => {
  switch(status){
    case 'ACTIVE':
      return todo.filter(x => !x.isCompleted)
    case 'COMPLETED':
      return todo.filter(x => x.isCompleted)
    case 'REMOVE':
      return todo.filter(x => x.id !== id)
    default:
      return todo
  }
}

class App extends PureComponent {
  state={
    todolist:
    [
      {
        id:1,
        text: 'to do 1',
        isCompleted: true
      },
      {
        id:2,
        text: 'to do 2',
        isCompleted: false
      },
      {
        id:3,
        text: 'to do 3',
        isCompleted: false
      }
    ], 
    todoEditingId: '',
    isCheckedAll: false,
    status: 'All'
  }

  checkAllTodos = () => {
    const {todolist, isCheckedAll} = this.state
    this.setState(x => ({
      todolist: todolist.map(item => ({...item, isCompleted: !isCheckedAll})),
      isCheckedAll: !x.isCheckedAll
    }))
  }

  componentWillMount() {
    this.setState({
      isCheckedAll: !isNotCheckAll(this.state.todolist)
    })
  }
  
  addTodo = (todo = {}) => {
    this.setState(preState => ({
      todolist: [...preState.todolist, todo]
    }))
  }

  getTodoEditingId =  (id = '') => {
    this.setState({
      todoEditingId: id
    })
  }



  oneEditTodo = (todo = {}, index = -1) => {
    if(index >= 0){
      debugger
      const {todolist: list} = this.state
      list.splice(index, 1, todo)
      this.setState({
        todolist: list,
        todoEditingId: ''
      })
    }
  }

  markCompleted = (id = '') => {
    const {todolist} = this.state
    const updatelist = todolist.map(todo => todo.id === id ? ({...todo, isCompleted: !todo.isCompleted}): todo)
    this.setState(preState => ({
      todolist: updatelist,
      isCheckedAll: !isNotCheckAll(updatelist)
    }))
  }

  setStatusFilter = (status = '') => {
    this.setState({
      status
    })
  }

  clearCompleted = () => {
    const {todolist} = this.state
    this.setState ({
      todolist: filterByStatus(todolist, 'ACTIVE')
    })
  }

  removeItemTodo = (id = '') => {
    const {todolist } = this.state
    this.setState({
      todolist: filterByStatus(todolist, 'REMOVE', id)
    })
  }

  render(){
    const {todolist , todoEditingId, isCheckedAll, status} = this.state;
    
    return (
      <div className="todoapp">
        <Header 
          addTodo={this.addTodo} 
          isCheckedAll={isCheckedAll}
        />
        <TodoList 
          todolist = {filterByStatus(todolist, status)}
          getTodoEditingId = {this.getTodoEditingId}
          todoEditingId={this.state.todoEditingId}
          oneEditTodo={this.oneEditTodo}
          markCompleted={this.markCompleted}
          isCheckedAll={isCheckedAll}
          checkAllTodos={this.checkAllTodos}
          removeItemTodo={this.removeItemTodo}
        />
        <Footer
          setStatusFilter={this.setStatusFilter}
          numberOfTodos={todolist.length}
          numberOfTodoLeft={filterByStatus(todolist, 'ACTIVE').length}
          clearCompleted={() =>this.setStatusFilter('ACTIVE')}
          status={status}
        />
      </div>
    )
  }
}

export default App;
