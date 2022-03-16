import { ContractInterface } from '@ethersproject/contracts';
import { ChainId } from '../../../constants';
declare enum TokenType {
    USD = "usd",
    EUR = "eur",
    BTC = "btc",
    ETH = "eth",
    LINK = "link",
    GOLD = "gold",
    CRV = "crv",
    CVX = "cvx",
    SPELL = "spell",
    T = "t",
    CRYPTO = "crypto",
    OTHER = "other"
}
export interface CurveToken {
    isLPToken?: boolean;
    address: string;
    symbol: string;
    name: string;
    decimals: number;
    type: TokenType;
}
export interface CurvePool {
    id: string;
    name: string;
    swapAddress: string;
    abi: ContractInterface;
    approveAddress?: string;
    tokens: CurveToken[];
    underlyingTokens?: CurveToken[];
    metaTokens?: CurveToken[];
    riskLevel?: number;
    isMeta?: boolean;
    allowsTradingETH?: boolean;
}
/**
 * xDAI Chain coins
 */
export declare const TOKENS_XDAI: {
    [k: string]: CurveToken;
};
/**
 * xDAI pools
 */
export declare const POOLS_XDAI: CurvePool[];
/**
 * Arbitrum Coins
 */
export declare const TOKENS_ARBITRUM_ONE: {
    [k: string]: CurveToken;
};
export declare const POOLS_ARBITRUM_ONE: CurvePool[];
export declare const TOKENS_MAINNET: {
    [k: string]: CurveToken;
};
export declare const POOLS_MAINNET: CurvePool[];
export declare const CURVE_POOLS: {
    [chainId in ChainId]: CurvePool[];
};
export declare const CURVE_TOKENS: {
    1: {
        [k: string]: CurveToken;
    };
    100: {
        [k: string]: CurveToken;
    };
    42161: {
        [k: string]: CurveToken;
    };
};
export {};
