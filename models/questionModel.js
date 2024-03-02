import mongoose from 'mongoose';


const questionSchema = new mongoose.Schema(
  {
    questionString: {
      type: String,
      required: true,
    },
    questionType: {
        type: String,
        required: true,
        default: "coding"
    },
    testCases: {
        type: Object,
        required: false,
    },
    rightAnswer: {
        type: String,
        required: false,
    },
    wrongAnswers: {
        type: String,
        required: false,
    },
    tags: {
        type: String,
        required: true,
    }
  },
  { timestamps: true }
);


const Question = mongoose.model('question', questionSchema);
export default Question;
