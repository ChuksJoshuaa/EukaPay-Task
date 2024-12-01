"use client";

import useInput from "@/components/Home/useInput";
import Loading from "@/components/Loading";
import TableView from "@/components/TableView";
import MyContext from "@/contexts";
import { DataProps } from "@/interface";
import { useContext, useEffect } from "react";

const Home = () => {
  const { state } = useContext(MyContext);
  const { handleFetchAllTodos, isTodoFetching } = useInput();

  useEffect(() => {
    handleFetchAllTodos();
  }, []);

  if (isTodoFetching) {
    return <Loading />
  }

  return <div>
    <TableView
      rows={state?.allTodos?.data as DataProps[]}
    />
  </div>;
};

export default Home;
