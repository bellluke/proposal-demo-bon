"use client";

import { useState, useCallback } from "react";
import { Gift, RotateCcw, Trophy } from "lucide-react";
import Button from "./Button";
import Card from "./Card";

interface Prize {
  label: string;
  probability: number;
  color: string;
  icon: string;
}

const prizes: Prize[] = [
  { label: "100P", probability: 30, color: "#52B788", icon: "🪙" },
  { label: "200P", probability: 25, color: "#2D6A4F", icon: "🪙" },
  { label: "500P", probability: 15, color: "#D4A843", icon: "💰" },
  { label: "1,000P", probability: 10, color: "#C17817", icon: "💎" },
  { label: "사료 샘플", probability: 10, color: "#40916C", icon: "🦎" },
  { label: "5% 할인", probability: 8, color: "#E8D5B7", icon: "🏷️" },
  { label: "무료배송", probability: 2, color: "#DC2626", icon: "🚀" },
];

function weightedRandom(items: Prize[]): number {
  const total = items.reduce((sum, item) => sum + item.probability, 0);
  let rand = Math.random() * total;
  for (let i = 0; i < items.length; i++) {
    rand -= items[i].probability;
    if (rand <= 0) return i;
  }
  return items.length - 1;
}

export default function RouletteWheel() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<Prize | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);

  const spin = useCallback(() => {
    if (spinning || hasSpun) return;

    setSpinning(true);
    setResult(null);

    const winIndex = weightedRandom(prizes);
    const sliceAngle = 360 / prizes.length;
    // Calculate target: we want the winning slice under the top marker
    const targetAngle = 360 - (winIndex * sliceAngle + sliceAngle / 2);
    const extraSpins = 5 * 360; // 5 full rotations
    const newRotation = rotation + extraSpins + targetAngle + Math.random() * 10;

    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      setResult(prizes[winIndex]);
      setShowModal(true);
      setHasSpun(true);
    }, 4500);
  }, [spinning, hasSpun, rotation]);

  const reset = () => {
    setHasSpun(false);
    setResult(null);
    setShowModal(false);
  };

  const totalSlices = prizes.length;
  const sliceAngle = 360 / totalSlices;

  return (
    <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-12">
      {/* Wheel */}
      <div className="relative flex flex-col items-center">
        {/* Marker */}
        <div className="relative z-10 mb-[-12px] text-2xl">▼</div>

        {/* Wheel container */}
        <div className="relative h-72 w-72 sm:h-80 sm:w-80">
          <svg
            viewBox="0 0 300 300"
            className="h-full w-full drop-shadow-xl"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning
                ? "transform 4.5s cubic-bezier(0.17, 0.67, 0.12, 0.99)"
                : "none",
            }}
          >
            {prizes.map((prize, i) => {
              const startAngle = (i * sliceAngle * Math.PI) / 180;
              const endAngle = ((i + 1) * sliceAngle * Math.PI) / 180;
              const midAngle = (startAngle + endAngle) / 2;
              const cx = 150, cy = 150, r = 145;

              const x1 = cx + r * Math.cos(startAngle - Math.PI / 2);
              const y1 = cy + r * Math.sin(startAngle - Math.PI / 2);
              const x2 = cx + r * Math.cos(endAngle - Math.PI / 2);
              const y2 = cy + r * Math.sin(endAngle - Math.PI / 2);
              const largeArc = sliceAngle > 180 ? 1 : 0;

              const textX = cx + r * 0.62 * Math.cos(midAngle - Math.PI / 2);
              const textY = cy + r * 0.62 * Math.sin(midAngle - Math.PI / 2);
              const textRotation = (midAngle * 180) / Math.PI;

              return (
                <g key={i}>
                  <path
                    d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`}
                    fill={prize.color}
                    stroke="#fff"
                    strokeWidth="2"
                  />
                  <text
                    x={textX}
                    y={textY}
                    fill="#fff"
                    fontSize="13"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${textRotation}, ${textX}, ${textY})`}
                    style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
                  >
                    {prize.icon} {prize.label}
                  </text>
                </g>
              );
            })}
            {/* Center circle */}
            <circle cx="150" cy="150" r="28" fill="#fff" stroke="#E8E0D0" strokeWidth="3" />
            <text
              x="150"
              y="150"
              fill="#2D6A4F"
              fontSize="11"
              fontWeight="bold"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              SPIN
            </text>
          </svg>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-3">
          <Button
            onClick={spin}
            disabled={spinning || hasSpun}
            size="lg"
          >
            <Gift size={18} />
            {spinning ? "돌리는 중..." : hasSpun ? "오늘 참여 완료" : "룰렛 돌리기"}
          </Button>
          {hasSpun && (
            <Button variant="ghost" onClick={reset} size="lg">
              <RotateCcw size={18} />
              데모 리셋
            </Button>
          )}
        </div>
      </div>

      {/* Prize List */}
      <div className="w-full max-w-sm">
        <Card>
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Trophy size={20} className="text-accent" />
            보상 목록
          </h3>
          <div className="space-y-2">
            {prizes.map((prize, i) => (
              <div
                key={i}
                className={`flex items-center justify-between rounded-lg p-3 text-sm ${
                  result?.label === prize.label
                    ? "bg-primary/10 font-semibold text-primary ring-1 ring-primary/30"
                    : "bg-surface"
                }`}
              >
                <span>
                  {prize.icon} {prize.label}
                </span>
                <span className="text-text-secondary">{prize.probability}%</span>
              </div>
            ))}
          </div>
        </Card>

        {result && (
          <Card className="mt-4 border-accent bg-accent-light/30">
            <p className="text-center text-sm font-medium">
              🎉 <strong className="text-primary">{result.icon} {result.label}</strong> 당첨!
            </p>
          </Card>
        )}
      </div>

      {/* Result Modal */}
      {showModal && result && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="mx-4 w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-light text-3xl">
              {result.icon}
            </div>
            <h3 className="text-xl font-bold">축하합니다! 🎉</h3>
            <p className="mt-2 text-lg font-semibold text-primary">
              {result.label}
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              보상이 계정에 자동 지급됩니다
            </p>
            <Button
              className="mt-6 w-full"
              onClick={() => setShowModal(false)}
            >
              확인
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
