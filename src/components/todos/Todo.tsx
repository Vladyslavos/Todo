import React from "react";
import TodoList from "../todolist/TodoList";
import "./todo.css";
import { useFunctions } from "../../hooks/useFunctions";
import { motion } from "framer-motion";
import { textAnimation } from "../../features/TextAnimation";

export default function Todo() {
  const {
    isEditMode,
    value,
    handleChange,
    inputRef,
    handlePress,
    addTodo,
    todos,
    removeTodo,
    toggleTodo,
    editTodo,
  } = useFunctions();

  return (
    <motion.div
      className="todos"
      initial="hidden"
      whileInView="visible"
      custom={1}
      variants={textAnimation}
      viewport={{ once: true }}
    >
      <div className="todos-wrapper">
        <h2>Todos({todos.length})</h2>
        <hr />
        <div className="input-bar">
          <input
            type={"text"}
            disabled={isEditMode}
            placeholder={"Enter todo here"}
            value={value}
            onChange={handleChange}
            ref={inputRef}
            onKeyPress={handlePress}
          />
          <button onClick={addTodo} className={"submit"}>
            Submit
          </button>
        </div>
        <TodoList
          items={todos}
          removeTodo={removeTodo}
          toggleTodo={toggleTodo}
          editTodo={editTodo}
        />
      </div>
    </motion.div>
  );
}
