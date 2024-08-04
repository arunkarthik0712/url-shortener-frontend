import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");
  const { token } = useParams();
  const [Back, setBack] = useState("");

  const onChange = (e) => setPassword(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      toast.error("Passwords do not match", {
        theme: "colored",
      });
      return;
    }
    if (password.length < 8 || !/\W/.test(password)) {
      toast.error(
        "Password must be at least 8 characters long and contain at least one special character",
        {
          theme: "colored",
        }
      );
      return;
    }
    try {
      const res = await axiosInstance.put(`/api/auth/reset-password/${token}`, {
        password,
      });
      toast.success(res.data.message, {
        theme: "colored",
      });
      setPassword("");
      setBack(
        <p className="mt-3 text-center">
          <Link to="/login" className="card-link ">
            Back to login
          </Link>
        </p>
      );
    } catch (err) {
      toast.error(err.response.data.message, {
        theme: "colored",
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-md-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Reset Password</h3>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label htmlFor="password">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Confrim New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="cpassword"
                    name="cpassword"
                    value={cpassword}
                    onChange={(e) => setcPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Reset Password
                </button>
              </form>
              {Back}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
