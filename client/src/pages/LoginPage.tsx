import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { InputText } from "../components/InputText";
import { ModalAlert } from "../components/ModalAlert";
import { UserContext } from "../context/UserContext";

export const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);

  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
  const [loginUnsuccess, setLoginUnsuccess] = useState<boolean>(false);

  const { setUser } = useContext(UserContext);

  const loginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", {
        email,
        password,
      });

      setUser(response.data);
      setRedirect(true);
      setLoginSuccess(true);
    } catch (error) {
      setLoginUnsuccess(true);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="my-14 grow flex items-center justify-around flex-col">
      <h2 className="text-3xl text-center">Login</h2>
      <form className="max-w-md mx-auto my-10" onSubmit={loginSubmit}>
        <InputText
          label="Your email"
          value={email}
          setValue={setEmail}
          placeholder="your@email.com"
        />
        <label htmlFor="pass" className="font-semibold">
          Your password
        </label>
        <input
          type="password"
          placeholder="password"
          value={password}
          name="pass"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="primary">Login</button>
        <div className="text-center py-2 mt-5 text-gray-600">
          Don't have an account yet?
          <Link to={"/registration"} className="text-black pl-2 font-semibold">
            Register now
          </Link>
        </div>
        {loginSuccess && (
          <ModalAlert type="success" message="Authorization successful" />
        )}
        {loginUnsuccess && (
          <ModalAlert
            type="error"
            message="Error! Authorization unsuccessful"
          />
        )}
      </form>
    </div>
  );
};
