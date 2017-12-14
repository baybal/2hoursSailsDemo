/**
 * Test.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {

		//  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
		//  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
		//  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

		emailAddress: {
			type: 'string',
			required: true,
			unique: true,
			isEmail: true,
			maxLength: 200,
			example: 'carol.reyna@microsoft.com'
		},

		firstName: {
			type: 'string',
			required: true,
			description: 'first name',
			maxLength: 120,
			example: 'Lisa Microwave van der Jenny'
		},
		lastName: {
			type: 'string',
			required: true,
			description: 'last name',
			maxLength: 120,
			example: 'Lisa Microwave van der Jenny'
		},
		phone: {
			type: 'string',
			required: true,
			description: 'phone',
			maxLength: 120,
			example: '+86-154-4444-4444'
		},
		isAdmin: {
			type: 'boolean'
		},

		password: {
			type: 'string',
			required: false,
			description: 'Securely hashed representation of the user\'s login password.',
			protect: true,
			example: '2$28a8eabna301089103-13948134nad'
		},
		//  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
		//  ║╣ ║║║╠╩╗║╣  ║║╚═╗
		//  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


		//  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
		//  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
		//  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

	},

};
