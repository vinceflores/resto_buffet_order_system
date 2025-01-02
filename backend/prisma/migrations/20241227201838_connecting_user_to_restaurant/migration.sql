-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Restaurant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "maxTables" INTEGER NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "website" TEXT,
    "imageUrl" TEXT,
    "cuisine" TEXT,
    "priceRange" TEXT,
    "capacity" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "rating" REAL,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Restaurant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Restaurant" ("capacity", "createdAt", "cuisine", "description", "email", "id", "imageUrl", "isActive", "maxTables", "name", "phone", "priceRange", "rating", "reviewCount", "updatedAt", "website") SELECT "capacity", "createdAt", "cuisine", "description", "email", "id", "imageUrl", "isActive", "maxTables", "name", "phone", "priceRange", "rating", "reviewCount", "updatedAt", "website" FROM "Restaurant";
DROP TABLE "Restaurant";
ALTER TABLE "new_Restaurant" RENAME TO "Restaurant";
CREATE TABLE "new_Table" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "seats" INTEGER NOT NULL DEFAULT 1,
    "seated" INTEGER NOT NULL,
    "total" REAL NOT NULL,
    "isReserved" DATETIME NOT NULL,
    "restaurantId" TEXT NOT NULL,
    CONSTRAINT "Table_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Table" ("id", "isReserved", "restaurantId", "seated", "seats", "total") SELECT "id", "isReserved", "restaurantId", "seated", "seats", "total" FROM "Table";
DROP TABLE "Table";
ALTER TABLE "new_Table" RENAME TO "Table";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
