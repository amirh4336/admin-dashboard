import { defer } from "react-router-dom";
import { httpInterceptedService } from "../../core/https-server";
import { ICategory } from "../../interface/coursesData";

export interface IDefercategories {
  categories: ICategory[];
}


export async function categoriesLoader() {
  return defer({
    categories: loadCategories(),
  });
}

const loadCategories = async () => {
  const response = await httpInterceptedService.get("/CourseCategory/sieve");
  return response.data;
};

