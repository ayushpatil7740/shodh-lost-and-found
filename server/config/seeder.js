const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Item = require('../models/Item');
const Claim = require('../models/Claim');
const Notification = require('../models/Notification');
const { connectDB, disconnectDB } = require('./db');

dotenv.config();

const seedData = async (isStandalone = false) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }

    console.log('🧹 Clearing existing database records...');
    await User.deleteMany();
    await Item.deleteMany();
    await Claim.deleteMany();
    await Notification.deleteMany();

    console.log('👥 Creating demo users...');
    const adminUser = await User.create({
      name: 'Campus Security Admin',
      email: 'admin@shodh.org',
      password: 'adminpassword123',
      phone: '+91 98765 43210',
      role: 'admin',
      bio: 'Official Campus Security & Lost-Found Desk Administrator',
    });

    const user1 = await User.create({
      name: 'Aarav Sharma',
      email: 'aarav@shodh.org',
      password: 'userpassword123',
      phone: '+91 91234 56789',
      role: 'user',
      bio: 'B.Tech Computer Science | Year 3',
    });

    const user2 = await User.create({
      name: 'Priya Patel',
      email: 'priya@shodh.org',
      password: 'userpassword123',
      phone: '+91 99887 76655',
      role: 'user',
      bio: 'Biotechnology Dept | Year 2',
    });

    const user3 = await User.create({
      name: 'Rohit Verma',
      email: 'rohit@shodh.org',
      password: 'userpassword123',
      phone: '+91 94455 66778',
      role: 'user',
      bio: 'Mechanical Engineering | Year 4',
    });

    console.log('📦 Creating sample lost and found items...');
    const items = await Item.create([
      {
        title: 'MacBook Pro 14" (Space Grey) in Black Sleeve',
        description:
          'Left my Space Grey MacBook Pro inside a dark grey felt sleeve on table 14 near the silent reading section. It has stickers of GitHub and React on the lid.',
        category: 'Electronics',
        type: 'lost',
        location: {
          placeName: 'Central Library 3rd Floor',
          city: 'Main Campus',
          landmark: 'Table #14 near Silent Zone',
        },
        dateLostOrFound: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        status: 'active',
        reward: '₹2,000 & Eternal Gratitude',
        contactName: 'Aarav Sharma',
        contactPhone: '+91 91234 56789',
        contactEmail: 'aarav@shodh.org',
        secretQuestion: 'What is the background wallpaper of the login screen?',
        postedBy: user1._id,
        tags: ['macbook', 'apple', 'laptop', 'library'],
        viewsCount: 42,
      },
      {
        title: 'Apple AirPods Pro (2nd Gen) with Matte Blue Protective Case',
        description:
          'Found a pair of AirPods Pro in a matte dark blue silicon case with a small carabiner. Left behind on the center dining table.',
        category: 'Electronics',
        type: 'found',
        location: {
          placeName: 'Student Food Court / Cafeteria',
          city: 'Main Campus',
          landmark: 'Table #8 near Juice Bar',
        },
        dateLostOrFound: new Date(Date.now() - 1000 * 60 * 60 * 18),
        status: 'active',
        reward: '',
        contactName: 'Priya Patel',
        contactPhone: '+91 99887 76655',
        contactEmail: 'priya@shodh.org',
        secretQuestion: 'What name is etched inside or appears on Bluetooth connect?',
        postedBy: user2._id,
        tags: ['airpods', 'apple', 'earbuds', 'cafeteria'],
        viewsCount: 65,
      },
      {
        title: 'Brown Leather Fossil Wallet with ID & Metro Card',
        description:
          'Lost brown bifold Fossil wallet. Contains national identity card, campus student card, metro pass, and some cash. Very urgent as it has important documents.',
        category: 'Wallets & Bags',
        type: 'lost',
        location: {
          placeName: 'Auditorium Gate 2',
          city: 'North Campus',
          landmark: 'Near the bicycle parking lot',
        },
        dateLostOrFound: new Date(Date.now() - 1000 * 60 * 60 * 36),
        status: 'active',
        reward: '₹500 Treat',
        contactName: 'Rohit Verma',
        contactPhone: '+91 94455 66778',
        contactEmail: 'rohit@shodh.org',
        postedBy: user3._id,
        tags: ['wallet', 'money', 'fossil', 'id-card'],
        viewsCount: 28,
      },
      {
        title: 'Official University Student ID Card - Aarav Sharma',
        description:
          'Found a student ID card belonging to Computer Science dept. Safely kept with Department Lab Assistant.',
        category: 'Documents & IDs',
        type: 'found',
        location: {
          placeName: 'Computer Lab 3 (Turing Block)',
          city: 'Main Campus',
          landmark: 'Workstation 19',
        },
        dateLostOrFound: new Date(Date.now() - 1000 * 60 * 60 * 12),
        status: 'active',
        contactName: 'Campus Security Admin',
        contactPhone: '+91 98765 43210',
        contactEmail: 'admin@shodh.org',
        postedBy: adminUser._id,
        tags: ['id card', 'student id', 'cs dept'],
        viewsCount: 15,
      },
      {
        title: 'Set of 4 Brass Keys with Captain America Keychain',
        description:
          'Found a key ring with 4 metallic keys and a circular Captain America shield keychain hanging on the fence near the bus shelter.',
        category: 'Keys',
        type: 'found',
        location: {
          placeName: 'Campus Main Gate Bus Shelter',
          city: 'Main Campus',
          landmark: 'Shelter bench #2',
        },
        dateLostOrFound: new Date(Date.now() - 1000 * 60 * 60 * 48),
        status: 'active',
        contactName: 'Rohit Verma',
        contactPhone: '+91 94455 66778',
        contactEmail: 'rohit@shodh.org',
        postedBy: user3._id,
        tags: ['keys', 'keychain', 'marvel', 'bus stop'],
        viewsCount: 19,
      },
      {
        title: 'Casio FX-991EX Scientific Calculator (Black)',
        description:
          'Lost during afternoon Engineering Mathematics exam. Back cover has a small barcode sticker and initials "PP".',
        category: 'Books & Stationery',
        type: 'lost',
        location: {
          placeName: 'Examination Hall Block B',
          city: 'East Wing',
          landmark: 'Row 4 Seat 22',
        },
        dateLostOrFound: new Date(Date.now() - 1000 * 60 * 60 * 72),
        status: 'active',
        reward: 'Coffee Treat ☕',
        contactName: 'Priya Patel',
        contactPhone: '+91 99887 76655',
        contactEmail: 'priya@shodh.org',
        postedBy: user2._id,
        tags: ['calculator', 'casio', 'exam hall'],
        viewsCount: 33,
      },
      {
        title: 'Sony WH-1000XM4 Wireless Noise Cancelling Headphones',
        description:
          'Found black Sony over-ear headphones inside their black travel case in the Seminar Room after the guest lecture.',
        category: 'Electronics',
        type: 'found',
        location: {
          placeName: 'Management Auditorium / Seminar Hall',
          city: 'Main Campus',
          landmark: 'Row H Seat 12',
        },
        dateLostOrFound: new Date(Date.now() - 1000 * 60 * 60 * 96),
        status: 'handed_over',
        claimedBy: user1._id,
        contactName: 'Priya Patel',
        contactPhone: '+91 99887 76655',
        contactEmail: 'priya@shodh.org',
        postedBy: user2._id,
        tags: ['sony', 'headphones', 'music', 'resolved'],
        viewsCount: 88,
      },
      {
        title: 'Titan Octane Chronograph Watch (Silver Stainless Steel)',
        description:
          'Left my watch on the wooden bench beside the indoor badminton court while changing into sports gear.',
        category: 'Jewelry & Watches',
        type: 'lost',
        location: {
          placeName: 'Indoor Sports Complex',
          city: 'Sports Arena',
          landmark: 'Badminton Court 3 changing bench',
        },
        dateLostOrFound: new Date(Date.now() - 1000 * 60 * 60 * 50),
        status: 'active',
        reward: '₹1,000 Cash Reward',
        contactName: 'Rohit Verma',
        contactPhone: '+91 94455 66778',
        contactEmail: 'rohit@shodh.org',
        postedBy: user3._id,
        tags: ['watch', 'titan', 'sports complex'],
        viewsCount: 47,
      },
    ]);

    console.log('🤝 Creating sample claims and notifications...');
    const resolvedItem = items[6];
    const claim1 = await Claim.create({
      item: resolvedItem._id,
      claimant: user1._id,
      claimantName: 'Aarav Sharma',
      claimantPhone: '+91 91234 56789',
      claimantEmail: 'aarav@shodh.org',
      proofDescription:
        'It has a tiny scratch on the left pivot and is paired with my phone named "Aarav\'s Phone". The travel case also contains the airplane adapter.',
      status: 'approved',
      adminOrOwnerNotes: 'Verified Bluetooth pairing and accessory in case. Handed over successfully!',
    });

    const airpodsItem = items[1];
    const claim2 = await Claim.create({
      item: airpodsItem._id,
      claimant: user3._id,
      claimantName: 'Rohit Verma',
      claimantPhone: '+91 94455 66778',
      claimantEmail: 'rohit@shodh.org',
      proofDescription:
        'The AirPods case has a small sticker residue on the bottom, and the device name on iCloud is "Rohit\'s AirPods Pro".',
      status: 'pending',
    });

    await Notification.create([
      {
        recipient: user2._id,
        sender: user3._id,
        item: airpodsItem._id,
        claim: claim2._id,
        type: 'claim_received',
        message: `${user3.name} submitted a claim on your found listing: "${airpodsItem.title}".`,
        read: false,
      },
      {
        recipient: user1._id,
        sender: user2._id,
        item: resolvedItem._id,
        claim: claim1._id,
        type: 'claim_approved',
        message: `🎉 Great news! Your claim for "${resolvedItem.title}" was approved by ${user2.name}. Contact: ${user2.phone}`,
        read: true,
      },
    ]);

    console.log('✅ Shodh database successfully seeded with realistic demo data!');
    if (isStandalone) {
      await disconnectDB();
    }
  } catch (error) {
    console.error('❌ Seeding error:', error);
  }
};

if (require.main === module) {
  seedData(true);
}

module.exports = seedData;
