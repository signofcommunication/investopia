import { type GlossaryItem } from "./glossary-data";

interface Props {
  items: GlossaryItem[];
}

const GlossaryList: React.FC<Props> = ({ items }) => {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="p-5 border rounded-xl bg-white shadow-sm hover:shadow-md transition"
        >
          <h3 className="text-lg font-semibold text-blue-600">{item.term}</h3>
          <p className="text-gray-600 mt-1">{item.definition}</p>
        </div>
      ))}
    </div>
  );
};

export default GlossaryList;
