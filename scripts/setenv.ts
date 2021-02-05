// const { writeFile } = require('fs');
// const { argv } = require('yargs');
// // read environment variables from .env file
// require('dotenv').config();
// // read the command line arguments passed with yargs
// const environment = argv.environment;

// const isProduction = environment === 'prod';

// if (!process.env.API_URL) {
//   console.error('All the required environment variables were not provided!');
//   process.exit(-1);
// }

// const targetPath = isProduction
//   ? `./src/environments/environment.prod.ts`
//   : `./src/environments/environment.ts`;
// // we have access to our environment variables
// // in the process.env object thanks to dotenv
// const environmentFileContent = `
// export const environment = {
//    production: ${isProduction},
//    baseUrl: "${process.env.API_URL}"
// };
// `;
// // write the content to the respective file
// writeFile(targetPath, environmentFileContent, function (err) {
//   if (err) {
//     console.log(err);
//   }
//   console.log(`Wrote variables to ${targetPath}`);
// });

const { writeFile } = require('fs');
// Configure Angular `environment.ts` file path
const targetPath = './src/environments/environment.prod.ts';
// Load node modules
require('dotenv').config();

if (!process.env.API_URL) {
  console.error('All the required environment variables were not provided!');
  process.exit(-1);
}

// `environment.ts` file structure
const envConfigFile = `export const environment = {
   production: true,
   baseUrl: "${process.env.API_URL}"
};`;

console.log(
  'The file `environment.ts` will be written with the following content: \n'
);
console.log(envConfigFile);
writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(
      `Angular environment.ts file generated correctly at ${targetPath} \n`
    );
  }
});
