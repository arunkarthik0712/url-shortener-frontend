import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../api/axiosInstance";

const URLShortener = () => {
  const [longUrl, setLongUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.post(
        "/api/urls/shorten",
        { longUrl },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(`Short URL created`, {
        theme: "colored",
      });
      setLongUrl("");
    } catch (err) {
      toast.error("Failed to shorten URL", {
        theme: "colored",
      });
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Create URL</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Long URL</label>
                  <input
                    type="url"
                    className="form-control"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Shorten
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default URLShortener;
