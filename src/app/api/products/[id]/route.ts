// app/api/products/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ObjectId } from "mongodb"; // Bạn vẫn có thể cần cái này để xác thực, nhưng không dùng trực tiếp trong 'where'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  // Validate ObjectId format trước khi query
  if (!ObjectId.isValid(params.id)) {
    return NextResponse.json(
      { error: "Định dạng ID không hợp lệ" },
      { status: 400 }
    );
  }

  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product) {
    return NextResponse.json(
      { error: "Không tìm thấy sản phẩm" },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}

// app/api/products/[id]/route.ts

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  console.log("PUT - params.id:", params.id);
  console.log("PUT - data:", data);

  if (!ObjectId.isValid(params.id)) {
    console.error("PUT Error: Invalid ID format received in params:", params.id);
    return NextResponse.json(
      { error: "Định dạng ID không hợp lệ" },
      { status: 400 }
    );
  }

  try {
    // Kiểm tra xem dữ liệu có giá trị null/undefined cho các trường bắt buộc không
    if (!data.name || !data.description || data.price === undefined || data.price === null) {
      console.error("PUT Error: Missing required fields in data:", data);
      return NextResponse.json(
        { error: "Thiếu trường bắt buộc (name, description, price)" },
        { status: 400 }
      );
    }

    const updatedProduct = await prisma.product.update({
      where: { id: params.id },
      data: { // Đảm bảo rằng bạn chỉ cập nhật các trường có thể cập nhật
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image || null, // Đảm bảo image có thể là null nếu không có
      },
    });
    console.log("Product updated successfully:", updatedProduct);
    return NextResponse.json(updatedProduct);
  } catch (error: any) { // Thêm kiểu any cho error để truy cập .message
    console.error("PUT Error details:", error);
    // Kiểm tra xem lỗi có phải do tìm không thấy ID không
    if (error.code === 'P2025') { // Mã lỗi của Prisma khi bản ghi không tồn tại để cập nhật
      return NextResponse.json(
        { error: "Không tìm thấy sản phẩm để cập nhật" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Lỗi máy chủ nội bộ", details: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  // Validate ObjectId format
  if (!ObjectId.isValid(params.id)) {
    return NextResponse.json(
      { error: "Định dạng ID không hợp lệ" },
      { status: 400 }
    );
  }

  try {
    await prisma.product.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: "Đã xóa" });
  } catch (error) {
    console.error("Lỗi DELETE:", error);
    return NextResponse.json(
      { error: "Lỗi máy chủ nội bộ" },
      { status: 500 }
    );
  }
}