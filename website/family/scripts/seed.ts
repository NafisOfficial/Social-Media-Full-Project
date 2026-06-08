import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

import User from "../models/User";
import FamilyMember from "../models/FamilyMember";
import FamilyRelationship from "../models/FamilyRelationship";
import Story from "../models/Story";
import Comment from "../models/Comment";
import Vote from "../models/Vote";
import ConnectionRequest from "../models/ConnectionRequest";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please add your MONGODB_URI to .env file");
  process.exit(1);
}

async function seed() {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(MONGODB_URI!);
    console.log("Connected successfully!");

    const userEmails = ["eleanor@example.com", "john@example.com", "sarah@example.com", "liam@example.com"];

    console.log("Cleaning up existing seed data for mock users...");
    // Retrieve users if they exist to clean their associated stories/connections/members/relationships
    const existingUsers = await User.find({ email: { $in: userEmails } });
    const existingUserIds = existingUsers.map(u => u._id);

    if (existingUserIds.length > 0) {
      await FamilyMember.deleteMany({ treeOwner: { $in: existingUserIds } });
      await FamilyRelationship.deleteMany({ treeOwner: { $in: existingUserIds } });
      await Story.deleteMany({ author: { $in: existingUserIds } });
      await Comment.deleteMany({ author: { $in: existingUserIds } });
      await Vote.deleteMany({ user: { $in: existingUserIds } });
      await ConnectionRequest.deleteMany({
        $or: [
          { sender: { $in: existingUserIds } },
          { receiver: { $in: existingUserIds } }
        ]
      });
      await User.deleteMany({ email: { $in: userEmails } });
      console.log("Cleaned up old mock database entries.");
    }

    console.log("Hashing passwords...");
    const passwordHash = await bcrypt.hash("Password123", 10);

    console.log("Seeding users...");
    const usersData = [
      {
        username: "eleanor_v",
        email: "eleanor@example.com",
        passwordHash,
        displayName: "Eleanor Vance",
        bio: "Matriarch of the Vance family, retired history professor, and passionate genealogist. I love gardening, reading historical fiction, and passing down family history to my grandchildren.",
        avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&h=300&q=80",
        coverUrl: "https://images.unsplash.com/photo-1500627869374-13cd993b1115?auto=format&fit=crop&w=1000&h=300&q=80",
        dateOfBirth: new Date("1945-08-12"),
        gender: "female",
        isEmailVerified: true,
      },
      {
        username: "john_doe",
        email: "john@example.com",
        passwordHash,
        displayName: "John Doe",
        bio: "High school physics teacher, woodworker, and archivist of family memories. Dedicated to building our digital family heritage and keeping us connected across distances.",
        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&h=300&q=80",
        coverUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&h=300&q=80",
        dateOfBirth: new Date("1975-04-20"),
        gender: "male",
        isEmailVerified: true,
      },
      {
        username: "sarah_j",
        email: "sarah@example.com",
        passwordHash,
        displayName: "Sarah Jenkins",
        bio: "Travel photojournalist and designer. Currently exploring different cultures, but always looking for links back to our family roots. Passionate about stories and photography.",
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&h=300&q=80",
        coverUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1000&h=300&q=80",
        dateOfBirth: new Date("1992-11-05"),
        gender: "female",
        isEmailVerified: true,
      },
      {
        username: "liam_c",
        email: "liam@example.com",
        passwordHash,
        displayName: "Liam Carter",
        bio: "Art student, music lover, and amateur historian. Fascinated by grandpa's sketches and old stories. I believe preserving our heritage is the key to creating meaningful modern art.",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80",
        coverUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&h=300&q=80",
        dateOfBirth: new Date("2005-02-15"),
        gender: "male",
        isEmailVerified: true,
      }
    ];

    const users = await User.create(usersData);
    const [eleanor, john, sarah, liam] = users;

    console.log("Seeding Connection Requests (Accepted)...");
    const connectionsData = [
      { sender: eleanor._id, receiver: john._id, relationshipType: "son", status: "accepted" },
      { sender: john._id, receiver: liam._id, relationshipType: "son", status: "accepted" },
      { sender: john._id, receiver: sarah._id, relationshipType: "cousin", status: "accepted" },
      { sender: eleanor._id, receiver: sarah._id, relationshipType: "granddaughter", status: "accepted" }
    ];
    await ConnectionRequest.create(connectionsData);

    console.log("Seeding Family Members for Trees...");
    
    // 1. ELEANOR'S TREE MEMBERS
    const eleanorMembers = await FamilyMember.create([
      { treeOwner: eleanor._id, linkedUser: eleanor._id, displayName: "Eleanor Vance", avatarUrl: eleanor.avatarUrl, dateOfBirth: eleanor.dateOfBirth, gender: "female", isAlive: true, bio: eleanor.bio },
      { treeOwner: eleanor._id, linkedUser: john._id, displayName: "John Doe", avatarUrl: john.avatarUrl, dateOfBirth: john.dateOfBirth, gender: "male", isAlive: true, bio: john.bio },
      { treeOwner: eleanor._id, linkedUser: sarah._id, displayName: "Sarah Jenkins", avatarUrl: sarah.avatarUrl, dateOfBirth: sarah.dateOfBirth, gender: "female", isAlive: true, bio: sarah.bio },
      { treeOwner: eleanor._id, linkedUser: liam._id, displayName: "Liam Carter", avatarUrl: liam.avatarUrl, dateOfBirth: liam.dateOfBirth, gender: "male", isAlive: true, bio: liam.bio },
      { treeOwner: eleanor._id, displayName: "Arthur Vance", dateOfBirth: new Date("1940-05-18"), dateOfDeath: new Date("2018-09-02"), gender: "male", isAlive: false, bio: "Grandpa Arthur, a brave soul and talented artist." }
    ]);
    const [mEleanorEleanor, mEleanorJohn, mEleanorSarah, mEleanorLiam, mEleanorArthur] = eleanorMembers;

    // 2. JOHN'S TREE MEMBERS
    const johnMembers = await FamilyMember.create([
      { treeOwner: john._id, linkedUser: john._id, displayName: "John Doe", avatarUrl: john.avatarUrl, dateOfBirth: john.dateOfBirth, gender: "male", isAlive: true, bio: john.bio },
      { treeOwner: john._id, linkedUser: eleanor._id, displayName: "Eleanor Vance", avatarUrl: eleanor.avatarUrl, dateOfBirth: eleanor.dateOfBirth, gender: "female", isAlive: true, bio: eleanor.bio },
      { treeOwner: john._id, linkedUser: liam._id, displayName: "Liam Carter", avatarUrl: liam.avatarUrl, dateOfBirth: liam.dateOfBirth, gender: "male", isAlive: true, bio: liam.bio },
      { treeOwner: john._id, linkedUser: sarah._id, displayName: "Sarah Jenkins", avatarUrl: sarah.avatarUrl, dateOfBirth: sarah.dateOfBirth, gender: "female", isAlive: true, bio: sarah.bio },
      { treeOwner: john._id, displayName: "Arthur Vance", dateOfBirth: new Date("1940-05-18"), dateOfDeath: new Date("2018-09-02"), gender: "male", isAlive: false, bio: "Arthur Vance, John's beloved grandfather." }
    ]);
    const [mJohnJohn, mJohnEleanor, mJohnLiam, mJohnSarah, mJohnArthur] = johnMembers;

    // 3. SARAH'S TREE MEMBERS
    const sarahMembers = await FamilyMember.create([
      { treeOwner: sarah._id, linkedUser: sarah._id, displayName: "Sarah Jenkins", avatarUrl: sarah.avatarUrl, dateOfBirth: sarah.dateOfBirth, gender: "female", isAlive: true, bio: sarah.bio },
      { treeOwner: sarah._id, linkedUser: eleanor._id, displayName: "Eleanor Vance", avatarUrl: eleanor.avatarUrl, dateOfBirth: eleanor.dateOfBirth, gender: "female", isAlive: true, bio: eleanor.bio },
      { treeOwner: sarah._id, linkedUser: john._id, displayName: "John Doe", avatarUrl: john.avatarUrl, dateOfBirth: john.dateOfBirth, gender: "male", isAlive: true, bio: john.bio }
    ]);
    const [mSarahSarah, mSarahEleanor, mSarahJohn] = sarahMembers;

    // 4. LIAM'S TREE MEMBERS
    const liamMembers = await FamilyMember.create([
      { treeOwner: liam._id, linkedUser: liam._id, displayName: "Liam Carter", avatarUrl: liam.avatarUrl, dateOfBirth: liam.dateOfBirth, gender: "male", isAlive: true, bio: liam.bio },
      { treeOwner: liam._id, linkedUser: john._id, displayName: "John Doe", avatarUrl: john.avatarUrl, dateOfBirth: john.dateOfBirth, gender: "male", isAlive: true, bio: john.bio }
    ]);
    const [mLiamLiam, mLiamJohn] = liamMembers;

    console.log("Seeding Family Relationships...");
    
    // Eleanor's relationships
    await FamilyRelationship.create([
      { treeOwner: eleanor._id, fromMember: mEleanorEleanor._id, toMember: mEleanorJohn._id, relationshipType: "son", isConfirmed: true },
      { treeOwner: eleanor._id, fromMember: mEleanorJohn._id, toMember: mEleanorEleanor._id, relationshipType: "mother", isConfirmed: true },
      
      { treeOwner: eleanor._id, fromMember: mEleanorEleanor._id, toMember: mEleanorArthur._id, relationshipType: "spouse", isConfirmed: false },
      { treeOwner: eleanor._id, fromMember: mEleanorArthur._id, toMember: mEleanorEleanor._id, relationshipType: "spouse", isConfirmed: false },
      
      { treeOwner: eleanor._id, fromMember: mEleanorArthur._id, toMember: mEleanorJohn._id, relationshipType: "son", isConfirmed: false },
      { treeOwner: eleanor._id, fromMember: mEleanorJohn._id, toMember: mEleanorArthur._id, relationshipType: "father", isConfirmed: false },
      
      { treeOwner: eleanor._id, fromMember: mEleanorEleanor._id, toMember: mEleanorSarah._id, relationshipType: "granddaughter", isConfirmed: true },
      { treeOwner: eleanor._id, fromMember: mEleanorSarah._id, toMember: mEleanorEleanor._id, relationshipType: "grandmother", isConfirmed: true },
      
      { treeOwner: eleanor._id, fromMember: mEleanorJohn._id, toMember: mEleanorLiam._id, relationshipType: "son", isConfirmed: true },
      { treeOwner: eleanor._id, fromMember: mEleanorLiam._id, toMember: mEleanorJohn._id, relationshipType: "father", isConfirmed: true }
    ]);

    // John's relationships
    await FamilyRelationship.create([
      { treeOwner: john._id, fromMember: mJohnJohn._id, toMember: mJohnEleanor._id, relationshipType: "mother", isConfirmed: true },
      { treeOwner: john._id, fromMember: mJohnEleanor._id, toMember: mJohnJohn._id, relationshipType: "son", isConfirmed: true },
      
      { treeOwner: john._id, fromMember: mJohnJohn._id, toMember: mJohnLiam._id, relationshipType: "son", isConfirmed: true },
      { treeOwner: john._id, fromMember: mJohnLiam._id, toMember: mJohnJohn._id, relationshipType: "father", isConfirmed: true },
      
      { treeOwner: john._id, fromMember: mJohnJohn._id, toMember: mJohnSarah._id, relationshipType: "cousin", isConfirmed: true },
      { treeOwner: john._id, fromMember: mJohnSarah._id, toMember: mJohnJohn._id, relationshipType: "cousin", isConfirmed: true },
      
      { treeOwner: john._id, fromMember: mJohnEleanor._id, toMember: mJohnArthur._id, relationshipType: "spouse", isConfirmed: false },
      { treeOwner: john._id, fromMember: mJohnArthur._id, toMember: mJohnEleanor._id, relationshipType: "spouse", isConfirmed: false },
      
      { treeOwner: john._id, fromMember: mJohnArthur._id, toMember: mJohnJohn._id, relationshipType: "grandson", isConfirmed: false },
      { treeOwner: john._id, fromMember: mJohnJohn._id, toMember: mJohnArthur._id, relationshipType: "grandfather", isConfirmed: false }
    ]);

    // Sarah's relationships
    await FamilyRelationship.create([
      { treeOwner: sarah._id, fromMember: mSarahSarah._id, toMember: mSarahEleanor._id, relationshipType: "grandmother", isConfirmed: true },
      { treeOwner: sarah._id, fromMember: mSarahEleanor._id, toMember: mSarahSarah._id, relationshipType: "granddaughter", isConfirmed: true },
      
      { treeOwner: sarah._id, fromMember: mSarahSarah._id, toMember: mSarahJohn._id, relationshipType: "cousin", isConfirmed: true },
      { treeOwner: sarah._id, fromMember: mSarahJohn._id, toMember: mSarahSarah._id, relationshipType: "cousin", isConfirmed: true }
    ]);

    // Liam's relationships
    await FamilyRelationship.create([
      { treeOwner: liam._id, fromMember: mLiamLiam._id, toMember: mLiamJohn._id, relationshipType: "father", isConfirmed: true },
      { treeOwner: liam._id, fromMember: mLiamJohn._id, toMember: mLiamLiam._id, relationshipType: "son", isConfirmed: true }
    ]);

    console.log("Seeding Stories...");
    const storiesData = [
      {
        author: eleanor._id,
        title: "Grandpa Arthur's WWII Pocket Watch",
        content: "During the winter of 1944, my father Arthur carried this silver pocket watch through the freezing campaigns in Europe. It stopped ticking at exactly 4:15 PM on December 16th, when a piece of shrapnel struck his heavy coat pocket, saving his life. To this day, the watch remains frozen at that exact minute. It hangs on our study mantelpiece, a quiet reminder of courage, sacrifice, and providence. I hope my grandchildren will pass this story down to their children.",
        mediaUrls: ["https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&w=600&h=400&q=80"],
        visibility: "public",
        upvotesCount: 3,
        downvotesCount: 0,
        commentsCount: 2,
      },
      {
        author: john._id,
        title: "Summer Days at the Cabin (1985)",
        content: "Remembering our summer trips to the Lake Tahoe cabin back in the mid-80s. Mom (Eleanor) would pack what felt like a hundred peanut butter sandwiches, and we'd spend the entire day out on the lake. This photo was taken right before my brother and I attempted to build a wooden raft. The raft sank within three seconds of hitting the water, but the laugh we had was worth every bit of wet timber. Grateful for these timeless memories.",
        mediaUrls: ["https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&h=400&q=80"],
        visibility: "relatives",
        upvotesCount: 2,
        downvotesCount: 0,
        commentsCount: 1,
      },
      {
        author: sarah._id,
        title: "Tracing Roots in a Small Irish Town",
        content: "I finally visited Ballyvaughan, the small village on the west coast of Ireland where Great-Grandmother Mary was born. Walking through the narrow streets and looking at the old parish records felt surreal. I actually found the cottage she grew up in—it's now covered in ivy but still standing! The locals were incredibly warm, and one elderly gentleman even remembered our family name. A beautiful piece of our puzzle found.",
        mediaUrls: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&h=400&q=80"],
        visibility: "public",
        upvotesCount: 2,
        downvotesCount: 0,
        commentsCount: 1,
      },
      {
        author: liam._id,
        title: "Restoring Great-Grandpa's Sketches",
        content: "For my art class project, I decided to digitize and restore several sketches my Great-Grandpa Arthur drew during his youth. Most were pencil drawings of family portraits and rustic landscapes. The detail is incredible, and you can see where he got his meticulous patience. I've uploaded the first restored sketch of our old family home. It makes me feel connected to him through our shared love for drawing.",
        mediaUrls: ["https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=600&h=400&q=80"],
        visibility: "public",
        upvotesCount: 3,
        downvotesCount: 0,
        commentsCount: 0,
      }
    ];

    const stories = await Story.create(storiesData);
    const [sWatch, sCabin, sIrish, sSketch] = stories;

    console.log("Seeding Votes...");
    await Vote.create([
      { user: john._id, story: sWatch._id, type: "up" },
      { user: sarah._id, story: sWatch._id, type: "up" },
      { user: liam._id, story: sWatch._id, type: "up" },
      
      { user: eleanor._id, story: sCabin._id, type: "up" },
      { user: sarah._id, story: sCabin._id, type: "up" },
      
      { user: eleanor._id, story: sIrish._id, type: "up" },
      { user: john._id, story: sIrish._id, type: "up" },
      
      { user: eleanor._id, story: sSketch._id, type: "up" },
      { user: john._id, story: sSketch._id, type: "up" },
      { user: sarah._id, story: sSketch._id, type: "up" }
    ]);

    console.log("Seeding Comments...");
    await Comment.create([
      { author: john._id, story: sWatch._id, content: "I remember looking at this watch when I was a kid. It always made history feel so real and close." },
      { author: liam._id, story: sWatch._id, content: "Beautiful story, grandma! Arthur's bravery inspires me to put more feeling and history into my drawings." },
      { author: eleanor._id, story: sCabin._id, content: "Oh John, I had forgotten how completely that raft fell apart! Thanks for posting this, it brought a huge smile to my face." },
      { author: john._id, story: sIrish._id, content: "This is remarkable, Sarah! We should catalog this cottage photo in our digital family tree folder." }
    ]);

    console.log("Database seeded successfully! 🎉");
    console.log("Dummy accounts created (Password for all is 'Password123'):");
    console.log(" - Eleanor Vance (eleanor@example.com / eleanor_v) - Grandmother");
    console.log(" - John Doe (john@example.com / john_doe) - Father");
    console.log(" - Sarah Jenkins (sarah@example.com / sarah_j) - Cousin");
    console.log(" - Liam Carter (liam@example.com / liam_c) - Son");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
