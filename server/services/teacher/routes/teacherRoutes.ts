import { FastifyInstance } from "fastify";
import { TeacherController } from "../controllers/TeacherController";
import { roleMiddleware } from "../../../middlewares/roleMiddleware";
import { isOwnerMiddleware } from "../../../middlewares/isOwnerMiddleware";

export async function teacherRoutes(app: FastifyInstance) {
  const teacherController = new TeacherController();

  app.get<{ Params: { userId: string } }>(
    "/api/teachers/:userId",
    { preHandler: [isOwnerMiddleware(), roleMiddleware("TEACHER")] },
    teacherController.getTeacherByUserId,
  );

  app.post("/api/teachers", teacherController.createTeacher);
}
