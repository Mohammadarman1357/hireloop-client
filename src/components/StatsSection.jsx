
"use client";

const stats = [
  {
    value: "50K",
    label: "Active Jobs",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <rect x="4" y="7" width="14" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <circle cx="17" cy="17" r="4" />
        <path d="m20 20 2 2" />
      </svg>
    ),
  },
  {
    value: "12K",
    label: "Companies",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M3 21V10h7v11" />
        <path d="M10 21V4h7v17" />
        <path d="M17 13h4v8h-4" />
        <path d="M6 14h1M6 17h1M13 8h1M13 12h1M13 16h1" />
      </svg>
    ),
  },
  {
    value: "2M",
    label: "Job Seekers",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <circle cx="10" cy="10" r="8" />
        <circle cx="10" cy="8" r="2.5" />
        <path d="M5.5 15a5 5 0 0 1 9 0" />
        <path d="m16 16 5 5" />
      </svg>
    ),
  },
  {
    value: "97%",
    label: "Satisfaction Rate",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="m12 3 2.2 5.1 5.5.5-4.2 3.7 1.3 5.4-4.8-2.9-4.8 2.9 1.3-5.4-4.2-3.7 5.5-.5L12 3Z" />
      </svg>
    ),
  },
];

export default function StatsSection() {
  return (
    <section className="relative isolate min-h-[700px] w-full overflow-hidden bg-black text-white">

      {/* Globe Background - Updated */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-90"
        style={{
          backgroundImage: "url('/images/globe.png')",
        }}
      />

      {/* Dark Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-black/40"
      />

      {/* Purple Atmospheric Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[25%] z-[2] h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-violet-600/30 blur-[140px]"
      />

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 sm:px-8">

        {/* Headline */}
        <div className="relative z-10 pt-[270px] text-center sm:pt-[285px]">
          <h2 className="mx-auto max-w-[650px] text-[25px] font-normal leading-[1.35] tracking-tight text-white/75 sm:text-[30px] lg:text-[40px]">
            Assisting over{" "}
            <span className="font-medium text-white">
              15,000 job seekers
            </span>
            <br />
            find their dream positions.
          </h2>
        </div>

        {/* Statistics Cards */}
        <div className="relative z-20 mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:absolute lg:left-1/2 lg:top-[410px] lg:mt-0 lg:w-[calc(100%-80px)] lg:max-w-[1040px] lg:-translate-x-1/2 lg:grid-cols-4 lg:gap-5">

          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group flex min-h-[175px] flex-col justify-between rounded-[13px] border border-white/[0.09] bg-gradient-to-br from-[#050505] via-[#0c0c0c] to-[#1b1b1b] p-5 transition-all duration-300 hover:border-[#6054ff]/40 hover:shadow-[0_0_30px_rgba(96,84,255,0.12)] sm:min-h-[190px] sm:p-5 lg:h-[200px] lg:min-h-0 lg:p-[19px]"
            >
              {/* Icon */}
              <div className="text-white transition-transform duration-300 group-hover:-translate-y-1">
                {stat.icon}
              </div>

              {/* Statistic */}
              <div className="space-y-2">
                <h3 className="text-[42px] font-medium leading-none tracking-tight text-white sm:text-[46px] lg:text-[48px]">
                  {stat.value}
                </h3>

                <p className="text-[13px] font-normal text-white/90 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>

    </section>
  );
}
