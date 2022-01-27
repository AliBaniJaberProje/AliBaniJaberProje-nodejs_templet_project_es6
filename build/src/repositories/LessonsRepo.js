"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Lesson_1 = require("../models/Lesson");
class LessonRepo {
    constructor() { }
    getAllLessons(options) {
        return Lesson_1.Lesson.findAll(options);
    }
    getLessonById(id) {
        return Lesson_1.Lesson.findByPk(id);
    }
    getLessonByCourse(id) {
        return Lesson_1.Lesson.findAll({ where: { courseId: id } });
    }
    createLesson(props) {
        return Lesson_1.Lesson.create(props);
    }
    updateLesson(id, props) {
        return Lesson_1.Lesson.update(props, { where: { id: id.toString() } });
    }
    deleteLesson(id) {
        return Lesson_1.Lesson.destroy({ where: { id: id.toString() } });
    }
}
exports.default = new LessonRepo();
