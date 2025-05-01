/// <reference path="../../index.d.ts" />

/**
 * Asynchronously fetch the json file associated with a song
 * id.
 * @param {keyof typeof songIds} id
 * @returns {Promise<Song>}
 */
export async function fetchSong(id) {
  let res = await fetch(`/music/songs/${id}.json`, { cache: "force-cache" });
  return await res.json();
}

export const songIds = [
  "xwqmme",
  "ahiaym",
  "hymmgh",
  "enbaci",
  "ntnasr",
  "foesqu",
  "yrbxdm",
  "ocbfpy",
  "gsfegb",
  "ylrwpk",
  "ktloiy",
  "qsdvbq",
  "icemxd",
  "cakfvv",
  "ejloky",
  "pihxjm",
  "wyshoh",
  "bqtnpa",
  "ynymoa",
  "nfeebo",
  "pjlovt",
  "yjtitj",
];

/**
 * Asynchronously fetch the json file associated with an artist
 * id.
 * @param {keyof typeof artistIds} id
 * @returns {Promise<Artist>}
 */
export async function fetchArtist(id) {
  let res = await fetch(`/music/artists/${id}.json`, { cache: "force-cache" });
  return await res.json();
}

export const artistIds = [
  "yqtrpf",
  "gptsej",
  "wbrcad",
  "tsbuhk",
  "cjblgh",
  "mohjwu",
  "nfygbk",
  "xcljwp",
  "txeckv",
  "luyxph",
  "viehqq",
  "cjidcg",
  "kccrjw",
  "hsvmcw",
];
