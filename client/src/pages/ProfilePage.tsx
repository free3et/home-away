import axios from "axios";
import { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { AccountNavigation } from "../components/AccountNavigation";
import { Loader } from "../components/Loader";
import { UserContext } from "../context/UserContext";
import { PlacePageEdit } from "./PlacePageEdit";

export const ProfilePage = () => {
  const { user, ready, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState<string | null>(null);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  const logout = async () => {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  };

  if (!ready) {
    return <Loader />;
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNavigation />
      {subpage === "profile" && (
        <div className="max-w-lg mx-auto">
          Logged in as
          <h3>Name: {user?.name}</h3>
          <h3>Surname: {user?.surname}</h3> <h3>Email: {user?.email}</h3>
          <br />
          <button className="primary max-w-xs mt-3" onClick={logout}>
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacePageEdit />}
    </div>
  );
};
