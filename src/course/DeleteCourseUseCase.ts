import { AppError } from '../errors/AppError';
import { CourseRepository } from './CourseRepository';

export class DeleteCourseUseCase {
    async execute(id: string) {
        const courseServices = new CourseRepository();

        const courseExists = await courseServices.findById(id);

        if (!courseExists) {
            throw new AppError('This course does not exist.', 404);
        }

        if (courseExists.students.length > 0) {
            throw new AppError(
                'Unable to delete course. There are students enrolled in this course.',
                409
            );
        }

        await courseServices.deleteById(id);
    }
}
