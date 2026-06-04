import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "../pages/Profile";
import Feed from "../pages/Feed";
import PostForm from "../pages/PostForm";
import PostContent from "../pages/PostContent";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import AllUsers from "../pages/AllUsers";
import NavbarLayout from "./NavbarLayout";
import "../css/index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NavbarLayout />}>
          <Route path="/new-post" element={<PostForm />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/post/:postId" element={<PostContent />} />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/login/callback" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
