"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname + '../../../.env') });
const Course_1 = require("../models/Course");
const Lesson_1 = require("../models/Lesson");
const courses = require('./courses.json');
Course_1.Course.sync({ force: true })
    .then(() => Lesson_1.Lesson.sync({ force: true }))
    .then(() => console.log('Database cleaned'))
    .then(() => {
    // @ts-ignore
    return Course_1.Course.bulkCreate(courses, { include: [{ model: Lesson_1.Lesson, as: 'lessons' }] });
})
    .then(() => {
    console.log('############# seeding completed #################');
    process.exit();
})
    .catch(console.error);
