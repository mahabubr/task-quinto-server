import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTeam = async (req, res) => {
  try {
    const { name, description, user_id } = req.body;

    const team = await prisma.team.create({
      data: {
        name,
        description,
        user_id,
      },
    });

    res.status(201).json({
      success: true,
      data: team,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create team",
    });
  }
};

// Get all teams
export const getTeams = async (req, res) => {
  const { user_id } = req.query;

  try {
    const teams = await prisma.team.findMany({
      where: { user_id: Number(user_id) },
      include: {
        user: true, // Include related user
        members: true, // Include members
      },
    });

    res.status(200).json({
      success: true,
      data: teams,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch teams",
    });
  }
};
