const router = require("express").Router();
const Course = require("../models").courseModel;
const courseValidation = require("../validation").courseValidation;
const User = require("../models").userModel;
router.use((req, res, next) => {
  console.log("A request is coming into api...");
  next();
});

router.get("/", (req, res) => {
  Course.find({})
    .populate("instructor", ["username", "email"])
    .then((course) => {
      res.send(course);
    })
    .catch(() => {
      res.status(500).send("Error!! Cannot get course!!");
    });
});

router.get("/:_id", (req, res) => {
  let { _id } = req.params;
  Course.findOne({ _id })
    .populate("instructor", ["email"])
    .then((course) => {
      res.send(course);
    })
    .catch((e) => {
      res.send(e);
    });
});

router.post("/", async (req, res) => {
  const { error } = courseValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let { title, description, price, email } = req.body;

  try {
    // const user = await User.findOne({ email: email });
    // res.send(user);
    // const role = user.role;
    // const userId = user._id;
    // if (role != "instructor")
    if (req.user.isStudent()) {
      return res.status(400).send("Only instructor can post a new course.");
    }
    let newCourse = new Course({
      title,
      description,
      price,
      instructor: req.user._id,
    });
    await newCourse.save();
    res.status(200).send("New course has been saved.");
  } catch (err) {
    res.status(400).send("Cannot save course.");
  }
});

// router.patch("/:_id", async (req, res) => {
//   const { error } = courseValidation(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   let { _id } = req.params;
//   let course = await Course.findOne({ _id });
//   console.log(course);
//   if (!course) {
//     return res.status(404).send("Course not found");
//   }
//   res.send(course);
// });

module.exports = router;
