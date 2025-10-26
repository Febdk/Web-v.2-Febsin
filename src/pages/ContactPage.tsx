import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Pesan terkirim! Kami akan segera menghubungi kamu.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'hello@febsin.id',
      description: 'Kirim email untuk pertanyaan umum'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+62 812 3456 7890',
      description: 'Senin - Sabtu, 09:00 - 18:00 WIB'
    },
    {
      icon: MapPin,
      title: 'Alamat',
      value: 'Jl. Raya Sragen No. 123',
      description: 'Sragen, Jawa Tengah, Indonesia'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      value: '+62 812 3456 7890',
      description: 'Chat langsung dengan customer service'
    }
  ];

  const handleWhatsApp = () => {
    window.open('https://wa.me/6281234567890', '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl mb-4">Hubungi Kami</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Ada pertanyaan atau butuh bantuan? Kami siap membantu kamu!
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Contact Info Cards */}
        <div className="lg:col-span-1 space-y-6">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-red-700 dark:bg-red-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="mb-1">{info.title}</h3>
                      <p className="text-red-700 dark:text-red-500 mb-1">
                        {info.value}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
              <CardContent className="p-6 text-center">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="mb-2">Chat via WhatsApp</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Butuh respon cepat? Chat langsung dengan kami
                </p>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleWhatsApp}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat Sekarang
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl mb-6">Kirim Pesan</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Nama Lengkap *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Nama kamu"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject">Subjek *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Subjek pesan"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Pesan *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tulis pesan kamu di sini..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-red-700 hover:bg-red-800"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Kirim Pesan
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Map Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <Card>
          <CardContent className="p-0">
            <div className="aspect-video bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="mb-2">Lokasi Toko Kami</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Jl. Raya Sragen No. 123<br />
                  Sragen, Jawa Tengah, Indonesia
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Buka: Senin - Sabtu, 10:00 - 20:00 WIB
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-3xl mb-4">Pertanyaan Umum</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Cek halaman FAQ kami untuk jawaban cepat atas pertanyaan yang sering ditanyakan
        </p>
        <Button variant="outline" size="lg">
          Lihat FAQ
        </Button>
      </motion.div>
    </div>
  );
}
