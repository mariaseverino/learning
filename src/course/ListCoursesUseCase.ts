import { CourseRepository } from './CourseRepository';

export class ListCoursesUseCase {
    async execute() {
        const courseRepository = new CourseRepository();
        return await courseRepository.getAllCourses();
    }
}
