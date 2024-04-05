import { BiErrorCircle } from "react-icons/bi";
import css from "./MessageError.module.css";

const MessageError = ({ message = "" }) => {
  return (
    <div className={css.error}>
      <BiErrorCircle size={20} />
      <p>{message.length > 0 ? message : "Whoops, something went wrong!"}</p>
    </div>
  );
};

export default MessageError;
