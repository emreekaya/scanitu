const { find } = require("../../../helpers");

const showAbet = async (req, res) => {
  try {
    // Tüm ABET belgelerini veritabanından al
    const abetList = await find("abet", {});

    if (!abetList || abetList.length === 0) {
      return res.status(404).send({ status: 404, message: "No ABET data found" });
    }

    // Verileri ana kategori, alt kategori ve kriter bazında gruplama
    const structuredAbetList = {};

    abetList.forEach(item => {
      const mainCategory = item.mainCategory;
      const subCategory = item.subCategory;
      const criteria = {
        code: item.criteriaCode,
        description: item.criteriaDescription
      };

      if (!structuredAbetList[mainCategory]) {
        structuredAbetList[mainCategory] = {
          subCategories: {},
          criteria: []
        };
      }

      if (subCategory) {
        if (!structuredAbetList[mainCategory].subCategories[subCategory]) {
          structuredAbetList[mainCategory].subCategories[subCategory] = [];
        }
        structuredAbetList[mainCategory].subCategories[subCategory].push(criteria);
      } else {
        structuredAbetList[mainCategory].criteria.push(criteria);
      }
    });

    // Yapılandırılmış verileri frontend'e gönder
    return res.status(200).send({ status: 200, abetList: structuredAbetList });
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = showAbet;
