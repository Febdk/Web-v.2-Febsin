// ========================================
// 📸 IMPORT IMAGES FROM LOCAL FOLDER
// ========================================
// Contoh cara import gambar dari folder lokal:
// import toteBag1 from '../assets/products/tote-bag-1.jpg';
// import toteBag2 from '../assets/products/tote-bag-2.jpg';
// import comingSoon1 from '../assets/comingsoon-1.svg';
// import comingSoon2 from '../assets/comingsoon-2.svg';
// import comingSoon3 from '../assets/comingsoon-3.svg';

// Uncomment baris di atas setelah Anda taruh foto di folder /assets/

export interface Product {
  id: string;
  name: string;
  category: "Kaos" | "Kemeja" | "Hoodie" | "Aksesoris";
  price: number;
  memberPrice: number;
  image: string;
  images: string[];
  description: string;
  material: string;
  sizes: string[];
  colors: string[];
  gender: "Pria" | "Wanita" | "Unisex";
  stock: number;
  featured: boolean;
  rating?: number; // Average rating (0-5)
  reviewCount?: number; // Total number of reviews
}

// ========================================
// 💬 PRODUCT REVIEW INTERFACE
// ========================================
export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number; // 1-5 stars
  title: string;
  comment: string;
  date: string;
  size?: string; // Size yang dibeli
  verified: boolean; // Verified purchase?
  helpful: number; // Helpful votes count
  images?: string[]; // Review images (optional)
}

export const products: Product[] = [
  {
    id: "1",
    name: "Febsin Classic Black Tee",
    category: "Kaos",
    price: 199000,
    memberPrice: 179000,
    image: "https://images.unsplash.com/photo-1666358085449-a10a39f33942?w=800",
    images: [
      "https://images.unsplash.com/photo-1666358085449-a10a39f33942?w=800",
      "https://images.unsplash.com/photo-1576790807856-b9205fb5703f?w=800",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800",
    ],
    description:
      "Kaos premium dengan desain minimalis khas Febsin. Nyaman dipakai sehari-hari dengan bahan cotton combed 30s.",
    material: "Cotton Combed 30s, 100% Katun",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Navy"],
    gender: "Unisex",
    stock: 50,
    featured: true,
    rating: 4.8,
    reviewCount: 24,
  },
  {
    id: "2",
    name: "Urban Hoodie Premium",
    category: "Hoodie",
    price: 399000,
    memberPrice: 349000,
    image: "https://images.unsplash.com/photo-1635715226585-004fef5a55a4?w=800",
    images: [
      "https://images.unsplash.com/photo-1635715226585-004fef5a55a4?w=800",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
    ],
    description:
      "Hoodie premium dengan bahan fleece tebal dan halus. Perfect untuk gaya streetwear kamu.",
    material: "Fleece Premium, 80% Cotton 20% Polyester",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Black", "Grey", "Maroon"],
    gender: "Unisex",
    stock: 30,
    featured: true,
    rating: 4.9,
    reviewCount: 18,
  },
  {
    id: "3",
    name: "Kemeja Flanel Kotak",
    category: "Kemeja",
    price: 279000,
    memberPrice: 249000,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800",
    ],
    description:
      "Kemeja flanel dengan motif kotak-kotak klasik. Material lembut dan hangat.",
    material: "Flannel Premium",
    sizes: ["M", "L", "XL"],
    colors: ["Red-Black", "Blue-Black", "Grey-Black"],
    gender: "Unisex",
    stock: 25,
    featured: false,
  },
  {
    id: "4",
    name: "Febsin Cap Classic",
    category: "Aksesoris",
    price: 129000,
    memberPrice: 99000,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800",
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800",
      "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=800",
    ],
    description:
      "Topi baseball cap dengan logo Febsin. Material berkualitas tinggi.",
    material: "Cotton Twill",
    sizes: ["One Size"],
    colors: ["Black", "White", "Navy"],
    gender: "Unisex",
    stock: 100,
    featured: false,
  },
  {
    id: "5",
    name: "Oversized White Tee",
    category: "Kaos",
    price: 219000,
    memberPrice: 189000,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
      "https://images.unsplash.com/photo-1622445275576-721325763afe?w=800",
    ],
    description:
      "Kaos oversized dengan cutting modern. Cocok untuk streetwear look.",
    material: "Cotton Combed 24s",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["White", "Cream", "Light Grey"],
    gender: "Unisex",
    stock: 40,
    featured: true,
  },
  {
    id: "6",
    name: "Bomber Jacket Limited",
    category: "Hoodie",
    price: 549000,
    memberPrice: 499000,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800",
    ],
    description:
      "Bomber jacket edisi terbatas dengan detail premium. Limited stock!",
    material: "Polyester Premium dengan Lining",
    sizes: ["L", "XL"],
    colors: ["Black", "Olive"],
    gender: "Unisex",
    stock: 15,
    featured: true,
  },
  {
    id: "7",
    name: "Kaos Polo Febsin",
    category: "Kemeja",
    price: 249000,
    memberPrice: 219000,
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800",
    images: [
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800",
    ],
    description:
      "Polo shirt casual dengan material breathable. Cocok untuk acara semi-formal.",
    material: "Lacoste Cotton",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Navy", "Maroon"],
    gender: "Pria",
    stock: 35,
    featured: false,
  },
  {
    id: "8",
    name: "Tote Bag Canvas",
    category: "Aksesoris",
    price: 149000,
    memberPrice: 129000,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800",
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800",
    ],
    description: "Tote bag canvas dengan logo Febsin. Praktis dan stylish.",
    material: "Canvas Premium",
    sizes: ["One Size"],
    colors: ["Natural", "Black"],
    gender: "Unisex",
    stock: 60,
    featured: false,
  },
];

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  product: string;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Rizky Ananda",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rizky",
    rating: 5,
    comment:
      "Kualitas produk mantap! Bahan kaosnya adem dan ga gampang luntur. Recommended banget buat yang cari brand lokal berkualitas.",
    product: "Febsin Classic Black Tee",
    date: "15 Okt 2025",
  },
  {
    id: "2",
    name: "Dinda Permata",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dinda",
    rating: 5,
    comment:
      "Hoodie-nya premium banget! Tebal tapi ga panas, fit-nya juga pas. Worth it dengan harganya!",
    product: "Urban Hoodie Premium",
    date: "12 Okt 2025",
  },
  {
    id: "3",
    name: "Arief Budiman",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=arief",
    rating: 4,
    comment:
      "Desainnya simple tapi elegan. Pengiriman juga cepat. Bakal order lagi!",
    product: "Oversized White Tee",
    date: "8 Okt 2025",
  },
];

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Cara Mix & Match Outfit Streetwear ala Febsin",
    slug: "mix-match-streetwear",
    excerpt:
      "Tips styling untuk tampil keren dengan koleksi Febsin. Cocok untuk hangout atau daily look!",
    content:
      "Streetwear bukan cuma soal brand mahal, tapi gimana kamu mix & match outfit dengan confidence...",
    image: "https://images.unsplash.com/photo-1617152623457-4c9b639926d7?w=800",
    author: "Tim Febsin",
    date: "20 Okt 2025",
    category: "Fashion Tips",
  },
  {
    id: "2",
    title: "Behind The Scene: Proses Produksi Febsin",
    slug: "behind-the-scene-produksi",
    excerpt:
      "Intip gimana proses pembuatan produk Febsin dari awal sampai jadi.",
    content:
      "Setiap produk Febsin melalui quality control yang ketat. Mulai dari pemilihan bahan...",
    image: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=800",
    author: "Feby",
    date: "18 Okt 2025",
    category: "Behind The Brand",
  },
  {
    id: "3",
    title: "Febsin x Sustainability: Komitmen Kami",
    slug: "febsin-sustainability",
    excerpt:
      "Bagaimana Febsin berkontribusi untuk lingkungan lebih baik melalui fashion sustainable.",
    content:
      "Kami percaya bahwa fashion bisa jadi sustainable. Febsin berkomitmen menggunakan bahan ramah lingkungan...",
    image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=800",
    author: "Tim Febsin",
    date: "10 Okt 2025",
    category: "Sustainability",
  },
];

export interface Order {
  id: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: {
    productName: string;
    quantity: number;
    price: number;
    size: string;
  }[];
  tracking?: string;
}

export const mockOrders: Order[] = [
  {
    id: "ORD-2025-001",
    date: "15 Okt 2025",
    status: "delivered",
    total: 398000,
    items: [
      {
        productName: "Febsin Classic Black Tee",
        quantity: 1,
        price: 179000,
        size: "L",
      },
      {
        productName: "Febsin Cap Classic",
        quantity: 1,
        price: 99000,
        size: "One Size",
      },
    ],
    tracking: "JP1234567890",
  },
  {
    id: "ORD-2025-002",
    date: "18 Okt 2025",
    status: "shipped",
    total: 349000,
    items: [
      {
        productName: "Urban Hoodie Premium",
        quantity: 1,
        price: 349000,
        size: "XL",
      },
    ],
    tracking: "JP0987654321",
  },
];

// ========================================
// 💬 PRODUCT REVIEWS DATA
// ========================================

export const productReviews: ProductReview[] = [
  // Reviews untuk Product ID '1' - Febsin Classic Black Tee
  {
    id: "rev-1",
    productId: "1",
    userId: "user-1",
    userName: "Dimas Prasetyo",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dimas",
    rating: 5,
    title: "Kualitas Premium, Harga Terjangkau!",
    comment:
      "Kaosnya bener-bener premium! Bahan adem, jahitan rapi, dan cutting-nya pas di badan. Udah 3x cuci masih bagus, ga luntur sama sekali. Worth it banget dengan harganya. Recommended!",
    date: "28 Okt 2025",
    size: "L",
    verified: true,
    helpful: 15,
  },
  {
    id: "rev-2",
    productId: "1",
    userId: "user-2",
    userName: "Sarah Amelia",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    rating: 5,
    title: "Best Purchase!",
    comment:
      "Ini kaos terbaik yang pernah aku beli! Bahannya super soft, ga panas, dan modelnya minimalis jadi gampang dipadupadankan. Ukurannya juga sesuai size chart. Bakal beli lagi warna lain!",
    date: "25 Okt 2025",
    size: "M",
    verified: true,
    helpful: 12,
  },
  {
    id: "rev-3",
    productId: "1",
    userId: "user-3",
    userName: "Rian Firmansyah",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rian",
    rating: 4,
    title: "Bagus, Tapi Agak Kekecilan",
    comment:
      "Kualitas bahan oke banget, ga nyangka brand lokal bisa sekualitas ini. Cuma untuk yang body agak besar disarankan ambil 1 size lebih besar. Aku biasa L, tapi ini pas banget, prefer lebih longgar.",
    date: "22 Okt 2025",
    size: "L",
    verified: true,
    helpful: 8,
  },
  {
    id: "rev-4",
    productId: "1",
    userId: "user-4",
    userName: "Maya Putri",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maya",
    rating: 5,
    title: "Love it! Bakal Order Lagi",
    comment:
      "Packaging rapi, pengiriman cepat, dan produknya exceed expectations! Bahannya tebel tapi breathable, jadi nyaman dipake seharian. Design minimalisnya juga timeless. 10/10!",
    date: "20 Okt 2025",
    size: "S",
    verified: true,
    helpful: 10,
  },

  // Reviews untuk Product ID '2' - Urban Hoodie Premium
  {
    id: "rev-5",
    productId: "2",
    userId: "user-5",
    userName: "Aldi Nugroho",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=aldi",
    rating: 5,
    title: "Hoodie Terbaik yang Pernah Aku Punya!",
    comment:
      "Serius ini hoodie paling worth it! Bahan fleece-nya tebel banget tapi ga bikin gerah. Hood-nya pas, tali serut berkualitas, dan zipper-nya smooth. Pokoknya premium dari ujung ke ujung. Harga segini dapet kualitas begini? Take my money!",
    date: "29 Okt 2025",
    size: "L",
    verified: true,
    helpful: 20,
  },
  {
    id: "rev-6",
    productId: "2",
    userId: "user-6",
    userName: "Indah Sari",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=indah",
    rating: 5,
    title: "Perfect for Street Style!",
    comment:
      "Hoodie ini bener-bener cocok buat street style! Fit-nya oversized tapi ga kebesaran, warna hitamnya pekat ga pudar, dan yang paling penting hangat tapi ga gerah. Kantongnya juga luas. Love this!",
    date: "26 Okt 2025",
    size: "M",
    verified: true,
    helpful: 14,
  },
  {
    id: "rev-7",
    productId: "2",
    userId: "user-7",
    userName: "Fahmi Rahman",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=fahmi",
    rating: 4,
    title: "Kualitas Oke, Harga Agak Mahal",
    comment:
      "Kualitas hoodie-nya memang ga diragukan lagi, tapi untuk harga 399k agak pricey menurut gue. Tapi ya gapapa sih karena emang kualitasnya premium banget. Material dan jahitan solid.",
    date: "23 Okt 2025",
    size: "XL",
    verified: true,
    helpful: 6,
  },
];
