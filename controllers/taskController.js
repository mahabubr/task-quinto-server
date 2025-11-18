import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { name, description, priority, status, project_id, member_ids } =
      req.body;

    const task = await prisma.task.create({
      data: {
        name,
        description,
        priority,
        status,
        project_id: Number(project_id),
        members: member_ids
          ? {
              connect: member_ids.map((id) => ({ id: Number(id) })),
            }
          : undefined,
      },
      include: {
        project: true,
        members: true,
      },
    });

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error("❌ Create Task Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create task",
    });
  }
};

// Get all tasks (optional filtering by project_id or member_id)
export const getTasks = async (req, res) => {
  const { project_id, member_id } = req.query;

  try {
    const tasks = await prisma.task.findMany({
      where: {
        ...(project_id && { project_id: Number(project_id) }),
        ...(member_id && {
          members: {
            some: { id: Number(member_id) },
          },
        }),
      },
      include: {
        project: true,
        members: true,
      },
    });

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    console.error("❌ Get Tasks Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
    });
  }
};
