import { defer } from "react-router-dom";
import { httpInterceptedService } from "../../../../core/https-server";
import { ICourse } from "../../../../interface/coursesData";

export interface IDeferCourseDetails {
  courseDetails: ICourse;
}

export async function courseDetailsLoader({ params }: { params: any })  {
  return defer({
    courseDetails: loadCourse(params.id),
  });
}

const loadCourse = async (id: string) => {
  const response = await httpInterceptedService.get(`/Course/by-id/${id}`);
  const data: ICourse = response.data;
  console.log(data);
  return data;
};
