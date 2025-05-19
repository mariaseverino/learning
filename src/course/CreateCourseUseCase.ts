import { AppError } from '../errors/AppError';
import { CourseRepository } from './CourseRepository';
import { CreateCourseInput } from './types';

export class CreateCourseUseCase {
    async execute({
        title,
        description,
        thumbnailUrl,
        categories,
        instructor,
    }: CreateCourseInput) {
        const courseService = new CourseRepository();
        const curseAlredyExits = await courseService.findByTitle(title);

        if (curseAlredyExits) {
            throw new AppError(
                'This course already exists. Try creating a new lesson instead.',
                409
            );
        }

        const course = await courseService.save({
            title,
            description,
            thumbnailUrl,
            categories,
            instructor,
        });

        return course;
    }
}
