"use client";
import Auth from "@/components/Auth";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { ApplicationLayout } from "@/components/ApplicationLayout";
import "@/app/globals.css";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
      error: (error) => console.error(error),
    });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    const content = window.prompt("Todo content");
    if (content) {
      client.models.Todo.create({ content });
    }
  }

  return (
    <>
      <Auth>
        <ApplicationLayout>
          <main>
            <h1 className="text-2xl font-bold mb-4">Networks</h1>
            <button
              onClick={createTodo}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              + network
            </button>
            <ul className="list-disc list-inside">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  onClick={() => deleteTodo(todo.id)}
                  className="mb-2 cursor-pointer hover:text-red-500"
                >
                  {todo.content}
                </li>
              ))}
            </ul>
          </main>
        </ApplicationLayout>
      </Auth>
    </>
  );
}
