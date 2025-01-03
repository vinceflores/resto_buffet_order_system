/*
  Warnings:

  - You are about to drop the column `businessStatus` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `formattedAddress` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `locationType` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `placeId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `plusCode` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `timezone` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `toString` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `utcOffset` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `capacity` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `priceRange` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `reviewCount` on the `Restaurant` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "zipCode" TEXT,
    "restaurantId" TEXT NOT NULL,
    CONSTRAINT "Address_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Address" ("city", "country", "id", "restaurantId", "state", "street", "zipCode") SELECT "city", "country", "id", "restaurantId", "state", "street", "zipCode" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Restaurant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Restaurant" ("createdAt", "cuisine", "description", "email", "id", "imageUrl", "maxTables", "name", "phone", "updatedAt", "userId", "website") SELECT "createdAt", "cuisine", "description", "email", "id", "imageUrl", "maxTables", "name", "phone", "updatedAt", "userId", "website" FROM "Restaurant";
DROP TABLE "Restaurant";
ALTER TABLE "new_Restaurant" RENAME TO "Restaurant";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
