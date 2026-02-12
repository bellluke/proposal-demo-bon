import Badge from "@/components/Badge";
import AttendanceCalendar from "@/components/AttendanceCalendar";

export default function AttendancePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <Badge variant="primary" className="mb-3">
          게이미피케이션
        </Badge>
        <h1 className="text-3xl font-bold">출석체크</h1>
        <p className="mt-2 text-text-secondary">
          매일 출석하고 포인트를 모으세요! 연속 출석 시 추가 보상이 지급됩니다 🦎
        </p>
      </div>

      <AttendanceCalendar />
    </div>
  );
}
