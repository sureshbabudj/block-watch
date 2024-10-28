"use client";
import { useState } from "react";
import { userAtom } from "@/lib/appStore";
import { useAtom } from "jotai";
import Link from "next/link";
import { SignoutAction } from "./SignoutAction";
import useAuth from "@/hooks/useAuth";

const SigninForm = () => {
  const [user] = useAtom(userAtom);
  const { refreshAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const response = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok) {
      setSuccess(data.message);
      refreshAuth();
    } else {
      setError(data.error);
    }
  };

  if (user && user.id) {
    return (
      <p>
        Welcome {user.firstName} <SignoutAction />
      </p>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-gray-50 p-6 rounded ">
      <h2 className="text-2xl font-bold mb-5 text-orange-600">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </button>
      </form>

      <p>
        Or <Link href="/signup">sign up here</Link>
      </p>
    </div>
  );
};

export default SigninForm;
