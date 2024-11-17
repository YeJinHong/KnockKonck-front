import "./App.css";
import { useReducer, createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Notfound from "./pages/Notfound";

function subsReducer(state, action) {
  let nextState;
  switch (action.type) {
    case "INIT":
      return action.data;
    case "ADD":
      {
        nextState = [action.data, ...state];
      }
      break;
    case "DELETE":
      {
        nextState = state.filter(
          (sub) =>
            String(sub.bizesNumber) !== String(action.data.bizesNumber) ||
            String(sub.itemNumber) !== String(action.data.itemNumber)
        );
      }
      break;
    default:
      return state;
  }
  localStorage.setItem("subs", JSON.stringify(nextState));
  return nextState;
}

export const ItemStateContext = createContext();
export const ItemDispatchContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [subsData, subsDispatch] = useReducer(subsReducer, {});

  useEffect(() => {
    // ex) subs : [{bizesNumber: 1064404, itemNumber: 5596982}, {bizesNumber: 1064404, itemNumber: 5596983}]
    const storedSubsData = localStorage.getItem("subs");
    if (!storedSubsData) {
      setIsLoading(false);
      return;
    }
    const parsedSubsData = JSON.parse(storedSubsData);
    if (!Array.isArray(parsedSubsData)) {
      setIsLoading(false);
      return;
    }

    subsDispatch({
      type: "INIT",
      data: parsedSubsData,
    });

    setIsLoading(false);
  }, []);

  const onAddSubData = (bizesNumber, itemNumber) => {
    subsDispatch({
      type: "ADD",
      data: {
        bizesNumber,
        itemNumber,
      },
    });
  };

  const onDeleteSubData = (bizesNumber, itemNumber) => {
    subsDispatch({
      type: "DELETE",
      data: {
        bizesNumber,
        itemNumber,
      },
    });
  };

  if (isLoading) {
    return <div>데이터 로딩 중입니다.</div>;
  }

  return (
    <>
      <ItemStateContext.Provider value={{ subsData }}>
        <ItemDispatchContext.Provider
          value={{
            onAddSubData,
            onDeleteSubData,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </ItemDispatchContext.Provider>
      </ItemStateContext.Provider>
    </>
  );
}

export default App;
