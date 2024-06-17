/*
  Warnings:

  - You are about to drop the column `channel` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `Channel` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `room` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "channel",
ADD COLUMN     "room" TEXT NOT NULL;

-- DropTable
DROP TABLE "Channel";

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "room" TEXT NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);
