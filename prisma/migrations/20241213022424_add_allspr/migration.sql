/*
  Warnings:

  - You are about to drop the column `UslFlg` on the `sprusl` table. All the data in the column will be lost.
  - You are about to drop the column `UslFrmFlg` on the `sprusl` table. All the data in the column will be lost.
  - You are about to drop the column `UslFrmIdn` on the `sprusl` table. All the data in the column will be lost.
  - You are about to drop the column `UslFrmKod` on the `sprusl` table. All the data in the column will be lost.
  - You are about to drop the column `UslKod` on the `sprusl` table. All the data in the column will be lost.
  - You are about to drop the column `UslMaxLet` on the `sprusl` table. All the data in the column will be lost.
  - You are about to drop the column `UslMinLet` on the `sprusl` table. All the data in the column will be lost.
  - You are about to drop the column `UsrCrt` on the `sprusr` table. All the data in the column will be lost.
  - You are about to drop the column `UsrUpd` on the `sprusr` table. All the data in the column will be lost.
  - Added the required column `UsrFio` to the `sprusr` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UsrTel` to the `sprusr` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sprusl" DROP COLUMN "UslFlg",
DROP COLUMN "UslFrmFlg",
DROP COLUMN "UslFrmIdn",
DROP COLUMN "UslFrmKod",
DROP COLUMN "UslKod",
DROP COLUMN "UslMaxLet",
DROP COLUMN "UslMinLet";

-- AlterTable
ALTER TABLE "sprusr" DROP COLUMN "UsrCrt",
DROP COLUMN "UsrUpd",
ADD COLUMN     "UsrFio" TEXT NOT NULL,
ADD COLUMN     "UsrTel" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "sprfrmusl" (
    "Id" SERIAL NOT NULL,
    "UslFrmHsp" INTEGER NOT NULL,
    "UslFrmTrf" TEXT NOT NULL,
    "UslMinLet" INTEGER NOT NULL,
    "UslMaxLet" INTEGER NOT NULL,

    CONSTRAINT "sprfrmusl_pkey" PRIMARY KEY ("Id")
);
