import { useState } from "react";
import { useParams } from "react-router-dom";
import * as icons from "react-feather";

import Link from "../particles/Link";
import PageSwitchLink from "../particles/PageSwitchLink";

import projects from "../assets/projects";

import NotFound from "./NotFound";

import "./Project.scss";

export default function Project() {
  let { id } = useParams();
  let [project] = useState(projects.find((p) => p.id === id));

  return (
    <div className={"main project"}>
      {id && project ? (
        <>
          <h1 className={"mainTitle"}>{project.name}</h1>
          <div className={"description"}>{project.description}</div>
          {project.links ? (
            <div className={"links"}>
              {project.links.map((l, i) => {
                let Icon = l.icon ? icons[l.icon] : () => null;
                return (
                  <Link to={l.url} className={"link button"} key={i}>
                    <Icon /> {l.name}
                  </Link>
                );
              })}
              <PageSwitchLink to={"/projects"} className={"link button"}>
                <icons.ArrowLeft /> Back to projects
              </PageSwitchLink>
            </div>
          ) : null}
        </>
      ) : (
        <NotFound />
      )}
    </div>
  );
}
