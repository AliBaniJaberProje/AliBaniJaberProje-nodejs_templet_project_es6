"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CoursesCtrl_1 = require("../controllers/CoursesCtrl");
class CourseRoutes {
    constructor() {
        this.router = express_1.Router();
        this.coursesCtrl = new CoursesCtrl_1.default();
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.route('/').post(this.coursesCtrl.getAllCourses);
        this.router.route('/:id').get(this.coursesCtrl.getCourseDetails);
    }
}
exports.default = new CourseRoutes().router;
