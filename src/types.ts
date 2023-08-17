import * as icons from "react-feather";
import * as brandIcons from "@icons-pack/react-simple-icons";

export interface ProjectObject {
  name: string;
  id: string;
  description: string | JSX.Element;
  links?: {
    url: string;
    name: string;
    icon?: keyof typeof icons;
  }[];
  used?: (keyof typeof brandIcons)[];
}

export interface RouteObject {
  name: string;
  path: string;
}
