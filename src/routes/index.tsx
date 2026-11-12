import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroImg from "@/assets/hero.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:image", content: "/og-image.jpg" },
      { name: "twitter:image", content: "/og-image.jpg" },
    ],
  }),
  component: Index,
});

const GITHUB = "https://github.com/Py528/exportrace";

// ---------- Theme ----------
type Theme = "dark" | "light";
function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>("dark");
  useEffect(() => {
    const saved = (typeof localStorage !== "undefined" && localStorage.getItem("eb-theme")) as Theme | null;
    if (saved) setTheme(saved);
  }, []);
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = theme;
      localStorage.setItem("eb-theme", theme);
    }
  }, [theme]);
  return [theme, () => setTheme((t) => (t === "dark" ? "light" : "dark"))];
}

// ---------- Scroll reveal ----------
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, cls: shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6" };
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, cls } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${cls} ${className}`}
    >
      {children}
    </div>
  );
}

function Index() {
  const [theme, toggle] = useTheme();
  const isDark = theme === "dark";
  return (
    <div
      className={`min-h-screen font-sans overflow-x-hidden transition-colors duration-700 ${isDark ? "bg-[#0a0b0d] text-white" : "bg-[#f6f4ef] text-[#0a0b0d]"
        }`}
    >
      <Nav isDark={isDark} onToggle={toggle} />
      <Hero isDark={isDark} />
      <TrustBar isDark={isDark} />
      <QuoteSection isDark={isDark} />
      <Terminal isDark={isDark} />
      <Benchmarks isDark={isDark} />
      <Features isDark={isDark} />
      <BackendsGrid isDark={isDark} />
      <ReportPreview isDark={isDark} />
      <CISection isDark={isDark} />
      <CTA isDark={isDark} />
      <Footer isDark={isDark} />
    </div>
  );
}

// ---------- Nav ----------
function Nav({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl">
      <div
        className={`flex items-center justify-between px-4 py-2 rounded-full backdrop-blur-xl border transition-colors ${isDark ? "bg-black/40 border-white/10" : "bg-white/70 border-black/10"
          }`}
      >
        <a href="#" className="flex items-center gap-2 pl-2 group">
          <svg className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A3E635" />
                <stop offset="100%" stopColor="#76B900" />
              </linearGradient>
            </defs>
            <path d="M6 8L16 16L6 24" stroke="url(#logo-grad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 8L26 16L16 24" stroke="url(#logo-grad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
          </svg>
          <span className="font-semibold tracking-tight">exportrace</span>
          <span className={`text-xs hidden sm:inline ${isDark ? "text-white/50" : "text-black/50"}`}>v0.1</span>
        </a>
        <nav className={`hidden md:flex items-center gap-6 text-sm ${isDark ? "text-white/70" : "text-black/70"}`}>
          <a href="#how" className="hover:opacity-100 opacity-80 transition">How it works</a>
          <a href="#benchmarks" className="hover:opacity-100 opacity-80 transition">Benchmarks</a>
          <a href="#report" className="hover:opacity-100 opacity-80 transition">Report</a>
          <a href="#backends" className="hover:opacity-100 opacity-80 transition">Backends</a>
        </nav>
        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle theme"
            onClick={onToggle}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 ${isDark ? "bg-white/10 hover:bg-white/20" : "bg-black/5 hover:bg-black/10"
              }`}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-1.5 rounded-full font-medium transition hover:scale-105 bg-[#76B900] text-black hover:bg-[#85ce00]"
          >
            Star on GitHub
          </a>
        </div>
      </div>
    </header>
  );
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

// ---------- Hero ----------
function Hero({ isDark }: { isDark: boolean }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center pt-32 pb-20 px-4">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroImg}
          alt=""
          width={1920}
          height={1280}
          className={`absolute inset-0 w-full h-full object-cover object-bottom transition-opacity duration-1000 ${isDark ? "opacity-35" : "opacity-15"
            }`}
        />
        <div
          className={`absolute inset-0 transition-colors duration-700 ${isDark
            ? "bg-gradient-to-b from-[#0a0b0d] via-[#0a0b0d]/75 to-[#0a0b0d]"
            : "bg-gradient-to-b from-[#f6f4ef] via-[#f6f4ef]/85 to-[#f6f4ef]"
            }`}
        />
        {/* soft blobs */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-emerald-500/15 blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-[#76B900]/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center pt-16 md:pt-24">

        <Reveal delay={80}>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-tight">
            One command.<br />
            <span className="italic opacity-90">Your best export config.</span>
          </h1>
        </Reveal>

        <Reveal delay={180}>
          <p className={`mt-8 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed ${isDark ? "text-white/70" : "text-black/70"}`}>
            Stop guessing between ONNX, CoreML, and PyTorch. <span className={isDark ? "text-white" : "text-black"}>exportrace</span>{" "}
            benchmarks every backend and precision on <em>your</em> machine — and tells you which one to ship.
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <CopyCommand cmd="pip install exportrace" isDark={isDark} />
              <CopyCommand cmd="exportrace run yolov8n.pt" isDark={isDark} />
            </div>
            <div className="flex items-center gap-6 mt-2">
              <a
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full text-sm font-semibold bg-[#76B900] text-black hover:bg-[#85ce00] transition hover:scale-105"
              >
                Star on GitHub
              </a>
              <a
                href="#benchmarks"
                className={`text-sm underline underline-offset-4 hover:opacity-100 opacity-70 transition`}
              >
                See real benchmark tables →
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={360}>
          <div className={`mt-12 flex items-center justify-center gap-6 text-xs ${isDark ? "text-white/40" : "text-black/50"}`}>
            <span className="flex items-center gap-1.5"><Dot /> MIT licensed</span>
            <span className="flex items-center gap-1.5"><Dot /> No accounts</span>
            <span className="flex items-center gap-1.5"><Dot /> Runs offline</span>
            <span className="hidden sm:flex items-center gap-1.5"><Dot /> Zero ML dependencies in core</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Dot() { return <span className="w-1 h-1 rounded-full bg-[#76B900]" />; }

function CopyCommand({ cmd, isDark }: { cmd: string; isDark: boolean }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(cmd);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className={`group flex items-center gap-3 pl-4 pr-2 py-2 rounded-full backdrop-blur-xl border transition text-sm font-mono hover:scale-[1.02] ${isDark ? "bg-black/60 border-white/15 hover:border-white/30" : "bg-white/80 border-black/15 hover:border-black/30"
        }`}
    >
      <span className="text-[#76B900] font-bold">$</span>
      <span className="hidden sm:inline">{cmd}</span>
      <span className="sm:hidden">{cmd.length > 22 ? cmd.slice(0, 20) + "…" : cmd}</span>
      <span className={`ml-2 px-3 py-1.5 rounded-full text-xs font-sans font-medium transition ${copied ? "bg-emerald-400 text-black" : isDark ? "bg-white text-black" : "bg-black text-white"
        }`}>
        {copied ? "copied" : "copy"}
      </span>
    </button>
  );
}

// ---------- Trust bar (marquee) ----------
function TrustBar({ isDark }: { isDark: boolean }) {
  const items = ["PyTorch", "ONNX Runtime", "CoreML", "Apple MPS", "Ultralytics", "YOLOv8", "YOLO11", "YOLO26", "RT-DETR", "YOLO-World"];
  const row = [...items, ...items];
  return (
    <section className={`relative py-16 px-4 border-t ${isDark ? "border-white/5" : "border-black/5"}`}>
      <p className={`text-center text-xs uppercase tracking-[0.2em] mb-8 ${isDark ? "text-white/40" : "text-black/40"}`}>
        Benchmarks the runtimes and models you already use
      </p>
      <div className="relative overflow-hidden max-w-6xl mx-auto">
        <div className={`pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r ${isDark ? "from-[#0a0b0d]" : "from-[#f6f4ef]"} to-transparent`} />
        <div className={`pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l ${isDark ? "from-[#0a0b0d]" : "from-[#f6f4ef]"} to-transparent`} />
        <div className="flex gap-12 marquee-track">
          {row.map((i, idx) => (
            <span
              key={idx}
              className={`shrink-0 font-serif text-2xl italic transition hover:opacity-100 ${isDark ? "text-white/50 hover:text-white" : "text-black/50 hover:text-black"}`}
            >
              {i}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        .marquee-track { width: max-content; animation: marquee 30s linear infinite; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </section>
  );
}

// ---------- Quote ----------
function QuoteSection({ isDark }: { isDark: boolean }) {
  return (
    <section className="py-24 md:py-32 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <Reveal>
          <p className={`text-xs uppercase tracking-[0.2em] mb-8 ${isDark ? "text-white/40" : "text-black/40"}`}>The problem</p>
        </Reveal>
        <Reveal delay={100}>
          <blockquote className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
            "Should I export to <span className="italic text-[#76B900] font-semibold">ONNX</span> or
            {" "}<span className="italic text-[#76B900] font-semibold">CoreML</span>? Does FP16 actually help on my machine?"
          </blockquote>
        </Reveal>
        <Reveal delay={200}>
          <p className={`mt-8 text-lg ${isDark ? "text-white/60" : "text-black/60"}`}>
            Every YOLO user asks this. Every project. Answered by hand — badly — every time.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Terminal (real run) ----------
function Terminal({ isDark }: { isDark: boolean }) {
  return (
    <section id="how" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="text-center mb-10">
            <p className={`text-xs uppercase tracking-[0.2em] mb-3 ${isDark ? "text-white/40" : "text-black/40"}`}>The real Shell API</p>
            <h2 className="font-serif text-3xl sm:text-5xl leading-tight tracking-tight">
              One command. <span className="italic">Every backend measured.</span>
            </h2>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="rounded-2xl border border-white/10 bg-black/80 backdrop-blur overflow-hidden shadow-2xl shadow-black/50 text-white">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.02]">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-3 text-xs text-white/40 font-mono">~/projects/yolo-detector</span>
              <span className="ml-auto text-[10px] text-[#76B900] uppercase tracking-wider font-mono border border-[#76B900]/30 px-2 py-0.5 rounded font-bold">Real run — Apple M5 Pro</span>
            </div>
            <pre className="p-6 text-sm font-mono leading-relaxed overflow-x-auto">
              <span className="text-[#76B900] font-bold">$</span> <span className="text-white">exportrace run yolov8n.pt</span>{"\n"}
              <span className="text-white/50">exportrace v0.1.0 • macOS • Apple M5 Pro (15C, 24GB) • Power: AC{"\n"}</span>
              <span className="text-white/50">▸ backends: 5 to run, 0 unavailable (baseline: PyTorch FP32){"\n"}</span>
              <span className="text-white/50">▸ exporting yolov8n.pt → onnx, coreml ... </span><span className="text-green-400">done{"\n"}</span>
              <span className="text-white/50">▸ benchmarking (20 warmup, 100 timed iters, imgsz=640) ...{"\n\n"}</span>
              <span className="text-cyan-300">┌────────────────┬──────────┬───────────────┬─────────┬────────┬─────────┬─────────┐{"\n"}</span>
              <span className="text-cyan-300">│ backend        │ precision│ unit          │ Med FPS │ p99 ms │ Box IoU │ RSS     │{"\n"}</span>
              <span className="text-cyan-300">├────────────────┼──────────┼───────────────┼─────────┼────────┼─────────┼─────────┤{"\n"}</span>
              <span className="text-white">│ PyTorch        │ FP32     │ CPU           │   31.1  │  65.9  │  1.000  │  427 MB │{"\n"}</span>
              <span className="text-emerald-400 font-bold">│ PyTorch/MPS    │ FP16     │ Apple GPU     │  182.0  │   8.2  │  0.992  │ ★ 542 MB │{"\n"}</span>
              <span className="text-white">│ ONNX Runtime   │ FP32     │ CoreML EP     │  233.4  │   6.2  │  0.975  │  601 MB │{"\n"}</span>
              <span className="text-white">│ CoreML         │ FP16     │ CPU+GPU+ANE   │  128.1  │  10.3  │  0.963  │  596 MB │{"\n"}</span>
              <span className="text-white">│ ONNX Runtime   │ FP32     │ CPU (XNNPACK) │   60.3  │  27.0  │  1.000  │  569 MB │{"\n"}</span>
              <span className="text-cyan-300">└────────────────┴──────────┴───────────────┴─────────┴────────┴─────────┴─────────┘{"\n\n"}</span>
              <span className="text-green-400">✓ recommendation: MPS FP16 — 5.9× faster than baseline, Box IoU 0.992{"\n"}</span>
              <span className="text-white/50">▸ report written to </span><span className="text-white">benchmark_report.md</span>
            </pre>
          </div>
        </Reveal>

        {/* KPI strip */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          {[
            { k: "5.9×", v: "faster than FP32 baseline" },
            { k: "8.2 ms", v: "p99 tail latency (E2E)" },
            { k: "0.992", v: "Box IoU vs FP32 baseline" },
          ].map((m, i) => (
            <Reveal key={m.k} delay={i * 100}>
              <div className={`rounded-2xl p-5 border ${isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-black/10"}`}>
                <div className="font-serif text-3xl md:text-4xl text-[#76B900] font-bold">{m.k}</div>
                <div className={`mt-1 text-xs ${isDark ? "text-white/60" : "text-black/60"}`}>{m.v}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Benchmarks (dynamic, from /benchmarks.json) ----------
type BenchRow = {
  backend: string; backendId: string; precision: string; unit: string; status: string;
  fps?: number; p99?: number; e2e?: number; rss?: number; init?: number;
  iou?: number | null; detail?: string;
};
type BenchEntry = { model: string; file: string; task: string; status: string; rows: BenchRow[] };
type BenchData = {
  meta: {
    tool: string; generated: string; host: string; os: string; chip: string;
    ramGb?: number; imgsz: number; iters: number; warmup: number; batch: number;
    power: string; note: string;
  };
  results: BenchEntry[];
};

const TASK_LABELS: Record<string, string> = {
  detect: "Detection", segment: "Segmentation", pose: "Pose",
  classify: "Classification", obb: "Oriented (OBB)", depth: "Depth",
};

function Benchmarks({ isDark }: { isDark: boolean }) {
  const [data, setData] = useState<BenchData | null>(null);
  const [sel, setSel] = useState(0);

  useEffect(() => {
    fetch("/benchmarks.json")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("no data"))))
      .then((d: BenchData) => {
        setData(d);
        const first = d.results.findIndex((e) => e.rows.some((r) => r.fps));
        setSel(Math.max(0, first));
      })
      .catch(() => setData(null));
  }, []);

  const entries = (data?.results ?? []).filter((e) => e.rows.some((r) => r.fps));
  const entry = entries[sel];

  return (
    <section id="benchmarks" className={`py-24 px-4 border-t ${isDark ? "border-white/5" : "border-black/5"}`}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-10">
            <p className={`text-xs uppercase tracking-[0.2em] mb-3 ${isDark ? "text-white/40" : "text-black/40"}`}>
              Real runs — not mockups
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight">
              Every model family. <span className="italic">Every backend.</span>
            </h2>
            {data && (
              <p className={`mt-4 text-xs font-mono ${isDark ? "text-white/40" : "text-black/40"}`}>
                {data.meta.host} • {data.meta.imgsz}px • {data.meta.warmup} warmup + {data.meta.iters} timed iters • generated {data.meta.generated}
              </p>
            )}
          </div>
        </Reveal>

        {!data && (
          <div className={`text-center py-16 text-sm ${isDark ? "text-white/40" : "text-black/40"}`}>
            Loading benchmark data… Run <code className="font-mono">exportrace run model.pt</code> to generate yours.
          </div>
        )}

        {data && entries.length > 0 && (
          <>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {entries.map((e, i) => (
                <button
                  key={e.model}
                  onClick={() => setSel(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono border transition ${i === sel
                    ? "bg-[#76B900] text-black border-[#76B900] font-bold"
                    : isDark ? "border-white/15 text-white/60 hover:border-white/40" : "border-black/15 text-black/60 hover:border-black/40"
                    }`}
                >
                  {e.model}
                </button>
              ))}
            </div>

            {entry && (
              <Reveal>
                <div className={`rounded-2xl border overflow-hidden ${isDark ? "border-white/10" : "border-black/10"}`}>
                  <div className={`px-5 py-3 border-b flex items-center justify-between text-xs font-mono ${isDark ? "border-white/10 bg-white/[0.03] text-white/50" : "border-black/10 bg-black/[0.02] text-black/50"}`}>
                    <span>{entry.file} • {TASK_LABELS[entry.task] ?? entry.task}</span>
                    <span>★ = fastest valid</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs sm:text-sm font-mono">
                      <thead>
                        <tr className={isDark ? "text-white/40" : "text-black/40"}>
                          <th className="text-left px-4 py-2 font-medium">Backend</th>
                          <th className="text-left px-2 py-2 font-medium">Prec.</th>
                          <th className="text-left px-2 py-2 font-medium hidden md:table-cell">Unit</th>
                          <th className="text-right px-2 py-2 font-medium">Med FPS</th>
                          <th className="text-right px-2 py-2 font-medium">p99 ms</th>
                          <th className="text-right px-2 py-2 font-medium hidden sm:table-cell">E2E ms</th>
                          <th className="text-right px-2 py-2 font-medium hidden md:table-cell">RSS</th>
                          <th className="text-right px-2 py-2 font-medium hidden md:table-cell">Init s</th>
                          <th className="text-right px-2 py-2 font-medium">Box IoU</th>
                          <th className="text-left px-4 py-2 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...entry.rows]
                          .sort((a, b) => (b.fps ?? -1) - (a.fps ?? -1))
                          .map((r, ri) => {
                            const best = entry.rows.some((x) => x.fps) &&
                              r.fps === Math.max(...entry.rows.map((x) => x.fps ?? -1)) &&
                              (r.status === "ok");
                            return (
                              <tr key={ri} className={`border-t ${isDark ? "border-white/5" : "border-black/5"} ${best ? (isDark ? "bg-[#76B900]/10" : "bg-[#76B900]/10") : ""}`}>
                                <td className={`px-4 py-2 ${best ? "text-[#76B900] font-bold" : ""}`}>{r.backend}</td>
                                <td className="px-2 py-2">{r.precision}</td>
                                <td className={`px-2 py-2 hidden md:table-cell ${isDark ? "text-white/50" : "text-black/50"}`}>{r.unit}</td>
                                <td className="px-2 py-2 text-right">{r.fps?.toFixed(1) ?? "–"}</td>
                                <td className="px-2 py-2 text-right">{r.p99?.toFixed(1) ?? "–"}</td>
                                <td className="px-2 py-2 text-right hidden sm:table-cell">{r.e2e?.toFixed(1) ?? "–"}</td>
                                <td className="px-2 py-2 text-right hidden md:table-cell">{r.rss?.toFixed(0) ?? "–"}</td>
                                <td className="px-2 py-2 text-right hidden md:table-cell">{r.init?.toFixed(1) ?? "–"}</td>
                                <td className="px-2 py-2 text-right">{r.iou != null ? r.iou.toFixed(3) : "–"}</td>
                                <td className="px-4 py-2">
                                  {best && <span className="text-[#76B900] font-bold">★ Best</span>}
                                  {!best && r.status === "ok" && <span className={isDark ? "text-white/50" : "text-black/50"}>ok</span>}
                                  {r.status === "nan_detected" && <span className="text-red-400">NaN</span>}
                                  {!["ok", "nan_detected"].includes(r.status) && (
                                    <span className={`${isDark ? "text-white/40" : "text-black/40"}`}>skipped</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Reveal>
            )}

            <p className={`mt-6 text-center text-xs max-w-3xl mx-auto leading-relaxed ${isDark ? "text-white/40" : "text-black/40"}`}>
              {data.meta.note}
            </p>
            <p className={`mt-2 text-center text-xs ${isDark ? "text-white/30" : "text-black/30"}`}>
              Generated with <span className="font-mono">{data.meta.tool}</span> — one command, one paste-able report.
            </p>
          </>
        )}
      </div>
    </section>
  );
}

// ---------- Features ----------
function Features({ isDark }: { isDark: boolean }) {
  const features = [
    { title: "Detect your machine", body: "OS, chip, RAM, and every backend actually available — MPS, CoreML, ONNX EPs. Running on battery or thermally throttled? The report says so." },
    { title: "Isolated, honest benchmarking", body: "Every backend runs in a fresh OS subprocess with a cooldown. One subprocess per backend, so no runtime pollutes the next row's memory." },
    { title: "Box IoU, not vibes", body: "Zero config: 12 bundled scenes, FP32 baseline boxes as pseudo-Ground-Truth. Measures box drift, class flips, and dropped objects — what FP16 actually breaks." },
    { title: "The columns that bite", body: "p99 tail latency (not just mean), peak RSS per backend, and init/compile time — the metrics that kill edge and serverless deployments." },
    { title: "Fails gracefully", body: "No CoreML? No CUDA? Rows are skipped with a reason, never a crash. Works on transformers (RT-DETR), world models, classification heads — with speed, and '–' where box scoring doesn't apply." },
    { title: "Ships code, not just numbers", body: "The report ends with copy-paste standalone inference code for the winning runtime — no Ultralytics wrapper at deployment time." },
  ];
  return (
    <section className="py-24 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <p className={`text-xs uppercase tracking-[0.2em] mb-4 ${isDark ? "text-white/40" : "text-black/40"}`}>What it does</p>
            <h2 className="font-serif text-4xl sm:text-6xl leading-tight tracking-tight">
              A trustworthy answer<br />
              <span className={`italic ${isDark ? "text-white/70" : "text-black/60"}`}>in one command.</span>
            </h2>
          </div>
        </Reveal>
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden border ${isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"}`}>
          {features.map((f, i) => (
            <Reveal key={i} delay={i * 60}>
              <div
                className={`h-full p-8 transition-all duration-300 hover:-translate-y-1 group ${isDark ? "bg-[#0a0b0d] hover:bg-white/[0.03]" : "bg-[#f6f4ef] hover:bg-white"
                  }`}
              >
                <div className="text-[#76B900] font-mono text-xs mb-4">0{i + 1}</div>
                <h3 className="font-serif text-2xl mb-3 group-hover:text-[#76B900] transition-colors">{f.title}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? "text-white/60" : "text-black/60"}`}>{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Backends grid ----------
function BackendsGrid({ isDark }: { isDark: boolean }) {
  const groups = [
    { label: "Apple — v0.1 shipping", items: [["CoreML .mlpackage", "ship"], ["PyTorch/MPS FP16", "ship"], ["ONNX CoreML EP", "ship"]] },
    { label: "Cross-platform — v0.1", items: [["ONNX Runtime CPU", "ship"], ["PyTorch/CPU", "ship"]] },
    { label: "NVIDIA — v0.2/v0.3", items: [["PyTorch CUDA", "soon"], ["ONNX CUDA EP", "soon"], ["TensorRT", "soon"]] },
    { label: "Intel / AMD — plugins", items: [["OpenVINO", "soon"], ["ONNX (DML)", "soon"]] },
  ];
  return (
    <section id="backends" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <p className={`text-xs uppercase tracking-[0.2em] mb-4 ${isDark ? "text-white/40" : "text-black/40"}`}>Backends covered</p>
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight">Every runtime worth trying.</h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {groups.map((g, gi) => (
            <Reveal key={g.label} delay={gi * 80}>
              <div className={`rounded-2xl p-6 border h-full transition hover:-translate-y-1 hover:shadow-xl ${isDark ? "bg-white/[0.03] border-white/10 hover:border-[#76B900]/40" : "bg-white border-black/10 hover:border-[#76B900]/60"
                }`}>
                <div className={`text-xs uppercase tracking-widest mb-4 ${isDark ? "text-white/40" : "text-black/40"}`}>{g.label}</div>
                <div className="space-y-2">
                  {g.items.map(([it, st]) => (
                    <div key={it} className="flex items-center justify-between gap-2 font-serif text-lg italic">
                      <span className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${st === "ship" ? "bg-[#76B900]" : "bg-gray-400/50"}`} />
                        {it}
                      </span>
                      <span className={`text-[9px] font-sans not-italic uppercase tracking-wider px-1.5 py-0.5 rounded ${st === "ship"
                        ? "bg-[#76B900]/20 text-[#76B900] font-bold"
                        : isDark ? "bg-white/5 text-white/40" : "bg-black/5 text-black/40"
                        }`}>
                        {st === "ship" ? "v0.1" : "roadmap"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className={`text-center text-xs mt-6 ${isDark ? "text-white/40" : "text-black/40"}`}>
          v0.1 scope: Apple Silicon + Ultralytics/YOLO, on purpose. A small matrix we keep working beats a big one that's broken.
        </p>
      </div>
    </section>
  );
}

// ---------- Report preview (real generated file) ----------
function ReportPreview({ isDark }: { isDark: boolean }) {
  const lines = [
    ["### ⚡ exportrace v0.1.0 — yolov8n.pt (640×640, batch=1)", "hl"],
    ["**Host:** macOS • Apple M5 Pro (15C, 24GB) • Power: AC connected", ""],
    ["**Methodology:** 20 warmup, 100 timed iters • E2E = preprocess+inference+NMS", ""],
    ["", ""],
    ["| Backend | Precision | Unit | Med FPS | p99 | Peak RSS | Box IoU |", ""],
    ["| :--- | :--- | :--- | ---: | ---: | ---: | ---: |", "dim"],
    ["| ONNX Runtime | FP32 | CoreML EP | 233.4 | 6.2 | 601 MB | 0.975 |", ""],
    ["| PyTorch/MPS | FP16 | Apple GPU | 182.0 | 8.2 | 542 MB | 0.992 ★ |", "hl"],
    ["| CoreML | FP16 | CPU+GPU+ANE | 128.1 | 10.3 | 596 MB | 0.963 |", ""],
    ["| ONNX Runtime | FP32 | CPU | 60.3 | 27.0 | 569 MB | 1.000 |", ""],
    ["| PyTorch | FP32 | CPU | 31.1 | 65.9 | 427 MB | 1.000 (base) |", ""],
    ["", ""],
    ["> ✅ Winner: yolov8n.pt MPS FP16 — 5.9× faster, Box IoU 0.992, p99 8.2 ms", "hl"],
    ["", ""],
    ["<details><summary>Copy standalone MPS inference code</summary>", "dim"],
  ];
  return (
    <section id="report" className="py-24 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div>
            <p className={`text-xs uppercase tracking-[0.2em] mb-4 ${isDark ? "text-white/40" : "text-black/40"}`}>The report</p>
            <h2 className="font-serif text-4xl sm:text-5xl leading-tight tracking-tight mb-6">
              Markdown you can<br /><span className="italic">paste anywhere.</span>
            </h2>
            <p className={`leading-relaxed mb-6 ${isDark ? "text-white/60" : "text-black/70"}`}>
              This is a real generated <code className="font-mono text-sm">benchmark_report.md</code> — from an
              actual exportrace run on an Apple M5 Pro. Drop it into a PR description, a GitHub issue,
              your lab notebook, or your README — it renders everywhere.
            </p>
            <ul className={`space-y-3 text-sm ${isDark ? "text-white/70" : "text-black/70"}`}>
              {["Median FPS + p99 tail latency", "E2E latency (preprocess + inference + NMS)", "Peak RSS + init/compile time per backend", "Box IoU vs FP32 baseline", "Ranked recommendation + deploy snippet"].map((x) => (
                <li key={x} className="flex items-center gap-3">
                  <span className="w-1 h-1 rounded-full bg-[#76B900]" />{x}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className={`rounded-xl border p-6 font-mono text-[11px] sm:text-xs leading-relaxed shadow-2xl ${isDark ? "bg-white/[0.02] border-white/10 text-white/80" : "bg-white border-black/10 text-black/80"
            }`}>
            {lines.map(([t, c], i) => (
              <div key={i} className={c === "hl" ? "text-[#76B900] font-bold" : c === "dim" ? (isDark ? "text-white/40" : "text-black/40") : ""}>
                {t || "\u00A0"}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- CI section ----------
function CISection({ isDark }: { isDark: boolean }) {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="text-center mb-10">
            <p className={`text-xs uppercase tracking-[0.2em] mb-3 ${isDark ? "text-white/40" : "text-black/40"}`}>CI-ready</p>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight">
              Catch broken exports in the pull request.
            </h2>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="rounded-2xl border border-white/10 bg-black/80 overflow-hidden shadow-2xl text-white">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]">
              <span className="text-xs font-mono text-white/40">.github/workflows/export-check.yml</span>
              <span className="text-[10px] text-[#76B900] uppercase tracking-wider font-mono border border-[#76B900]/30 px-2 py-0.5 rounded font-bold">v0.2 preview</span>
            </div>
            <pre className="p-6 text-sm font-mono leading-relaxed overflow-x-auto">
              <span className="text-pink-400">name</span>: export-regression{"\n"}
              <span className="text-pink-400">on</span>: [pull_request]{"\n\n"}
              <span className="text-white/50"># Runs in every PR: ONNX ops load? FP16 NaN? Boxes drift?</span>{"\n"}
              <span className="text-white/50"># FPS gates only on self-hosted hardware runners — shared</span>{"\n"}
              <span className="text-white/50"># runners have no GPU and noisy variance. We won't market gates that flake.</span>{"\n"}
              - <span className="text-pink-400">uses</span>: <span className="text-cyan-300">exportrace/action@v1</span>{"\n"}
              &nbsp;&nbsp;<span className="text-pink-400">with</span>:{"\n"}
              &nbsp;&nbsp;&nbsp;&nbsp;model: yolov8n.pt{"\n"}
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">fail-under-iou</span>: <span className="text-emerald-400">0.95</span>
            </pre>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          {[
            { k: "Δ IoU / NaN", v: "accuracy drift on every PR, standard runners, no GPU needed" },
            { k: "Air-gapped", v: "runs with zero network — built for enterprise CI" },
            { k: "results.json", v: "machine-readable output for your own dashboards" },
          ].map((m, i) => (
            <Reveal key={m.k} delay={i * 100}>
              <div className={`rounded-2xl p-5 border ${isDark ? "bg-white/[0.03] border-white/10" : "bg-white border-black/10"}`}>
                <div className="font-serif text-xl text-[#76B900] font-bold">{m.k}</div>
                <div className={`mt-1 text-xs ${isDark ? "text-white/60" : "text-black/60"}`}>{m.v}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- CTA ----------
function CTA({ isDark }: { isDark: boolean }) {
  return (
    <section id="get-started" className="relative py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#76B900]/15 blur-3xl" />
      </div>
      <div className="relative max-w-3xl mx-auto text-center">
        <Reveal>
          <h2 className="font-serif text-5xl sm:text-7xl leading-tight tracking-tight mb-8">
            Your machine is the<br />
            <span className="italic text-[#76B900] font-bold">test bench.</span>
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className={`mb-10 text-lg ${isDark ? "text-white/60" : "text-black/60"}`}>
            It's free, it's MIT, it runs offline, and it needs no accounts.
            Your first <code className="font-mono text-sm">benchmark_report.md</code> is two commands away.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CopyCommand cmd="pip install exportrace" isDark={isDark} />
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-full text-sm font-semibold bg-[#76B900] text-black hover:bg-[#85ce00] transition hover:scale-105"
            >
              Star on GitHub
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer({ isDark }: { isDark: boolean }) {
  return (
    <footer className={`border-t py-10 px-4 ${isDark ? "border-white/5" : "border-black/5"}`}>
      <div className={`max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${isDark ? "text-white/40" : "text-black/40"}`}>
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="logo-grad-footer" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#A3E635" />
                  <stop offset="100%" stopColor="#76B900" />
                </linearGradient>
              </defs>
              <path d="M6 8L16 16L6 24" stroke="url(#logo-grad-footer)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 8L26 16L16 24" stroke="url(#logo-grad-footer)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
            </svg>
            <span>exportrace — MIT licensed</span>
          </div>
          <span className="hidden sm:inline opacity-30">|</span>
          <div className="flex items-center gap-2">
            <span>Built by <a href="https://github.com/Py528" target="_blank" rel="noopener noreferrer" className="hover:text-[#76B900] underline underline-offset-2 transition-colors">Pranaav Shinde</a></span>
            <div className="flex items-center gap-2 ml-1">
              <a href="https://x.com/Pranaav2412" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="hover:text-[#76B900] transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="https://www.linkedin.com/in/pranaavshinde/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[#76B900] transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="flex gap-6">
          <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 opacity-70">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
