import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AuthProvider from "./context/AuthProvider";
import RenderedRoutes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RenderedRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
