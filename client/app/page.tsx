"use client";

import * as React from "react";
import { Button } from "@/lib/mui";
const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Next.js 13 with Material-UI</h1>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </div>
  );
};

export default Home;
