import { Modal } from "./styles";
import { Label, Button, InputWrapper, Error, Textarea } from "../login/styles";
import { CloseCircle } from "@styled-icons/evaicons-solid";
import { TodosFragment } from '../../graphql/generated/graphql'
import { Formik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import CheckBox from "../helper/checkbox";

const validationSchema = yup.object().shape({
  name: yup.string().required(),
});

interface EditTodoProps {
  showModal: boolean
  editData: TodosFragment
  setShowModal: (value: boolean) => void
  handleCloseModal: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  handleAddTodo: (values: { name: string, done: number }, resetForm: () => void) => void
}

const AddTodo = ({ showModal, editData, setShowModal, handleCloseModal, handleAddTodo }: EditTodoProps) => {
  const [initialValues, setInitialValues] = useState({ name: "", done: 0 })
  useEffect(() => {
    if (!Object.keys(editData).length) return
    setInitialValues({ name: editData.name, done: editData?.done || 0 })
  }, [editData])
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={(values, { resetForm }) => {
        handleAddTodo(values, resetForm);
      }}
    >
      {({ values, setFieldValue, handleSubmit, errors }) => (
        <Modal show={showModal} onClick={(e) => handleCloseModal(e)}>
          <div className="modalWrapper">
            <div className="modalContent">
              <div className="modalHeader">
                <h3>{editData?.id ? 'Edit' : 'Add'} todo</h3>
                <CloseCircle
                  className="closeIcon"
                  size="24"
                  onClick={() => setShowModal(false)}
                />
              </div>
              <div className="inputWrapper">
                <InputWrapper>
                  <Label>Task name</Label>
                  <br />
                  <Textarea
                    rows={7}
                    cols={32}
                    value={values.name}
                    onChange={(e) => setFieldValue("name", e.target.value)}
                  />
                  {errors.name && <Error>{errors.name} </Error>}
                </InputWrapper>
                <InputWrapper>
                  <label className="markDoneWrapper">
                    <CheckBox checked={!!values.done} onChecked={() => setFieldValue('done', values.done ? 0 : 1 )} />
                    <span>Mark as done</span>
                  </label>
                </InputWrapper>
                <Button onClick={() => handleSubmit()}>Save</Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </Formik>
  );
};

export default AddTodo;
