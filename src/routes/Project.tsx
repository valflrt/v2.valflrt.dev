import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import * as icons from "react-feather";
import * as brandIcons from "@icons-pack/react-simple-icons";

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
            <div className="header">
              <div className={"title code"}>valflrt/{project.id}</div>
              {project.used ? (
                <div className={"icons"}>
                  {project.used.map((v) => {
                    let Icon = brandIcons[v];
                    return <Icon size={16} />;
                  })}
                </div>
              ) : null}
            </div>
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
                    {l.name} <Icon className={"icon"} size={16} />
                  </Link>
                );
              })}
              <PageSwitchLink to={"/projects"} className={"button clickable"}>
                Back to projects <icons.List className={"icon"} size={16} />
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
