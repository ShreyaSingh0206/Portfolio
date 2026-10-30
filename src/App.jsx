import { useEffect, useRef, useState } from "react";
import avatar from "./assets/avatar.png";

const GH = "https://github.com/ShreyaSingh0206";
const LINKEDIN = "https://www.linkedin.com/in/shreya-kumari0206/";
const EMAIL = "shreyakumari020611@gmail.com"; 
const PHONE = "+91 8757463449";
const LOCATION = "Bokaro, Jharkhand, India";
 
const EXPERIENCE = [
  {
    title: "Research intern, IIT (ISM) Dhanbad",
    date: "Summer 2026",
    text: "Built a multi-agent, multi-model early health risk prediction system. ANN, LSTM, SVM, XGBoost, Random Forest and Logistic Regression feed a meta-agent, and SHAP and counterfactual explanations show why each prediction was made.",
  },
  {
    title: "Web development intern, Labmentix",
    date: "Summer 2025", 
    text: "Worked on building responsive web interfaces using React and strengthened my understanding of frontend development, reusable components, and integrating APIs with web applications.", 
  },
];

const EDUCATION = [
  {
    title: "B.Tech, Information Technology",
    date: "Guru Ghasidas Vishwavidyalaya, 2023 to 2027",
    text: "Undergraduate degree in Information Technology. The full-stack projects below were built alongside it.",
  },
  {
    title: "Higher Secondary (Class 12)",
    date: "Crescent Public School, CBSE · 2022",
    text: "Percentage: 93.3%",
  },
  {
    title: "Secondary (Class 10)",
    date: "DAV Koriya, CBSE · 2020",
    text: "Percentage: 95.2%",
  },
];
 
const PROJECTS = [
  {
    title: "PaprAI",
    tag: "Research assistant",
    desc: "A research assistant built on retrieval-augmented generation, so answers are grounded in the papers you give it.",
    image: "paprAI.png", // e.g. "/screens/paprai.png" (file in public/screens/)
    stack: ["Python", "RAG", "Gemini"],
    links: [["GitHub", GH], ["Demo", "https://youtu.be/POsVPJtHpMM"]],
  },
  {
    title: "HireHatch",
    tag: "Freelancer marketplace",
    desc: "A full-stack marketplace where clients hire freelancers and freelancers sell gigs, with real-time chat and Stripe payments.",
    image: "freelancer.png",
    stack: ["Next.js", "React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Socket.IO", "Stripe", "Cloudinary"],
    links: [
      ["Live site", "https://freelancer-marketplace-client.vercel.app"],
      ["Frontend", GH + "/freelancer_marketplace_client"],
      ["Backend", GH + "/freelancer_marketplace_server"],
      ["Demo", "https://youtu.be/CKl-mPwfkQQ"],
    ],
  },
  {
    title: "Multi-Agent Health Prediction",
    tag: "Research at IIT (ISM) Dhanbad",
    desc: "A Streamlit dashboard that rates patient risk from vital signs and explains every prediction with SHAP. The ensemble reached 92.67% accuracy in my experiments.",
    image: "Multi-agent.png",
    stack: ["Python", "Streamlit", "scikit-learn", "XGBoost", "TensorFlow", "SHAP"],
    links: [["Code", GH + "/Multi-Agent-Early-Health-Prediction-System"]],
  },
  {
    title: "Document Signature App",
    tag: "PDF signing in the browser",
    desc: "Upload a PDF, preview it, and drag a signature onto exactly the right spot on the page.",
    image: "docusign.png",
    stack: ["React", "JavaScript", "PDF.js", "Multer", "Cloudinary", "Node.js", "Express"],
    links: [
      ["Live site", "https://document-signature-app-frontend-green.vercel.app"],
      ["Frontend", GH + "/Document_Signature_app_frontend"],
      ["Backend", GH + "/Document_Signature_app_backend"],
      ["Demo", "https://youtu.be/Quk01K6kmHU"],
    ],
  },
  {
    title: "Project Management App",
    tag: "Collaborative project management",
    desc: "A collaborative app for project planning, task assignment, and drag-and-drop workflow management.",
    image: "projectweaver.png",
    stack: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "JWT", "bcrypt", "@dnd-kit/core"], // TODO: add the rest of the stack
    links: [
    ["Live site", "https://project-management-app-coral.vercel.app"],
    ["Code", GH + "/project_management_app"], 
    ["Demo", "https://youtu.be/m78fXWZJGDY"]],
  },
];
 
const SKILLS = [
  ["Languages", ["C++", "Python", "C", "JavaScript", "SQL"]],
  ["Frontend", ["HTML5", "CSS3", "React.js", "Next.js", "Tailwind CSS"]],
  ["Backend", ["Node.js", "Express.js", "FastAPI", "REST APIs"]],
  ["Databases", ["PostgreSQL", "MySQL", "MongoDB"]],
  ["AI/ML", ["Machine Learning", "Deep Learning", "NLP", "LLMs", "RAG"]],
  ["Libraries & Tools", ["NumPy", "Pandas", "Matplotlib", "Scikit-learn", "TensorFlow", "Streamlit", "Git", "GitHub", "Postman"]],
];
 
/* ------------------------------------------------------------------ */
/* Scroll-driven avatar                                                */
/* ------------------------------------------------------------------ */
const FEET = 0.97;
const BUBBLE_IN = 0.3;
const RATIO = 650 / 1000; // avatar.webp width / height
const SECTIONS = ["top", "about", "experience", "education", "work", "skills", "contact"];
const CAPTIONS = [
  "Hi, I’m Shreya.",
  "Yes, this is me. Illustrated.",
  "From class to research lab.",
  "Where I studied.",
  "The code is all on GitHub.",
  "My everyday toolkit.",
  "Say hi.",
];
const DESKTOP = [
  [0.77, 0.56, 0.84, 0.5, 0, 1],
  [0.24, 0.5, 1.5, 0.2, -3, 1],
  [0.9, 0.64, 0.66, 0.5, 2, 0.9],
  [0.9, 0.66, 0.6, 0.5, -2, 0.9],
  [0.94, 0.8, 0.4, 0.5, 0, 0.4],
  [0.07, 0.74, 0.5, 0.5, -4, 0.35],
  [0.76, 0.58, 0.9, 0.5, 0, 1],
];
const MOBILE = [
  [0.76, 0.62, 0.6, 0.5, 0, 0.35],
  [0.8, 0.7, 0.55, 0.5, 0, 0.16],
  [0.8, 0.7, 0.55, 0.5, 0, 0.16],
  [0.8, 0.7, 0.55, 0.5, 0, 0.16],
  [0.8, 0.7, 0.55, 0.5, 0, 0.14],
  [0.8, 0.7, 0.55, 0.5, 0, 0.14],
  [0.76, 0.7, 0.7, 0.5, 0, 0.5],
];
 
function Avatar() {
  
  const figure = useRef(null);
  const bubble = useRef(null);
  const floor = useRef(null);
 
  useEffect(() => {
    const els = SECTIONS.map((id) => document.getElementById(id));
    let tops = [];
    let vw = 0;
    let vh = 0;
    const measure = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
      tops = els.map((e) => e.getBoundingClientRect().top + window.scrollY);
    };
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
 
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lerp = (a, b, t) => a + (b - a) * t;
    const smooth = (x) => x * x * (3 - 2 * x);
    let current = null;
    let lastY = window.scrollY;
    let velocity = 0;
    let caption = -1;
    let raf;
 
    const frame = () => {
      const y = window.scrollY;
      const probe = y + vh * 0.55;
      velocity = lerp(velocity, y - lastY, 0.2);
      lastY = y;
 
      let i = 0;
      while (i < tops.length - 1 && probe >= tops[i + 1]) i++;
      const next = Math.min(i + 1, tops.length - 1);
      const span = tops[next] - tops[i] || 1;
      // hold the pose for most of a section, then glide to the next one
      const t = smooth(Math.min(1, Math.max(0, ((probe - tops[i]) / span - 0.65) / 0.35)));
 
      const table = vw < 760 ? MOBILE : DESKTOP;
      const target = table[i].map((v, k) => lerp(v, table[next][k], t));
      current = current && !reduce ? current.map((v, k) => lerp(v, target[k], 0.12)) : target;
 
      const [cx, cy, h, fy, rot, op] = current;
      const H = h * vh;
      const W = H * RATIO;
      const x = cx * vw - W / 2;
      const top = cy * vh - fy * H;
      const tilt = reduce ? 0 : Math.max(-6, Math.min(6, velocity * 0.12));
 
      const f = figure.current;
      f.style.width = `${W}px`;
      f.style.height = `${H}px`;
      f.style.transform = `translate3d(${x}px,${top}px,0) rotate(${rot + tilt}deg)`;
      f.style.opacity = vw < 1100 && vw >= 760 ? op * 0.7 : op;
 
      const b = bubble.current;
      const onLeft = cx < 0.5;
      b.style.transform = `translate3d(${onLeft ? x + W * (1 - BUBBLE_IN) : x + W * BUBBLE_IN}px,${Math.max(76, Math.min(vh - 60, top + H * 0.06))}px,0) translateX(${onLeft ? 0 : -100}%)`;
      b.style.borderRadius = onLeft ? "14px 14px 14px 3px" : "14px 14px 3px 14px";
      b.style.opacity = vw >= 760 && op > 0.5 ? 1 : 0;
      if (caption !== i) {
        caption = i;
        b.textContent = CAPTIONS[i];
      }
 
      // lime floor under her feet, fades out as you scroll away from the hero
      const fo = Math.max(0, 1 - y / (vh * 0.45));
      const FW = Math.min(H * 0.55, 420);
      const FH = FW * 0.3;
      const fl = floor.current;
      fl.style.width = `${FW}px`;
      fl.style.height = `${FH}px`;
      fl.style.opacity = fo * Math.min(1, op);
    fl.style.transform = `translate3d(${cx * vw - FW / 2}px,${top + H * FEET - FH / 2}px,0) scale(${0.85 + 0.15 * fo})`;
 
      raf = requestAnimationFrame(frame);
    };
    frame();
 
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
    };
  }, []);
 
  return (
    <>
      {/* floor */}
      <div
        ref={floor}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-0 rounded-[50%] opacity-0 will-change-transform bg-[radial-gradient(ellipse_at_50%_50%,rgba(190,255,70,.95)_0%,rgba(150,240,50,.55)_40%,rgba(120,220,40,0)_72%)]"
      >
        {/* glow that rises to roughly her knees */}
        <div className="absolute inset-x-[14%] bottom-1/2 h-[150%] rounded-[50%_50%_0_0/100%_100%_0_0] bg-gradient-to-t from-[rgba(190,255,70,.26)] to-[rgba(190,255,70,0)] blur-[10px]" />
        <div className="absolute inset-x-[8%] inset-y-[10%] rounded-[50%] border-[1.5px] border-[rgba(210,255,120,.6)]" />
      </div>
 
      <div ref={figure} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[1] opacity-0 will-change-transform">
        <img
          src={avatar}
          alt=""
          draggable="false"
          className="block h-full w-full"
          style={{ animation: "reveal 1.3s .3s cubic-bezier(.7,0,.2,1) both" }}
        />
      </div>
 
      <div
        ref={bubble}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[3] whitespace-nowrap bg-[#2150ff] px-3.5 py-2 text-[.92rem] font-semibold text-white transition-opacity duration-500"
      />
    </>
  );
}
 
/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */
const wrap = "mx-auto w-full max-w-[1120px] px-5 sm:px-12";
const sectionPad = "py-24 md:py-36";
 
function useInView(threshold = 0.4) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setShown(true);
        io.disconnect();
      }
    }, { threshold });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, shown];
}
 
function Heading({ children }) {
  const [ref, shown] = useInView();
  return (
    <h2 ref={ref} className="mb-10 font-['Syne'] text-[length:clamp(2rem,5vw,3.4rem)] font-extrabold leading-[1.08] tracking-[-0.03em]">
      <span className="block overflow-hidden pb-[.12em]">
        <span className={`block transition-transform duration-[800ms] ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-none ${shown ? "translate-y-0" : "translate-y-[105%]"}`}>
          {children}
        </span>
      </span>
    </h2>
  );
}
 
/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [["About", "#about"], ["Experience", "#experience"], ["Education", "#education"], ["Projects", "#work"], ["Skills", "#skills"], ["Contact", "#contact"]];
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#1a2a66] bg-[#05080f] pt-[env(safe-area-inset-top)]">
      <div className={`${wrap} flex h-14 items-center justify-between`}>
        <a href="#top" className="font-['Syne'] text-[1.1rem] font-extrabold">Shreya</a>
        <div className="hidden gap-7 md:flex">
          {links.map(([name, href]) => (
            <a key={href} href={href} className="text-[.95rem] font-medium text-[#8e9cc9] transition-colors hover:text-[#e8eeff]">{name}</a>
          ))}
        </div>
        <button type="button" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center md:hidden">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="border-t border-[#1a2a66] bg-[#05080f] md:hidden">
          <div className={`${wrap} flex flex-col py-2`}>
            {links.map(([name, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="py-3 font-medium text-[#8e9cc9] hover:text-[#e8eeff]">{name}</a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
 
function Hero() {
  return (
    <header id="top" className="flex min-h-svh items-center pb-24 pt-28">
      <div className={`${wrap} lg:max-w-[1120px]`}>
        <div className="lg:max-w-[min(58%,720px)]">
          <p className="mb-4 font-medium text-[#9cf5b4]">Software developer · B.Tech Information Technology</p>
          <h1
            aria-label="Shreya Kumari"
            className="font-['Syne'] text-[length:clamp(2.8rem,6.2vw,6rem)] font-extrabold leading-[.95] tracking-[-0.04em]"
          >
            {["Shreya", "Kumari."].map((word, i) => (
              <span key={word} aria-hidden="true" className="block overflow-x-visible overflow-y-clip pb-[.08em]">
                <span className="block" style={{ animation: `rise 1s ${0.15 + i * 0.18}s cubic-bezier(.2,.8,.2,1) both` }}>
                  {word}
                </span>
              </span>
            ))}
          </h1>
          <p className="my-7 max-w-[44ch] text-[1.2rem]">
            I build thoughtful digital experiences, from full-stack applications to AI-powered systems, turning complex ideas into practical, user-focused solutions.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#work" className="rounded-full border-2 border-[#2150ff] bg-[#2150ff] px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:border-[#9cf5b4] hover:bg-[#9cf5b4] hover:text-[#05080f]">
              See my projects
            </a>
           
<a
  href="#contact"
  className="rounded-full border-2 border-[#e8eeff] px-5 py-3 font-semibold transition hover:-translate-y-0.5 hover:bg-[#e8eeff] hover:text-[#05080f]"
>
  Contact me
</a>

<a
  href="/resume.pdf"
  download="Shreya_Kumari_Resume.pdf"
  className="rounded-full border-2 border-[#e8eeff] px-5 py-3 font-semibold transition hover:-translate-y-0.5 hover:border-[#9cf5b4] hover:bg-[#9cf5b4] hover:text-[#05080f]"
>
  Download resume
</a>

          </div>
        </div>
      </div>
    </header>
  );
}
 
function About() {
  return (
    <section id="about" className={sectionPad}>
      <div className={`${wrap} lg:pl-[calc(46%+24px)]`}>
        <Heading>About me</Heading>
        <p className="mb-4 max-w-[54ch]">
          I’m a final-year B.Tech student in Information Technology at Guru Ghasidas Vishwavidyalaya. I like building a product end to end: the interface, the API, and user-friendly experiences that solve real-world problems.
        </p>
        <p className="max-w-[54ch]">
          This summer I did research at IIT (ISM) Dhanbad on a multi-agent early health prediction system, where every prediction comes with a SHAP explanation. It taught me to care about why software gives the answer it does.
        </p>
      </div>
    </section>
  );
}
 
function Timeline({ id, heading, items }) {
  const list = useRef(null);
  const [on, setOn] = useState(() => items.map(() => false));

  useEffect(() => {
    const update = () => {
      const el = list.current;
      const vh = window.innerHeight;
      const box = el.getBoundingClientRect();
      el.style.setProperty("--p", Math.min(1, Math.max(0, (vh * 0.65 - box.top) / box.height)));
      setOn([...el.querySelectorAll("[data-ev]")].map((e) => e.getBoundingClientRect().top < vh * 0.65));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section id={id} className={sectionPad}>
      <div className={wrap}>
        <Heading>{heading}</Heading>
        <div ref={list} className="relative pl-9">
          <div className="absolute bottom-1.5 left-[5px] top-1.5 w-0.5 bg-[#1a2a66]" />
          <div className="absolute left-[5px] top-1.5 w-0.5 bg-[#9cf5b4] h-[calc((100%_-_12px)*var(--p,0))]" />
          {items.map((e, i) => (
            <div key={e.title} data-ev className="relative pb-12 last:pb-0">
              <span className={`absolute -left-9 top-[9px] h-3 w-3 rounded-full border-2 transition-all duration-500 ${on[i] ? "scale-125 border-[#9cf5b4] bg-[#9cf5b4]" : "border-[#1a2a66] bg-[#05080f]"}`} />
              <h3 className="font-['Syne'] text-[1.4rem] font-semibold">{e.title}</h3>
              {e.date && <small className="mb-2.5 mt-0.5 block text-[#8e9cc9]">{e.date}</small>}
              {e.text && <p className="max-w-[62ch]">{e.text}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
 
 
function Skills() {
  const outer = useRef(null);
  const track = useRef(null);
  const bar = useRef(null);

  useEffect(() => {
    const lamps = [...track.current.querySelectorAll("[data-lamp]")];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let vw = 0, vh = 0, dist = 0, lastH = 0, centers = [], lastY = window.scrollY, vel = 0, raf = 0;

    const measure = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
      dist = Math.max(0, track.current.offsetWidth - vw);
      centers = lamps.map((l) => l.offsetLeft + l.offsetWidth / 2);
      const h = Math.round(vh + dist);
      if (h !== lastH) {
        lastH = h;
        outer.current.style.height = `${h}px`;
        window.dispatchEvent(new Event("resize")); // let the avatar re-measure the page
      }
    };

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      const y = window.scrollY;
      vel = vel * 0.85 + (y - lastY) * 0.15; // smoothed scroll speed
      lastY = y;
      const r = outer.current.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return; // off screen, skip the work

      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - vh)));
      const x = -p * dist; 
      track.current.style.transform = `translate3d(${x}px,0,0)`;
      bar.current.style.transform = `scaleX(${p})`;

      const boost = Math.min(1, Math.abs(vel) / 25);
      const sway = reduce ? 0 : Math.max(-9, Math.min(9, vel * 0.5)) + Math.sin(now / 900) * 1.2;
      track.current.style.setProperty("--sw", sway.toFixed(2));
      lamps.forEach((l, i) => {
        const c = (centers[i] + x - vw / 2) / vw;
        const d = Math.min(1, Math.abs(c) * 1.3);
        // lamps glow brightest near the middle of the screen, and a little more while you scroll
        l.style.setProperty("--g", Math.min(1, 0.3 + 0.7 * (1 - d) + 0.25 * boost * (1 - d)).toFixed(2));
      });
    };

    measure();
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
    };
  }, []);

  return (
    <section id="skills" ref={outer} className="relative">
      <div className="sticky top-0 h-screen overflow-clip">
        <div className={`${wrap} pointer-events-none absolute inset-x-0 top-[72px] z-10`}>
          <Heading>Skills</Heading>
        </div>

        <div ref={track} className="relative flex h-full w-max flex-row items-end px-[4vw] pb-24 will-change-transform">
          <div className="absolute inset-x-0 bottom-0 h-24 border-t border-white/20 bg-gradient-to-b from-[#0b1330]/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-14 h-0.5 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,.22)_0_28px,transparent_28px_64px)]" />

          {SKILLS.map(([group, items]) => (
            <div key={group} data-lamp className="relative h-[max(520px,66vh)] w-[max(380px,42vw)] flex-none">
              {/* light cone */}
              <div className="absolute bottom-0 left-1/2 top-[58px] w-[min(320px,86%)] -translate-x-1/2" style={{ opacity: "var(--g,.5)" }}>
                <div className="h-full w-full animate-[lamp_3.2s_ease-in-out_infinite] bg-gradient-to-b from-[rgba(190,255,70,.34)] to-[rgba(190,255,70,.03)] [clip-path:polygon(44%_0,56%_0,100%_100%,0_100%)]" />
              </div>
              {/* glow around the bulb */}
              <div className="absolute left-1/2 top-[14px] h-28 w-28 -translate-x-1/2" style={{ opacity: "var(--g,.5)" }}>
                <div className="h-full w-full animate-[lamp_3.2s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,rgba(190,255,70,.8),transparent_65%)]" />
              </div>
              {/* light pool on the road */}
              <div className="absolute -bottom-3 left-1/2 h-8 w-[min(300px,90%)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(190,255,70,.5),transparent_70%)]" style={{ opacity: "var(--g,.5)" }} />

              {/* pole and base */}
              <div className="absolute bottom-0 left-1/2 top-[62px] w-2 -translate-x-1/2 bg-gradient-to-r from-[#16224d] via-[#3c4f8f] to-[#16224d]" />
              <div className="absolute bottom-0 left-1/2 h-3 w-9 -translate-x-1/2 rounded-sm bg-[#1d2d66]" />

              {/* lantern */}
              <div className="absolute left-1/2 top-0 flex -translate-x-1/2 flex-col items-center">
                <div className="h-2 w-1 bg-[#2a3a78]" />
                <div className="h-4 w-14 bg-[#1d2d66] [clip-path:polygon(18%_0,82%_0,100%_100%,0_100%)]" />
                <div className="h-9 w-10 rounded-b-md bg-[radial-gradient(circle,#f4ffe0_0%,#c6ff6b_45%,#7bd83a_100%)] shadow-[0_0_30px_8px_rgba(190,255,70,.5)]" />
                <div className="h-2 w-12 rounded-sm bg-[#1d2d66]" />
              </div>

              {/* category name, like a street-name sign */}
              <div className="absolute left-1/2 top-[84px] -translate-x-1/2 whitespace-nowrap rounded-sm bg-[#9cf5b4] px-4 py-1.5 font-['Syne'] text-[.85rem] font-extrabold text-[#05080f] shadow-[0_0_18px_rgba(156,245,180,.35)]">
                {group}
              </div>

              {/* skills as signs, alternating left and right */}
              <div className="absolute inset-x-0 top-[134px]">
                {items.map((s, j) => {
                  const left = j % 2 === 0;
                  return (
                    <div key={s} className="relative h-[38px]">
                      <span className={`absolute top-1/2 h-0.5 w-4 -translate-y-1/2 bg-[#4a5b8c] ${left ? "right-1/2" : "left-1/2"}`} />
                      <span
                        className={`absolute top-1/2 whitespace-nowrap rounded-md border border-[#2150ff]/70 bg-[#0b1330] px-3 py-1 text-[.85rem] font-semibold text-[#e8eeff] shadow-[0_6px_16px_-6px_rgba(0,0,0,.8)] ${left ? "right-[calc(50%+1rem)]" : "left-[calc(50%+1rem)]"}`}
                        style={{
                          transformOrigin: left ? "100% 50%" : "0% 50%",
                          transform: `translateY(-50%) rotate(calc(var(--sw,0) * ${left ? 1 : -1} * 1deg))`,
                        }}
                      >
                        {s}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className={`${wrap} absolute inset-x-0 bottom-6`}>
          <div className="h-0.5 w-full bg-white/10">
            <div ref={bar} className="h-full origin-left bg-[#9cf5b4]" style={{ transform: "scaleX(0)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p }) {
  return (
    <article className="relative w-[min(80vw,480px)] flex-none overflow-hidden rounded-3xl border border-white/15 bg-white/[.06] p-4 shadow-[0_24px_60px_-24px_rgba(0,0,0,.9),inset_0_1px_0_rgba(255,255,255,.2)] backdrop-blur-2xl will-change-transform sm:p-5">
      {/* light sheen that slides across the glass as you scroll */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_var(--sx,50%)_0%,rgba(255,255,255,.16),transparent_55%)]" />
      <div className="relative">
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-[#0b1330]/70">
          {p.image ? (
            <img data-shot src={p.image} alt={`${p.title} screenshot`} className="h-full w-full object-cover" />
          ) : (
            <div data-shot className="grid h-full w-full place-items-center bg-[linear-gradient(135deg,rgba(33,80,255,.25),rgba(156,245,180,.12))] text-sm text-[#8e9cc9]">
              Screenshot (16:9)
            </div>
          )}
          <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[.8rem] font-semibold backdrop-blur-md">
            {p.tag}
          </span>
        </div>
        <h3 className="mt-4 font-['Instrument_Sans'] text-[1.35rem] font-semibold leading-tight tracking-[-0.01em]">{p.title}</h3>
        <p className="mt-1.5 text-[.95rem] leading-snug text-[#b3c0e6]">{p.desc}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
  {p.stack.map((s) => (
    <li key={s} className="rounded-full border border-white/15 bg-white/[.07] px-2.5 py-0.5 text-[.8rem] font-semibold text-[#cdd7ff]">{s}</li>
  ))}
</ul>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.links.map(([name, href], i) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-full px-3.5 py-1.5 text-[.9rem] font-semibold transition hover:-translate-y-0.5 ${
                i === 0 ? "bg-[#2150ff] text-white hover:bg-[#9cf5b4] hover:text-[#05080f]" : "border border-white/25 hover:bg-white hover:text-[#05080f]"
              }`}
            >
              {name}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

function Projects() {
  const outer = useRef(null);
  const track = useRef(null);
  const bar = useRef(null);
  const blobs = useRef([]);

  useEffect(() => {
    const cards = [...track.current.children];
    const shots = cards.map((c) => c.querySelector("[data-shot]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let vw = 0, vh = 0, dist = 0, lastH = 0, centers = [], raf = 0;

    const update = () => {
      raf = 0;
      const r = outer.current.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - vh)));
      const x = -p * dist;
      track.current.style.transform = `translate3d(${x}px,0,0)`;
      bar.current.style.transform = `scaleX(${p})`;
      blobs.current[0].style.transform = `translate3d(${p * -260}px,${p * 60}px,0)`;
      blobs.current[1].style.transform = `translate3d(${p * 320}px,${p * -80}px,0)`;
      cards.forEach((card, i) => {
        const c = (centers[i] + x - vw / 2) / vw; // 0 = centred, ±1 = a full screen away
        const d = Math.min(1, Math.abs(c) * 1.5);
        card.style.setProperty("--sx", `${50 - c * 70}%`);
        if (!reduce) {
          card.style.transform = `perspective(1200px) rotateY(${-c * 16}deg) scale(${1 - d * 0.1})`;
          card.style.opacity = 1 - d * 0.5;
          shots[i].style.transform = `translate3d(${-c * 50}px,0,0) scale(1.18)`;
        }
      });
    };

    const measure = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
      dist = Math.max(0, track.current.offsetWidth - vw);
      centers = cards.map((c) => c.offsetLeft + c.offsetWidth / 2);
      const h = Math.round(vh + dist); // vertical scroll distance = sideways distance
      if (h !== lastH) {
        lastH = h;
        outer.current.style.height = `${h}px`;
        window.dispatchEvent(new Event("resize")); // let the avatar re-measure the page
      }
      update();
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
    };
  }, []);

  const side = "max(1.25rem,calc((100vw - 1120px) / 2 + 3rem))";

  return (
    <section id="work" ref={outer} className="relative">
      <div className="sticky top-0 h-screen overflow-clip">
        {/* colour behind the glass so the blur has something to show */}
        <div ref={(el) => (blobs.current[0] = el)} className="pointer-events-none absolute -left-[10vw] top-[25%] h-[45vw] max-h-[560px] w-[45vw] max-w-[560px] rounded-full bg-[#2150ff]/40 blur-[90px]" />
        <div ref={(el) => (blobs.current[1] = el)} className="pointer-events-none absolute bottom-[10%] right-[5vw] h-[30vw] max-h-[380px] w-[30vw] max-w-[380px] rounded-full bg-[#9cf5b4]/25 blur-[90px]" />

        <div className={`${wrap} pointer-events-none absolute inset-x-0 top-[72px] z-10`}>
          <Heading>Projects</Heading>
        </div>

        <div ref={track} className="flex h-full w-max items-center gap-8 pb-10 pt-24 will-change-transform" style={{ paddingLeft: side, paddingRight: side }}>
          {PROJECTS.map((p) => <ProjectCard key={p.title} p={p} />)}
        </div>

        <div className={`${wrap} absolute inset-x-0 bottom-8`}>
          <div className="h-0.5 w-full bg-white/10">
            <div ref={bar} className="h-full origin-left bg-[#9cf5b4]" style={{ transform: "scaleX(0)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({icon, label, value, href, external}) {
  const body = (
    <>
      <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-[#9cf5b4]/15 text-[#9cf5b4]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {icon}
        </svg>
      </span>
      <span className="min-w-0">
        <span className="block text-[.8rem] text-[#8e9cc9]">{label}</span>
        <span className="block break-words font-semibold">{value}</span>
      </span>
    </>
  );
  const cls = "flex items-center gap-4 rounded-2xl border border-white/15 bg-white/[.06] px-4 py-3 backdrop-blur-xl";
    return href ? (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${cls} transition hover:-translate-y-0.5 hover:border-[#9cf5b4]/60`}
    >
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}

function Contact() {
  return (
    <section id="contact" className={sectionPad}>
      <div className={wrap}>
        <div className="lg:max-w-[min(54%,640px)]">
          <Heading>Let’s talk</Heading>
          <p className="mb-6">I’m open to software development internships. Email, phone or LinkedIn all work.</p>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="break-words bg-[linear-gradient(#9cf5b4,#9cf5b4)] bg-[length:0_.12em] bg-[position:0_100%] bg-no-repeat font-['Syne'] text-[length:clamp(1.5rem,4.6vw,3.2rem)] font-extrabold leading-[1.15] tracking-[-0.03em] transition-[background-size] duration-500 hover:bg-[length:100%_.12em]"
          >
            linkedin.com/in/shreya-kumari0206
          </a>

          <div className="mt-10 grid gap-3 sm:max-w-[460px]">
            <ContactRow
  label="GitHub"
  value="github.com/ShreyaSingh0206"
  href={GH}
  external
  icon={<><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></>}
/>
            {EMAIL && (
              <ContactRow
                label="Email"
                value={EMAIL}
                href={`mailto:${EMAIL}`}
                icon={<><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></>}
              />
            )}
            {PHONE && (
              <ContactRow
                label="Phone"
                value={PHONE}
                href={`tel:${PHONE.replace(/[^\d+]/g, "")}`}
                icon={<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />}
              />
            )}
            {LOCATION && (
              <ContactRow
                label="Location"
                value={LOCATION}
                icon={<><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>}
              />
            )}
          </div>

          
        </div>
      </div>
    </section>
  );
}
 
/* ------------------------------------------------------------------ */
/* App                                                                 */
/* ------------------------------------------------------------------ */
export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#05080f] font-['Instrument_Sans'] text-[1.06rem] leading-[1.65] text-[#e8eeff]">
      {/* keyframes and global bits Tailwind utilities don't cover */}
      <style>{`
        html{scroll-behavior:smooth;scroll-padding-top:60px}
        a:focus-visible,button:focus-visible{outline:3px solid #9cf5b4;outline-offset:3px}
        @keyframes reveal{from{clip-path:inset(100% 0 0 0)}to{clip-path:inset(0)}}
        @keyframes rise{from{transform:translateY(105%)}}
        @keyframes lamp{0%,100%{opacity:.82}50%{opacity:1}}
        @media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}*{animation:none!important}}
      `}</style>
 
      {/* cobalt glow, fixed behind everything */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(60vw_50vh_at_88%_8%,rgba(33,80,255,.28),transparent_70%),radial-gradient(50vw_40vh_at_0%_100%,rgba(33,80,255,.18),transparent_70%)]"
      />
 
      <Nav />
      <Avatar />
 
      <main className="relative z-[2]">
        <Hero />
        <About />
        <Timeline id="experience" heading="Experience" items={EXPERIENCE} />
<Timeline id="education" heading="Education" items={EDUCATION} />
        <Projects />
        <Skills />
        <Contact />
      </main>
 
      <footer className="relative z-[2] pb-14 pt-9 text-[.95rem] text-[#8e9cc9]">
        <div className={wrap}>© Shreya Kumari</div>
      </footer>
    </div>
  );
}
 
