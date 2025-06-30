import { HashRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";

import Home from "@/pages/Home";
import ReceiveFile from "@/pages/ReceiveFile";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/receiveFile"
            element={<ReceiveFile />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
