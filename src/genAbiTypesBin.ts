#!/usr/bin/env node

import { genAbiTypes } from './genAbiTypes.js'
import fs from 'fs'

// read contracts.json
if (process.env.INIT_CWD) {
    process.chdir(process.env.INIT_CWD!)

}

const input = JSON.parse(fs.readFileSync('./contracts.json', 'utf8'))

genAbiTypes(input)
