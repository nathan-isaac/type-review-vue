<template>
  <div class="quiz">
    <button @click="validate">Check Answers</button>
    <button @click="resetQuiz">Reset</button>
    <button @click="toggleAnswers">Toggle Answers</button>

    <question v-for="question in questions" v-bind="question" @guess-change="onGuessChange"></question>
  </div>
</template>

<script>
import ReviewQuizSessionUseCase from "type-review-core/src/usecases/ReviewQuizUseCase.js";
import JsonQuestionGateway from "type-review-core/src/gateways/JsonQuestionGateway.js";
import Question from './Question.vue';

export default {
    components: {
        Question,
    },
    data() {
        return {
            quizData: {},
        };
    },
    created() {
        const gateway = new JsonQuestionGateway();

        this.usecase = new ReviewQuizSessionUseCase(gateway);

        this.setViewModel();
    },
    methods: {
        setViewModel() {
            this.quizData = this.usecase.viewModel();
        },
        onGuessChange(context) {
            this.usecase.answerQuestion(context.id, context.answer);
            this.setViewModel();
        },
        validate() {
            this.usecase.checkAnswers();
            this.setViewModel();
        },
        resetQuiz() {
            this.usecase.reset();
            this.setViewModel();
        },
        toggleAnswers() {
            this.usecase.toggleAnswers();
            this.setViewModel();
        }
    },
  computed: {
      questions() {
        return this.quizData.questions.map(question => {
          return {
            key: question.id,
            id: question.id,
            imageUrl: question.imageUrl,
            guess: question.answer,
            correctAnswer: question.correctAnswer,
            correct: question.isCorrect,
            submitted: this.quizData.submitted,
            showAnswers: this.quizData.showAnswers,
          }
        });
      }
  }
}
</script>

<style>
button {
    padding: 1.2em 1.5em;
    font-size: 20px;
    background-color: peru;
    color: white;
    border: none;
    margin: 1em;
}
</style>
