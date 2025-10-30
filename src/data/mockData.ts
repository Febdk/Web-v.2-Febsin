export interface Product {
  id: string;
  name: string;
  category: 'Kaos' | 'Kemeja' | 'Hoodie' | 'Aksesoris';
  price: number;
  memberPrice: number;
  image: string;
  images: string[];
  description: string;
  material: string;
  sizes: string[];
  colors: string[];
  gender: 'Pria' | 'Wanita' | 'Unisex';
  stock: number;
  featured: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Febsin Classic Black Tee',
    category: 'Kaos',
    price: 199000,
    memberPrice: 179000,
    image: 'src/assets/comingsoon-2.png',
    images: [
      'src/assets/comingsoon-1.png  ',
    ],
    description: 'Kaos premium dengan desain minimalis khas Febsin. Nyaman dipakai sehari-hari dengan bahan cotton combed 30s.',
    material: 'Cotton Combed 30s, 100% Katun',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Navy'],
    gender: 'Unisex',
    stock: 50,
    featured: true
  },
  {
    id: '2',
    name: 'Urban Hoodie Premium',
    category: 'Hoodie',
    price: 399000,
    memberPrice: 349000,
    image: 'src/assets/comingsoon-1.png',
    images: [
      'src/assets/comingsoon-2.png'
    ],
    description: 'Hoodie premium dengan bahan fleece tebal dan halus. Perfect untuk gaya streetwear kamu.',
    material: 'Fleece Premium, 80% Cotton 20% Polyester',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Grey', 'Maroon'],
    gender: 'Unisex',
    stock: 30,
    featured: true
  },
  {
    id: '3',
    name: 'Kemeja Flanel Kotak',
    category: 'Kemeja',
    price: 279000,
    memberPrice: 249000,
    image: 'src/assets/comingsoon-2.png',
    images: [
      //'isi file gambar di sini'
    ],
    description: 'Kemeja flanel dengan motif kotak-kotak klasik. Material lembut dan hangat.',
    material: 'Flannel Premium',
    sizes: ['M', 'L', 'XL'],
    colors: ['Red-Black', 'Blue-Black', 'Grey-Black'],
    gender: 'Unisex',
    stock: 25,
    featured: false
  },
  {
    id: '4',
    name: 'Febsin Cap Classic',
    category: 'Aksesoris',
    price: 129000,
    memberPrice: 99000,
    image: 'src/assets/comingsoon-3.png',
    images: [
      // 'isi gambar di sini'
    ],
    description: 'Topi baseball cap dengan logo Febsin. Material berkualitas tinggi.',
    material: 'Cotton Twill',
    sizes: ['One Size'],
    colors: ['Black', 'White', 'Navy'],
    gender: 'Unisex',
    stock: 100,
    featured: false
  },
  {
    id: '5',
    name: 'Oversized White Tee',
    category: 'Kaos',
    price: 219000,
    memberPrice: 189000,
    image: 'src/assets/comingsoon-3.png',
    images: [
      'src/assets/comingsoon-2.png',
    ],
    description: 'Kaos oversized dengan cutting modern. Cocok untuk streetwear look.',
    material: 'Cotton Combed 24s',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Cream', 'Light Grey'],
    gender: 'Unisex',
    stock: 40,
    featured: true
  },
  {
    id: '6',
    name: 'Bomber Jacket Limited',
    category: 'Hoodie',
    price: 549000,
    memberPrice: 499000,
    image: 'src/assets/comingsoon-1.png',
    images: [
      //'isi gambar di sini'
    ],
    description: 'Bomber jacket edisi terbatas dengan detail premium. Limited stock!',
    material: 'Polyester Premium dengan Lining',
    sizes: ['L', 'XL'],
    colors: ['Black', 'Olive'],
    gender: 'Unisex',
    stock: 15,
    featured: true
  },
  {
    id: '7',
    name: 'Kaos Polo Febsin',
    category: 'Kemeja',
    price: 249000,
    memberPrice: 219000,
    image: 'src/assets/comingsoon-1.png',
    images: [
      //'isi gambar di sini'
    ],
    description: 'Polo shirt casual dengan material breathable. Cocok untuk acara semi-formal.',
    material: 'Lacoste Cotton',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Navy', 'Maroon'],
    gender: 'Pria',
    stock: 35,
    featured: false
  },
  {
    id: '8',
    name: 'Tote Bag Canvas',
    category: 'Aksesoris',
    price: 149000,
    memberPrice: 129000,
    image: 'src/assets/comingsoon-3.png',
    images: [
      //'isi gambar di sini'
    ],
    description: 'Tote bag canvas dengan logo Febsin. Praktis dan stylish.',
    material: 'Canvas Premium',
    sizes: ['One Size'],
    colors: ['Natural', 'Black'],
    gender: 'Unisex',
    stock: 60,
    featured: false
  }
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
    id: '1',
    name: 'Rizky Ananda',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rizky',
    rating: 5,
    comment: 'Kualitas produk mantap! Bahan kaosnya adem dan ga gampang luntur. Recommended banget buat yang cari brand lokal berkualitas.',
    product: 'Febsin Classic Black Tee',
    date: '15 Okt 2025'
  },
  {
    id: '2',
    name: 'Dinda Permata',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dinda',
    rating: 5,
    comment: 'Hoodie-nya premium banget! Tebal tapi ga panas, fit-nya juga pas. Worth it dengan harganya!',
    product: 'Urban Hoodie Premium',
    date: '12 Okt 2025'
  },
  {
    id: '3',
    name: 'Arief Budiman',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arief',
    rating: 4,
    comment: 'Desainnya simple tapi elegan. Pengiriman juga cepat. Bakal order lagi!',
    product: 'Oversized White Tee',
    date: '8 Okt 2025'
  }
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
    id: '1',
    title: 'Cara Mix & Match Outfit Streetwear ala Febsin',
    slug: 'mix-match-streetwear',
    excerpt: 'Tips styling untuk tampil keren dengan koleksi Febsin. Cocok untuk hangout atau daily look!',
    content: 'Streetwear bukan cuma soal brand mahal, tapi gimana kamu mix & match outfit dengan confidence...',
    image: 'https://images.unsplash.com/photo-1617152623457-4c9b639926d7?w=800',
    author: 'Tim Febsin',
    date: '20 Okt 2025',
    category: 'Fashion Tips'
  },
  {
    id: '2',
    title: 'Behind The Scene: Proses Produksi Febsin',
    slug: 'behind-the-scene-produksi',
    excerpt: 'Intip gimana proses pembuatan produk Febsin dari awal sampai jadi.',
    content: 'Setiap produk Febsin melalui quality control yang ketat. Mulai dari pemilihan bahan...',
    image: 'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=800',
    author: 'Feby',
    date: '18 Okt 2025',
    category: 'Behind The Brand'
  },
  {
    id: '3',
    title: 'Febsin x Sustainability: Komitmen Kami',
    slug: 'febsin-sustainability',
    excerpt: 'Bagaimana Febsin berkontribusi untuk lingkungan lebih baik melalui fashion sustainable.',
    content: 'Kami percaya bahwa fashion bisa jadi sustainable. Febsin berkomitmen menggunakan bahan ramah lingkungan...',
    image: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=800',
    author: 'Tim Febsin',
    date: '10 Okt 2025',
    category: 'Sustainability'
  }
];

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
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
    id: 'ORD-2025-001',
    date: '15 Okt 2025',
    status: 'delivered',
    total: 398000,
    items: [
      {
        productName: 'Febsin Classic Black Tee',
        quantity: 1,
        price: 179000,
        size: 'L'
      },
      {
        productName: 'Febsin Cap Classic',
        quantity: 1,
        price: 99000,
        size: 'One Size'
      }
    ],
    tracking: 'JP1234567890'
  },
  {
    id: 'ORD-2025-002',
    date: '18 Okt 2025',
    status: 'shipped',
    total: 349000,
    items: [
      {
        productName: 'Urban Hoodie Premium',
        quantity: 1,
        price: 349000,
        size: 'XL'
      }
    ],
    tracking: 'JP0987654321'
  }
];
