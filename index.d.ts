// ----- utility ---------------

declare function addWindowEventListeners(
  events: (keyof WindowEventMap)[],
  listener: <K extends keyof WindowEventMap>(
    name: K,
    v: WindowEventMap[K],
  ) => unknown,
): void;
/**
 * Toggles `a` and `b` depending on `condition` (when
 * `condition` is `true`, `a` is enabled and `b` disabled if
 * present and when it is `false`, `a` is disabled and `b`
 * enabled if present).
 */
declare function toggleClass(
  element: Element,
  condition: boolean,
  a: string,
  b?: string,
): void;
/**
 * Replace `token` with `newToken` or add `newToken` to
 * classList.
 */
declare function replaceOrAddClass(
  element: Element,
  token: string | false | null | undefined,
  newToken: string,
): void;
declare function wait(ms: number): Promise<unknown>;
declare function elapsedTime(msDate: number): string;
declare function shuffle<T>(array: T[]): T[];

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
declare function navigate(path: string, replace?: boolean): void;
declare function getPath(): string;
declare function getRouteIndex(path: string[], routes: Route[]): number;
declare function getPathParams(
  templatePath: string[],
  path: string[],
): {
  [key: string]: string;
};
declare function getCurrentRoute(routes: Route[]): Route;
/**
 * Creates a router
 * @param routes routes...
 * @param callback a custom function that will be executed
 * every time the route changes
 * @returns a function that must be called on hashchange
 */
declare function createRouter(
  routes: Route[],
  callback: (
    route?: Route,
    params?: {
      [key: string]: string;
    },
  ) => Promise<unknown>,
): () => Promise<void>;

// ----- html ---------------

type TagPropsMap = {
  [K in keyof HTMLElementTagNameMap]: Partial<HTMLElementTagNameMap[K]>;
};
type ToHTML = Node | string | false | null | undefined;
/**
 * Creates an HTML element.
 */
declare function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: TagPropsMap[K],
  ...children: ToHTML[]
): HTMLElementTagNameMap[K];
/**
 * Unit element: acts like a container for other elements.
 * Similar to `<></>` in react.
 */
declare function unit(...children: ToHTML[]): DocumentFragment;
declare const div: (
  props: {
    [key: string]: string;
  },
  ...children: ToHTML[]
) => HTMLDivElement;
declare const span: (
  props: {
    [key: string]: string;
  },
  ...children: ToHTML[]
) => HTMLSpanElement;
declare const h1: (
  props: {
    [key: string]: string;
  },
  ...children: ToHTML[]
) => HTMLHeadingElement;
declare const p: (
  props: {
    [key: string]: string;
  },
  ...children: ToHTML[]
) => HTMLParagraphElement;
declare const code: (
  props: {
    [key: string]: string;
  },
  ...children: ToHTML[]
) => HTMLElement;
declare const a: (
  props: {
    [key: string]: string;
  },
  ...children: ToHTML[]
) => HTMLAnchorElement;
declare const button: (
  props: {
    [key: string]: string;
  },
  ...children: ToHTML[]
) => HTMLButtonElement;
declare const img: (
  props: {
    [key: string]: string;
  },
  ...children: ToHTML[]
) => HTMLImageElement;
declare const br: () => HTMLBRElement;

// ----- icons ---------------

declare function parseSvg(svgString: string): HTMLElement;
declare const icons: {
  atSign: string;
  bluesky: string;
  cplusplus: string;
  deviantart: string;
  discord: string;
  externalLink: string;
  github: string;
  instagram: string;
  list: string;
  python: string;
  rust: string;
  typescript: string;
  user: string;
  vite: string;
};

// ----- routes ---------------

declare const routes: Route[];

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
declare const projects: Project[];

// ----- music ---------------

interface Artist {
  name: string;
  link: string;
  ppUrl: string;
}
declare const artists: Artist[];
interface Song {
  name: string;
  artist: string;
  link: string;
  coverUrl: string;
}
declare const songs: Song[];

// ----- toast ---------------

declare let hideTimeout: number | null;
declare function hideToast(toast: HTMLElement): number;
declare function toast(
  text: string,
  kind?: "default" | "highlight" | "success" | "error",
): void;

// ----- index ---------------

declare const layoutEl: HTMLElement;
declare const mainEl: HTMLElement;
declare const animationDuration = 365;
declare let prevRoute: Route;
declare let firstLoad: boolean;
declare let router: () => Promise<void>;
declare module "music" {
  interface Artist {
    name: string;
    link: string;
    ppUrl: string;
  }
  export const artists: Artist[];
  interface Song {
    name: string;
    artist: string;
    link: string;
    coverUrl: string;
  }
  export const songs: Song[];
}
