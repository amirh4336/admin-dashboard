import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import { httpInterceptedService } from "../../../core/https-server";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";

type registerInput = {
  name: string;
  description: string;
  address: string;
  phone: string;
  capacity: string;
  image: File[];
};

function CreateCafeModal() {
  const [show, setShow] = useState(false);
  const [isLoadingReq, setIsLoadingReq] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerInput>();

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

  const onSubmit = async (data: registerInput) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("description", data.description);
    formData.append("address", data.address);
    formData.append("capacity", data.capacity);
    let response;
    setIsLoadingReq(true)
    try {
      response = await httpInterceptedService.post("/cafes/create", formData);
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
        <span className="me-2">افزودن کافه</span>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>افزودن کافه </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="mb-3">
              <label className="form-label">نام کافه</label>
              <input
                {...register("name", {
                  required: "نام کافه ضروری است.",
                })}
                className={`form-control form-control-lg ${
                  errors.name && "is-invalid"
                }`}
              />
              {errors.name && errors.name.type === "required" && (
                <p className="text-danger small fw-bolder mt-1">
                  نام کافه ضروری است.
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
              <label className="form-label">آدرس</label>
              <input
                {...register("address", {
                  required: "آدرس ضروری است.",
                })}
                className={`form-control form-control-lg ${
                  errors.address && "is-invalid"
                }`}
              />
              {errors.address && errors.address.type === "required" && (
                <p className="text-danger small fw-bolder mt-1">
                  آدرس ضروری است.
                </p>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">شماره تماس</label>
              <input
                {...register("phone", {
                  minLength: 11,
                  maxLength: 11,
                })}
                className={`form-control form-control-lg ${
                  errors.phone && "is-invalid"
                }`}
              />
              {errors.phone && errors.phone.type === "required" && (
                <p className="text-danger small fw-bolder mt-1">
                  شماره تماس ضروری است.
                </p>
              )}
              {errors.phone &&
                (errors.phone.type === "minLength" ||
                  errors.phone.type === "maxLength") && (
                  <p className="text-danger small fw-bolder mt-1">
                    شماره تماس ضروری است.
                  </p>
                )}
            </div>
            <div className="mb-3">
              <label className="form-label">ظرفیت کافه</label>
              <input
                {...register("capacity", {
                  required: " ظرفیت کافه ضروری است.",
                })}
                className={`form-control form-control-lg ${
                  errors.capacity && "is-invalid"
                }`}
                type="number"
              />
              {errors.capacity && errors.capacity.type === "required" && (
                <p className="text-danger small fw-bolder mt-1">
                  ظرفیت کافه ضروری است.
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
            {/* {isSuccessOperation && (
              <div className="alert alert-success text-success p-2 mt-3">
                {t("register.successOperation")}
              </div>
            )}
            {routeErrors && (
              <div className="alert alert-danger text-danger p-2 mt-3">
                {routeErrors.response?.data.map((error: any, i: any) => (
                  <p key={i} className="mb-0">
                    {t(`register.validation.${error.code}`)}
                  </p>
                ))}
              </div>
            )} */}
          </form>
        </Modal.Body>
        {/* <Modal.Footer>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default CreateCafeModal;
