type StringOrFalsy = string | false | null | undefined;
type NodeOrFalsy = Node | StringOrFalsy;

// ----- router ---------------

interface Route {
  id: string;
  name?: string;
  path: string;
  content: (route: Route, params?: RouteParams) => DocumentFragment;
  pos: {
    x: number;
    y: number;
  };
}
type RouteParams = {
  [key: string]: string;
};

// ----- html ---------------

type TagPropsMap = {
  [K in keyof HTMLElementTagNameMap]: Partial<HTMLElementTagNameMap[K]>;
};

// ----- projects ---------------

interface Project {
  id: string;
  description: () => DocumentFragment;
  links?: {
    url: string;
    name: string;
    icon?: keyof typeof icons;
  }[];
  used?: (keyof typeof icons)[];
}

// ----- music ---------------

interface Artist {
  name: string;
  link: string;
  ppUrl: string;
}

interface Song {
  name: string;
  artist: string;
  link: string;
  coverUrl: string;
}
