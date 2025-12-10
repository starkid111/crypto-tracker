import { create } from "zustand";
interface Todos {
  id: number;
  text: string;
  done: boolean;
}

interface TodoStore {
  todos: Todos[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

const useTodoStore = create<TodoStore>((set , get) => {
  const addTodo = (text: string) => {
    const newTodo = { id: Date.now(), text, done: false };
    set((state) => ({
      todos: [...state.todos, newTodo],
    }));
  };

  const removeTodo = (id: number) => {
    set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) }));
  };

  const toggleTodo = (id: number) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      ),
    }));
  };

  return {
    todos: [],
    addTodo,
    removeTodo,
    toggleTodo,
  };
});
