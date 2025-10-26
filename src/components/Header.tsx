import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Moon, Sun, ShoppingCart, User, Menu, X, Heart, Search } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { products } from '../data/mockData';
import febsinLogo from '../assets/logo-febsin.png';


export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user } = useAuth();
  const { cart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/lookbook', label: 'Lookbook' },
    { to: '/blog', label: 'Blog' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' }
  ];

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Search functionality
  const searchResults = searchQuery.trim()
    ? products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      setSearchQuery('');
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={febsinLogo} 
              alt="Febsin Logo" 
              className="h-10 w-auto transition-opacity hover:opacity-80" 
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`transition-colors hover:text-red-700 dark:hover:text-red-500 ${
                  location.pathname === link.to
                    ? 'text-red-700 dark:text-red-500'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden md:flex"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>

            {/* Wishlist */}
            {isAuthenticated && (
              <Link to="/dashboard?tab=wishlist">
                <Button variant="ghost" size="icon">
                  <Heart className="w-5 h-5" />
                </Button>
              </Link>
            )}

            {/* Cart */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-700 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* User */}
            <Link to={isAuthenticated ? '/dashboard' : '/login'}>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-200 dark:border-gray-800"
            >
              <div className="py-4 space-y-4">
                {navLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 transition-colors hover:text-red-700 dark:hover:text-red-500 ${
                      location.pathname === link.to
                        ? 'text-red-700 dark:text-red-500'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                {isAuthenticated && user && (
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                    <p className="text-gray-500 text-sm">Hi, {user.name}</p>
                    <p className="text-xs text-gray-400">Member Points: {user.points}</p>
                  </div>
                )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* Search Dialog */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Cari Produk</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSearch} className="space-y-4">
            <Input
              type="text"
              placeholder="Cari kaos, hoodie, aksesoris..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="w-full"
            />
            
            {/* Search Results */}
            {searchQuery.trim() && (
              <div className="space-y-2">
                {searchResults.length > 0 ? (
                  <>
                    <p className="text-sm text-gray-500">
                      {searchResults.length} produk ditemukan
                    </p>
                    <div className="grid gap-3 max-h-[400px] overflow-y-auto">
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          to={`/product/${product.id}`}
                          onClick={() => {
                            setSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="flex gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="truncate">{product.name}</h4>
                            <p className="text-sm text-gray-500">
                              {product.category}
                            </p>
                            <div className="flex gap-2 items-center mt-1">
                              <span className="text-red-700 dark:text-red-500">
                                Rp {product.price.toLocaleString('id-ID')}
                              </span>
                              {isAuthenticated && (
                                <span className="text-sm text-gray-500 line-through">
                                  Rp {product.memberPrice.toLocaleString('id-ID')}
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <Button type="submit" className="w-full mt-2">
                      Lihat Semua Hasil
                    </Button>
                  </>
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    Tidak ada produk yang ditemukan untuk "{searchQuery}"
                  </p>
                )}
              </div>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
}
