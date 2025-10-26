import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Separator } from "../components/ui/separator";
import { toast } from "sonner";
import { MessageCircle, Truck, Package, Zap } from "lucide-react";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    notes: "",
  });

  const [shippingMethod, setShippingMethod] = useState("jne");

  // Nomor WhatsApp Admin Febsin (format: 62xxx tanpa +, tanpa spasi)
  const ADMIN_WHATSAPP = "6285291619898"; // GANTI DENGAN NOMOR WA ADMIN YANG SEBENARNYA

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      navigate("/cart");
    }
  }, [cart.length, navigate]);

  if (cart.length === 0) {
    return null;
  }

  const subtotal = cart.reduce((sum, item) => {
    const price = item.memberPrice || item.price;
    return sum + price * item.quantity;
  }, 0);

  const shippingCost = subtotal >= 500000 ? 0 : 25000;
  const total = subtotal + shippingCost;

  const getShippingName = () => {
    switch (shippingMethod) {
      case "jne":
        return "JNE Regular (2-3 hari)";
      case "sicepat":
        return "SiCepat (2-3 hari)";
      case "jnt":
        return "J&T Express (2-3 hari)";
      default:
        return shippingMethod;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi form
    if (
      !formData.name ||
      !formData.phone ||
      !formData.address ||
      !formData.city
    ) {
      toast.error("Mohon lengkapi semua data yang wajib diisi");
      return;
    }

    // Format pesan WhatsApp
    let message = `*PESANAN BARU FEBSIN* 🛍️\n\n`;
    message += `*DATA PELANGGAN:*\n`;
    message += `👤 Nama: ${formData.name}\n`;
    message += `📧 Email: ${formData.email || "-"}\n`;
    message += `📱 No. HP: ${formData.phone}\n`;
    message += `📍 Alamat: ${formData.address}\n`;
    message += `🏙️ Kota: ${formData.city}\n`;
    if (formData.province) message += `📌 Provinsi: ${formData.province}\n`;
    message += `📮 Kode Pos: ${formData.postalCode || "-"}\n\n`;

    message += `*DETAIL PESANAN:*\n`;
    cart.forEach((item, index) => {
      const price = item.memberPrice || item.price;
      message += `${index + 1}. ${item.name}\n`;
      message += `   • Size: ${item.size}\n`;
      message += `   • Qty: ${item.quantity}\n`;
      message += `   • Harga: Rp ${price.toLocaleString("id-ID")}\n`;
      message += `   • Subtotal: Rp ${(price * item.quantity).toLocaleString(
        "id-ID"
      )}\n\n`;
    });

    message += `*PENGIRIMAN:*\n`;
    message += `📦 Metode: ${getShippingName()}\n`;
    message += `💰 Ongkir: ${
      shippingCost === 0
        ? "GRATIS ✅"
        : "Rp " + shippingCost.toLocaleString("id-ID")
    }\n\n`;

    if (formData.notes) {
      message += `*CATATAN:*\n`;
      message += `📝 ${formData.notes}\n\n`;
    }

    message += `*RINGKASAN PEMBAYARAN:*\n`;
    message += `• Subtotal: Rp ${subtotal.toLocaleString("id-ID")}\n`;
    message += `• Ongkir: ${
      shippingCost === 0
        ? "GRATIS"
        : "Rp " + shippingCost.toLocaleString("id-ID")
    }\n`;
    message += `━━━━━━━━━━━━━━━━\n`;
    message += `*TOTAL: Rp ${total.toLocaleString("id-ID")}*\n\n`;
    message += `_Mohon konfirmasi pesanan ini. Terima kasih! 🙏_`;

    // Encode pesan untuk URL WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodedMessage}`;

    // Buka WhatsApp
    window.open(whatsappUrl, "_blank");

    // Tampilkan toast dan clear cart
    toast.success("Mengarahkan ke WhatsApp...", {
      description: "Silakan kirim pesan pesanan Anda ke admin",
    });

    // Clear cart dan redirect
    setTimeout(() => {
      clearCart();
      navigate("/shop");
    }, 1500);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl mb-2">Checkout</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Lengkapi data di bawah untuk melanjutkan pesanan via WhatsApp
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address */}
              <Card className="p-6">
                <h2 className="text-2xl mb-4">Alamat Pengiriman</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="name">Nama Lengkap *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Masukkan nama lengkap"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Nomor HP (WhatsApp) *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="08123456789"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Pastikan nomor WhatsApp aktif untuk konfirmasi pesanan
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@example.com"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="address">Alamat Lengkap *</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      placeholder="Jl. Contoh No. 123, RT/RW, Kelurahan, Kecamatan"
                    />
                  </div>

                  <div>
                    <Label htmlFor="city">Kota *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Jakarta"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="province">Provinsi</Label>
                    <Input
                      id="province"
                      name="province"
                      value={formData.province}
                      onChange={handleInputChange}
                      placeholder="DKI Jakarta"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="postalCode">Kode Pos</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="12345"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="notes">Catatan Pesanan</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Contoh: Kirim sebelum tanggal 20, atau warna alternatif jika stok habis"
                    />
                  </div>
                </div>
              </Card>

              {/* Shipping Method */}
              <Card className="p-6">
                <h2 className="text-2xl mb-4">Metode Pengiriman</h2>

                <RadioGroup
                  value={shippingMethod}
                  onValueChange={setShippingMethod}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:border-red-700 transition-colors">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="jne" id="jne" />
                        <Truck className="w-5 h-5 text-red-700" />
                        <Label htmlFor="jne" className="cursor-pointer">
                          <div>
                            <p>JNE Regular</p>
                            <p className="text-sm text-gray-500">
                              Estimasi 2-3 hari
                            </p>
                          </div>
                        </Label>
                      </div>
                      <span className="text-sm">
                        {shippingCost === 0 ? (
                          <span className="text-green-600">GRATIS</span>
                        ) : (
                          "Rp 25.000"
                        )}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg hover:border-red-700 transition-colors">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="sicepat" id="sicepat" />
                        <Zap className="w-5 h-5 text-red-700" />
                        <Label htmlFor="sicepat" className="cursor-pointer">
                          <div>
                            <p>SiCepat</p>
                            <p className="text-sm text-gray-500">
                              Estimasi 2-3 hari
                            </p>
                          </div>
                        </Label>
                      </div>
                      <span className="text-sm">
                        {shippingCost === 0 ? (
                          <span className="text-green-600">GRATIS</span>
                        ) : (
                          "Rp 25.000"
                        )}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg hover:border-red-700 transition-colors">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="jnt" id="jnt" />
                        <Package className="w-5 h-5 text-red-700" />
                        <Label htmlFor="jnt" className="cursor-pointer">
                          <div>
                            <p>J&T Express</p>
                            <p className="text-sm text-gray-500">
                              Estimasi 2-3 hari
                            </p>
                          </div>
                        </Label>
                      </div>
                      <span className="text-sm">
                        {shippingCost === 0 ? (
                          <span className="text-green-600">GRATIS</span>
                        ) : (
                          "Rp 25.000"
                        )}
                      </span>
                    </div>
                  </div>
                </RadioGroup>

                {subtotal >= 500000 && (
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="text-sm text-green-700 dark:text-green-400">
                      🎉 Selamat! Anda mendapatkan gratis ongkir untuk pembelian
                      di atas Rp 500.000
                    </p>
                  </div>
                )}
              </Card>

              {/* WhatsApp Info */}
              <Card className="p-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <div className="flex items-start space-x-3">
                  <MessageCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg mb-2">Checkout via WhatsApp</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Setelah klik tombol "Checkout via WhatsApp", Anda akan
                      diarahkan ke WhatsApp untuk mengirim detail pesanan ke
                      admin Febsin. Admin kami akan segera memproses pesanan dan
                      memberikan informasi pembayaran.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="p-6 sticky top-24">
                <h2 className="text-2xl mb-4">Ringkasan Pesanan</h2>

                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {cart.map((item) => {
                    const price = item.memberPrice || item.price;
                    return (
                      <div
                        key={`${item.id}-${item.size}`}
                        className="flex justify-between text-sm gap-2"
                      >
                        <span className="text-gray-600 dark:text-gray-400 flex-1">
                          {item.name}
                          <span className="block text-xs">
                            Size: {item.size} • Qty: {item.quantity}
                          </span>
                        </span>
                        <span className="text-right">
                          Rp {(price * item.quantity).toLocaleString("id-ID")}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <Separator className="my-4" />

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Subtotal
                    </span>
                    <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Ongkir
                    </span>
                    <span>
                      {shippingCost === 0 ? (
                        <span className="text-green-600">GRATIS</span>
                      ) : (
                        `Rp ${shippingCost.toLocaleString("id-ID")}`
                      )}
                    </span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between mb-6">
                  <span>Total</span>
                  <span className="text-2xl text-red-700 dark:text-red-500">
                    Rp {total.toLocaleString("id-ID")}
                  </span>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Checkout via WhatsApp
                </Button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Dengan melakukan pemesanan, Anda menyetujui syarat dan
                  ketentuan Febsin
                </p>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
