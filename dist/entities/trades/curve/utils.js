"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoutablePools = exports.getCurveToken = exports.getTokenIndex = void 0;
const constants_1 = require("./constants");
const constants_2 = require("../../../constants");
/**
 * Returns the token index of a token in a Curve pool
 * @param pool the Curve pool
 * @param tokenAddress the token address
 */
function getTokenIndex(pool, tokenAddress, chainId = constants_2.ChainId.MAINNET) {
    // Use main tokens
    let tokenList = pool.tokens;
    // Combine tokens + meta tokens
    if (pool.isMeta && pool.metaTokens) {
        // Combine all tokens without 3CRV
        const tokenWithout3CRV = pool.tokens.filter(token => token.symbol.toLowerCase() !== '3crv');
        tokenList = [...tokenWithout3CRV, ...pool.metaTokens];
    }
    if (pool.allowsTradingETH === true &&
        chainId === constants_2.ChainId.MAINNET &&
        tokenAddress.toLowerCase() === constants_1.TOKENS_MAINNET.eth.address.toLowerCase()) {
        tokenAddress = constants_1.TOKENS_MAINNET.weth.address;
    }
    return tokenList.findIndex(({ address }) => address.toLowerCase() == tokenAddress.toLowerCase());
}
exports.getTokenIndex = getTokenIndex;
function getCurveToken(tokenAddress, chainId = constants_2.ChainId.MAINNET) {
    const tokenList = constants_1.CURVE_TOKENS[chainId];
    return Object.values(tokenList).find(token => token.address.toLowerCase() === (tokenAddress === null || tokenAddress === void 0 ? void 0 : tokenAddress.toLowerCase()));
}
exports.getCurveToken = getCurveToken;
/**
 *
 * @param pools The list of Curve pools
 * @param tokenInAddress Token in address
 * @param tokenOutAddress Token out address
 * @returns List of potential pools at which the trade can be done
 */
function getRoutablePools(pools, tokenIn, tokenOut, chainId) {
    return pools.filter(({ tokens, metaTokens, underlyingTokens, allowsTradingETH }) => {
        let tokenInAddress = tokenIn.address;
        let tokenOutAddress = tokenOut.address;
        // For mainnet, account for ETH/WETH
        if (chainId === constants_2.ChainId.MAINNET) {
            const isTokenInEther = tokenIn.address.toLowerCase() === constants_1.TOKENS_MAINNET.eth.address.toLowerCase();
            const isTokenOutEther = tokenOut.address.toLowerCase() === constants_1.TOKENS_MAINNET.eth.address.toLowerCase();
            tokenInAddress = allowsTradingETH === true && isTokenInEther ? constants_1.TOKENS_MAINNET.weth.address : tokenIn.address;
            tokenOutAddress = allowsTradingETH === true && isTokenOutEther ? constants_1.TOKENS_MAINNET.weth.address : tokenOut.address;
        }
        // main tokens
        const hasTokenIn = tokens.some(token => token.address.toLowerCase() === tokenInAddress.toLowerCase());
        const hasTokenOut = tokens.some(token => token.address.toLowerCase() === tokenOutAddress.toLowerCase());
        // Meta tokens in MetaPools [ERC20, [...3PoolTokens]]
        const hasMetaTokenIn = metaTokens === null || metaTokens === void 0 ? void 0 : metaTokens.some(token => token.address.toLowerCase() === tokenInAddress.toLowerCase());
        const hasMetaTokenOut = metaTokens === null || metaTokens === void 0 ? void 0 : metaTokens.some(token => token.address.toLowerCase() === tokenOutAddress.toLowerCase());
        // Underlying tokens, similar to meta tokens
        const hasUnderlyingTokenIn = underlyingTokens === null || underlyingTokens === void 0 ? void 0 : underlyingTokens.some(token => token.address.toLowerCase() === tokenInAddress.toLowerCase());
        const hasUnderlyingTokenOut = underlyingTokens === null || underlyingTokens === void 0 ? void 0 : underlyingTokens.some(token => token.address.toLowerCase() === tokenOutAddress.toLowerCase());
        return ((hasTokenIn || hasUnderlyingTokenIn || hasMetaTokenIn) &&
            (hasTokenOut || hasUnderlyingTokenOut || hasMetaTokenOut));
    });
}
exports.getRoutablePools = getRoutablePools;
//# sourceMappingURL=utils.js.map