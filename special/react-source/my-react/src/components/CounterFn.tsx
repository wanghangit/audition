import React from "../lib/React";
import { RObject } from "../lib/type";

const ADD = "ADD";
function reducer(state: any, action: any) {
  switch (action.type) {
    case ADD:
      return { count: state.count + 1 };
    default:
      return state;
  }
}
export default function (props: RObject) {
  const [counterState, dispatch] = React.useReducer(reducer, { count: 1 });
  return (
    <div>
      <span>{counterState.count}</span>
      <button
        onClick={() => {
          dispatch({ type: ADD });
        }}
      >
        add
      </button>
    </div>
  );
}
