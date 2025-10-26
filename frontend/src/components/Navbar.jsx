import { Link, useNavigate } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const email =
    typeof window !== "undefined" ? localStorage.getItem("userEmail") : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
            ThinkBoard
          </h1>
          <div className="flex items-center gap-4">
            <Link to={"/create"} className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>

            {!token ? (
              <>
                <Link to={"/signin"} className="btn btn-ghost">
                  Sign In
                </Link>
                <Link to={"/signup"} className="btn btn-secondary">
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-2">
                {email && <span className="text-sm">{email}</span>}
                <button className="btn btn-ghost" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
