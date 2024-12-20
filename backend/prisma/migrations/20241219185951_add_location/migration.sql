-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "restaurantId" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "placeId" TEXT,
    "formattedAddress" TEXT NOT NULL,
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

-- CreateIndex
CREATE UNIQUE INDEX "Address_placeId_key" ON "Address"("placeId");
