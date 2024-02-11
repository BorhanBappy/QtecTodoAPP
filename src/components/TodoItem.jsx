import React, { useState } from "react";
import { useTodo } from "../contexts/TodoContext";
import { MdDelete } from "react-icons/md";
import { TfiWrite } from "react-icons/tfi";
import clsx from "clsx"; // Import clsx

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  // Define priority colors
  const priorityColors = {
    low: "text-green-500",
    medium: "text-yellow-500",
    high: "text-red-500",
  };

  return (
    <div
      className={clsx(
        "flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black",
        {
          "bg-white": todo.completed && !isTodoEditable, // White background for incomplete todos when not being edited
          "bg-black": isTodoEditable, // Gray background when being edited
        }
      )}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <input
        type="text"
        className={clsx(
          "border outline-none w-full bg-transparent rounded-lg",
          {
            "border-black/10 px-2": isTodoEditable,
            "border-transparent": !isTodoEditable,
            "line-through": todo.completed,
            [priorityColors[todo.priority]]: true,
          }
        )}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      {/* Edit, Save Button */}
      <button
        className={clsx(
          "inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        )}
        onClick={() => {
          if (todo.completed) return;

          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "📁" : <TfiWrite/>}
      </button>
      {/* Delete Todo Button */}
      <button
        className={clsx(
          "inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        )}
        onClick={() => deleteTodo(todo.id)}
      >
        <MdDelete />
      </button>
    </div>
  );
}

export default TodoItem;
