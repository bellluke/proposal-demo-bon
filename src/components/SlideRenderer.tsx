import type { Slide } from "@/data/slides";

function CoverSlide({ slide }: { slide: Slide }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-12 text-center">
      <p className="mb-6 text-sm font-medium tracking-widest text-primary uppercase">
        {slide.subtitle}
      </p>
      <h1 className="whitespace-pre-line text-4xl font-bold leading-tight text-text">
        {slide.title}
      </h1>
      {slide.meta && (
        <div className="mt-12 space-y-1 text-sm text-text-secondary">
          {Object.entries(slide.meta).map(([key, value]) => (
            <p key={key}>
              <span className="font-medium text-text">{key}</span>{" "}
              <span className="ml-2">{value}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function BulletsSlide({ slide }: { slide: Slide }) {
  return (
    <div className="flex h-full flex-col justify-center px-12">
      <h2 className="text-3xl font-bold text-text">{slide.title}</h2>
      {slide.subtitle && (
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          {slide.subtitle}
        </p>
      )}
      <div className="mt-8 space-y-5">
        {slide.bullets?.map((item, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
              {i + 1}
            </div>
            <div>
              {item.heading && (
                <p className="font-semibold text-text">{item.heading}</p>
              )}
              <p className="mt-0.5 text-sm leading-relaxed text-text-secondary">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
      {slide.highlight && (
        <div className="mt-8 rounded-lg border-l-4 border-primary bg-primary/5 px-5 py-3">
          <p className="text-sm leading-relaxed text-text-secondary">
            {slide.highlight}
          </p>
        </div>
      )}
    </div>
  );
}

function TableSlide({ slide }: { slide: Slide }) {
  const t = slide.table;
  if (!t) return null;

  return (
    <div className="flex h-full flex-col justify-center px-12">
      <h2 className="text-3xl font-bold text-text">{slide.title}</h2>
      {slide.subtitle && (
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          {slide.subtitle}
        </p>
      )}
      {slide.bullets && (
        <div className="mt-5 space-y-3">
          {slide.bullets.map((item, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-xs font-bold text-primary">
                {i + 1}
              </div>
              <div>
                {item.heading && (
                  <p className="text-sm font-semibold text-text">{item.heading}</p>
                )}
                <p className="text-xs leading-relaxed text-text-secondary">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-5 overflow-hidden rounded-xl border border-surface-dark">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-primary/10">
              {t.headers.map((h, i) => (
                <th
                  key={i}
                  className="px-5 py-3 font-semibold text-text"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {t.rows.map((row, ri) => (
              <tr
                key={ri}
                className="border-t border-surface-dark last:font-semibold"
              >
                {row.map((cell, ci) => (
                  <td key={ci} className="px-5 py-3 text-text-secondary">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {slide.highlight && (
        <div className="mt-6 rounded-lg border-l-4 border-secondary bg-secondary/5 px-5 py-3">
          <p className="text-sm leading-relaxed text-text-secondary">
            {slide.highlight}
          </p>
        </div>
      )}
    </div>
  );
}

function SplitSlide({ slide }: { slide: Slide }) {
  return (
    <div className="flex h-full flex-col justify-center px-12">
      <h2 className="text-3xl font-bold text-text">{slide.title}</h2>
      <div className="mt-8 grid grid-cols-2 gap-6">
        {/* Left */}
        {slide.left && (
          <div className="rounded-xl border border-surface-dark bg-surface/50 p-6">
            <h3 className="font-semibold text-primary">
              {slide.left.heading}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              {slide.left.text}
            </p>
          </div>
        )}
        {/* Right */}
        {slide.right && (
          <div className="rounded-xl border border-surface-dark bg-surface/50 p-6">
            {slide.right.heading && (
              <h3 className="font-semibold text-primary">
                {slide.right.heading}
              </h3>
            )}
            <ul className="mt-3 space-y-2">
              {slide.right.items.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm leading-relaxed text-text-secondary"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function TimelineSlide({ slide }: { slide: Slide }) {
  return (
    <div className="flex h-full flex-col justify-center px-12">
      <h2 className="text-3xl font-bold text-text">{slide.title}</h2>
      {slide.subtitle && (
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          {slide.subtitle}
        </p>
      )}
      <div className="mt-8 space-y-6">
        {slide.phases?.map((phase, pi) => (
          <div key={pi}>
            <div className="mb-3 inline-block rounded-full bg-primary px-4 py-1 text-xs font-semibold text-white">
              {phase.label}
            </div>
            <div className="space-y-2 border-l-2 border-primary/30 pl-5">
              {phase.items.map((item, ii) => (
                <div key={ii} className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-3">
                    <div className="-ml-[25px] h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                    <p className="text-sm text-text-secondary">{item.task}</p>
                  </div>
                  <span className="ml-4 shrink-0 text-xs font-medium text-primary">
                    {item.weeks}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ClosingSlide({ slide }: { slide: Slide }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-12 text-center">
      <h2 className="text-4xl font-bold text-text">{slide.title}</h2>
      {slide.subtitle && (
        <p className="mt-4 text-sm text-text-secondary">{slide.subtitle}</p>
      )}
      {slide.bullets && (
        <div className="mt-10 grid w-full max-w-lg gap-4 text-left">
          {slide.bullets.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-surface-dark bg-surface/50 px-5 py-4"
            >
              {item.heading && (
                <p className="text-sm font-semibold text-primary">
                  {item.heading}
                </p>
              )}
              <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      )}
      {slide.meta && (
        <div className="mt-10 text-sm font-medium text-text-secondary">
          {Object.entries(slide.meta).map(([key, value]) => (
            <p key={key}>{value}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SlideRenderer({ slide }: { slide: Slide }) {
  switch (slide.layout) {
    case "cover":
      return <CoverSlide slide={slide} />;
    case "bullets":
      return <BulletsSlide slide={slide} />;
    case "table":
      return <TableSlide slide={slide} />;
    case "split":
      return <SplitSlide slide={slide} />;
    case "timeline":
      return <TimelineSlide slide={slide} />;
    case "closing":
      return <ClosingSlide slide={slide} />;
    default:
      return null;
  }
}
