import {FastifyInstance} from "fastify";
import {isAuthMiddleware} from "../../../middlewares/isAuth";
import {roleMiddleware} from "../../../middlewares/role";
import {SchoolController} from "../controllers/SchoolController";
import {SchoolsTeachersController} from "../controllers/SchoolsTeachersController";
import {
  CreateSchoolFullBody,
  GetSchoolByNameStreetIdQuery,
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

  /* Get school by NameStreetId */
  app.get<{Querystring: GetSchoolByNameStreetIdQuery}>(
    "/api/schools",
    schoolController.getSchoolByNameStreetId
  );

  /* Create school */
  app.post<{Body: CreateSchoolFullBody}>(
    "/api/schools",
    schoolController.createSchool
  );

  /* Get schools teachers by SchoolId */
  app.get<{Params: GetSchoolsTeachersBySchoolIdParams}>(
    "/api/schools/:schoolId/teachers",
    {preHandler: [isAuthMiddleware(), roleMiddleware("SCHOOL")]},
    schoolsTeachersController.getSchoolsTeachersBySchoolId
  );

  /* Create schools teachers */
  app.post<{Body: CreateSchoolsTeachersBody}>(
    "/api/schools/teachers",
    schoolsTeachersController.createSchoolsTeachers
  );

  /* Update schools teachers by schoolId*/
  app.put<{Params: UpdateSchoolsTeachersParams}>(
    "/api/schools/:schoolId/teachers/:id",
    {preHandler: [isAuthMiddleware(), roleMiddleware("SCHOOL")]},
    schoolsTeachersController.updateSchoolsTeachers
  );
}
