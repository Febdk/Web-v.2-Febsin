import { useState } from 'react';
import { motion } from 'motion/react';
import { 
 // LayoutDashboard, (untuk halaman admin)
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  Plus,
  Edit,
  Trash2,
  BarChart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
//import { Input } from '../components/ui/input'; (untuk halaman admin)
//import { Label } from '../components/ui/label'; (untuk halaman admin)
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { products, mockOrders } from '../data/mockData';
import { toast } from 'sonner';

export default function AdminPage() {
  const [stats] = useState({
    totalRevenue: 15750000,
    totalOrders: 42,
    totalProducts: products.length,
    totalCustomers: 128
  });

  const handleEditProduct = (id: string) => {
    toast.info(`Edit produk ${id} (Coming Soon)`);
  };

  const handleDeleteProduct = (id: string) => {
    toast.error(`Hapus produk ${id} (Coming Soon)`);
  };

  const handleAddProduct = () => {
    toast.info('Tambah produk baru (Coming Soon)');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl mb-2">Admin Panel</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Kelola produk, pesanan, dan statistik Febsin
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Total Revenue
                  </p>
                  <h3 className="text-2xl">
                    Rp {stats.totalRevenue.toLocaleString('id-ID')}
                  </h3>
                  <p className="text-xs text-green-600 mt-1">
                    +12.5% dari bulan lalu
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Total Orders
                  </p>
                  <h3 className="text-2xl">{stats.totalOrders}</h3>
                  <p className="text-xs text-blue-600 mt-1">
                    5 pending orders
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Total Products
                  </p>
                  <h3 className="text-2xl">{stats.totalProducts}</h3>
                  <p className="text-xs text-purple-600 mt-1">
                    4 low stock items
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Total Customers
                  </p>
                  <h3 className="text-2xl">{stats.totalCustomers}</h3>
                  <p className="text-xs text-red-600 mt-1">
                    +23 new this month
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="products">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
          <TabsTrigger value="products">
            <Package className="w-4 h-4 mr-2" />
            Produk
          </TabsTrigger>
          <TabsTrigger value="orders">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Pesanan
          </TabsTrigger>
          <TabsTrigger value="customers">
            <Users className="w-4 h-4 mr-2" />
            Pelanggan
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart className="w-4 h-4 mr-2" />
            Analitik
          </TabsTrigger>
        </TabsList>

        {/* Products Tab */}
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Manajemen Produk</CardTitle>
                <Button onClick={handleAddProduct} className="bg-red-700 hover:bg-red-800">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Produk
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produk</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Harga</TableHead>
                      <TableHead>Stok</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-10 h-10 object-cover rounded mr-3"
                            />
                            <span>{product.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>Rp {product.price.toLocaleString('id-ID')}</TableCell>
                        <TableCell>
                          <span className={product.stock < 10 ? 'text-red-600' : ''}>
                            {product.stock}
                          </span>
                        </TableCell>
                        <TableCell>
                          {product.stock > 0 ? (
                            <Badge>In Stock</Badge>
                          ) : (
                            <Badge variant="destructive">Sold Out</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditProduct(product.id)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Manajemen Pesanan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Tracking</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>Rp {order.total.toLocaleString('id-ID')}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              order.status === 'delivered'
                                ? 'default'
                                : order.status === 'cancelled'
                                ? 'destructive'
                                : 'secondary'
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {order.tracking || '-'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle>Data Pelanggan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 text-center py-12">
                Customer management coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analitik Penjualan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 text-center py-12">
                Analytics dashboard coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
