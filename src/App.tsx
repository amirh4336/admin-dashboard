import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./core/i18n";
import { useAppContext } from "./context/app/app-context";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";


const newQC = new QueryClient();

function App() {
  const { theme } = useAppContext() || {};

  useEffect(() => {
    const head = document.head;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `css/${theme}.css`;
    head.appendChild(link);

    return () => {
      head.removeChild(link);
    };
  }, [theme]);

  return (
    <>
      <QueryClientProvider client={newQC}>
        <RouterProvider router={router} />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
