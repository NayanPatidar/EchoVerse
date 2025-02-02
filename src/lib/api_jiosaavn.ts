"use server";
import { cookies } from "next/headers";

import type {
  Album,
  AllSearch,
  Artist,
  ArtistSongsOrAlbums,
  Category,
  Chart,
  CustomResponse,
  Episode,
  EpisodeDetail,
  FeaturedPlaylists,
  FooterDetails,
  Label,
  Lang,
  Lyrics,
  MegaMenu,
  Mix,
  Modules,
  Playlist,
  Radio,
  SearchReturnType,
  Show,
  Song,
  SongObj,
  Sort,
  TopAlbum,
  TopArtists,
  TopSearch,
  TopShows,
  Trending,
} from "@/types";

async function jioSaavnFetchData<T>(
  path: string,
  query?: Record<string, string>
): Promise<T> {
  try {
    const queries = {
      ...query,
      lang: query && query["lang"] ? query.lang : "hindi",
    };
    const url = new URL(path, "http://localhost:3001");
    url.search = new URLSearchParams(queries).toString();
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        Expires: "0",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error : Status ${response.status}`);
    }

    const data = (await response.json()) as CustomResponse<T>;
    return data.data!;
  } catch (error) {
    throw new Error(
      "Got Some Error While Fetching Data : " +
        (error instanceof Error ? error.message : String(error))
    );
  }
}

export async function getPlaylist(token: string) {
  try {
    return await jioSaavnFetchData<Playlist>("/playlist", {
      id: token,
    });
  } catch (error) {
    console.error(
      "Error in the Fetching the Playlist Data : ",
      error instanceof Error ? error.message : String(error)
    );
  }
}

export async function getHomeData(lang?: Lang[]) {
  try {
    return await jioSaavnFetchData<Modules>("/modules", {
      lang: lang?.join(",") ?? "",
    });
  } catch (error) {
    console.error(
      "Error in the Fetching the Home Data : ",
      error instanceof Error ? error.message : String(error)
    );
  }
}

export async function getSongDetails(token: string, lang?: Lang[]) {
  try {
    return await jioSaavnFetchData<SongObj>("/song", {
      id: token,
    });
  } catch (error) {
    console.error(
      "Error in the Fetching of Song Details : ",
      error instanceof Error ? error.message : String(error)
    );
  }
}

// Fetch Album Data

export async function getAlbumDetails(token: string) {
  try {
    return await jioSaavnFetchData<Album>("/album", {
      id: token,
    });
  } catch (error) {
    console.error(
      "Error in the Fetching of Album Details : ",
      error instanceof Error ? error.message : String(error)
    );
  }
}

export async function getAlbumFromSameYear(year: number) {
  try {
    return await jioSaavnFetchData<Album>("/album/same-year", {
      year: `${year}`,
    });
  } catch (error) {
    console.error(
      "Error in the Fetching the Album From Same Year : ",
      error instanceof Error ? error.message : String(error)
    );
  }
}

// Fetch Artist Data

export async function getArtistDetails(token: string) {
  try {
    return await jioSaavnFetchData<Artist>("/artist", {
      token,
    });
  } catch (error) {
    console.error(
      "Error in the Fetching of Song Details : ",
      error instanceof Error ? error.message : String(error)
    );
  }
}

export async function getArtistSongs(
  token: string,
  cat: Category = "popularity",
  sort: Sort = "asc"
) {
  try {
    return await jioSaavnFetchData<Omit<ArtistSongsOrAlbums, "albums">>(
      "/artist/songs",
      {
        id: token,
        cat,
        sort,
      }
    );
  } catch (error) {
    console.error(
      "Error in the Fetching of Artist Songs : ",
      error instanceof Error ? error.message : String(error)
    );
  }
}

// Fetch Top Searches

export async function getTopSearches() {
  try {
    return await jioSaavnFetchData<TopSearch[]>("/search/top");
  } catch (error) {
    console.error(
      "Error in the Fetching of Artist Songs : ",
      error instanceof Error ? error.message : String(error)
    );
  }
}

// Seach Data

export async function searchAll(token: string) {
  try {
    return await jioSaavnFetchData<AllSearch>("/search", { q: token });
  } catch (error) {
    console.error(
      "Error in the Fetching of Search All : ",
      error instanceof Error ? error.message : String(error)
    );
  }
}

export async function search(
  token: string,
  type: "song" | "album" | "playlist"
) {
  try {
    return await jioSaavnFetchData(`/search/${type}s`, {
      q: token.toString(),
    });
  } catch (error) {
    console.error(
      "Error in the Searching : ",
      error instanceof Error ? error.message : String(error)
    );
  }
}

// Trending

export async function getTrending(
  type: "song" | "album" | "playlist",
  lang?: Lang[]
) {
  try {
    return await jioSaavnFetchData<Trending>("/get/trending", {
      type,
      lang: lang?.join(",") ?? "",
    });
  } catch (error) {
    console.error(
      "Error in the Searching of Trending Songs : ",
      error instanceof Error ? error.message : String(error)
    );
  }
}

export async function getTopArtists() {
  try {
    return await jioSaavnFetchData<TopArtists>("/get/top-artists");
  } catch (error) {
    console.error(
      "Error in the Fetching of Top Artist : ",
      error instanceof Error ? error.message : String(error)
    );
  }
}

export async function getTopAlbums() {
  try {
    return await jioSaavnFetchData<TopAlbum>("/get/top-albums");
  } catch (error) {
    console.error(
      "Error in the Fetching of Top Albums : ",
      error instanceof Error ? error.message : String(error)
    );
  }
}

export async function getTopPlaylists() {
  try {
    return await jioSaavnFetchData<FeaturedPlaylists>(
      "/get/featured-playlists"
    );
  } catch (error) {
    console.error(
      "Error in the Fetching of Featured Playlists : ",
      error instanceof Error ? error.message : String(error)
    );
  }
}

// Actor Top Songs

export async function getActorsTopSongs(
  actorID: string,
  songId: string,
  lang: Lang
) {
  try {
    return await jioSaavnFetchData<Song[]>("/get/actor-top-songs", {
      actor_id: actorID,
      song_id: songId,
      lang,
    });
  } catch (error) {
    console.error(
      "Error in the Getting Actors Top Songs : ",
      error instanceof Error ? error.message : String(error)
    );
  }
}
