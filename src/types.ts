import * as icons from "react-feather";

export interface ProjectObject {
  name: string;
  id: string;
  description: string;
  links?: {
    url: string;
    name: string;
    icon?: keyof typeof icons;
  }[];
}

export interface RouteObject {
  name: string;
  path: string;
}
