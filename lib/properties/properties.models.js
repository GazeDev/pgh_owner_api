'use strict';
const {
  Model
} = require('sequelize');
const Joi = require('joi');

module.exports = {
  db: (sequelize, DataTypes) => {
    class Property extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        // define association here
      }
    };
    Property.init({
      "PARID": {
        type: DataTypes.STRING,
        primaryKey: true
      },
      "PROPERTYOWNER": DataTypes.STRING,
      "PROPERTYHOUSENUM": DataTypes.STRING,
      "PROPERTYFRACTION": DataTypes.STRING,
      "PROPERTYADDRESS": DataTypes.STRING,
      "PROPERTYCITY": DataTypes.STRING,
      "PROPERTYSTATE": DataTypes.STRING,
      "PROPERTYUNIT": DataTypes.STRING,
      "PROPERTYZIP": DataTypes.STRING,
      "MUNICODE": DataTypes.STRING,
      "MUNIDESC": DataTypes.STRING,
      "SCHOOLCODE": DataTypes.STRING,
      "SCHOOLDESC": DataTypes.STRING,
      "LEGAL1": DataTypes.STRING,
      "LEGAL2": DataTypes.STRING,
      "LEGAL3": DataTypes.STRING,
      "NEIGHCODE": DataTypes.STRING,
      "NEIGHDESC": DataTypes.STRING,
      "TAXCODE": DataTypes.STRING,
      "TAXDESC": DataTypes.STRING,
      "TAXSUBCODE": DataTypes.STRING,
      "TAXSUBCODE_DESC": DataTypes.STRING,
      "OWNERCODE": DataTypes.STRING,
      "OWNERDESC": DataTypes.STRING,
      "CLASS": DataTypes.STRING,
      "CLASSDESC": DataTypes.STRING,
      "USECODE": DataTypes.STRING,
      "USEDESC": DataTypes.STRING,
      "LOTAREA": DataTypes.STRING,
      "HOMESTEADFLAG": DataTypes.STRING,
      "FARMSTEADFLAG": DataTypes.STRING,
      "CLEANGREEN": DataTypes.STRING,
      "ABATEMENTFLAG": DataTypes.STRING,
      "RECORDDATE": DataTypes.STRING,
      "SALEDATE": DataTypes.STRING,
      "SALEPRICE": DataTypes.STRING,
      "SALECODE": DataTypes.STRING,
      "SALEDESC": DataTypes.STRING,
      "DEEDBOOK": DataTypes.STRING,
      "DEEDPAGE": DataTypes.STRING,
      "PREVSALEDATE": DataTypes.STRING,
      "PREVSALEPRICE": DataTypes.STRING,
      "PREVSALEDATE2": DataTypes.STRING,
      "PREVSALEPRICE2": DataTypes.STRING,
      "AGENT": DataTypes.STRING,
      "TAXFULLADDRESS1": DataTypes.STRING,
      "TAXFULLADDRESS2": DataTypes.STRING,
      "TAXFULLADDRESS3": DataTypes.STRING,
      "TAXFULLADDRESS4": DataTypes.STRING,
      "CHANGENOTICEADDRESS1": DataTypes.STRING,
      "CHANGENOTICEADDRESS2": DataTypes.STRING,
      "CHANGENOTICEADDRESS3": DataTypes.STRING,
      "CHANGENOTICEADDRESS4": DataTypes.STRING,
      "CHANGENOTICETYPE": DataTypes.STRING,
      "CHANGENOTICENUMBER": DataTypes.STRING,
      "CHANGENOTICEFRACTION": DataTypes.STRING,
      "CHANGENOTICEDIRECTION": DataTypes.STRING,
      "CHANGENOTICESTREET": DataTypes.STRING,
      "CHANGENOTICESUFFIX": DataTypes.STRING,
      "CHANGENOTICESUFFIX2": DataTypes.STRING,
      "CHANGENOTICECITY": DataTypes.STRING,
      "CHANGENOTICESTATE": DataTypes.STRING,
      "CHANGENOTICECOUNTRY": DataTypes.STRING,
      "CHANGENOTICEPOSTALCODE": DataTypes.STRING,
      "CHANGENOTICEUNITDESC": DataTypes.STRING,
      "CHANGENOTICEUNITNUMBER": DataTypes.STRING,
      "CHANGENOTICEADDR1": DataTypes.STRING,
      "CHANGENOTICEADDR2": DataTypes.STRING,
      "CHANGENOTICEADDR3": DataTypes.STRING,
      "CHANGENOTICEZIP5": DataTypes.STRING,
      "CHANGENOTICEZIP4": DataTypes.STRING,
      "COUNTYBUILDING": DataTypes.STRING,
      "COUNTYLAND": DataTypes.STRING,
      "COUNTYTOTAL": DataTypes.STRING,
      "COUNTYEXEMPTBLDG": DataTypes.STRING,
      "LOCALBUILDING": DataTypes.STRING,
      "LOCALLAND": DataTypes.STRING,
      "LOCALTOTAL": DataTypes.STRING,
      "FAIRMARKETBUILDING": DataTypes.STRING,
      "FAIRMARKETLAND": DataTypes.STRING,
      "FAIRMARKETTOTAL": DataTypes.STRING,
      "STYLE": DataTypes.STRING,
      "STYLEDESC": DataTypes.STRING,
      "STORIES": DataTypes.STRING,
      "YEARBLT": DataTypes.STRING,
      "EXTERIORFINISH": DataTypes.STRING,
      "EXTFINISH_DESC": DataTypes.STRING,
      "ROOF": DataTypes.STRING,
      "ROOFDESC": DataTypes.STRING,
      "BASEMENT": DataTypes.STRING,
      "BASEMENTDESC": DataTypes.STRING,
      "GRADE": DataTypes.STRING,
      "GRADEDESC": DataTypes.STRING,
      "CONDITION": DataTypes.STRING,
      "CONDITIONDESC": DataTypes.STRING,
      "CDU": DataTypes.STRING,
      "CDUDESC": DataTypes.STRING,
      "TOTALROOMS": DataTypes.STRING,
      "BEDROOMS": DataTypes.STRING,
      "FULLBATHS": DataTypes.STRING,
      "HALFBATHS": DataTypes.STRING,
      "HEATINGCOOLING": DataTypes.STRING,
      "HEATINGCOOLINGDESC": DataTypes.STRING,
      "FIREPLACES": DataTypes.STRING,
      "BSMTGARAGE": DataTypes.STRING,
      "FINISHEDLIVINGAREA": DataTypes.STRING,
      "CARDNUMBER": DataTypes.STRING,
      "ALT_ID": DataTypes.STRING,
      "TAXYEAR": DataTypes.STRING,
      "ASOFDATE": DataTypes.STRING,
      'address': DataTypes.STRING,
      'searchableAddressV1': DataTypes.STRING,
      'owner': DataTypes.STRING,
      'ownerAddress': DataTypes.STRING,
      'searchableOwnerAddressV1': DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'Property',
      timestamps: false,
    });
    return Property;
  },
  apiFilterQuery: Joi.object().keys({
    parcelId: [
      Joi.array().items(Joi.string()),
      Joi.string()
    ],
    address: [
      Joi.array().items(Joi.string()),
      Joi.string()
    ],
    owner: [
      Joi.array().items(Joi.string()),
      Joi.string()
    ],
    ownerAddress: [
      Joi.array().items(Joi.string()),
      Joi.string()
    ],
  }),
};
