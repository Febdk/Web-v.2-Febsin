import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import { toast } from 'sonner';
import febsinLogo from '../assets/logo-febsin.png';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Terima kasih! Kamu sudah subscribe newsletter Febsin');
      setEmail('');
    }
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
           <div>
            <div className="mb-4">
              <img 
                src={febsinLogo} 
                alt="Febsin Logo" 
                className="h-8 w-auto" 
              />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Brand fashion lokal Indonesia yang menghadirkan gaya streetwear modern dengan kualitas premium.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-red-700 dark:hover:text-red-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-red-700 dark:hover:text-red-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-red-700 dark:hover:text-red-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-gray-600 dark:text-gray-400 hover:text-red-700 dark:hover:text-red-500 text-sm transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-red-700 dark:hover:text-red-500 text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-red-700 dark:hover:text-red-500 text-sm transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-red-700 dark:hover:text-red-500 text-sm transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-400 text-sm">
                Cara Pemesanan
              </li>
              <li className="text-gray-600 dark:text-gray-400 text-sm">
                Shipping & Returns
              </li>
              <li className="text-gray-600 dark:text-gray-400 text-sm">
                Size Guide
              </li>
              <li className="text-gray-600 dark:text-gray-400 text-sm">
                FAQ
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="mb-4">Newsletter</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Dapatkan info promo & koleksi terbaru!
            </p>
            <form onSubmit={handleNewsletter} className="space-y-2 mb-4">
              <Input
                type="email"
                placeholder="Email kamu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="w-full bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700">
                Subscribe
              </Button>
            </form>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                <Mail className="w-4 h-4 mr-2" />
                hello@febsin.id
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                <Phone className="w-4 h-4 mr-2" />
                +62 812 3456 7890
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mr-2" />
                Sragen, Jawa Tengah, Indonesia
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>&copy; 2025 Febsin. All rights reserved. Made with ❤️ in Indonesia</p>
        </div>
      </div>
    </footer>
  );
}
