import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const AuthForm = ({ isLogin = false, isSignup = false }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();
  const { saveToken } = useContext(AuthContext);

  const handleEmail = (event) => setEmail(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);
  const handleUsername = (event) => setUsername(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const reqBody = { email, password };

    if (!isLogin) {
      reqBody.username = username;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/${isLogin ? "login" : "signup"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reqBody),
        }
      );
      if (response.status === 400) {
        const parsed = await response.json();
        console.log(parsed);
      }
      if (response.status === 201) {
        navigate("/login");
      }
      if (response.status === 200) {
        const parsed = await response.json();
        console.log(parsed);
        saveToken(parsed.authToken);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="w-full max-w-sm mx-auto bg-white p-8 shadow-md rounded-md" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold mb-6">{isLogin ? "Hei!" : "Create an Account"}</h1>

      {!isLogin && (
        <div className="mb-4">
          <input
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="username-input"
            type="text"
            required
            value={username}
            onChange={handleUsername}
            placeholder="Username"
          />
        </div>
      )}
      
      <div className="mb-4">
        <input
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="email-input"
          type="email"
          required
          value={email}
          onChange={handleEmail}
          placeholder="Email"
        />
      </div>

      <div className="mb-6">
        <input
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="password-input"
          type="password"
          required
          value={password}
          onChange={handlePassword}
          placeholder="Password"
        />
      </div>

      <button
        className="w-full bg-blue-500 text-white rounded-md p-2 font-bold hover:bg-blue-600 transition-colors"
        type="submit"
      >
        {isLogin ? "Login" : "Signup"}
      </button>

      {isLogin ? (
        <p className="mt-4 text-center">
          <Link className="text-blue-500 hover:underline" to="/signup">Create an account</Link>
        </p>
      ) : (
        <p className="mt-4 text-center">
          Already have an account? <Link className="text-blue-500 hover:underline" to="/login">Login</Link>
        </p>
      )}
    </form>
  );
};

export default AuthForm;
