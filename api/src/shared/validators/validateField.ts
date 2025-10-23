export type ValidationRule =
  | "required"
  | "email"
  | "number"
  | { minLength: number }
  | { maxLength: number }
  | { min: number }
  | { max: number }
  | ((value: any) => string | null); // custom function

export function validateField(
  value: any,
  ...rules: ValidationRule[]
): string[] {
  const errors: string[] = [];

  for (const rule of rules) {
    if (rule === "required") {
      if (value === undefined || value === null || value === "")
        errors.push(`Value is required.`);
    } else if (rule === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (typeof value !== "string" || !emailRegex.test(value))
        errors.push(`Value must be a valid email.`);
    } else if (rule === "number") {
      if (isNaN(Number(value))) errors.push(`Value must be a number.`);
    } else if (typeof rule === "object") {
      if (
        "minLength" in rule &&
        typeof value === "string" &&
        value.length < rule.minLength
      )
        errors.push(`Value must be at least ${rule.minLength} characters.`);

      if (
        "maxLength" in rule &&
        typeof value === "string" &&
        value.length > rule.maxLength
      )
        errors.push(`Value must be less than ${rule.maxLength} characters.`);

      if ("min" in rule && Number(value) < rule.min)
        errors.push(`Value must be at least ${rule.min}.`);

      if ("max" in rule && Number(value) > rule.max)
        errors.push(`Value must be less than ${rule.max}.`);
    } else if (typeof rule === "function") {
      const result = rule(value);
      if (result) errors.push(result);
    }
  }

  return errors;
}
