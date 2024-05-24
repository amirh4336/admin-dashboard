import logo from "@assets/images/logo.svg";
import { useForm } from "react-hook-form";
import {
  Link,
  useActionData,
  useNavigate,
  useNavigation,
  useRouteError,
  useSubmit,
} from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

type registerInput = {
  mobile: string;
  password: string;
  confirmPassword: string;
  image: File;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<registerInput>();

  const { t } = useTranslation();

  const submitForm = useSubmit();

  const onSubmit = (data: registerInput) => {
    const { confirmPassword, ...userData } = data;

    const formData = new FormData();
    formData.append("mobile" , userData.mobile)
    formData.append("password" , userData.password)
    formData.append("image" , userData.image)

    submitForm(formData, { method: "post" });
  };

  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  const isSuccessOperation: any = useActionData();

  const nvaigate = useNavigate();

  useEffect(() => {
    if (isSuccessOperation) {
      setTimeout(() => {
        nvaigate("/login");
      }, 2000);
    }
  }, [isSuccessOperation, nvaigate]);

  const routeErrors: any = useRouteError();

  return (
    <>
      <div className="text-center mt-4">
        <img src={logo} style={{ height: "100px" }} />
        <h1 className="h2">{t("register.title")}</h1>
        <p className="lead">{t("register.introMessage")}</p>
        <p className="lead">
          {t("register.alreadyRegistered")}
          <Link to="/login" className="me-2">
            {t("register.signin")}
          </Link>
        </p>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="m-sm-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label">{t("register.mobile")}</label>
                <input
                  {...register("mobile", {
                    required: t("register.validation.mobileRequired"),
                    minLength: 11,
                    maxLength: 11,
                  })}
                  className={`form-control form-control-lg ${
                    errors.mobile && "is-invalid"
                  }`}
                />
                {errors.mobile && errors.mobile.type === "required" && (
                  <p className="text-danger small fw-bolder mt-1">
                    {t("register.validation.mobileRequired")}
                  </p>
                )}
                {errors.mobile &&
                  (errors.mobile.type === "minLength" ||
                    errors.mobile.type === "maxLength") && (
                    <p className="text-danger small fw-bolder mt-1">
                      {t("register.validation.mobileLength")}
                    </p>
                  )}
              </div>
              <div className="mb-3">
                <label className="form-label">{t("register.password")}</label>
                <input
                  {...register("password", {
                    required: t("register.validation.passwordRequired"),
                  })}
                  className={`form-control form-control-lg ${
                    errors.password && "is-invalid"
                  }`}
                  type="password"
                />
                {errors.password && errors.password.type === "required" && (
                  <p className="text-danger small fw-bolder mt-1">
                    {t("register.validation.passwordRequired")}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">
                  {t("register.repeatPassword")}
                </label>
                <input
                  {...register("confirmPassword", {
                    required: t("register.validation.repeatPasswordRequired"),
                    validate: (value) => {
                      if (watch("password") !== value) {
                        return t("register.validation.notMatching");
                      }
                    },
                  })}
                  className={`form-control form-control-lg ${
                    errors.confirmPassword && "is-invalid"
                  }`}
                  type="password"
                />
                {errors.confirmPassword &&
                  errors.confirmPassword.type === "required" && (
                    <p className="text-danger small fw-bolder mt-1">
                      {t("register.validation.repeatPasswordRequired")}
                    </p>
                  )}
                {errors.confirmPassword &&
                  errors.confirmPassword.type === "validate" && (
                    <p className="text-danger small fw-bolder mt-1">
                      {errors.confirmPassword?.message}
                    </p>
                  )}
              </div>
              <div className="mb-3">
                <label className="form-label">{t("register.image")}</label>
                <input
                  {...register("image", {
                    required: t("register.validation.imageRequired"),
                  })}
                  className={`form-control form-control-lg ${
                    errors.image && "is-invalid"
                  }`}
                  type="file"
                />
                {errors.image && errors.image.type === "required" && (
                  <p className="text-danger small fw-bolder mt-1">
                    {t("register.validation.imageRequired")}
                  </p>
                )}
              </div>
              <div className="text-center mt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-lg btn-primary"
                >
                  {isSubmitting ? t("register.saving") : t("register.register")}
                </button>
              </div>
              {isSuccessOperation && (
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
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
