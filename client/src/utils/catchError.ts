import { WrongTypeError, EmptyValueError, ValidationError } from "./customErrors";

// Put it include catch statement
const catchError = (error: unknown) => {
    if (error instanceof Error) return console.error(error.message);
    if (error instanceof (WrongTypeError || EmptyValueError || ValidationError)) console.error(error.name + ":", error.message, error.source);
}

export default catchError;