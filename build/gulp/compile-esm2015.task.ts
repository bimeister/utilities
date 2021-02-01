import type { TaskFunction } from 'gulp';
import { executeCommandWithLogging } from '../../src/lib/terminal/execute-command-with-logging.function';

export function compileEsm2015(): TaskFunction {
  const tsConfigSuffix: string = 'esm2015';
  const command: string = `tsc --project tsconfig.lib-${tsConfigSuffix}.json`;

  return (onDone: VoidFunction): void => {
    executeCommandWithLogging(command, {
      onDone,
      printDefaultOutput: true
    });
  };
}
