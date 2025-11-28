import React from "react";
import type { Course } from "../../pages/Courses";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

interface CourseCardProps {
  course: Course;
  levelColor: Record<Course["level"], string>;
  onClick: (course: Course) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  levelColor,
  onClick,
}) => {
  return (
    <div onClick={() => onClick(course)}>
      <Card
        className="mt-6 w-full cursor-pointer hover:shadow-xl transition"
        placeholder=" "
        onResize={() => {}}
        onResizeCapture={() => {}}
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      >
        <CardHeader
          color="blue-gray"
          className="relative h-40"
          placeholder=" "
          onResize={() => {}}
          onResizeCapture={() => {}}
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          <img
            src={course.thumbnail}
            alt={course.title}
            className="object-cover h-full w-full"
          />
        </CardHeader>
        <CardBody
          placeholder=" "
          onResize={() => {}}
          onResizeCapture={() => {}}
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2"
            placeholder=" "
            onResize={() => {}}
            onResizeCapture={() => {}}
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            {course.title}
          </Typography>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
              levelColor[course.level]
            }`}
          >
            {course.level}
          </span>
        </CardBody>
        <CardFooter
          className="pt-0"
          placeholder=" "
          onResize={() => {}}
          onResizeCapture={() => {}}
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          <Button
            size="sm"
            color="blue"
            variant="outlined"
            className="w-full pointer-events-none"
            placeholder=" "
            onResize={() => {}}
            onResizeCapture={() => {}}
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            Lihat Detail
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CourseCard;
