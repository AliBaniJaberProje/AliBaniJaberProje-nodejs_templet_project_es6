"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = require("../handlers/errorHandler");
const LessonsRepo_1 = require("../repositories/LessonsRepo");
class LessonsCtrl {
    constructor() { }
    getAllLessons(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lessons = yield LessonsRepo_1.default.getAllLessons({ order: ['id'] });
                res.json(lessons);
            }
            catch (error) {
                (0, errorHandler_1.apiErrorHandler)(error, req, res, 'Fetch All Lessons failed.');
            }
        });
    }
    getLessonByCourse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lesson = yield LessonsRepo_1.default.getLessonByCourse(req.params.id);
                res.json(lesson);
            }
            catch (error) {
                (0, errorHandler_1.apiErrorHandler)(error, req, res, `Lessons in course ${req.params.id} failed.`);
            }
        });
    }
    getLessonById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield LessonsRepo_1.default.getLessonById(req.params.id);
                if (result) {
                    return res.json(result);
                }
                else {
                    res.status(404).send(`Lesson ${req.params.id} not found.`);
                }
            }
            catch (error) {
                (0, errorHandler_1.apiErrorHandler)(error, req, res, `Lesson ${req.params.id} failed.`);
            }
        });
    }
    createLesson(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield LessonsRepo_1.default.createLesson(req['value']['body']);
                res.json(result);
            }
            catch (error) {
                (0, errorHandler_1.apiErrorHandler)(error, req, res, 'Creation of Lesson failed.');
            }
        });
    }
    updateLesson(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            try {
                const result = yield LessonsRepo_1.default.updateLesson(id, req['value']['body']);
                res.json(result);
            }
            catch (error) {
                (0, errorHandler_1.apiErrorHandler)(error, req, res, `updation of Lesson ${req.params.id} is failed.`);
            }
        });
    }
    deleteLesson(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            try {
                const result = yield LessonsRepo_1.default.deleteLesson(id);
                res.json(result);
            }
            catch (error) {
                (0, errorHandler_1.apiErrorHandler)(error, req, res, `deletion of Lesson ${req.params.id}  is failed.`);
            }
        });
    }
}
exports.default = LessonsCtrl;
