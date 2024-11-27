"use client"

import { ContextProvider } from "@/contexts";
import { ChildrenProps } from "@/interface";
const Provider = ({children}: ChildrenProps) => {
  return (
    <ContextProvider>{children}</ContextProvider>
  )
}

export default Provider