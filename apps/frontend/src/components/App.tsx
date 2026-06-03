import "../css/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "../pages/Profile";
import Feed from "../pages/Feed";
import Navbar from "./Navbar";
import PostForm from "../pages/PostForm";
import PostContent from "../pages/PostContent";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import AllUsers from "../pages/AllUsers";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-post" element={<PostForm />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/login/callback" element={<Home />} />
        <Route path="/post/:postId" element={<PostContent />} />
        <Route path="/users" element={<AllUsers />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
