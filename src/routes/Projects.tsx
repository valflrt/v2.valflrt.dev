import { ExternalLink } from "react-feather";
import * as brandIcons from "@icons-pack/react-simple-icons";

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
            <div className="header">
              <div className={"title code"}>valflrt/{p.id}</div>
              {p.used ? (
                <div className={"icons"}>
                  {p.used.map((v, i) => {
                    let Icon = brandIcons[v];
                    return <Icon size={16} key={i} />;
                  })}
                </div>
              ) : null}
            </div>
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
        <ExternalLink className={"icon"} size={16} />
      </Link>
    </main>
  );
}
