import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(
  request: Request,
  { params }: Params // Extract params and define his data type
) {
  try {
    const { id: noteId } = params;

    const note = await prisma.note.findFirst({ where: { id: Number(noteId) } });

    if (!note) {
      return NextResponse.json({
        message: "Note not found",
        status: 404,
      });
    }

    return NextResponse.json(note);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        message: error.message,
        status: 500,
      });
    }
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const { id: noteId } = params;

    const deletedNote = await prisma.note.delete({
      where: { id: Number(noteId) },
    });

    if (!deletedNote) {
      return NextResponse.json({
        message: "Note not found",
        status: 404,
      });
    }

    return NextResponse.json({
      message: `Note with id: [${deletedNote.id}] and title: [${deletedNote.title}] deleted successfully`,
      status: 200,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if ((error.code = "P2025")) {
        return NextResponse.json({
          message: "Not found",
          status: 404,
        });
      }
      return NextResponse.json({
        message: error.message,
        status: 500,
      });
    }
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { title, content } = await request.json();
    const { id: noteId } = params;

    const updatedNote = await prisma.note.update({
      where: {
        id: Number(noteId),
      },
      data: {
        title,
        content,
      },
    });

    return NextResponse.json({
      message: `Note with id: [${updatedNote.id}] updated successfully`,
      updatedNote,
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        message: error.message,
        status: 500,
      });
    }
  }
}
