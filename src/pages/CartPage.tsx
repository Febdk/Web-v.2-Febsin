import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { isAuthenticated } = useAuth();

  const subtotal = cart.reduce((sum, item) => {
    const price = item.memberPrice && isAuthenticated ? item.memberPrice : item.price;
    return sum + (price * item.quantity);
  }, 0);

  const shipping = subtotal >= 500000 ? 0 : 25000;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-gray-400" />
          <h1 className="text-3xl mb-4">Keranjang Kosong</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Belum ada produk di keranjang kamu. Yuk mulai belanja!
          </p>
          <Link to="/shop">
            <Button size="lg" className="bg-red-700 hover:bg-red-800">
              Mulai Belanja
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl mb-8">Keranjang Belanja</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => {
            const displayPrice = item.memberPrice && isAuthenticated ? item.memberPrice : item.price;
            
            return (
              <Card key={`${item.id}-${item.size}`} className="p-4">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-gray-100 dark:bg-gray-900 flex-shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Ukuran: {item.size}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-gray-400 hover:text-red-700 dark:hover:text-red-500"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-gray-300 dark:border-gray-700">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-1 border-x border-gray-300 dark:border-gray-700">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-red-700 dark:text-red-500">
                          Rp {(displayPrice * item.quantity).toLocaleString('id-ID')}
                        </p>
                        {item.memberPrice && isAuthenticated && item.memberPrice < item.price && (
                          <p className="text-xs text-gray-400 line-through">
                            Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Summary */}
        <div>
          <Card className="p-6 sticky top-24">
            <h2 className="text-2xl mb-4">Ringkasan Belanja</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span>Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Ongkir</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-green-600">GRATIS</span>
                  ) : (
                    `Rp ${shipping.toLocaleString('id-ID')}`
                  )}
                </span>
              </div>

              {subtotal < 500000 && (
                <p className="text-xs text-gray-500">
                  Belanja Rp {(500000 - subtotal).toLocaleString('id-ID')} lagi untuk gratis ongkir!
                </p>
              )}
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between mb-6">
              <span>Total</span>
              <span className="text-2xl text-red-700 dark:text-red-500">
                Rp {total.toLocaleString('id-ID')}
              </span>
            </div>

            {!isAuthenticated && (
              <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  Login untuk mendapatkan harga member dan hemat lebih banyak!
                </p>
              </div>
            )}

            <Link to="/checkout">
              <Button size="lg" className="w-full bg-red-700 hover:bg-red-800">
                Checkout
              </Button>
            </Link>

            <Link to="/shop">
              <Button variant="outline" size="lg" className="w-full mt-3">
                Lanjut Belanja
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
