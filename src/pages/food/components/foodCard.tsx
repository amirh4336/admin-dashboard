import Card from "react-bootstrap/Card";
import { IFood } from "../../../interface/coursesData";
import { FC, useState } from "react";
import { Button } from "react-bootstrap";
import { BiTrash } from "react-icons/bi";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { httpInterceptedService } from "../../../core/https-server";

type FoodCardProps = {
  data: IFood;
};

const FoodCard: FC<FoodCardProps> = ({ data }) => {
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

  const deleteCafe = async () => {
    setIsLoadingReq(true);
    try {
      await httpInterceptedService.delete(`/food/${data._id}`);
      // @ts-expect-error test
      queryClient.invalidateQueries(["foodMenu"]);
      notify();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingReq(false);
    }
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={`http://localhost:5000/${data.image}`}
        style={{ height: "200px" }}
      />
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Card.Text>{data.description}</Card.Text>
        <Card.Text>قیمت: {data.price}</Card.Text>
        <Button className="btn btn-danger" onClick={deleteCafe}>
          {isLoadingReq ? (
            "در حال انجام..."
          ) : (
            <>
              <BiTrash />

              <span className="align-middle me-2">حذف</span>
            </>
          )}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default FoodCard;
