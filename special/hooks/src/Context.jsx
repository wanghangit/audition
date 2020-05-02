import React from "react";
import { themeContext } from './context'
import Child from './components/context/Child.jsx'

const { Provider } = themeContext
function App() {
  return (
    <Provider value="dark">
      <div className="App">
        <Child />
      </div>
    </Provider>
  );
}

export default App;
