const test                   = require('ava')
const Fs                     = require('fs')
const Path                   = require('path')
const Prettier               = require('prettier')
const { transformFileAsync } = require('@babel/core')

const fixtures = Path.join(__dirname, 'fixtures')
const pluginPath = Path.resolve(__dirname, '..')

function normalize (src) {
    return Prettier.format(src.trim(), { parser: 'babel' })
}

for (const name of Fs.readdirSync(fixtures)) {
    const sourcePath = Path.resolve(fixtures, name, 'index.js')
    const configPath = Path.resolve(fixtures, name, 'config.json')
    const config = Fs.existsSync(configPath) ? require(configPath) : {}
    const plugin = [pluginPath, config]

    test(name, async t => {
        const { code: transpiled } = await transformFileAsync(sourcePath, {
            plugins: [plugin],
            babelrc: false,
        })

        const got = normalize(transpiled)

        t.snapshot(got, name)
    })
}
