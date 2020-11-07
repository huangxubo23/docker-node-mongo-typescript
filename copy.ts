import * as shell from 'shelljs';

const isDev = process.env.NODE_ENV === 'development';
console.info('==copy==', process.env.NODE_ENV);

shell.cp('-R', 'src/views', 'dist/views');

isDev && shell.cp('-R', 'src/swagger-ui', 'dist/swagger-ui');