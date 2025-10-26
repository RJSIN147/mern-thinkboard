import { useState } from "react";
import { useNavigate, Link } from "react-router";
import toast from "react-hot-toast";
import api from "../lib/axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", res.data.user.email);
      toast.success("Signed in");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="w-full max-w-md p-6">
        <div className="card bg-base-100">
          <div className="card-body">
            <h2 className="card-title">Sign In</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">Email</label>
                <input
                  className="input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control mt-4">
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mt-6 flex items-center justify-between">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
                <Link to="/signup" className="link">
                  Need an account?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
