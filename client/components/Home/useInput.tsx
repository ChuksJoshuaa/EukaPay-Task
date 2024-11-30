import { format } from "date-fns";
import { Dayjs } from "dayjs";
import React, { useState } from 'react';

const useInput = () => {
    const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState<Dayjs | null>(null);
  const formattedDate = dueDate ? format(dueDate.toDate(), "yyyy-MM-dd") : "";
  const [doneChecked, setDoneChecked] = useState(false);
  const [unfinishedChecked, setUnfinishedChecked] = useState(false);

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
    };
}

export default useInput