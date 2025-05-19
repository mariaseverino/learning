import { CategoryRepository } from './CategoryRepository';

export class GetCategoriesUseCase {
    async execute() {
        const categoryRepository = new CategoryRepository();
        return await categoryRepository.getCategories();
    }
}
