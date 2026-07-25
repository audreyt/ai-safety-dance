#!/usr/bin/env node
import { buildSite } from '../src/site/build.ts';

const built = await buildSite();
for (const file of built) console.log(`built ${file}`);
