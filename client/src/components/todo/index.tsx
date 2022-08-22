import { useRef, useState } from "react";
import {
  useAddTodoMutation,
  useEditTodoMutation,
  useDeleteTodoMutation,
  TodosFragment,
} from "../../graphql/generated/graphql";
import { CloseCircle } from "@styled-icons/evaicons-solid";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import type { TodoRefType } from './TodoList'
import { Modal as DeleteModal } from "./styles";
import { Button } from '../login/styles'
import "./index.scss";

const todo = {
  id: "",
  name: "",
  createdAt: "",
  updatedAt: "",
};

const Todos = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editData, setEditData] = useState<TodosFragment>(todo);
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const deleteId = useRef("")
  const refetchTodoRef = useRef<TodoRefType>(null)
  const [addTodo] = useAddTodoMutation();
  const [editTodo] = useEditTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleCloseModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if ((e.target as Element).classList.contains("modalWrapper")) {
      setShowModal(false);
    }
  };
  const handleAddTodo = async (
    values: { name: string, done: number },
    resetForm: () => void
  ) => {
    editData?.id
      ? await editTodo({
          variables: {
            id: editData?.id,
            input: values,
          },
        })
      : await addTodo({
          variables: { input: values},
        });
        refetchTodoRef?.current?.refetchTodo()
    resetForm();
    setShowModal(false);
  };

  const handleEdit = (value: TodosFragment) => {
    setEditData(value);
    setShowModal(true);
  };

  const handleDeleteMutation = async() => {
    await deleteTodo({
      variables: {
        id: deleteId.current
      }
    })
    refetchTodoRef?.current?.refetchTodo()
    setShowDeleteModal(false)
  };

  const handleDelete = (id: string) => {
    deleteId.current = id
    setShowDeleteModal(true)
  };

  return (
    <div className="todoWrapper">
      <h3 className="titleContent">Todo list</h3>
      {!isLoading && <h1
        onClick={() => {
          setShowModal(true);
          setEditData(todo);
        }}
      >
        Add todo+
      </h1>}
      <TodoList handleEdit={handleEdit} handleDelete={handleDelete} ref={refetchTodoRef} setIsLoading={setIsLoading} />
      <AddTodo
        {...{
          showModal,
          editData,
          setShowModal,
          handleCloseModal,
          handleAddTodo,
          handleDeleteMutation,
        }}
      />
      <DeleteModal show={showDeleteModal}>
        <div className="modalWrapper">
          <div className="modalContent">
            <div className="modalHeader">
              <h3>Delete</h3>
              <CloseCircle
                    className="closeIcon"
                    size="24"
                    onClick={() => setShowDeleteModal(false)}
                  />
            </div>
              <h5>Are you sure you want to remove task ?</h5>
              <Button onClick={handleDeleteMutation}>Delete</Button>
          </div>
        </div>
      </DeleteModal>
    </div>
  );
};

export default Todos;
