-- AlterTable
ALTER TABLE `events` ADD COLUMN `ownerId` INTEGER NOT NULL DEFAULT 23;

-- AddForeignKey
ALTER TABLE `Events` ADD CONSTRAINT `Events_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
