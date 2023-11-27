const RfqAcceptedHistoryManager = require("./rfq-accepted-history-manager");
const ProductManager = require("./product-manager");
const LogisticManager = require("./logistic-manager");
const Product = require("../models/product");

class PriceEngine {
  constructor(connection, priceRequested) {
    this.connection = connection;
    this.rfqAcceptedHistoryManager = new RfqAcceptedHistoryManager(connection);
    this.productManager = new ProductManager(connection);
    this.logisticmanager = new LogisticManager(connection);
  }

  async getPriceSuggestion(productId, priceRequested) {
    try {
      let product = await this.productManager.getProduct(productId);

      let avgData =
        await this.logisticmanager.getAverageSupplierPricebyProductId(
          productId
        );
      let buyingPriceSupplier = parseFloat(avgData[0].average_supplier_price);

      let sellingPriceRequested = priceRequested;
      let sellingPriceFromHistorical =
        await this.rfqAcceptedHistoryManager.getAveragePriceByProductId(
          productId
        );
      let sellingPriceCurrent = parseFloat(product.price);

      let marginCurrent = sellingPriceCurrent - buyingPriceSupplier;
      let marginFromHistorical =
        sellingPriceFromHistorical - buyingPriceSupplier;
      let marginRequested = sellingPriceRequested - buyingPriceSupplier;

      let minimumMarginPrecentage = await this.getMinimumMargin(productId);
      let marginMinimum = (buyingPriceSupplier * minimumMarginPrecentage) / 100;

      if (marginRequested < marginCurrent) {
        if (marginRequested < marginFromHistorical) {
          if (marginRequested < marginMinimum) {
            return {
              product: this.product,
              purchase_price: buyingPriceSupplier,
              margin: marginMinimum,
              recommended_price: buyingPriceSupplier + marginMinimum,
              price_requested: parseFloat(sellingPriceRequested),
              price_from_historical: parseFloat(sellingPriceFromHistorical),
            };
          } else {
            return {
              product: this.product,
              purchase_price: buyingPriceSupplier,
              margin: marginRequested,
              recommended_price: buyingPriceSupplier + marginRequested,
              price_requested: parseFloat(sellingPriceRequested),
              price_from_historical: parseFloat(sellingPriceFromHistorical),
            };
          }
        } else {
          return {
            product: this.product,
            purchase_price: buyingPriceSupplier,
            margin: marginRequested,
            recommended_price: buyingPriceSupplier + marginRequested,
            price_requested: parseFloat(sellingPriceRequested),
            price_from_historical: parseFloat(sellingPriceFromHistorical),
          };
        }
      } else {
        return {
          product: this.product,
          purchase_price: buyingPriceSupplier,
          margin: marginCurrent,
          recommended_price: buyingPriceSupplier + marginCurrent,
          price_requested: parseFloat(sellingPriceRequested),
          price_from_historical: parseFloat(sellingPriceFromHistorical),
        };
      }
    } catch (err) {
      console.log(err);
    }
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
