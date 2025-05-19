import { AppError } from '../errors/AppError';
import { LessonRepository } from './LessonRepository';
import { UpdateLessonInput } from './types';

export class UpdateLessonUseCase {
    async execute(lessonId: string, data: UpdateLessonInput) {
        const lessonRepository = new LessonRepository();
        const lessonExists = lessonRepository.findById(lessonId);

        if (!lessonExists) {
            throw new AppError('This lesson does not exist.', 404);
        }

        return await lessonRepository.update(lessonId, data);
    }
}
