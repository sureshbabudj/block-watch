/*
  Warnings:

  - You are about to drop the `UserNeighborhood` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserNeighborhood";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_NeighborhoodToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_NeighborhoodToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Neighborhood" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_NeighborhoodToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_NeighborhoodToUser_AB_unique" ON "_NeighborhoodToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_NeighborhoodToUser_B_index" ON "_NeighborhoodToUser"("B");
