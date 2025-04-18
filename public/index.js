/// <reference path="../index.d.ts" />

// ----- utility ---------------

function addWindowEventListeners(events, listener) {
  events.forEach((v) => {
    window.addEventListener(v, (eventObject) => listener(v, eventObject));
  });
}

/**
 * Toggles `a` and `b` depending on `condition` (when
 * `condition` is `true`, `a` is enabled and `b` disabled if
 * present and when it is `false`, `a` is disabled and `b`
 * enabled if present).
 */
function toggleClass(element, condition, a, b) {
  if (condition) {
    if (b) element.classList.remove(b);
    element.classList.add(a);
  } else {
    element.classList.remove(a);
    if (b) element.classList.add(b);
  }
}

/**
 * Replace `token` with `newToken` or add `newToken` to
 * classList.
 */
function replaceOrAddClass(element, token, newToken) {
  if (token && element.classList.contains(token))
    element.classList.replace(token, newToken);
  else element.classList.add(newToken);
}

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function elapsedTime(msDate) {
  function addS(n) {
    return n > 1 ? "s" : "";
  }
  function compute(n, d) {
    return [Math.floor(n / d), Math.floor(n % d)];
  }

  let elapsed = (Date.now() - msDate) / 1000;

  let [years, yearsRemaining] = compute(elapsed, 60 * 60 * 24 * 365.24);
  let [days, daysRemaining] = compute(yearsRemaining, 60 * 60 * 24);
  let [hours, _hoursRemaining] = compute(daysRemaining, 60 * 60);
  // let [minutes, _minutesRemaining] = compute(hoursRemaining, 60);
  // let seconds = minutesRemaining % 60;

  return Object.entries({
    year: years,
    day: days,
    hour: hours,
    // minute: minutes,
    // second: seconds,
  })
    .map(([k, v], i, arr) =>
      v
        .toFixed()
        .concat(" ")
        .concat(k)
        .concat(addS(v))
        .concat(i === arr.length - 2 ? " and" : ""),
    )
    .join(" ");
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// ----- router ---------------

function navigate(path, replace) {
  if (!replace) window.location.hash = "#".concat(path);
  else {
    let newUrl = new URL(window.location.href);
    newUrl.hash = "#".concat(path);
    window.history.replaceState(null, "", newUrl);
    window.dispatchEvent(new Event("hashchange"));
  }
}

function getPath() {
  return window.location.hash.startsWith("#/")
    ? window.location.hash.slice(1)
    : "/";
}

function getRouteIndex(path, routes) {
  return routes.findIndex(({ path: v }) => {
    let p = v.split("/").slice(1);
    return (
      path.length === p.length &&
      p.every((word, i) => word === path[i] || word.startsWith(":"))
    );
  });
}

function getPathParams(templatePath, path) {
  let params = {};
  templatePath.forEach(
    (v, i) => v.startsWith(":") && (params[v.slice(1)] = path[i]),
  );
  return params;
}

function getCurrentRoute(routes) {
  let currentPath = getPath().split("/").slice(1) ?? [];
  let index = getRouteIndex(currentPath, routes);
  return routes[index];
}

/**
 * Creates a router
 * @param routes routes...
 * @param callback a custom function that will be executed
 * every time the route changes
 * @returns a function that must be called on hashchange
 */
function createRouter(routes, callback) {
  return async () => {
    let currentPath = getPath().split("/").slice(1) ?? [];

    let route = getCurrentRoute(routes);

    if (!!route) {
      let params = getPathParams(route.path.split("/").slice(1), currentPath);
      await callback(route, params);
    } else {
      await callback();
    }
  };
}

// ----- html ---------------

/**
 * Creates an HTML element.
 */
function createElement(tag, props, ...children) {
  let element = document.createElement(tag);

  Object.entries(props).forEach((pair) => {
    let [k, v] = pair;
    element.setAttribute(k, v);
  });

  children
    .filter((v) => !!v)
    .forEach((child) => {
      if (typeof child === "string") {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    });

  return element;
}

/**
 * Unit element: acts like a container for other elements.
 * Similar to `<></>` in react.
 */
function unit(...children) {
  let fragment = document.createDocumentFragment();

  children
    .filter((v) => !!v)
    .forEach((child) => {
      if (typeof child === "string") {
        fragment.appendChild(document.createTextNode(child.toString()));
      } else {
        fragment.appendChild(child);
      }
    });

  return fragment;
}

const div = (props, ...children) => createElement("div", props, ...children);
const span = (props, ...children) => createElement("span", props, ...children);

const h1 = (props, ...children) => createElement("h1", props, ...children);
const p = (props, ...children) => createElement("p", props, ...children);
const code = (props, ...children) => createElement("code", props, ...children);

const a = (props, ...children) => createElement("a", props, ...children);
const button = (props, ...children) =>
  createElement("button", props, ...children);

const img = (props, ...children) => createElement("img", props, ...children);

const br = () => createElement("br", {});

// ----- icons ---------------

function parseSvg(svgString) {
  let parser = new DOMParser();
  return parser.parseFromString(svgString, "image/svg+xml").documentElement;
}

const icons = {
  atSign:
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-at-sign"><circle cx="12" cy="12" r="4"></circle><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path></svg>',
  bluesky:
    '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Bluesky</title><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z"/></svg>',
  cplusplus:
    '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>C++</title><path d="M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.294-1.34-.294-1.848 0L2.26 5.31c-.508.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.167.29.398.543.652.69l8.816 5.09c.508.293 1.34.293 1.848 0l8.816-5.09c.254-.147.485-.4.652-.69.167-.29.27-.616.27-.91V6.91c.003-.294-.1-.62-.268-.91zM12 19.11c-3.92 0-7.109-3.19-7.109-7.11 0-3.92 3.19-7.11 7.11-7.11a7.133 7.133 0 016.156 3.553l-3.076 1.78a3.567 3.567 0 00-3.08-1.78A3.56 3.56 0 008.444 12 3.56 3.56 0 0012 15.555a3.57 3.57 0 003.08-1.778l3.078 1.78A7.135 7.135 0 0112 19.11zm7.11-6.715h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79zm2.962 0h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79z"/></svg>',
  deviantart:
    '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>DeviantArt</title><path d="M19.207 4.794l.23-.43V0H15.07l-.436.44-2.058 3.925-.646.436H4.58v5.993h4.04l.36.436-4.175 7.98-.24.43V24H8.93l.436-.44 2.07-3.925.644-.436h7.35v-5.993h-4.05l-.36-.438 4.186-7.977z"/></svg>',
  discord:
    '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Discord</title><path  d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>',
  externalLink:
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>',
  github:
    '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
  instagram:
    '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Instagram</title><path  d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>',
  list: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>',
  python:
    '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Python</title><path  d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/></svg>',
  rust: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Rust</title><path d="M23.8346 11.7033l-1.0073-.6236a13.7268 13.7268 0 00-.0283-.2936l.8656-.8069a.3483.3483 0 00-.1154-.578l-1.1066-.414a8.4958 8.4958 0 00-.087-.2856l.6904-.9587a.3462.3462 0 00-.2257-.5446l-1.1663-.1894a9.3574 9.3574 0 00-.1407-.2622l.49-1.0761a.3437.3437 0 00-.0274-.3361.3486.3486 0 00-.3006-.154l-1.1845.0416a6.7444 6.7444 0 00-.1873-.2268l.2723-1.153a.3472.3472 0 00-.417-.4172l-1.1532.2724a14.0183 14.0183 0 00-.2278-.1873l.0415-1.1845a.3442.3442 0 00-.49-.328l-1.076.491c-.0872-.0476-.1742-.0952-.2623-.1407l-.1903-1.1673A.3483.3483 0 0016.256.955l-.9597.6905a8.4867 8.4867 0 00-.2855-.086l-.414-1.1066a.3483.3483 0 00-.5781-.1154l-.8069.8666a9.2936 9.2936 0 00-.2936-.0284L12.2946.1683a.3462.3462 0 00-.5892 0l-.6236 1.0073a13.7383 13.7383 0 00-.2936.0284L9.9803.3374a.3462.3462 0 00-.578.1154l-.4141 1.1065c-.0962.0274-.1903.0567-.2855.086L7.744.955a.3483.3483 0 00-.5447.2258L7.009 2.348a9.3574 9.3574 0 00-.2622.1407l-1.0762-.491a.3462.3462 0 00-.49.328l.0416 1.1845a7.9826 7.9826 0 00-.2278.1873L3.8413 3.425a.3472.3472 0 00-.4171.4171l.2713 1.1531c-.0628.075-.1255.1509-.1863.2268l-1.1845-.0415a.3462.3462 0 00-.328.49l.491 1.0761a9.167 9.167 0 00-.1407.2622l-1.1662.1894a.3483.3483 0 00-.2258.5446l.6904.9587a13.303 13.303 0 00-.087.2855l-1.1065.414a.3483.3483 0 00-.1155.5781l.8656.807a9.2936 9.2936 0 00-.0283.2935l-1.0073.6236a.3442.3442 0 000 .5892l1.0073.6236c.008.0982.0182.1964.0283.2936l-.8656.8079a.3462.3462 0 00.1155.578l1.1065.4141c.0273.0962.0567.1914.087.2855l-.6904.9587a.3452.3452 0 00.2268.5447l1.1662.1893c.0456.088.0922.1751.1408.2622l-.491 1.0762a.3462.3462 0 00.328.49l1.1834-.0415c.0618.0769.1235.1528.1873.2277l-.2713 1.1541a.3462.3462 0 00.4171.4161l1.153-.2713c.075.0638.151.1255.2279.1863l-.0415 1.1845a.3442.3442 0 00.49.327l1.0761-.49c.087.0486.1741.0951.2622.1407l.1903 1.1662a.3483.3483 0 00.5447.2268l.9587-.6904a9.299 9.299 0 00.2855.087l.414 1.1066a.3452.3452 0 00.5781.1154l.8079-.8656c.0972.0111.1954.0203.2936.0294l.6236 1.0073a.3472.3472 0 00.5892 0l.6236-1.0073c.0982-.0091.1964-.0183.2936-.0294l.8069.8656a.3483.3483 0 00.578-.1154l.4141-1.1066a8.4626 8.4626 0 00.2855-.087l.9587.6904a.3452.3452 0 00.5447-.2268l.1903-1.1662c.088-.0456.1751-.0931.2622-.1407l1.0762.49a.3472.3472 0 00.49-.327l-.0415-1.1845a6.7267 6.7267 0 00.2267-.1863l1.1531.2713a.3472.3472 0 00.4171-.416l-.2713-1.1542c.0628-.0749.1255-.1508.1863-.2278l1.1845.0415a.3442.3442 0 00.328-.49l-.49-1.076c.0475-.0872.0951-.1742.1407-.2623l1.1662-.1893a.3483.3483 0 00.2258-.5447l-.6904-.9587.087-.2855 1.1066-.414a.3462.3462 0 00.1154-.5781l-.8656-.8079c.0101-.0972.0202-.1954.0283-.2936l1.0073-.6236a.3442.3442 0 000-.5892zm-6.7413 8.3551a.7138.7138 0 01.2986-1.396.714.714 0 11-.2997 1.396zm-.3422-2.3142a.649.649 0 00-.7715.5l-.3573 1.6685c-1.1035.501-2.3285.7795-3.6193.7795a8.7368 8.7368 0 01-3.6951-.814l-.3574-1.6684a.648.648 0 00-.7714-.499l-1.473.3158a8.7216 8.7216 0 01-.7613-.898h7.1676c.081 0 .1356-.0141.1356-.088v-2.536c0-.074-.0536-.0881-.1356-.0881h-2.0966v-1.6077h2.2677c.2065 0 1.1065.0587 1.394 1.2088.0901.3533.2875 1.5044.4232 1.8729.1346.413.6833 1.2381 1.2685 1.2381h3.5716a.7492.7492 0 00.1296-.0131 8.7874 8.7874 0 01-.8119.9526zM6.8369 20.024a.714.714 0 11-.2997-1.396.714.714 0 01.2997 1.396zM4.1177 8.9972a.7137.7137 0 11-1.304.5791.7137.7137 0 011.304-.579zm-.8352 1.9813l1.5347-.6824a.65.65 0 00.33-.8585l-.3158-.7147h1.2432v5.6025H3.5669a8.7753 8.7753 0 01-.2834-3.348zm6.7343-.5437V8.7836h2.9601c.153 0 1.0792.1772 1.0792.8697 0 .575-.7107.7815-1.2948.7815zm10.7574 1.4862c0 .2187-.008.4363-.0243.651h-.9c-.09 0-.1265.0586-.1265.1477v.413c0 .973-.5487 1.1846-1.0296 1.2382-.4576.0517-.9648-.1913-1.0275-.4717-.2704-1.5186-.7198-1.8436-1.4305-2.4034.8817-.5599 1.799-1.386 1.799-2.4915 0-1.1936-.819-1.9458-1.3769-2.3153-.7825-.5163-1.6491-.6195-1.883-.6195H5.4682a8.7651 8.7651 0 014.907-2.7699l1.0974 1.151a.648.648 0 00.9182.0213l1.227-1.1743a8.7753 8.7753 0 016.0044 4.2762l-.8403 1.8982a.652.652 0 00.33.8585l1.6178.7188c.0283.2875.0425.577.0425.8717zm-9.3006-9.5993a.7128.7128 0 11.984 1.0316.7137.7137 0 01-.984-1.0316zm8.3389 6.71a.7107.7107 0 01.9395-.3625.7137.7137 0 11-.9405.3635z"/></svg>',
  typescript:
    '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>TypeScript</title><path  d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg>',
  user: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
  vite: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Vite</title><path  d="m8.286 10.578.512-8.657a.306.306 0 0 1 .247-.282L17.377.006a.306.306 0 0 1 .353.385l-1.558 5.403a.306.306 0 0 0 .352.385l2.388-.46a.306.306 0 0 1 .332.438l-6.79 13.55-.123.19a.294.294 0 0 1-.252.14c-.177 0-.35-.152-.305-.369l1.095-5.301a.306.306 0 0 0-.388-.355l-1.433.435a.306.306 0 0 1-.389-.354l.69-3.375a.306.306 0 0 0-.37-.36l-2.32.536a.306.306 0 0 1-.374-.316zm14.976-7.926L17.284 3.74l-.544 1.887 2.077-.4a.8.8 0 0 1 .84.369.8.8 0 0 1 .034.783L12.9 19.93l-.013.025-.015.023-.122.19a.801.801 0 0 1-.672.37.826.826 0 0 1-.634-.302.8.8 0 0 1-.16-.67l1.029-4.981-1.12.34a.81.81 0 0 1-.86-.262.802.802 0 0 1-.165-.67l.63-3.08-2.027.468a.808.808 0 0 1-.768-.233.81.81 0 0 1-.217-.6l.389-6.57-7.44-1.33a.612.612 0 0 0-.64.906L11.58 23.691a.612.612 0 0 0 1.066-.004l11.26-20.135a.612.612 0 0 0-.644-.9z"/></svg>',
};

// ----- routes ---------------

const routes = [
  {
    id: "project",
    path: "/project/:id",
    pos: { x: -2, y: 0.2 },
    content: (_, params) => {
      let id = params?.id;
      let project = projects.find((p) => p.id === id);

      if (!id || !project) {
        navigate("/404", true);
        return unit();
      }

      document.title = `${project.id} – valflrt.dev`;

      return unit(
        div(
          { class: "card" },
          div(
            { class: "header" },
            div({ class: "title code" }, `valflrt/${project.id}`),
            project.used &&
              div(
                { class: "icons" },
                ...project.used.map((v) => parseSvg(icons[v])),
              ),
          ),
          div(
            { class: "description" },
            div({ class: "text" }, project.description()),
          ),
        ),
        project.links &&
          div(
            { class: "links" },
            ...project.links.map((l) =>
              a(
                { href: l.url, class: "button clickable", target: "_blank" },
                l.name,
                parseSvg(l.icon ? icons[l.icon] : icons.externalLink),
              ),
            ),
            a(
              { href: "#/projects", class: "button clickable" },
              "Back to projects",
              parseSvg(icons.list),
            ),
          ),
      );
    },
  },
  {
    id: "projects",
    name: "Projects",
    path: "/projects",
    pos: { x: -1, y: -0.2 },
    content: () =>
      unit(
        h1({ class: "title" }, "Projects"),
        p({ class: "description" }, "Here are some of my favorite projects !"),
        div(
          { class: "list" },
          ...projects.map((p) =>
            a(
              { href: `#/project/${p.id}`, class: "item card" },
              div(
                { class: "header" },
                div({ class: "title code" }, `valflrt/${p.id}`),
                p.used &&
                  div(
                    { class: "icons" },
                    ...p.used.map((v) => parseSvg(icons[v])),
                  ),
              ),
              div(
                { class: "description" },
                div({ class: "text" }, p.description().textContent),
                span({ class: "underlined" }, "Read More"),
              ),
            ),
          ),
        ),
        a(
          {
            href: "https://github.com/valflrt?tab=repositories",
            class: "button clickable",
          },
          "See more on github",
          parseSvg(icons.github),
        ),
      ),
  },
  {
    id: "home",
    name: "Home",
    path: "/",
    pos: { x: 0, y: 0 },
    content: () =>
      unit(
        img({
          class: "logo",
          src: "logo/logo-256.jpg",
          alt: "valflrt's profile picture",
          width: "128",
          height: "128",
        }),
        h1({ class: "title" }, "Heya !"),
        div(
          { class: "description" },
          p(
            {},
            "I am Valentin Fleurit aka valflrt,",
            br(),
            "a programming enthusiast born at ",
            code(
              {
                class: "birthDate code",
                title: `Alive for approximately ${elapsedTime(
                  1108132680 * 1000,
                )}`,
              },
              "1108132680",
            ),
            ".",
          ),
          p(
            {},
            "Math+Physics wizard in progress... I like harsh-melodic ",
            a(
              {
                href: "#/music",
              },
              "music",
            ),
            " as well as hiking, sailing and swimming.",
          ),
          p({}, "French and proud to be (oui oui baguette)."),
        ),
        div(
          {
            class: "links",
          },
          a(
            {
              href: "#/projects",
              class: "button clickable",
            },
            "Projects",
            parseSvg(icons.list),
          ),
          a(
            {
              href: "#/social",
              class: "button clickable",
            },
            "Social",
            parseSvg(icons.user),
          ),
        ),
      ),
  },
  {
    id: "music",
    name: "Music",
    path: "/music",
    pos: { x: 0, y: 2.5 },
    content: () =>
      unit(
        h1({ class: "title" }, "Music"),

        p({}, "Oh... So you found my secret music display..."),

        p({}, "Those are some songs I really like:"),

        div(
          { class: "songs" },
          ...shuffle(songs)
            .slice(0, 5)
            .map((song) =>
              a(
                {
                  href: song.link,
                  target: "_blank",
                  class: "clickable button",
                },
                span(
                  { class: "img-mask" },
                  img({
                    src: song.coverUrl,
                  }),
                ),
                span({}, song.name, span({ class: "artist" }, song.artist)),
              ),
            ),
        ),

        p({}, "Here are some of my favorite artists:"),

        div(
          { class: "artists" },
          ...shuffle(artists)
            .slice(0, 6)
            .map((artist) =>
              a(
                {
                  href: artist.link,
                  target: "_blank",
                  class: "clickable button",
                },
                span(
                  { class: "img-mask" },
                  img({
                    src: artist.ppUrl,
                  }),
                ),
                span({}, artist.name),
              ),
            ),
        ),

        p({ class: "faded" }, "randomized on page refresh"),
      ),
  },
  {
    id: "social",
    name: "Social",
    path: "/social",
    pos: { x: 1, y: -0.2 },
    content: () =>
      unit(
        h1({ class: "title" }, "Social"),
        p({ class: "description" }, "Here are some of my online connections !"),
        div(
          { class: "links" },
          a(
            {
              href: "https://github.com/valflrt",
              target: "_blank",
              class: "button clickable",
            },
            "Github",
            parseSvg(icons.github),
          ),
          a(
            {
              href: "https://instagram.com/valflrt",
              target: "_blank",
              class: "button clickable",
            },
            "Instagram",
            parseSvg(icons.instagram),
          ),
          button(
            {
              "data-copy": "valflrt",
              class: "button clickable copy",
            },
            "Discord",
            parseSvg(icons.discord),
          ),
          // a(
          //   {
          //     href: "https://www.deviantart.com/valflrt",
          //     target: "_blank",
          //     class: "button clickable",
          //   },
          //   "Deviant Art",
          //   parseSvg(icons.deviantart),
          // ),
          a(
            {
              href: "https://bsky.app/profile/valflrt.dev",
              target: "_blank",
              class: "button clickable",
            },
            "Bluesky",
            parseSvg(icons.bluesky),
          ),
          button(
            {
              "data-copy": "valflrt@pm.me",
              class: "button clickable copy",
            },
            "Email",
            parseSvg(icons.atSign),
          ),
        ),
      ),
  },
  {
    id: "not_found",
    name: "404 Not Found",
    path: "/404",
    pos: { x: 0, y: -2 },
    content: () =>
      unit(
        h1({ class: "main-title forty-hundred-and-four" }, "404"),
        p({ class: "description" }, "There's nothing here !"),
        a({ href: "#/", class: "clickable button" }, "Back Home"),
      ),
  },
];

// ----- projects ---------------

const projects = [
  {
    id: "smarticles-fork",
    description: () =>
      unit(
        p(
          {},
          "A particle simulation program forked from ",
          a(
            {
              href: "https://github.com/ChevyRay/smarticles",
              target: "_blank",
              class: "code link",
            },
            "ChevyRay/smarticles",
          ),
          ", to which I added some optimizations (I think ?) and features.",
        ),
        p(
          {},
          "It was also inspired from ",
          a(
            {
              href: "https://www.youtube.com/watch?v=p4YirERTVF0",
              target: "_blank",
              class: "link",
            },
            "this video",
          ),
          ".",
        ),
        p(
          {},
          "In the simulation there are six classes of particles. ",
          "Particles from one of the classes apply a class-specific attractive or repulsive force ",
          "to other particles.",
        ),
        p(
          {},
          "Using spatial partitioning and multithreading, I was able to simulate tens ",
          "of thousands of particles while rarely exceeding 50ms of update rate !",
        ),
        p(
          {},
          "I had a lot of fun working on this, so much that I made it the focus of my ",
          a(
            {
              href: "https://fr.wikipedia.org/wiki/Travail_d%27initiative_personnelle_encadr%C3%A9",
              target: "_blank",
              class: "link",
            },
            "TIPE",
          ),
          " presentation in prépa.",
        ),
      ),
    links: [
      {
        url: "https://github.com/valflrt/smarticles-fork",
        name: "Github",
        icon: "github",
      },
      {
        url: "https://github.com/valflrt/smarticles-fork/releases/latest",
        name: "Try it !",
        icon: "github",
      },
    ],
    used: ["rust"],
  },
  {
    id: "fractal_rndr",
    description: () =>
      unit(
        p(
          {},
          "This is a program for rendering fractals, it has a simple gui and offers various types ",
          "of fractals to explore.",
        ),
        p(
          {},
          "I am very happy with this project because I managed to generate some really cool ",
          "fractals (at least I think they are). If you want to check out some examples, feel ",
          "free to head over to the ",
          a(
            {
              href: "https://github.com/valflrt/fractal_rndr",
              target: "_blank",
              class: "link",
            },
            "project's github page",
          ),
          " !",
        ),
        p(
          {},
          "I also tried to implement anti-aliasing and thanks to ",
          a(
            {
              href: "https://www.deviantart.com/lyc/gallery",
              target: "_blank",
              class: "link",
            },
            "lycium",
          ),
          " and ",
          a(
            {
              href: "https://www.deviantart.com/rychveldir/",
              target: "_blank",
              class: "link",
            },
            "rychveldir",
          ),
          ", it is now working pretty well !",
        ),
      ),
    links: [
      {
        url: "https://github.com/valflrt/fractal_rndr",
        name: "Github",
        icon: "github",
      },
    ],
    used: ["rust"],
  },
  {
    id: "v2.valflrt.dev",
    description: () =>
      unit(
        p(
          {},
          "This is the website you're currently viewing. It was made using TypeScript and Vite.js. ",
          "It has some cool utility functions and a hash router built from scratch, though some ",
          "parts might not be the prettiest to look at...",
        ),
        p(
          {},
          "It also includes a simple DOM manipulation utility I made which is, in my opinion, quite handy.",
        ),
        p({}, "(I'm pretty proud of it btw)"),
      ),
    links: [
      {
        url: "https://github.com/valflrt/v2.valflrt.dev",
        name: "Github",
        icon: "github",
      },
    ],
    used: ["typescript", "vite"],
  },
  {
    id: "fencryption",
    description: () =>
      unit(
        p(
          {},
          "An unfinished crypto util cli program to encrypt and decrypt files and directories.",
        ),
        p(
          {},
          "I first built it in typescript but decided to switch to Rust because typescript was ",
          "(really) not appropriate for this kind of project that requires working with io and ",
          "crypto. I also wanted to try Rust and low-level programming.",
        ),
      ),
    links: [
      {
        url: "https://github.com/valflrt/fencryption",
        name: "Github",
        icon: "github",
      },
    ],
    used: ["rust"],
  },
  // {
  //   id: "pixel_game",
  //   description: () =>
  //     unit(
  //       p(
  //         {},
  //         "A simple pixel art game (if we can call it that). The game draws the pixels to the ",
  //         "screen in the most inefficient way possible.",
  //       ),
  //       p(
  //         {},
  //         "Something kind of interesting is that I created a struct called ",
  //         span({ class: "code" }, "Mat"),
  //         " similar to the common Rust ",
  //         span({ class: "code" }, "Vec"),
  //         " but in two dimensions, it holds the pixels that will be displayed on the screen (yes, ",
  //         "I know, it's just the worst way to do it) and can also be used to store textures/images.",
  //       ),
  //       p(
  //         {},
  //         "But still, I've spent way too much time on this for a meh result...",
  //       ),
  //     ),
  //   links: [
  //     {
  //       url: "https://github.com/valflrt/pixel_game",
  //       name: "Github",
  //       icon: "github",
  //     },
  //   ],
  //   used: ["rust"],
  // },
  {
    id: "omega_mandelbrot",
    description: () =>
      unit(
        p(
          {},
          "A native app for Omega on the Numworks calculator that lets you explore the Mandelbrot ",
          "set with a reasonable maximum depth.",
        ),
        p(
          {},
          "I also included the original python script, which I wrote entirely on my calculator, ",
          "starting from the basic Mandelbrot script included by default (took ages). This script ",
          "was very slow, to say the least, and I wanted to speed it up. The solution I found ",
          "was to implement it as a native Omega app.",
        ),
      ),
    links: [
      {
        url: "https://github.com/valflrt/omega_mandelbrot",
        name: "Github",
        icon: "github",
      },
    ],
    used: ["cplusplus"],
  },
];

// ----- music ---------------

const artists = [
  {
    name: "633397",
    link: "https://open.spotify.com/artist/5k0oBNr9sJYxH36FQHkHzB",
    ppUrl: "https://i.scdn.co/image/ab67616100005174ad7981136d44370cd27eb413",
  },
  {
    name: "Bring Me The Horizon",
    link: "https://open.spotify.com/artist/1Ffb6ejR6Fe5IamqA5oRUF",
    ppUrl: "https://i.scdn.co/image/ab67616100005174e7c9399d0b5d813c20cbec65",
  },
  {
    name: "Camellia",
    link: "https://open.spotify.com/artist/4bwIf0yXJf0F9AmOl2J78M",
    ppUrl: "https://i.scdn.co/image/ab67616100005174264c4769a9b0920d70b1c947",
  },
  {
    name: "Daeya",
    link: "https://open.spotify.com/artist/0mbYVz9eUusAiuRotLpKQL",
    ppUrl: "https://i.scdn.co/image/ab676161000051749b5d2786d482a0e75f594620",
  },
  {
    name: "Fractal Dreamers",
    link: "https://open.spotify.com/artist/330CrlhCaxON7pZwIZsnXR",
    ppUrl: "https://i.scdn.co/image/ab67616d00001e02bb6fa55ca97d9b7afa202ba3",
  },
  {
    name: "I-YU",
    link: "https://open.spotify.com/artist/3aoCmSBmN08hyyHGjfTiRr",
    ppUrl: "https://i.scdn.co/image/ab67616100005174d1e885880238f3054d3e9c7f",
  },
  {
    name: "Kobaryo",
    link: "https://open.spotify.com/artist/1Y81Ch90opScfpMfN17lZb",
    ppUrl: "https://i.scdn.co/image/ab67616100005174f2fb9febceb0ab623cba68df",
  },
  {
    name: "Kotori",
    link: "https://open.spotify.com/artist/20UYCAvAHJ1WqrCElptD7O",
    ppUrl: "https://i.scdn.co/image/ab6761610000517430b3616873c8f1684a72b906",
  },
  {
    name: "Laur",
    link: "https://open.spotify.com/artist/5fxJUmn4RTMzD0XPkTUpK3",
    ppUrl: "https://i.scdn.co/image/ab6761610000517476df08a9224db83a4981d25d",
  },
  {
    name: "Ludicin",
    link: "https://open.spotify.com/artist/5lvLarHbnOXeRBrRlzUaak",
    ppUrl: "https://i.scdn.co/image/ab676161000051740ad6a0f927259608ac6a651e",
  },
  {
    name: "MUST DIE!",
    link: "https://open.spotify.com/artist/4aBx7mA6lUOVhEsjokZrXb",
    ppUrl: "https://i.scdn.co/image/ab67616100005174ff3f8c844a503e1ba7218810",
  },
  {
    name: "Reol",
    link: "https://open.spotify.com/artist/7rpKUJ0AnklJ8q9nIPVSpZ",
    ppUrl: "https://i.scdn.co/image/ab67616100005174af9c2fbecf7ee2c8afad6583",
  },
  {
    name: "Underscore",
    link: "https://open.spotify.com/artist/4Q1v2fy0yGaXQ6NueV7KN1",
    ppUrl: "https://i.scdn.co/image/ab6761610000517426699f59a197d57cf2131d92",
  },
  {
    name: "Wisp X",
    link: "https://open.spotify.com/artist/6qxhZqIAvYzDVKIyyYtVlX",
    ppUrl: "https://i.scdn.co/image/ab6761610000517486c9be7e93f8c1eabd65cc85",
  },
];

const songs = [
  {
    name: "2025 BPM CANNOT SAVE YOU",
    artist: "Underscore",
    link: "https://open.spotify.com/track/1oDnklBfiKFzPJJCscpWtm",
    coverUrl:
      "https://i.scdn.co/image/ab67616d00001e02b1e1e8e5dcacc41a87a1624e",
  },
  {
    name: "Acrylic Love",
    artist: "Daeya",
    link: "https://open.spotify.com/track/045QurVeyea4GFKhvHltOh",
    coverUrl:
      "https://i.scdn.co/image/ab67616d00001e02ef3332a4dd44f867c543e34c",
  },
  {
    name: "ALL OF WHAT I HAD HAS BEEN LOST",
    artist: "633397",
    link: "https://open.spotify.com/track/31rhGBxqW8E3k74on0zBGa",
    coverUrl:
      "https://i.scdn.co/image/ab67616d00001e02a3e41508e432e3aeb78f3381",
  },
  {
    name: "Arche",
    artist: "Camellia",
    link: "https://open.spotify.com/track/3NWkVDfFM7r9mOvNbO6ao9  ",
    coverUrl:
      "https://i.scdn.co/image/ab67616d00001e02fdb948e7d4590313b9221eee",
  },
  {
    name: "astranélique",
    artist: "黒皇帝",
    link: "https://open.spotify.com/track/5txRAP5EV9xUQspRAnzKGB",
    coverUrl:
      "https://i.scdn.co/image/ab67616d00001e0261b39227d1f82af85ce33845",
  },
  {
    name: "BLISS 2K",
    artist: "MUST DIE!",
    link: "https://open.spotify.com/track/1Emp3xfmcBxcFt8n4srZtr",
    coverUrl:
      "https://i.scdn.co/image/ab67616d00001e02fe855e78740bebbeb44a3170",
  },
  {
    name: "Crysta",
    artist: "Wisp X",
    link: "https://open.spotify.com/track/0n4agQLLbwShB3xbeUfWPo",
    coverUrl:
      "https://i.scdn.co/image/ab67616d00001e023f437976bcd18320e76e175e",
  },
  {
    name: "Danger",
    artist: "USAO",
    link: "https://open.spotify.com/track/0SkovsLjS9tFloFDV1PA5H",
    coverUrl:
      "https://i.scdn.co/image/ab67616d00001e02597bbc2532fe3078de6d488f",
  },
  {
    name: "Echoes of Memoria",
    artist: "Ludicin",
    link: "https://open.spotify.com/track/5A7EuahWxrJf7AafJ503dV",
    coverUrl:
      "https://i.scdn.co/image/ab67616d00001e027203856c8584ef14325effba",
  },
  {
    name: "Emergence Failure",
    artist: "Kobaryo",
    link: "https://open.spotify.com/track/3ivUnGSeheb8lIpHLoL0jU",
    coverUrl:
      "https://i.scdn.co/image/ab67616d00001e026dc4d6f0b3e97c30b41b822f",
  },
  {
    name: "Eternal Layer",
    artist: "Wisp X",
    link: "https://open.spotify.com/track/3N9omRAw90bKghKZU2DEnb",
    coverUrl:
      "https://i.scdn.co/image/ab67616d00001e023f437976bcd18320e76e175e",
  },
  {
    name: "Hakai",
    artist: "Steradlye",
    link: "https://open.spotify.com/track/0PBFeLaeLtVEiQ1iji2ORy",
    coverUrl:
      "https://i.scdn.co/image/ab67616d00001e022bb6a9abb320325067cf1bba",
  },
  {
    name: "I'YUEXIO",
    artist: "I-YU",
    link: "https://open.spotify.com/track/6aAHLnYOYsdDiNc3EEOvsX",
    coverUrl:
      "https://i.scdn.co/image/ab67616d00001e028e92a6e71bda9a8c3733e929",
  },
  {
    name: "INFINITE SEQUENCER",
    artist: "Underscore",
    link: "https://open.spotify.com/track/7gDTBr2gWOa32scJz1CgWm",
    coverUrl:
      "https://i.scdn.co/image/ab67616d00001e02c9f649a632a4296646d373b7",
  },
  {
    name: "Lorelei",
    artist: "Camellia",
    link: "https://open.spotify.com/track/7cEZld0rEQoHv1wcdnoOj1",
    coverUrl:
      "https://i.scdn.co/image/ab67616d00001e02016715eb92eef501672ab9fa",
  },
  {
    name: "Mutation - Extended",
    artist: "Laur",
    link: "https://open.spotify.com/track/4LHiLcPT2eONglchbEDweQ",
    coverUrl:
      "https://i.scdn.co/image/ab67616d00001e02ee645f647fdfe7221da44890",
  },
  {
    name: "Orthocanna",
    artist: "Zekk",
    link: "https://open.spotify.com/track/5sKSd4mAcqyLHNF3dQJfFE",
    coverUrl:
      "https://i.scdn.co/image/ab67616d00001e02d05884486539eed12ec21816",
  },
  {
    name: "Overkill",
    artist: "RIOT",
    link: "https://open.spotify.com/track/4XdaaDFE881SlIaz31pTAG",
    coverUrl:
      "https://i.scdn.co/image/ab67616d00001e02a8db10e4d2b0198b9d40dd15",
  },
  {
    name: "Parallel Universe Shifter",
    artist: "Camellia",
    link: "https://open.spotify.com/track/6eLBIXL4GZ5pCFVPNy6pYU",
    coverUrl:
      "https://i.scdn.co/image/ab67616d00001e02121f917d95dcba3aade0fd31",
  },
  {
    name: "S.A.T.E.L.L.I.T.E.",
    artist: "Camellia",
    link: "https://open.spotify.com/track/75ghyQgayxbb7e6vw4DsRX",
    coverUrl:
      "https://i.scdn.co/image/ab67616d00001e02aacd5b45c7c81f7cb284d1a3",
  },
  {
    name: "SUNNY DAZE",
    artist: "BLOOD CODE",
    link: "https://open.spotify.com/track/4zkl7yq2eGCr8UDkzTYveC",
    coverUrl:
      "https://i.scdn.co/image/ab67616d00001e029a843bf2d4d14d1a0cf5580b",
  },
  {
    name: "Waterfall",
    artist: "Kotori",
    link: "https://open.spotify.com/track/7qb4yZYhQHgzD6FMXzRJUb",
    coverUrl:
      "https://i.scdn.co/image/ab67616d00001e023203d9aecc9370bf8a16afd6",
  },
];

// ----- toast ---------------

let hideTimeout = null;

function hideToast(toast) {
  return setTimeout(() => {
    replaceOrAddClass(toast, "visible", "hidden");
    toast.classList.remove("bounce", "color-success", "color-error");
  }, 2000);
}

function toast(text, kind = "default") {
  let toast = document.getElementById("toast");
  if (kind !== "default") toast.classList.add(`color-${kind}`);
  if (toast.classList.contains("visible")) {
    toast.innerHTML = text;
    if (hideTimeout) clearTimeout(hideTimeout);
    hideTimeout = hideToast(toast);
  } else {
    replaceOrAddClass(toast, "hidden", "visible");
    toast.innerHTML = text;
    hideTimeout = hideToast(toast);
  }
}

// ----- index ---------------

const layoutEl = document.getElementById("layout");
const mainEl = document.getElementById("main");

const animationDuration = 365;

let prevRoute = getCurrentRoute(routes);
let firstLoad = true;

let router = createRouter(routes, async (route, params) => {
  console.log("route:", route?.path, route?.id, route?.name, route?.pos);
  console.log("params:", params);

  if (!route) navigate("/404", true);
  else {
    // Animate page transition
    if (prevRoute.id != route.id) {
      if (!!prevRoute?.pos) {
        mainEl.classList.remove("move_in");

        let dx = prevRoute.pos.x - route.pos.x;
        let dy = prevRoute.pos.y - route.pos.y;

        let angle = Math.atan2(dy, dx);

        mainEl.style.setProperty("--angle", `${angle}rad`);
        mainEl.classList.add("move_out");
      }

      await wait(animationDuration);
    }

    // Update content on first load or on page change
    if (firstLoad || prevRoute.id != route.id) {
      // Set page title
      if (!!route.name) document.title = `${route.name} – valflrt.dev`;

      // Update content (inside #main)
      mainEl.replaceChildren(route.content(route, params));

      // Add page specific class to #main for custom styling
      replaceOrAddClass(mainEl, prevRoute?.id, route.id);

      // Menu tab coloring
      document
        .querySelectorAll("#menu > a")
        .forEach((e) =>
          toggleClass(
            e,
            new URL(e.href).hash.slice(1) === route.path,
            "active",
          ),
        );

      // Add listeners for copy buttons

      if (prevRoute.id != route.id) firstLoad = false;
      prevRoute = route;
    }
  }

  mainEl.classList.remove("move_out");
  if (!firstLoad) {
    mainEl.classList.add("move_in");
  }
});

addWindowEventListeners(["load", "hashchange"], router);
addWindowEventListeners(["load", "resize"], () => {
  toggleClass(
    layoutEl,
    "ontouchstart" in window || !!navigator.maxTouchPoints,
    "touch",
    "non_touch",
  );
  toggleClass(layoutEl, window.innerWidth < 750, "mobile", "desktop");
});

document.addEventListener("click", (e) => {
  if (!!e.target) {
    if (e.target.matches(".copy[data-copy]:not(.activated)")) {
      navigator.clipboard
        .writeText(e.target.dataset.copy ?? "")
        .then(() => {
          toast("Copied !", "highlight");
        })
        .catch(() => {
          toast("Failed to copy", "error");
        });
    }
  }
});
