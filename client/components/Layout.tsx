"use client";

import Navbar from "@/components/Navbar";
import { ChildrenProps } from "@/interface";
import { Container } from "@/lib/mui";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }: ChildrenProps) => {
  return (
    <Container maxWidth="xl">
      <Navbar />
      <ToastContainer />
      {children}
    </Container>
  );
};

export default Layout;
