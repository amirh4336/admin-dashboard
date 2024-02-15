import { httpInterceptedService } from "../../../../core/https-server";
import { ICourse } from "../../../../interface/coursesData";

export async function courseDetailsLoader({ params }: { params: any }) {
  const response = await httpInterceptedService.get(
    `/Course/by-id/${params.id}`
  );
  const data: ICourse = response.data;
  return data;
}
