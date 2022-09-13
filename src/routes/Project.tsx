import { useState } from "react";
import { useParams } from "react-router-dom";
import * as icons from "react-feather";

import Link from "../common/Link";
import PageSwitchLink from "../common/PageSwitchLink";

import projects from "../assets/projects";

import NotFound from "./NotFound";

import "./Project.scss";

function Project() {
  let { id } = useParams();
  let [project] = useState(projects.find((p) => p.id === id));

  return (
    <div className={"main project"}>
      {id && project ? (
        <>
          <div className={"card"}>
            <div className={"underlined"}>{project.name}</div>
            <div className={"description"}>{project.description}</div>
            {project.links ? (
              <div className={"links"}>
                {project.links.map((l, i) => {
                  let Icon = l.icon ? icons[l.icon] : () => null;
                  return (
                    <Link to={l.url} className={"link button"} key={"i"}>
                      <Icon /> {l.name}
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
          <div className={"links"}>
            <PageSwitchLink to={"/projects"} className={"link button"}>
              Back to projects
            </PageSwitchLink>
          </div>
        </>
      ) : (
        <NotFound />
      )}
    </div>
  );
}

export default Project;
