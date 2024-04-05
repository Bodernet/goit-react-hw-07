import { Formik, Form, Field, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import * as Yup from "yup";
import css from "./ContactForm.module.css";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsSlice";
const initialValues = {
  name: "",
  number: "",
};

const ContactFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters!")
    .max(50, "Name must be less than 50 characters!")
    .required("Name is required!"),
  number: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{2}$/, {
      message: "Invalid number",
      excludeEmptyString: false,
    })
    .required("Number is required!"),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const onFormSubmit = (newContact, formAct) => {
    dispatch(addContact(newContact));
    formAct.resetForm();
    formAct.setErrors({});
  };
  const nameId = nanoid();
  const numberId = nanoid();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onFormSubmit}
      validationSchema={ContactFormSchema}
    >
      <Form className={css.form}>
        <div>
          <label>Name</label>
          <Field
            id={nameId}
            type="text"
            name="name"
            placeholder="Serhiy Dykyy"
          />
          <ErrorMessage name="name" component="span" />
        </div>
        <div>
          <label>Number</label>
          <Field
            id={numberId}
            type="tel"
            name="number"
            placeholder="000-00-00"
          />
          <ErrorMessage name="number" component="span" />
        </div>
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
