import Badge from "@/components/Badge";
import RouletteWheel from "@/components/RouletteWheel";

export default function RoulettePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <Badge variant="primary" className="mb-3">
          게이미피케이션
        </Badge>
        <h1 className="text-3xl font-bold">매일매일 행운 룰렛</h1>
        <p className="mt-2 text-text-secondary">
          하루 한 번 룰렛을 돌려 포인트와 쿠폰을 획득하세요! 🦎
        </p>
      </div>

      <RouletteWheel />
    </div>
  );
}
