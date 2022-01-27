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
const CoursesRepo_1 = require("./../repositories/CoursesRepo");
const errorHandler_1 = require("./../handlers/errorHandler");
const http_status_codes_1 = require("http-status-codes");
class CoursesCtrl {
    constructor() { }
    getAllCourses(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courseList = yield CoursesRepo_1.default.getAllCourses({ order: ['seqNo'] });
                res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(courseList);
            }
            catch (error) {
                errorHandler_1.apiErrorHandler(error, req, res, 'Fetch All Courses failed.');
            }
        });
    }
    getCourseDetails(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courseDetails = yield CoursesRepo_1.default.getById(req.params.id);
                if (courseDetails) {
                    return res.json(courseDetails);
                }
                else {
                    res.status(404).send(`Lesson ${req.params.id} not found.`);
                }
            }
            catch (error) {
                errorHandler_1.apiErrorHandler(error, req, res, `Course ${req.params.id} is failed.`);
            }
        });
    }
}
exports.default = CoursesCtrl;
