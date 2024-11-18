import { lazy } from "react";

const RemoteText = lazy(
  () =>
    // @ts-expect-error loading remote
    // eslint-disable-next-line import/no-unresolved
    import("mfe/awesomeText")
);

export default function MfePage() {
  return (
    <>
      <p>This is MfePage</p>
      <RemoteText />
    </>
  );
}
