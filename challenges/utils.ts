import {readFileSync, writeFileSync} from 'fs';

export async function inputSteam(path): Promise<string> {
  if (!path) throw new Error('Unimplemented'); //TODO: pipe from stdin

  return readFileSync(path, 'utf8');
}

export async function outputStream(data, path): Promise<void> {
  if (!path) throw new Error('Unimplemented'); //TODO: pipe to stdout

  return writeFileSync(path, data);
}