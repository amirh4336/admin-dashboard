import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { FC } from "react";
import { httpInterceptedService } from "../../../core/https-server";

interface IAddOrUpdateCategory {
  setShowAddCategory: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddOrUpdateCategory: FC<IAddOrUpdateCategory> = ({
  setShowAddCategory,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    const response = httpInterceptedService.post(`/CourseCategory/`, data);
    setShowAddCategory(false);
    toast.promise(
      response,
      {
        pending: "در حال ذخیره اطلاعات ...",
        success: {
          render() {
            const url = new URL(window.location.href);
            navigate(url.pathname + url.search);
            return "عملیات با موفقیت انجام شد";
          },
        },
        error: {
          render({ data }: { data: any }) {
            if (data.response.status === 400) {
              return t("categoryList." + data.response.data.code);
            } else {
              return "خطا در اجرای عملیات";
            }
          },
        },
      },
      {
        position: "bottom-left",
      }
    );
  };

  return (
    <div className="card">
      <div className="card-body">
        <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="form-label">نام</label>
            <input
              className={`form-control form-control-lg ${
                errors.name && "is-invalid"
              }`}
              {...register("name", {
                required: true,
              })}
            />
            {errors.name && errors.name.type === "required" && (
              <p className="text-danger small fw-bolder mt-1">نام الزامی است</p>
            )}
          </div>
          <div className="text-start mt-3">
            <button
              type="button"
              className="btn btn-lg btn-secondary ms-2"
              onClick={() => setShowAddCategory(false)}
            >
              بستن
            </button>
            <button type="submit" className="btn btn-lg btn-primary">
              ثبت تغییرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrUpdateCategory;
