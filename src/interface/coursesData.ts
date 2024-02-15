export interface ICourse {
  id: number;
  createdAt: string;
  title: string;
  duration: number;
  courseCategory: string;
  courseLevel: string;
  description: string;
  coverImageUrl: string;
  numOfChapters: number;
  numOfLectures: number;
  averageReviewRating: number;
  numOfReviews: number;
  basePrice: number;
}
