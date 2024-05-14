// import mongoose from "mongoose";
// const { Schema } = mongoose;

// /** question model */
// const questionModel = new Schema({
//     questions: { type : Array, default: []}, // create question with [] default value
//     answers : { type : Array, default: []},
//     createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.model('Question', questionModel);

import mongoose from "mongoose";

const { Schema } = mongoose;

const questionSchema = new Schema({
  // language: {
  //   type: String,
  //   required: true,
  // },
  
  question: {
    type: String,
    required: true,
  },
  answers: [
    {
      type: String,
      required: true,
    },
  ],
  correctAnswer: {
    type: String,
    required: true,
  },
});


  const quizSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  questions: [questionSchema],
});

const Quiz = mongoose.model("Quiz", quizSchema);

const Question = mongoose.model("Question", questionSchema);

export { Quiz, Question };
