-- CreateTable
CREATE TABLE "Feedback" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "rating" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_title_key" ON "Feedback"("title");
