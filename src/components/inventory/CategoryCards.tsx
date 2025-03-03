
import React from "react";
import { getCategoryIcon } from "@/utils/categoryIcons";
import { inventoryMock } from "@/types/inventory";
import { useInventoryState } from "@/hooks/useInventoryState";

interface CategoryCardsProps {
  activeCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

const CategoryCards: React.FC<CategoryCardsProps> = ({ activeCategory, onCategorySelect }) => {
  // Utiliser directement productCategories à partir du hook
  const { productCategories } = useInventoryState();
  const categories = Object.keys(productCategories);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {categories.map((category) => (
        <div 
          key={category}
          className={`card-glass rounded-xl p-5 flex items-center justify-between cursor-pointer hover:translate-y-[-2px] transition-all duration-300 ${activeCategory === category ? 'ring-2 ring-primary' : ''}`}
          onClick={() => onCategorySelect(activeCategory === category ? null : category)}
        >
          <div>
            <h3 className="text-lg font-semibold">{category}</h3>
            <p className="text-muted-foreground mt-1">
              {inventoryMock.filter(item => item.category === category).length} articles
            </p>
          </div>
          <div className={`text-primary ${activeCategory === category ? 'bg-primary text-primary-foreground' : 'bg-primary/10'} p-3 rounded-full`}>
            {getCategoryIcon(category)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryCards;
