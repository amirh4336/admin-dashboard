import Card from "react-bootstrap/Card";
import { ICafe } from "../../../interface/coursesData";
import { FC } from "react";
import { Link } from "react-router-dom";
import { IoFastFoodOutline } from "react-icons/io5";

type CafeCardProps = {
  data: ICafe;
};

const CafeCard: FC<CafeCardProps> = ({ data }) => {
  console.log(data);
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
        <Card.Text>آدرس: {data.address}</Card.Text>
        <Card.Text>ظرفیت: {data.capacity} نفر</Card.Text>
        <Link
          className="btn btn-primary"
          to={`/cafe/food/${data._id}`}
        >
          <IoFastFoodOutline />

          <span className="align-middle me-2">دیدن منو غذایی </span>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default CafeCard;
