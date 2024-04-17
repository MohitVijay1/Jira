import { RouterProvider } from "react-router-dom";
import Route from "./Route";
import "./App.css";
const App = () => {
  return (
    <div>
      <RouterProvider router={Route} />
    </div>
  );
};
export default App;
