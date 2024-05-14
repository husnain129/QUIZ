import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/baseUrl";


const UserRegisterForm = () => {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [form, setForm] = useState({ username: "", email: "", password: "" });


  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
 const handleLogin = async (e) => {
  e.preventDefault();
  console.log(form);
  try {
    const response = await axios.post(`${BASE_URL}/user/register`, form);
    console.log(response.data);
    navigate("/login");
  }
  catch (error) {
    console.error("Error creating card:", error);
  }
};
  return (
    <>
    <section
      className="vh-100"
      style={{ backgroundColor: " #9A616D", height: "100vh" }}
    >
      <div
        style={{
          padding: "3rem",
          height: "100vh",
        }}
      >
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                  <form onSubmit={handleLogin}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i
                          className="fas fa-cubes fa-2x me-3"
                          style={{ color: "#ff6219" }}
                        ></i>
                        <span className="h1 fw-bold mb-0">Quiz</span>
                      </div>

                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Create new account
                      </h5>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <label className="form-label" for="form2Example17">
                          Username
                        </label>
                        <input
                          type="text"
                          name="username"
                          id="form2Example17"
                          className="form-control form-control-lg"
                          onChange={handleInputChange}
                        />
                      </div>
                      <div data-mdb-input-init className="form-outline mb-4">
                        <label className="form-label" for="form2Example17">
                          Email
                        </label>
                        <input
                          type="text"
                          name="email"
                          id="form2Example17"
                          className="form-control form-control-lg"
                          onChange={handleInputChange}
                        />
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <label className="form-label" for="form2Example27">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="form2Example27"
                          className="form-control form-control-lg"
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="pt-1 mb-4">
                        <button
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                          // onClick={handleLogin}
                        >
                          Register
                        </button>
                      </div>

                      <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        Already have an account?{" "}
                        <span
                          onClick={() => navigate("/login")}
                          style={{
                            color: "#393f81",
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                        >
                          Login here
                        </span>
                      </p>
                      <a href="#!" className="small text-muted">
                        Terms of use.
                      </a>
                      <a href="#!" className="small text-muted">
                        Privacy policy
                      </a>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default UserRegisterForm;
