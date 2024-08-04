import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";

const UrlList = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const { data } = await axiosInstance.get("/api/urls/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (data && Array.isArray(data.urls)) {
          setUrls(data.urls);
        } else {
          setUrls([]);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching URLs", {
          theme: "colored",
        });
      }
    };

    fetchUrls();
  }, []);

  return (
    <div className="container-fluid mt-4 mb-3">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">All Created URLs</h2>
          <table className="table table-bordered table-striped table-responsive-sm">
            <thead>
              <tr>
                <th>Short URL</th>
                <th>Long URL</th>
                <th>Click Count</th>
              </tr>
            </thead>
            <tbody>
              {urls.map((url) => (
                <tr key={url._id}>
                  <td>
                    <a
                      href={url.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-link"
                    >
                      {`url-shortener/${url.urlCode}`}
                    </a>
                  </td>
                  <td>{url.longUrl}</td>
                  <td>{url.clicks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UrlList;
