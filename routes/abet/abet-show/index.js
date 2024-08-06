const { find } = require("../../../helpers");

const showAbet = async (req, res) => {
  try {
    // Tüm ABET belgelerini veritabanından al
    const abetList = await find("abet", {});

    if (!abetList || abetList.length === 0) {
      return res.status(404).send({ status: 404, message: "No ABET data found" });
    }

    // Verileri ana kategori, alt kategori ve kriter bazında gruplama ve sıralama
    const structuredAbetList = {};
    const categoryMap = {};
    let categoryIndex = 0;

    // Kriter kodlarına göre alfabetik olarak sıralama
    abetList.sort((a, b) => {
      return a.criteriaCode.localeCompare(b.criteriaCode);
    });

    abetList.forEach(item => {
      const mainCategory = item.mainCategory;
      const subCategory = item.subCategory;
      const criteria = {
        _id: item._id,
        code: item.criteriaCode,
        description: item.criteriaDescription
      };

      if (!categoryMap[mainCategory]) {
        categoryMap[mainCategory] = {
          categoryCode: String.fromCharCode(65 + categoryIndex), // A, B, C, ...
          subCategoryIndex: 0,
          subCategories: [],
          criteria: []
        };
        structuredAbetList[mainCategory] = categoryMap[mainCategory];
        categoryIndex++;
      }

      if (subCategory) {
        let subCategoryObj = categoryMap[mainCategory].subCategories.find(subCat => subCat.subCategory === subCategory);

        if (!subCategoryObj) {
          const subCategoryCode = `${categoryMap[mainCategory].categoryCode}${++categoryMap[mainCategory].subCategoryIndex}`;
          subCategoryObj = {
            subCategory,
            subCategoryCode,
            criteria: []
          };
          categoryMap[mainCategory].subCategories.push(subCategoryObj);
        }

        subCategoryObj.criteria.push(criteria);
      } else {
        categoryMap[mainCategory].criteria.push(criteria);
      }
    });

    // Yapılandırılmış verileri frontend'e gönder
    return res.status(200).send({ status: 200, abetList: structuredAbetList });
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = showAbet;
