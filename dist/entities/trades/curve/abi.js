"use strict";
// ABIs
Object.defineProperty(exports, "__esModule", { value: true });
exports.CURVE_ETHXERC20_256_ABI = exports.CURVE_ETHXERC20_ABI = exports.CURVE_WETH_ERC20_POOL_ABI = exports.CURVE_CRYPTO_SWAP_ABI = exports.ADDRESS_PROVIDER_ABI = exports.REGISTRY_EXCHANGE_ABI = exports.CURVE_ROUTER_ABI = exports.CURVE_EURSPOOL_ABI = exports.CURVE_3POOL_ABI = void 0;
const CURVE_SHARED_POOL_ABI = [
    {
        name: 'fee',
        outputs: [{ type: 'uint256', name: '' }],
        inputs: [],
        stateMutability: 'view',
        type: 'function',
        gas: '2201'
    }
];
// 3pool ABI which has USDC, USDT and WXDAI
exports.CURVE_3POOL_ABI = [
    ...CURVE_SHARED_POOL_ABI,
    {
        type: 'function',
        stateMutability: 'nonpayable',
        outputs: [{ type: 'uint256', name: '' }],
        name: 'exchange',
        inputs: [
            { type: 'int128', name: 'i' },
            { type: 'int128', name: 'j' },
            { type: 'uint256', name: '_dx' },
            { type: 'uint256', name: '_min_dy' }
        ],
        gas: '5499133'
    },
    {
        type: 'function',
        stateMutability: 'view',
        outputs: [{ type: 'uint256', name: '' }],
        name: 'get_dy',
        inputs: [
            { type: 'int128', name: 'i' },
            { type: 'int128', name: 'j' },
            { type: 'uint256', name: '_dx' }
        ]
    }
];
// 3pool ABI which has USDC, USDT and WXDAI
exports.CURVE_EURSPOOL_ABI = [
    ...CURVE_SHARED_POOL_ABI,
    {
        stateMutability: 'nonpayable',
        type: 'function',
        name: 'exchange',
        inputs: [
            { name: 'i', type: 'uint256' },
            { name: 'j', type: 'uint256' },
            { name: 'dx', type: 'uint256' },
            { name: 'min_dy', type: 'uint256' }
        ],
        outputs: [{ name: '', type: 'uint256' }],
        gas: '16729579'
    },
    {
        stateMutability: 'view',
        type: 'function',
        name: 'get_dy',
        inputs: [
            { name: 'i', type: 'uint256' },
            { name: 'j', type: 'uint256' },
            { name: 'dx', type: 'uint256' }
        ],
        outputs: [{ name: '', type: 'uint256' }],
        gas: '4577395'
    }
];
exports.CURVE_ROUTER_ABI = [
    ...CURVE_SHARED_POOL_ABI,
    {
        stateMutability: 'payable',
        type: 'function',
        name: 'exchange',
        inputs: [
            { name: '_amount', type: 'uint256' },
            { name: '_route', type: 'address[6]' },
            { name: '_indices', type: 'uint256[8]' },
            { name: '_min_received', type: 'uint256' }
        ],
        outputs: [],
        gas: '4577395'
    },
    {
        stateMutability: 'view',
        type: 'function',
        name: 'get_exchange_routing',
        inputs: [
            { name: '_initial', type: 'address' },
            { name: '_target', type: 'address' },
            { name: '_amount', type: 'uint256' }
        ],
        outputs: [
            { name: '', type: 'address[6]' },
            { name: '', type: 'uint256[8]' },
            { name: '', type: 'uint256' }
        ]
    },
    {
        stateMutability: 'view',
        type: 'function',
        name: 'can_route',
        inputs: [
            { name: '_initial', type: 'address' },
            { name: '_target', type: 'address' }
        ],
        outputs: [{ name: '', type: 'bool' }],
        gas: '26664'
    },
    {
        stateMutability: 'view',
        type: 'function',
        name: 'crypto_coins',
        inputs: [{ name: 'arg0', type: 'uint256' }],
        outputs: [{ name: '', type: 'address' }],
        gas: '2763'
    }
];
exports.REGISTRY_EXCHANGE_ABI = [
    ...CURVE_SHARED_POOL_ABI,
    {
        stateMutability: 'view',
        type: 'function',
        name: 'get_best_rate',
        inputs: [
            {
                name: '_from',
                type: 'address'
            },
            {
                name: '_to',
                type: 'address'
            },
            {
                name: '_amount',
                type: 'uint256'
            }
        ],
        outputs: [
            {
                name: '',
                type: 'address'
            },
            {
                name: '',
                type: 'uint256'
            }
        ],
        gas: '395840312'
    }
];
exports.ADDRESS_PROVIDER_ABI = [
    {
        name: 'get_address',
        outputs: [{ type: 'address', name: '' }],
        inputs: [{ type: 'uint256', name: '_id' }],
        stateMutability: 'view',
        type: 'function',
        gas: '1308'
    }
];
exports.CURVE_CRYPTO_SWAP_ABI = [
    ...CURVE_SHARED_POOL_ABI,
    {
        stateMutability: 'nonpayable',
        type: 'function',
        name: 'exchange_underlying',
        inputs: [
            { name: 'i', type: 'uint256' },
            { name: 'j', type: 'uint256' },
            { name: '_dx', type: 'uint256' },
            { name: '_min_dy', type: 'uint256' }
        ],
        outputs: [{ name: '', type: 'uint256' }],
        gas: '57522'
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        name: 'exchange_underlying',
        inputs: [
            { name: 'i', type: 'uint256' },
            { name: 'j', type: 'uint256' },
            { name: '_dx', type: 'uint256' },
            { name: '_min_dy', type: 'uint256' },
            { name: '_receiver', type: 'address' }
        ],
        outputs: [{ name: '', type: 'uint256' }],
        gas: '900000'
    },
    {
        stateMutability: 'view',
        type: 'function',
        name: 'get_dy_underlying',
        inputs: [
            { name: 'i', type: 'uint256' },
            { name: 'j', type: 'uint256' },
            { name: '_dx', type: 'uint256' }
        ],
        outputs: [{ name: '', type: 'uint256' }],
        gas: '20256'
    }
];
exports.CURVE_WETH_ERC20_POOL_ABI = [
    ...CURVE_SHARED_POOL_ABI,
    {
        stateMutability: 'view',
        type: 'function',
        name: 'get_dy',
        inputs: [
            { name: 'i', type: 'uint256' },
            { name: 'j', type: 'uint256' },
            { name: 'dx', type: 'uint256' }
        ],
        outputs: [{ name: '', type: 'uint256' }]
    },
    {
        stateMutability: 'payable',
        type: 'function',
        name: 'exchange',
        inputs: [
            { name: 'i', type: 'uint256' },
            { name: 'j', type: 'uint256' },
            { name: 'dx', type: 'uint256' },
            { name: 'min_dy', type: 'uint256' }
        ],
        outputs: [{ name: '', type: 'uint256' }],
        gas: '16729579'
    },
    {
        stateMutability: 'payable',
        type: 'function',
        name: 'exchange',
        inputs: [
            { name: 'i', type: 'uint256' },
            { name: 'j', type: 'uint256' },
            { name: 'dx', type: 'uint256' },
            { name: 'min_dy', type: 'uint256' },
            { name: 'use_eth', type: 'bool' }
        ],
        outputs: [{ name: '', type: 'uint256' }]
    },
    {
        stateMutability: 'payable',
        type: 'function',
        name: 'exchange',
        inputs: [
            { name: 'i', type: 'uint256' },
            { name: 'j', type: 'uint256' },
            { name: 'dx', type: 'uint256' },
            { name: 'min_dy', type: 'uint256' },
            { name: 'use_eth', type: 'bool' },
            { name: 'receiver', type: 'address' }
        ],
        outputs: [{ name: '', type: 'uint256' }]
    },
    {
        stateMutability: 'payable',
        type: 'function',
        name: 'exchange_underlying',
        inputs: [
            { name: 'i', type: 'uint256' },
            { name: 'j', type: 'uint256' },
            { name: 'dx', type: 'uint256' },
            { name: 'min_dy', type: 'uint256' }
        ],
        outputs: [{ name: '', type: 'uint256' }]
    },
    {
        stateMutability: 'payable',
        type: 'function',
        name: 'exchange_underlying',
        inputs: [
            { name: 'i', type: 'uint256' },
            { name: 'j', type: 'uint256' },
            { name: 'dx', type: 'uint256' },
            { name: 'min_dy', type: 'uint256' },
            { name: 'receiver', type: 'address' }
        ],
        outputs: [{ name: '', type: 'uint256' }]
    }
];
exports.CURVE_ETHXERC20_ABI = [
    ...CURVE_SHARED_POOL_ABI,
    {
        name: 'get_dy',
        outputs: [{ type: 'uint256', name: '' }],
        inputs: [
            { type: 'int128', name: 'i' },
            { type: 'int128', name: 'j' },
            { type: 'uint256', name: 'dx' }
        ],
        stateMutability: 'view',
        type: 'function',
        gas: '2654541'
    },
    {
        name: 'exchange',
        outputs: [{ type: 'uint256', name: '' }],
        inputs: [
            { type: 'int128', name: 'i' },
            { type: 'int128', name: 'j' },
            { type: 'uint256', name: 'dx' },
            { type: 'uint256', name: 'min_dy' }
        ],
        stateMutability: 'payable',
        type: 'function',
        gas: '2810134'
    }
];
exports.CURVE_ETHXERC20_256_ABI = [
    ...CURVE_SHARED_POOL_ABI,
    {
        stateMutability: 'payable',
        type: 'function',
        name: 'exchange',
        inputs: [
            { name: 'i', type: 'uint256' },
            { name: 'j', type: 'uint256' },
            { name: 'dx', type: 'uint256' },
            { name: 'min_dy', type: 'uint256' }
        ],
        outputs: [{ name: '', type: 'uint256' }],
        gas: '16775598'
    },
    {
        stateMutability: 'payable',
        type: 'function',
        name: 'exchange',
        inputs: [
            { name: 'i', type: 'uint256' },
            { name: 'j', type: 'uint256' },
            { name: 'dx', type: 'uint256' },
            { name: 'min_dy', type: 'uint256' },
            { name: 'use_eth', type: 'bool' }
        ],
        outputs: [{ name: '', type: 'uint256' }],
        gas: '16775598'
    },
    {
        stateMutability: 'payable',
        type: 'function',
        name: 'exchange_underlying',
        inputs: [
            { name: 'i', type: 'uint256' },
            { name: 'j', type: 'uint256' },
            { name: 'dx', type: 'uint256' },
            { name: 'min_dy', type: 'uint256' }
        ],
        outputs: [{ name: '', type: 'uint256' }],
        gas: '16775396'
    },
    {
        stateMutability: 'view',
        type: 'function',
        name: 'get_dy',
        inputs: [
            { name: 'i', type: 'uint256' },
            { name: 'j', type: 'uint256' },
            { name: 'dx', type: 'uint256' }
        ],
        outputs: [{ name: '', type: 'uint256' }],
        gas: '4577515'
    }
];
//# sourceMappingURL=abi.js.map