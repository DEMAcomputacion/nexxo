import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    sourceType: 'database',
    url: process.env.DATABASE_URL,
  },
});
