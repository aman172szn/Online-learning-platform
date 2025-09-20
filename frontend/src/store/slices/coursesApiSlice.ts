import { apiSlice } from "./apiSlice";
const COURSES_URL = "/api/courses";
const UPLOAD_URL = "/api/upload";

export const coursesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: (params) => ({
        url: COURSES_URL,
        params, // This will turn { semester: '2' } into ?semester=2 in the URL
      }),
      keepUnusedDataFor: 5,
    }),
    createCourse: builder.mutation({
      query: (data) => ({
        url: COURSES_URL,
        method: "POST",
        body: data,
      }),
    }),
    uploadThumbnail: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}/image`,
        method: "POST",
        body: data,
      }),
    }),
    uploadVideo: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}/video`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useCreateCourseMutation,
  useUploadThumbnailMutation,
  useUploadVideoMutation,
} = coursesApiSlice;
