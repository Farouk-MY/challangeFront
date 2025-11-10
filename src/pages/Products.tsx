import { useEffect, useState, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { loadProducts, loadCategories, setCategory, setPriceRange, setRatingFilter, setSortBy, setCurrentPage } from "@/store/slices/productsSlice";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";

const Products = () => {
  const dispatch = useAppDispatch();
  const { filteredItems, categories, loading, priceRange, selectedCategory, sortBy, currentPage, itemsPerPage } = useAppSelector((state) => state.products);
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    dispatch(loadProducts());
    dispatch(loadCategories());
  }, [dispatch]);

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-orbitron font-bold mb-8">
          <span className="elegant-text">Products</span>
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <Card className="glass-strong border-border/50 p-4 sm:p-6 h-fit lg:sticky lg:top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-orbitron font-bold">Filters</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-5 w-5" />
              </Button>
            </div>

            {showFilters && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Category</h3>
                  <div className="space-y-2">
                    <Button variant={!selectedCategory ? "default" : "outline"} onClick={() => dispatch(setCategory(null))} className="w-full justify-start">
                      All
                    </Button>
                    {categories.map((cat) => (
                      <Button key={cat} variant={selectedCategory === cat ? "default" : "outline"} onClick={() => dispatch(setCategory(cat))} className="w-full justify-start capitalize">
                        {cat}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <Slider value={priceRange} onValueChange={(val) => dispatch(setPriceRange(val as [number, number]))} max={1000} step={10} className="mb-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Sort By</h3>
                  <Select value={sortBy} onValueChange={(val: any) => dispatch(setSortBy(val))}>
                    <SelectTrigger className="glass border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popularity">Popularity</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </Card>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <p className="text-muted-foreground mb-6">{filteredItems.length} products found</p>
            
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="glass-strong border-border/50 p-4">
                    <Skeleton className="w-full h-48 mb-4" />
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </Card>
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {paginatedItems.map((product: any) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>

                      {[...Array(totalPages)].map((_, index) => {
                        const page = index + 1;
                        // Show first page, last page, current page, and pages around current
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <PaginationItem key={page}>
                              <PaginationLink
                                onClick={() => handlePageChange(page)}
                                isActive={currentPage === page}
                                className="cursor-pointer"
                              >
                                {page}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        } else if (page === currentPage - 2 || page === currentPage + 2) {
                          return (
                            <PaginationItem key={page}>
                              <PaginationEllipsis />
                            </PaginationItem>
                          );
                        }
                        return null;
                      })}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Products;
