// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Khai báo kiểu cho biến 'prisma' trên đối tượng global (Node.js)
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined; // Sử dụng 'var' để khai báo thuộc tính trên global
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // Trong môi trường development, sử dụng biến global để đảm bảo
  // chỉ có một instance của PrismaClient được tạo ra (tránh hot-reloading issues)
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;