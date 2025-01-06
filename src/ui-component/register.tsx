import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Helper function to set cookies
  const setCookie = (name: string, value: string, days: number): void => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  };

  // Helper function to get a cookie
  const getCookie = (name: string): string | null => {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === name) {
        return value;
      }
    }
    return null;
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (!name || !email || !phone || !password) {
      alert('Please fill in all fields!');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8888/users/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phone,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to register. Please try again.');
      }

      const data = await response.json();
      console.log('Registration successful:', data);

      // Store email in cookies or sessionStorage
      if (rememberMe) {
        setCookie('userEmail', email, 7); // Cookie expires in 7 days
      } else {
        sessionStorage.setItem('userEmail', email);
      }

      // Navigate to /auth with email as a query parameter
      navigate(`/auth?email=${encodeURIComponent(email)}`);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50">
      <div className="hero-content flex-col lg:flex-row gap-8">
        {/* Text Section */}
        <div className="text-center lg:text-left max-w-lg">
          <h1 className="text-5xl font-bold text-primary">Sign Up Now!</h1>
          <p className="py-6 text-gray-600">
            Join LiveAt Rwanda to explore amazing properties and manage your
            listings with ease. Get started by creating your account today!
          </p>
        </div>

        {/* Sign Up Card */}
        <div className="card w-full max-w-sm bg-white shadow-2xl rounded-lg">
          <div className="flex justify-center items-center mt-5">
            <h3 className="text-primary text-xl font-black">
              LiveAt <span className="text-info">Rwanda</span>
            </h3>
          </div>

          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="input input-bordered focus:input-primary"
                required
              />
            </div>

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

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Phone</span>
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="input input-bordered focus:input-primary"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="input input-bordered focus:input-primary"
                required
              />
            </div>

            {/* Remember Me */}
            <div className="form-control flex-row items-center mt-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="checkbox checkbox-primary"
              />
              <label className="label">
                <span className="label-text font-medium ml-2">Remember Me</span>
              </label>
            </div>

            {error && (
              <p className="text-sm text-red-500 mt-2">
                {error}
              </p>
            )}

            <div className="form-control mt-4">
              <button
                type="submit"
                className={`btn btn-primary hover:btn-info ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
