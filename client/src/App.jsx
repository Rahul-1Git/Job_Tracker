import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import Job from "./pages/home/job/Job";
import AddJob from "./pages/home/add-job/AddJob";
import RootLayout from "./pages/home/RootLayout";
import Update from "./pages/home/update/Update";
import RefreshHandler from "./pages/RefreshHandler";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  console.log("isAuthenticated", isAuthenticated);
  return (
    <>
      <RefreshHandler setAuthenticated={setAuthenticated} />
      <Routes>
        <Route
          path="/login"
          element={<Login setAuthenticated={setAuthenticated} />}
        />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/" element={<PrivateRoute element={<RootLayout />} />}>
          <Route index element={<Job />} />
          <Route path="add" element={<AddJob />} />
          <Route path="update/:id" element={<Update />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
