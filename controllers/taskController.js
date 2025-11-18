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

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Task ID is required",
      });
    }

    // Check if task exists
    const existingTask = await prisma.task.findUnique({
      where: { id: Number(id) },
    });

    if (!existingTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Delete task
    await prisma.task.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("❌ Delete Task Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete task",
    });
  }
};
