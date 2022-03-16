import type { UnsignedTransaction } from '@ethersproject/transactions';
import { Provider } from '@ethersproject/providers';
import { CurrencyAmount } from '../../fractions/currencyAmount';
import { Token } from '../../token';
import { Trade } from '../interfaces/trade';
import { CurveTradeConstructorParams, CurveTradeGetQuoteParams, CurveTradeQuote, CurveTradeBestTradeExactOutParams, CurveTradeBestTradeExactInParams } from './types';
/**
 * Represents a trade executed against a list of pairs.
 * Does not account for slippage, i.e. trades that front run this trade and move the price.
 */
export declare class CurveTrade extends Trade {
    /**
     * An address the EOA must approve to spend its tokenIn
     */
    readonly approveAddress: string;
    /**
     * The Unsigned transaction
     */
    readonly transactionRequest: UnsignedTransaction;
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
    constructor({ inputAmount, outputAmount, maximumSlippage, tradeType, chainId, transactionRequest, approveAddress, fee, }: CurveTradeConstructorParams);
    minimumAmountOut(): CurrencyAmount;
    maximumAmountIn(): CurrencyAmount;
    /**
     * Checks if two tokens can be routed between on Curve Finance pools.
     * This method returns accurate results only on Ethereum since the Curve Router is available there.
     * @param {string} tokenIn
     * @param {string} tokenOut
     * @returns a `boolean` whether the tokens can be exchanged on Curve Finance pools
     */
    static canRoute(tokenIn: Token, tokenOut: Token): Promise<boolean>;
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
    static getQuote({ currencyAmountIn, currencyOut, maximumSlippage }: CurveTradeGetQuoteParams, provider?: Provider): Promise<CurveTradeQuote | undefined>;
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
    static bestTradeExactIn({ currencyAmountIn, currencyOut, maximumSlippage }: CurveTradeBestTradeExactInParams, provider?: Provider): Promise<CurveTrade | undefined>;
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
    static bestTradeExactOut({ currencyAmountOut, currencyIn, maximumSlippage }: CurveTradeBestTradeExactOutParams, provider?: Provider): Promise<CurveTrade | undefined>;
    /**
     * Returns unsigned transaction for the trade
     * @returns the unsigned transaction
     */
    swapTransaction(): Promise<UnsignedTransaction>;
}