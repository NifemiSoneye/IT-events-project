import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import { ClipLoader } from "react-spinners";
import useLocalStorage from "../../hook/useLocalStorage";
const Login = () => {
  const variants: Variants = {
    hidden: { opacity: 0, y: 50 }, // start off invisible & below
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  const ref = useRef(null);
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLDivElement>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = useLocalStorage<boolean>("persist", false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const USERNAME_REGEX = /^[A-Za-z][A-Za-z0-9_]{2,23}$/;
  const PASSWORD_REGEX = /^[A-Za-z0-9!@#$%]{8,24}$/;
  const validUsername = USERNAME_REGEX.test(username);
  const validPassword = PASSWORD_REGEX.test(password);
  let canSubmit;
  if (validUsername && validPassword) {
    canSubmit = true;
  } else {
    canSubmit = false;
  }

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef?.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/admin");
    } catch (err: any) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef?.current?.focus();
    }
  };

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const handlePwdInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);
  return (
    <div className="min-h-screen pb-[1rem]  bg-[#303030] text-white pt-[10vh]">
      <motion.div
        ref={ref}
        variants={variants}
        initial="hidden"
        animate="visible"
      >
        <div className="px-[1rem] flex justify-center items-center flex-col">
          <p
            ref={errRef}
            className={
              errMsg
                ? "inline-block bg-transparent text-[#b22222] p-1 mb-[0.5em] my-5 font-bold text-2xl"
                : "hidden"
            }
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className="text-center text-3xl font-bold mt-5">Login</h1>
          <p className="font-semibold text-xl my-[1rem]">
            Enter Login Details Below:
          </p>
          <p className="text-gray-400 text-sm mb-4">
            Demo credentials — Username:{" "}
            <span className="text-green-400 font-semibold">admin</span> /
            Password:{" "}
            <span className="text-green-400 font-semibold">admin123</span>
          </p>
          <form
            onSubmit={handleSubmit}
            className="bg-[#515151] p-[1rem] border border-transparent rounded-xl lg:w-[35vw] w-full md:w-[70vw]"
          >
            <div className="flex flex-col mb-[1rem]">
              <div className="flex justify-between">
                <label
                  htmlFor="username"
                  className="text-white text-xl font-semibold"
                >
                  Username
                </label>
                <p
                  className={
                    !validUsername && username.length > 0
                      ? "text-red-500 text-md font-semibold"
                      : "hidden"
                  }
                >
                  Enter a valid username
                </p>
              </div>
              <input
                id="username"
                type="text"
                required
                placeholder="Your username"
                autoComplete="off"
                className={`bg-gray-200 p-[0.5rem] rounded-lg border outline-none focus:outline-none text-black font-semibold ${
                  !validUsername && username.length > 0
                    ? "border-red-600 focus:border-red-600"
                    : username.length === 0
                      ? "border-transparent"
                      : "border-green-500"
                }`}
                value={username}
                onChange={handleUserInput}
              />
            </div>
            <div className="flex flex-col mb-[1rem]">
              <div className="flex justify-between">
                <label
                  htmlFor="Password"
                  className="text-white text-xl font-semibold"
                >
                  Password
                </label>
                <p
                  className={
                    !validPassword && password.length > 0
                      ? "text-red-500 text-md font-semibold"
                      : "hidden"
                  }
                >
                  Enter a valid Password
                </p>
              </div>
              <input
                id="password"
                type="password"
                required
                placeholder="your password"
                autoComplete="off"
                className={`bg-gray-200 p-[0.5rem] rounded-lg border outline-none focus:outline-none text-black font-semibold ${
                  !validPassword && password.length > 0
                    ? "border-red-600 focus:border-red-600"
                    : password.length === 0
                      ? "border-transparent"
                      : "border-green-500"
                }`}
                value={password}
                onChange={handlePwdInput}
              />
            </div>

            <button
              className={
                canSubmit
                  ? "bg-green-500 flex items-center justify-center text-[1.5rem] border border-transparent rounded-3xl p-[0.5rem] mb-[1rem] w-[100%]"
                  : "bg-green-300 flex items-center justify-center text-[1.5rem] border border-transparent rounded-3xl p-[0.5rem] mb-[1rem] w-[100%]"
              }
              disabled={!canSubmit}
            >
              {isLoading ? <ClipLoader color={"#FFF"} /> : "Login"}
            </button>
            <label htmlFor="persist" className="flex items-center w-full gap-2">
              <input
                type="checkbox"
                className="w-[24px] h-[24px]"
                id="persist"
                onChange={handleToggle}
                checked={persist}
              />
              Trust This Device
            </label>
          </form>
          <footer className="my-3 font-semibold">
            <Link to="/">Back to Home</Link>
          </footer>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
