import { CourseServices } from '../course/CourseServices';
import { LessonServices } from './LessonServices';
import { CreateLessonInput } from './types';

export class CreateLessonUseCase {
    async execute({ title, videoUrl, courseId }: CreateLessonInput) {
        const lessonServices = new LessonServices();
        const lessonAlreadyExists = await lessonServices.findByTitle(title);

        if (lessonAlreadyExists) {
            throw new Error('Already exists a lesson with this name!');
        }

        const courseServices = new CourseServices();
        const courseExists = await courseServices.findById(courseId);

        if (!courseExists) {
            throw new Error(
                'Unable to create lesson: the specified course does not exist.'
            );
        }

        await lessonServices.save({
            title,
            videoUrl,
            courseId,
        });
    }
}
