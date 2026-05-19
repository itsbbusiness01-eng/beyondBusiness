import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Loader } from "../components/beyond/Loader";
import { SmoothScroll } from "../components/beyond/SmoothScroll";
import { Cursor } from "../components/beyond/Cursor";
import { Site } from "../components/beyond/Site";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <Loader onDone={() => setLoaded(true)} />
      {loaded && (
        <>
          <SmoothScroll />
          <Cursor />
        </>
      )}
      <Site />
    </>
  );
}
