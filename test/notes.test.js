require("dotenv").config();
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Folder = require("../models/folders.model");
const Note =  require("../models/notes.model");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST);
});

beforeEach(async () => {
  await mongoose.connection.dropDatabase();
});

afterAll(async () => {
  await mongoose.disconnect();
});

test("GET /api/notes should require authentication", async() => {
     const response = await request(app)
    .get("/api/notes/");

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Authentication required"); 
});

test("GET /api/notes should return notes for authenticated User", async () => {
  const user = await User.create({
    name: "Test User",
    email: "test@example.com",
    password: "testpassword",
  });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

   const folder = await Folder.create({
    name: "Test Folder",
    userId: user._id,
  });

    await Note.create({
    title: "Test Note",
    content: "This is a test note",
    userId: user._id,
    folderId: folder._id,
  });

  const response = await request(app)
    .get("/api/notes/")
    .set("Authorization", `Bearer ${token}`);

  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body.notes)).toBe(true);
});

test("GET /api/notes should return 404 when user has no notes", async () => {
  const user = await User.create({
    name: "Test User",
    email: "empty@example.com",
    password: "testpassword",
  });

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  const response = await request(app)
    .get("/api/notes")
    .set("Authorization", `Bearer ${token}`);

  expect(response.statusCode).toBe(200);
  expect(response.body.notes).toEqual([]);
});


test("GET /api/notes/:id should not allow a user to access another user's note", async () => {
  // User A
  const userA = await User.create({
    name: "User A",
    email: "usera@example.com",
    password: "testpassword",
  });

  // User B
  const userB = await User.create({
    name: "User B",
    email: "userb@example.com",
    password: "testpassword",
  });

  // User B's folder
  const folder = await Folder.create({
    name: "User B Folder",
    userId: userB._id,
  });

  // User B's note
  const note = await Note.create({
    title: "User B Note",
    content: "Private content",
    userId: userB._id,
    folderId: folder._id,
  });

  // JWT belonging to User A
  const token = jwt.sign(
    { userId: userA._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  // User A tries to access User B's note
  const response = await request(app)
    .get(`/api/notes/${note._id}`)
    .set("Authorization", `Bearer ${token}`);

  expect(response.statusCode).toBe(404);
});