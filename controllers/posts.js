
const Post = require("../models/Post");


module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.render("post.ejs", { post: post, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  // createPost: async (req, res) => {
  //   try {
  //     await Post.create({
  //       liters: req.body.liters,
  //       description: req.body.description,
  //       user: req.user.id,
  //     });
  //     console.log("Post has been added!");
  //     res.redirect("/profile");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
 
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },

  
  createFluidInput: async (req, res) => {
    const { liters, fluid, description } = req.body;

    // Validate the data
    if (!liters || !fluid || !description) {
      return res.status(400).send("All fields are required.");
    }

    const newFluid = new Post({
      liters,
      fluid,
      description,
    });

    try {
      await newFluid.save();
      console.log(newFluid);
      res.redirect("/");
    } catch (err) {
      console.error("Error creating fluid input:", err);
      console.error("Validation errors:", err.errors);
      res.status(500).send("Error creating fluid input. Please try again.");
    }
  }
};
