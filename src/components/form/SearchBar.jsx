import { Search } from "lucide-react";
const SearchBar = () => {
  return (
    <div className="w-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          placeholder="Search for care services..."
          className="w-full h-12 pl-12 pr-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 shadow-sm"
        />
      </div>
    </div>
  );
};

export default SearchBar;