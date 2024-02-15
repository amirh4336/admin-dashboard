import { defer } from "react-router-dom";
import { httpInterceptedService } from "../../core/https-server";
import { ICourse } from "../../interface/coursesData";

export interface IDeferCourses {
  courses: ICourse[];
}

export async function coursesLoader() {
  return defer({
    courses: loadCourses(),
  });
}

const loadCourses = async () => {
  const response = await httpInterceptedService.get("/Course/list");
  const data: ICourse[] = response.data;
  return data;
};
