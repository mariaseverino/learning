import { CourseRepository } from '../course/CourseRepository';
import { AppError } from '../errors/AppError';
import { StudentRepository } from './StudentRepository';

export class EnrollStudentInCourseUseCase {
    async execute(studentId: string, courseId: string) {
        const studentRepository = new StudentRepository();
        const courseRepository = new CourseRepository();

        const studentExists = studentRepository.findById(studentId);

        if (!studentExists) {
            throw new AppError('This student does not exist.', 404);
        }
        const courseExists = await courseRepository.findById(courseId);

        if (!courseExists) {
            throw new AppError('This course does not exist.', 404);
        }

        await studentRepository.enroll(studentId, courseId);
    }
}
