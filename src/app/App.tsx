import { useState } from "react";
import "./App.css";
import { Header } from "@/widgets/header";
import { Outlet } from "react-router-dom";

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
