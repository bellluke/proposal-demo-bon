"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, MessageCircle, Plus, ShoppingBag, X } from "lucide-react";
import Card from "./Card";
import Badge from "./Badge";
import {
  feedPosts,
  getProduct,
  formatPrice,
  type FeedPost,
  type Tag,
} from "@/data/tagging";

function TagMarker({
  tag,
  isActive,
  onClick,
}: {
  tag: Tag;
  isActive: boolean;
  onClick: () => void;
}) {
  const product = getProduct(tag.productId);
  if (!product) return null;

  return (
    <div
      className="absolute z-10"
      style={{ left: `${tag.x}%`, top: `${tag.y}%` }}
    >
      {/* Marker button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className={`flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white shadow-lg transition-all ${
          isActive
            ? "scale-110 bg-primary"
            : "bg-white/90 hover:scale-110 hover:bg-primary"
        }`}
      >
        <Plus
          size={14}
          className={isActive ? "text-white" : "text-text hover:text-white"}
        />
      </button>

      {/* Product popup */}
      {isActive && (() => {
        const showAbove = tag.y > 60;
        const alignLeft = tag.x < 25;
        const alignRight = tag.x > 75;

        const positionClasses = showAbove
          ? "bottom-full mb-2"
          : "top-full mt-2";

        const horizontalClasses = alignLeft
          ? "left-0"
          : alignRight
            ? "right-0"
            : "left-1/2 -translate-x-1/2";

        const arrowPositionClasses = showAbove
          ? "-bottom-2 border-x-[8px] border-t-[8px] border-x-transparent border-t-white"
          : "-top-2 border-x-[8px] border-b-[8px] border-x-transparent border-b-white";

        const arrowHorizontalClasses = alignLeft
          ? "left-4"
          : alignRight
            ? "right-4"
            : "left-1/2 -translate-x-1/2";

        return (
        <div className={`absolute z-20 w-56 rounded-xl border border-surface-dark bg-white p-3 shadow-xl ${positionClasses} ${horizontalClasses}`}>
          {/* Arrow */}
          <div className={`absolute h-0 w-0 ${arrowPositionClasses} ${arrowHorizontalClasses}`} />

          <div className="flex gap-3">
            {/* Product color thumbnail */}
            <div
              className="h-14 w-14 shrink-0 rounded-lg"
              style={{ backgroundColor: product.color }}
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold leading-tight">
                {product.name}
              </p>
              <Badge
                variant="secondary"
                className="mt-1 text-[10px] px-1.5 py-0.5"
              >
                {product.category}
              </Badge>
              <p className="mt-1 text-sm font-bold text-primary">
                {formatPrice(product.price)}
              </p>
            </div>
          </div>

          <button className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg bg-primary py-2 text-xs font-medium text-white transition-colors hover:bg-primary-dark">
            <ShoppingBag size={12} />
            상품 보기
          </button>
        </div>
        );
      })()}
    </div>
  );
}

function FeedCard({ post }: { post: FeedPost }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [showTags, setShowTags] = useState(true);

  const toggleTag = (tagKey: string) => {
    setActiveTag(activeTag === tagKey ? null : tagKey);
  };

  return (
    <Card className="overflow-hidden p-0">
      {/* Author */}
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-lg">
          {post.avatar}
        </div>
        <div>
          <p className="text-sm font-semibold">{post.author}</p>
          <p className="text-xs text-text-muted">사육장 자랑하기</p>
        </div>
      </div>

      {/* Image with tags */}
      <div
        className="relative aspect-[4/3] overflow-hidden"
        onClick={() => setActiveTag(null)}
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 512px"
        />

        {/* Tag count badge */}
        <div className="absolute right-3 top-3">
          <Badge variant="primary" className="bg-black/50 text-white backdrop-blur-sm">
            <ShoppingBag size={12} className="mr-1" />
            {post.tags.length}개 상품
          </Badge>
        </div>

        {/* Tag markers */}
        {showTags &&
          post.tags.map((tag) => {
            const key = `${post.id}-${tag.productId}`;
            return (
              <TagMarker
                key={key}
                tag={tag}
                isActive={activeTag === key}
                onClick={() => toggleTag(key)}
              />
            );
          })}
      </div>

      {/* Description */}
      <div className="px-4 py-3">
        <p className="text-sm leading-relaxed text-text">
          {post.description}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 border-t border-surface px-4 py-3">
        <button className="flex items-center gap-1 text-sm text-text-secondary transition-colors hover:text-error">
          <Heart size={18} />
          <span>{post.likes}</span>
        </button>
        <button className="flex items-center gap-1 text-sm text-text-secondary transition-colors hover:text-primary">
          <MessageCircle size={18} />
          <span>{post.comments}</span>
        </button>
        <button
          className="ml-auto flex items-center gap-1 text-sm text-text-secondary transition-colors hover:text-primary"
          onClick={() => setShowTags(!showTags)}
        >
          {showTags ? <X size={16} /> : <Plus size={16} />}
          <span className="text-xs">{showTags ? "태그 숨기기" : "태그 보기"}</span>
        </button>
      </div>
    </Card>
  );
}

export default function ProductTaggingFeed() {
  return (
    <div className="mx-auto max-w-lg space-y-6">
      {feedPosts.map((post) => (
        <FeedCard key={post.id} post={post} />
      ))}
    </div>
  );
}
