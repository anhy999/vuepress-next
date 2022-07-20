import { fs } from '@vuepress/utils'

/**
 * Resolve version of vuepress app
 */
export const resolveAppVersion = async (): Promise<string> => {
  const pkgJson = await fs.readJSON('../../package.json')
  return pkgJson.version
}
