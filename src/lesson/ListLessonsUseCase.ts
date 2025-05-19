import { LessonServices } from './LessonRepository';

export class ListLessonsUseCase {
    async execute(courseId: string) {
        const lesssonRepository = new LessonServices();
        return lesssonRepository.getCourseLessons(courseId);
    }
}
