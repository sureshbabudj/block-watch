/*
  Warnings:

  - You are about to drop the `_NeighborhoodToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_NeighborhoodToUser";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UserNeighborhood" (
    "userId" TEXT NOT NULL,
    "neighborhoodId" TEXT NOT NULL,

    PRIMARY KEY ("userId", "neighborhoodId"),
    CONSTRAINT "UserNeighborhood_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserNeighborhood_neighborhoodId_fkey" FOREIGN KEY ("neighborhoodId") REFERENCES "Neighborhood" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
