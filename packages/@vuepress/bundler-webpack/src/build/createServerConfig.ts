import type { App } from '@vuepress/core'
import type * as Config from 'webpack-chain'
import { createBaseConfig } from '../config'
import type { WebpackBundlerOptions } from '../types'

export const createServerConfig = async (
  app: App,
  options: WebpackBundlerOptions
): Promise<Config> => {
  const isBuild = true
  const isServer = true

  const config = await createBaseConfig({
    app,
    options,
    isBuild,
    isServer,
  })

  // server output
  // remove after pages rendered
  config.output
    .path(app.dir.temp('.server'))
    .filename('app.js')
    .publicPath(app.options.base)
    .libraryTarget('commonjs2')

  // set target to node
  // vue-loader will use compiler-ssr internally
  config.target('node')

  // set externals
  // externalize vue in ssr mode, because we need to `require('vue')` in node side
  // for ssr usage, then we also need vue as peer-dependency when using pnpm
  config.externals(['vue'])

  // devtool
  config.devtool('source-map')

  // do not need to minimize server bundle
  config.optimization.minimize(false)

  // use internal vuepress-loader to handle SSR dependencies
  config.module
    .rule('vue')
    .test(/\.vue$/)
    .use('vuepress-loader')
    .before('vue-loader')
    .loader(require.resolve('./ssr/vuepressLoader'))
    .end()

  return config
}
