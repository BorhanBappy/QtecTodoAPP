# Task: Todo List App


## Uses Tools and Technology
* React
* Tailwind
* clsx (This used for conditional styling that can easy to color management)
  
## Context Section
* Import two file createContext, useContext.
* Here Context API is used in this project to manage the state related to todos in a centralized manner and make it accessible to all components that need it, without the need to pass props down through multiple levels of the component tree.
## TodoFrom
* Here basic from that have that have two property one input another priority. then Add Button.
* addTodo there are three property that are
  
```javascript
const add = (e) => {
    e.preventDefault();

    if (!todo) return;

    // Add todo with priority
    addTodo({ todo, priority, completed: false });
    
    // Reset input fields
    setTodo("");
    setPriority("low");
  };
```
## TodoItem 
### Description
The TodoItem component represents an individual todo item within a todo list. It offers functionality to toggle the completion status of the todo, edit the todo message, and delete the todo.

### Props
* todo: An object representing the todo item. It should have the following structure:
* id: Unique identifier for the todo item.
* todo: String containing the todo message.
* completed: Boolean indicating the completion status of the todo.
* priority: String indicating the priority level of the todo. Possible values are "low", "medium", or "high".

