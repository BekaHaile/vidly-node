const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/mongo-excercise1")
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB...", err);
  });

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 255 },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
    lowercase: true,
    // uppercase: true,
    trim: true,
  },
  author: String,
  tags: {
    type: Array,
    isAsync: true,
    validate: {
      validator: function (v, callback) {
        setTimeout(() => {
          //Do some async work
          const result = v && v.length > 0;
          callback(result);
        }, 4000);
      },
      message: "A course should have at least one tag.",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200,
  },
});

const Course = mongoose.model("Course", courseSchema);

const createCourse = async () => {
  const course = new Course({
    name: "React js Course",
    author: "Tg",
    tags: ["react", "frontend"],
    isPublished: true,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) {
      console.log(ex.errors[field].message);
    }
  }
};

// createCourse();

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

  const courses = await Course.find({
    isPublished: true,
  }).or({ price: { $gte: 15 } }, { name: /.*by.*/i })
    // .find({ price: { $gte: 10, $lte: 20 } })
    // .skip((pageNumber - 1) * pageSize)
    //pagination
    // .limit(pageSize)
    .sort({ price: -1 })
    .select("name author price");
  console.log(courses);
};

getCourses();

//delete courses with author Beka
const deleteCourses = async () => {
  const result = await Course.deleteMany({ author: "Beka" });
  console.log(result);
};

// deleteCourses();

//update course with id
const updateCourse = async (id) => {
  const course = await Course.findById(id);
  if (!course) return;

  course.isPublished = true;
  course.author = "Another Author";

  const result = await course.save();
  console.log(result);
}

//Update first
// const updateCourse = async (id) => {
//   const result = await Course.update({ _id: id }, {
//     $set: { author: "Mosh", isPublished: false }
//   });
//   console.log(result);
// }

// Update first and return the updated document
// const updateCourse = async (id) => { 
  // const course = await Course.findByIdAndUpdate(id, {
  //   $set: { author: "Jack", isPublished: true }
  // }, { new: true });
  // console.log(course);
// }

// updateCourse('5a68fde3f09ad7646ddec17e');

//delete course with id
const removeCourse = async (id) => { 
  const result = await Course.deleteOne({ _id: id }); // deleteMany for multiple

  //to get the deleted document
  // const course = await Course.findByIdAndRemove(id); 
  console.log(result);
}

// removeCourse('5a68fde3f09ad7646ddec17e');