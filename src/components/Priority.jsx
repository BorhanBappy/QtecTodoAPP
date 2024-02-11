import { useState } from "react";
import TodoItem from "./TodoItem";

// eslint-disable-next-line react/prop-types
export default function Priority({ Todo }) {
  const [filterPriority, setFilterPriority] = useState("all"); // State to track the selected priority filter
  // Filter todos based on selected priority
//   console.log(Todo);
  // eslint-disable-next-line react/prop-types
  const filteredTodos = Todo.filter((todo) => {
    if (filterPriority === "all") return true; // Show all todos if no filter is selected
    return todo.priority === filterPriority;
  });

  // Function to handle priority filter change
  const handlePriorityFilterChange = (e) => {
    setFilterPriority(e.target.value);
  };
//   console.log(filteredTodos);
  return (
    <div>
      <select
        className="border border-black/10 rounded-r-lg px-3 outline-none bg-green-900 py-1.5"
        onChange={handlePriorityFilterChange}
        value={filterPriority}
      >
        <option value="all">All Priorities</option>
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>

      <div className="flex flex-wrap gap-y-3">
        {/* Loop and Add TodoItem here for incomplete tasks */}
        {filteredTodos.map((todo) => (
          <div key={todo.id} className="w-full">
            <TodoItem todo={todo} />
          </div>
        ))}
      </div>
    </div>
  );
}
