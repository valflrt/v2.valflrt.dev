import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import * as icons from "react-feather";

import Link from "../particles/Link";
import PageSwitchLink from "../particles/PageSwitchLink";

import projects from "../assets/projects";

import "./Project.scss";

export default function Project() {
  let { id } = useParams();
  let [project] = useState(projects.find((p) => p.id === id));

  if (project) {
    document.title = `${project.name} – valflrt.dev`;
  }

  return (
    <main className={"project"}>
      {id && project ? (
        <>
          <div className={"card"}>
            <div className={"title code"}>valflrt/{project.id}</div>
            <div className={"description"}>
              <div className={"text"}>{project.description} </div>
            </div>
          </div>
          {project.links ? (
            <div className={"container row wrap centerStretch"}>
              {project.links.map((l, i) => {
                let Icon = l.icon ? icons[l.icon] : icons.ExternalLink;
                return (
                  <Link to={l.url} className={"button clickable"} key={i}>
                    {l.name} <Icon className={"icon"} size={20} />
                  </Link>
                );
              })}
              <PageSwitchLink to={"/projects"} className={"button clickable"}>
                Back to projects <icons.List className={"icon"} size={20} />
              </PageSwitchLink>
            </div>
          ) : null}
        </>
      ) : (
        <Navigate to={"/404"} replace />
      )}
    </main>
  );
}
