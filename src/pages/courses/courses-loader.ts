import { httpInterceptedService } from "../../core/https-server";
import { ICourse } from "../../interface/coursesData";

export async function coursesLoader() {
  const response = await httpInterceptedService.get("/Course/list");
  const data: ICourse[] = response.data;
  return data;
}
