import { ExternalLink } from "react-feather";

import Link from "../particles/Link";
import PageSwitchLink from "../particles/PageSwitchLink";

import projects from "../assets/projects";

import "./Projects.scss";

export default function Projects() {
  document.title = "Projects – valflrt.dev";

  return (
    <div className={"main projects"}>
      <h1 className={"mainTitle"}>Projects</h1>
      <p className="description">Here are some of my projects !</p>
      <div className={"list"}>
        {projects.map((p, i) => (
          <PageSwitchLink
            className={"item card"}
            to={`/project/${p.id}`}
            key={i}
          >
            <div className={"underlined"}>{p.name}</div>
            <div className={"description"}>
              <div className={"text"}>{p.description} </div>
              <div className={"underlined"}>Read More</div>
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
    </div>
  );
}
