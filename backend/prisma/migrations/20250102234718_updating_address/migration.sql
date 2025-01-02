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
    "toString" TEXT,
    CONSTRAINT "Address_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Address" ("businessStatus", "city", "country", "formattedAddress", "id", "isVerified", "latitude", "locationType", "longitude", "placeId", "plusCode", "restaurantId", "state", "street", "timezone", "toString", "utcOffset", "zipCode") SELECT "businessStatus", "city", "country", "formattedAddress", "id", "isVerified", "latitude", "locationType", "longitude", "placeId", "plusCode", "restaurantId", "state", "street", "timezone", "toString", "utcOffset", "zipCode" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
CREATE UNIQUE INDEX "Address_placeId_key" ON "Address"("placeId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
