import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 600000]);

  const categories = ['Kaos', 'Kemeja', 'Hoodie', 'Aksesoris'];
  const genders = ['Pria', 'Wanita', 'Unisex'];
  const colors = ['Black', 'White', 'Navy', 'Grey', 'Maroon', 'Red-Black'];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search filter
      const searchMatch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const genderMatch = selectedGenders.length === 0 || selectedGenders.includes(product.gender);
      const colorMatch = selectedColors.length === 0 || product.colors.some(c => selectedColors.includes(c));
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return searchMatch && categoryMatch && genderMatch && colorMatch && priceMatch;
    });
  }, [searchQuery, selectedCategories, selectedGenders, selectedColors, priceRange]);

  const toggleFilter = (value: string, selected: string[], setter: (val: string[]) => void) => {
    if (selected.includes(value)) {
      setter(selected.filter(item => item !== value));
    } else {
      setter([...selected, value]);
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedGenders([]);
    setSelectedColors([]);
    setPriceRange([0, 600000]);
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedGenders.length > 0 || 
                           selectedColors.length > 0 || priceRange[0] !== 0 || priceRange[1] !== 600000;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="mb-3">Kategori</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category} className="flex items-center">
              <Checkbox
                id={`cat-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleFilter(category, selectedCategories, setSelectedCategories)}
              />
              <Label htmlFor={`cat-${category}`} className="ml-2 cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Gender Filter */}
      <div>
        <h3 className="mb-3">Gender</h3>
        <div className="space-y-2">
          {genders.map(gender => (
            <div key={gender} className="flex items-center">
              <Checkbox
                id={`gender-${gender}`}
                checked={selectedGenders.includes(gender)}
                onCheckedChange={() => toggleFilter(gender, selectedGenders, setSelectedGenders)}
              />
              <Label htmlFor={`gender-${gender}`} className="ml-2 cursor-pointer">
                {gender}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div>
        <h3 className="mb-3">Warna</h3>
        <div className="space-y-2">
          {colors.map(color => (
            <div key={color} className="flex items-center">
              <Checkbox
                id={`color-${color}`}
                checked={selectedColors.includes(color)}
                onCheckedChange={() => toggleFilter(color, selectedColors, setSelectedColors)}
              />
              <Label htmlFor={`color-${color}`} className="ml-2 cursor-pointer">
                {color}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="mb-3">Harga</h3>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={600000}
            step={10000}
            className="mb-4"
          />
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Rp {priceRange[0].toLocaleString('id-ID')}</span>
            <span>Rp {priceRange[1].toLocaleString('id-ID')}</span>
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <Button onClick={clearFilters} variant="outline" className="w-full">
          <X className="w-4 h-4 mr-2" />
          Clear Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl mb-4">Shop</h1>
        {searchQuery ? (
          <p className="text-gray-600 dark:text-gray-400">
            Hasil pencarian untuk <span className="text-red-700 dark:text-red-500">"{searchQuery}"</span>
            {' '}— {filteredProducts.length} produk ditemukan
          </p>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            Explore our complete collection of premium streetwear
          </p>
        )}
      </div>

      <div className="flex gap-8">
        {/* Desktop Filters */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="flex items-center">
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Filter
              </h2>
            </div>
            <FilterContent />
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1">
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-6 flex items-center justify-between">
            <p className="text-gray-600 dark:text-gray-400">
              {filteredProducts.length} produk ditemukan
            </p>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filter Produk</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Tidak ada produk yang sesuai dengan filter
              </p>
              <Button onClick={clearFilters} variant="outline">
                Reset Filter
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
