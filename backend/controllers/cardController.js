import Card from "../models/cardModel.js";

export const createCard = async (req, res) => {
  try {
    // Extract data from the request body
    const { language, difficulty, question, answers } = req.body;

    // Create a new card object
    const newCard = new Card({
      language,
      difficulty,
      question,
      answers,
    });

    // Save the card to the database
    const savedCard = await newCard.save();

    res.status(201).json(savedCard); // Send a response back to the frontend
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create card", error: error.message });
  }
};
