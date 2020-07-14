import { parallel, task } from 'gulp';
import { cleanUpDistFolder } from './build/gulp/clean-up-dist-folder.task';
import { compileCommonJs } from './build/gulp/compile-commonjs.task';
import { compileEsm2015 } from './build/gulp/compile-esm2015.task';
import { compileTypings } from './build/gulp/compile-typings.task';
import { compileUmd } from './build/gulp/compile-umd.task';

task('build:compile-all', parallel(compileEsm2015(), compileUmd(), compileCommonJs(), compileTypings()));
task('build:clean-up', cleanUpDistFolder);
