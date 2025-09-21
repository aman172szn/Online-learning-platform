import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetCourseDetailsQuery,
  useUpdateCourseMutation,
} from "../store/slices/coursesApiSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../sass/screens/editCourseScreen.scss"; // Your SCSS file

const EditCourseScreen = () => {
  const { id: courseId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [semester, setSemester] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");

  const { data: course, isLoading, error } = useGetCourseDetailsQuery(courseId);
  const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation();

  useEffect(() => {
    if (course) {
      setName(course.name);
      setSemester(course.semester);
      setTopic(course.topic);
      setDescription(course.description);
    }
  }, [course]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateCourse({
        courseId,
        name,
        semester,
        topic,
        description,
      }).unwrap();
      toast.success("Course updated");
      navigate("/home");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Header />
      {/* Use the class names from the SCSS file */}
      <div className="edit-course">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>Error loading course data.</p>
        ) : (
          <div className="edit-course__main">
            <div className="edit-course__header">Edit Course</div>
            <div className="edit-course__form">
              <form onSubmit={submitHandler}>
                <div>
                  <label htmlFor="name">Course Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter course name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="semester">Semester</label>
                  <input
                    id="semester"
                    type="text"
                    placeholder="Enter semester"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="topic">Topic</label>
                  <input
                    id="topic"
                    type="text"
                    placeholder="Enter topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={7}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="edit-course__edit__button"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Updating..." : "Update Course"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default EditCourseScreen;
