import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env' });

export default defineConfig({
  schema: 'db/schema.ts',
  out: './migrations',
  dialect: 'turso',
  dbCredentials: {
    url: "libsql://trade-lens-db-yerramsettiharisri.aws-us-east-1.turso.io",
    authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NDQ1NzI4MTcsImlkIjoiNGQ3YTBmZDAtNTc5NS00MjQzLThkYjYtNjhkMmM2ZmJmNWViIiwicmlkIjoiMGI5MWNjNTEtNjZkMC00YjcwLTkzYjUtMjY0NzY4Mzc1ZDM2In0.hHdH_Ar5TeGxa2jNp29yi_f3J4njtgEmMHFVai31XUF8xN6E92B-czBYpWXVYLugm-hMPmwpfH70sdK2T7lLBw",
  },
});
