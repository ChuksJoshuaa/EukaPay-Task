import { createTodo, deleteTodo, fetchAllTodos } from "@/api";
import { FETCH_ALL_TODO } from "@/constants";
import MyContext from "@/contexts";
import { TodoProps } from "@/interface";
import { getUserData } from "@/utils/localStorage";
import { ErrorPopup, SuccessPopup } from "@/utils/notification";
import { format } from "date-fns";
import { Dayjs } from "dayjs";
import React, { useContext, useState } from "react";

const useInput = () => {
  const user = getUserData();
  const { dispatch } = useContext(MyContext);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState<Dayjs | null>(null);
  const formattedDate = dueDate ? format(dueDate.toDate(), "yyyy-MM-dd") : "";
  const [doneChecked, setDoneChecked] = useState(false);
  const [unfinishedChecked, setUnfinishedChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isTodoFetching, setIsTodoFetching] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
  };

  const handleDoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDoneChecked(event.target.checked);
    if (event.target.checked) {
      setUnfinishedChecked(false);
    }
  };

  const handleUnfinishedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUnfinishedChecked(event.target.checked);
    if (event.target.checked) {
      setDoneChecked(false);
    }
  };

  const handleFetchAllTodos = async () => {
    setIsTodoFetching(true);
    try {
      const resp = await fetchAllTodos();
      if (resp && "data" in resp) {
        dispatch({ type: FETCH_ALL_TODO, payload: resp });
      } else {
        ErrorPopup(resp?.error?.message ?? "Sorry, an error occurred");
      }
    } catch (error) {
      ErrorPopup("Sorry, an error occurred");
    } finally {
      setIsTodoFetching(false);
    }
  };

  const handleDeleteTodo = async (id: string, createdBy: string) => {
    if (createdBy !== user?._id) {
      ErrorPopup("You can only delete a todo that you have created.");
      return;
    }
    try {
      const resp = await deleteTodo(id);
      if (resp && !resp.error) {
        SuccessPopup("Todo deleted successfully");
        await handleFetchAllTodos();
      } else {
        ErrorPopup(resp?.error?.message ?? "Sorry, an error occurred");
      }
    } catch (error) {
      ErrorPopup("Sorry, an error occurred");
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData: TodoProps = {
      title,
      dueDate: formattedDate,
      status: doneChecked ? "Done" : "Unfinished",
    };
    const postType = await createTodo(formData);
    const successMessage = "Todo created successfully";
    try {
      const resp = await postType;
      if (resp && "newTodo" in resp) {
        SuccessPopup(successMessage);
        setTitle("");
        setDoneChecked(false);
        setUnfinishedChecked(false);
        setDueDate(null);
        await handleFetchAllTodos();
      } else {
        ErrorPopup(resp?.error?.message ?? "Sorry, an error occurred");
      }
    } catch (error) {
      ErrorPopup("Sorry, an error occurred");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleChange,
    handleDoneChange,
    handleUnfinishedChange,
    unfinishedChecked,
    doneChecked,
    formattedDate,
    dueDate,
    setDueDate,
    title,
    loading,
    handleSubmit,
    handleFetchAllTodos,
    isTodoFetching,
    handleDeleteTodo,
  };
};

export default useInput;
