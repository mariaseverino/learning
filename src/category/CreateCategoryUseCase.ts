import { AppError } from '../errors/AppError';
import { CategoryRepository } from './CategoryRepository';
import { CreateCategoryInput } from './types';

export class CreateCategoryUseCase {
    async execute({ name }: CreateCategoryInput) {
        const categoryRepository = new CategoryRepository();
        const categoryAlredyExits = await categoryRepository.findByName(name);

        if (categoryAlredyExits) {
            throw new AppError('This category already exists.', 409);
        }

        const category = await categoryRepository.save({
            name,
        });

        return category;
    }
}
