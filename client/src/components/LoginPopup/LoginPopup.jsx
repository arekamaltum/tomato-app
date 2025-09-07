import React, { useState, useContext } from "react";
import "./LoginPopup.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("SignUp");
  const { url, setToken } = useContext(StoreContext);

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    ...(currState === "SignUp" && {
      name: Yup.string().required("Name is required"),
    }),
  });

  return (
    <div className="login-popup">
      <div className="login-popup-container">
        <button className="close-btn" onClick={() => setShowLogin(false)}>
          ✖
        </button>

        <h2>{currState === "SignUp" ? "Create Account" : "Welcome Back"}</h2>

        <Formik
          enableReinitialize
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              let newUrl = url;
              if (currState === "Login") {
                newUrl += "/api/user/login";
              } else {
                newUrl += "/api/user/register";
              }

              const response = await axios.post(newUrl, values);

              if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                resetForm();
                setShowLogin(false);
              } else {
                alert(response.data.message);
              }
            } catch (error) {
              console.error("Error:", error);
              alert("Something went wrong");
            }
          }}
        >
          {() => (
            <Form className="login-form">
              {currState === "SignUp" && (
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <Field type="text" id="name" name="name" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="error"
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>

              <button type="submit" className="submit-btn">
                {currState === "SignUp" ? "Sign Up" : "Login"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="toggle-text">
          {currState === "SignUp" ? (
            <>
              Already have an account?{" "}
              <span onClick={() => setCurrState("Login")}>Login</span>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <span onClick={() => setCurrState("SignUp")}>Sign Up</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default LoginPopup;
