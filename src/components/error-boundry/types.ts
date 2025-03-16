export interface Props {
  children: React.ReactNode;
}

export interface State {
  hasError: boolean;
  error: Error | null;
}