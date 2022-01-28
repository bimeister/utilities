import { CompilerOptions, createProgram, EmitResult, Program } from 'typescript';

export function buildFileDeclarations(
  sourceFilePaths: string[],
  additionalOptions: Partial<CompilerOptions> = {}
): EmitResult {
  const options: CompilerOptions = {
    outDir: './dist/',
    removeComments: false,
    ...additionalOptions,
    emitDeclarationOnly: true,
    declaration: true,
    sourceMap: false
  };

  const compilerProgram: Program = createProgram(sourceFilePaths, options);
  return compilerProgram.emit();
}
