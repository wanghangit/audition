interface Window{
  requestIdleCallback: (Function, {timeout: number}) => void;
}