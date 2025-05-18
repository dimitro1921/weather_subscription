const { Subscription } = require('../models');
const { generateToken } = require('../utils/tokenGenerator');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io', // або інший тестовий SMTP
  port: 2525,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

exports.subscribe = async (req, res) => {
  console.log('🧾 req.body:', req.body);
  const { email, city, frequency } = req.body;

  if (!email || !city || !frequency) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const token = generateToken();

  try {
    const existing = await Subscription.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: 'Email already subscribed' });
    }

    await Subscription.create({ email, city, frequency, token });

    const confirmUrl = `${req.protocol}://${req.get('host')}/api/confirm/${token}`;

    await transporter.sendMail({
      from: 'weather@app.com',
      to: email,
      subject: 'Confirm your subscription',
      text: `Click to confirm: ${confirmUrl}`
    });

    return res.json({ message: 'Subscription created. Confirmation email sent.' });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.confirm = async (req, res) => {
  const { token } = req.params;

  const subscription = await Subscription.findOne({ where: { token } });
  if (!subscription) return res.status(404).json({ error: 'Token not found' });

  subscription.confirmed = true;
  await subscription.save();

  return res.json({ message: 'Subscription confirmed successfully' });
};

exports.unsubscribe = async (req, res) => {
  const { token } = req.params;

  const subscription = await Subscription.findOne({ where: { token } });
  if (!subscription) return res.status(404).json({ error: 'Token not found' });

  await subscription.destroy();

  return res.json({ message: 'Unsubscribed successfully' });
};
