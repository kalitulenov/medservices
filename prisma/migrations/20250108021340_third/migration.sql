/*
  Warnings:

  - You are about to drop the column `UslMaxlet` on the `spruslfrm` table. All the data in the column will be lost.
  - You are about to drop the column `UslMinlet` on the `spruslfrm` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "spruslfrm" DROP COLUMN "UslMaxlet",
DROP COLUMN "UslMinlet",
ADD COLUMN     "uslfrmedn" TEXT,
ADD COLUMN     "uslfrmflg" BOOLEAN,
ADD COLUMN     "uslfrmnam" TEXT,
ADD COLUMN     "uslmaxlet" INTEGER,
ADD COLUMN     "uslminlet" INTEGER,
ALTER COLUMN "uslfrmtrf" DROP NOT NULL;
