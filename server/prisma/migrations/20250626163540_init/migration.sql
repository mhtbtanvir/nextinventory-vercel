/*
  Warnings:

  - The primary key for the `ExpenseByCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Category` on the `ExpenseByCategory` table. All the data in the column will be lost.
  - You are about to drop the column `expenseByCatagoryId` on the `ExpenseByCategory` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `ExpenseByCategory` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.
  - You are about to drop the column `catagory` on the `Expenses` table. All the data in the column will be lost.
  - The primary key for the `Sales` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `SaleId` on the `Sales` table. All the data in the column will be lost.
  - Added the required column `category` to the `ExpenseByCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expenseByCategoryId` to the `ExpenseByCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Expenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `saleId` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Users_email_key";

-- AlterTable
ALTER TABLE "ExpenseByCategory" DROP CONSTRAINT "ExpenseByCategory_pkey",
DROP COLUMN "Category",
DROP COLUMN "expenseByCatagoryId",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "expenseByCategoryId" TEXT NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE BIGINT,
ADD CONSTRAINT "ExpenseByCategory_pkey" PRIMARY KEY ("expenseByCategoryId");

-- AlterTable
ALTER TABLE "Expenses" DROP COLUMN "catagory",
ADD COLUMN     "category" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "rating" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PurchaseSummary" ALTER COLUMN "changePercentage" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_pkey",
DROP COLUMN "SaleId",
ADD COLUMN     "saleId" TEXT NOT NULL,
ADD CONSTRAINT "Sales_pkey" PRIMARY KEY ("saleId");

-- AlterTable
ALTER TABLE "SalesSummary" ALTER COLUMN "changePercentage" DROP NOT NULL;
