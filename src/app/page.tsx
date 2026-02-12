import Link from "next/link";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import {
  Crosshair,
  Dices,
  CalendarCheck,
  Palette,
  ShoppingCart,
  Users,
  TrendingUp,
  Heart,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Crosshair,
    title: "상품 태깅",
    description:
      "사육장 사진 위에 상품 태그를 배치하여, 유저의 사육 환경 자랑이 곧 자연스러운 상품 추천이 되는 구조",
    badge: "핵심 기능",
    badgeVariant: "accent" as const,
    href: "/product-tagging",
  },
  {
    icon: Dices,
    title: "게이미피케이션",
    description:
      "룰렛, 출석체크 등 재미 요소로 일일 방문 습관을 만들고, 포인트와 쿠폰으로 충성 고객 확보",
    badge: "참여 유도",
    badgeVariant: "primary" as const,
    href: "/roulette",
  },
  {
    icon: Users,
    title: "커뮤니티 커머스",
    description:
      "콘텐츠와 커머스가 유기적으로 결합된 '파충류판 오늘의집' — 콘텐츠가 곧 구매로 이어지는 플랫폼",
    badge: "플랫폼 비전",
    badgeVariant: "secondary" as const,
    href: "/style-guide",
  },
];

const demoPages = [
  {
    icon: Palette,
    title: "스타일 가이드",
    description: "파충류 테마 컬러 팔레트, 타이포그래피, UI 컴포넌트",
    href: "/style-guide",
  },
  {
    icon: Dices,
    title: "룰렛",
    description: "매일 참여하는 포인트 룰렛 이벤트",
    href: "/roulette",
  },
  {
    icon: CalendarCheck,
    title: "출석체크",
    description: "연속 출석 보상과 개근 혜택",
    href: "/attendance",
  },
  {
    icon: Crosshair,
    title: "상품 태깅",
    description: "이미지 좌표 기반 상품 태깅 시스템",
    href: "/product-tagging",
  },
];

const expectations = [
  { icon: ShoppingCart, label: "구매 전환율 향상", description: "콘텐츠 내 상품 태깅으로 자연스러운 구매 유도" },
  { icon: TrendingUp, label: "재방문율 증가", description: "게이미피케이션으로 일일 방문 습관 형성" },
  { icon: Heart, label: "고객 충성도", description: "통합 등급·포인트로 장기 고객 확보" },
  { icon: Sparkles, label: "브랜드 확장", description: "유저 생성 콘텐츠 바이럴 및 팬덤" },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Hero */}
      <section className="py-12 text-center">
        <Badge variant="accent" className="mb-4">
          프로젝트 제안 데모
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight text-text sm:text-5xl">
          파충류 커뮤니티<span className="text-primary"> 커머스</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
          콘텐츠가 곧 구매로, 재방문이 충성으로 이어지는 플랫폼
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/product-tagging"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
          >
            데모 살펴보기 <ArrowRight size={16} />
          </Link>
          <Link
            href="/style-guide"
            className="inline-flex items-center gap-2 rounded-full border border-surface-dark px-6 py-3 text-sm font-medium text-text-secondary transition-colors hover:bg-surface"
          >
            스타일 가이드
          </Link>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-12">
        <h2 className="mb-8 text-center text-2xl font-bold">핵심 기능</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <Link key={f.title} href={f.href}>
              <Card hover className="h-full">
                <Badge variant={f.badgeVariant} className="mb-3">
                  {f.badge}
                </Badge>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-surface">
                  <f.icon size={20} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {f.description}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Demo Pages Grid */}
      <section className="py-12">
        <h2 className="mb-8 text-center text-2xl font-bold">데모 페이지</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {demoPages.map((page) => (
            <Link key={page.title} href={page.href}>
              <Card hover className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <page.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold">{page.title}</h3>
                <p className="mt-1 text-xs text-text-secondary">
                  {page.description}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Expected Impact */}
      <section className="py-12">
        <h2 className="mb-8 text-center text-2xl font-bold">기대 효과</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {expectations.map((e) => (
            <div
              key={e.label}
              className="flex items-start gap-3 rounded-xl border border-surface-dark bg-white p-4"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-light">
                <e.icon size={18} className="text-secondary" />
              </div>
              <div>
                <p className="text-sm font-semibold">{e.label}</p>
                <p className="mt-0.5 text-xs text-text-secondary">
                  {e.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
