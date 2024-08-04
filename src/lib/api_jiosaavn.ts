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
    };
    const url = new URL(path, "https://myjiosaavnapi.vercel.app/");
    url.search = new URLSearchParams(queries).toString();

    const response = await fetch(url, {
      method: "GET",
      headers: {
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

export async function getPlaylist(id: number) {
  try {
    const Playlist = await jioSaavnFetchData<Playlist>("api/playlists", {
      id: id.toString(),
    });
    return Playlist;
  } catch (error) {
    console.error(
      "Error in the Fetching the Playlist Data : ",
      error instanceof Error ? error.message : String(error)
    );
  }
}
