var express = require('express');
var router = express.Router();
var utilities = require('../utilities');

router.get('/', async function(req, res){
	
	//Prepare an alert. (Used w/ url /?alert=(alert))
	if(req.query) var alert = req.query.alert || null;
	
	res.render('./index', {
		title: "Temp Home",
		alert: alert
	});
});

/**
 * Main homepage.
 * @url /
 * @view /index
 */
router.get('/TEMP', async function(req, res) {
	
	//Prepare an alert. (Used w/ url /?alert=(alert))
	if(req.query)
		var alert = req.query.alert || null;
	
	var teams = await utilities.find("currentteams", {}, {sort:{team_number: 1}});
	
		
	//If no current teams, then render page without team list.
	if(!teams || !teams[0]){
		res.log(e || "No teams listed yet");
		return res.render('./index', { 
			title: 'Home',
			alert: alert
		});
	}
	
	//get list of just team numbers
	var teamNumbers = [];
	
	for(var i in teams){
		teamNumbers[i] = teams[i].team_number;
	}
	
	//Render page w/ team list
	res.render('./index', { 
		title: 'Home',
		teamList: teamNumbers,
		alert: alert
	});
});

/**
 * Simple logout link. (if I put it in login, url would be /login/logout... and cmon that's silly)
 * @url /logout
 * @redirect /
 */
router.get("/logout", function(req, res) {
	
	//Logs out user with message
	req.logout();
	
	//destroy session
	req.session.destroy(function (err) {
		if (err) { return next(err); }
		//Redirect user
		res.redirect('/')
	});
	
	//Redirects user
	//res.redirect('/')
});

module.exports = router;