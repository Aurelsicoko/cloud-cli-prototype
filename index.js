import inquirer from 'inquirer';
import chalk from 'chalk';
import { Command } from 'commander'
import * as emoji from 'node-emoji'

const speedUp = false; // false or 1000
const program = new Command();

program
  .name('cloud-cli')
  .description('A CLI use Strapi Cloud')
  .version('1.0.0');

// Login
const login = () => {
  inquirer.prompt([{
    type: 'list',
      name: 'type',
      message: 'What\'s next?',
      choices: ['Sign up', 'Login', 'Skip']
  }]).then(answer => {
    console.log('');
    console.log('Opening browser at https://qa-strapi.us.auth0.com/activate?user_code=RCXN-KRCQ');
    console.log('');

    console.log('If a browser tab does not open automatically, please follow the next steps:');
    console.log('1. Open this url in your device:');
    console.log('2. Enter the following code: RCXN-KRCQ and confirm to login.');
    console.log('');
    setTimeout(() => { 
      console.log(chalk.green('Login successful'));
      setTimeout(() => {
        console.log('Congrats! You are now authenticated.');
        console.log('');
        fetchEmptyProject();
      }, 1000);
    }, 3000);     
  });
}

const createAccount = () => {
  const bold = "font-weight: bold";
  const normal = "font-weight: normal";

  console.log(`We can't find any auth credentials in your Strapi config.`);
  console.log(`Please log in or sign up.`);
  console.log('');
  console.log(`Create a ${chalk.bold('free account now')} and benefit from:`);
  console.log(`- ${chalk.magentaBright('✦blazing-fast✦')} deployment for your project`);
  console.log(`- ${chalk.blueBright('✦exclusive✦')} access to resources to make your project successful`);
  console.log(`- an ${chalk.yellowBright('✦awesome✦')} community and full enjoyment of Strapi's ecosystem`);
  console.log('');
  setTimeout(login, 1500);     
};

const fetchEmptyProject = () => {
  console.log(chalk.blueBright(emoji.emojify(':heavy_check_mark:  Fetching your projects...')));
  setTimeout(() => { 
    console.log(`You are just getting started, awesome!`);
    console.log(`We are firing up a Cloud instance just for you...`);
    console.log(emoji.emojify(`Let's start by creating your first Strapi app :fire:`));
    console.log('');
    createProject();
  }, 3000);     
};

const link = async() => {
  console.log(chalk.blueBright(emoji.emojify(':heavy_check_mark:  Fetching your projects...')));
  setTimeout(async () => { 
    const project = await inquirer.prompt([{
      type: 'list',
        name: 'name',
        message: 'Select one of the projects to link',
        choices: ['Landing page Strapi 5', 'Marketing website', 'Marketing blog']
    }]);
    setTimeout(async () => { 
      console.log('');
      console.log(chalk.green(`"${project.name}" is now linked to this Strapi app.`));
      console.log(`You can use the \`deploy\` command to deploy it on production.`);
    }, 2000);
  }, 3000);
};

const pull = async() => {
  console.log(chalk.blueBright(emoji.emojify(':heavy_check_mark:  Pulling environment variables from Cloud...')));
  setTimeout(async () => { 
    console.log(chalk.green(`Environment variables are up-to-date`));
  }, 1500);
};

const createProject = async () => {
  const name = await inquirer.prompt([{
    type: 'input',
    name: 'name',
    default: 'My Strapi Project',
    message: 'Your project name',
  }]);

  const typescript = await inquirer.prompt([{
    type: 'list',
    name: 'name',
    default: 'JavaScript',
    message: 'Your preferred language',
    choices: ['TypeScript', 'JavaScript']
  }]);

  console.log('');
  console.log(chalk.blueBright('Creating your project... (it might takes a few minutes)'));
  setTimeout(() => {
    console.log(chalk.green('Project created successfully'));
    setTimeout(() => {
      console.log(chalk.blueBright('Starting the server...'));
      setTimeout(() => {
        console.log('');
        console.log(chalk.bold('One more thing...'));
        console.log(chalk.grey('Create your first administrator 💻 by going to the administration panel at:'));
        console.log(chalk.bold('http://localhost:1337/admin'));
        console.log();
        console.log(chalk.grey('To access the server ⚡️, go to:'));
        console.log(chalk.bold('http://localhost:1337/'));
        console.log();
      }, 3000);
    }, 1500);
  }, 10000);
}

const deploy = async () => {
  const data = await inquirer.prompt([{
    type: 'list',
    name: 'data',
    default: 'No',
    choices: ['Yes', 'No'],
    message: 'Do you want to transfer your local data to production?',
  }]);

  setTimeout(() => { 
    console.log(chalk.blueBright(emoji.emojify(':heavy_check_mark:  Pulling project configurations')));
    setTimeout(() => { 
      console.log(chalk.blueBright(emoji.emojify(':heavy_check_mark:  Checking git repository')));
      setTimeout(() => { 
        console.log(chalk.blueBright(emoji.emojify(':tractor: Building image...')));
        setTimeout(() => { 
          console.log(chalk.blueBright(emoji.emojify(':rocket: Deployment in progress...')));
          setTimeout(() => { 
            console.log(chalk.green(emoji.emojify(':white_check_mark: Deployment successful (24.5s)')));

            if (data.data === 'Yes') {
              setTimeout(() => { 
                console.log(chalk.blueBright(emoji.emojify(':heavy_check_mark:  Transfering data...')));
                setTimeout(() => { 
                  console.log(chalk.green(emoji.emojify(':white_check_mark: Data transfered (4.1s)')));
                  console.log('')
                  console.log(chalk.green(`Your app is available at https://jungle-speaker-plant.strapiapp.com`));
                  console.log('')
                }, speedUp||4000);
              }, speedUp||1000);
            } else {
              setTimeout(() => { 
                console.log('')
                console.log(chalk.green(`Your app is available at https://jungle-speaker-plant.strapiapp.com`));
                console.log('')
              }, speedUp||4000);
            }
          }, speedUp||10000);
        }, speedUp||10000);
      }, speedUp||1500);
    }, speedUp||1500);
  }, speedUp||1500);
}

program.command('login')
  .description('Log In/Sign Up to Strapi Cloud')
  .action(login);

program.command('create')
  .description('Create a Strapi project')
  .action(createAccount);

program.command('deploy')
  .description('Deploy an existing Strapi project')
  .action(deploy);

program.command('link')
  .description('Link a Cloud project to an existing Strapi project')
  .action(link);

program.command('pull')
  .description('Pull a Cloud project environment variable into an existing Strapi project')
  .action(pull);

program.parse();

