export default function Footer() {
  return (
    <footer className="border-t border-surface-dark bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-6 text-center text-sm text-text-secondary">
        <p>
          파충류 전문 커뮤니티 커머스 플랫폼 데모
        </p>
        <p className="text-text-muted">
          © {new Date().getFullYear()} (주)에이나 — 제안 데모용
        </p>
      </div>
    </footer>
  );
}
