import { NullableToNonNullable } from "./helpers";
import { logger } from "./logger";

/**
 * A type of error that prints nice message instead of stack trace in command line tools.
 */
export class CommandLineError extends Error {
    static wrap(error: any) {
        return error?.message ? new CommandLineError(error.message) : error;
    }

    static replace(error: any, message: string) {
        logger.error(`Error replaced with command line error "${message}":`, error);
        return new CommandLineError(message);
    }
}

/**
 * Check that `condition` is true and throw otherwise.
 */
export function assertCmd(condition: boolean, errorMessage: string): asserts condition {
    if (!condition) {
        throw new CommandLineError(errorMessage);
    }
}

/**
 * Check if value is non-null and throw otherwise.
 * Returns guaranteed non-null value.
 */
export function requireNotNullCmd<T>(x: T, errorMessage: string): NullableToNonNullable<T> {
    if (x != null) return x as NonNullable<T>;
    throw new CommandLineError(errorMessage);
}

/**
 * Check if value is non-null and throw otherwise.
 */
export function assertNotNullCmd<T>(x: T, errorMessage: string): asserts x is NonNullable<T> {
    if (x == null) {
        throw new CommandLineError(errorMessage);
    }
}
