import { createTodo } from "@/api";
import { TodoProps } from "@/interface";
import { ErrorPopup, SuccessPopup } from "@/utils/notification";
import { format } from "date-fns";
import { Dayjs } from "dayjs";
import React, { useState } from "react";

const useInput = () => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState<Dayjs | null>(null);
  const formattedDate = dueDate ? format(dueDate.toDate(), "yyyy-MM-dd") : "";
  const [doneChecked, setDoneChecked] = useState(false);
  const [unfinishedChecked, setUnfinishedChecked] = useState(false);
  const [loading, setLoading] = useState(false);

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
  };
};

export default useInput;
