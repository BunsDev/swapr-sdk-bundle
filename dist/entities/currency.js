"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XDAI = exports.ETHER = exports.USD = exports.Currency = void 0;
const tslib_1 = require("tslib");
const jsbi_1 = tslib_1.__importDefault(require("jsbi"));
const constants_1 = require("../constants");
const utils_1 = require("../utils");
/**
 * A currency is any fungible financial instrument on the target chain.
 *
 * The only instances of the base class `Currency` are native currencies such as Ether for Ethereum and xDAI for xDAI.
 */
class Currency {
    /**
     * Constructs an instance of the base class `Currency`. The only instance of the base class `Currency` is `Currency.ETHER`.
     * @param decimals decimals of the currency
     * @param symbol symbol of the currency
     * @param name of the currency
     */
    constructor(decimals, symbol, name, address) {
        (0, utils_1.validateSolidityTypeInstance)(jsbi_1.default.BigInt(decimals), constants_1.SolidityType.uint8);
        this.decimals = decimals;
        this.symbol = symbol;
        this.name = name;
        this.address = address;
    }
    static isNative(currency) {
        return Object.values(Currency.NATIVE_CURRENCY).indexOf(currency) >= 0;
    }
    static getNative(chainId) {
        return Currency.NATIVE_CURRENCY[chainId];
    }
}
exports.Currency = Currency;
// fiat currencies used to represent countervalues
Currency.USD = new Currency(18, 'USD', 'US dollar');
// Native currencies for deployment chains
Currency.ETHER = new Currency(18, 'ETH', 'Ether', '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE');
Currency.XDAI = new Currency(18, 'XDAI', 'xDAI');
Currency.NATIVE_CURRENCY = {
    [constants_1.ChainId.MAINNET]: Currency.ETHER,
    [constants_1.ChainId.RINKEBY]: Currency.ETHER,
    [constants_1.ChainId.ARBITRUM_ONE]: Currency.ETHER,
    [constants_1.ChainId.ARBITRUM_RINKEBY]: Currency.ETHER,
    [constants_1.ChainId.XDAI]: Currency.XDAI
};
exports.USD = Currency.USD;
exports.ETHER = Currency.ETHER;
exports.XDAI = Currency.XDAI;
//# sourceMappingURL=currency.js.map