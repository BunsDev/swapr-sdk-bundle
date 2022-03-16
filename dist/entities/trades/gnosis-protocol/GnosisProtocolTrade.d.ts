import { Api as GnosisProtcolApi } from '@gnosis.pm/gp-v2-contracts/lib/commonjs/api';
import { Order } from '@gnosis.pm/gp-v2-contracts/lib/commonjs/order';
import { SigningScheme } from '@gnosis.pm/gp-v2-contracts/lib/commonjs/sign';
import { Signer } from '@ethersproject/abstract-signer';
import { CurrencyAmount } from '../../fractions/currencyAmount';
import { ChainId } from '../../../constants';
import { Trade } from '../interfaces/trade';
import { GnosisProtocolTradeBestTradeExactInParams, GnosisProtocolTradeBestTradeExactOutParams, GnosisProtocolTradeConstructorParams, GnosisProtocolTradeSwapOrderParams, GnosisProtocolTradeOrderMetadata } from './types';
export declare class GnosisProtocolTrade extends Trade {
    /**
     * CowFi order details. The payload is signed and sent to CowFi API
     */
    order: Order;
    /**
     * An address the EOA must approve to spend its tokenIn
     */
    readonly approveAddress: string;
    /**
     * Order signature
     */
    private orderSignatureInfo?;
    /**
     * The Order Id. Obtained and set from after submitting the order from API
     */
    orderId?: string;
    constructor({ chainId, inputAmount, maximumSlippage, outputAmount, tradeType, order, fee, }: GnosisProtocolTradeConstructorParams);
    minimumAmountOut(): CurrencyAmount;
    maximumAmountIn(): CurrencyAmount;
    /**
     * Returns the Gnosis Protocol API, with access to low level methods.
     * @param quote Quote query params
     * @param chainId The chainId, defaults to Mainnet (1)
     * @returns
     */
    static getApi(chainId?: ChainId): GnosisProtcolApi;
    /**
     * Fetches the order metadata from the API
     * @param orderId The order ID
     * @param chainId The chainId, defaults to Mainnet (1)
     */
    static getOrderMetadata(orderId: string, chainId?: ChainId): Promise<GnosisProtocolTradeOrderMetadata>;
    /**
     * Computes and returns the best trade from Gnosis Protocol API
     * @param {object} obj options
     * @param {CurrencyAmount} obj.currencyAmountIn the amount of curreny in - sell token
     * @param {Currency} obj.currencyOut the currency out - buy token
     * @param {Percent} obj.maximumSlippage Maximum slippage
     * @param {Percent} obj.receiver The receiver
     * @param {Provider} provider an optional provider, the router defaults public providers
     * @returns the best trade if found
     */
    static bestTradeExactIn({ currencyAmountIn, currencyOut, maximumSlippage, receiver, }: GnosisProtocolTradeBestTradeExactInParams): Promise<GnosisProtocolTrade | undefined>;
    /**
     * Computes and returns the best trade from Gnosis Protocol API
     * @param {object} obj options
     * @param {CurrencyAmount} obj.currencyAmountIn the amount of curreny in - sell token
     * @param {Currency} obj.currencyOut the currency out - buy token
     * @param {Percent} obj.maximumSlippage Maximum slippage
     * @param {Provider} provider an optional provider, the router defaults public providers
     * @returns the best trade if found
     */
    static bestTradeExactOut({ currencyAmountOut, currencyIn, maximumSlippage, receiver, }: GnosisProtocolTradeBestTradeExactOutParams): Promise<GnosisProtocolTrade | undefined>;
    /**
     * Returns the order payload. The order must be signed
     * @param options
     * @returns
     */
    swapOrder({ receiver }: GnosisProtocolTradeSwapOrderParams): Order;
    /**
     * Signs the order by adding signature
     * @param signature
     */
    signOrder(signer: Signer): Promise<this>;
    /**
     *
     * @returns
     */
    cancelOrder(signer: Signer): Promise<{
        signature: string;
        signingScheme: SigningScheme;
    }>;
    /**
     * Submits the order to GPv2 API
     * @returns The order ID from GPv2
     */
    submitOrder(): Promise<string>;
    /**
     * Fetches the order status from the API
     */
    getOrderMetadata(): Promise<GnosisProtocolTradeOrderMetadata>;
}
