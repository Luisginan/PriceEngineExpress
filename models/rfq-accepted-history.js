
class RfqAcceptedHistory {
  constructor(id, customerId, productId, priceRequested, priceSuggestion, priceAccepted) {
    this.id = id;
    this.customerId = customerId;
    this.productId = productId;
    this.priceRequested = priceRequested;
    this.priceSuggestion = priceSuggestion;
    this.priceAccepted = priceAccepted;
  }
}

module.exports = RfqAcceptedHistory;
