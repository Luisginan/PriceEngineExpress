const RfqAcceptedHistoryManager = require("./rfq-accepted-history-manager");
const ProductManager = require("./product-manager");
const LogisticManager = require("./logistic-manager");

class PriceEngine {
  constructor(connection) {
    this.rfqAcceptedHistoryManager = new RfqAcceptedHistoryManager(connection);
    this.productManager = new ProductManager(connection);
    this.logisticmanager = new LogisticManager(connection);
  }

  async getPriceSuggestion(productId, priceRequested) {
    try {
      let parameter = await this.getParameter(productId, priceRequested);
      let marginData = this.calculateMargin(parameter);
      return this.calculatedBestPrice(parameter, marginData);
    } catch (err) {
      console.log(err);
    }
  }

  async getParameter(productId, priceRequested) {
    let product = await this.productManager.getProduct(productId);
    let sellingPriceRequested = priceRequested;
    let sellingPriceCurrent = parseFloat(product.price);
    let minimumMarginPercentage = await this.getMinimumMargin(productId);
    let purchasePrice = await this.getPurchasePrice(productId);
    let sellingPriceFromHistorical = await this.rfqAcceptedHistoryManager.getAveragePriceByProductId(productId);
    return {product, sellingPriceRequested, sellingPriceCurrent, minimumMarginPercentage, purchasePrice, sellingPriceFromHistorical}
  }

  calculatedBestPrice(parameter, marginData) {
    if (marginData.marginRequested < marginData.marginCurrent) {
      if (marginData.marginRequested < marginData.marginFromHistorical) {
        if (marginData.marginRequested < marginData.marginMinimum) {
          return {
            product: parameter.product,
            purchase_price: parameter.purchasePrice,
            margin: marginData.marginMinimum,
            recommended_price: parameter.purchasePrice + marginData.marginMinimum,
            price_requested: parseFloat(parameter.sellingPriceRequested),
            price_from_historical: parseFloat(parameter.sellingPriceFromHistorical),
          };
        } else {
          return {
            product: parameter.product,
            purchase_price: parameter.purchasePrice,
            margin: marginData.marginRequested,
            recommended_price: parameter.purchasePrice + marginData.marginRequested,
            price_requested: parseFloat(parameter.sellingPriceRequested),
            price_from_historical: parseFloat(parameter.sellingPriceFromHistorical),
          };
        }
      } else {
        return {
          product: parameter.product,
          purchase_price: parameter.purchasePrice,
          margin: marginData.marginRequested,
          recommended_price: parameter.purchasePrice + marginData.marginRequested,
          price_requested: parseFloat(parameter.sellingPriceRequested),
          price_from_historical: parseFloat(parameter.sellingPriceFromHistorical),
        };
      }
    } else {
      return {
        product: parameter.product,
        purchase_price: parameter.purchasePrice,
        margin: marginData.marginCurrent,
        recommended_price: parameter.purchasePrice + marginData.marginCurrent,
        price_requested: parseFloat(parameter.sellingPriceRequested),
        price_from_historical: parseFloat(parameter.sellingPriceFromHistorical),
      };
    }
  }

  calculateMargin(parameter) {
    let marginCurrent = parameter.sellingPriceCurrent - parameter.purchasePrice;
    let marginFromHistorical = parameter.sellingPriceFromHistorical - parameter.purchasePrice;
    let marginRequested = parameter.sellingPriceRequested - parameter.purchasePrice;
    let marginMinimum = (parameter.purchasePrice * parameter.minimumMarginPercentage) / 100;
    return { marginCurrent, marginFromHistorical, marginRequested, marginMinimum };
  }

  async getPurchasePrice(productId) {
    let avgData =
        await this.logisticmanager.getAverageSupplierPricebyProductId(
            productId
        );

    return parseFloat(avgData[0].average_supplier_price);
  }

  async getMinimumMargin(productId) {
    let result = 0;
    try {
      const product = await this.productManager.getProduct(productId);
      this.product = product;
      result = product.minimum_margin;
    } catch (err) {
      console.log(err);
    }
    return result;
  }
}

module.exports = PriceEngine;
