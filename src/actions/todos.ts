'use server'

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export async function fetchUserTodos(userId: number): Promise<Todo[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');

  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }

  const todos = await response.json() as Todo[];
  
  // Filter todos for the specific user and take only first 5
  return todos
    .filter(todo => todo.userId === userId)
    .slice(0, 5);
} 