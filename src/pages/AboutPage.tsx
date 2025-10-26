import { motion } from 'motion/react';
import { Heart, Target, Users, Leaf } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import teamAbdullah from '../assets/foto-abdul.png';
import teamFeby from '../assets/foto-feby.png';
import teamRio from '../assets/foto-rio.png';

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'Kami mencintai fashion dan percaya bahwa setiap orang berhak tampil percaya diri'
    },
    {
      icon: Target,
      title: 'Quality First',
      description: 'Kualitas premium adalah prioritas kami, dari pemilihan bahan hingga proses produksi'
    },
    {
      icon: Users,
      title: 'Local Pride',
      description: 'Bangga sebagai brand lokal yang mengangkat kebudayaan dan craftsmanship Indonesia'
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'Berkomitmen pada praktik produksi yang ramah lingkungan dan berkelanjutan'
    }
  ];

  const team = [
    {
      name: 'Feby',
      role: 'Founder & Creative Director',
      image: teamFeby,
      description: 'Visioner di balik Febsin dengan pengalaman 10+ tahun di industri fashion'
    },
    {
      name: 'Rio R.S',
      role: 'Head of Design',
      image: teamRio,
      description: 'Merancang koleksi yang modern dan timeless'
    },
    {
      name: 'Abdullah S',
      role: 'Production Manager',
      image: teamAbdullah,
      description: 'Memastikan setiap produk memenuhi standar kualitas tertinggi'
    }
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[500px] overflow-hidden bg-black">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1719586902338-bbfa49db95fc?w=1920"
          alt="About Febsin"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl lg:text-6xl mb-4"
            >
              About Febsin
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-300 max-w-2xl mx-auto px-4"
            >
              Streetwear lokal dengan jiwa Indonesia
            </motion.p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl mb-6">Cerita Kami</h2>
              <div className="space-y-6 text-left text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  Febsin lahir bukan dari ruang rapat atau rencana besar di atas kertas — tapi dari perjalanan hidup seorang anak muda bernama Feby, yang cuma punya satu keyakinan sederhana:
                </p>
                
                <p className="italic text-center px-8">
                  "Kalau orang lain bisa sukses dengan karya mereka, kenapa anak lokal gak bisa?"
                </p>
                
                <p>
                  Nama Febsin sendiri diambil dari gabungan dua makna: "Feb" dari nama pendirinya, Feby, dan "Sin" yang berarti signature, sincerity, and simplicity. Artinya, setiap karya Febsin membawa tanda tangan kejujuran, ketulusan, dan kesederhanaan dalam gaya.
                </p>
                
                <p>
                  Dari kamar kecil di Sragen, ide itu mulai dirakit — bukan cuma soal bikin baju, tapi bikin identitas. Setiap desain Febsin lahir dari pikiran yang capek tapi tetap semangat, dari rasa lelah tapi nggak mau nyerah. Dijahit dengan prinsip bahwa "produk lokal juga pantas tampil percaya diri, tanpa harus jadi tiruan siapa pun."
                </p>
                
                <p>
                  Febsin tumbuh bareng semangat anak muda Indonesia yang mau kerja keras, mau belajar, dan mau berproses. Dibalik setiap potongan kain, ada mimpi yang dijahit rapi: buat ngebuktiin kalau brand lokal bisa se-edgy dan sekuat brand luar, asal dibuat dengan hati.
                </p>
                
                <p>
                  Sekarang, Febsin bukan cuma tentang pakaian — tapi tentang perjuangan, jati diri, dan semangat untuk terus tumbuh. Buat Febsin, setiap produk adalah karya, setiap karya adalah cerita, dan setiap cerita adalah langkah buat ngebangun masa depan yang lebih kuat dari kemarin.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl mb-4">Nilai Kami</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Prinsip yang menjadi fondasi setiap keputusan dan produk yang kami buat
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-red-700 dark:bg-red-600 rounded-full flex items-center justify-center">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="mb-3">{value.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl mb-4">Meet The Team</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Orang-orang passionate di balik setiap produk Febsin
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-900">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="mb-1">{member.name}</h3>
                <p className="text-red-700 dark:text-red-500 text-sm mb-2">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Leaf className="w-16 h-16 mx-auto mb-6 text-green-600" />
              <h2 className="text-4xl mb-6">Komitmen Sustainability</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Kami sadar bahwa industri fashion memiliki dampak besar terhadap lingkungan. Oleh karena itu, 
                  Febsin berkomitmen untuk terus mengembangkan praktik produksi yang lebih sustainable.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="p-4 border border-green-200 dark:border-green-800 rounded-lg">
                    <h4 className="text-green-700 dark:text-green-500 mb-2">One Sale One Tree</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Setiap penjualan akan di investasikan untuk pembelian bibit pohon
                    </p>
                  </div>
                  <div className="p-4 border border-green-200 dark:border-green-800 rounded-lg">
                    <h4 className="text-green-700 dark:text-green-500 mb-2">Produksi Lokal</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Mengurangi carbon footprint dengan produksi di Indonesia
                    </p>
                  </div>
                  <div className="p-4 border border-green-200 dark:border-green-800 rounded-lg">
                    <h4 className="text-green-700 dark:text-green-500 mb-2">Zero Waste Goal</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Meminimalkan waste di setiap tahap produksi
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
