-- CreateTable
CREATE TABLE "UserPointBatch" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPointBatch_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserPointBatch" ADD CONSTRAINT "UserPointBatch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
