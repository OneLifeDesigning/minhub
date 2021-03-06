const nodemailer = require('nodemailer');

const host = process.env.HOST || 'http://localhost:3000';
const user = process.env.NM_USER;

const transport = nodemailer.createTransport(
	{
		service: 'Gmail',
		auth: {
			user: user,
			pass: process.env.NM_PASS
		}
	}
)

module.exports.sendValidationEmail = (email, activationToken, name) => {
	transport.sendMail({
		to: email,
		from: `Minhub project demo <${user}>`,
		subject: 'Activate your account please!',
		html: `
			<h1>Hi ${name}</h1>
			<p>Click on the button below to activate your account ❤️</p>
			<a href="${host}/validate/${activationToken}" style="padding: 10px 20px; color: white; background-color: red; border-radius: 0px;">Click here</a>
		`
	})
}

module.exports.changePasswordEmail = (email, activationToken, name) => {
	transport.sendMail({
		to: email,
		from: `Minhub project demo <${user}>`,
		subject: 'Change your password!',
		html: `
			<h1>Hi ${name}</h1>
			<p>Click on the button below to change your password ❤️</p>
			<a href="${host}/changepassword/${activationToken}" style="padding: 10px 20px; color: white; background-color: red; border-radius: 0px;">Click here</a>
		`
	})
}
