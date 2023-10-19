-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Season" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "year" INTEGER NOT NULL DEFAULT 2023,
    "week" INTEGER NOT NULL,
    "averageOvr" INTEGER,
    "balance" INTEGER NOT NULL,
    "scoutsLocked" BOOLEAN NOT NULL DEFAULT false,
    "franchiseId" TEXT NOT NULL,
    CONSTRAINT "Season_franchiseId_fkey" FOREIGN KEY ("franchiseId") REFERENCES "Franchise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Season" ("averageOvr", "balance", "franchiseId", "id", "name", "week", "year") SELECT "averageOvr", "balance", "franchiseId", "id", "name", "week", "year" FROM "Season";
DROP TABLE "Season";
ALTER TABLE "new_Season" RENAME TO "Season";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
