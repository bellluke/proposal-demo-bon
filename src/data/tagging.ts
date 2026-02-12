export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  color: string; // placeholder thumbnail color
}

export interface Tag {
  productId: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
}

export interface FeedPost {
  id: string;
  author: string;
  avatar: string;
  title: string;
  description: string;
  image: string; // image path in /public
  likes: number;
  comments: number;
  tags: Tag[];
}

export const products: Product[] = [
  {
    id: "p1",
    name: "프리미엄 적재사육장 90x45x45",
    price: 189000,
    category: "사육장",
    color: "#2D6A4F",
  },
  {
    id: "p2",
    name: "레오파드 게코 은신처 M",
    price: 15900,
    category: "은신처",
    color: "#C17817",
  },
  {
    id: "p3",
    name: "UVB 바스킹 라이트 50W",
    price: 23000,
    category: "조명/히팅",
    color: "#D4A843",
  },
];

export const feedPosts: FeedPost[] = [
  {
    id: "f1",
    author: "레오파집사",
    avatar: "🦎",
    title: "나의 첫 레오파드 게코 사육장 셋업",
    description:
      "드디어 첫 레오파 사육장을 완성했어요! 적재사육장에 은신처까지 딱 맞네요. 온도 구배도 잘 잡히고 아이가 좋아합니다 🥰",
    image: "/2.webp",
    likes: 127,
    comments: 23,
    tags: [
      { productId: "p1", x: 20, y: 75 },
      { productId: "p2", x: 58, y: 50 },
    ],
  },
  {
    id: "f2",
    author: "이구아나러버",
    avatar: "🐊",
    title: "블루 이구아나 바스킹 셋업 완성!",
    description:
      "바스킹 스팟 온도 35도 정확하게 맞췄습니다. UVB 라이트 성능이 정말 좋아요. 사육장도 넓어서 아이가 스트레스 없이 잘 지냅니다.",
    image: "/1.webp",
    likes: 89,
    comments: 15,
    tags: [
      { productId: "p1", x: 15, y: 78 },
      { productId: "p3", x: 48, y: 15 },
    ],
  },
  {
    id: "f3",
    author: "크레스티드맘",
    avatar: "🌿",
    title: "크레스티드 게코의 아늑한 집",
    description:
      "습도 관리가 중요한 크레스티드를 위해 세팅했어요. 은신처에서 잠자는 모습이 너무 귀엽습니다. 라이트도 자연광에 가까워서 만족!",
    image: "/3.webp",
    likes: 203,
    comments: 41,
    tags: [
      { productId: "p1", x: 20, y: 75 },
      { productId: "p2", x: 45, y: 55 },
      { productId: "p3", x: 55, y: 18 },
    ],
  },
];

export function formatPrice(price: number): string {
  return price.toLocaleString("ko-KR") + "원";
}

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
