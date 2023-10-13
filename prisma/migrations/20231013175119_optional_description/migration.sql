-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Franchise" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Franchise" ("abbreviation", "createdAt", "description", "id", "name", "team", "updatedAt") SELECT "abbreviation", "createdAt", "description", "id", "name", "team", "updatedAt" FROM "Franchise";
DROP TABLE "Franchise";
ALTER TABLE "new_Franchise" RENAME TO "Franchise";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
