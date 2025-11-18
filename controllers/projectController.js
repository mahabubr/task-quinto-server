import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { name, user_id, team_id } = req.body;

    const project = await prisma.project.create({
      data: {
        name,
        user_id,
        team_id,
      },
    });

    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create project",
    });
  }
};

// Get all projects (optionally by user_id)
export const getProjects = async (req, res) => {
  const { user_id } = req.query;

  try {
    const projects = await prisma.project.findMany({
      where: user_id ? { user_id: Number(user_id) } : {},
      include: {
        user: true,
        team: {
          include: {
            members: {
              include: { task: true },
            },
          },
        },
        task: {
          include: { members: true },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
};
