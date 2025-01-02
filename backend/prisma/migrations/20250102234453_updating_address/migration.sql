/*
  Warnings:

  - You are about to alter the column `isReserved` on the `Table` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Boolean`.

*/
-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "restuarantId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "date" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_ReservationToTable" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ReservationToTable_A_fkey" FOREIGN KEY ("A") REFERENCES "Reservation" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ReservationToTable_B_fkey" FOREIGN KEY ("B") REFERENCES "Table" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "restaurantId" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "zipCode" TEXT,
    "placeId" TEXT,
    "formattedAddress" TEXT,
    "latitude" REAL,
    "longitude" REAL,
    "locationType" TEXT,
    "plusCode" TEXT,
    "businessStatus" TEXT,
    "utcOffset" INTEGER,
    "timezone" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "toString" TEXT NOT NULL,
    CONSTRAINT "Address_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Address" ("businessStatus", "city", "country", "formattedAddress", "id", "isVerified", "latitude", "locationType", "longitude", "placeId", "plusCode", "restaurantId", "state", "street", "timezone", "toString", "utcOffset", "zipCode") SELECT "businessStatus", "city", "country", "formattedAddress", "id", "isVerified", "latitude", "locationType", "longitude", "placeId", "plusCode", "restaurantId", "state", "street", "timezone", "toString", "utcOffset", "zipCode" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
CREATE UNIQUE INDEX "Address_placeId_key" ON "Address"("placeId");
CREATE TABLE "new_Table" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "seats" INTEGER NOT NULL DEFAULT 1,
    "seated" INTEGER NOT NULL,
    "total" REAL NOT NULL,
    "restaurantId" TEXT NOT NULL,
    "isReserved" BOOLEAN NOT NULL,
    CONSTRAINT "Table_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Table" ("id", "isReserved", "name", "restaurantId", "seated", "seats", "total") SELECT "id", "isReserved", "name", "restaurantId", "seated", "seats", "total" FROM "Table";
DROP TABLE "Table";
ALTER TABLE "new_Table" RENAME TO "Table";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_ReservationToTable_AB_unique" ON "_ReservationToTable"("A", "B");

-- CreateIndex
CREATE INDEX "_ReservationToTable_B_index" ON "_ReservationToTable"("B");
