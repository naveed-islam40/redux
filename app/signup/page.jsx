"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signUp, clearError } from "@/store/slices/authSlice";

const SignupSchema = Yup.object().shape({
  email: Yup.string().required("Required").email("Invalid email"),
  password: Yup.string()
    .required("Required")
    .min(8, "Too Short!")
    .max(50, "Too Long!"),
});

const SignupForm = () => {
  const dispatch = useDispatch();
  const { error, isLoading } = useSelector((state) => state.auth);

  const handleSubmit = (values, { setSubmitting, resetForm}) => {
    dispatch(signUp(values));
    resetForm()
    setSubmitting(false);
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <h1 className="text-3xl font-bold mb-4">Sign up</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form className="max-w-md mx-auto">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="johndoe@example.com"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="********"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>
            {error && (
              <div className="text-red-500 text-xs italic mb-4">
                {error}
                <button
                  type="button"
                  onClick={handleClearError}
                  className="ml-2 underline"
                >
                  Clear
                </button>
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupForm;
