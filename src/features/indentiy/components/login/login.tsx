import logo from "@assets/images/logo.svg";
import { useTranslation } from "react-i18next";
import {
  Link,
  useNavigation,
  useRouteError,
  useSubmit,
} from "react-router-dom";
import { useForm } from "react-hook-form";

type loginInputs = {
  phone: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  
  } = useForm<loginInputs>();

  const submitForm = useSubmit();

  const { t } = useTranslation();

  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  const routeErrors: any = useRouteError();

  const onSubmit = (data: loginInputs) => {
    submitForm(data, { method: "post" });
  };

  return (
    <>
      <div className="text-center mt-4">
        <img src={logo} style={{ height: "100px" }} />
        <h1 className="h2">{t("login.title")}</h1>
        <p className="lead">{t("login.introMessage")}</p>
        <p className="lead">
          {t("login.areNotRegistered")}
          &nbsp;
          <Link to="/register" className="me-2">
            {t("login.register")}
          </Link>
        </p>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="m-sm-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label">{t("login.mobile")}</label>
                <input
                  className={`form-control form-control-lg ${
                    errors.phone && "is-invalid"
                  }`}
                  {...register("phone", {
                    required: true,
                    minLength: 11,
                    maxLength: 11,
                  })}
                />
                {errors.phone && errors.phone.type === "required" && (
                  <p className="text-danger small fw-bolder mt-1">
                    {t("login.validation.mobileRequired")}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">{t("login.password")}</label>
                <input
                  className={`form-control form-control-lg ${
                    errors.phone && "is-invalid"
                  }`}
                  type="password"
                  {...register("password", { required: true })}
                />
                {errors.password && errors.password.type === "required" && (
                  <p className="text-danger small fw-bolder mt-1">
                    {t("login.validation.passwordRequired")}
                  </p>
                )}
              </div>
              <div className="text-center mt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-lg btn-primary"
                >
                  {isSubmitting ? t("login.signingin") : t("login.signin")}
                </button>
              </div>
              {routeErrors && (
                <div className="alert alert-danger text-danger p-2 mt-3">
                  {routeErrors.response?.data.map(
                    (error: any, index: number) => (
                      <p className="mb-0" key={index}>
                        {t(`login.validation.${error.code}`)}
                      </p>
                    )
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
