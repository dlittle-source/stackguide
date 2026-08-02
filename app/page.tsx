"use client";

import { useState } from "react";

type Question = {
  id: string;
  title: string;
  options: string[];
};

type Recommendation = {
  category: string;
  choice: string;
  reason: string;
};

const questions: Question[] = [
  {
    id: "projectType",
    title: "What are you building?",
    options: [
      "Business Website",
      "SaaS Application",
      "E-commerce Application",
      "Internal Business Tool",
      "AI Application",
      "Portfolio Project",
    ],
  },
  {
    id: "experience",
    title: "What is your experience level?",
    options: ["Beginner", "Intermediate", "Advanced"],
  },
  {
    id: "teamSize",
    title: "How large is your team?",
    options: ["Solo Developer", "2–5 People", "More Than 5 People"],
  },
  {
    id: "traffic",
    title: "What traffic level do you expect?",
    options: ["Small", "Medium", "Large"],
  },
  {
    id: "budget",
    title: "What is your budget?",
    options: ["Free or Minimal", "Moderate", "Enterprise"],
  },
  {
    id: "priority",
    title: "What matters most?",
    options: [
      "Fastest Development",
      "Lowest Cost",
      "Scalability",
      "Simplicity",
      "Enterprise Readiness",
    ],
  },
];

function generateRecommendations(
  answers: Record<string, string>,
): Recommendation[] {
  const {
    projectType,
    experience,
    teamSize,
    traffic,
    budget,
    priority,
  } = answers;

  let frontend = "Next.js";
  let frontendReason =
    "A practical React framework with routing, strong performance, and straightforward deployment.";

  let backend = "Next.js API Routes";
  let backendReason =
    "Keeps the MVP simple by combining the frontend and backend in one codebase.";

  let database = "PostgreSQL";
  let databaseReason =
    "A reliable relational database that works well for most business applications.";

  let authentication = "Clerk";
  let authenticationReason =
    "Provides fast authentication setup without requiring a custom identity system.";

  let hosting = "Vercel";
  let hostingReason =
    "Offers simple deployment and works especially well with Next.js applications.";

  let cloud = "Vercel Managed Platform";
  let cloudReason =
    "Reduces infrastructure management so the team can focus on shipping the product.";

  let cicd = "GitHub Actions + Vercel";
  let cicdReason =
    "Supports automated testing and deployment whenever code is pushed.";

  let containers = "Not Required Initially";
  let containersReason =
    "Avoiding containers reduces complexity for an early-stage project.";

  let architecture = "Modular Monolith";
  let architectureReason =
    "Provides clear separation of concerns without the operational overhead of microservices.";

  if (projectType === "Business Website") {
    backend = "Next.js Server Components";
    backendReason =
      "A content-focused business website usually does not need a separate backend service.";
    database = "No Database Initially";
    databaseReason =
      "A database can be avoided unless the site needs forms, accounts, or dynamic content.";
    authentication = "Not Required";
    authenticationReason =
      "Most public business websites do not need user authentication.";
  }

  if (projectType === "E-commerce Application") {
    backend = "Next.js + Shopify";
    backendReason =
      "Shopify handles commerce operations while Next.js provides a customizable storefront.";
    database = "Shopify Managed Data";
    databaseReason =
      "Using the commerce platform's managed data model avoids rebuilding product and order systems.";
    authentication = "Shopify Customer Accounts";
    authenticationReason =
      "Built-in customer account features reduce custom identity work.";
  }

  if (projectType === "AI Application") {
    backend = "FastAPI";
    backendReason =
      "Python and FastAPI integrate well with AI libraries, models, and data-processing workflows.";
    database = "PostgreSQL + pgvector";
    databaseReason =
      "Supports standard application data and vector similarity search in one database.";
    hosting = "Render";
    hostingReason =
      "Provides a straightforward deployment path for Python APIs and background services.";
    cloud = "AWS";
    cloudReason =
      "Offers a broad set of AI, compute, storage, and observability services as the application grows.";
    containers = "Docker";
    containersReason =
      "Containers provide a consistent environment for Python dependencies and AI workloads.";
  }

  if (projectType === "Internal Business Tool") {
    authentication = "Microsoft Entra ID";
    authenticationReason =
      "Enterprise teams can use their existing corporate identities and access controls.";
    hosting = "Azure App Service";
    hostingReason =
      "A managed application platform is a practical fit for many internal enterprise tools.";
    cloud = "Microsoft Azure";
    cloudReason =
      "Azure integrates well with Microsoft identity, governance, and enterprise environments.";
  }

  if (
    experience === "Beginner" ||
    priority === "Simplicity" ||
    priority === "Fastest Development"
  ) {
    backend = projectType === "AI Application" ? backend : "Next.js API Routes";
    backendReason =
      projectType === "AI Application"
        ? backendReason
        : "A single full-stack framework reduces the number of technologies that must be learned.";
    authentication =
      projectType === "Business Website" ? authentication : "Supabase Auth";
    authenticationReason =
      projectType === "Business Website"
        ? authenticationReason
        : "Supabase Auth provides a simple setup and integrates with a managed PostgreSQL database.";
    database =
      projectType === "Business Website" ? database : "Supabase PostgreSQL";
    databaseReason =
      projectType === "Business Website"
        ? databaseReason
        : "A managed database reduces setup time while preserving the strengths of PostgreSQL.";
  }

  if (budget === "Free or Minimal" || priority === "Lowest Cost") {
    hosting = projectType === "AI Application" ? "Render" : "Vercel";
    hostingReason =
      "The selected platform offers a practical low-cost path for validating an MVP.";
    cloud = "Managed Free-Tier Services";
    cloudReason =
      "Using managed free-tier services avoids unnecessary infrastructure costs during validation.";
    containers =
      projectType === "AI Application" ? "Docker" : "Not Required Initially";
    containersReason =
      projectType === "AI Application"
        ? "Docker keeps the Python runtime and model dependencies consistent."
        : "Skipping containers avoids extra infrastructure and deployment complexity.";
  }

  if (
    traffic === "Large" ||
    priority === "Scalability" ||
    priority === "Enterprise Readiness" ||
    budget === "Enterprise"
  ) {
    backend =
      projectType === "AI Application" ? "FastAPI Services" : "Node.js API";
    backendReason =
      "A dedicated backend service provides clearer scaling, security, and operational boundaries.";
    database = "Amazon Aurora PostgreSQL";
    databaseReason =
      "Provides managed PostgreSQL compatibility with high availability and scalable performance.";
    authentication = "Amazon Cognito";
    authenticationReason =
      "Supports managed identity, federation, and scalable user authentication.";
    hosting = "AWS ECS Fargate";
    hostingReason =
      "Runs containerized applications without requiring the team to manage servers.";
    cloud = "AWS";
    cloudReason =
      "Offers mature services for networking, security, scalability, and production operations.";
    cicd = "GitHub Actions + AWS";
    cicdReason =
      "Automates testing, container builds, security checks, and production deployments.";
    containers = "Docker";
    containersReason =
      "Containers provide repeatable application packaging across development and production.";
    architecture =
      teamSize === "More Than 5 People"
        ? "Service-Oriented Architecture"
        : "Modular Monolith";
    architectureReason =
      teamSize === "More Than 5 People"
        ? "Larger teams benefit from clearer service ownership while avoiding premature microservices."
        : "A modular monolith supports growth without introducing unnecessary distributed-system complexity.";
  }

  return [
    { category: "Frontend", choice: frontend, reason: frontendReason },
    { category: "Backend", choice: backend, reason: backendReason },
    { category: "Database", choice: database, reason: databaseReason },
    {
      category: "Authentication",
      choice: authentication,
      reason: authenticationReason,
    },
    { category: "Hosting", choice: hosting, reason: hostingReason },
    { category: "Cloud Platform", choice: cloud, reason: cloudReason },
    { category: "CI/CD", choice: cicd, reason: cicdReason },
    {
      category: "Container Strategy",
      choice: containers,
      reason: containersReason,
    },
    {
      category: "Architecture",
      choice: architecture,
      reason: architectureReason,
    },
  ];
}

export default function Home() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Recommendation[] | null>(null);
  const [copyStatus, setCopyStatus] = useState("");

  const question = questions[currentQuestion];
  const selectedAnswer = answers[question.id];
  const isLastQuestion = currentQuestion === questions.length - 1;

  function selectAnswer(option: string) {
    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [question.id]: option,
    }));
  }

  function goNext() {
    if (!selectedAnswer) return;

    if (isLastQuestion) {
      setResults(generateRecommendations(answers));
      return;
    }

    setCurrentQuestion((previousQuestion) => previousQuestion + 1);
  }

  function goBack() {
    if (currentQuestion > 0) {
      setCurrentQuestion((previousQuestion) => previousQuestion - 1);
    } else {
      setStarted(false);
    }
  }

  function startOver() {
    setStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setResults(null);
  }

  async function copyResults() {
    if (!results) return;

    const text = results
      .map(
        (item) =>
          `${item.category}: ${item.choice}\nWhy: ${item.reason}`,
      )
      .join("\n\n");

    const fullText = `My StackGuide Recommendation\n\n${text}`;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(fullText);
      } else {
        const textArea = document.createElement("textarea");

        textArea.value = fullText;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        textArea.setAttribute("readonly", "");

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        const copied = document.execCommand("copy");
        document.body.removeChild(textArea);

        if (!copied) {
          throw new Error("Clipboard copy failed.");
        }
      }

      setCopyStatus("Results copied!");
      window.setTimeout(() => setCopyStatus(""), 2500);
    } catch {
      setCopyStatus("Copy failed. Please try again.");
      window.setTimeout(() => setCopyStatus(""), 3000);
    }
  }

  if (results) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
        <section className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300">
              Your Recommendation
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-5xl">
              Your Recommended Tech Stack
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
              Based on your project goals, experience, budget, traffic, and
              technical priorities.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((item) => (
              <article
                key={item.category}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
              >
                <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
                  {item.category}
                </p>

                <h2 className="mt-3 text-2xl font-bold">{item.choice}</h2>

                <p className="mt-4 leading-7 text-slate-400">
                  {item.reason}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
            <div className="text-center">
              <button
                type="button"
                onClick={copyResults}
                className="rounded-xl bg-cyan-500 px-7 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Copy Results
              </button>

              {copyStatus && (
                <p
                  className="mt-3 text-sm font-medium text-cyan-300"
                  role="status"
                  aria-live="polite"
                >
                  {copyStatus}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={startOver}
              className="rounded-xl border border-slate-700 px-7 py-3 font-semibold text-slate-300 transition hover:border-slate-500"
            >
              Start Over
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (started) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-12 text-white">
        <section className="w-full max-w-3xl">
          <div className="mb-8">
            <div className="mb-3 flex items-center justify-between text-sm text-slate-400">
              <span>
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span>
                {Math.round(
                  ((currentQuestion + 1) / questions.length) * 100,
                )}
                % complete
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-cyan-400 transition-all"
                style={{
                  width: `${
                    ((currentQuestion + 1) / questions.length) * 100
                  }%`,
                }}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl md:p-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-400">
              StackGuide Assessment
            </p>

            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {question.title}
            </h1>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {question.options.map((option) => {
                const isSelected = selectedAnswer === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => selectAnswer(option)}
                    className={`rounded-xl border p-5 text-left font-medium transition ${
                      isSelected
                        ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                        : "border-slate-700 bg-slate-950 text-slate-200 hover:border-slate-500"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            <div className="mt-10 flex items-center justify-between">
              <button
                type="button"
                onClick={goBack}
                className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-slate-300 transition hover:border-slate-500"
              >
                Back
              </button>

              <button
                type="button"
                onClick={goNext}
                disabled={!selectedAnswer}
                className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isLastQuestion ? "Generate My Stack" : "Continue"}
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
        <span className="mb-6 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-cyan-400">
          StackGuide v1.0
        </span>

        <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight md:text-6xl">
          Choose the Right Tech Stack
          <span className="block text-cyan-400">in Minutes</span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
          Answer six simple questions and receive a practical technology stack
          recommendation tailored to your project.
        </p>

        <button
          type="button"
          onClick={() => setStarted(true)}
          className="mt-10 rounded-xl bg-cyan-500 px-8 py-4 text-lg font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          Start Assessment
        </button>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-24 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="mb-3 text-xl font-bold">🚀 Save Time</h2>
          <p className="text-slate-400">
            Stop spending hours researching frameworks and cloud platforms.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="mb-3 text-xl font-bold">
            🧩 Smart Recommendations
          </h2>
          <p className="text-slate-400">
            Get a curated technology stack based on your project goals.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="mb-3 text-xl font-bold">
            📈 Build with Confidence
          </h2>
          <p className="text-slate-400">
            Understand why each technology was recommended before you start
            building.
          </p>
        </div>
      </section>

      <footer className="border-t border-slate-800 py-8 text-center text-sm text-slate-500">
        StackGuide v1.0 • Built with Next.js, TypeScript & Tailwind CSS
      </footer>
    </main>
  );
}