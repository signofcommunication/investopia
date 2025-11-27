import { useState } from "react";
import SearchInput from "../ui/SearchInput";
import GlossaryList from "./GlossaryList";
import { glossaryData } from "./glossary-data";

const GlossarySection = () => {
  const [search, setSearch] = useState("");

  const filtered = glossaryData.filter(item =>
    item.term.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-6">
          Glosarium Investopia
        </h2>

        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
          Temukan berbagai istilah investasi dari A sampai Z untuk membantu
          perjalanan belajarmu.
        </p>

        <SearchInput value={search} onChange={setSearch} />

        <GlossaryList items={filtered} />
      </div>
    </section>
  );
};

export default GlossarySection;
