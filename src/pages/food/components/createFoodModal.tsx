import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import { httpInterceptedService } from "../../../core/https-server";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";

type foodInput = {
  name: string;
  description: string;
  price: string;
  image: File[];
};

function CreateFoodModal() {
  const [show, setShow] = useState(false);
  const [isLoadingReq, setIsLoadingReq] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<foodInput>();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const notify = () =>
    toast.success("عملیات با موفقیت انجام شد.", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const onSubmit = async (data: foodInput) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    let response;
    setIsLoadingReq(true)
    try {
      response = await httpInterceptedService.post("/food/create", formData);
    } catch (error) {
      console.log(error);
      const notifyError = () =>
        toast.error("مشکلی پیش آمده.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        notifyError()
    }finally {
      setIsLoadingReq(false)
    }
    if (response?.status === 201) {
      // @ts-expect-error test
      queryClient.invalidateQueries(["cafe"]);
      handleClose();
      notify();
    }
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <FaPlus />
        <span className="me-2">افزودن غذا جدید</span>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>افزودن غذا </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="mb-3">
              <label className="form-label">نام غذا</label>
              <input
                {...register("name", {
                  required: "نام غذا ضروری است.",
                })}
                className={`form-control form-control-lg ${
                  errors.name && "is-invalid"
                }`}
              />
              {errors.name && errors.name.type === "required" && (
                <p className="text-danger small fw-bolder mt-1">
                  نام غذا ضروری است.
                </p>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">توضیحات</label>
              <input
                {...register("description", {
                  required: " توضیحات ضروری است.",
                })}
                className={`form-control form-control-lg ${
                  errors.description && "is-invalid"
                }`}
              />
              {errors.description && errors.description.type === "required" && (
                <p className="text-danger small fw-bolder mt-1">
                  توضیحات ضروری است.
                </p>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">قیمت</label>
              <input
                {...register("price", {
                  required: " قیمت ضروری است.",
                })}
                className={`form-control form-control-lg ${
                  errors.price && "is-invalid"
                }`}
              />
              {errors.price && errors.price.type === "required" && (
                <p className="text-danger small fw-bolder mt-1">
                  قیمت ضروری است.
                </p>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">تصویر</label>
              <input
                {...register("image", {
                  required: " تصویر  ضروری است.",
                })}
                className={`form-control form-control-lg ${
                  errors.image && "is-invalid"
                }`}
                type="file"
                accept=".jpg, .jpeg, .png"
              />
              {errors.image && errors.image.type === "required" && (
                <p className="text-danger small fw-bolder mt-1">
                  تصویر ضروری است.
                </p>
              )}
            </div>
            <div className="text-center d-flex justify-content-between mt-3">
              <Button variant="secondary" onClick={handleClose}>
                بستن
              </Button>
              <Button variant="primary" type="submit">
                {
                  isLoadingReq ?<span>درحال انجام...</span> : "ایجاد"
                }
                
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateFoodModal;
