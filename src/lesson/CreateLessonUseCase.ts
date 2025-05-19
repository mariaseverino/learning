import { CourseRepository } from '../course/CourseRepository';
import { AppError } from '../errors/AppError';
import { LessonRepository } from './LessonRepository';
import { CreateLessonInput } from './types';

export class CreateLessonUseCase {
    async execute({ title, videoUrl, courseId }: CreateLessonInput) {
        const lessonRepository = new LessonRepository();
        const lessonAlreadyExists = await lessonRepository.findByTitle(title);

        if (lessonAlreadyExists) {
            throw new AppError('A lesson with this name already exists.', 409);
        }

        const courseRepository = new CourseRepository();
        const courseExists = await courseRepository.findById(courseId);

        if (!courseExists) {
            throw new AppError(
                'Unable to create lesson. The specified course does not exist.',
                404
            );
        }

        await lessonRepository.save({
            title,
            videoUrl,
            courseId,
        });
    }
}
