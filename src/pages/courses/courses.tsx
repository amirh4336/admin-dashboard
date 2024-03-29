import { Await, useLoaderData } from "react-router-dom";
import CourseList from "../../features/courses/components/course-list";
import { Suspense } from "react";
import { IDeferCourses } from "./courses-loader";

const Courses = () => {
  const data: IDeferCourses = useLoaderData() as IDeferCourses;
  return (
    <div className="row">
      <div className="col-12">
        <div className="d-flex align-items-center justify-content-between mb-5">
          <h3 className="mb-0">همه دوره ها</h3>
          <a href="#" className="btn btn-primary fw-bolder  mt-n1">
            <i className="fas fa-plus ms-2"></i>افزودن دوره جدید
          </a>
        </div>
        <Suspense fallback={<p className="text-info">در حال بارگذاری...</p>}>
          <Await resolve={data.courses}>
            {(loadedCourses) => <CourseList courses={loadedCourses} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default Courses;
