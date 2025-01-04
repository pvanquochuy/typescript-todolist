import express, { Request, Response } from "express";
import { todo } from "node:test";

const app = express();
const port = 5000;

app.use(express.json());

// todo data mock
let todos: { id: number; task: string; completed: boolean }[] = [
  { id: 1, task: "Learn React", completed: false },
  { id: 2, task: "Learn Node.js", completed: true },
];

// api
app.get("/todos", (req: Request, res: Response) => {
  res.json(todos);
});

app.post("/todos", (req: Request, res: Response) => {
  const { task } = req.body;
  const newTodo = { id: todos.length + 1, task, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Toggle completion status
app.patch("/todos/:id", (req: Request, res: Response) => {
  const todoId = parseInt(req.params.id);
  const todo = todos.find((t) => t.id == todoId);
  if (todo) {
    todo.completed = !todo.completed;
    res.json(todo);
  } else {
    res.status(404).json({ message: "todo not found" });
  }
});

app.delete("/todos/:id", (req: Request, res: Response) => {
  const todoId = parseInt(req.params.id);
  todos = todos.filter((t) => t.id !== todoId);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
