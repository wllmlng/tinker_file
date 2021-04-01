import React, { useState, createContext } from "react";

import CounterDisplay from "../context/counter-display";
import CounterButtons from "../context/counter-buttons";
// Create Context Object
export const CounterContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const CounterContextProvider = props => {
  const [count, setCount] = useState(0);

  return (
    <CounterContext.Provider value={[count, setCount]}>
      {console.log('PROPS',props)}
      {props.children}
      <CounterDisplay />
        <CounterButtons />
    </CounterContext.Provider>
  );
};