import { ChainId } from '../../../constants'

/**
 * A platform to which Swapr can route through.
 */
export class RoutablePlatform {
  public static readonly ZEROX = new RoutablePlatform([ChainId.MAINNET], '0x')
  public static readonly CURVE = new RoutablePlatform([ChainId.ARBITRUM_ONE, ChainId.XDAI], 'Curve')
  public static readonly GNOSIS_PROTOCOL = new RoutablePlatform([ChainId.MAINNET, ChainId.XDAI], 'COW')

  public readonly chainIds: ChainId[]
  public readonly name: string

  public constructor(chainIds: ChainId[], name: string) {
    this.chainIds = chainIds
    this.name = name
  }

  public supportsChain(chainId: ChainId): boolean {
    return this.chainIds.indexOf(chainId) >= 0
  }
}
