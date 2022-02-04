"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CourseRoutes_1 = require("./CourseRoutes");
const LessonRoutes_1 = require("./LessonRoutes");
const UserRoutes_1 = require("./UserRoutes");
class Routes {
    constructor(app) {
        // course reoutes
        app.use('/api/courses', CourseRoutes_1.default);
        // lesson routes
        app.use('/api/lessons', LessonRoutes_1.default);
        app.use('/v0/api/users', UserRoutes_1.default);
    }
}
exports.default = Routes;
