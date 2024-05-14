// import Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";
import questions, { answers } from "../database/data.js";
import { Quiz, Question } from '../models/questionSchema.js';


/** get all questions */
export async function getQuestions(req, res) {
  try {
    const q = await Quiz.find();
    console.log("🚀 ~ getQuestions ~ q:", q)
    res.json(q);
  } catch (error) {
    res.json({ error });
  }
}

/** insert all questinos */

// export async function insertQuestions(req, res) {
//   try {
//     const { language, difficulty, question, answers, correctAnswer } = req.body;
//     console.log(language, difficulty, question, answers, correctAnswer);
//     const data  = await Questions.insertMany(
//       { language, difficulty, question, answers, correctAnswer },
//       function (err, data) {
//         if (err) {
//           res.status(500).json({ error: err });
//         } else {
//           res.json({ msg: "Data Saved Successfully...!",data:data });
//         }
//       }
//     );
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// }

export const insertQuestions = async (req, res) => {
  try {
    const { title, difficulty, questions } = req.body;

    const questionInstances = questions.map(question => new Question(question));

    const newQuiz = new Quiz({
      title,
      difficulty,
      questions: questionInstances,
    });

    await newQuiz.save();

    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
/** Delete all Questions */
export async function dropQuestions(req, res) {
  try {
    await Questions.deleteMany();
    res.json({ msg: "Questions Deleted Successfully...!" });
  } catch (error) {
    res.json({ error });
  }
}

/** get all result */
export async function getResult(req, res) {
  try {
    const r = await Results.find();
    res.json(r);
  } catch (error) {
    res.json({ error });
  }
}

/** post all result */
export async function storeResult(req, res) {
  try {
    const { username, result, attempts, points, achived } = req.body;
    if (!username && !result) throw new Error("Data Not Provided...!");

    Results.create(
      { username, result, attempts, points, achived },
      function (err, data) {
        res.json({ msg: "Result Saved Successfully...!" });
      }
    );
  } catch (error) {
    res.json({ error });
  }
}

/** delete all result */
export async function dropResult(req, res) {
  try {
    await Results.deleteMany();
    res.json({ msg: "Result Deleted Successfully...!" });
  } catch (error) {
    res.json({ error });
  }
}
