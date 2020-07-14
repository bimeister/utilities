import type { TaskFunction } from 'gulp';
import { executeCommandWithLogging } from '../../src/lib/terminal/execute-command-with-logging.function';

export function compileCommonJs(): TaskFunction {
  const tsConfigSuffix: string = 'commonjs';
  const command: string = `tsc --project tsconfig.lib-${tsConfigSuffix}.json`;

  return (onDone: VoidFunction): void => {
    executeCommandWithLogging(command, {
      onDone,
      printDefaultOutput: true
    });
  };
}
