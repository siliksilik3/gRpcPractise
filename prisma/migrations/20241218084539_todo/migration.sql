-- CreateTable
CREATE TABLE "ToDo" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "isDone" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ToDo_pkey" PRIMARY KEY ("id")
);
