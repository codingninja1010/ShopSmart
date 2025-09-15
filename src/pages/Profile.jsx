import React, { useState } from "react";
import { Navbar, Footer } from "../components";
import { Helmet } from "react-helmet-async";

const getUser = () => {
  // Prefer unified 'currentUser' written by Login/Register; fallback to legacy 'user'
  const current = localStorage.getItem("currentUser");
  if (current) return JSON.parse(current);
  const legacy = localStorage.getItem("user");
  if (legacy) {
    try {
      const parsed = JSON.parse(legacy);
      return { name: parsed.name || "", email: parsed.email || "" };
    } catch {
      return { name: "", email: "" };
    }
  }
  return { name: "", email: "" };
};

const Profile = () => {
  const [user] = useState(getUser());
  const [showChange, setShowChange] = useState(false);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [msg, setMsg] = useState("");

  const handleChangePassword = (e) => {
    e.preventDefault();
    // In demo mode we can't truly validate without a backend.
    // Try to read legacy 'user' to keep compatibility; otherwise allow update feedback only.
    const storedRaw = localStorage.getItem("user");
    const stored = storedRaw ? JSON.parse(storedRaw) : null;
    if (!oldPass || !newPass || !confirmPass) {
      setMsg("All fields are required.");
      return;
    }
    if (stored && oldPass !== stored.password) {
      setMsg("Old password is incorrect.");
      return;
    }
    if (newPass !== confirmPass) {
      setMsg("New passwords do not match.");
      return;
    }
    if (stored) {
      localStorage.setItem(
        "user",
        JSON.stringify({ ...stored, password: newPass })
      );
    }
    // Also sync password in users array for login consistency
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const idx = users.findIndex(u => u.email === (stored?.email || user.email));
      if (idx !== -1) {
        users[idx] = { ...users[idx], password: newPass };
        localStorage.setItem('users', JSON.stringify(users));
      }
    } catch (_) {}
    setMsg("Password changed successfully!");
    setOldPass("");
    setNewPass("");
    setConfirmPass("");
    setShowChange(false);
  };

  return (
    <>
      <Helmet>
        <title>Profile • ShopSmart</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="description" content="View and edit your ShopSmart profile and manage your account settings." />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Profile • ShopSmart" />
        <meta property="og:description" content="View and edit your ShopSmart profile and manage your account settings." />
        <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : 'https://example.com/profile'} />
        <meta property="og:image" content={process.env.PUBLIC_URL + '/assets/ShopSmart.PNG'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Profile • ShopSmart" />
        <meta name="twitter:description" content="View and edit your ShopSmart profile and manage your account settings." />
        <meta name="twitter:image" content={process.env.PUBLIC_URL + '/assets/ShopSmart.PNG'} />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : 'https://example.com/profile'} />
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Profile • ShopSmart', url: typeof window !== 'undefined' ? window.location.href : 'https://example.com/profile', description: 'View and edit your ShopSmart profile and manage your account settings.' })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [ { '@type': 'ListItem', position: 1, name: 'Home', item: typeof window !== 'undefined' ? window.location.origin + '/' : 'https://example.com/' }, { '@type': 'ListItem', position: 2, name: 'Profile', item: typeof window !== 'undefined' ? window.location.href : 'https://example.com/profile' } ] })}
        </script>
      </Helmet>
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
