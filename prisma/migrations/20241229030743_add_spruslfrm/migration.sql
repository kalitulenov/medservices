/*
  Warnings:

  - You are about to drop the `sprfrmusl` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "sprfrmusl";

-- CreateTable
CREATE TABLE "spruslfrm" (
    "id" SERIAL NOT NULL,
    "uslfrmhsp" INTEGER NOT NULL,
    "uslfrmtrf" TEXT NOT NULL,
    "UslMinlet" INTEGER,
    "UslMaxlet" INTEGER,

    CONSTRAINT "spruslfrm_pkey" PRIMARY KEY ("id")
);
