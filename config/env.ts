import * as fs from 'fs'
import * as path from 'path'
const isProd = process.env.NODE_ENV === 'production'

const parseEnv = () => {
  const [localEnv, prodEnv] = [path.resolve('.env'), path.resolve('.env.prod')]

  if (!fs.existsSync(localEnv) && !fs.existsSync(prodEnv)) {
    throw new Error('缺少环境配置文件')
  }

  const filePath = isProd && fs.existsSync(prodEnv) ? prodEnv : localEnv

  return {
    path: filePath
  }
}

export default parseEnv()