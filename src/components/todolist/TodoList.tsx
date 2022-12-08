import React from "react";
import "./todolist.css";
import { Itodo } from "../../types/data";
import TodoItem from "../todoitem/TodoItem";

interface Iprops {
  items: Itodo[];
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  editTodo: (id: string, title: string) => void;
}

export default function ToDoList(props: Iprops) {
  const { items, removeTodo, toggleTodo, editTodo } = props;
  return (
    <div className="list">
      {items.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          removeTodo={removeTodo}
          toggleTodo={toggleTodo}
          editTodo={editTodo}
        />
      ))}
      {!items.length && (
        <p className="notification">Sorry, your todo list is empty.</p>
      )}
    </div>
  );
}
