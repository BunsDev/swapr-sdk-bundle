"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CURVE_TOKENS = exports.CURVE_POOLS = exports.POOLS_MAINNET = exports.TOKENS_MAINNET = exports.POOLS_ARBITRUM_ONE = exports.TOKENS_ARBITRUM_ONE = exports.POOLS_XDAI = exports.TOKENS_XDAI = void 0;
const constants_1 = require("../../../constants");
const abi_1 = require("./abi");
var TokenType;
(function (TokenType) {
    TokenType["USD"] = "usd";
    TokenType["EUR"] = "eur";
    TokenType["BTC"] = "btc";
    TokenType["ETH"] = "eth";
    TokenType["LINK"] = "link";
    TokenType["GOLD"] = "gold";
    TokenType["CRV"] = "crv";
    TokenType["CVX"] = "cvx";
    TokenType["SPELL"] = "spell";
    TokenType["T"] = "t";
    TokenType["CRYPTO"] = "crypto";
    TokenType["OTHER"] = "other";
})(TokenType || (TokenType = {}));
/**
 * xDAI Chain coins
 */
exports.TOKENS_XDAI = {
    wxdai: {
        symbol: 'WXDAI',
        name: 'WXDAI',
        address: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
        decimals: 18,
        type: TokenType.USD
    },
    usdc: {
        symbol: 'USDC',
        name: 'USDC',
        address: '0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83',
        decimals: 6,
        type: TokenType.USD
    },
    usdt: {
        symbol: 'USDT',
        name: 'USDT',
        address: '0x4ECaBa5870353805a9F068101A40E0f32ed605C6',
        decimals: 6,
        type: TokenType.USD
    }
};
/**
 * xDAI pools
 */
exports.POOLS_XDAI = [
    {
        id: '3pool',
        name: '3Pool',
        abi: abi_1.CURVE_3POOL_ABI,
        swapAddress: '0x7f90122BF0700F9E7e1F688fe926940E8839F353',
        isMeta: false,
        // Order is crucial
        tokens: [exports.TOKENS_XDAI.wxdai, exports.TOKENS_XDAI.usdc, exports.TOKENS_XDAI.usdt]
    }
];
/**
 * Arbitrum Coins
 */
exports.TOKENS_ARBITRUM_ONE = {
    usdc: {
        symbol: 'USDC',
        name: 'USDC',
        decimals: 6,
        address: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
        type: TokenType.USD
    },
    usdt: {
        symbol: 'USDT',
        name: 'USDT',
        decimals: 6,
        address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
        type: TokenType.USD
    },
    wbtc: {
        symbol: 'wBTC',
        name: 'wBTC',
        decimals: 8,
        address: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
        type: TokenType.BTC
    },
    renbtc: {
        symbol: 'renBTC',
        name: 'renBTC',
        decimals: 8,
        address: '0xDBf31dF14B66535aF65AaC99C32e9eA844e14501',
        type: TokenType.BTC
    },
    eth: {
        symbol: 'ETH',
        name: 'ETH',
        decimals: 18,
        address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        type: TokenType.ETH
    },
    weth: {
        symbol: 'WETH',
        name: 'WETH',
        decimals: 18,
        address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
        type: TokenType.ETH
    },
    eurs: {
        symbol: 'EURs',
        name: 'EURs',
        decimals: 2,
        address: '0xD22a58f79e9481D1a88e00c343885A588b34b68B',
        type: TokenType.EUR
    }
};
exports.POOLS_ARBITRUM_ONE = [
    {
        id: '2pool',
        name: '2pool',
        swapAddress: '0x7f90122BF0700F9E7e1F688fe926940E8839F353',
        abi: abi_1.CURVE_3POOL_ABI,
        isMeta: false,
        tokens: [exports.TOKENS_ARBITRUM_ONE.usdc, exports.TOKENS_ARBITRUM_ONE.usdt]
        // underlyingTokens: [TOKENS_ARBITRUM_ONE.usdc, TOKENS_ARBITRUM_ONE.usdt],
    },
    {
        id: 'tricrypto',
        name: 'Tricrypto',
        abi: abi_1.CURVE_ROUTER_ABI,
        isMeta: false,
        swapAddress: '0x960ea3e3C7FB317332d990873d354E18d7645590',
        tokens: [exports.TOKENS_ARBITRUM_ONE.usdt, exports.TOKENS_ARBITRUM_ONE.wbtc, exports.TOKENS_ARBITRUM_ONE.weth],
        allowsTradingETH: true
    },
    {
        id: 'ren',
        name: 'Ren',
        swapAddress: '0x3E01dD8a5E1fb3481F0F589056b428Fc308AF0Fb',
        abi: abi_1.CURVE_3POOL_ABI,
        isMeta: false,
        tokens: [exports.TOKENS_ARBITRUM_ONE.wbtc, exports.TOKENS_ARBITRUM_ONE.renbtc]
    },
    {
        id: 'eursusd',
        name: 'EURs USD',
        swapAddress: '0x25e2e8d104bc1a70492e2be32da7c1f8367f9d2c',
        abi: abi_1.CURVE_CRYPTO_SWAP_ABI,
        isMeta: true,
        tokens: [
            exports.TOKENS_ARBITRUM_ONE.eurs,
            exports.TOKENS_ARBITRUM_ONE.usdc,
            exports.TOKENS_ARBITRUM_ONE.usdt // USDT
        ]
    }
];
exports.TOKENS_MAINNET = {
    crv: {
        address: '0xD533a949740bb3306d119CC777fa900bA034cd52',
        name: 'Curve DAO Token',
        symbol: 'CRV',
        decimals: 18,
        type: TokenType.CRV
    },
    // Bitcoin Tokens
    hbtc: {
        address: '0x0316EB71485b0Ab14103307bf65a021042c6d380',
        name: 'Huobi BTC',
        symbol: 'HBTC',
        decimals: 18,
        type: TokenType.BTC
    },
    sbtc: {
        address: '0xfE18be6b3Bd88A2D2A7f928d00292E7a9963CfC6',
        name: 'Synth sBTC',
        symbol: 'sBTC',
        decimals: 18,
        type: TokenType.BTC
    },
    obtc: {
        address: '0x8064d9Ae6cDf087b1bcd5BDf3531bD5d8C537a68',
        name: 'BoringDAO BTC',
        symbol: 'oBTC',
        decimals: 18,
        type: TokenType.BTC
    },
    bbtc: {
        address: '0x9BE89D2a4cd102D8Fecc6BF9dA793be995C22541',
        name: 'Binance Wrapped BTC',
        symbol: 'BBTC',
        decimals: 8,
        type: TokenType.BTC
    },
    pbtc: {
        address: '0x5228a22e72ccC52d415EcFd199F99D0665E7733b',
        name: 'pTokens BTC',
        symbol: 'pBTC',
        decimals: 18,
        type: TokenType.BTC
    },
    tbtc: {
        address: '0x8dAEBADE922dF735c38C80C7eBD708Af50815fAa',
        name: 'tBTC',
        symbol: 'TBTC',
        decimals: 18,
        type: TokenType.BTC
    },
    wbtc: {
        address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
        name: 'Wrapped BTC',
        symbol: 'WBTC',
        decimals: 8,
        type: TokenType.BTC
    },
    renbtc: {
        address: '0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D',
        name: 'renBTC',
        symbol: 'renBTC',
        decimals: 8,
        type: TokenType.BTC
    },
    // USD Tokens
    ycdai: {
        address: '0x99d1Fa417f94dcD62BfE781a1213c092a47041Bc',
        name: 'Curve (iearn fork) DAI',
        symbol: 'ycDAI',
        decimals: 18,
        type: TokenType.USD
    },
    ycusdt: {
        address: '0x1bE5d71F2dA660BFdee8012dDc58D024448A0A59',
        name: 'Curve (iearn fork) USDT',
        symbol: 'ycUSDT',
        decimals: 6,
        type: TokenType.USD
    },
    cusdc: {
        address: '0x39AA39c021dfbaE8faC545936693aC917d5E7563',
        name: 'Compound USD Coin',
        symbol: 'cUSDC',
        decimals: 8,
        type: TokenType.USD
    },
    usdp: {
        address: '0x1456688345527bE1f37E9e627DA0837D6f08C925',
        name: 'USDP Stablecoin',
        symbol: 'USDP',
        decimals: 18,
        type: TokenType.USD
    },
    adai: {
        address: '0x028171bCA77440897B824Ca71D1c56caC55b68A3',
        name: 'Aave interest bearing DAI',
        symbol: 'aDAI',
        decimals: 18,
        type: TokenType.USD
    },
    musd: {
        address: '0xe2f2a5C287993345a840Db3B0845fbC70f5935a5',
        name: 'mStable USD',
        symbol: 'mUSD',
        decimals: 18,
        type: TokenType.USD
    },
    gusd: {
        address: '0x056Fd409E1d7A124BD7017459dFEa2F387b6d5Cd',
        name: 'Gemini dollar',
        symbol: 'GUSD',
        decimals: 2,
        type: TokenType.USD
    },
    ydai: {
        address: '0xC2cB1040220768554cf699b0d863A3cd4324ce32',
        name: 'iearn DAI',
        symbol: 'yDAI',
        decimals: 18,
        type: TokenType.USD
    },
    cyusdt: {
        address: '0x48759f220ed983db51fa7a8c0d2aab8f3ce4166a',
        name: 'Yearn Tether USD',
        symbol: 'cyUSDT',
        decimals: 8,
        type: TokenType.USD
    },
    cyusdc: {
        address: '0x76Eb2FE28b36B3ee97F3Adae0C69606eeDB2A37c',
        name: 'Yearn USD Coin',
        symbol: 'cyUSDC',
        decimals: 8,
        type: TokenType.USD
    },
    yusdc: {
        address: '0xd6aD7a6750A7593E092a9B218d66C0A814a3436e',
        name: 'iearn USDC',
        symbol: 'yUSDC',
        decimals: 6,
        type: TokenType.USD
    },
    husd: {
        address: '0xdF574c24545E5FfEcb9a659c229253D4111d87e1',
        name: 'HUSD',
        symbol: 'HUSD',
        decimals: 8,
        type: TokenType.USD
    },
    cydai: {
        address: '0x8e595470Ed749b85C6F7669de83EAe304C2ec68F',
        name: 'Yearn Dai Stablecoin',
        symbol: 'cyDAI',
        decimals: 8,
        type: TokenType.USD
    },
    cdai: {
        address: '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643',
        name: 'Compound Dai',
        symbol: 'cDAI',
        decimals: 8,
        type: TokenType.USD
    },
    ycusdc: {
        address: '0x9777d7E2b60bB01759D0E2f8be2095df444cb07E',
        name: 'Curve (iearn fork) USDC',
        symbol: 'ycUSDC',
        decimals: 6,
        type: TokenType.USD
    },
    ust: {
        address: '0xa47c8bf37f92aBed4A126BDA807A7b7498661acD',
        name: 'Wrapped UST Token',
        symbol: 'UST',
        decimals: 18,
        type: TokenType.USD
    },
    yusdt: {
        address: '0x83f798e925BcD4017Eb265844FDDAbb448f1707D',
        name: 'iearn USDT',
        symbol: 'yUSDT',
        decimals: 6,
        type: TokenType.USD
    },
    ybusd: {
        address: '0x04bC0Ab673d88aE9dbC9DA2380cB6B79C4BCa9aE',
        name: 'iearn BUSD',
        symbol: 'yBUSD',
        decimals: 18,
        type: TokenType.USD
    },
    ausdc: {
        address: '0xBcca60bB61934080951369a648Fb03DF4F96263C',
        name: 'Aave interest bearing USDC',
        symbol: 'aUSDC',
        decimals: 6,
        type: TokenType.USD
    },
    lusd: {
        address: '0x5f98805A4E8be255a32880FDeC7F6728C6568bA0',
        name: 'LUSD Stablecoin',
        symbol: 'LUSD',
        decimals: 18,
        type: TokenType.USD
    },
    tusd: {
        address: '0x0000000000085d4780B73119b644AE5ecd22b376',
        name: 'TrueUSD',
        symbol: 'TUSD',
        decimals: 18,
        type: TokenType.USD
    },
    usdn: {
        address: '0x674C6Ad92Fd080e4004b2312b45f796a192D27a0',
        name: 'Neutrino USD',
        symbol: 'USDN',
        decimals: 18,
        type: TokenType.USD
    },
    usdc: {
        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 6,
        type: TokenType.USD
    },
    ausdt: {
        address: '0x3Ed3B47Dd13EC9a98b44e6204A523E766B225811',
        name: 'Aave interest bearing USDT',
        symbol: 'aUSDT',
        decimals: 6,
        type: TokenType.USD
    },
    '3crv': {
        address: '0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490',
        name: 'Curve.fi DAI/USDC/USDT',
        symbol: '3Crv',
        decimals: 18,
        type: TokenType.USD
    },
    usdk: {
        address: '0x1c48f86ae57291F7686349F12601910BD8D470bb',
        name: 'USDK',
        symbol: 'USDK',
        decimals: 18,
        type: TokenType.USD
    },
    frax: {
        address: '0x853d955aCEf822Db058eb8505911ED77F175b99e',
        name: 'Frax',
        symbol: 'FRAX',
        decimals: 18,
        type: TokenType.USD
    },
    busd: {
        address: '0x4Fabb145d64652a948d72533023f6E7A623C7C53',
        name: 'Binance USD',
        symbol: 'BUSD',
        decimals: 18,
        type: TokenType.USD
    },
    asusd: {
        address: '0x6C5024Cd4F8A59110119C56f8933403A539555EB',
        name: 'Aave interest bearing SUSD',
        symbol: 'aSUSD',
        decimals: 18,
        type: TokenType.USD
    },
    mim: {
        address: '0x99D8a9C45b2ecA8864373A26D1459e3Dff1e17F3',
        name: 'Magic Internet Money',
        symbol: 'MIM',
        decimals: 18,
        type: TokenType.USD
    },
    alusd: {
        address: '0xBC6DA0FE9aD5f3b0d58160288917AA56653660E9',
        name: 'Alchemix USD',
        symbol: 'alUSD',
        decimals: 18,
        type: TokenType.USD
    },
    usdt: {
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        name: 'Tether USD',
        symbol: 'USDT',
        decimals: 6,
        type: TokenType.USD
    },
    dai: {
        address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        name: 'Dai Stablecoin',
        symbol: 'DAI',
        decimals: 18,
        type: TokenType.USD
    },
    susd: {
        address: '0x57Ab1ec28D129707052df4dF418D58a2D46d5f51',
        name: 'Synth sUSD',
        symbol: 'sUSD',
        decimals: 18,
        type: TokenType.USD
    },
    dusd: {
        address: '0x5BC25f649fc4e26069dDF4cF4010F9f706c23831',
        name: 'DefiDollar',
        symbol: 'DUSD',
        decimals: 18,
        type: TokenType.USD
    },
    ytusd: {
        address: '0x73a052500105205d34Daf004eAb301916DA8190f',
        name: 'iearn TUSD',
        symbol: 'yTUSD',
        decimals: 18,
        type: TokenType.USD
    },
    pax: {
        address: '0x8E870D67F660D95d5be530380D0eC0bd388289E1',
        name: 'Pax Dollar',
        symbol: 'pax',
        decimals: 18,
        type: TokenType.USD
    },
    // Ether and deriivates
    reth: {
        address: '0x9559Aaa82d9649C7A7b220E7c461d2E74c9a3593',
        name: 'StaFi',
        symbol: 'rETH',
        decimals: 18,
        type: TokenType.ETH
    },
    eth: {
        symbol: 'ETH',
        name: 'Ether',
        decimals: 18,
        address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        type: TokenType.ETH
    },
    ankreth: {
        name: 'ankreth',
        symbol: 'ankrETH',
        decimals: 18,
        address: '0xE95A203B1a91a908F9B9CE46459d101078c2c3cb',
        type: TokenType.ETH
    },
    weth: {
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        name: 'Wrapped Ether',
        symbol: 'WETH',
        decimals: 18,
        type: TokenType.ETH
    },
    aethc: {
        address: '0xE95A203B1a91a908F9B9CE46459d101078c2c3cb',
        name: 'Ankr ETH2 Reward Bearing Certificate',
        symbol: 'aETHc',
        decimals: 18,
        type: TokenType.ETH
    },
    seth: {
        address: '0x5e74C9036fb86BD7eCdcb084a0673EFc32eA31cb',
        name: 'Synth sETH',
        symbol: 'sETH',
        decimals: 18,
        type: TokenType.ETH
    },
    steth: {
        address: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
        name: 'Liquid staked Ether 2.0',
        symbol: 'stETH',
        decimals: 18,
        type: TokenType.ETH
    },
    snx: {
        address: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
        name: 'Synthetix Network Token',
        symbol: 'SNX',
        decimals: 18,
        type: TokenType.OTHER
    },
    slink: {
        address: '0xbBC455cb4F1B9e4bFC4B73970d360c8f032EfEE6',
        name: 'Synth sLINK',
        symbol: 'sLINK',
        decimals: 18,
        type: TokenType.LINK
    },
    link: {
        address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
        name: 'ChainLink Token',
        symbol: 'LINK',
        decimals: 18,
        type: TokenType.LINK
    },
    seur: {
        address: '0xD71eCFF9342A5Ced620049e616c5035F1dB98620',
        name: 'Synth sEUR',
        symbol: 'sEUR',
        decimals: 18,
        type: TokenType.EUR
    },
    eurs: {
        address: '0xdB25f211AB05b1c97D595516F45794528a807ad8',
        name: 'STASIS EURS Token',
        symbol: 'EURS',
        decimals: 2,
        type: TokenType.EUR
    },
    linkusd: {
        name: 'LINKUSD',
        symbol: 'LINKUSD',
        decimals: 18,
        address: '0x0E2EC54fC0B509F445631Bf4b91AB8168230C752',
        type: TokenType.LINK
    },
    spell: {
        name: 'Spell',
        symbol: 'SPELL',
        decimals: 18,
        address: '0x090185f2135308BaD17527004364eBcC2D37e5F6',
        type: TokenType.SPELL
    },
    cvx: {
        name: 'Convex',
        symbol: 'CVX',
        decimals: 18,
        address: '0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B',
        type: TokenType.CVX
    },
    xaut: {
        name: 'Tether Gold',
        symbol: 'XAUt',
        decimals: 6,
        address: '0x68749665FF8D2d112Fa859AA293F07A622782F38',
        type: TokenType.GOLD
    },
    t: {
        name: 'Threshold Network',
        symbol: 'T',
        decimals: 18,
        address: '0xCdF7028ceAB81fA0C6971208e83fa7872994beE5',
        type: TokenType.T
    },
    eurt: {
        name: 'Tether Euro',
        symbol: 'EURT',
        decimals: 6,
        address: '0xC581b735A1688071A1746c968e0798D642EDE491',
        type: TokenType.EUR
    },
    tricrv: {
        name: 'Curve.fi DAI/USDC/USDT (3Crv)',
        symbol: '3Crv',
        decimals: 18,
        address: '0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490',
        isLPToken: true,
        type: TokenType.USD
    },
    sbtccrv: {
        symbol: 'sbtcCrv',
        name: 'Curve.fi renBTC/wBTC/sBTC',
        decimals: 18,
        address: '0x075b1bb99792c9E1041bA13afEf80C91a1e70fB3',
        isLPToken: true,
        type: TokenType.BTC
    },
    rai: {
        name: ' Rai Reflex Index',
        symbol: 'RAI',
        decimals: 18,
        address: '0x03ab458634910AaD20eF5f1C8ee96F1D6ac54919',
        type: TokenType.OTHER
    },
    rsv: {
        address: '0x196f4727526eA7FB1e17b2071B3d8eAA38486988',
        name: 'Reserve',
        symbol: 'RSV',
        decimals: 18,
        type: TokenType.OTHER
    },
    crvrenwsbtc: {
        address: '0x075b1bb99792c9E1041bA13afEf80C91a1e70fB3',
        name: 'Curve.fi renBTC/wBTC/sBTC',
        symbol: 'crvRenWSBTC',
        decimals: 18,
        type: TokenType.OTHER
    }
};
exports.POOLS_MAINNET = [
    {
        id: 'compound',
        name: 'Compound',
        abi: abi_1.CURVE_3POOL_ABI,
        tokens: [exports.TOKENS_MAINNET.cdai, exports.TOKENS_MAINNET.cusdc],
        underlyingTokens: [exports.TOKENS_MAINNET.dai, exports.TOKENS_MAINNET.usdc],
        swapAddress: '0xA2B47E3D5c44877cca798226B7B8118F9BFb7A56'
    },
    {
        id: 'usdt',
        name: 'USDT',
        abi: abi_1.CURVE_3POOL_ABI,
        tokens: [exports.TOKENS_MAINNET.cdai, exports.TOKENS_MAINNET.cusdc, exports.TOKENS_MAINNET.usdt],
        underlyingTokens: [exports.TOKENS_MAINNET.dai, exports.TOKENS_MAINNET.usdc, exports.TOKENS_MAINNET.usdt],
        swapAddress: '0x52EA46506B9CC5Ef470C5bf89f17Dc28bB35D85C'
    },
    {
        id: 'pax',
        name: 'PAX',
        abi: abi_1.CURVE_3POOL_ABI,
        tokens: [exports.TOKENS_MAINNET.ycdai, exports.TOKENS_MAINNET.ycusdc, exports.TOKENS_MAINNET.ycusdt, exports.TOKENS_MAINNET.pax],
        underlyingTokens: [exports.TOKENS_MAINNET.dai, exports.TOKENS_MAINNET.usdc, exports.TOKENS_MAINNET.usdt, exports.TOKENS_MAINNET.pax],
        swapAddress: '0x06364f10B501e868329afBc005b3492902d6C763'
    },
    {
        id: 'Y',
        name: 'Y',
        abi: abi_1.CURVE_3POOL_ABI,
        tokens: [exports.TOKENS_MAINNET.ydai, exports.TOKENS_MAINNET.yusdc, exports.TOKENS_MAINNET.yusdt, exports.TOKENS_MAINNET.ytusd],
        underlyingTokens: [exports.TOKENS_MAINNET.dai, exports.TOKENS_MAINNET.usdc, exports.TOKENS_MAINNET.usdt, exports.TOKENS_MAINNET.tusd],
        swapAddress: '0x45F783CCE6B7FF23B2ab2D70e416cdb7D6055f51'
    },
    {
        id: 'busd',
        name: 'Binance USD',
        abi: abi_1.CURVE_3POOL_ABI,
        tokens: [exports.TOKENS_MAINNET.ydai, exports.TOKENS_MAINNET.yusdc, exports.TOKENS_MAINNET.yusdt, exports.TOKENS_MAINNET.ybusd],
        underlyingTokens: [exports.TOKENS_MAINNET.dai, exports.TOKENS_MAINNET.usdc, exports.TOKENS_MAINNET.usdt, exports.TOKENS_MAINNET.busd],
        swapAddress: '0x79a8C46DeA5aDa233ABaFFD40F3A0A2B1e5A4F27'
    },
    {
        id: 'sUSD',
        name: 'Synthetix USD',
        abi: abi_1.CURVE_3POOL_ABI,
        tokens: [exports.TOKENS_MAINNET.dai, exports.TOKENS_MAINNET.usdc, exports.TOKENS_MAINNET.usdt, exports.TOKENS_MAINNET.susd],
        swapAddress: '0xA5407eAE9Ba41422680e2e00537571bcC53efBfD'
    },
    {
        id: 'ren',
        name: 'Ren',
        abi: abi_1.CURVE_3POOL_ABI,
        tokens: [exports.TOKENS_MAINNET.renbtc, exports.TOKENS_MAINNET.wbtc],
        swapAddress: '0x93054188d876f558f4a66B2EF1d97d16eDf0895B'
    },
    /*
    {
      name: 'sbtc',
      abi: CURVE_3POOL_ABI,
      tokens: [TOKENS_MAINNET.renbtc, TOKENS_MAINNET.wbtc, TOKENS_MAINNET.sbtc],
      swapAddress: '0x7fC77b5c7614E1533320Ea6DDc2Eb61fa00A9714'
    },
    */
    {
        id: 'hbtc',
        name: 'Houbi BTC',
        abi: abi_1.CURVE_3POOL_ABI,
        tokens: [exports.TOKENS_MAINNET.hbtc, exports.TOKENS_MAINNET.wbtc],
        swapAddress: '0x4CA9b3063Ec5866A4B82E437059D2C43d1be596F'
    },
    {
        id: '3pool',
        name: 'Curve 3Pool',
        abi: abi_1.CURVE_3POOL_ABI,
        tokens: [exports.TOKENS_MAINNET.dai, exports.TOKENS_MAINNET.usdc, exports.TOKENS_MAINNET.usdt],
        swapAddress: '0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7'
    },
    {
        id: 'gusd',
        name: 'Gemini USD',
        isMeta: true,
        abi: abi_1.CURVE_CRYPTO_SWAP_ABI,
        tokens: [exports.TOKENS_MAINNET.gusd, exports.TOKENS_MAINNET.tricrv],
        metaTokens: [exports.TOKENS_MAINNET.dai, exports.TOKENS_MAINNET.usdc, exports.TOKENS_MAINNET.usdt],
        swapAddress: '0x4f062658EaAF2C1ccf8C8e36D6824CDf41167956'
    },
    {
        id: 'husd',
        name: 'Houbi USD',
        isMeta: true,
        abi: abi_1.CURVE_CRYPTO_SWAP_ABI,
        tokens: [exports.TOKENS_MAINNET.husd, exports.TOKENS_MAINNET.tricrv],
        metaTokens: [exports.TOKENS_MAINNET.dai, exports.TOKENS_MAINNET.usdc, exports.TOKENS_MAINNET.usdt],
        swapAddress: '0x3eF6A01A0f81D6046290f3e2A8c5b843e738E604'
    },
    {
        id: 'usdk',
        name: 'usdk',
        isMeta: true,
        abi: abi_1.CURVE_CRYPTO_SWAP_ABI,
        tokens: [exports.TOKENS_MAINNET.usdk, exports.TOKENS_MAINNET.tricrv],
        metaTokens: [exports.TOKENS_MAINNET.dai, exports.TOKENS_MAINNET.usdc, exports.TOKENS_MAINNET.usdt],
        swapAddress: '0x3E01dD8a5E1fb3481F0F589056b428Fc308AF0Fb'
    },
    {
        id: 'usdn',
        name: 'usdn',
        isMeta: true,
        abi: abi_1.CURVE_CRYPTO_SWAP_ABI,
        tokens: [exports.TOKENS_MAINNET.usdn, exports.TOKENS_MAINNET.tricrv],
        metaTokens: [exports.TOKENS_MAINNET.dai, exports.TOKENS_MAINNET.usdc, exports.TOKENS_MAINNET.usdt],
        swapAddress: '0x0f9cb53Ebe405d49A0bbdBD291A65Ff571bC83e1'
    },
    {
        id: 'musd',
        name: 'mStable USD',
        abi: abi_1.CURVE_CRYPTO_SWAP_ABI,
        isMeta: true,
        tokens: [exports.TOKENS_MAINNET.musd, exports.TOKENS_MAINNET.tricrv],
        metaTokens: [exports.TOKENS_MAINNET.dai, exports.TOKENS_MAINNET.usdc, exports.TOKENS_MAINNET.usdt],
        swapAddress: '0x8474DdbE98F5aA3179B3B3F5942D724aFcdec9f6'
    },
    {
        id: 'rsv',
        name: 'rsv',
        abi: abi_1.CURVE_CRYPTO_SWAP_ABI,
        tokens: [exports.TOKENS_MAINNET.rsv, exports.TOKENS_MAINNET.tricrv],
        metaTokens: [exports.TOKENS_MAINNET.dai, exports.TOKENS_MAINNET.usdc, exports.TOKENS_MAINNET.usdt],
        swapAddress: '0xC18cC39da8b11dA8c3541C598eE022258F9744da'
    },
    {
        id: 'tbtc',
        name: 'tbtc',
        abi: abi_1.CURVE_3POOL_ABI,
        tokens: [exports.TOKENS_MAINNET.tbtc, exports.TOKENS_MAINNET.sbtccrv],
        metaTokens: [exports.TOKENS_MAINNET.renbtc, exports.TOKENS_MAINNET.wbtc, exports.TOKENS_MAINNET.sbtc],
        swapAddress: '0xC25099792E9349C7DD09759744ea681C7de2cb66'
    },
    {
        id: 'dusd',
        name: 'dusd',
        tokens: [exports.TOKENS_MAINNET.dusd, exports.TOKENS_MAINNET.tricrv],
        abi: abi_1.CURVE_3POOL_ABI,
        metaTokens: [exports.TOKENS_MAINNET.dai, exports.TOKENS_MAINNET.usdc, exports.TOKENS_MAINNET.usdt],
        swapAddress: '0x8038C01A0390a8c547446a0b2c18fc9aEFEcc10c'
    },
    {
        id: 'pbtc',
        name: 'pbtc',
        tokens: [exports.TOKENS_MAINNET.pbtc, exports.TOKENS_MAINNET.sbtccrv],
        abi: abi_1.CURVE_3POOL_ABI,
        metaTokens: [exports.TOKENS_MAINNET.renbtc, exports.TOKENS_MAINNET.wbtc, exports.TOKENS_MAINNET.sbtc],
        swapAddress: '0x7F55DDe206dbAD629C080068923b36fe9D6bDBeF'
    },
    {
        id: 'bbtc',
        name: 'bbtc',
        abi: abi_1.CURVE_3POOL_ABI,
        tokens: [exports.TOKENS_MAINNET.bbtc, exports.TOKENS_MAINNET.sbtccrv],
        metaTokens: [exports.TOKENS_MAINNET.renbtc, exports.TOKENS_MAINNET.wbtc, exports.TOKENS_MAINNET.sbtc],
        swapAddress: '0x071c661B4DeefB59E2a3DdB20Db036821eeE8F4b'
    },
    {
        id: 'obtc',
        name: 'obtc',
        abi: abi_1.CURVE_3POOL_ABI,
        tokens: [exports.TOKENS_MAINNET.obtc, exports.TOKENS_MAINNET.sbtccrv],
        metaTokens: [exports.TOKENS_MAINNET.renbtc, exports.TOKENS_MAINNET.wbtc, exports.TOKENS_MAINNET.sbtc],
        swapAddress: '0xd81dA8D904b52208541Bade1bD6595D8a251F8dd'
    },
    {
        id: 'ust',
        name: 'ust',
        abi: abi_1.CURVE_3POOL_ABI,
        tokens: [exports.TOKENS_MAINNET.ust, exports.TOKENS_MAINNET.tricrv],
        metaTokens: [exports.TOKENS_MAINNET.dai, exports.TOKENS_MAINNET.usdc, exports.TOKENS_MAINNET.usdt],
        swapAddress: '0x890f4e345B1dAED0367A877a1612f86A1f86985f'
    },
    {
        id: 'saave',
        name: 'saave',
        abi: abi_1.CURVE_3POOL_ABI,
        tokens: [exports.TOKENS_MAINNET.adai, exports.TOKENS_MAINNET.asusd],
        underlyingTokens: [exports.TOKENS_MAINNET.dai, exports.TOKENS_MAINNET.susd],
        swapAddress: '0xEB16Ae0052ed37f479f7fe63849198Df1765a733'
    },
    {
        id: 'eurs',
        name: 'eurs',
        abi: abi_1.CURVE_3POOL_ABI,
        tokens: [exports.TOKENS_MAINNET.eurs, exports.TOKENS_MAINNET.seur],
        swapAddress: '0x0Ce6a5fF5217e38315f87032CF90686C96627CAA'
    },
    {
        id: 'usdp',
        name: 'usdp',
        abi: abi_1.CURVE_CRYPTO_SWAP_ABI,
        isMeta: true,
        tokens: [exports.TOKENS_MAINNET.usdp, exports.TOKENS_MAINNET.tricrv],
        metaTokens: [exports.TOKENS_MAINNET.dai, exports.TOKENS_MAINNET.usdc, exports.TOKENS_MAINNET.usdt],
        swapAddress: '0x42d7025938bEc20B69cBae5A77421082407f053A'
    },
    {
        id: 'link',
        name: 'link',
        abi: abi_1.CURVE_3POOL_ABI,
        tokens: [exports.TOKENS_MAINNET.link, exports.TOKENS_MAINNET.slink],
        swapAddress: '0xF178C0b5Bb7e7aBF4e12A4838C7b7c5bA2C623c0'
    },
    {
        id: 'tusd',
        name: 'tusd',
        abi: abi_1.CURVE_CRYPTO_SWAP_ABI,
        isMeta: true,
        tokens: [exports.TOKENS_MAINNET.tusd, exports.TOKENS_MAINNET.tricrv],
        metaTokens: [exports.TOKENS_MAINNET.dai, exports.TOKENS_MAINNET.usdc, exports.TOKENS_MAINNET.usdt],
        swapAddress: '0xecd5e75afb02efa118af914515d6521aabd189f1'
    },
    {
        id: 'frax',
        name: 'Frax',
        abi: abi_1.CURVE_CRYPTO_SWAP_ABI,
        isMeta: true,
        tokens: [exports.TOKENS_MAINNET.frax, exports.TOKENS_MAINNET.tricrv],
        metaTokens: [exports.TOKENS_MAINNET.dai, exports.TOKENS_MAINNET.usdc, exports.TOKENS_MAINNET.usdt],
        swapAddress: '0xd632f22692FaC7611d2AA1C0D552930D43CAEd3B'
    },
    {
        id: 'lusd',
        name: 'lusd',
        abi: abi_1.CURVE_3POOL_ABI,
        tokens: [exports.TOKENS_MAINNET.lusd, exports.TOKENS_MAINNET.tricrv],
        metaTokens: [exports.TOKENS_MAINNET.dai, exports.TOKENS_MAINNET.usdc, exports.TOKENS_MAINNET.usdt],
        swapAddress: '0xEd279fDD11cA84bEef15AF5D39BB4d4bEE23F0cA'
    },
    {
        id: 'busdv2',
        name: 'busdv2',
        isMeta: true,
        abi: abi_1.CURVE_CRYPTO_SWAP_ABI,
        tokens: [exports.TOKENS_MAINNET.busd, exports.TOKENS_MAINNET.tricrv],
        metaTokens: [exports.TOKENS_MAINNET.dai, exports.TOKENS_MAINNET.usdc, exports.TOKENS_MAINNET.usdt],
        swapAddress: '0x4807862AA8b2bF68830e4C8dc86D0e9A998e085a'
    },
    {
        id: 'alusd',
        name: 'alUSD',
        abi: abi_1.CURVE_CRYPTO_SWAP_ABI,
        isMeta: true,
        tokens: [exports.TOKENS_MAINNET.alusd, exports.TOKENS_MAINNET.tricrv],
        metaTokens: [exports.TOKENS_MAINNET.dai, exports.TOKENS_MAINNET.usdc, exports.TOKENS_MAINNET.usdt],
        swapAddress: '0x43b4FdFD4Ff969587185cDB6f0BD875c5Fc83f8c'
    },
    {
        id: 'mim',
        name: 'Magic Internet Money',
        abi: abi_1.CURVE_CRYPTO_SWAP_ABI,
        isMeta: true,
        tokens: [exports.TOKENS_MAINNET.mim, exports.TOKENS_MAINNET.tricrv],
        metaTokens: [exports.TOKENS_MAINNET.dai, exports.TOKENS_MAINNET.usdc, exports.TOKENS_MAINNET.usdt],
        swapAddress: '0x5a6A4D54456819380173272A5E8E9B9904BdF41B'
    },
    {
        id: 'tricrypto',
        name: 'Tricrypto',
        abi: abi_1.CURVE_WETH_ERC20_POOL_ABI,
        tokens: [exports.TOKENS_MAINNET.usdt, exports.TOKENS_MAINNET.wbtc, exports.TOKENS_MAINNET.weth],
        swapAddress: '0x80466c64868E1ab14a1Ddf27A676C3fcBE638Fe5'
    },
    {
        id: 'tricrypto2',
        name: 'tricrypto2',
        abi: abi_1.CURVE_WETH_ERC20_POOL_ABI,
        tokens: [exports.TOKENS_MAINNET.usdt, exports.TOKENS_MAINNET.wbtc, exports.TOKENS_MAINNET.weth],
        allowsTradingETH: true,
        swapAddress: '0xD51a44d3FaE010294C616388b506AcdA1bfAAE46'
    },
    {
        id: 'eurt',
        name: 'eurt',
        abi: abi_1.CURVE_3POOL_ABI,
        tokens: [exports.TOKENS_MAINNET.eurt, exports.TOKENS_MAINNET.seur],
        swapAddress: '0xfd5db7463a3ab53fd211b4af195c5bccc1a03890'
    },
    {
        id: 'eurtusd',
        name: 'eurtusd',
        isMeta: true,
        abi: abi_1.CURVE_3POOL_ABI,
        tokens: [exports.TOKENS_MAINNET.eurt, exports.TOKENS_MAINNET.tricrv],
        metaTokens: [exports.TOKENS_MAINNET.dai, exports.TOKENS_MAINNET.usdc, exports.TOKENS_MAINNET.usdt],
        swapAddress: '0x9838eCcC42659FA8AA7daF2aD134b53984c9427b'
    },
    {
        id: 'eursusd',
        name: 'eursusd',
        abi: abi_1.CURVE_EURSPOOL_ABI,
        tokens: [exports.TOKENS_MAINNET.usdc, exports.TOKENS_MAINNET.eurs],
        swapAddress: '0x98a7F18d4E56Cfe84E3D081B40001B3d5bD3eB8B'
    },
    {
        id: 'rai',
        name: 'Rai',
        abi: abi_1.CURVE_CRYPTO_SWAP_ABI,
        isMeta: true,
        tokens: [exports.TOKENS_MAINNET.rai, exports.TOKENS_MAINNET.tricrv],
        metaTokens: [exports.TOKENS_MAINNET.dai, exports.TOKENS_MAINNET.usdc, exports.TOKENS_MAINNET.usdt],
        swapAddress: '0x618788357D0EBd8A37e763ADab3bc575D54c2C7d'
    },
    {
        id: 'cvxeth',
        name: 'cvxeth',
        abi: abi_1.CURVE_ETHXERC20_256_ABI,
        tokens: [exports.TOKENS_MAINNET.weth, exports.TOKENS_MAINNET.cvx],
        swapAddress: '0xB576491F1E6e5E62f1d8F26062Ee822B40B0E0d4',
        allowsTradingETH: true
    },
    {
        id: 'spelleth',
        name: 'spelleth',
        abi: abi_1.CURVE_WETH_ERC20_POOL_ABI,
        tokens: [exports.TOKENS_MAINNET.weth, exports.TOKENS_MAINNET.spell],
        swapAddress: '0x98638FAcf9a3865cd033F36548713183f6996122',
        allowsTradingETH: true
    },
    {
        id: 'crveth',
        name: 'crveth',
        abi: abi_1.CURVE_ETHXERC20_256_ABI,
        tokens: [exports.TOKENS_MAINNET.weth, exports.TOKENS_MAINNET.crv],
        swapAddress: '0x8301AE4fc9c624d1D396cbDAa1ed877821D7C511',
        allowsTradingETH: true
    },
    {
        id: 'reth',
        name: 'rETH',
        abi: abi_1.CURVE_ETHXERC20_256_ABI,
        tokens: [exports.TOKENS_MAINNET.eth, exports.TOKENS_MAINNET.reth],
        swapAddress: '0xF9440930043eb3997fc70e1339dBb11F341de7A8'
    },
    {
        id: 'seth',
        name: 'seth',
        abi: abi_1.CURVE_ETHXERC20_ABI,
        tokens: [exports.TOKENS_MAINNET.eth, exports.TOKENS_MAINNET.seth],
        swapAddress: '0xc5424b857f758e906013f3555dad202e4bdb4567'
    },
    {
        id: 'steth',
        name: 'steth',
        abi: abi_1.CURVE_ETHXERC20_256_ABI,
        tokens: [exports.TOKENS_MAINNET.eth, exports.TOKENS_MAINNET.steth],
        swapAddress: '0xDC24316b9AE028F1497c275EB9192a3Ea0f67022'
    },
    {
        id: 'ankreth',
        name: 'ankreth',
        abi: abi_1.CURVE_ETHXERC20_256_ABI,
        tokens: [exports.TOKENS_MAINNET.eth, exports.TOKENS_MAINNET.ankreth],
        swapAddress: '0xA96A65c051bF88B4095Ee1f2451C2A9d43F53Ae2'
    }
    /**
     * Pool is dead
    {
      id: 'xautusd',
      name: 'xautusd',
      abi: CURVE_3POOL_ABI,
      isMeta: true,
      tokens: [TOKENS_MAINNET.xaut, TOKENS_MAINNET.tricrv],
      metaTokens: [TOKENS_MAINNET.dai, TOKENS_MAINNET.usdc, TOKENS_MAINNET.usdt],
      swapAddress: '0xAdCFcf9894335dC340f6Cd182aFA45999F45Fc44'
    },
    {
      id: 'ironbank',
      name: 'ironbank',
      abi: CURVE_3POOL_ABI,
      tokens: [TOKENS_MAINNET.cydai, TOKENS_MAINNET.cyusdc, TOKENS_MAINNET.cyusdt],
      underlyingTokens: [TOKENS_MAINNET.dai, TOKENS_MAINNET.usdc, TOKENS_MAINNET.usdt],
      swapAddress: '0x2dded6Da1BF5DBdF597C45fcFaa3194e53EcfeAF'
    },
    {
      id: 'teth',
      name: 'teth',
      abi: CURVE_3POOL_ABI,
      tokens: [TOKENS_MAINNET.weth, TOKENS_MAINNET.t],
      swapAddress: '0x752eBeb79963cf0732E9c0fec72a49FD1DEfAEAC',
      allowsTradingETH: true
    },
    {
      id: 'aave',
      name: 'Aave',
      abi: CURVE_3POOL_ABI,
      tokens: [TOKENS_MAINNET.adai, TOKENS_MAINNET.ausdc, TOKENS_MAINNET.ausdt],
      underlyingTokens: [TOKENS_MAINNET.dai, TOKENS_MAINNET.usdc, TOKENS_MAINNET.usdt],
      swapAddress: '0xDeBF20617708857ebe4F679508E7b7863a8A8EeE'
    },
    */
    /*
    Inactive pool
    {
      id: 'linkusd',
      name: 'linkusd',
      abi: CURVE_CRYPTO_SWAP_ABI,
      tokens: [TOKENS_MAINNET.linkusd, TOKENS_MAINNET.tricrv],
      metaTokens: [TOKENS_MAINNET.dai, TOKENS_MAINNET.usdc, TOKENS_MAINNET.usdt],
      swapAddress: '0xE7a24EF0C5e95Ffb0f6684b813A78F2a3AD7D171'
    },
    */
];
exports.CURVE_POOLS = {
    [constants_1.ChainId.MAINNET]: exports.POOLS_MAINNET,
    [constants_1.ChainId.XDAI]: exports.POOLS_XDAI,
    [constants_1.ChainId.ARBITRUM_ONE]: exports.POOLS_ARBITRUM_ONE,
    // Empty
    [constants_1.ChainId.RINKEBY]: [],
    [constants_1.ChainId.ARBITRUM_RINKEBY]: []
};
exports.CURVE_TOKENS = {
    [constants_1.ChainId.MAINNET]: exports.TOKENS_MAINNET,
    [constants_1.ChainId.XDAI]: exports.TOKENS_XDAI,
    [constants_1.ChainId.ARBITRUM_ONE]: exports.TOKENS_ARBITRUM_ONE
};
//# sourceMappingURL=constants.js.map