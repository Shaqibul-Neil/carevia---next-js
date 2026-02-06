"use client";
import { SearchIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search?.value;
    //creating query string using browser/web api URLSearchParams
    const params = new URLSearchParams(searchParams);
    if (searchTerm)
      params.set("searchTerm", searchTerm); //searchTerm is key
    else params.delete("searchTerm");
    router.push(`${pathName}?${params.toString()}`);
  };
  return (
    <form className="w-full" onSubmit={handleSearch}>
      <InputGroup
        className={cn(
          "h-12 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 shadow-sm",
        )}
      >
        {/* search icon */}
        <InputGroupAddon align="inline-start" className="pl-4">
          <SearchIcon className="size-5 text-muted-foreground" />
        </InputGroupAddon>
        {/* input field */}
        <InputGroupInput name="search" placeholder="Search for services..." />
        {/* search button */}
        <InputGroupAddon align="inline-end" className="pr-3.5">
          <InputGroupButton
            type="submit"
            size="icon-sm"
            variant="default"
            className="bg-primary hover:bg-primary/90 text-white  w-20 h-8 font-medium transition-all cursor-pointer rounded-sm"
            align="inline-end"
          >
            Search
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
};

export default SearchBar;
