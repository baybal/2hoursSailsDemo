/**
 * TestController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
	/**
	 * `TestController.adduser()`
	 */
	checkAuth: function(req, res) {
		console.log(req.mef);
		return res.json({
			lala: 'bubu'
		});
	},
	hi: function(req, res) {
		return res.send('Hi there!');
	},
	bye: function(req, res) {
		return res.redirect('http://www.sayonara.com');
	}
};
