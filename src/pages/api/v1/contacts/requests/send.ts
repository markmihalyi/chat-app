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

    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "No user identifier provided." });
    }

    const reqUser = await prisma.user.findFirst({
      where: { id: session.user?.id },
      select: { id: true, outgoingRequests: true, contacts: true },
    });
    if (!reqUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (reqUser.id === id) {
      return res.status(400).json({ message: "Cannot send request to yourself." });
    }

    if (reqUser.contacts.includes(id)) {
      return res.status(400).json({ message: "User is already in your contacts." });
    }

    const targetUser = await prisma.user.findFirst({
      where: { id },
      select: { id: true, incomingRequests: true },
    });
    if (!targetUser) {
      return res.status(404).json({ message: "User not found." });
    }

    if (reqUser.outgoingRequests.includes(targetUser.id)) {
      return res.status(400).json({ message: "Request already sent." });
    }

    reqUser.outgoingRequests.push(targetUser.id);
    await prisma.user.update({
      where: { id: reqUser.id },
      data: { outgoingRequests: reqUser.outgoingRequests },
    });

    targetUser.incomingRequests.push(reqUser.id);
    await prisma.user.update({
      where: { id: targetUser.id },
      data: { incomingRequests: targetUser.incomingRequests },
    });

    return res.status(200).json({ message: "Request sent." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Unknown error occured." });
  }
}
