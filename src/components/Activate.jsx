import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";

const ActivateSpinner = () => (
  <div
    className="spinner-border spinner-border-md activate-spinner"
    role="status"
  >
    <span className="visually-hidden"></span>
  </div>
);

const Activate = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const activateAccount = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/api/auth/activate/${token}`);
        toast.success(response.data.message, {
          theme: "colored",
        });
        navigate("/login");
      } catch (error) {
        toast.error("Activation failed. Please try again.", {
          theme: "colored",
        });
      } finally {
        setLoading(false);
      }
    };

    activateAccount();
  }, [token, history]);

  return (
    <div className="activate">
      <ActivateSpinner />
      <h2 className="activate-head">Activating your account...</h2>
    </div>
  );
};

export default Activate;
