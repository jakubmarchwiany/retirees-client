import Ajv, { DefinedError, Schema } from "ajv";

const ajv = new Ajv();

function validateObject<T>(object: unknown, schema: Schema): T {
	const validate = ajv.compile(schema);

	const isValid = validate(object);

	if (isValid) {
		return object as T;
	} else {
		const errors = validate.errors as DefinedError[];

		const errorMessage = "Validation failed. Errors: " + errors[0].message;

		throw new Error(errorMessage);
	}
}

export { validateObject };
