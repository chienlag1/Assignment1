// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ObjectId } from "mongodb";
// Import PrismaClientKnownRequestError for better type checking
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'; 

type Context = {
  params: { id: string };
};

export async function GET(
  req: NextRequest,
  context: Context
) {
  const { id } = context.params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Định dạng ID không hợp lệ" },
      { status: 400 }
    );
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Lỗi máy chủ nội bộ" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  context: Context
) {
  const { id } = context.params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Định dạng ID không hợp lệ" },
      { status: 400 }
    );
  }

  const data = await req.json();
  console.log("PUT - id:", id);
  console.log("PUT - data:", data);

  // Kiểm tra các trường bắt buộc
  if (!data.name || !data.description || data.price === undefined || data.price === null) {
    console.error("PUT Error: Thiếu trường bắt buộc:", data);
    return NextResponse.json(
      { error: "Thiếu trường bắt buộc (name, description, price)" },
      { status: 400 }
    );
  }

  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image || null,
      },
    });

    console.log("PUT - Product updated:", updatedProduct);
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("PUT Error:", error);

    // Use a type guard to check if the error is a PrismaClientKnownRequestError
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") { // Now `error.code` is safely accessible
        return NextResponse.json(
          { error: "Không tìm thấy sản phẩm để cập nhật" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: "Lỗi máy chủ nội bộ", details: error.message || "Unknown error" },
        { status: 500 }
      );
    } else if (error instanceof Error) {
      // Fallback for generic Error objects
      return NextResponse.json(
        { error: "Lỗi máy chủ nội bộ", details: error.message || "Unknown error" },
        { status: 500 }
      );
    }

    // Fallback for non-Error objects
    return NextResponse.json(
      { error: "Lỗi máy chủ nội bộ", details: "Unknown error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: Context
) {
  const { id } = context.params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Định dạng ID không hợp lệ" },
      { status: 400 }
    );
  }

  try {
    await prisma.product.delete({
      where: { id },
    });

    console.log("DELETE - Đã xóa sản phẩm:", id);
    return NextResponse.json({ message: "Đã xóa" });
  } catch (error) {
    console.error("DELETE Error:", error);

    // Use a type guard for PrismaClientKnownRequestError if DELETE can also throw it
    if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2025") { // Example: if trying to delete a non-existent record
            return NextResponse.json(
                { error: "Không tìm thấy sản phẩm để xóa" },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { error: "Lỗi máy chủ nội bộ", details: error.message || "Unknown error" },
            { status: 500 }
        );
    } else if (error instanceof Error) {
      return NextResponse.json(
        { error: "Lỗi máy chủ nội bộ", details: error.message || "Unknown error" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Lỗi máy chủ nội bộ", details: "Unknown error" },
      { status: 500 }
    );
  }
}