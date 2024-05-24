import { defer } from "react-router-dom";
import { httpInterceptedService } from "../../core/https-server";
import { ICafe } from "../../interface/coursesData";

export interface IDeferCourses {
  cafe: ICafe;
}

export async function cafeLoader() {
  return defer({
    courses: loadCafe(),
  });
}

const loadCafe = async () => {
  // const response = await httpInterceptedService.get("/cafes/6620decf72ec484292ee4cc8");
  // const data: ICafe = response.data;
  // console.log(data);
  // return data;
  return []
};
