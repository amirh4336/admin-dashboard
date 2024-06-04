import { Suspense , useState} from "react";
import CreateCafeModal from "./components/createCafeModal";
import Button from "react-bootstrap/Button";
import { useQuery , useQueryClient } from "@tanstack/react-query";
import { httpInterceptedService } from "../../core/https-server";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const Cafe = () => {
  const userId = localStorage.getItem("userData");
  const queryClient = useQueryClient();
  const [isLoadingReq, setIsLoadingReq] = useState(false);

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

  const { data, isLoading } = useQuery({
    queryKey: ["cafe"],
    queryFn: () => httpInterceptedService.get(`/cafes/${userId}`),
  });

  const deleteCafe = async () => {
    setIsLoadingReq(true)
    try {
      const res = await httpInterceptedService.delete(`/cafes/${data?.data._id}`)
      console.log(res.status);
      // @ts-expect-error test
      queryClient.invalidateQueries(["cafe"]);
      notify()
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingReq(false)
    }
  }
  return (
    <div className="row">
      <div className="col-12">
        <div className="d-flex align-items-center justify-content-between mb-5">
          <h3 className="mb-0">کافه</h3>
          {!data?.data._id ? (
            <CreateCafeModal />
          ) : (
            <Button variant="danger" onClick={deleteCafe} >
              {isLoadingReq ? <span className="px-2">
                درحال انجام...
              </span> :<>
                <FaRegTrashAlt />
              <span className="me-2">حذف کافه</span></>}
              
            </Button>
          )}
        </div>
        {isLoading ? (
          <p className="text-info">در حال بارگذاری...</p>
        ) : !data?.data._id ? (
          <p>کافه ای وجود ندارد.</p>
        ) : (
          <></>
        )}
        <Suspense fallback={<p className="text-info">در حال بارگذاری...</p>}>
          {/* <Await resolve={data.cafe}>
            {(loadedCourses) => <CourseList courses={loadedCourses} />}
          </Await> */}
        </Suspense>
      </div>
    </div>
  );
};

export default Cafe;
