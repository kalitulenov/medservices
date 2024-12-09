-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "usertype" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sprmnubar" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "typeusr" TEXT NOT NULL,
    "number" TEXT NOT NULL,

    CONSTRAINT "sprmnubar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sprorg" (
    "Id" SERIAL NOT NULL,
    "OrgKod" INTEGER NOT NULL,
    "OrgCty" INTEGER NOT NULL,
    "OrgCtyNam" TEXT NOT NULL,
    "OrgNam" TEXT NOT NULL,
    "OrgNamShr" TEXT NOT NULL,
    "OrgAdr" TEXT NOT NULL,
    "OrgTel" TEXT NOT NULL,
    "OrgDmu" TEXT NOT NULL,

    CONSTRAINT "sprorg_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "sprcty" (
    "Id" SERIAL NOT NULL,
    "CtyKod" INTEGER NOT NULL,
    "CtyNam" TEXT NOT NULL,
    "CtyReg" TEXT NOT NULL,

    CONSTRAINT "sprcty_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "sprusl" (
    "Id" SERIAL NOT NULL,
    "UslTrf" TEXT NOT NULL,
    "UslKod" INTEGER NOT NULL,
    "UslNam" TEXT NOT NULL,
    "UslEdn" TEXT NOT NULL,
    "UslFlg" TEXT NOT NULL,
    "UslZen" INTEGER NOT NULL,
    "UslMinLet" INTEGER NOT NULL,
    "UslMaxLet" INTEGER NOT NULL,
    "UslFrmIdn" INTEGER NOT NULL,
    "UslFrmKod" INTEGER NOT NULL,
    "UslFrmFlg" INTEGER NOT NULL,

    CONSTRAINT "sprusl_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");
