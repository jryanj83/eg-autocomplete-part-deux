import { useState } from "react";
import { Box, Typography, Button, List, ListItem, ListItemText, ListItemIcon, Checkbox, CircularProgress } from "@mui/material";
import { fetchUserTodos, type Todo } from "@/actions/todos";

import type { TodoListProps } from "./types";

export const TodoList = ({ userId }: TodoListProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  // Using server actions to fetch data
  const handleFetchTodos = async () => {
    setLoading(true);
    try {
      const userTodos = await fetchUserTodos(userId);
      setTodos(userTodos);
    } catch (error) {
      // Re-throw the error to be caught by the ErrorBoundary
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Button 
        variant="contained" 
        onClick={handleFetchTodos}
        disabled={loading}
        sx={{ mb: 2 }}
      >
        {loading ? 'Loading...' : 'Fetch User Todos'}
      </Button>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress size={24} />
        </Box>
      )}

      {todos.length > 0 && (
        <>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
            Todo List
          </Typography>
          <List>
            {todos.map((todo) => (
              <ListItem key={todo.id} disablePadding sx={{ }}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={todo.completed}
                    disableRipple
                    readOnly
                  />
                </ListItemIcon>
                <ListItemText primary={todo.title} />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  );
}; 