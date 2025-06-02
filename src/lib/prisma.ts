// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Khai báo kiểu cho global ngay tại đây (chỉ để gỡ lỗi tạm thời)
declare global {
  var prisma: PrismaClient | undefined; // Sử dụng var thay vì let/const trong global
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;