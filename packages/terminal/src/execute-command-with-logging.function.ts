import { exec, ExecException } from 'child_process';
import { error, info, warn } from 'console';
import { isNil } from 'packages/common';
import type { Nullable } from 'packages/types';

export function executeCommandWithLogging(
  command: string,
  {
    onDoneMessage,
    onDone,
    printDefaultOutput
  }: {
    onDoneMessage?: string;
    onDone: VoidFunction;
    printDefaultOutput: boolean;
  }
): void {
  try {
    exec(command, (execException: Nullable<ExecException>, stdout: string, stderr: string) => {
      if (isExecException(execException)) {
        throw execException.message;
      }

      if (!isNil(stderr)) {
        warn('\n' + stderr);
      }

      if (printDefaultOutput) {
        info(stdout);
      }

      if (!isNil(onDoneMessage)) {
        info(onDoneMessage);
      }

      onDone();
    }).stdout.on('data', stdout => {
      info(stdout);
    });
  } catch (exception) {
    error(exception);
  }
}

function isExecException(execException: Nullable<ExecException>): execException is ExecException {
  return !isNil(execException) && 'message' in execException && !isNil(execException.message);
}
