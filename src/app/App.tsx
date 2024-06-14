import "./App.css";
import { Header } from "@/widgets/header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

export default App;
