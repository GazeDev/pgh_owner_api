'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Properties', {
      "PARID": {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      "PROPERTYOWNER": Sequelize.STRING,
      "PROPERTYHOUSENUM": Sequelize.STRING,
      "PROPERTYFRACTION": Sequelize.STRING,
      "PROPERTYADDRESS": Sequelize.STRING,
      "PROPERTYCITY": Sequelize.STRING,
      "PROPERTYSTATE": Sequelize.STRING,
      "PROPERTYUNIT": Sequelize.STRING,
      "PROPERTYZIP": Sequelize.STRING,
      "MUNICODE": Sequelize.STRING,
      "MUNIDESC": Sequelize.STRING,
      "SCHOOLCODE": Sequelize.STRING,
      "SCHOOLDESC": Sequelize.STRING,
      "LEGAL1": Sequelize.STRING,
      "LEGAL2": Sequelize.STRING,
      "LEGAL3": Sequelize.STRING,
      "NEIGHCODE": Sequelize.STRING,
      "NEIGHDESC": Sequelize.STRING,
      "TAXCODE": Sequelize.STRING,
      "TAXDESC": Sequelize.STRING,
      "TAXSUBCODE": Sequelize.STRING,
      "TAXSUBCODE_DESC": Sequelize.STRING,
      "OWNERCODE": Sequelize.STRING,
      "OWNERDESC": Sequelize.STRING,
      "CLASS": Sequelize.STRING,
      "CLASSDESC": Sequelize.STRING,
      "USECODE": Sequelize.STRING,
      "USEDESC": Sequelize.STRING,
      "LOTAREA": Sequelize.STRING,
      "HOMESTEADFLAG": Sequelize.STRING,
      "FARMSTEADFLAG": Sequelize.STRING,
      "CLEANGREEN": Sequelize.STRING,
      "ABATEMENTFLAG": Sequelize.STRING,
      "RECORDDATE": Sequelize.STRING,
      "SALEDATE": Sequelize.STRING,
      "SALEPRICE": Sequelize.STRING,
      "SALECODE": Sequelize.STRING,
      "SALEDESC": Sequelize.STRING,
      "DEEDBOOK": Sequelize.STRING,
      "DEEDPAGE": Sequelize.STRING,
      "PREVSALEDATE": Sequelize.STRING,
      "PREVSALEPRICE": Sequelize.STRING,
      "PREVSALEDATE2": Sequelize.STRING,
      "PREVSALEPRICE2": Sequelize.STRING,
      "AGENT": Sequelize.STRING,
      "TAXFULLADDRESS1": Sequelize.STRING,
      "TAXFULLADDRESS2": Sequelize.STRING,
      "TAXFULLADDRESS3": Sequelize.STRING,
      "TAXFULLADDRESS4": Sequelize.STRING,
      "CHANGENOTICEADDRESS1": Sequelize.STRING,
      "CHANGENOTICEADDRESS2": Sequelize.STRING,
      "CHANGENOTICEADDRESS3": Sequelize.STRING,
      "CHANGENOTICEADDRESS4": Sequelize.STRING,
      "CHANGENOTICETYPE": Sequelize.STRING,
      "CHANGENOTICENUMBER": Sequelize.STRING,
      "CHANGENOTICEFRACTION": Sequelize.STRING,
      "CHANGENOTICEDIRECTION": Sequelize.STRING,
      "CHANGENOTICESTREET": Sequelize.STRING,
      "CHANGENOTICESUFFIX": Sequelize.STRING,
      "CHANGENOTICESUFFIX2": Sequelize.STRING,
      "CHANGENOTICECITY": Sequelize.STRING,
      "CHANGENOTICESTATE": Sequelize.STRING,
      "CHANGENOTICECOUNTRY": Sequelize.STRING,
      "CHANGENOTICEPOSTALCODE": Sequelize.STRING,
      "CHANGENOTICEUNITDESC": Sequelize.STRING,
      "CHANGENOTICEUNITNUMBER": Sequelize.STRING,
      "CHANGENOTICEADDR1": Sequelize.STRING,
      "CHANGENOTICEADDR2": Sequelize.STRING,
      "CHANGENOTICEADDR3": Sequelize.STRING,
      "CHANGENOTICEZIP5": Sequelize.STRING,
      "CHANGENOTICEZIP4": Sequelize.STRING,
      "COUNTYBUILDING": Sequelize.STRING,
      "COUNTYLAND": Sequelize.STRING,
      "COUNTYTOTAL": Sequelize.STRING,
      "COUNTYEXEMPTBLDG": Sequelize.STRING,
      "LOCALBUILDING": Sequelize.STRING,
      "LOCALLAND": Sequelize.STRING,
      "LOCALTOTAL": Sequelize.STRING,
      "FAIRMARKETBUILDING": Sequelize.STRING,
      "FAIRMARKETLAND": Sequelize.STRING,
      "FAIRMARKETTOTAL": Sequelize.STRING,
      "STYLE": Sequelize.STRING,
      "STYLEDESC": Sequelize.STRING,
      "STORIES": Sequelize.STRING,
      "YEARBLT": Sequelize.STRING,
      "EXTERIORFINISH": Sequelize.STRING,
      "EXTFINISH_DESC": Sequelize.STRING,
      "ROOF": Sequelize.STRING,
      "ROOFDESC": Sequelize.STRING,
      "BASEMENT": Sequelize.STRING,
      "BASEMENTDESC": Sequelize.STRING,
      "GRADE": Sequelize.STRING,
      "GRADEDESC": Sequelize.STRING,
      "CONDITION": Sequelize.STRING,
      "CONDITIONDESC": Sequelize.STRING,
      "CDU": Sequelize.STRING,
      "CDUDESC": Sequelize.STRING,
      "TOTALROOMS": Sequelize.STRING,
      "BEDROOMS": Sequelize.STRING,
      "FULLBATHS": Sequelize.STRING,
      "HALFBATHS": Sequelize.STRING,
      "HEATINGCOOLING": Sequelize.STRING,
      "HEATINGCOOLINGDESC": Sequelize.STRING,
      "FIREPLACES": Sequelize.STRING,
      "BSMTGARAGE": Sequelize.STRING,
      "FINISHEDLIVINGAREA": Sequelize.STRING,
      "CARDNUMBER": Sequelize.STRING,
      "ALT_ID": Sequelize.STRING,
      "TAXYEAR": Sequelize.STRING,
      "ASOFDATE": Sequelize.STRING,
      'address': Sequelize.STRING,
      'searchableAddressV1': Sequelize.STRING,
      'owner': Sequelize.STRING,
      'ownerAddress': Sequelize.STRING,
      'searchableOwnerAddressV1': Sequelize.STRING,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Properties');
  }
};