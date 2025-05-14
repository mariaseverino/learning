import { LessonServices } from './LessonServices';

export class DeleteLessonUseCase {
    async execute(id: string) {
        const lessonServices = new LessonServices();

        const lessonExists = await lessonServices.findLessonWithCourseById(id);

        if (!lessonExists) {
            throw new Error('This lesson does not exist.');
        }

        if (lessonExists.course.students.length > 0) {
            throw new Error(
                'Unable to delete lesson. The course has enrolled students and cannot be deleted.'
            );
        }

        await lessonServices.deleteById(id);
    }
}
