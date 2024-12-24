import { FastifyInstance } from "fastify";
import { SchoolController } from "../controllers/SchoolController";
import { SchoolsTeachersController } from "../controllers/SchoolsTeachersController";
import { roleMiddleware } from "../../../middlewares/roleMiddleware";
import { isOwnerSchoolMiddleware } from "../middlewares/isOwnerSchoolMiddleware";
import { isOwnerTeacherMiddleware } from "../middlewares/isOwnerTeacherMiddleware";

export async function schoolRoutes(app: FastifyInstance) {
  const schoolController = new SchoolController();
  const schoolsTeachersController = new SchoolsTeachersController();

  app.get<{ Params: { userId: string } }>(
    "/api/schools/:userId",
    { preHandler: [roleMiddleware("SCHOOL")] },
    schoolController.getSchoolByUserId,
  );

  app.get<{ Querystring: { nameStreetId: string } }>(
    "/api/schools",
    schoolController.getSchoolByNameStreetId,
  );

  app.post("/api/schools", schoolController.createSchool);

  app.get<{ Params: { schoolId: string } }>(
    "/api/schools/:schoolId/teachers",
    { preHandler: [isOwnerSchoolMiddleware()] },
    schoolsTeachersController.getSchoolsTeachersBySchoolId,
  );

  app.get<{ Params: { teacherId: string } }>(
    "/api/schools/teachers/:teacherId",
    { preHandler: [isOwnerTeacherMiddleware()] },
    schoolsTeachersController.getSchoolsTeachersByTeacherId,
  );

  app.post(
    "/api/schools/teachers",
    schoolsTeachersController.createSchoolsTeachers,
  );
}
