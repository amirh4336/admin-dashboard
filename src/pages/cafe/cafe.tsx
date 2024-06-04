import { Suspense } from "react";
import CreateCafeModal from "./components/createCafeModal";

const Cafe = () => {
  // const data: IDeferCourses = useLoaderData() as IDeferCourses;
  return (
    <div className="row">
      <div className="col-12">
        <div className="d-flex align-items-center justify-content-between mb-5">
          <h3 className="mb-0">کافه</h3>
          <CreateCafeModal />
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
