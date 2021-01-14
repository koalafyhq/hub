-- CreateEnum
CREATE TYPE "DeploymentStatus" AS ENUM ('NOT_READY', 'READY', 'BUILDING', 'CANCELLED', 'FAILED');

-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('STATIC', 'DYNAMIC');

-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('OSS', 'PRO');

-- CreateTable
CREATE TABLE "user_stats" (
    "id" TEXT NOT NULL,
    "total_projects" INTEGER NOT NULL,
    "total_deployments" INTEGER NOT NULL,
    "active_plan" "Plan" NOT NULL
);

-- CreateTable
CREATE TABLE "accounts" (
"id" SERIAL,
    "compound_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "provider_type" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "access_token_expires" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "provider_account_id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active_plan" "Plan" NOT NULL DEFAULT E'OSS',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_requests" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "ProjectType" NOT NULL DEFAULT E'STATIC',
    "repo_url" TEXT NOT NULL,
    "build_command" TEXT NOT NULL,
    "build_output" TEXT NOT NULL DEFAULT E'public',
    "builder" TEXT NOT NULL DEFAULT E'nodejs:12.4.0',
    "package_manager" TEXT DEFAULT E'npm',
    "owner_user_id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deployments" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "owner_user_id" TEXT NOT NULL,
    "status" "DeploymentStatus" NOT NULL DEFAULT E'NOT_READY',

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_stats.id_unique" ON "user_stats"("id");

-- CreateIndex
CREATE UNIQUE INDEX "accounts.compound_id_unique" ON "accounts"("compound_id");

-- CreateIndex
CREATE INDEX "providerAccountId" ON "accounts"("provider_account_id");

-- CreateIndex
CREATE INDEX "providerId" ON "accounts"("provider_id");

-- CreateIndex
CREATE INDEX "userId" ON "accounts"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users.email_unique" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "verification_requests.token_unique" ON "verification_requests"("token");

-- CreateIndex
CREATE INDEX "projectName" ON "projects"("name");

-- CreateIndex
CREATE INDEX "deployment_project_id" ON "deployments"("project_id");

-- CreateIndex
CREATE UNIQUE INDEX "deployments_project_id_unique" ON "deployments"("project_id");

-- AddForeignKey
ALTER TABLE "projects" ADD FOREIGN KEY("owner_user_id")REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deployments" ADD FOREIGN KEY("project_id")REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deployments" ADD FOREIGN KEY("owner_user_id")REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
