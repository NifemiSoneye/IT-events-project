import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
const AdminNav = () => {
  const navigate = useNavigate();
  const [sendLogout, { isLoading }] = useSendLogoutMutation();
  const handleLogout = async () => {
    try {
      await sendLogout(undefined).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  return (
    <div className="bg-black flex justify-between min-h-[10vh] items-center px-[1rem] ">
      <p className="text-green-600 font-semibold">Tech Meetup Event</p>
      <div className="flex items-center gap-3">
        <div className="border border-transparent rounded-3xl bg-[#202020] text-white p-2">
          <p>Admin</p>
        </div>
        {isLoading ? (
          <ClipLoader color={"#FFF"} />
        ) : (
          <button
            className="w-[48px] h-[48px] text-white border-none hover:scale-150  "
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminNav;
