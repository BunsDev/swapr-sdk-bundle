"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurveTrade = void 0;
const tslib_1 = require("tslib");
const bignumber_1 = require("@ethersproject/bignumber");
const units_1 = require("@ethersproject/units");
const contracts_1 = require("@ethersproject/contracts");
const decimal_js_light_1 = tslib_1.__importDefault(require("decimal.js-light"));
const tiny_invariant_1 = tslib_1.__importDefault(require("tiny-invariant"));
const routable_platform_1 = require("../routable-platform/routable-platform");
const constants_1 = require("../../../constants");
const currencyAmount_1 = require("../../fractions/currencyAmount");
const tokenAmount_1 = require("../../fractions/tokenAmount");
const fraction_1 = require("../../fractions/fraction");
const token_1 = require("../../token");
const percent_1 = require("../../fractions/percent");
const price_1 = require("../../fractions/price");
const trade_1 = require("../interfaces/trade");
const currency_1 = require("../../currency");
const utils_1 = require("../../../utils");
// Curve imports
const contracts_2 = require("./contracts");
const utils_2 = require("./utils");
const constants_2 = require("./constants");
const utils_3 = require("../utils");
/**
 * Represents a trade executed against a list of pairs.
 * Does not account for slippage, i.e. trades that front run this trade and move the price.
 */
class CurveTrade extends trade_1.Trade {
    /**
     *
     * @param {Object} obj Curve trade options.
     * @param {CurrencyAmount} obj.inputAmount - Input token
     * @param {CurrencyAmount} obj.outputAmount - Output token
     * @param {Percent} obj.maximumSlippage - Maximum slippage indicated by the user
     * @param {TradeType} obj.tradeType - Trade type
     * @param {string} obj.transactionRequest - Address to to which transaction is send
     * @param {Percent} obj.fee - Trade fee
     * @param {string} obj.approveAddress - Approve address, defaults to `to`
     */
    constructor({ inputAmount, outputAmount, maximumSlippage, tradeType, chainId, transactionRequest, approveAddress, fee, }) {
        (0, tiny_invariant_1.default)(!(0, token_1.currencyEquals)(inputAmount.currency, outputAmount.currency), 'SAME_TOKEN');
        super({
            details: undefined,
            type: tradeType,
            inputAmount,
            outputAmount,
            executionPrice: new price_1.Price({
                baseCurrency: inputAmount.currency,
                quoteCurrency: outputAmount.currency,
                denominator: inputAmount.raw,
                numerator: outputAmount.raw,
            }),
            maximumSlippage,
            priceImpact: new percent_1.Percent('0', '100'),
            chainId,
            platform: routable_platform_1.RoutablePlatform.CURVE,
            fee,
        });
        this.transactionRequest = transactionRequest;
        this.approveAddress = approveAddress || transactionRequest.to;
    }
    minimumAmountOut() {
        if (this.tradeType === constants_1.TradeType.EXACT_OUTPUT) {
            return this.outputAmount;
        }
        else {
            const slippageAdjustedAmountOut = new fraction_1.Fraction(constants_1.ONE)
                .add(this.maximumSlippage)
                .invert()
                .multiply(this.outputAmount.raw).quotient;
            return this.outputAmount instanceof tokenAmount_1.TokenAmount
                ? new tokenAmount_1.TokenAmount(this.outputAmount.token, slippageAdjustedAmountOut)
                : currencyAmount_1.CurrencyAmount.nativeCurrency(slippageAdjustedAmountOut, this.chainId);
        }
    }
    maximumAmountIn() {
        if (this.tradeType === constants_1.TradeType.EXACT_INPUT) {
            return this.inputAmount;
        }
        else {
            const slippageAdjustedAmountIn = new fraction_1.Fraction(constants_1.ONE)
                .add(this.maximumSlippage)
                .multiply(this.inputAmount.raw).quotient;
            return this.inputAmount instanceof tokenAmount_1.TokenAmount
                ? new tokenAmount_1.TokenAmount(this.inputAmount.token, slippageAdjustedAmountIn)
                : currencyAmount_1.CurrencyAmount.nativeCurrency(slippageAdjustedAmountIn, this.chainId);
        }
    }
    /**
     * Checks if two tokens can be routed between on Curve Finance pools.
     * This method returns accurate results only on Ethereum since the Curve Router is available there.
     * @param {string} tokenIn
     * @param {string} tokenOut
     * @returns a `boolean` whether the tokens can be exchanged on Curve Finance pools
     */
    static canRoute(tokenIn, tokenOut) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return (0, contracts_2.getRouter)().can_route(tokenIn.address, tokenOut.address);
        });
    }
    /**
     * Given an a sell token and a buy token, and amount of sell token, returns a
     * quote from Curve's pools with best pool, and unsigned transactions data
     * @param {object} obj options
     * @param {CurrencyAmount} obj.currencyAmountIn the amount of curreny in - sell token
     * @param {Currency} obj.currencyOut the currency in - buy token
     * @param {Percent} obj.maximumSlippage Maximum slippage
     * @param {Provider} provider an optional provider, the router defaults public providers
     * @returns the best trade if found
     */
    static getQuote({ currencyAmountIn, currencyOut, maximumSlippage }, provider) {
        var _a, _b, _c, _d, _e;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Try to extract the chain ID from the tokens
            const chainId = (0, utils_3.tryGetChainId)(currencyAmountIn, currencyOut);
            // Require the chain ID
            (0, tiny_invariant_1.default)(chainId !== undefined && routable_platform_1.RoutablePlatform.CURVE.supportsChain(chainId), 'CHAIN_ID');
            // const wrappedTokenIn = wrappedCurrency(currencyAmountIn.currency, chainId)
            const wrappedtokenOut = (0, utils_3.wrappedCurrency)(currencyOut, chainId);
            // Get the token's data from Curve
            const tokenIn = (0, utils_2.getCurveToken)((_a = currencyAmountIn.currency) === null || _a === void 0 ? void 0 : _a.address, chainId);
            const tokenOut = (0, utils_2.getCurveToken)(currencyOut.address, chainId);
            // Validations
            (0, tiny_invariant_1.default)(tokenIn != undefined, 'NO_TOKEN_IN');
            (0, tiny_invariant_1.default)(tokenOut != undefined, 'NO_TOKEN_OUT');
            (0, tiny_invariant_1.default)(tokenIn.address.toLowerCase() != tokenOut.address.toLowerCase(), 'SAME_TOKEN');
            // const etherOut = this.outputAmount.currency === nativeCurrency
            // // the router does not support both ether in and out
            // invariant(!(etherIn && etherOut), 'ETHER_IN_OUT')
            provider = provider || (0, contracts_2.getProvider)(chainId);
            let value = '0x0'; // With Curve, most value exchanged is ERC20
            // Get the Router contract to populate the unsigned transaction
            // Get all Curve pools for the chain
            const curvePools = constants_2.CURVE_POOLS[chainId];
            const nativeCurrency = currency_1.Currency.getNative(chainId);
            // Determine if the currency sent is ETH
            // First using address
            // then, using symbol
            const etherIn = tokenIn.address.toLowerCase() == ((_b = nativeCurrency.address) === null || _b === void 0 ? void 0 : _b.toLowerCase())
                ? true
                : ((_c = currencyAmountIn.currency.name) === null || _c === void 0 ? void 0 : _c.toLowerCase()) === ((_d = nativeCurrency.name) === null || _d === void 0 ? void 0 : _d.toLowerCase())
                    ? true
                    : currencyAmountIn.currency === nativeCurrency;
            // Baisc trade information
            const amountInBN = (0, units_1.parseUnits)(currencyAmountIn.toSignificant(), tokenIn.decimals);
            // Determine if user has sent ETH
            if (etherIn) {
                value = amountInBN.toString();
            }
            // Check if the two pairs are of different type
            // When the pair types are different, there is
            // a potential that Curve Smart Router can handle the trade
            const isCryptoSwap = tokenIn.type !== tokenOut.type;
            // Find all pools that the trade can go through
            // Manually find all routable pools
            let routablePools = (0, utils_2.getRoutablePools)(curvePools, tokenIn, tokenOut, chainId);
            // On mainnet, use the exchange info to get the best pool
            const bestPoolAndOutputRes = chainId === constants_1.ChainId.MAINNET
                ? yield (0, contracts_2.getBestCurvePoolAndOutput)({
                    amountIn: amountInBN,
                    tokenInAddress: tokenIn.address,
                    tokenOutAddress: tokenOut.address,
                    chainId,
                })
                : undefined;
            // Majority of Curve pools
            // have 4bps fee of which 50% goes to Curve
            const FEE_DECIMAL = 0.0004;
            let fee = new percent_1.Percent('4', '10000');
            // Exchange fee
            const exchangeRateWithoutFee = 1;
            const exchangeRate = 1 - FEE_DECIMAL;
            // If a pool is found
            // Ignore the manual off-chain search
            if (bestPoolAndOutputRes) {
                routablePools = curvePools.filter((pool) => pool.swapAddress.toLowerCase() === bestPoolAndOutputRes.poolAddress.toLowerCase());
            }
            // Start finding a possible pool
            // First via Curve's internal best pool finder
            // On Mainnet, try to find a route via Curve's Smart Router
            if (isCryptoSwap && chainId === constants_1.ChainId.MAINNET) {
                const exchangeRoutingInfo = yield (0, contracts_2.getExchangeRoutingInfo)({
                    amountIn: amountInBN.toString(),
                    chainId: constants_1.ChainId.MAINNET,
                    tokenInAddress: tokenIn.address,
                    tokenOutAddress: tokenOut.address,
                });
                // If the swap can be handled by the smart router, use it
                if (exchangeRoutingInfo) {
                    const params = [
                        amountInBN.toString(),
                        exchangeRoutingInfo.routes,
                        exchangeRoutingInfo.indices,
                        exchangeRoutingInfo.expectedAmountOut.mul(98).div(100).toString(),
                    ];
                    const curveRouterContract = (0, contracts_2.getRouter)();
                    (0, utils_1.debug)(`Curve::GetQuote | Found a rout via Smart Router at ${curveRouterContract.address}`, params);
                    const populatedTransaction = yield curveRouterContract.populateTransaction.exchange(...params, {
                        value,
                    });
                    // Add 30% gas buffer
                    const gasLimitWithBuffer = (_e = populatedTransaction.gasLimit) === null || _e === void 0 ? void 0 : _e.mul(130).div(100);
                    populatedTransaction.gasLimit = gasLimitWithBuffer;
                    return {
                        fee,
                        estimatedAmountOut: new tokenAmount_1.TokenAmount(currencyOut, exchangeRoutingInfo.expectedAmountOut.toBigInt()),
                        currencyAmountIn,
                        currencyOut,
                        maximumSlippage,
                        populatedTransaction,
                        to: curveRouterContract.address,
                        exchangeRateWithoutFee,
                        exchangeRate,
                    };
                }
            }
            // Continue using pool-by-pool cases
            // Exit since no pools have been found
            if (routablePools.length === 0) {
                console.log('CurveTrade: no pools found for trade pair');
                return;
            }
            // The final step
            // Compile all the output
            // Using Multicall contract
            const estimatedAmountOutPerPool = yield Promise.all(routablePools.map((pool) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const poolContract = new contracts_1.Contract(pool.swapAddress, pool.abi, provider);
                // Map token address to index
                const tokenInIndex = (0, utils_2.getTokenIndex)(pool, tokenIn.address);
                const tokenOutIndex = (0, utils_2.getTokenIndex)(pool, tokenOut.address);
                // Skip pool that return -1
                if (tokenInIndex < 0 || tokenOutIndex < 0) {
                    return bignumber_1.BigNumber.from(0);
                }
                // Get expected output from the pool
                // Use underylying signature if the pool is a meta pool
                // A meta pool is a pool composed of an ERC20 pair with the Curve base 3Pool (DAI+USDC+USDT)
                const dyMethodSignature = pool.isMeta ? 'get_dy_underlying' : 'get_dy';
                // Construct the params
                const dyMethodParams = [tokenInIndex.toString(), tokenOutIndex.toString(), currencyAmountIn.raw.toString()];
                // Debug
                (0, utils_1.debug)('Curve::GetQuote | Fetching estimated output', pool.swapAddress, dyMethodSignature, dyMethodParams);
                try {
                    const dyOutput = (yield poolContract[dyMethodSignature](...dyMethodParams));
                    // Return the call bytes
                    return dyOutput;
                }
                catch (e) {
                    console.log(e);
                    return bignumber_1.BigNumber.from(0);
                }
            })));
            if (estimatedAmountOutPerPool.length === 0) {
                throw new Error('CurveTrade: not pools found');
            }
            // Append back the pool list
            // Using the index
            const poolWithEstimatedAmountOut = estimatedAmountOutPerPool.map((estimatedAmountOut, index) => ({
                estimatedAmountOut,
                pool: routablePools[index],
            }));
            // Sort the pool by best output
            const poolWithEstimatedAmountOutSorted = poolWithEstimatedAmountOut.sort((poolA, poolB) => poolA.estimatedAmountOut.gt(poolB.estimatedAmountOut)
                ? -1
                : poolA.estimatedAmountOut.eq(poolB.estimatedAmountOut)
                    ? 0
                    : 1);
            // Select the best (first) pool
            // among the sorted pools
            const { pool, estimatedAmountOut } = poolWithEstimatedAmountOutSorted[0];
            // Construct the contrac call
            const poolContract = new contracts_1.Contract(pool.swapAddress, pool.abi, provider);
            // Try to fetch the fee from the contract the newest
            // If the call fails, the fee defaults back to 4bps
            try {
                const feeFromContract = (yield poolContract.fee());
                fee = new percent_1.Percent(feeFromContract.toString(), '10000000000');
            }
            catch (e) {
                (0, utils_1.debug)(e);
            }
            // Map token address to index
            const tokenInIndex = (0, utils_2.getTokenIndex)(pool, tokenIn.address);
            const tokenOutIndex = (0, utils_2.getTokenIndex)(pool, tokenOut.address);
            // Construct the unsigned transaction
            // Default method signature and params
            // This is the most optimistic
            let exchangeSignature = 'exchange';
            if (!(exchangeSignature in poolContract.populateTransaction)) {
                // debug(`Signature ${exchangeSignature} not found`)
                // debug(poolContract.functions)
                exchangeSignature = 'exchange(int128,int128,uint256,uint256)';
            }
            // Reduce by 1% to cover fees
            const dyMinimumReceived = estimatedAmountOut.mul(99).div(100);
            const exchangeParams = [
                tokenInIndex.toString(),
                tokenOutIndex.toString(),
                amountInBN.toString(),
                dyMinimumReceived.toString(),
            ];
            // If the pool has meta coins
            if (pool.isMeta) {
                exchangeSignature = 'exchange_underlying(uint256,uint256,uint256,uint256)';
            }
            // Pools that allow trading ETH
            if (pool.allowsTradingETH) {
                exchangeSignature = 'exchange(uint256,uint256,uint256,uint256,bool)';
                // Native currency ETH
                if (etherIn) {
                    exchangeParams.push(true);
                }
            }
            (0, utils_1.debug)(`Curve::GetQuote | Final pool is ${poolContract.address} ${exchangeSignature}`, exchangeParams);
            const populatedTransaction = yield poolContract.populateTransaction[exchangeSignature](...exchangeParams, {
                value,
            });
            return {
                currencyAmountIn,
                populatedTransaction,
                currencyOut,
                estimatedAmountOut: currency_1.Currency.isNative(currencyOut)
                    ? currencyAmount_1.CurrencyAmount.nativeCurrency(estimatedAmountOut.toBigInt(), chainId)
                    : new tokenAmount_1.TokenAmount(wrappedtokenOut, estimatedAmountOut.toBigInt()),
                maximumSlippage,
                fee,
                to: poolContract.address,
                exchangeRateWithoutFee,
                exchangeRate,
            };
        });
    }
    /**
     * Computes and returns the best trade from Curve pools
     * by comparing all the Curve pools on target chain
     * @param {object} obj options
     * @param {CurrencyAmount} obj.currencyAmountIn the amount of curreny in - sell token
     * @param {Currency} obj.currencyOut the currency out - buy token
     * @param {Percent} obj.maximumSlippage Maximum slippage
     * @param {Provider} provider an optional provider, the router defaults public providers
     * @returns the best trade if found
     */
    static bestTradeExactIn({ currencyAmountIn, currencyOut, maximumSlippage }, provider) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Try to extract the chain ID from the tokens
            const chainId = (0, utils_3.tryGetChainId)(currencyAmountIn, currencyOut);
            // Require the chain ID
            (0, tiny_invariant_1.default)(chainId !== undefined && routable_platform_1.RoutablePlatform.CURVE.supportsChain(chainId), 'CHAIN_ID');
            try {
                const quote = yield CurveTrade.getQuote({
                    currencyAmountIn,
                    currencyOut,
                    maximumSlippage,
                }, provider);
                if (quote) {
                    const { currencyAmountIn, estimatedAmountOut, fee, maximumSlippage, populatedTransaction, to } = quote;
                    // Return the CurveTrade
                    return new CurveTrade({
                        fee,
                        maximumSlippage,
                        tradeType: constants_1.TradeType.EXACT_INPUT,
                        chainId,
                        transactionRequest: populatedTransaction,
                        inputAmount: currencyAmountIn,
                        outputAmount: estimatedAmountOut,
                        approveAddress: to,
                    });
                }
            }
            catch (error) {
                console.error('could not fetch Curve trade', error);
            }
            return;
        });
    }
    /**
     * Computes and returns the best trade from Curve pools using output as target.
     * Avoid usig this method. It uses some optimistic math estimate right input.
     * @param {object} obj options
     * @param {CurrencyAmount} obj.currencyAmountOut the amount of curreny in - buy token
     * @param {Currency} obj.currencyIn the currency in - sell token
     * @param {Percent} obj.maximumSlippage Maximum slippage
     * @param {Provider} provider an optional provider, the router defaults public providers
     * @returns the best trade if found
     */
    static bestTradeExactOut({ currencyAmountOut, currencyIn, maximumSlippage }, provider) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Try to extract the chain ID from the tokens
            const chainId = (0, utils_3.tryGetChainId)(currencyAmountOut, currencyIn);
            // Require the chain ID
            (0, tiny_invariant_1.default)(chainId !== undefined && routable_platform_1.RoutablePlatform.CURVE.supportsChain(chainId), 'CHAIN_ID');
            try {
                // Get quote for original amounts in
                const baseQuote = (yield CurveTrade.getQuote({
                    currencyAmountIn: currencyAmountOut,
                    currencyOut: currencyIn,
                    maximumSlippage,
                }, provider));
                const currencyOut = currencyAmountOut.currency;
                const rawInputToOutputExchangeRate = new decimal_js_light_1.default(baseQuote.exchangeRate).pow(-currencyOut.decimals);
                const outputToInputExchangeRate = new decimal_js_light_1.default(rawInputToOutputExchangeRate).pow(-1);
                const amountOut = new decimal_js_light_1.default(currencyAmountOut.toFixed(currencyOut.decimals));
                const estimatedAmountIn = amountOut.times(outputToInputExchangeRate).dividedBy('0.9996');
                const currencyAmountIn = new tokenAmount_1.TokenAmount(currencyIn, (0, units_1.parseUnits)(estimatedAmountIn.toFixed(currencyIn.decimals), currencyIn.decimals).toString());
                const quote = yield CurveTrade.getQuote({
                    currencyAmountIn,
                    currencyOut,
                    maximumSlippage,
                }, provider);
                if (quote) {
                    const { currencyAmountIn, estimatedAmountOut, fee, maximumSlippage, populatedTransaction, to } = quote;
                    // Return the CurveTrade
                    return new CurveTrade({
                        fee,
                        maximumSlippage,
                        tradeType: constants_1.TradeType.EXACT_OUTPUT,
                        chainId,
                        transactionRequest: populatedTransaction,
                        inputAmount: currencyAmountIn,
                        outputAmount: estimatedAmountOut,
                        approveAddress: to,
                    });
                }
            }
            catch (error) {
                console.error('could not fetch Curve trade', error);
            }
            return;
        });
    }
    /**
     * Returns unsigned transaction for the trade
     * @returns the unsigned transaction
     */
    swapTransaction() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return Object.assign(Object.assign({}, this.transactionRequest), { gasLimit: this.transactionRequest.gasLimit ? bignumber_1.BigNumber.from(this.transactionRequest.gasLimit) : undefined, value: this.transactionRequest.value ? this.transactionRequest.value : bignumber_1.BigNumber.from(0) });
        });
    }
}
exports.CurveTrade = CurveTrade;
//# sourceMappingURL=CurveTrade.js.map