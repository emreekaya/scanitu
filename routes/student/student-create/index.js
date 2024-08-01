const xlsx = require("xlsx");
const { insertNewDocument, findOne } = require("../../../helpers");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }).single('file');
const Student = require("../../../models/student");

const insertStudent = async (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            //return res.status(400).send({ status: 400, message: "Error uploading file" });
            try {
                // Excel dosyasından yükleme
                if (req.file) {
                    const workbook = xlsx.readFile(req.file.path);
                    const sheet_name_list = workbook.SheetNames;
                    const xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    
                    const students = xlData.map(row => ({
                        studentName: row["Adı Soyadı"],
                        studentNumber: row["Öğrenci No"],
                        studentMail: row["Mail"]
                    }));
    
                    const results = await Promise.all(students.map(async student => {
                        const existingStudent = await findOne("student", { studentNumber: student.studentNumber });
                        if (!existingStudent) {
                            return await insertNewDocument("student", student);
                        }
                        return null;
                    }));
    
                    return res.status(200).send({
                        status: 200,
                        message: "Students from Excel file processed",
                        results: results.filter(result => result !== null)
                    });
                }
    
                // Manuel ekleme
                const { studentName, studentNumber, studentMail } = req.body;
    
                if (studentName && studentNumber && studentMail) {
                    const existingStudent = await findOne("student", { studentNumber });
                    if (existingStudent) {
                        return res.status(400).send({ status: 400, message: "Student already exists" });
                    }
    
                    const newStudent = {
                        studentName,
                        studentNumber,
                        studentMail
                    };
    
                    const student = await insertNewDocument("student", newStudent);
                    
                    return res.status(200).send({ status: 200, message: "Student added successfully", student });
                }
    
                return res.status(400).send({ status: 400, message: "Invalid data" });
            } catch (e) {
                return res.status(400).send({ status: 400, message: e.message });
            }
        }
        else{
            return res.status(400).send({ status: 400, message: "Error uploading file" });
        }

    });
};

module.exports = insertStudent;
