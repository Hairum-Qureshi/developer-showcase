import "../css/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import Feed from "../pages/Feed";
import Navbar from "./Navbar";
import PostForm from "../pages/PostForm";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/new-post" element={<PostForm />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/login/callback" element={<Home />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
