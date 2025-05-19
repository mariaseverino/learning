import { AppError } from '../errors/AppError';
import { CourseRepository } from './CourseRepository';
import { UpdateCourseInput } from './types';

export class UpdateCourseUseCase {
    async execute(courseId: string, data: UpdateCourseInput) {
        const courseRepository = new CourseRepository();
        const courseExists = courseRepository.findById(courseId);

        if (!courseExists) {
            throw new AppError('This course does not exist.', 404);
        }

        return await courseRepository.update(courseId, data);
    }
}
