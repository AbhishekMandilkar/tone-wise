/*
  Warnings:

  - You are about to drop the `tones` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tones" DROP CONSTRAINT "tones_user_id_fkey";

-- DropTable
DROP TABLE "tones";

-- CreateTable
CREATE TABLE "rephrases" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" VARCHAR(255),
    "created_date" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "input_text" TEXT NOT NULL,
    "tone" VARCHAR(50) NOT NULL,
    "response" TEXT NOT NULL,
    "is_deleted" BOOLEAN DEFAULT false,

    CONSTRAINT "rephrases_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rephrases" ADD CONSTRAINT "rephrases_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
