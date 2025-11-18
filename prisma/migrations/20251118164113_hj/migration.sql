-- DropForeignKey
ALTER TABLE "member" DROP CONSTRAINT "member_team_id_fkey";

-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_team_id_fkey";

-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_user_id_fkey";

-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_project_id_fkey";

-- DropForeignKey
ALTER TABLE "team" DROP CONSTRAINT "team_user_id_fkey";

-- AddForeignKey
ALTER TABLE "team" ADD CONSTRAINT "team_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
