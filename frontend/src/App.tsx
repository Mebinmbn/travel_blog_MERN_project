import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import OtpVerification from "./pages/OtpVarification";
import Profile from "./pages/Profile";
import CreateBlog from "./pages/CreateBlog";
import Blog from "./pages/Blog";
import MyBlogs from "./pages/MyBlogs";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Signup />} />
          <Route path="/otp" element={<OtpVerification />} />
          <Route
            path="/profile"
            element={<ProtectedRoute children={<Profile />} />}
          />
          <Route
            path="/create"
            element={<ProtectedRoute children={<CreateBlog />} />}
          />
          <Route
            path="/blog"
            element={<ProtectedRoute children={<Blog />} />}
          />
          <Route
            path="/user/blogs"
            element={<ProtectedRoute children={<MyBlogs />} />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
