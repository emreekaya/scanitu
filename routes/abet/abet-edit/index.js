const { updateDocument } = require("../../../helpers");
const { ObjectId } = require("mongodb");
const Joi = require("joi");

const schema = Joi.object({
  id: Joi.string().required(),
  mainCategory: Joi.string().optional(),
  subCategory: Joi.string().optional(),
  criteriaCode: Joi.string().optional(),
  criteriaDescription: Joi.string().optional()
});

const abetEdit = async (req, res) => {
  const { id, mainCategory, subCategory, criteriaCode, criteriaDescription } = req.body;

  try {
    // ID'nin geçerli bir ObjectId olup olmadığını kontrol et
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ status: 400, message: "Invalid ID format" });
    }

    // Güncelleme için setQuery'yi oluştur
    const setQuery = {};
    if (mainCategory) setQuery.mainCategory = mainCategory;
    if (subCategory) setQuery.subCategory = subCategory;
    if (criteriaCode) setQuery.criteriaCode = criteriaCode;
    if (criteriaDescription) setQuery.criteriaDescription = criteriaDescription;

    // Güncelleme işlemi
    const updateQuery = { _id: new ObjectId(id) };
    const updatedAbet = await updateDocument("abet", updateQuery, setQuery);

    if (!updatedAbet) {
      return res.status(404).send({ status: 404, message: "ABET data not found" });
    }

    return res.status(200).send({ status: 200, message: "ABET data updated successfully", updatedAbet });
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = abetEdit;
