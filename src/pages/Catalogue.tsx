import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  Filter,
  Headphones,
  MessageCircle,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react';
import { ProductCard } from '../components/product/ProductCard';
import { useStore } from '../store';
import { buildWhatsappUrl } from '../utils/whatsapp';

type SortOption = 'recommended' | 'name';

export function Catalogue() {
  const { products, categories, settings } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [sort, setSort] = useState<SortOption>('recommended');

  const selectedCategory = searchParams.get('categorie') || '';
  const publishedProducts = products.filter((product) => product.status === 'published');
  const activeCategories = categories.filter((category) => category.status === 'active');
  const whatsappUrl = buildWhatsappUrl(
    settings.whatsappNumber,
    'Bonjour, j’ai besoin d’aide pour choisir un logiciel adapté à mon activité. Mon métier est : [votre métier].'
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase('fr');
    const category = activeCategories.find(
      (currentCategory) => currentCategory.slug === selectedCategory
    );

    const matchingProducts = publishedProducts.filter((product) => {
      const matchesCategory = category ? product.categoryId === category.id : true;
      const searchableText = [
        product.name,
        product.shortDescription,
        ...product.profiles,
        ...product.usages,
      ]
        .join(' ')
        .toLocaleLowerCase('fr');
      const matchesSearch = normalizedSearch
        ? searchableText.includes(normalizedSearch)
        : true;
      return matchesCategory && matchesSearch;
    });

    return [...matchingProducts].sort((first, second) => {
      if (sort === 'name') return first.name.localeCompare(second.name, 'fr');
      if (first.isPopular !== second.isPopular) return first.isPopular ? -1 : 1;
      return first.sortOrder - second.sortOrder;
    });
  }, [activeCategories, publishedProducts, search, selectedCategory, sort]);

  const selectCategory = (slug: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (slug) nextParams.set('categorie', slug);
    else nextParams.delete('categorie');
    setSearchParams(nextParams);
  };

  const resetFilters = () => {
    setSearch('');
    setSort('recommended');
    setSearchParams({});
  };

  const hasFilters = Boolean(search.trim() || selectedCategory);

  return (
    <>
      <Helmet>
        <title>Catalogue de logiciels professionnels | Autodesk CI</title>
        <meta
          name="description"
          content="Trouvez Autodesk, SolidWorks, Lumion, SketchUp, V-Ray, Archicad et plus. Logiciels professionnels avec conseil et assistance en français."
        />
        <link rel="canonical" href="https://autodesk-ci.com/catalogue" />
      </Helmet>

      <section className="relative overflow-hidden bg-[#061f35] px-4 py-14 text-white sm:px-6 lg:px-8 lg:py-20">
        <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[.16em] text-sky-300">
                <Sparkles className="h-4 w-4" />
                Solutions professionnelles
              </span>
              <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-[-.03em] sm:text-5xl">
                Le bon logiciel pour votre prochain projet.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                Recherchez par nom, usage ou métier. Si vous hésitez, un conseiller vérifie
                gratuitement votre besoin avant toute commande.
              </p>
            </div>
            <div className="hidden items-center gap-8 rounded-2xl border border-white/10 bg-white/[.07] px-6 py-5 lg:flex">
              <div>
                <p className="text-2xl font-extrabold">{publishedProducts.length}</p>
                <p className="mt-1 text-xs text-slate-400">solutions disponibles</p>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <p className="text-2xl font-extrabold">{activeCategories.length}</p>
                <p className="mt-1 text-xs text-slate-400">familles de métiers</p>
              </div>
            </div>
          </div>

          <div className="relative mt-9 max-w-2xl">
            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <label htmlFor="catalogue-search" className="sr-only">
              Rechercher un logiciel, un usage ou un métier
            </label>
            <input
              id="catalogue-search"
              type="search"
              placeholder="Ex. AutoCAD, architecture, rendu 3D…"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-14 w-full rounded-2xl border border-white/10 bg-white pl-14 pr-12 text-sm font-medium text-slate-900 shadow-xl outline-none transition placeholder:text-slate-400 focus:ring-4 focus:ring-sky-400/20"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                aria-label="Effacer la recherche"
                className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            onClick={() => selectCategory('')}
            aria-pressed={!selectedCategory}
            className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-bold transition ${
              !selectedCategory
                ? 'bg-[#0a3d62] text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tous les logiciels
          </button>
          {activeCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => selectCategory(category.slug)}
              aria-pressed={selectedCategory === category.slug}
              className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-bold transition ${
                selectedCategory === category.slug
                  ? 'bg-[#0a3d62] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>

      <section className="bg-[#f7f9fb] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-extrabold text-slate-900">
                {filteredProducts.length} résultat{filteredProducts.length > 1 ? 's' : ''}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Sélectionnez une offre pour voir tous les détails.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {hasFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-sm font-bold text-slate-500 transition hover:text-[#0a3d62]"
                >
                  Réinitialiser
                </button>
              )}
              <div className="relative">
                <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <label htmlFor="catalogue-sort" className="sr-only">
                  Trier les produits
                </label>
                <select
                  id="catalogue-sort"
                  value={sort}
                  onChange={(event) => setSort(event.target.value as SortOption)}
                  className="h-11 appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-9 text-sm font-semibold text-slate-700 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                >
                  <option value="recommended">Recommandés</option>
                  <option value="name">Nom A–Z</option>
                </select>
              </div>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <Filter className="h-5 w-5" />
              </span>
              <h2 className="mt-5 text-xl font-extrabold text-slate-900">
                Aucun logiciel trouvé
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Essayez un autre terme ou demandez directement conseil à notre équipe.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Voir tout le catalogue
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#20bd5a]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Demander conseil
                </a>
              </div>
            </div>
          )}

          <aside className="mt-12 overflow-hidden rounded-[1.75rem] bg-[#0a3d62] text-white">
            <div className="grid items-center gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1fr_auto]">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-sky-200">
                  <Headphones className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-xl font-extrabold">Vous hésitez entre plusieurs logiciels ?</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">
                    Dites-nous votre métier et ce que vous souhaitez réaliser. Nous vous orientons
                    vers la solution adaptée avant de parler de paiement.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-blue-100">
                    {['Conseil personnalisé', 'Réponse en français', 'Sans engagement'].map(
                      (benefit) => (
                        <span key={benefit} className="flex items-center gap-1.5">
                          <Check className="h-3.5 w-3.5 text-emerald-300" />
                          {benefit}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#20bd5a]"
              >
                Parler à un conseiller
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </aside>

          <div className="mt-8 text-center">
            <Link
              to="/offre/autodesk"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0a3d62] hover:underline"
            >
              Découvrir notre offre Autodesk
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
