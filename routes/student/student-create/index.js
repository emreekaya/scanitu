const multer = require('multer');
const xlsx = require('xlsx');
const fs = require('fs');
const { insertNewDocument, findOne, updateDocument } = require("../../../helpers");
const { ObjectID } = require("../../../types");
const courses = require("../../../models/courses");
const students = require("../../../models/student");
// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

const studentCreate = async (req, res) => {
    const courseId = req.body.courseId;
    let students = [];

    if (req.file) {
        // Excel dosyasından veri okuma
        const workbook = xlsx.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);

        students = data.map(row => ({
            studentName: row['Adı Soyadı'],
            studentNumber: row['Öğrenci No'],
            studentMail: row['Mail']
        }));

        // Yüklenen dosyayı silme
        fs.unlinkSync(req.file.path);
    } else {
        // Manuel veri ekleme
        const { studentName, studentNumber, studentMail } = req.body;
        students.push({ studentName, studentNumber, studentMail });
    }

    try {
        const results = await Promise.all(students.map(async student => {
            const existingStudent = await findOne('student', { studentNumber: student.studentNumber });
            if (existingStudent) {
                return existingStudent._id;
            } else {
                const newStudent = await insertNewDocument('student', student);
                return newStudent._id;
            }
        }));

        // Kursa öğrencileri ekleme
        const courseUpdate = await courses.findByIdAndUpdate(
            ObjectID(courseId),
            { $addToSet: { students: { $each: results } } },
            { new: true }
        ).exec();

        return res.status(200).send({ status: 200, message: "Students added successfully", courseUpdate });
    } catch (e) {
        return res.status(400).send({ status: 400, message: e.message });
    }
};

module.exports = studentCreate;
