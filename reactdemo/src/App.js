import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Restaurant from "./Components/Restaurant/Restaurant";
import RestaurantAbout from "./Components/RestaunatAbout/RestaurantAbout";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Restaurant />} />
          <Route path="/about/:id" element={<RestaurantAbout />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
