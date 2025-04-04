import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import NavBar from "./components/NavBar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "../stores/useUserStore";
import { useEffect } from "react";

const App = () => {
  const { user, checkAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]" />
        </div>
      </div>
      <div className="relative z-50 pt-20">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/signin"
            element={!user ? <Signin /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          ></Route>
        </Routes>
      </div>
      <Toaster />
    </div>
  );
};

export default App;
