-- CreateTable
CREATE TABLE "errors" (
    "id" TEXT NOT NULL,
    "exception_was_thrown_in" TEXT NOT NULL,
    "user_id" TEXT,
    "resource_url" TEXT NOT NULL,
    "http_method" TEXT NOT NULL,
    "stack" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "errors_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "errors" ADD CONSTRAINT "errors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
