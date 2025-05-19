import { AppError } from '../errors/AppError';
import { StudentRepository } from './StudentRepository';

export class GetCurrentStudentUseCase {
    async execute(id: string) {
        const studentRepsitory = new StudentRepository();

        const studentExists = studentRepsitory.findById(id);

        if (!studentExists) {
            throw new AppError('This student does not exist.', 404);
        }

        return studentExists;
    }
}
