import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import { Header } from "@/widgets/header";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <Header isLogin={isLogin} onLogin={setIsLogin} />
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

export default App;
