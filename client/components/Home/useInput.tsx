import {
  createTodo,
  deleteTodo,
  fetchAllTodos,
  fetchUserSingleTodo,
  updateTodo,
} from "@/api";
import { FETCH_ALL_TODO } from "@/constants";
import MyContext from "@/contexts";
import { TodoProps } from "@/interface";
import { getUserData } from "@/utils/localStorage";
import { ErrorPopup, SuccessPopup } from "@/utils/notification";
import { format } from "date-fns";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
  };

  const EmptyData = () => {
    setTitle("");
    setDoneChecked(false);
    setUnfinishedChecked(false);
    setDueDate(null);
  }

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

  const handleFetchTodoById = async (id: string) => {
    setIsTodoFetching(true);
    try {
      const resp = await fetchUserSingleTodo(id);
      if (resp && "todo" in resp) {
        const result = resp.todo;
        setTitle(result?.title ?? "");
        setDoneChecked(result?.status === "Done");
        setUnfinishedChecked(result?.status === "Unfinished");
        const dueDate = result?.dueDate ? new Date(result.dueDate) : null;
        setDueDate(dueDate ? dayjs(dueDate) : null);
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
    if (!user?._id) {
      ErrorPopup("Please login to create");
      return;
    }
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

  const handleUpdate = async (id: string) => {
    if (!user?._id) {
      ErrorPopup("Please login to update");
      return;
    }
    setLoading(true);
    const formData: TodoProps = {
      title,
      dueDate: formattedDate,
      status: doneChecked ? "Done" : "Unfinished",
    };
    try {
      const resp = await updateTodo(id, formData);
      if (resp && "updatedTodo" in resp) {
        SuccessPopup("Todo updated successfully");
        setTitle("");
        setDoneChecked(false);
        setUnfinishedChecked(false);
        setDueDate(null);
        router.push("/");
      } else {
        ErrorPopup(resp?.error?.message ?? "Sorry, an error occurred");
      }
    } catch (error) {
      ErrorPopup("Sorry, an error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: string, createdBy: string) => {
    if (createdBy !== user?._id) {
      ErrorPopup("You can only edit a todo that you have created.");
      return;
    }

    router.push(`/edit/${id}`);
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
    handleEdit,
    handleFetchTodoById,
    handleUpdate,
    EmptyData,
    router
  };
};

export default useInput;
