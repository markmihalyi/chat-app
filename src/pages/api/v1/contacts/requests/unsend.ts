import type { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "next-auth/react";
import { prisma } from "server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "PUT") {
      return res.status(405).json({ message: "Method not allowed." });
    }

    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { contactId } = req.body;
    if (!contactId) {
      return res.status(400).json({ message: "Bad request." });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session?.user?.id,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    if (!user.outgoingRequests.includes(contactId)) {
      return res.status(400).json({ message: "Contact request not found." });
    }

    const senderUser = await prisma.user.findUnique({
      where: {
        id: contactId,
      },
    });
    if (!senderUser) {
      return res.status(404).json({ message: "Sender user not found." });
    }
    if (!senderUser.incomingRequests.includes(user.id)) {
      return res.status(400).json({ message: "Contact request not found." });
    }

    /** Kérelem visszavonása (fogadó fél) */
    user.outgoingRequests = user.outgoingRequests.filter((id) => id !== contactId);
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        outgoingRequests: user.outgoingRequests,
      },
    });

    /** Kérelem visszavonása (küldő fél) */
    senderUser.incomingRequests = senderUser.incomingRequests.filter((id) => id !== user.id);
    await prisma.user.update({
      where: {
        id: senderUser.id,
      },
      data: {
        incomingRequests: senderUser.incomingRequests,
      },
    });

    return res.status(200).json({ message: "Contact request deleted." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Unknown error occured." });
  }
}
