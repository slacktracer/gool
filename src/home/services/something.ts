export default (): number => 42;

export const y = (): string => "yay";

export const z = (): void => {
  let i = 0;
  i++;
  i;
};

export function notTest(value: number, other: string): string {
  value;
  other;
  return "test";
}

async function someAsyncFunction(): Promise<boolean> {
  return true;
}

someAsyncFunction().then((result) => console.log(result));
