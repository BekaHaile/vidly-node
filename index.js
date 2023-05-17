const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/playground")
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB...", err);
  });

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

const createCourse = async () => {
  const course = new Course({
    name: "Node.js Course",
    author: "Beka",
    tags: ["node", "backend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
};

// createCourse();

const getCourses = async () => {
  const courses = await Course.find({ isPublished: true })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1, author: 1 });
  console.log(courses);
};

getCourses();

//delete courses with author Beka
const deleteCourses = async () => {
  const result = await Course.deleteMany({ author: "Beka" });
  console.log(result);
};

// deleteCourses();