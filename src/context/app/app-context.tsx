import { createContext, useReducer } from "react";


const AppContext = createContext();

const InititalState  = {
  language : localStorage.getItem("language") || "fa"
}


const AppProvider = ({children}) => {
  const [state , dispatch] = useReducer(appReducer , InititalState)
}