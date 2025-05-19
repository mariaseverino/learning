import { AppError } from '../errors/AppError';
import { StudentRepository } from './StudentRepository';

export class ListStundetEnrollCoursesUseCase {
    async execute(studentId: string) {
        const stundentRepository = new StudentRepository();
        const studentExists = await stundentRepository.findById(studentId);

        if (!studentExists) {
            throw new AppError('This student does not exist.', 404);
        }
        return studentExists.courses;
    }
}
