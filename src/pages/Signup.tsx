import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/client";

interface SignupData {
  username: string;
  email: string;
  password: string;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "8px",
  padding: "11px 14px",
  fontSize: "13.5px",
  color: "#e8e6f0",
  fontFamily: "inherit",
  outline: "none",
  boxSizing: "border-box",
  caretColor: "#6366f1",
  transition: "border-color 0.15s",
};

const focusOn = (e: React.FocusEvent<HTMLInputElement>) =>
  (e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)");
const focusOff = (e: React.FocusEvent<HTMLInputElement>) =>
  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)");

const FieldLabel = ({ children }: { children: string }) => (
  <span
    className="mb-1.5 block text-[10.5px] font-medium uppercase tracking-[0.07em]"
    style={{ color: "rgba(255,255,255,0.3)" }}
  >
    {children}
  </span>
);

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function signup({ username, email, password }: SignupData) {
    try {
      if (!username.trim() || !email.trim() || !password.trim()) return;
      await api.post("/signup", { username, email, password });
      navigate("/login");
    } catch (error) {
      console.error(error instanceof Error ? error.message : "Unknown error");
    }
  }

  return (
    <main
      className="flex min-h-screen items-center justify-center px-6 py-16"
      style={{ background: "#0c0c10", fontFamily: "'DM Sans', sans-serif" }}
    >
      <div
        className="w-full overflow-hidden rounded-2xl"
        style={{
          maxWidth: "520px",
          background: "#0e0e14",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="px-12 py-12">
          <div className="mb-7 flex items-center gap-1.5">
            <div
              className="h-[5px] w-[5px] rounded-full"
              style={{ background: "#6366f1" }}
            />
            <span
              className="text-[11px] font-medium uppercase tracking-[0.1em]"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              AI Code Reviewer
            </span>
          </div>

          <h1
            className="mb-2.5 text-[36px] font-normal leading-[1.1] tracking-[-0.025em]"
            style={{
              fontFamily: "'Instrument Serif', serif",
              color: "#eeecf8",
            }}
          >
            Create an{" "}
            <em className="italic" style={{ color: "#a5b4fc" }}>
              account
            </em>
          </h1>
          <p
            className="mb-9 text-[13px] font-light leading-relaxed"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Set up your workspace and get AI feedback on your code in seconds.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              signup({ username, email, password });
            }}
            className="flex flex-col gap-4"
          >
            {/* Username + Email side by side */}
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <FieldLabel>Username</FieldLabel>
                <input
                  type="text"
                  placeholder="Enter your username"
                  style={inputStyle}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={focusOn}
                  onBlur={focusOff}
                />
              </label>
              <label className="block">
                <FieldLabel>Email</FieldLabel>
                <input
                  type="email"
                  placeholder="Enter your email"
                  style={inputStyle}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={focusOn}
                  onBlur={focusOff}
                />
              </label>
            </div>

            <label className="block">
              <FieldLabel>Password</FieldLabel>
              <input
                type="password"
                placeholder="Enter your password"
                style={inputStyle}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={focusOn}
                onBlur={focusOff}
              />
            </label>

            <button
              type="submit"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg py-3.5 text-[13.5px] font-medium transition-colors duration-150 cursor-pointer"
              style={{
                background: "#18181f",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.75)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(99,102,241,0.45)";
                e.currentTarget.style.color = "rgba(255,255,255,0.9)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.color = "rgba(255,255,255,0.75)";
              }}
            >
              <span
                className="flex h-[18px] w-[18px] items-center justify-center rounded-full"
                style={{ background: "#4f46e5", flexShrink: 0 }}
              >
                <svg width="7" height="8" viewBox="0 0 7 8" fill="none">
                  <path d="M1.5 1l4 3-4 3V1z" fill="white" />
                </svg>
              </span>
              Create account
            </button>
          </form>

          <div
            className="my-6"
            style={{ height: "1px", background: "rgba(255,255,255,0.05)" }}
          />
          <p
            className="text-center text-[12px]"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ color: "#818cf8" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#a5b4fc")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#818cf8")}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap"
      />
    </main>
  );
};
