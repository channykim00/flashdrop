import { HashRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";

import Home from "@/pages/Home";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
