import { Await, useLoaderData } from "react-router";
import { Suspense } from "react";
import { IDeferCourseDetails } from "./courseDetailsLoader";
import Details from "./details";

const CourseDetails = () => {
  const data: IDeferCourseDetails = useLoaderData() as IDeferCourseDetails;
  return (
    <Suspense fallback={<p className="text-info">در حال بارگذاری...</p>}>
      <Await resolve={data.courseDetails}>
        {(loadedCourseDetails) => <Details {...loadedCourseDetails} />}
      </Await>
    </Suspense>
  );
};

export default CourseDetails;
