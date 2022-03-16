import { JsonRpcProvider } from '@ethersproject/providers';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { ChainId } from '../../../constants';
export declare const MAINNET_CONTRACTS: {
    readonly addressProvider: "0x0000000022d53366457f9d5e68ec105046fc4383";
    readonly router: "0xfA9a30350048B2BF66865ee20363067c66f67e58";
};
export declare const RPC_PROVIDER_LIST: {
    [x: number]: string;
};
/**
 *  Construct a new read-only Provider
 */
export declare const getProvider: (chainId: ChainId) => JsonRpcProvider;
export interface GetBestPoolAndOutputParams {
    tokenInAddress: string;
    tokenOutAddress: string;
    amountIn: BigNumberish;
    chainId: ChainId;
}
export declare type GetExchangeRoutingInfoParams = GetBestPoolAndOutputParams;
export interface GetBestPoolAndOutputResult {
    expectedAmountOut: BigNumber;
    poolAddress: string;
    registryExchangeAddress: string;
}
export interface GetExchangeRoutingInfoResults {
    routes: string[];
    indices: BigNumber[];
    expectedAmountOut: BigNumber;
}
/**
 * Returns the best pool to route a trade through using Curve Registry Exchange contract.
 * The contract is only available on Mainnet.
 * @returns the best pool to route the trade through and expected receive amount
 */
export declare function getBestCurvePoolAndOutput({ amountIn, tokenInAddress, tokenOutAddress, chainId }: GetBestPoolAndOutputParams): Promise<GetBestPoolAndOutputResult | undefined>;
/**
 * Returns Curve's Smart Router contract instance
 */
export declare function getRouter(): Contract;
/**
 * Returns routing information from the Curve Smart Router. The router is only available on Mainnet.
 * The contract calls reverts if there no route is found
 * @returns the routing information
 */
export declare function getExchangeRoutingInfo({ amountIn, tokenInAddress, tokenOutAddress }: GetExchangeRoutingInfoParams): Promise<GetExchangeRoutingInfoResults | undefined>;
