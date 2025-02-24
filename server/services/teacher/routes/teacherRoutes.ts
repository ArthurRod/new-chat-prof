import {FastifyInstance} from "fastify";
import {isAuthMiddleware} from "../../../middlewares/isAuth";
import {roleMiddleware} from "../../../middlewares/role";
import {TeacherController} from "../controllers/TeacherController";
import {GetTeachersSchoolsByTeacherIdParams} from "../interfaces/TeachersSchoolsInterfaces";
import {TeachersSchoolsController} from "../controllers/TeachersSchoolsController";
import {GetTeacherByTeacherIdParams} from "../interfaces/TeacherInterfaces";

export async function teacherRoutes(app: FastifyInstance) {
  const teacherController = new TeacherController();
  const teachersSchoolsController = new TeachersSchoolsController();

  /* Get teacher by TeacherId */
  app.get<{Params: GetTeacherByTeacherIdParams}>(
    "/api/teachers/:teacherId",
    {preHandler: [isAuthMiddleware(), roleMiddleware("TEACHER")]},
    teacherController.getTeacherByTeacherId
  );

  /* Create teacher */
  app.post("/api/teachers", teacherController.createTeacher);

  /* Get schools teachers by TeacherId */
  app.get<{Params: GetTeachersSchoolsByTeacherIdParams}>(
    "/api/teachers/:teacherId/schools",
    {preHandler: [isAuthMiddleware(), roleMiddleware("TEACHER")]},
    teachersSchoolsController.getTeachersSchoolsByTeacherId
  );
}
