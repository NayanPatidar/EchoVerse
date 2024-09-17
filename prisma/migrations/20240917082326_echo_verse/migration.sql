/*
  Warnings:

  - Made the column `songArtistPrimary` on table `LikedSong` required. This step will fail if there are existing NULL values in that column.
  - Made the column `songArtistSecondary` on table `LikedSong` required. This step will fail if there are existing NULL values in that column.
  - Made the column `songImage` on table `LikedSong` required. This step will fail if there are existing NULL values in that column.
  - Made the column `songName` on table `LikedSong` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "LikedSong" ALTER COLUMN "songArtistPrimary" SET NOT NULL,
ALTER COLUMN "songArtistSecondary" SET NOT NULL,
ALTER COLUMN "songImage" SET NOT NULL,
ALTER COLUMN "songName" SET NOT NULL;
