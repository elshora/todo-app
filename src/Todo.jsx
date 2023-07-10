import React, { useEffect, useState } from "react";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import axios from "axios";
export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState();
  useEffect(() => {
    getTodos();
  }, []);
  const getTodos = async () => {
    setLoading(true);
    try {
      let res = await axios.get(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );
      if (res.request.status === 200) {
        setLoading(false);
        setTodos(res.data);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error", error);
    }
  };
  const addTodo = async (title) => {
    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        {
          title,
          completed: false,
        }
      );
      setTodos([...todos, res.data]);
    } catch (error) {
      console.log("error", error);
    }
  };
  const updateTodoStatus = async (id) => {
    try {
      const todo = todos.find((ele) => ele.id === id);
      await axios.put(`https://jsonplaceholder.typicode.com/todos${id}`, {
        ...todo,
        completed: !todo.completed,
      });
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, competed: !todo.competed } : todo
        )
      );
    } catch (error) {
      console.log("error", error);
    }
  };
  const delelteTodo = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="container">
      <h1>Todo App</h1>
      <TodoForm addTodo={addTodo} />

      {loading ? (
        <p className="loading">loading...</p>
      ) : (
        <TodoList
          todos={todos}
          updateTodoStatus={updateTodoStatus}
          delelteTodo={delelteTodo}
        />
      )}
    </div>
  );
}
