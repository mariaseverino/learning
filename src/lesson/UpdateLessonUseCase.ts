import { LessonServices } from './LessonServices';
import { UpdateLessonInput } from './types';

export class UpdateLessonUseCase {
    async execute(lessonId: string, data: UpdateLessonInput) {
        const lessonSevices = new LessonServices();
        const lessonExists = lessonSevices.findById(lessonId);

        if (!lessonExists) {
            throw new Error('This lesson does not exist.');
        }

        return await lessonSevices.update(lessonId, data);
    }
}
