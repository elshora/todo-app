import React from "react";

export const TodoList = ({ todos, updateTodoStatus, delelteTodo }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li
          className={`todo-item ${todo.completed ? "completed" : ""}`}
          key={todo.id}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => {
              updateTodoStatus(todo.id);
            }}
          />
          <span>{todo.title}</span>
          <button onClick={() => delelteTodo(todo.id)}>x</button>
        </li>
      ))}
    </ul>
  );
};
