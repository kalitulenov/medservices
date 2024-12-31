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
CREATE TABLE "sprusr" (
    "id" SERIAL NOT NULL,
    "usrkod" INTEGER NOT NULL,
    "usrorg" TEXT NOT NULL,
    "usrlog" TEXT NOT NULL,
    "usrpsw" TEXT NOT NULL,
    "usrtyp" TEXT NOT NULL,
    "usrfio" TEXT NOT NULL,
    "usrtel" TEXT NOT NULL,

    CONSTRAINT "sprusr_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sprcty" (
    "id" SERIAL NOT NULL,
    "ctykod" INTEGER NOT NULL,
    "ctynam" TEXT NOT NULL,
    "ctyreg" TEXT NOT NULL,

    CONSTRAINT "sprcty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sprusl" (
    "id" SERIAL NOT NULL,
    "usltrf" TEXT,
    "uslnam" TEXT,
    "usledn" TEXT,
    "uslzen" INTEGER,

    CONSTRAINT "sprusl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sprfrmusl" (
    "id" SERIAL NOT NULL,
    "uslfrmhsp" INTEGER NOT NULL,
    "uslfrmtrf" TEXT NOT NULL,
    "UslMinlet" INTEGER,
    "UslMaxlet" INTEGER,

    CONSTRAINT "sprfrmusl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sprorg" (
    "id" SERIAL NOT NULL,
    "orgkod" INTEGER NOT NULL,
    "orgcty" INTEGER NOT NULL,
    "orgnam" TEXT NOT NULL,
    "orgnamshr" TEXT NOT NULL,
    "orgadr" TEXT NOT NULL,
    "orgtel" TEXT NOT NULL,
    "orgdmu" TEXT NOT NULL,

    CONSTRAINT "sprorg_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "sprusr_usrlog_key" ON "sprusr"("usrlog");
