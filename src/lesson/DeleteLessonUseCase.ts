import { AppError } from '../errors/AppError';
import { LessonRepository } from './LessonRepository';

export class DeleteLessonUseCase {
    async execute(id: string) {
        const lessonRepository = new LessonRepository();

        const lessonExists = await lessonRepository.findLessonWithCourseById(
            id
        );

        if (!lessonExists) {
            throw new AppError('This lesson does not exist.', 404);
        }

        if (lessonExists.course.students.length > 0) {
            throw new AppError(
                'Unable to delete lesson. The course has enrolled students.',
                409
            );
        }

        await lessonRepository.deleteById(id);
    }
}
