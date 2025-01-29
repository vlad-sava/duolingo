import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import 'dotenv/config';

import * as schema from "./schema"



console.log("mesaj ", process.env.DATABASE_URL)
const sql = neon(process.env.DATABASE_URL!);
// @ts-expect-error we'll see
const db = drizzle( {client: sql}, {schema: schema});

export default db
