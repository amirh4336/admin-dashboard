export type State = {
  language: string;
  theme: string,
  showSidebar: boolean
};

type Action =
  | { type: "CHANGE_LANGUAGE"; payload: string }
  | { type: "CHANGE_THEME"; payload: string }
  | { type: "TOGGLE_SIDEBAR" };

const appReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "CHANGE_LANGUAGE": {
      return {
        ...state,
        language: action.payload,
      };
    }
    case "CHANGE_THEME": {
      return {
        ...state,
        theme: action.payload,
      };
    }
    case "TOGGLE_SIDEBAR": {
      return {
        ...state,
        showSidebar: !state.showSidebar,
      };
    }
  }

  return state;
};

export default appReducer;
