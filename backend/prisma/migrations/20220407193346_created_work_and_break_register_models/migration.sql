-- CreateTable
CREATE TABLE "WorkRegister" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "definedTime" DATETIME NOT NULL,
    "start" DATETIME,
    "end" DATETIME,
    CONSTRAINT "WorkRegister_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BreakRegister" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "workEntryId" INTEGER NOT NULL,
    "definedTime" DATETIME NOT NULL,
    "start" DATETIME NOT NULL,
    "end" DATETIME NOT NULL,
    CONSTRAINT "BreakRegister_workEntryId_fkey" FOREIGN KEY ("workEntryId") REFERENCES "WorkRegister" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
