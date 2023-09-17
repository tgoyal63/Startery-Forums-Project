import React, { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Landing = () => {
  const navigate = useNavigate();
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async () => {
    const response = await axios.post(
      "https://startery-project-backend.onrender.com/auth/register",
      {
        username: username,
        email: email,
        password: password,
        name: name,
      }
    );

    if (response.data.statusCode === 201) {
      window.alert("Registered Successfully");
    } else {
      window.alert("Unable to register");
    }
  };

  const handleLogin = async () => {
    const response = await axios.post(
      "https://startery-project-backend.onrender.com/auth/login",
      {
        username: username,
        password: password,
      }
    );

    localStorage.setItem("token", response.data.data.token);

    if (response.data.statusCode === 200) {
      window.alert("Login Success");
      navigate("/forumPg");
    } else {
      window.alert("Unable to login");
    }
  };

  return (
    <div>
      {<Navbar />}
      <div className=" bg-zinc-50">
        <div className="grid grid-cols-2 h-[800px] ">
          <div className="mt-40">
            <h1 className="text-4xl text-left ml-16 ">Startery Forum</h1>
            <p className="text-left ml-16 mt-2 text-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              posuere sodales feugiat. Suspendisse sit amet tincidunt ipsum.
              Integer quis euismod turpis. Suspendisse scelerisque nisl nec mi
              lobortis, et egestas erat facilisis.
            </p>
            <button
              className=" mt-20 text-2xl mr-96 pr-40 bg-white text-black px-8 py-3 rounded-xl shadow-[5px_5px_1px_0px_rgb(238,108,87),0px_2px_4px_1px_rgb(226,83,110),0px_2px_4px_1px_rgb(147,38,130)] "
              onClick={() => setShowModal1(true)}
            >
              Register
            </button>
          </div>
          {showModal1 ? (
            <>
              <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                      <h3 className="text-3xl font=semibold">Sign Up</h3>
                      <button
                        className="bg-transparent border-0 text-black float-right"
                        onClick={() => setShowModal1(false)}
                      >
                        <span className="text-black opacity-7 h-6 w-6 text-xl block py-0 rounded-full">
                          x
                        </span>
                      </button>
                    </div>
                    <div className="relative p-6 flex-auto">
                      <div className=" px-8 pt-6 pb-8 w-full">
                        <label className="block text-black text-md font-semibold mb-1 text-left">
                          Username
                        </label>

                        <input
                          className="shadow appearance-none border rounded w-full h-8 py-2 px-1 text-black mt-2"
                          onChange={(e) => {
                            setUsername(e.target.value);
                          }}
                        />
                        <label className="block text-black text-md font-semibold mb-1 text-left mt-4">
                          Name
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full h-8 py-2 px-1 text-black mt-2"
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                        <label
                          className="block text-black text-md font-semibold mb-1 text-left mt-4"
                          type="email"
                          id="email"
                          placeholder="abc@gmail.com"
                          required
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          className=" shadow appearance-none border rounded w-full h-8 py-2 px-1 text-black mt-2"
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                        <label className="block text-black text-md font-semibold mb-1 text-left mt-4">
                          Password
                        </label>
                        <input
                          type="password"
                          className="shadow appearance-none border rounded w-full h-8 py-2 px-1 text-black mt-2"
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-black background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        onClick={() => {
                          setShowModal2(true);
                          setShowModal1(false);
                        }}
                      >
                        Already have an account?Log in
                      </button>
                      <button
                        className="text-black bg-white a font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        onClick={() => {
                          handleRegister();
                          setShowModal1(false);
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}

          {showModal2 ? (
            <>
              <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                      <h3 className="text-3xl font=semibold">Log in</h3>
                      <button
                        className="bg-transparent border-0 text-black float-right"
                        onClick={() => setShowModal2(false)}
                      >
                        <span className="text-black opacity-7 h-6 w-6 text-xl block py-0 rounded-full">
                          x
                        </span>
                      </button>
                    </div>
                    <div className="relative p-6 flex-auto">
                      <div className=" px-8 pt-6 pb-8 w-full">
                        <label className="block text-black text-md font-semibold mb-1 text-left">
                          Username
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full h-8 py-2 px-1 text-black mt-2"
                          onChange={(e) => {
                            setUsername(e.target.value);
                          }}
                        />

                        <label className="block text-black text-md font-semibold mb-1 text-left mt-4">
                          Password
                        </label>
                        <input
                          type="password"
                          className="shadow appearance-none border rounded w-full h-8 py-2 px-1 text-black mt-2"
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-black bg-white  font-bold uppercase text-sm px-6 py-3 rounded border border-2 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        onClick={() => {
                          handleLogin();
                          setShowModal2(false);
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Landing;
