import { Form, Formik, FormikHelpers } from "formik";
import { userCredentials } from "./auth.models";
import * as Yup from "yup";
import TextField from "../Forms/TextField";
import Button from "../Utilities/Button";
import { Link } from "react-router-dom";
import ImageField from "../Forms/ImageField";
import ImageContainer from "../Forms/ImageContainer";

export default function AuthForm(props: authFormProps, ifRegister: boolean) {
  const { render, imageURL, imageBase64, fileToData } = ImageField({
    displayName: "",
    imageURL: "",
    field: "",
  });
  return (
    <Formik
      initialValues={props.model}
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({
        email: Yup.string()
          .required("This is required")
          .email("You have to insert a valid email"),
        password: Yup.string().required("This is required"),
      })}
    >
      {(formikProps) => (
        <Form>
          <TextField field="email" displayName="Email" />
          <TextField field="password" displayName="Password" type="password" />

          <Button disabled={formikProps.isSubmitting} type="submit">
            Send
          </Button>
          <Link className="btn btn-secondary" to="/">
            Cancel
          </Link>
        </Form>
      )}
    </Formik>
  );
}
interface authFormProps {
  model: userCredentials;
  onSubmit(
    values: userCredentials,
    actions: FormikHelpers<userCredentials>
  ): void;
}
