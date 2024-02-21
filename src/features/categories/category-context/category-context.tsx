import { ReactNode, useState } from "react";
import { createContext } from "react";

type categoryType = { id: number; name: string };

const defaultValue: {
  category: categoryType | null;
  setCategory:
    | React.Dispatch<React.SetStateAction<categoryType | null>>
    | null;
} = {
  category: null,
  setCategory: null,
};

export const CategoryContext = createContext(defaultValue);

const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [category, setCategory] = useState<categoryType | null>(null);

  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
