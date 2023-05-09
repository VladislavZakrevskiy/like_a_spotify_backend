/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `album` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "album_name_key" ON "album"("name");
