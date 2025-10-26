import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { products, mockOrders } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { User, Package, Heart, Award, LogOut, Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import ProductCard from '../components/ProductCard';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, isAuthenticated, logout } = useAuth();
  const { wishlist } = useCart();
  
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'profile');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  if (!user) return null;

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  const handleLogout = () => {
    logout();
    toast.success('Berhasil logout');
    navigate('/');
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'secondary',
      processing: 'default',
      shipped: 'default',
      delivered: 'default',
      cancelled: 'destructive'
    } as const;

    const labels = {
      pending: 'Menunggu Pembayaran',
      processing: 'Diproses',
      shipped: 'Dikirim',
      delivered: 'Selesai',
      cancelled: 'Dibatalkan'
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Selamat datang kembali, {user.name}!
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
          <TabsTrigger value="profile">
            <User className="w-4 h-4 mr-2" />
            Profil
          </TabsTrigger>
          <TabsTrigger value="orders">
            <Package className="w-4 h-4 mr-2" />
            Pesanan
          </TabsTrigger>
          <TabsTrigger value="wishlist">
            <Heart className="w-4 h-4 mr-2" />
            Wishlist
          </TabsTrigger>
          <TabsTrigger value="rewards">
            <Award className="w-4 h-4 mr-2" />
            Rewards
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Informasi Profil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-20 h-20 rounded-full"
                  />
                  <div>
                    <h3>{user.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Member sejak {user.memberSince}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div>
                    <Label>Nama Lengkap</Label>
                    <Input defaultValue={user.name} />
                  </div>

                  <div>
                    <Label>Email</Label>
                    <Input type="email" defaultValue={user.email} disabled />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Nomor HP</Label>
                      <Input placeholder="+62 812 3456 7890" />
                    </div>
                    <div>
                      <Label>Tanggal Lahir</Label>
                      <Input type="date" />
                    </div>
                  </div>

                  <div>
                    <Label>Alamat</Label>
                    <Input placeholder="Alamat lengkap" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Kota</Label>
                      <Input placeholder="Sragen" />
                    </div>
                    <div>
                      <Label>Kode Pos</Label>
                      <Input placeholder="12345" />
                    </div>
                  </div>

                  <Button className="bg-red-700 hover:bg-red-800">
                    Simpan Perubahan
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Statistik</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total Pesanan</span>
                    <span>{mockOrders.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Wishlist</span>
                    <span>{wishlist.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Poin Reward</span>
                    <span className="text-red-700 dark:text-red-500">{user.points} pts</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <Button
                    variant="outline"
                    className="w-full text-red-700 border-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Pesanan</CardTitle>
            </CardHeader>
            <CardContent>
              {mockOrders.length > 0 ? (
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3>{order.id}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {order.date}
                          </p>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>

                      <Separator className="my-4" />

                      <div className="space-y-2 mb-4">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>
                              {item.productName} ({item.size}) x{item.quantity}
                            </span>
                            <span>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                          </div>
                        ))}
                      </div>

                      <Separator className="my-4" />

                      <div className="flex items-center justify-between">
                        <span>Total</span>
                        <span className="text-red-700 dark:text-red-500">
                          Rp {order.total.toLocaleString('id-ID')}
                        </span>
                      </div>

                      {order.tracking && (
                        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900 rounded">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Nomor Resi: <span className="text-gray-900 dark:text-gray-100">{order.tracking}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Belum ada pesanan
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Wishlist Tab */}
        <TabsContent value="wishlist">
          {wishlistProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Heart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Wishlist kamu masih kosong
                </p>
                <Button onClick={() => navigate('/shop')} variant="outline">
                  Mulai Belanja
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Rewards Tab */}
        <TabsContent value="rewards">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Poin Reward Kamu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 mb-6">
                  <div className="inline-block p-8 bg-red-50 dark:bg-red-950 rounded-full mb-4">
                    <Award className="w-16 h-16 text-red-700 dark:text-red-500" />
                  </div>
                  <h2 className="text-5xl text-red-700 dark:text-red-500 mb-2">
                    {user.points}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Total Poin Reward
                  </p>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3>Cara Mendapatkan Poin</h3>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>✓ Belanja Rp 100.000 = 10 poin</li>
                    <li>✓ Review produk = 5 poin</li>
                    <li>✓ Referral teman = 50 poin</li>
                    <li>✓ Ulang tahun = 100 poin</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tukar Poin</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="mb-2">Diskon Rp 50.000</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    100 poin
                  </p>
                  <Button variant="outline" size="sm" className="w-full" disabled>
                    Poin tidak cukup
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="mb-2">Diskon Rp 100.000</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    200 poin
                  </p>
                  <Button variant="outline" size="sm" className="w-full" disabled>
                    Poin tidak cukup
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="mb-2">Gratis Ongkir</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    50 poin
                  </p>
                  <Button variant="outline" size="sm" className="w-full" disabled>
                    Poin tidak cukup
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
