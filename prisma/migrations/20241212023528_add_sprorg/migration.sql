-- CreateTable
CREATE TABLE "sprorg" (
    "Id" SERIAL NOT NULL,
    "OrgKod" INTEGER NOT NULL,
    "OrgCty" INTEGER NOT NULL,
    "OrgNam" TEXT NOT NULL,
    "OrgNamShr" TEXT NOT NULL,
    "OrgAdr" TEXT NOT NULL,
    "OrgTel" TEXT NOT NULL,
    "OrgDmu" TEXT NOT NULL,

    CONSTRAINT "sprorg_pkey" PRIMARY KEY ("Id")
);
