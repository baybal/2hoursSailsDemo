module.exports = {
	friendlyName: 'Signup',
	description: 'Sign up for a new user account.',
	extendedDescription: `This creates a new user record in the database, signs in the requesting user agent
by modifying its [session](https://sailsjs.com/documentation/concepts/sessions), and
(if emailing with Mailgun is enabled) sends an account verification email.

If a verification email is sent, the new user's account is put in an "unconfirmed" state
until they confirm they are using a legitimate email address (by clicking the link in
the account verification message.)`,
	inputs: {
		emailAddress: {
			required: true,
			type: 'string',
			isEmail: true,
			description: 'The email address for the new account, e.g. m@example.com.',
			extendedDescription: 'Must be a valid email address.',
		},
		password: {
			required: false,
			type: 'string',
			maxLength: 200,
			example: 'passwordlol',
			description: 'The unencrypted password to use for the new account.'
		},
		firstName: {
			required: true,
			type: 'string'
		},
		lastName: {
			required: true,
			type: 'string'
		},
		phone: {
			required: true,
			type: 'string'
		}
	},
	exits: {
		invalid: {
			responseType: 'badRequest',
			description: 'The provided fullName, password and/or email address are invalid.',
			extendedDescription: 'If this request was sent from a graphical user interface, the request ' + 'parameters should have been validated/coerced _before_ they were sent.'
		},
		emailAlreadyInUse: {
			statusCode: 409,
			description: 'The provided email address is already in use.',
		},
	},
	fn: async function(inputs, exits) {
		var newEmailAddress = inputs.emailAddress.toLowerCase();
		// Build up data for the new user record and save it to the database.
		console.log(inputs);
		// (Also use `fetch` to retrieve the new ID so that we can use it below.)
		var newUserRecord = await Test.create({
			emailAddress: newEmailAddress,
			password: inputs.password&&await sails.stdlib('passwords').hashPassword(inputs.password),
			firstName: inputs.firstName,
			lastName: inputs.lastName,
			phone: inputs.phone
		}).intercept('E_UNIQUE', 'emailAlreadyInUse').intercept({ name: 'UsageError' }, 'invalid').fetch();
		// If billing feaures are enabled, save a new customer entry in the Stripe API.
		// Then persist the Stripe customer id in the database.
		// Store the user's new id in their session.
		this.req.session.userId = newUserRecord.id;
		// Since everything went ok, send our 200 response.
		return exits.success();
	}
};
