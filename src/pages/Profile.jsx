import React, { useState } from "react";
import { Navbar, Footer } from "../components";
import { useNavigate } from "react-router-dom";

const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : { name: "", email: "" };
};

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getUser());
  const [showChange, setShowChange] = useState(false);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [msg, setMsg] = useState("");

  const handleChangePassword = (e) => {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem("user"));
    if (!oldPass || !newPass || !confirmPass) {
      setMsg("All fields are required.");
      return;
    }
    if (oldPass !== stored.password) {
      setMsg("Old password is incorrect.");
      return;
    }
    if (newPass !== confirmPass) {
      setMsg("New passwords do not match.");
      return;
    }
    localStorage.setItem(
      "user",
      JSON.stringify({ ...stored, password: newPass })
    );
    setMsg("Password changed successfully!");
    setOldPass("");
    setNewPass("");
    setConfirmPass("");
    setShowChange(false);
  };

  return (
    <>
      <Navbar />
      <div className="container my-5 py-4">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5 col-sm-10 mx-auto card p-4 shadow-lg">
            <h2 className="text-center mb-4">Profile</h2>
            <div className="mb-3">
              <strong>Username:</strong> <span>{user.name}</span>
            </div>
            <div className="mb-3">
              <strong>Email:</strong> <span>{user.email}</span>
            </div>
            <button
              className="btn btn-outline-dark mb-3"
              onClick={() => setShowChange((v) => !v)}
            >
              {showChange ? "Cancel" : "Change Password"}
            </button>
            {showChange && (
              <form onSubmit={handleChangePassword} className="mt-3">
                <div className="form-group mb-2">
                  <label htmlFor="oldPass">Old Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="oldPass"
                    value={oldPass}
                    onChange={(e) => setOldPass(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="newPass">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPass"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="confirmPass">Confirm New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPass"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                  />
                </div>
                {msg && <div className="alert alert-info py-2 my-2">{msg}</div>}
                <button className="btn btn-dark mt-2" type="submit">
                  Save Password
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
