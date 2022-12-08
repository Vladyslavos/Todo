import React from "react";
import { nanoid } from "nanoid";
import { Itodo } from "../types/data";

export function useFunctions() {
  const [todos, setTodos] = React.useState<Itodo[]>([]);
  const [value, setValue] = React.useState<string>("");
  const [isEditMode, setIsEditMode] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handlePress: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const addTodo = () => {
    if (value.trim()) {
      setTodos([
        ...todos,
        {
          id: nanoid(),
          title: value,
          complete: false,
        },
      ]);
    }
    setValue("");
  };

  const removeTodo = (id: string): void => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: string): void => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          complete: !todo.complete,
        };
      })
    );
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    const data = localStorage.getItem("todos");
    if (typeof data === "string") {
      setTodos(JSON.parse(data));
    }
  }, []);
  React.useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const editTodo = (id: string, title: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, title } : todo)));
  };

  return {
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
  };
}
