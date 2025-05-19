import { AppError } from '../errors/AppError';
import { InstructorRepository } from './InstructorRepository';

export class DeleteInstructorUseCase {
    async execute(id: string) {
        const instructorRepository = new InstructorRepository();

        const instructor = await instructorRepository.findById(id);

        if (!instructor) {
            throw new AppError('This instructor does not exist.', 404);
        }

        const isInstructorLinkedToAnyCourse =
            await instructorRepository.findInstructorCourse(id);

        if (isInstructorLinkedToAnyCourse?.Course) {
            throw new AppError(
                'Unable to delete instructor. They are linked to one or more courses.',
                409
            );
        }

        await instructorRepository.deleteById(id);
    }
}
