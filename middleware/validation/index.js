const Joi = require("joi");

// Generic validation middleware
const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: "Validation error",
        details: error.details.map(detail => detail.message)
      });
    }
    next();
  };
};

// Common validation schemas
const schemas = {
  // Student validation
  student: {
    create: Joi.object({
      studentName: Joi.string().required().trim().min(2).max(100),
      studentNumber: Joi.string().required().trim().min(5).max(20),
      studentMail: Joi.string().email().required().trim()
    }),
    update: Joi.object({
      studentName: Joi.string().trim().min(2).max(100),
      studentNumber: Joi.string().trim().min(5).max(20),
      studentMail: Joi.string().email().trim()
    })
  },

  // Auth validation
  auth: {
    login: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6)
    }),
    register: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6).max(128),
      name: Joi.string().required().trim().min(2).max(100)
    }),
    forgotPassword: Joi.object({
      email: Joi.string().email().required()
    })
  },

  // Course validation
  course: {
    create: Joi.object({
      courseName: Joi.string().required().trim().min(2).max(200),
      courseCode: Joi.string().required().trim().min(2).max(20),
      credits: Joi.number().integer().min(1).max(10)
    })
  },

  // Grade validation
  grade: {
    create: Joi.object({
      studentId: Joi.string().required(),
      courseId: Joi.string().required(),
      grade: Joi.number().min(0).max(100),
      letterGrade: Joi.string().valid('AA', 'BA', 'BB', 'CB', 'CC', 'DC', 'DD', 'FF')
    })
  },

  // Exam validation
  exam: {
    create: Joi.object({
      examName: Joi.string().required().trim().min(2).max(200),
      examDate: Joi.date().required(),
      courseId: Joi.string().required(),
      duration: Joi.number().integer().min(30).max(300) // minutes
    })
  }
};

module.exports = { validate, schemas };