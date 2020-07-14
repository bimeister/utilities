import { task } from 'gulp';

import { cleanUpDistFolder } from './build/clean-up-dist-folder.task';
import { prepareDeployFolder } from './build/prepare-deploy-folder.task';

task('deploy:prepare', prepareDeployFolder);
task('build:clean-up', cleanUpDistFolder);
