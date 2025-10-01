import { apiSlice } from "./apiSlice";
const COURSES_URL = "/api/courses";
const UPLOAD_URL = "/api/upload";

export const coursesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      // The query now accepts an object with optional semester and keyword
      query: ({ semester, keyword }) => ({
        url: COURSES_URL,
        params: { semester, keyword },
      }),
      providesTags: ["Course"],
      keepUnusedDataFor: 5,
    }),
    createCourse: builder.mutation({
      query: (data) => ({
        url: COURSES_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),
    getCourseDetails: builder.query({
      query: (courseId) => ({
        url: `${COURSES_URL}/${courseId}`,
      }),
      providesTags: (result, error, id) => [{ type: "Course", id }],
      keepUnusedDataFor: 5,
    }),
    updateCourse: builder.mutation({
      query: (data) => ({
        url: `${COURSES_URL}/${data.courseId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),
    deleteCourse: builder.mutation({
      query: (courseId) => ({
        url: `${COURSES_URL}/${courseId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
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
  useGetCourseDetailsQuery,
  useCreateCourseMutation,
  useUploadThumbnailMutation,
  useUploadVideoMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = coursesApiSlice;
