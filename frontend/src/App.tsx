import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import OtpVerification from "./pages/OtpVarification";
import Profile from "./pages/Profile";
import CreateBlog from "./pages/CreateBlog";
import Blog from "./pages/Blog";
import MyBlogs from "./pages/MyBlogs";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Signup />} />
          <Route path="/otp" element={<OtpVerification />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/user/blogs" element={<MyBlogs />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
