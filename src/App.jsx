import { useState, useEffect } from 'react'
import {TodoProvider} from './contexts'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState("all");
const [sortOrder, setSortOrder] = useState("default");
  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev] )
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo )))

    
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    //console.log(id);
    setTodos((prev) => 
    prev.map((prevTodo) => 
      prevTodo.id === id ? { ...prevTodo, 
        completed: !prevTodo.completed } : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  
const filteredAndSortedTodos = todos
  .filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  })
  .sort((a, b) => {
    if (sortOrder === "asc") return a.todo.localeCompare(b.todo);
    if (sortOrder === "desc") return b.todo.localeCompare(a.todo);
    return 0;
  });


  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-[#345d9b] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-5 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-4">
                        Filter
    <select
      className="border-2 text-black px-2 py-1 rounded "
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      align="right"
    >
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="active">Active</option>
    </select>
  </div>

  <div  className='flex justify-between items-center mb-4'>
    Sort By
    <select
      className= " border-2 text-black px-5 py-1 rounded "
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
     
    >
      <option value="default">Default</option>
      <option value="asc">A-Z</option>
      <option value="desc">Z-A</option>
    </select>
  </div>

                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                      {filteredAndSortedTodos.map((todo) => (
  <div key={todo.id} className='w-full'>
    <TodoItem todo={todo} />
  </div>
))}
                    </div>
                </div>
            
    </TodoProvider>
  )
}

export default App