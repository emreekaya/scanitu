const { ObjectID } = require("../../../types");

const { find ,findOne} = require("../../../helpers");
const Joi = require("joi");
const { cp } = require("fs");
const schema = Joi.object({
  courseId: ObjectID,
});

const showExam = async (req, res) => {
  const { courseId } = await req.body;
  try {
    var searchQuery = {};
    
    if(courseId){
        searchQuery["courseId"] = courseId;
    }
    
    const exams = await find("exam", searchQuery);
    
    var examArray = [];  
    for(let i = 0; i < exam.length; i++){
        var exam = {
            _id: "",
            courseId: "",
            examName: "",
            questionNumber: 0
        };
        var element = exams[i];
        /*var user = await findOne("user", {_id: element.userId});
        comment._id = element._id.toString();
        comment.postId = element.postId.toString();
        comment.userId = element.userId.toString();
        comment.commentDate = element.commentDate;
        comment.userName = user.userName;
        comment.tagId = element.tagId;
        comment.content = element.content;
        commentArray[i] = comment;*/
    }

    
    return res.status(200).send({ status: 200, examArray });
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = showExam;
