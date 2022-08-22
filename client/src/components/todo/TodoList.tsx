import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import styled from "styled-components";
import { Edit, Trash, DoneAll } from "@styled-icons/evaicons-solid";
import {
  useGetTodosQuery,
  TodosFragment,
} from "../../graphql/generated/graphql";
import "./index.scss";
import Spinner from "../helper/spinner";

const Item = styled.div`
  padding: 10px;
`;

interface TodoListProps {
  handleEdit: (value: TodosFragment) => void;
  handleDelete: (id: string) => void;
  setIsLoading: (value: boolean) => void
}

export interface TodoRefType {
  refetchTodo: () => void
}

const TodoList = forwardRef<TodoRefType, TodoListProps>(({ handleEdit, handleDelete, setIsLoading }, ref) => {
  const { data, loading, refetch } = useGetTodosQuery({ fetchPolicy: 'network-only' });
  const [todoList, setTodoList] = useState<TodosFragment[]>();

  useEffect(() => {
    if (data?.getTodos?.length) setTodoList(data?.getTodos);
    if(!loading) setIsLoading(false)
  }, [data, loading, setIsLoading]);

  useImperativeHandle(ref, () => ({
    refetchTodo() {
      refetch()
    }
  }))

  return (
    <div>
      {loading ? <Spinner />
      :
      <div className="todoListWrapper">
          {todoList?.map(({ id, name, done }, index) => (
            <Item key={id} className="todoListItem">
              {name}
              {done !== 0 && <div className="markDoneWrapper">
                <DoneAll />
              </div>}
              <div className="todoActionWrapper">
                <Edit
                  size="20"
                  className="actionIcons"
                  onClick={() => todoList && handleEdit(todoList[index])}
                />
                <Trash
                  size="20"
                  className="actionIcons"
                  onClick={() => handleDelete(id)}
                />
              </div>
            </Item>
          ))}
          </div>
        }
    </div>
  );
});

export default TodoList;
