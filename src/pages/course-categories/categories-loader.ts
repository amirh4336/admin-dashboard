import { defer } from "react-router-dom";
import { httpInterceptedService } from "../../core/https-server";
import { ICategory } from "../../interface/coursesData";

export interface IDefercategories {
  categories: ICategory[];
}

export async function categoriesLoader({ request }: { request: any }) {
  return defer({
    categories: loadCategories(request),
  });
}

const loadCategories = async (request: any) => {
  const page = new URL(request.url).searchParams.get("page") || 1;
  const pageSize = 3;
  let url = "/CourseCategory/sieve";

  url += `?page=${page}&pageSize=${pageSize}`;

  const response = await httpInterceptedService.get(url);
  return response.data;
};
