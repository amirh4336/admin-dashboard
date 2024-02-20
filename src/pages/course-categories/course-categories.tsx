import { Suspense, useState } from "react";
import { Await, useLoaderData } from "react-router";
import CategoryList from "../../features/categories/components/category-list";
import { IDefercategories } from "./categories-loader";
import Modal from "../../components/modal";

const CourseCategories = () => {
  const data: IDefercategories = useLoaderData() as IDefercategories;

  const [showDeleteModal, setShowDeleteModal] = useState(true);

  return (
    <>
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
      <Modal
        title="حذف"
        body="آیا از حذف این دسته اطمینان دارید؟"
        isOpen={showDeleteModal}
        open={setShowDeleteModal}
      >
        <button
          type="button"
          className="btn btn-secondary fw-bolder"
          onClick={() => setShowDeleteModal(false)}
        >
          انصراف
        </button>
        <button type="button" className="btn btn-primary fw-bolder">
          حذف
        </button>
      </Modal>
    </>
  );
};

export default CourseCategories;
