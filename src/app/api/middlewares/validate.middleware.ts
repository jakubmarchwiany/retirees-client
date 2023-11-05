import Ajv, { DefinedError, Schema } from "ajv";

const ajv = new Ajv();

async function validate<T>(req: Request, schema: Schema): Promise<T> {
	const body = (await req.json()) as T;
	const validate = ajv.compile(schema);

	const isValid = validate(body);

	if (isValid) {
		return body;
	} else {
		const errors = validate.errors as DefinedError[];

		const errorMessage = "Validation failed. Errors: " + errors[0].message;

		throw new Error(errorMessage);
	}
}

export { validate };
