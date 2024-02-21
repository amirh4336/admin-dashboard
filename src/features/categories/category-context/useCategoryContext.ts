import { useContext } from "react";
import { CategoryContext } from "./category-context";

const useCategoryContext = () => {
  return useContext(CategoryContext);
};

export default useCategoryContext