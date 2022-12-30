import { ExternalLink } from "react-feather";

import Link from "../particles/Link";
import PageSwitchLink from "../particles/PageSwitchLink";

import projects from "../assets/projects";

import "./Projects.scss";

export default function Projects() {
  document.title = "Projects – valflrt.dev";

  return (
    <main className={"projects"}>
      <h1 className={"mainTitle"}>Projects</h1>
      <p className="description">Here are some of my projects !</p>
      <div className={"list"}>
        {projects.map((p, i) => (
          <PageSwitchLink
            className={"item card"}
            to={`/project/${p.id}`}
            key={i}
          >
            <div className={"title code"}>valflrt/{p.id}</div>
            <div className={"description"}>
              <div className={"text"}>{p.description} </div>
              <span className={"underlined"}>Read More</span>
            </div>
          </PageSwitchLink>
        ))}
      </div>
      <Link
        to={"https://github.com/valflrt?tab=repositories"}
        className={"button clickable"}
      >
        See more on github
        <ExternalLink className={"icon"} />
      </Link>
    </main>
  );
}
