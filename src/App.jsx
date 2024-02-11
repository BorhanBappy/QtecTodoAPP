import { useState,useEffect } from "react";
import { TodoProvider } from "./contexts";
import { TodoForm, TodoItem } from "./components";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };
//Local Storage 
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  // Filter completed and incomplete todos
  const incompleteTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  // low: "text-green-500",
  // medium: "text-yellow-500",
  // high: "text-red-500",

  const lcolor = <button className=" bg-green-500 rounded-lg">Green</button>;
  const mcolor = <button className=" bg-yellow-500 rounded-lg">Green</button>;
  const hcolor = <button className=" bg-red-500 rounded-lg">Green</button>;

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Todo List App
          </h1>
          <div className="flex flex-col sm:flex-row  justify-between p-4">
            <h1>Low Priority: color-{lcolor}</h1>
            <h1>Medium Priority : color-{mcolor}</h1>
            <h1>High Priority: color-{hcolor}</h1>
          </div>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-col gap-6 justify-center md:flex-row ">
            <div className=" w-1/2">
              <h2 className="text-lg font-bold mb-2 text-center">
                Incomplete Tasks
              </h2>
              <div className="flex flex-wrap gap-y-3">
                {/* Loop and Add TodoItem here for incomplete tasks */}
                {incompleteTodos.map((todo) => (
                  <div key={todo.id} className="w-full">
                    <TodoItem todo={todo} />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-1/2">
              <h2 className="text-lg font-bold mb-2 text-center">
                Completed Tasks
              </h2>
              <div className="flex flex-wrap gap-y-3">
                {/* Loop and Add TodoItem here for completed tasks */}
                {completedTodos.map((todo) => (
                  <div key={todo.id} className="w-full">
                    <TodoItem todo={todo} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className=" flex justify-between p-4 text-2xl text-[#20A6DF]">
            <h1>Total Task {todos.length}</h1>
            <h1>Complete Task {completedTodos.length}</h1>
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
