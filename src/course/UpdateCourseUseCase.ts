import { CourseServices } from './CourseServices';
import { UpdateCourseInput } from './types';

export class UpdateCourseUseCase {
    async execute(courseId: string, data: UpdateCourseInput) {
        const courseSevices = new CourseServices();
        const courseExists = courseSevices.findById(courseId);

        if (!courseExists) {
            throw new Error('This course does not exist.');
        }

        return await courseSevices.update(courseId, data);
    }
}
