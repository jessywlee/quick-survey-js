const Survey = require("../models/surveys");
const Question = require("../models/questions");

const { connectToDatabase } = require("../models/utils/connectDB");
const { insertCreatorInfo } = require("./utils/insert");

exports.createSurvey = async (req, res, next) => {
  await connectToDatabase();
  const creatorKey = "AWERASDFASDF";
  const { hasExpiry, closeAt, isPublic } = req.body;
  const pages = req.body.pages;

  const pageObjs = [];

  try {
    for (const page of pages) {
      const elements = page.elements.map(
        (element) => new Question({ ...element })
      );

      const insertedQuetions = await Question.insertMany(elements);
      const insertedPage = { ...page, elements: insertedQuetions };

      pageObjs.push(insertedPage);
    }

    let survey;

    if (closeAt) {
      survey = await Survey.create({
        creatorKey: creatorKey,
        hasExpiry: hasExpiry,
        isPublic: isPublic,
        closeAt: new Date(closeAt),
        pages: pageObjs,
      });
    }

    if (!closeAt) {
      survey = await Survey.create({
        creatorKey: creatorKey,
        hasExpiry: hasExpiry,
        isPublic: isPublic,
        pages: pageObjs,
      });
    }

    await insertCreatorInfo(survey, creatorKey);
    res.status(201).json({ MESSAGE: "SUCCESS" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ ERROR: error });
  }
};
