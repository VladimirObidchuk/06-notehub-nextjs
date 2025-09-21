"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./NoteForm.module.css";

type NoteFormValues = {
  title: string;
  content: string;
  tag: string;
};

type Props = {
  onSuccess: () => void;
};

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  tag: Yup.string()
    .oneOf(["Work", "Personal", "Meeting", "Shopping", "Todo"])
    .required(),
});

const NoteForm = ({ onSuccess }: Props) => {
  const initialValues: NoteFormValues = {
    title: "",
    content: "",
    tag: "Todo",
  };

  const handleSubmit = async (
    values: NoteFormValues,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_TOKEN", // TODO: вставити токен
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      resetForm();
      onSuccess();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.field}>
            <label htmlFor="title">Title</label>
            <Field name="title" type="text" />
            <ErrorMessage name="title" component="div" className={css.error} />
          </div>

          <div className={css.field}>
            <label htmlFor="content">Content</label>
            <Field name="content" as="textarea" />
            <ErrorMessage
              name="content"
              component="div"
              className={css.error}
            />
          </div>

          <div className={css.field}>
            <label htmlFor="tag">Tag</label>
            <Field name="tag" as="select">
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
              <option value="Todo">Todo</option>
            </Field>
            <ErrorMessage name="tag" component="div" className={css.error} />
          </div>

          <button type="submit" disabled={isSubmitting}>
            Create
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default NoteForm;
