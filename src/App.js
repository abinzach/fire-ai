import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./ProtectedRoute";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Toaster } from "sonner";

function App() {
  return (
    <AuthContextProvider>
      <Provider store={store}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Toaster richColors/>

      </Provider>
    </AuthContextProvider>
  );
}

export default App;
