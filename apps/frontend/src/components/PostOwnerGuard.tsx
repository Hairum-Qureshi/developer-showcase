import { useParams } from "react-router-dom";
import usePost from "../hooks/usePost";
import { useCurrentUser } from "../hooks/useCurrentUser";
import NotFound from "../pages/NotFound";

export default function PostOwnerGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { postId } = useParams();
  const { postData } = usePost();
  const { data: currUserData } = useCurrentUser();

  return !postId ||
    postData?.user.user_id.toString() !== currUserData?.user_id ? (
    <NotFound />
  ) : (
    <>{children}</>
  );
}
