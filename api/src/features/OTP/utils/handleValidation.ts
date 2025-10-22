import { validationResult } from "express-validator";
import { Errors } from "../../../utils/Enums/errorENums.ts";

const handleValidation = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return first error code from your messages (or map them)
    const first = errors.array({ onlyFirstError: true })[0];
    res.status(400).json({ code: first?.msg ?? Errors.Err012, data: null });
    return true; // controller should stop
  }

  return false; // no errors
};

export { handleValidation };
