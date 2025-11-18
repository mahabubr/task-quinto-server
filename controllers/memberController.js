import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const createMember = async (req, res) => {
  try {
    const { name, role, capacity, team_id } = req.body;

    const member = await prisma.member.create({
      data: {
        name,
        role,
        capacity: capacity || 0,
        team_id,
      },
    });

    res.status(201).json({
      success: true,
      data: member,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create member",
    });
  }
};

// Get all members
export const getMembers = async (req, res) => {
  try {
    const members = await prisma.member.findMany({
      include: {
        team: true, // Include team info
      },
    });

    res.status(200).json({
      success: true,
      data: members,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch members",
    });
  }
};
