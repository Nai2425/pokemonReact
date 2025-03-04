import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./templates/Header";
import Pokemon from "./pages/Pokemon";

function App() {
  return (
    <>
      {/* Header appears on all pages */}
      <Header />

      {/* Page content changes based on the route */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:name" element={<Pokemon />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
