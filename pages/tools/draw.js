import DrawingCanvas from "@/components/Draw/Draw";
import React from "react";
import NavButton from "@/components/NavButton/NavButton";

import { useRouter } from "next/router";

export default function DrawPage() {
  const router = useRouter();
  return (
    <>
      <DrawingCanvas />;
      <NavButton handleClick={() => router.push("/activities")}>Back</NavButton>
    </>
  );
}
