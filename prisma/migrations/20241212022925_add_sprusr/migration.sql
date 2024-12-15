/*
  Warnings:

  - You are about to drop the `sprorg` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "sprorg";

-- CreateTable
CREATE TABLE "sprusr" (
    "Id" SERIAL NOT NULL,
    "UsrKod" INTEGER NOT NULL,
    "UsrOrg" INTEGER NOT NULL,
    "UsrLog" TEXT NOT NULL,
    "UsrPsw" TEXT NOT NULL,
    "UsrTyp" TEXT NOT NULL,
    "UsrCrt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UsrUpd" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sprusr_pkey" PRIMARY KEY ("Id")
);

