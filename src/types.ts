import * as icons from "react-feather";
import { SimpleIcon } from "simple-icons";

export interface ProjectObject {
  name: string;
  id: string;
  description: string;
  links?: {
    url: string;
    name: string;
    icon?: keyof typeof icons;
  }[];
  used?: BrandObject[];
}

export interface RouteObject {
  name: string;
  path: string;
}

export interface BrandObject {
  name: string;
  icon: SimpleIcon;
}
