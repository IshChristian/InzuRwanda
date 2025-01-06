import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const setCookie = (name: string, value: string, days: number) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:8888/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data)
      if (!response.ok) {
        throw new Error(data.error || "Failed to login.");
      }

      // Save cookies
    if (data.name) {
      const expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + 1); // Set expiry to 1 month from now

      document.cookie = `userID=${encodeURIComponent(data._id)}; path=/; expires=${expiryDate.toUTCString()}; secure;`;
      document.cookie = `name=${encodeURIComponent(data.name)}; path=/; expires=${expiryDate.toUTCString()}; secure;`;

      // Debug: Log cookies
      console.log("Cookies after login:", document.cookie);
    } else {
      console.error("Missing userID or name in login response.");
    }
      // Navigate to dashboard
      navigate(`/dashboard`);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="hero min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50">
      <div className="hero-content flex-col lg:flex-row-reverse gap-8">
        {/* Text Section */}
        <div className="text-center lg:text-left max-w-lg">
          <h1 className="text-5xl font-bold text-primary">Login Now!</h1>
          <p className="py-6 text-gray-600">
            Access your account and explore amazing features tailored just for
            you. Manage your listings, interact with others, and much more.
          </p>
        </div>

        {/* Login Card */}
        <div className="card w-full max-w-sm bg-white shadow-2xl rounded-lg">
          <div className="flex justify-center items-center mt-5">
            <h3 className="text-primary text-xl font-black">
              LiveAt <span className="text-info">Rwanda</span>
            </h3>
          </div>

          <form className="card-body" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="input input-bordered focus:input-primary"
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="input input-bordered focus:input-primary"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover text-sm">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm text-center mt-2">{error}</p>
            )}

            {/* Login Button */}
            <div className="form-control mt-4">
              <button type="submit" className="btn btn-primary hover:btn-info">
                Login
              </button>
            </div>

            {/* Sign in with Google */}
            <div className="form-control mt-2">
              <button
                type="button"
                className="btn btn-outline btn-info hover:btn-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm1.751 10.002v-.503h4.735c.212 1.11.212 2.398-.03 3.461-1.014 4.448-6.09 5.782-9.494 3.02l2.036-1.61c1.466 1.05 3.898 1.303 5.076-.467 1.02-1.574.883-4.009.117-5.11l-3.154 2.209zM7.36 8.451a4.76 4.76 0 0 1 2.8-.956h.001l.074-.003 2.036 1.61C11.094 9.528 8.722 9.28 7.365 7.5l-1.84 1.453a4.763 4.763 0 0 1 1.836 1.103zm-.33 5.284L5.556 12.282l2.037-1.61c1.676 2.207 4.142 1.84 5.477.248 1.195-1.47 1.432-3.81.263-5.126L10.3 5.105c1.042-1.297 3.054-1.785 4.418-.845 1.606 1.105 2.517 3.117 2.585 5.47l-1.925 1.915h-4.662zm-2.247 1.777c1.005.991 3.398.847 5.065.402 1.93-.503 3.174-2.364 3.036-4.477H8.875l-.002.503c-.12 1.724-1.607 3.005-2.905 3.573z"
                  />
                </svg>
                Sign in with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
