import type { GetAlgoliaConfigResponse } from './AlgoliaConfigInfoBinding'

/**
 * Load the Algolia config properties from VTex vbase
 */
export const getAlgoliaConfigInfo = async (
  _: unknown,
  __: unknown,
  ctx: Context
) => {
  const { clients } = ctx
  const { vbase } = clients

  try {
    const config: GetAlgoliaConfigResponse = await vbase.getJSON(
      'account.algolia',
      'configs'
    )

    return config
  } catch (e) {
    return {
      error: true,
      status: e?.response?.status,
      message: e?.response?.message,
    }
  }
}