import { CourseServices } from './CourseServices';

export class DeleteCourseUseCase {
    async execute(id: string) {
        const courseServices = new CourseServices();

        const courseExists = await courseServices.findById(id);

        if (!courseExists) {
            throw new Error('This course does not exist.');
        }

        if (courseExists.students.length > 0) {
            throw new Error(
                'Unable to delete course. The course has enrolled students and cannot be deleted.'
            );
        }

        await courseServices.deleteById(id);
    }
}
