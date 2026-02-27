import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import CommonLayout from "./components/CommonLayout";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <CommonLayout>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </CommonLayout>
    </BrowserRouter>
  );
}

export default App;
