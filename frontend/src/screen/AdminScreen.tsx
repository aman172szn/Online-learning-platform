import {
  useGetUsersQuery,
  usePromoteUserMutation,
  useDemoteUserMutation, // 1. Import the new hook
} from "../store/slices/adminApiSlice";
import { toast } from "react-toastify";
import "../sass/screens/adminScreen.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AdminScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [promoteUser, { isLoading: isPromoting }] = usePromoteUserMutation();

  // 2. Initialize the demote mutation hook
  const [demoteUser, { isLoading: isDemoting }] = useDemoteUserMutation();

  const promoteHandler = async (id) => {
    if (
      window.confirm("Are you sure you want to promote this user to a teacher?")
    ) {
      try {
        await promoteUser(id);
        refetch();
        toast.success("User promoted to teacher");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  // 3. Add the handler function for demoting a user
  const demoteHandler = async (id) => {
    if (
      window.confirm("Are you sure you want to demote this user from teacher?")
    ) {
      try {
        await demoteUser(id);
        refetch();
        toast.success("User demoted from teacher");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="admin-screen">
        <h1>Admin - User Management</h1>
        {isLoading ? (
          <p>Loading users...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error?.data?.message || error.error}</p>
        ) : (
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>TEACHER</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td data-label="ID">{user._id}</td>
                  <td data-label="Name">{user.name}</td>
                  <td data-label="Email">{user.email}</td>
                  <td data-label="Teacher">{user.isTeacher ? "Yes" : "No"}</td>
                  <td data-label="Admin">{user.isAdmin ? "Yes" : "No"}</td>
                  <td data-label="Actions">
                    {/* 4. Add conditional logic for the button */}
                    {user.isTeacher ? (
                      <button
                        className="promote-btn"
                        onClick={() => demoteHandler(user._id)}
                        disabled={isDemoting}
                      >
                        Demote from Teacher
                      </button>
                    ) : (
                      !user.isAdmin && (
                        <button
                          className="promote-btn"
                          onClick={() => promoteHandler(user._id)}
                          disabled={isPromoting}
                        >
                          Promote to Teacher
                        </button>
                      )
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AdminScreen;
