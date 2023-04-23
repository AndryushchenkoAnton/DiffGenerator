import path from 'node:path';
import process from 'node:process';

const makePath = (filePath) => path.resolve(process.cwd(), filePath);

export default makePath;
