import { BrowserRouter, Routes, Route } from "react-router-dom";
import PassManager from "./view/passManagerView/passManagerView";
import "./App.css";
import Movie from "./view/movieView/movieView";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/*" element={<PassManager />} />
            <Route path="/" element={<PassManager />} />
            <Route path="/movie" element={<Movie />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
