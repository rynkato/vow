import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleRequest(variables: { [key: string]: any }) {
  const errors: string[] = [];

  Object.keys(variables).forEach((key) => {
    if (
      variables[key] === undefined ||
      variables[key] === null ||
      variables[key] === ""
    ) {
      errors.push(key);
    }
  });

  if (errors.length > 0) {
    return {
      status: false,
      message: `The following fields do not exist or are empty: ${errors.join(", ")}`,
    };
  }

  return { status: true };
}
