import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext';

function TodoForm() {
    const [todo, setTodo] = useState("")
    const {addTodo} = useTodo()
        const [error, setError] = useState('');

    const add = (e) => {
      e.preventDefault()

    
          const trimmedTodo = todo.trim();

        if (!trimmedTodo) {
            setError('Todo cannot be empty.');
            return;
        }
      addTodo({ todo, completed: false})
      setTodo("")
    setError('');
    }

  return (
      <form onSubmit={add}  className="flex ">
       

      
          <input
              type="text"
              placeholder="Write Todo..."
              className={`w-full border ${error ? 'border-red-500' : 'border-black/10'} rounded-l-lg px-4 py-2 outline-none duration-150 bg-white/20`}
              value={todo}
              onChange={(e) =>{ setTodo(e.target.value);
                setError('');
              }}
          />
          <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
              Add
          </button>
           {error && <span className="text-red-500 text-sm px-5">{error}</span>}    
              
      </form>
  );
}

export default TodoForm;