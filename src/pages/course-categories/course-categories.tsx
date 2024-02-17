import { Suspense } from "react";
import { Await, useLoaderData } from "react-router";
import CategoryList from "../../features/categories/components/category-list";
import { IDefercategories } from "./categories-loader";

const CourseCategories = () => {
  const data: IDefercategories = useLoaderData() as IDefercategories;

  return (
    <div className="row">
      <div className="col-12">
        <div className="d-flex align-items-center justify-content-between mb-5">
          <h3 className="mb-0">دسته بندی دوره ها</h3>
          <a href="#" className="btn btn-primary fw-bolder  mt-n1">
            <i className="fas fa-plus ms-2"></i>افزودن دسته جدید
          </a>
        </div>
        <Suspense
          fallback={<p className="text-info">در حال دریافت اطلاعات ...</p>}
        >
          <Await resolve={data.categories}>
            {(loadedCategories) => (
              <CategoryList categories={loadedCategories} />
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default CourseCategories;
