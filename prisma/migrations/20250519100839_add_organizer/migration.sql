-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'PENDING_ORGANIZER';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "organizationDesc" TEXT,
ADD COLUMN     "organizationName" TEXT;
