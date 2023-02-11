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

    const reqUser = await prisma.user.findFirst({
      where: { id: session.user?.id },
      select: {
        id: true,
        contacts: true,
      },
    });
    if (!reqUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { contactId } = req.body;
    if (!contactId) {
      return res.status(400).json({ message: "Missing contact id." });
    }

    const contact = await prisma.user.findFirst({
      where: { id: contactId },
      select: {
        id: true,
        contacts: true,
      },
    });
    if (!contact) {
      return res.status(404).json({ message: "Contact not found." });
    }

    /** Ismerős törlése (kezdeményező fél) */
    reqUser.contacts = reqUser.contacts.filter((c) => c !== contact.id);
    await prisma.user.update({
      where: { id: reqUser.id },
      data: { contacts: reqUser.contacts },
    });

    /** Ismerős törlése (másik fél) */
    contact.contacts = contact.contacts.filter((c) => c !== reqUser.id);
    await prisma.user.update({
      where: { id: contact.id },
      data: { contacts: contact.contacts },
    });

    return res.status(200).json({ message: "Contact deleted." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Unknown error occured." });
  }
}
