import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";

type Project = { _id: string; code: string; review: string };

export const Dashboard = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  async function fetchProjects() {
    const res = await api.get("/projects");
    setProjects(res.data.data);
  }

  useEffect(() => {
    async function loadProjects() {
      fetchProjects();
    }
    loadProjects();
  }, []);

  async function submit() {
    if (!code.trim() || loading) return;
    setLoading(true);
    const res = await api.post("/projects", { code });
    setReview(res.data.data.review);
    setLoading(false);
    fetchProjects();
  }

  const borderMuted = "1px solid rgba(255,255,255,0.06)";

  return (
    <main
      className="flex h-screen flex-col overflow-hidden"
      style={{
        background: "#0c0c10",
        color: "#e8e6f0",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Header */}
      <header
        className="flex flex-shrink-0 items-center justify-between px-7 py-3.5"
        style={{ borderBottom: borderMuted }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-[7px]"
            style={{
              background: "#18181f",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path
                d="M2 3.5h9M2 6.5h6M2 9.5h4"
                stroke="rgba(255,255,255,0.45)"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span
            className="text-[13px] font-medium"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Code Reviewer
          </span>
        </div>

        <button
          className="text-[12px] px-3 py-1.5 rounded-md transition-colors duration-150"
          style={{
            color: "rgba(255,255,255,0.3)",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.6)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.3)")
          }
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login", { replace: true });
          }}
        >
          Sign out
        </button>
      </header>

      {/* Editor + Review pane */}
      <div
        className="flex flex-1 overflow-hidden"
        style={{ borderBottom: borderMuted }}
      >
        {/* Code editor */}
        <div
          className="flex flex-1 flex-col"
          style={{ borderRight: borderMuted }}
        >
          <div
            className="flex flex-shrink-0 items-center justify-between px-5 py-3"
            style={{ borderBottom: borderMuted }}
          >
            <span
              className="text-[10.5px] font-medium uppercase tracking-[0.08em]"
              style={{ color: "rgba(255,255,255,0.22)" }}
            >
              Input
            </span>
            <span
              className="rounded px-2 py-0.5 text-[10px] tabular-nums"
              style={{
                fontFamily: "'Geist Mono', 'Fira Code', monospace",
                background: "rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.2)",
              }}
            >
              {code.length} chars
            </span>
          </div>

          <textarea
            className="flex-1 resize-none bg-transparent p-5 outline-none"
            style={{
              fontFamily: "'Geist Mono', 'Fira Code', monospace",
              fontSize: "12.5px",
              lineHeight: "1.7",
              color: "#94a3b8",
              caretColor: "#6366f1",
            }}
            placeholder="// paste your code here"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") submit();
            }}
          />

          <div
            className="flex flex-shrink-0 items-center gap-3 px-5 py-3.5"
            style={{ borderTop: borderMuted }}
          >
            <button
              className="flex items-center gap-2 rounded-lg px-3.5 py-2 text-[12.5px] font-medium transition-all duration-150"
              style={{
                background: loading ? "rgba(99,102,241,0.08)" : "#18181f",
                border: loading
                  ? "1px solid rgba(99,102,241,0.25)"
                  : "1px solid rgba(255,255,255,0.1)",
                color: loading
                  ? "rgba(255,255,255,0.45)"
                  : "rgba(255,255,255,0.75)",
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => {
                if (loading) return;
                e.currentTarget.style.borderColor = "rgba(99,102,241,0.45)";
                e.currentTarget.style.color = "rgba(255,255,255,0.9)";
              }}
              onMouseLeave={(e) => {
                if (loading) return;
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.color = "rgba(255,255,255,0.75)";
              }}
              onClick={submit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <circle
                      cx="6"
                      cy="6"
                      r="4.5"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M6 1.5A4.5 4.5 0 0 1 10.5 6"
                      stroke="rgba(255,255,255,0.5)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  Reviewing…
                </>
              ) : (
                <>
                  <span
                    className="flex h-[15px] w-[15px] items-center justify-center rounded-full"
                    style={{ background: "#4f46e5", flexShrink: 0 }}
                  >
                    <svg width="5" height="7" viewBox="0 0 5 7" fill="none">
                      <path d="M1 1l3.5 2.5L1 6V1z" fill="white" />
                    </svg>
                  </span>
                  Run review
                </>
              )}
            </button>
            <span
              className="text-[11px]"
              style={{ color: "rgba(255,255,255,0.14)" }}
            >
              ⌘ ↵
            </span>
          </div>
        </div>

        {/* Review output */}
        <div
          className="flex w-[380px] flex-shrink-0 flex-col"
          style={{ background: "#0e0e13" }}
        >
          <div
            className="flex flex-shrink-0 items-center justify-between px-5 py-3"
            style={{ borderBottom: borderMuted }}
          >
            <span
              className="text-[10.5px] font-medium uppercase tracking-[0.08em]"
              style={{ color: "rgba(255,255,255,0.22)" }}
            >
              Review
            </span>
            <div
              className="h-[6px] w-[6px] rounded-full"
              style={{
                background: review ? "#22c55e" : "rgba(255,255,255,0.1)",
              }}
            />
          </div>

          <div className="flex-1 overflow-auto p-5">
            {review ? (
              <pre
                className="whitespace-pre-wrap font-sans text-[12.5px] leading-6"
                style={{ color: "#94a3b8" }}
              >
                {review}
              </pre>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2 opacity-20">
                {[100, 64, 88, 48].map((w, i) => (
                  <div
                    key={i}
                    className="rounded"
                    style={{
                      width: w,
                      height: 2,
                      background: "rgba(255,255,255,0.3)",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* History */}
      <div
        className="flex-shrink-0 overflow-auto px-7 py-5"
        style={{ maxHeight: "38vh" }}
      >
        <div className="mb-4 flex items-baseline justify-between">
          <h2
            className="text-[19px] font-normal tracking-[-0.02em]"
            style={{
              fontFamily: "'Instrument Serif', serif",
              color: "#e8e6f0",
            }}
          >
            Project{" "}
            <em className="italic" style={{ color: "#a5b4fc" }}>
              history
            </em>
          </h2>
          <span
            className="text-[11px]"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            {projects.length} {projects.length === 1 ? "review" : "reviews"}
          </span>
        </div>

        {projects.length === 0 ? (
          <p
            className="text-[12.5px]"
            style={{ color: "rgba(255,255,255,0.18)" }}
          >
            No reviews yet — paste some code above.
          </p>
        ) : (
          <div
            className="overflow-hidden rounded-xl"
            style={{ border: borderMuted, background: "#0e0e13" }}
          >
            {projects.map((p, i) => (
              <div
                key={p._id}
                className="grid items-center gap-4 px-4 py-3 transition-colors duration-100"
                style={{
                  gridTemplateColumns: "24px 1fr 1fr 12px",
                  borderTop: i === 0 ? "none" : borderMuted,
                  cursor: "default",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,0.02)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <span
                  className="text-center text-[10px] tabular-nums"
                  style={{
                    fontFamily: "'Geist Mono','Fira Code',monospace",
                    color: "rgba(255,255,255,0.18)",
                  }}
                >
                  {projects.length - i}
                </span>
                <span
                  className="overflow-hidden text-ellipsis whitespace-nowrap text-[11.5px]"
                  style={{
                    fontFamily: "'Geist Mono','Fira Code',monospace",
                    color: "#475569",
                  }}
                >
                  {p.code}
                </span>
                <span
                  className="overflow-hidden text-ellipsis whitespace-nowrap text-[11.5px]"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  {p.review}
                </span>
                <span
                  style={{ color: "rgba(255,255,255,0.12)", fontSize: "10px" }}
                >
                  →
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap"
      />
    </main>
  );
};
