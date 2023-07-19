import type { Message } from "@prisma/client";
import { prisma } from "./db.server";
interface MessageDTO {
  subject: string;
  name: string;
  email: string;
  message: string;
}

export const createNewMessage = async (data: MessageDTO | any) => {
  try {
    return await prisma.message.create({
      data: {
        message: data.message,
        email: data.email,
        subject: data.subject,
        name: data.name,
      },
    });
  } catch (error) {
    throw error;
  }
};
