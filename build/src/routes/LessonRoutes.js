"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LessonsCtrl_1 = require("../controllers/LessonsCtrl");
const lessonValidator_1 = require("../validators/lessonValidator");
class LessonRoutes {
    constructor() {
        this.router = express_1.Router();
        this.lessonsCtrl = new LessonsCtrl_1.default();
        this.lessonValidator = new lessonValidator_1.LessonValidator();
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.route('/').get(this.lessonsCtrl.getAllLessons);
        this.router.route('/course/:id')
            .get(this.lessonsCtrl.getLessonByCourse);
        this.router.route('/:id').get(this.lessonsCtrl.getLessonById);
        this.router.route('/')
            .post(this.lessonValidator.validateBody(lessonValidator_1.lessonSchema), this.lessonsCtrl.createLesson);
        this.router.route('/:id')
            .put(this.lessonValidator.validateBody(lessonValidator_1.lessonSchema), this.lessonsCtrl.updateLesson);
        this.router.route('/:id').delete(this.lessonsCtrl.deleteLesson);
    }
}
exports.default = new LessonRoutes().router;
