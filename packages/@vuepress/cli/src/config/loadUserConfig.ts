import type { UserConfig } from './types'

/**
 * Load user config file
 */
export const loadUserConfig = async (
  userConfigPath?: string
): Promise<UserConfig> => {
  if (!userConfigPath) return {}

  try {
    const userConfigModule = await import(userConfigPath)
    return userConfigModule.default
  } catch {
    return {}
  }
}
