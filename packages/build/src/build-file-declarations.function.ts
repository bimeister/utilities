import { CompilerOptions, createProgram, EmitResult, Program } from 'typescript';

export function buildFileDeclarations(sourceFilePaths: string[]): EmitResult {
  const options: CompilerOptions = {
    emitDeclarationOnly: true,
    declaration: true,
    outDir: './dist/',
    removeComments: false,
    sourceMap: false
  };

  const compilerProgram: Program = createProgram(sourceFilePaths, options);
  return compilerProgram.emit();
}
