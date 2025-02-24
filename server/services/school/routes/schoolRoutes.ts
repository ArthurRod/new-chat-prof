import {FastifyInstance} from "fastify";
import {isAuthMiddleware} from "../../../middlewares/isAuth";
import {roleMiddleware} from "../../../middlewares/role";
import {SchoolController} from "../controllers/SchoolController";
import {SchoolsTeachersController} from "../controllers/SchoolsTeachersController";
import {
  CreateSchoolFullBody,
  GetSchoolBySchoolCodeQuery,
  GetSchoolBySchoolIdParams,
} from "../interfaces/SchoolInterfaces";
import {
  CreateSchoolsTeachersBody,
  GetSchoolsTeachersBySchoolIdParams,
  UpdateSchoolsTeachersParams,
} from "../interfaces/SchoolsTeachersInterfaces";

export async function schoolRoutes(app: FastifyInstance) {
  const schoolController = new SchoolController();
  const schoolsTeachersController = new SchoolsTeachersController();

  /* Get school by SchoolId */
  app.get<{Params: GetSchoolBySchoolIdParams}>(
    "/api/schools/:schoolId",
    {preHandler: [isAuthMiddleware(), roleMiddleware("SCHOOL")]},
    schoolController.getSchoolBySchoolId
  );

  /* Get school by SchoolCode */
  app.get<{Querystring: GetSchoolBySchoolCodeQuery}>(
    "/api/schools",
    {preHandler: [isAuthMiddleware(), roleMiddleware("TEACHER")]},
    schoolController.getSchoolBySchoolCode
  );

  /* Create school */
  app.post<{Body: CreateSchoolFullBody}>(
    "/api/schools",
    schoolController.createSchool
  );

  /* Create schools teachers */
  app.post<{Body: CreateSchoolsTeachersBody}>(
    "/api/schools/teachers",
    {preHandler: [isAuthMiddleware(), roleMiddleware("TEACHER")]},
    schoolsTeachersController.createSchoolsTeachers
  );

  /* Get schools teachers by SchoolId */
  app.get<{Params: GetSchoolsTeachersBySchoolIdParams}>(
    "/api/schools/:schoolId/teachers",
    {preHandler: [isAuthMiddleware(), roleMiddleware("SCHOOL")]},
    schoolsTeachersController.getSchoolsTeachersBySchoolId
  );

  /* Update schools teachers by id*/
  app.put<{Params: UpdateSchoolsTeachersParams}>(
    "/api/schools/teachers/:id",
    {preHandler: [isAuthMiddleware(), roleMiddleware("SCHOOL")]},
    schoolsTeachersController.updateSchoolsTeachers
  );
}
