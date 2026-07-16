import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, Filter, X } from 'lucide-react';
import { useStore } from '../store';
import { ProductCard } from '../components/product/ProductCard';

export function Catalogue() {
  const { products, categories } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');

  const selectedCat = searchParams.get('categorie') || '';

  const publishedProducts = products.filter((p) => p.status === 'published');
  const activeCategories = categories.filter((c) => c.status === 'active');

  const filtered = useMemo(() => {
    let list = publishedProducts;
    if (selectedCat) {
      const cat = activeCategories.find((c) => c.slug === selectedCat);
      if (cat) list = list.filter((p) => p.categoryId === cat.id);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.profiles.some((prof) => prof.toLowerCase().includes(q))
      );
    }
    return list.sort((a, b) => a.sortOrder - b.sortOrder);
  }, [publishedProducts, selectedCat, search, activeCategories]);

  const setCategory = (slug: string) => {
    if (slug) setSearchParams({ categorie: slug });
    else setSearchParams({});
  };

  return (
    <>
      <Helmet>
        <title>Catalogue de logiciels professionnels | Autodesk CI</title>
        <meta
          name="description"
          content="Catalogue complet : Autodesk, SolidWorks, Lumion, SketchUp, V-Ray, Archicad, Enscape, Microsoft 365, Acrobat Pro. Logiciels pour architectes, ingénieurs et professionnels."
        />
        <link rel="canonical" href="https://autodesk-ci.com/catalogue" />
      </Helmet>

      {/* Header */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Catalogue de logiciels</h1>
          <p className="text-gray-600 text-lg">
            {publishedProducts.length} logiciels professionnels pour votre activité
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un logiciel..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategory('')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !selectedCat
                  ? 'bg-navy text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tous
            </button>
            {activeCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.slug)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCat === cat.slug
                    ? 'bg-navy text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <Filter className="w-10 h-10 mx-auto mb-3 text-gray-300" />
            <p className="text-lg font-medium">Aucun résultat</p>
            <p className="text-sm mt-1">Modifiez vos critères ou consultez tout le catalogue.</p>
            <button
              onClick={() => { setSearch(''); setCategory(''); }}
              className="mt-4 text-sm font-semibold text-navy hover:underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </>
  );
}
