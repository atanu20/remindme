const employeeTable = require('../models/user');
const msgTable = require('../models/message');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmailGrid = require('./mailSendGrid');
const schedule = require('node-schedule');

// const date = new Date(2022, 06, 26, 19, 53, 0);
schedule.scheduleJob('*/2 * * * *', () => {
  msgTable.find({ isStatus: false }, (err, reminderList) => {
    console.log(reminderList);
    if (err) {
      console.log(err);
    }
    if (reminderList) {
      reminderList.forEach((reminder) => {
        if (!reminder.isStatus) {
          console.log(reminder._id + ' ' + reminder.isStatus);
          const now = new Date();
          if (
            now - new Date(reminder.sendTime) == 1 ||
            now - new Date(reminder.sendTime) == 0
          ) {
            msgTable.findByIdAndUpdate(
              reminder._id,
              { isStatus: true },
              (err, remindObj) => {
                if (err) {
                  console.log(err);
                }
                // const user = employeeTable.findOne({ userId: reminder.userId });
                // console.log(user);
                sendEmailGrid(
                  reminder.userName,
                  reminder.email,
                  reminder.title,
                  reminder.message,
                  'actvation'
                );
              }
            );
          }
        }
      });
    }
  });
});

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      // console.log(req.body);
      const user = await employeeTable.findOne({ email });
      if (user)
        return res.json({ success: false, msg: 'This email already exists.' });

      if (password.length < 6)
        return res.json({
          success: false,
          msg: 'Password must be at least 6 characters.',
        });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new employeeTable({
        name,
        email,
        password: passwordHash,
      });

      await newUser.save();

      res.json({
        success: true,
        msg: 'Account has been created!',
        newUser,
      });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await employeeTable.findOne({ email });
      if (!user)
        return res.json({ success: false, msg: 'This email does not exist.' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.json({ success: false, msg: 'Password is incorrect.' });

      const access_token = createAccessToken({ id: user._id });

      res.json({
        success: true,
        access_token,
      });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  getUserInfor: async (req, res) => {
    try {
      const user = await employeeTable
        .findById(req.user.id)
        .select('-password');

      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  postMsg: async (req, res) => {
    try {
      const newmsg = new msgTable(req.body);

      await newmsg.save();

      res.json({
        success: true,
        msg: 'Message added Successfully',
        newmsg,
      });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },

  getAllMsgs: async (req, res) => {
    try {
      const usermsg = await msgTable
        .find({
          userId: req.user.id,
        })
        .sort({ date: -1 });

      res.json({ success: true, msgs: usermsg });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
  });
};

module.exports = userCtrl;

// const result = await jobTable.find({

//   $or: [{
//       employer_company_category: { '$in': ['Agri-tech', 'Artificial Intelligence'] }
//   }, {
//       $or: [{
//           tech_skills: { '$in': ['React', 'Node JS'] },
//       }, {
//           non_tech_skills: { '$in': ['Php', 'Next JS'] },
//       }]
//   }],

//   $or: [{
//       job_type: { '$in': ['Office', 'Remote'] }
//   }, {
//       job_location: { '$in': ['Bangalore', 'Kolkata'] }
//   }],

//   $or: [{
//       experience: { '$in': ['Entry Level/ Fresher'] }
//   }, {
//       no_employees: { '$in': ['101-500 Employees', '21-100 Employees'] }
//   }],

//   $and: [{
//       salary: { $gte: 7 }
//   }, {
//       salary: { $lte: 27 }
//   }]

// })
