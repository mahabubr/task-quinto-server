import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getFullDashboardSummary = async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "user_id is required",
      });
    }

    const uid = Number(user_id);

    // ----- FIND TEAMS BY USER -----
    const teams = await prisma.team.findMany({
      where: { user_id: uid },
    });

    const teamIds = teams.map((t) => t.id);

    // ----- FIND MEMBERS IN USER'S TEAMS -----
    const members = await prisma.member.findMany({
      where: { team_id: { in: teamIds } },
      include: { task: true },
    });

    // ----- TEAM SUMMARY -----
    const teamSummary = members.map((m) => ({
      id: m.id,
      name: m.name,
      capacity: m.capacity,
      currentTasks: m.task.length,
      overloaded: m.task.length > m.capacity,
    }));

    const totalTeams = await prisma.team.findMany({ where: { user_id: uid } });

    // ----- TOTAL PROJECTS (owned by user) -----
    const totalProjects = await prisma.project.count({
      where: { user_id: uid },
    });

    // ----- TOTAL TASKS (from user's projects) -----
    const totalTasks = await prisma.task.count({
      where: {
        project: { user_id: uid },
      },
    });

    // ----- RECENT REASSIGNMENTS -----
    const recentReassignments = await prisma.task.findMany({
      where: { project: { user_id: uid } },
      take: 5,
      orderBy: { created_at: "desc" },
    });

    // FINAL RESPONSE
    res.status(200).json({
      success: true,
      data: {
        totals: {
          totalProjects,
          totalTasks,
          totalTeams,
        },
        teams,
        teamSummary,
        recentReassignments,
      },
    });
  } catch (error) {
    console.error("❌ Dashboard Summary Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard summary",
    });
  }
};
