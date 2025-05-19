import { AppError } from '../errors/AppError';
import { InstructorRepository } from './InstructorRepository';
import { CreateInstructorInput } from './types';

export class CreateInstructorUseCase {
    async execute({ name, especiality }: CreateInstructorInput) {
        const instructorRepository = new InstructorRepository();
        const instructorAlreadyExists = await instructorRepository.findByName(
            name
        );

        if (instructorAlreadyExists) {
            throw new AppError('This instructor does not exist.', 404);
        }

        const instructor = await instructorRepository.save({
            name,
            especiality,
        });

        return {
            id: instructor.id,
            name,
            especiality,
        };
    }
}
