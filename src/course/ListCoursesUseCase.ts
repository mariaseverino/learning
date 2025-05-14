import { CourseServices } from './CourseServices';

export class ListCoursesUseCase {
    async execute() {
        const courseServices = new CourseServices();
        return await courseServices.getAllCourses();
    }
}
