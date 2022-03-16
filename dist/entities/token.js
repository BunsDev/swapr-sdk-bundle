"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SWPR = exports.WXDAI = exports.DXD = exports.WETH = exports.currencyEquals = exports.Token = void 0;
const tslib_1 = require("tslib");
const tiny_invariant_1 = tslib_1.__importDefault(require("tiny-invariant"));
const constants_1 = require("../constants");
const utils_1 = require("../utils");
const currency_1 = require("./currency");
/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
class Token extends currency_1.Currency {
    constructor(chainId, address, decimals, symbol, name) {
        super(decimals, symbol, name);
        this.chainId = chainId;
        this.address = (0, utils_1.validateAndParseAddress)(address);
    }
    /**
     * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
     * @param other other token to compare
     */
    equals(other) {
        // short circuit on reference equality
        if (this === other) {
            return true;
        }
        return this.chainId === other.chainId && this.address === other.address;
    }
    /**
     * Returns true if the address of this token sorts before the address of the other token
     * @param other other token to compare
     * @throws if the tokens have the same address
     * @throws if the tokens are on different chains
     */
    sortsBefore(other) {
        (0, tiny_invariant_1.default)(this.chainId === other.chainId, 'CHAIN_IDS');
        (0, tiny_invariant_1.default)(this.address !== other.address, 'ADDRESSES');
        return this.address.toLowerCase() < other.address.toLowerCase();
    }
    static getNativeWrapper(chainId) {
        return Token.NATIVE_CURRENCY_WRAPPER[chainId];
    }
    static isNativeWrapper(token) {
        return Token.NATIVE_CURRENCY_WRAPPER[token.chainId].equals(token);
    }
}
exports.Token = Token;
Token.WETH = {
    [constants_1.ChainId.MAINNET]: new Token(constants_1.ChainId.MAINNET, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18, 'WETH', 'Wrapped Ether'),
    [constants_1.ChainId.RINKEBY]: new Token(constants_1.ChainId.RINKEBY, '0xc778417E063141139Fce010982780140Aa0cD5Ab', 18, 'WETH', 'Wrapped Ether'),
    [constants_1.ChainId.ARBITRUM_ONE]: new Token(constants_1.ChainId.ARBITRUM_ONE, '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', 18, 'WETH', 'Wrapped Ether'),
    [constants_1.ChainId.ARBITRUM_RINKEBY]: new Token(constants_1.ChainId.ARBITRUM_RINKEBY, '0xB47e6A5f8b33b3F17603C83a0535A9dcD7E32681', 18, 'WETH', 'Wrapped Ether'),
    [constants_1.ChainId.XDAI]: new Token(constants_1.ChainId.XDAI, '0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1', 18, 'WETH', 'Wrapped Ether on xDai')
};
Token.WXDAI = {
    [constants_1.ChainId.XDAI]: new Token(constants_1.ChainId.XDAI, '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d', 18, 'WXDAI', 'Wrapped xDAI')
};
Token.DXD = {
    [constants_1.ChainId.MAINNET]: new Token(constants_1.ChainId.MAINNET, '0xa1d65E8fB6e87b60FECCBc582F7f97804B725521', 18, 'DXD', 'DXdao'),
    [constants_1.ChainId.RINKEBY]: new Token(constants_1.ChainId.RINKEBY, '0x554898A0BF98aB0C03ff86C7DccBE29269cc4d29', 18, 'DXD', 'DXdao'),
    [constants_1.ChainId.XDAI]: new Token(constants_1.ChainId.XDAI, '0xb90D6bec20993Be5d72A5ab353343f7a0281f158', 18, 'DXD', 'DXdao from Ethereum'),
    [constants_1.ChainId.ARBITRUM_ONE]: new Token(constants_1.ChainId.ARBITRUM_ONE, '0xC3Ae0333F0F34aa734D5493276223d95B8F9Cb37', 18, 'DXD', 'DXdao from Ethereum'),
    [constants_1.ChainId.ARBITRUM_RINKEBY]: new Token(constants_1.ChainId.ARBITRUM_RINKEBY, '0x5d47100B0854525685907D5D773b92c22c0c745e', 18, 'DXD', 'DXdao from Ethereum')
};
Token.SWPR = {
    [constants_1.ChainId.MAINNET]: new Token(constants_1.ChainId.MAINNET, '0x6cAcDB97e3fC8136805a9E7c342d866ab77D0957', 18, 'SWPR', 'Swapr'),
    [constants_1.ChainId.RINKEBY]: new Token(constants_1.ChainId.RINKEBY, '0xDcb0BeB93139c3e5eD0Edb749baccADd6badAc4f', 18, 'SWPR', 'Swapr'),
    [constants_1.ChainId.XDAI]: new Token(constants_1.ChainId.XDAI, '0x532801ED6f82FFfD2DAB70A19fC2d7B2772C4f4b', 18, 'SWPR', 'Swapr'),
    [constants_1.ChainId.ARBITRUM_RINKEBY]: new Token(constants_1.ChainId.ARBITRUM_RINKEBY, '0x8f2072c2142D9fFDc785955E0Ce71561753D44Fb', 18, 'SWPR', 'Swapr'),
    [constants_1.ChainId.ARBITRUM_ONE]: new Token(constants_1.ChainId.ARBITRUM_ONE, '0xdE903E2712288A1dA82942DDdF2c20529565aC30', 18, 'SWPR', 'Swapr')
};
Token.NATIVE_CURRENCY_WRAPPER = {
    [constants_1.ChainId.MAINNET]: Token.WETH[constants_1.ChainId.MAINNET],
    [constants_1.ChainId.RINKEBY]: Token.WETH[constants_1.ChainId.RINKEBY],
    [constants_1.ChainId.ARBITRUM_ONE]: Token.WETH[constants_1.ChainId.ARBITRUM_ONE],
    [constants_1.ChainId.ARBITRUM_RINKEBY]: Token.WETH[constants_1.ChainId.ARBITRUM_RINKEBY],
    [constants_1.ChainId.XDAI]: Token.WXDAI[constants_1.ChainId.XDAI]
};
/**
 * Compares two currencies for equality
 */
function currencyEquals(currencyA, currencyB) {
    if (currencyA instanceof Token && currencyB instanceof Token) {
        return currencyA.equals(currencyB);
    }
    else if (currencyA instanceof Token) {
        return false;
    }
    else if (currencyB instanceof Token) {
        return false;
    }
    else {
        return currencyA === currencyB;
    }
}
exports.currencyEquals = currencyEquals;
// reexport for convenience
exports.WETH = Token.WETH;
exports.DXD = Token.DXD;
exports.WXDAI = Token.WXDAI;
exports.SWPR = Token.SWPR;
//# sourceMappingURL=token.js.map