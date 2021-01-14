# Migration `20201230183427-init`

This migration has been generated by fariz at 12/31/2020, 2:34:27 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP TYPE "ReleaseStatus"

CREATE TABLE "user_stats" (
    "id" TEXT NOT NULL,
    "total_projects" INTEGER NOT NULL,
    "total_deployments" INTEGER NOT NULL,
    "active_plan" "Plan" NOT NULL
)

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
)

CREATE TABLE "deployments" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "owner_user_id" TEXT NOT NULL,
    "status" "DeploymentStatus" NOT NULL DEFAULT E'NOT_READY',

    PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "user_stats.id_unique" ON "user_stats"("id")

CREATE INDEX "projectName" ON "projects"("name")

CREATE INDEX "deployment_project_id" ON "deployments"("project_id")

CREATE UNIQUE INDEX "deployments_project_id_unique" ON "deployments"("project_id")

ALTER TABLE "projects" ADD FOREIGN KEY("owner_user_id")REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "deployments" ADD FOREIGN KEY("project_id")REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "deployments" ADD FOREIGN KEY("owner_user_id")REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201230183427-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,112 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+enum DeploymentStatus {
+  NOT_READY
+  READY
+  BUILDING
+  CANCELLED
+  FAILED
+}
+
+enum ProjectType {
+  STATIC
+  DYNAMIC
+}
+
+enum Plan {
+  OSS
+  PRO
+}
+
+// this is VIEW, check sql/user_stats.sql
+model user_stats {
+  id               String @unique
+  totalProjects    Int    @map("total_projects")
+  totalDeployments Int    @map("total_deployments")
+  activePlan       Plan   @map("active_plan")
+
+  @@map("user_stats")
+}
+
+model Account {
+  id                 Int       @id @default(autoincrement())
+  compoundId         String    @unique @map("compound_id")
+  userId             String    @map("user_id")
+  providerType       String    @map("provider_type")
+  providerId         String    @map("provider_id")
+  refreshToken       String?   @map("refresh_token")
+  accessToken        String?   @map("access_token")
+  accessTokenExpires DateTime? @map("access_token_expires")
+  createdAt          DateTime  @default(now()) @map("created_at")
+  updatedAt          DateTime  @default(now()) @map("updated_at")
+  providerAccountId  String    @map("provider_account_id")
+
+  @@index([providerAccountId], name: "providerAccountId")
+  @@index([providerId], name: "providerId")
+  @@index([userId], name: "userId")
+  @@map("accounts")
+}
+
+model User {
+  id            String       @id @default(uuid())
+  name          String?
+  email         String?      @unique
+  emailVerified DateTime?    @map("email_verified")
+  image         String?
+  createdAt     DateTime     @default(now()) @map("created_at")
+  updatedAt     DateTime     @default(now()) @map("updated_at")
+  activePlan    Plan         @default(OSS) @map("active_plan")
+  Project       Project[]
+  Deployment    Deployment[]
+
+  @@map("users")
+}
+
+model VerificationRequest {
+  id         String   @id @default(uuid())
+  identifier String
+  token      String   @unique
+  expires    DateTime
+  createdAt  DateTime @default(now()) @map("created_at")
+  updatedAt  DateTime @default(now()) @map("updated_at")
+
+  @@map("verification_requests")
+}
+
+model Project {
+  id                         String      @id @default(uuid())
+  name                       String
+  createdAt                  DateTime    @default(now()) @map("created_at")
+  updatedAt                  DateTime    @default(now()) @map("updated_at")
+  type                       ProjectType @default(STATIC)
+  latestSuccessfulDeployment Deployment?
+  repoURL                    String      @map("repo_url")
+  buildCommand               String      @map("build_command")
+  buildOutput                String      @default("public") @map("build_output")
+  builder                    String      @default("nodejs:12.4.0") @map("builder")
+  packageManager             String?     @default("npm") @map("package_manager")
+  owner                      User        @relation(fields: [ownerUserId], references: [id])
+  ownerUserId                String      @map("owner_user_id")
+
+  @@index([name], name: "projectName")
+  @@map("projects")
+}
+
+model Deployment {
+  id          String           @id @default(cuid())
+  project     Project          @relation(fields: [projectId], references: [id])
+  projectId   String           @map("project_id")
+  owner       User             @relation(fields: [ownerUserId], references: [id])
+  ownerUserId String           @map("owner_user_id")
+  status      DeploymentStatus @default(NOT_READY)
+
+  @@index([projectId], name: "deployment_project_id")
+  @@map("deployments")
+}
```

