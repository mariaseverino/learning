import { AppError } from '../errors/AppError';
import { LessonRepository } from '../lesson/LessonRepository';
import { StudentRepository } from './StudentRepository';
import { StudentDoneCourseLessonInput } from './types';

export class StudentDoneCourseLessonUsecase {
    async execute({ lessonId, studentId }: StudentDoneCourseLessonInput) {
        const studentRepository = new StudentRepository();
        const lessonRepository = new LessonRepository();

        const studentExists = studentRepository.findById(studentId);

        if (!studentExists) {
            throw new AppError('This student does not exist.', 404);
        }

        const lessonExists = lessonRepository.findById(lessonId);

        if (!lessonExists) {
            throw new AppError('This lesson does not exist.', 404);
        }

        await lessonRepository.completeLessson(lessonId, studentId);
    }
}
