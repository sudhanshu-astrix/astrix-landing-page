"use client";

import { useEffect, useState } from "react";

interface ContactMessage {
  _id: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const correctUsername = "astrixadmin";
  const correctPassword = "secret123";

  useEffect(() => {
    const storedUser = localStorage.getItem("contacts_username");
    const storedPass = localStorage.getItem("contacts_password");

    if (storedUser === correctUsername && storedPass === correctPassword) {
      setIsAuthorized(true);
    } else {
      setShowLogin(true);
    }
  }, []);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch("/api/contact");
        const data = await res.json();
        if (data.success) setContacts(data.data);
      } catch (err) {
        console.error("Failed to fetch contacts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const handleLogin = () => {
    if (username === correctUsername && password === correctPassword) {
      localStorage.setItem("contacts_username", username);
      localStorage.setItem("contacts_password", password);
      setIsAuthorized(true);
      setShowLogin(false);
      setLoginError("");
    } else {
      setLoginError("Incorrect username or password");
    }
  };

  if (showLogin) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-gray-800 border border-gray-700 p-6 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <input
            type="text"
            placeholder="Username"
            className="w-full mb-3 px-3 py-2 border rounded outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-3 px-3 py-2 border rounded outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {loginError && <p className="text-red-500 mb-2">{loginError}</p>}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) return <p className="text-center mt-10">Loading contacts...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Messages</h1>

      {contacts.length === 0 ? (
        <p className="text-center text-gray-500">No contacts found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Message</th>
                <th className="px-4 py-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">
                    {contact.firstName} {contact.lastName || ""}
                  </td>
                  <td className="px-4 py-2 border">{contact.email}</td>
                  <td className="px-4 py-2 border">{contact.phone || "-"}</td>
                  <td className="px-4 py-2 border">{contact.message}</td>
                  <td className="px-4 py-2 border">
                    {new Date(contact.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
