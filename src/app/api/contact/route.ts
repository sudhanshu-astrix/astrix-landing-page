import { NextResponse } from "next/server";
import connectToDatabase from "../../../../db";
import ContactMessage from "../../../../db/contact.model";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { firstName, lastName, email, phone, message } = body;

    if (!firstName || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const newMessage = await ContactMessage.create({
      firstName,
      lastName,
      email,
      phone,
      message,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Message saved successfully!",
        data: newMessage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();

    const messages = await ContactMessage.find().sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        data: messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/contact Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
