import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCategory, setPriceRange, setRatingFilter, setSortBy, clearFilters } from "@/store/slices/productsSlice";
import { X } from "lucide-react";

export function ProductFilters() {
  const dispatch = useAppDispatch();
  const { categories, selectedCategory, priceRange, ratingFilter, sortBy } = useAppSelector(
    (state) => state.products
  );

  return (
    <Card className="glass-strong border-border/50 p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-orbitron font-bold text-lg">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => dispatch(clearFilters())}
          className="text-primary hover:text-primary/80"
        >
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      </div>

      <div className="space-y-6">
        {/* Sort By */}
        <div>
          <Label className="font-orbitron mb-2 block">Sort By</Label>
          <Select value={sortBy} onValueChange={(value: any) => dispatch(setSortBy(value))}>
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

        {/* Category */}
        <div>
          <Label className="font-orbitron mb-2 block">Category</Label>
          <Select value={selectedCategory || "all"} onValueChange={(value) => dispatch(setCategory(value === "all" ? null : value))}>
            <SelectTrigger className="glass border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div>
          <Label className="font-orbitron mb-2 block">
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </Label>
          <Slider
            min={0}
            max={1000}
            step={10}
            value={priceRange}
            onValueChange={(value) => dispatch(setPriceRange(value as [number, number]))}
            className="mt-2"
          />
        </div>

        {/* Rating */}
        <div>
          <Label className="font-orbitron mb-2 block">Minimum Rating</Label>
          <Select
            value={ratingFilter.toString()}
            onValueChange={(value) => dispatch(setRatingFilter(Number(value)))}
          >
            <SelectTrigger className="glass border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">All Ratings</SelectItem>
              <SelectItem value="4">4★ & above</SelectItem>
              <SelectItem value="3">3★ & above</SelectItem>
              <SelectItem value="2">2★ & above</SelectItem>
              <SelectItem value="1">1★ & above</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
}
