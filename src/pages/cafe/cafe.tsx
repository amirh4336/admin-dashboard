import { Await, useLoaderData } from "react-router-dom";
import CourseList from "../../features/courses/components/course-list";
import { Suspense } from "react";
import { IDeferCourses } from "./cafe-loader";

const Cafe = () => {
  // const data: IDeferCourses = useLoaderData() as IDeferCourses;
  return (
    <div className="row">
      <div className="col-12">
        <div className="d-flex align-items-center justify-content-between mb-5">
          <h3 className="mb-0">کافه</h3>
          <a href="#" className="btn btn-primary fw-bolder  mt-n1">
            <i className="fas fa-plus ms-2"></i>افزودن کافه
          </a>
        </div>
        <Suspense fallback={<p className="text-info">در حال بارگذاری...</p>}>
          {/* <Await resolve={data.cafe}>
            {(loadedCourses) => <CourseList courses={loadedCourses} />}
          </Await> */}
        </Suspense>
      </div>
    </div>
  );
};

export default Cafe;
