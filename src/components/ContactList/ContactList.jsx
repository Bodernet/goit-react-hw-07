import Contact from "../Contact/Contact.jsx";
import css from "./ContactList.module.css";
import {
  selectError,
  selectFilteredContacts,
  selectIsLoading,
} from "../../redux/contactsSlice.js";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader.jsx";
import MessageError from "../MessageError/MessageError.jsx";

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);
  const isError = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);

  return (
    <div>
      {isError && <MessageError />}
      {isLoading && <Loader />}
      <ul className={css.cardList}>
        {contacts.map((contact) => (
          <li className={css.cardItem} key={contact.id}>
            <Contact {...contact} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ContactList;
