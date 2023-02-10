import type { NextApiRequest, NextApiResponse } from "next";

import type { User } from "next-auth";
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

    const { val } = req.query;
    if (!val) {
      return res.status(400).json({ message: "No search value provided." });
    }

    const normalizedVal = val?.toString().trim();
    if (normalizedVal.length < 1 || val.length > 20) {
      return res.status(400).json({ message: "Search value must be between 1 and 20 characters." });
    }

    const usersData = await prisma.user.findMany({
      where: {
        name: { contains: val as string, mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
        image: true,
        bio: true,
        outgoingRequests: true,
      },
    });

    const users = usersData.map((user) => {
      if (reqUser.id !== user.id && !reqUser.incomingRequests.includes(user.id)) {
        const alreadySentRequest = reqUser.outgoingRequests.includes(user.id);
        return { ...user, alreadySentRequest };
      }
    });

    users?.forEach((user, index) => {
      if (!user) {
        users?.splice(index, 1);
      }
    });

    const contacts: Array<User> = [];

    reqUser.contacts.forEach((contact) => {
      users?.forEach((user) => {
        if (contact === user?.id) {
          contacts.push(user);
          users?.splice(users.indexOf(user), 1);
        }
      });
    });

    return res.status(200).json({ users, contacts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Unknown error occured." });
  }
}
