import type { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "next-auth/react";
import { prisma } from "server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ message: "Method not allowed." });
    }

    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const reqUser = await prisma.user.findFirst({
      where: { id: session.user?.id },
    });
    if (!reqUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const contacts = await prisma.user.findMany({
      where: {
        id: {
          in: reqUser.contacts,
        },
      },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        bio: true,
      },
    });

    return res.status(200).json(contacts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Unknown error occured." });
  }
}
