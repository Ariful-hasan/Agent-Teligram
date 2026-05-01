require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/userMode');
const Agent = require('../models/agentModel');

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB for seeding...');

    // Clear existing users to avoid duplicates
    await User.deleteMany({});
    await Agent.deleteMany({});
    console.log('Cleared existing Users and Agents.');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    // 1. Create a Regular User
    const testUser = new User({
      name: 'Test Client',
      email: 'client@test.com',
      password: hashedPassword,
      type: 'U'
    });

    // 2. Create an Agent
    const testAgent = new Agent({
      name: 'Test Agent',
      userid: 'agent007', // Agent uses userid instead of email in your model
      password: hashedPassword,
      type: 'A'
    });

    await testUser.save();
    await testAgent.save();

    console.log('Seeding successful!');
    console.log('-------------------');
    console.log('Client Login -> Email: client@test.com | Password: password123');
    console.log('Agent Login  -> UserID: agent007      | Password: password123');
    console.log('-------------------');

    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seedUsers();
