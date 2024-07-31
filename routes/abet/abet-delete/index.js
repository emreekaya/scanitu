const { deleteDocument } = require("../../../helpers");
const { ObjectId } = require("mongodb");
const Joi = require("joi");

const schema = Joi.object({
  id: Joi.string().required()
});

const abetDelete = async (req, res) => {
  const { id } = req.body;

  try {
    // ID'nin geçerli bir ObjectId olup olmadığını kontrol et
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ status: 400, message: "Invalid ID format" });
    }

    // Belirtilen ID'ye sahip kriteri sil
    const deleteQuery = { _id: new ObjectId(id) };
    const deletedAbet = await deleteDocument("abet", deleteQuery);

    if (deletedAbet.deletedCount === 0) {
      return res.status(404).send({ status: 404, message: "ABET data not found" });
    }

    return res.status(200).send({ status: 200, message: "ABET data deleted successfully", deletedAbet });
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = abetDelete;
