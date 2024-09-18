import del from 'del';

import dotenv from 'dotenv';
dotenv.config();

export default function clean() { return del([`./${process.env.DEST_DIR}/*`])};
