import { Suspense, useState } from "react";
import { Await, useLoaderData, useNavigate } from "react-router";
import CategoryList from "../../features/categories/components/category-list";
import { IDefercategories } from "./categories-loader";
import Modal from "../../components/modal";
import { httpInterceptedService } from "../../core/https-server";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import AddOrUpdateCategory from "../../features/categories/components/add-or-update-category";

const CourseCategories = () => {
  const data: IDefercategories = useLoaderData() as IDefercategories;
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const deleteCategory = (categoryId: number) => {
    setSelectedCategory(categoryId);
    setShowDeleteModal(true);
  };

  const handleDeleteCategory = async () => {
    setShowDeleteModal(false);

    const response = httpInterceptedService.delete(
      `/CourseCategory/${selectedCategory}`
    );
    toast.promise(
      response,
      {
        pending: "در حال حذف ...",
        success: {
          render() {
            const url = new URL(window.location.href);
            navigate(url.pathname + url.search);
            return "عملیات با موفقیت انجام شد";
          },
        },
        error: {
          render() {
            return t("categoryList." + "DeleteIsNotPossible");
          },
        },
      },
      {
        position: "bottom-left",
      }
    );
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex align-items-center justify-content-between mb-5">
            <h3 className="mb-0">دسته بندی دوره ها</h3>
            <a onClick={() => setShowAddCategory(true)} className="btn btn-primary fw-bolder  mt-n1">
              <i className="fas fa-plus ms-2"></i>افزودن دسته جدید
            </a>
          </div>
          {showAddCategory && (
            <AddOrUpdateCategory setShowAddCategory={setShowAddCategory} />
          )}
          <Suspense
            fallback={<p className="text-info">در حال دریافت اطلاعات ...</p>}
          >
            <Await resolve={data.categories}>
              {(loadedCategories) => (
                <CategoryList
                  deleteCategory={deleteCategory}
                  categories={loadedCategories}
                />
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
        <button
          type="button"
          className="btn btn-primary fw-bolder"
          onClick={handleDeleteCategory}
        >
          حذف
        </button>
      </Modal>
    </>
  );
};

export default CourseCategories;
