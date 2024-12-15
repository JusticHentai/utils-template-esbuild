import { Options } from '@/types'

const defaults: Partial<Options> = {}

export default class Utils {
  options: Options

  constructor(options: Options) {
    this.options = { ...defaults, ...options }
    const a: any = {}

    const b = async () => {
      console.log('no')
    }

    console.log(a?.c, b)
  }
}
