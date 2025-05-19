import { AppError } from '../errors/AppError';
import { CategoryRepository } from './CategoryRepository';

export class DeleteCategoryUseCase {
    async execute(id: string) {
        const instructorRepository = new CategoryRepository();

        const instructor = await instructorRepository.findById(id);

        if (!instructor) {
            throw new AppError('This instructor does not exist.', 404);
        }

        const isCategoryLinkedToAnyCourse =
            await instructorRepository.findCategoryCourse(id);

        if (isCategoryLinkedToAnyCourse?.courses) {
            throw new AppError(
                'Unable to delete category. It is linked to one or more courses.',
                409
            );
        }

        await instructorRepository.deleteById(id);
    }
}
