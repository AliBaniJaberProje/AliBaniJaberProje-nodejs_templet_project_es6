"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("./../db/db");
const Lesson_1 = require("./Lesson");
class Course extends sequelize_1.Model {
}
exports.Course = Course;
Course.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    description: { type: sequelize_1.DataTypes.STRING },
    url: { type: sequelize_1.DataTypes.STRING },
    longDescription: { type: sequelize_1.DataTypes.TEXT },
    iconUrl: { type: sequelize_1.DataTypes.STRING },
    tags: { type: sequelize_1.DataTypes.STRING },
    channelTitle: { type: sequelize_1.DataTypes.STRING },
    channelUrl: { type: sequelize_1.DataTypes.STRING },
    channelId: { type: sequelize_1.DataTypes.STRING },
    seqNo: { type: sequelize_1.DataTypes.INTEGER },
}, {
    sequelize: db_1.default,
    tableName: 'Courses',
});
Course.hasMany(Lesson_1.Lesson, { foreignKey: 'courseId', as: 'lessons' });
Lesson_1.Lesson.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });
