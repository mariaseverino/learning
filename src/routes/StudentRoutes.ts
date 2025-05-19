import z from 'zod';
import {
    completeLessonSchema,
    EnrollStudentInCourseSchema,
    getCurrentStudentResponseSchema,
    getEnrollCoursesResponseSchema,
} from '../student/types';
import { FastifyTypeInstance } from '../types';
import { EnrollStudentInCourseController } from '../student/EnrollStudentInCourseController';
import { GetCurrentStudentController } from '../student/GetCurrentStudentController';
import { ListStundentEnrollCoursesController } from '../student/ListStundetEnrollCoursesController';
import { StudentDoneCourseLessonController } from '../student/StudentDoneCourseLessonController';
import { ensureAuthenticated } from '../middleware/ensure-authenticated';

export class StudentRoutes {
    private enrollStudentInCourse: EnrollStudentInCourseController;
    private getCurrentStudentController: GetCurrentStudentController;
    private listStundetEnrollCoursesController: ListStundentEnrollCoursesController;
    private studentDoneCourseLessonController: StudentDoneCourseLessonController;

    constructor(private readonly app: FastifyTypeInstance) {
        this.enrollStudentInCourse = new EnrollStudentInCourseController();
        this.getCurrentStudentController = new GetCurrentStudentController();
        this.listStundetEnrollCoursesController =
            new ListStundentEnrollCoursesController();
        this.studentDoneCourseLessonController =
            new StudentDoneCourseLessonController();
    }

    async registerRoutes() {
        this.app.post(
            '/student/:studentId/enroll/course/:courseId',
            {
                schema: {
                    tags: ['Student'],
                    description: 'Enroll a student in a course',
                    headers: z.object({
                        authorization: z.string(),
                    }),
                    params: EnrollStudentInCourseSchema,
                    response: {
                        201: z.null().describe('Lesson created'),
                        404: z.object({
                            message: z.string(),
                        }),
                    },
                },
                preHandler: ensureAuthenticated,
            },
            this.enrollStudentInCourse.handle
        );
        this.app.get(
            '/student/:id',
            {
                schema: {
                    tags: ['Student'],
                    description: 'Get current student',
                    headers: z.object({
                        authorization: z.string(),
                    }),
                    params: z.object({
                        id: z.string(),
                    }),
                    response: {
                        200: {
                            description: 'Successful response',
                            type: 'object',
                            properties: getCurrentStudentResponseSchema,
                        },
                        404: z.object({
                            message: z.string(),
                        }),
                    },
                },
                preHandler: ensureAuthenticated,
            },
            this.getCurrentStudentController.handle
        );
        this.app.put(
            '/student/:id/enroll_courses',
            {
                schema: {
                    tags: ['Student'],
                    description: 'Update courses',
                    headers: z.object({
                        authorization: z.string(),
                    }),
                    params: z.object({
                        id: z.string(),
                    }),
                    response: {
                        200: {
                            description: 'Successful response',
                            type: 'object',
                            properties: getEnrollCoursesResponseSchema,
                        },
                        404: z.object({
                            message: z.string(),
                        }),
                    },
                },
                preHandler: ensureAuthenticated,
            },
            this.listStundetEnrollCoursesController.handle
        );
        this.app.post(
            '/student/:studentId/complete-lesson/:lessonId',
            {
                schema: {
                    tags: ['Student'],
                    description: 'Student done a lesson',
                    headers: z.object({
                        authorization: z.string(),
                    }),
                    params: completeLessonSchema,
                    response: {
                        200: z.null(),
                        404: z.object({
                            message: z.string(),
                        }),
                    },
                },
                preHandler: ensureAuthenticated,
            },
            this.studentDoneCourseLessonController.handle
        );
    }
}
