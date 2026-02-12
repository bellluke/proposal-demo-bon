import Button from "@/components/Button";
import Card from "@/components/Card";
import Badge from "@/components/Badge";

const colorGroups = [
  {
    name: "Primary",
    colors: [
      { name: "Jungle Green", hex: "#2D6A4F", css: "bg-primary", text: "text-white" },
      { name: "Leaf Green", hex: "#52B788", css: "bg-primary-light", text: "text-white" },
      { name: "Deep Forest", hex: "#1B4332", css: "bg-primary-dark", text: "text-white" },
    ],
  },
  {
    name: "Secondary",
    colors: [
      { name: "Terracotta", hex: "#C17817", css: "bg-secondary", text: "text-white" },
      { name: "Sand", hex: "#E8D5B7", css: "bg-secondary-light", text: "text-text" },
    ],
  },
  {
    name: "Accent",
    colors: [
      { name: "Gecko Gold", hex: "#D4A843", css: "bg-accent", text: "text-white" },
      { name: "Gecko Light", hex: "#F0DCA0", css: "bg-accent-light", text: "text-text" },
    ],
  },
  {
    name: "Background & Surface",
    colors: [
      { name: "Warm White", hex: "#FAFAF5", css: "bg-bg", text: "text-text" },
      { name: "Cream", hex: "#F5F0E8", css: "bg-surface", text: "text-text" },
      { name: "Cream Dark", hex: "#E8E0D0", css: "bg-surface-dark", text: "text-text" },
    ],
  },
  {
    name: "Status",
    colors: [
      { name: "Success", hex: "#40916C", css: "bg-success", text: "text-white" },
      { name: "Warning", hex: "#F59E0B", css: "bg-warning", text: "text-white" },
      { name: "Error", hex: "#DC2626", css: "bg-error", text: "text-white" },
    ],
  },
];

const typeSizes = [
  { label: "text-xs", size: "12px", className: "text-xs" },
  { label: "text-sm", size: "14px", className: "text-sm" },
  { label: "text-base", size: "16px", className: "text-base" },
  { label: "text-lg", size: "18px", className: "text-lg" },
  { label: "text-xl", size: "20px", className: "text-xl" },
  { label: "text-2xl", size: "24px", className: "text-2xl" },
  { label: "text-3xl", size: "30px", className: "text-3xl" },
  { label: "text-4xl", size: "36px", className: "text-4xl" },
  { label: "text-5xl", size: "48px", className: "text-5xl" },
];

const badgeVariants = [
  "primary",
  "secondary",
  "accent",
  "success",
  "warning",
  "error",
] as const;

export default function StyleGuidePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">스타일 가이드</h1>
      <p className="mt-2 text-text-secondary">
        파충류 커뮤니티 커머스 플랫폼의 디자인 시스템
      </p>

      {/* Color Palette */}
      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-bold">컬러 팔레트</h2>
        <div className="space-y-8">
          {colorGroups.map((group) => (
            <div key={group.name}>
              <h3 className="mb-3 text-sm font-semibold text-text-secondary">
                {group.name}
              </h3>
              <div className="flex flex-wrap gap-3">
                {group.colors.map((c) => (
                  <div key={c.hex} className="w-36">
                    <div
                      className={`${c.css} ${c.text} flex h-20 items-end rounded-lg border border-surface-dark p-2`}
                    >
                      <span className="text-xs font-medium">{c.hex}</span>
                    </div>
                    <p className="mt-1 text-sm font-medium">{c.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-bold">타이포그래피</h2>
        <Card>
          <div className="mb-4 flex gap-4 text-sm text-text-secondary">
            <span>
              한글: <strong className="text-text">Pretendard</strong>
            </span>
            <span>
              영문: <strong className="text-text">Inter</strong>
            </span>
          </div>
          <div className="space-y-4">
            {typeSizes.map((t) => (
              <div
                key={t.label}
                className="flex items-baseline gap-4 border-b border-surface pb-3 last:border-0"
              >
                <span className="w-20 shrink-0 text-xs text-text-muted">
                  {t.size}
                </span>
                <span className={`${t.className} font-medium`}>
                  파충류 커뮤니티 커머스 플랫폼
                </span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Buttons */}
      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-bold">버튼</h2>
        <Card>
          <div className="space-y-6">
            {(["primary", "secondary", "ghost", "accent"] as const).map(
              (variant) => (
                <div key={variant}>
                  <p className="mb-3 text-sm font-semibold capitalize text-text-secondary">
                    {variant}
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant={variant} size="sm">
                      Small
                    </Button>
                    <Button variant={variant} size="md">
                      Medium
                    </Button>
                    <Button variant={variant} size="lg">
                      Large
                    </Button>
                    <Button variant={variant} size="md" disabled>
                      Disabled
                    </Button>
                  </div>
                </div>
              )
            )}
          </div>
        </Card>
      </section>

      {/* Badges */}
      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-bold">배지</h2>
        <Card>
          <div className="flex flex-wrap gap-3">
            {badgeVariants.map((v) => (
              <Badge key={v} variant={v}>
                {v}
              </Badge>
            ))}
          </div>
        </Card>
      </section>

      {/* Cards */}
      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-bold">카드</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <h3 className="font-semibold">기본 카드</h3>
            <p className="mt-1 text-sm text-text-secondary">
              둥근 모서리와 미세한 테두리가 적용된 기본 카드 컨테이너
            </p>
          </Card>
          <Card hover>
            <h3 className="font-semibold">호버 카드</h3>
            <p className="mt-1 text-sm text-text-secondary">
              마우스 오버 시 그림자가 확대되는 인터랙티브 카드
            </p>
          </Card>
        </div>
      </section>

      {/* Border Radius & Shadow */}
      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-bold">라운딩 & 그림자</h2>
        <Card>
          <div className="flex flex-wrap gap-6">
            {[
              { label: "rounded-lg (8px)", className: "rounded-lg" },
              { label: "rounded-xl (12px)", className: "rounded-xl" },
              { label: "rounded-2xl (16px)", className: "rounded-2xl" },
              { label: "rounded-full", className: "rounded-full" },
            ].map((r) => (
              <div key={r.label} className="text-center">
                <div
                  className={`${r.className} flex h-16 w-16 items-center justify-center bg-primary/10 text-primary`}
                >
                  <span className="text-lg font-bold">A</span>
                </div>
                <p className="mt-2 text-xs text-text-muted">{r.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-6">
            {[
              { label: "shadow-sm", className: "shadow-sm" },
              { label: "shadow-md", className: "shadow-md" },
              { label: "shadow-lg", className: "shadow-lg" },
              { label: "shadow-xl", className: "shadow-xl" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className={`${s.className} flex h-16 w-16 items-center justify-center rounded-xl bg-white`}
                >
                  <span className="text-sm text-text-muted">A</span>
                </div>
                <p className="mt-2 text-xs text-text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
