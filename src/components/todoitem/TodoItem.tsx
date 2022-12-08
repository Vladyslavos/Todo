import React from "react";
import { Itodo } from "../../types/data";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./todoitem.css";
import { motion } from "framer-motion";
import { textAnimation } from "../../features/TextAnimation";

interface ITodoItem extends Itodo {
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  editTodo: (id: string, title: string) => void;
}

export default function TodoItem(props: ITodoItem) {
  const { complete, title, id, removeTodo, toggleTodo, editTodo } = props;
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [editValue, setEditValue] = React.useState<string>("");

  return (
    <motion.div
      className="todo-item"
      initial="hidden"
      whileInView="visible"
      custom={2}
      variants={textAnimation}
      viewport={{ once: true }}
    >
      <div>
        <input
          type={"checkbox"}
          checked={complete}
          onChange={() => toggleTodo(id)}
        />
        {isEdit ? (
          <>
            <input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
            <button
              onClick={() => (setIsEdit(false), editTodo(id, editValue))}
              className={"accept"}
            >
              ✅
            </button>
            <button onClick={() => setIsEdit(false)} className={"cancel"}>
              ❌
            </button>
          </>
        ) : (
          <span onDoubleClick={() => (setIsEdit(true), setEditValue(title))}>
            {title}
          </span>
        )}
      </div>
      <div className="btns">
        <button
          onClick={() => (setIsEdit(true), setEditValue(title))}
          className="edit"
        >
          <BiEdit />
        </button>
        <button
          onClick={() => {
            removeTodo(id);
          }}
          className={"delete"}
        >
          <RiDeleteBin6Line />
        </button>
      </div>
    </motion.div>
  );
}
