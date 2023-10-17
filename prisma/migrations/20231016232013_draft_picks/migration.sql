-- CreateTable
CREATE TABLE "DraftPicks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "round" INTEGER NOT NULL,
    "pick" INTEGER NOT NULL,
    "currentTeam" TEXT NOT NULL,
    "originalTeam" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    CONSTRAINT "DraftPicks_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
