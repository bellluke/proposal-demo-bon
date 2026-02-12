import Badge from "@/components/Badge";
import Card from "@/components/Card";
import ProductTaggingFeed from "@/components/ProductTaggingFeed";
import { products, formatPrice } from "@/data/tagging";
import { ShoppingBag } from "lucide-react";

export default function ProductTaggingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <Badge variant="accent" className="mb-3">
          핵심 기능
        </Badge>
        <h1 className="text-3xl font-bold">상품 태깅</h1>
        <p className="mt-2 text-text-secondary">
          사육장 사진 위의 <strong>(+)</strong> 마커를 클릭하면 해당 위치의
          상품 정보를 확인할 수 있습니다
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        {/* Feed */}
        <div className="flex-1">
          <ProductTaggingFeed />
        </div>

        {/* Product sidebar */}
        <div className="w-full lg:w-72">
          <div className="sticky top-20 space-y-4">
            <Card>
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <ShoppingBag size={20} className="text-primary" />
                데모 상품
              </h3>
              <div className="space-y-3">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 rounded-lg bg-surface p-3"
                  >
                    <div
                      className="h-10 w-10 shrink-0 rounded-lg"
                      style={{ backgroundColor: p.color }}
                    />
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium">{p.name}</p>
                      <p className="text-sm font-bold text-primary">
                        {formatPrice(p.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-surface">
              <h4 className="text-sm font-semibold">사용 방법</h4>
              <ul className="mt-2 space-y-1.5 text-xs text-text-secondary">
                <li>1. 사진 위의 (+) 마커를 클릭하세요</li>
                <li>2. 상품 정보 팝업이 표시됩니다</li>
                <li>3. &quot;상품 보기&quot;로 상세 페이지 이동</li>
                <li>4. 사진 클릭으로 태그를 토글할 수 있습니다</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
