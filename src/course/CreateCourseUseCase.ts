import { CourseServices } from './CourseServices';
import { CreateCourseInput } from './types';

export class CreateCourseUseCase {
    async execute({ title, description, thumbnailUrl }: CreateCourseInput) {
        const courseService = new CourseServices();
        const curseAlredyExits = await courseService.findByTitle(title);

        if (curseAlredyExits) {
            throw new Error(
                'This course already exists. Try create a new lesson!'
            );
        }

        const course = await courseService.save({
            title,
            description,
            thumbnailUrl,
        });

        return course;
    }
}
