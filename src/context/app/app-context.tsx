import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import appReducer, { State } from "./app-reducer";
import { useTranslation } from "react-i18next";

interface IContextType extends State {
  changeLanguage: (language: string) => void;
  changeTheme: (theme: string) => void;
  toggleSidebar: () => void;
}

const AppContext = createContext<IContextType | null>(null);

const InititalState: State = {
  language: localStorage.getItem("language") || "fa",
  theme: localStorage.getItem("theme") ||"light",
  showSidebar: false,
};

interface IAppProviderProps {
  children: ReactNode;
}

const AppProvider: FC<IAppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, InititalState);

  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    dispatch({ type: "CHANGE_LANGUAGE", payload: language });
  };

  const changeTheme = (theme: string) => {
    dispatch({ type: "CHANGE_THEME", payload: theme });
  };

  const toggleSidebar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" });
  };

  useEffect(() => {
    i18n.changeLanguage(state.language);
    localStorage.setItem("language", state.language);
    document.body.dataset.direction = state.language === "fa" ? "rtl" : "ltr";
    document.body.dataset.sidebarPosition =
      state.language === "fa" ? "right" : "left";
  }, [state.language, i18n]);

  return (
    <AppContext.Provider
      value={{ ...state, changeLanguage, changeTheme, toggleSidebar }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

// eslint-disable-next-line react-refresh/only-export-components
export { AppProvider, useAppContext };
