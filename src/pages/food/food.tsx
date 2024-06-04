
import { httpInterceptedService } from "../../core/https-server";
import CreateFoodModal from "./components/createFoodModal";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import FoodCard from "./components/foodCard";
import { IFood } from "../../interface/coursesData";

const Food = () => {

  const { id } = useParams();


  const { data, isLoading } = useQuery({
    queryKey: ["foodMenu"],
    queryFn: () => httpInterceptedService.get(`/food/${id}`),
  });

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex align-items-center justify-content-between mb-5">
            <h3 className="mb-0">منو غذایی</h3>
            <CreateFoodModal />
          </div>
          <div className="d-flex gap-6 flex-wrap">
          {
            isLoading ? <p>در حال بارگذاری ...</p> : data?.data.food.length === 0 ? <p>غذایی وجود ندارد.</p> : data?.data.food.map((item: IFood) => {
              return (
                <FoodCard key={item._id} data={item} />
              )
            })
          }

          </div>
        </div>
      </div>
    </>
  );
};

export default Food;


// toast.promise(
//   response,
//   {
//     pending: "در حال حذف ...",
//     success: {
//       render() {
//         const url = new URL(window.location.href);
//         navigate(url.pathname + url.search);
//         return "عملیات با موفقیت انجام شد";
//       },
//     },
//     error: {
//       render() {
//         return t("categoryList." + "DeleteIsNotPossible");
//       },
//     },
//   },
//   {
//     position: "bottom-left",
//   }
// );
