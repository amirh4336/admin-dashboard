import { useLoaderData } from "react-router";
import Course from "./course";
import { ICourse } from "../../../interface/coursesData";

const CourseList = () => {
  const loadedCourses: ICourse[] = useLoaderData() as ICourse[];
  return (
    <>
      <div className="row">
        {loadedCourses.map((course) => (
          <div className="col-12 col-md-6 col-lg-3" key={course.id}>
            <Course {...course} />
          </div>
        ))}
      </div>
    </>
  );
};
export default CourseList;
