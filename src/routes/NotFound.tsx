import PageSwitchLink from "../particles/PageSwitchLink";

import "./NotFound.scss";

export default function NotFound() {
  document.title = "404 – valflrt.dev";

  return (
    <main className={"notFound"}>
      <h1 className={"mainTitle fortyHundredAndFour"}>404</h1>
      <p className={"description"}>There's nothing here !</p>
      <PageSwitchLink to={"/"} className={"clickable button"}>
        Back home
      </PageSwitchLink>
    </main>
  );
}
