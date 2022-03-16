"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricedTokenAmount = void 0;
const currencyAmount_1 = require("./currencyAmount");
const tokenAmount_1 = require("./tokenAmount");
const ethers_1 = require("ethers");
class PricedTokenAmount extends tokenAmount_1.TokenAmount {
    // amount _must_ be raw, i.e. in the native representation
    constructor(token, amount) {
        super(token, amount);
        this.token = token;
    }
    get nativeCurrencyAmount() {
        return new currencyAmount_1.CurrencyAmount(this.token.price.quoteCurrency, ethers_1.utils
            .parseUnits(this.multiply(this.token.price).toFixed(this.token.price.quoteCurrency.decimals), this.token.price.quoteCurrency.decimals)
            .toString());
    }
}
exports.PricedTokenAmount = PricedTokenAmount;
//# sourceMappingURL=priced-token-amount.js.map