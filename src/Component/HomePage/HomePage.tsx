import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

function HomePage() {
  return (
    <div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default HomePage;
