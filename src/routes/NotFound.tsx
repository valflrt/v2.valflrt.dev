import PageSwitchLink from "../particles/PageSwitchLink";

import "./NotFound.scss";

export default function NotFound() {
  document.title = "404 – valflrt.dev";

  return (
    <div className={"main notFound"}>
      <h1 className={"mainTitle fortyHundredAndFour"}>404</h1>
      <p>There's nothing here !</p>
      <PageSwitchLink to={"/"} className={"link underlined"}>
        Back home
      </PageSwitchLink>
    </div>
  );
}
