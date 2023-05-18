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
    name: "React js Course",
    author: "Tg",
    tags: ["react", "frontend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
};

createCourse();

const getCourses = async () => {
  //Comparison Operators in MongoDB are
  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte (greater than or equal to)
  // lt (less than)
  // lte (less than or equal to)
  // in
  // nin (not in)

  //Logical Operators in MongoDB are
  // or - or([{author, 'Mosh'}, {isPublished: true}])
  // and - and([{author, 'Mosh'}, {isPublished: true}])

  //Regular Expressions in MongoDB are
  // Starts with au - /^au/
  // Ends with au - /au$/
  // Contains au - /.*au.*/
  // Case Insensitive - /au/i

  //Pagination
  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course
    // find({ isPublished: true }
    .find({ price: { $gte: 10, $lte: 20 } })
    .skip((pageNumber - 1) * pageSize) //pagination
    .limit(pageSize)
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