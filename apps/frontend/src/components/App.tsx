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
import ProtectedRoutesGuard from "./ProtectedRoutesGuard";
import Auth from "../pages/Auth";
import PostedTags from "../pages/PostedTags";
import PostOwnerGuard from "./PostOwnerGuard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NavbarLayout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/new-post"
            element={
              <ProtectedRoutesGuard>
                <PostForm />
              </ProtectedRoutesGuard>
            }
          />
          <Route
            path="/profile/:userId"
            element={
              <ProtectedRoutesGuard>
                <Profile />
              </ProtectedRoutesGuard>
            }
          />
          <Route path="/post/:postId" element={<PostContent />} />
          <Route
            path="/post/:postId/edit"
            element={
              <ProtectedRoutesGuard>
                <PostOwnerGuard>
                  <PostForm />
                </PostOwnerGuard>
              </ProtectedRoutesGuard>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoutesGuard>
                <AllUsers />
              </ProtectedRoutesGuard>
            }
          />
          <Route path="/feed" element={<Feed />} />
          <Route path="/tags" element={<PostedTags />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
        <Route path="/login/callback" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}
