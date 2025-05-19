import { InstructorRepository } from './InstructorRepository';

export class GetInstructorsUseCase {
    async execute() {
        const instructorRepository = new InstructorRepository();
        return await instructorRepository.getAllInstructors();
    }
}
