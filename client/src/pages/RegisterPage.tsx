import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { InputText } from "../components/InputText";
import { ModalAlert } from "../components/ModalAlert";

export const RegisterPage = () => {
  const [name, setName] = useState<string>("");
  const [surname, setsurname] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [registerSuccess, setRegisterSuccess] = useState<boolean>(false);
  const [registerUnsuccess, setRegisterUnsuccess] = useState<boolean>(false);

  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("/registration", {
        name,
        surname,
        email,
        password,
      });
      setRegisterSuccess(true);
    } catch (error) {
      setRegisterUnsuccess(true);
    }
  };

  return (
    <div className="grow flex items-center justify-around flex-col mt-8">
      <h2 className="text-3xl text-center">Registration</h2>
      <form className="max-w-md mx-auto mt-4" onSubmit={registerUser}>
        <InputText
          label="Your name"
          value={name}
          setValue={setName}
          placeholder="John"
        />
        <InputText
          label="Your surname"
          value={surname}
          setValue={setsurname}
          placeholder="Doe"
        />
        <InputText
          label="Your email"
          value={email}
          setValue={setEmail}
          placeholder="your@email.co"
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
        <button className="primary">Register</button>
        <div className="text-center py-2 text-gray-600">
          Already a member?
          <Link to={"/login"} className="text-black pl-2 font-semibold">
            Login
          </Link>
        </div>
        {registerSuccess && (
          <ModalAlert
            type="success"
            message="Success! Your register was completed."
          />
        )}
        {registerUnsuccess && (
          <ModalAlert type="error" message="Error! Registration went wrong." />
        )}
      </form>
    </div>
  );
};
