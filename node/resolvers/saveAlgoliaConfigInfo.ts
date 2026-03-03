import type { AlgoliaConfigBinding } from './AlgoliaConfigInfoBinding'

/**
 * Save the Algolia config properties in vbase
 */
export const saveAlgoliaConfigInfo = async (
  _event: any,
  args: {
    config: AlgoliaConfigBinding
  },
  ctx: Context
) => {
  const { config } = args

  await ctx.clients.vbase.saveJSON('account.algolia', 'configs', config)

  return config
}
