-- CreateTable
CREATE TABLE "Animal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "hasTail" BOOLEAN NOT NULL,
    "image" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Abilitie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "abilitie" TEXT NOT NULL,
    "animalId" INTEGER NOT NULL,
    CONSTRAINT "Abilitie_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
