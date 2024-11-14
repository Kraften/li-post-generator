import { createContext } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const onSent = async (prompt) => {
    await run(prompt);
  };

  onSent("what is js");
  const contextValue = {};

  return <Context.Provider value={"a"}>{props.children}</Context.Provider>;
};

export default ContextProvider;
