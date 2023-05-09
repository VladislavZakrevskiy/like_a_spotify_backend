-- CreateTable
CREATE TABLE "comments" (
    "id" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "track_id" UUID NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "track" (
    "id" UUID NOT NULL,
    "name" CHAR(255) NOT NULL,
    "artist" CHAR(255) NOT NULL,
    "text" CHAR(255) NOT NULL,
    "listens" INTEGER NOT NULL,
    "picture" TEXT NOT NULL,
    "audio" TEXT NOT NULL,
    "album_id" UUID,

    CONSTRAINT "track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "album" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "picture" TEXT NOT NULL,

    CONSTRAINT "album_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "track_artist_key" ON "track"("artist");

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_track_id_fkey" FOREIGN KEY ("track_id") REFERENCES "track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "track" ADD CONSTRAINT "track_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "album"("id") ON DELETE SET NULL ON UPDATE CASCADE;
