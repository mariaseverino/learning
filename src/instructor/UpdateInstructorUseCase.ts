import { AppError } from '../errors/AppError';
import { InstructorRepository } from './InstructorRepository';
import { UpdateInstructorInput } from './types';

export class UpdateInstructorUseCase {
    async execute(id: string, data: UpdateInstructorInput) {
        const instructorRepository = new InstructorRepository();
        const courseExists = instructorRepository.findById(id);

        if (!courseExists) {
            throw new AppError('This course does not exist.', 404);
        }

        return await instructorRepository.update(id, data);
    }
}
