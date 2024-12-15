/*
  Warnings:

  - A unique constraint covering the columns `[UsrLog]` on the table `sprusr` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "sprfrmusl" ALTER COLUMN "UslMinLet" DROP NOT NULL,
ALTER COLUMN "UslMaxLet" DROP NOT NULL;

-- AlterTable
ALTER TABLE "sprusl" ALTER COLUMN "UslTrf" DROP NOT NULL,
ALTER COLUMN "UslNam" DROP NOT NULL,
ALTER COLUMN "UslEdn" DROP NOT NULL,
ALTER COLUMN "UslZen" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "sprusr_UsrLog_key" ON "sprusr"("UsrLog");
