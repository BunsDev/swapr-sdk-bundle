// ABIs

// 3pool ABI which has USDC, USDT and WXDAI
export const CURVE_3POOL_ABI = JSON.stringify([
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
    ]
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
])

export const CURVE_ROUTER_ABI = JSON.stringify([
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
    stateMutability: 'payable',
    type: 'function',
    name: 'exchange',
    inputs: [
      { name: '_amount', type: 'uint256' },
      { name: '_route', type: 'address[6]' },
      { name: '_indices', type: 'uint256[8]' },
      { name: '_min_received', type: 'uint256' }
    ],
    outputs: []
  }
])

export const REGISTRY_EXCHANGE_ABI = JSON.stringify([
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
])

export const ADDRESS_PROVIDER_ABI = JSON.stringify([
  {
    name: 'get_address',
    outputs: [{ type: 'address', name: '' }],
    inputs: [{ type: 'uint256', name: '_id' }],
    stateMutability: 'view',
    type: 'function',
    gas: '1308'
  }
])

export const CURVE_CRYPTO_SWAP_ABI = JSON.stringify([
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
    gas: '57522'
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
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'coins',
    inputs: [{ name: 'arg0', type: 'uint256' }],
    outputs: [{ name: '', type: 'address' }],
    gas: '2835'
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'underlying_coins',
    inputs: [{ name: 'arg0', type: 'uint256' }],
    outputs: [{ name: '', type: 'address' }],
    gas: '2871'
  }
])