import AbiGenerator from 'ethereum-abi-types-generator/dist/converters/typescript/abi-generator.js'
import fs from 'fs'

interface Input {
    [name: string]: {
        file: string
        contractAddress?: string
    }
}

export const genAbiTypes = (input: Input) => {
    let content = ''
    for (const [name, { file, contractAddress }] of Object.entries(input)) {
        //@ts-ignore
        const generator = new AbiGenerator.default({
            provider: 'ethers' as any,
            abiFileLocation: file,
        })
        const generatedAbiPath = './src/generated/abi.ts';
        fs.mkdirSync('./src/generated', { recursive: true })
        //@ts-ignore
        generator.buildOutputLocation = () => {
            return generatedAbiPath
        }
        generator.generate()
        const nameUppercase = name.charAt(0).toUpperCase() + name.slice(1)
        let contents = fs.readFileSync(generatedAbiPath, 'utf8')
        contents = contents.split('\n').filter(x => !x.includes("'ethers") && !x.includes('ethereum-abi-types-generator')).join('\n')
        contents += `type BigNumberish = string | number | bigint; type BigNumber = string | number | bigint; type ContractTransaction = \`0x\${string}\`; type EthersContractContext<T, T2, T3> = any; type AbiEventsContext = any;`

        contents += /* ts */ `
type TransformFn<T extends (...args: any) => any> = (args: Parameters<T>) => ReturnType<T>

export type WriteMethods = {
  [K in keyof Abi as Awaited<ReturnType<Abi[K]>> extends ContractTransaction ? K : never]: TransformFn<Abi[K]>
}

export type ReadMethods = {
  [K in keyof Abi as K extends keyof WriteMethods ? never : K]: TransformFn<Abi[K]>
}

export type ${nameUppercase}AbiParams = {
[K in keyof Abi]: Abi[K] extends (...args: any) => any ? Parameters<Abi[K]> : never
}
        `// end

        contents = contents.replace('type AbiMethodNames', `type ${nameUppercase}AbiMethodNames`).replaceAll('interface Abi', `interface ${nameUppercase}Abi`).replaceAll('WriteMethods', `${nameUppercase}WriteMethods`).replaceAll('ReadMethods', `${nameUppercase}ReadMethods`)
        fs.writeFileSync(generatedAbiPath, contents)
    }
}
