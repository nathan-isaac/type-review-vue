<template>
  <div class="card" :class="this.classes">
    <h1 v-if="showAnswers">{{ correctAnswer }}</h1>

    <img :src="imageUrl" alt="Type to guess" />

    <input
        name="type-guess"
        type="text"
        :value="guess"
        @input="this.onGuessChange"
        :readonly="submitted"
    />
  </div>
</template>

<script>
export default {
  name: 'Question',
  props: {
    id: {},
    correct: {},
    submitted: {},
    correctAnswer: {},
    showAnswers: {},
    guess: {},
    imageUrl: {},
  },
  methods: {
    onGuessChange(e) {
      this.$emit('guess-change', {
        id: this.id,
        answer: e.target.value,
      })
    }
  },
  computed: {
    classes() {
      if (!this.submitted) {
        return;
      }
      
      if (this.correct) {
        return 'card--success';
      } else {
        return 'card--failure';
      }
    }
  }
}
</script>

<style>
  .card {
    border: 1px solid rgba(100, 100, 100, 1.0);
    margin: 2em auto;
    max-width: 60vw;
    padding: 1em;
    display: flex;
    flex-direction: column;
    box-shadow: 0 8px 10px rgba(0, 0, 0, 0.3);
    border-radius: 4px;
  }

  .card img {
    width: 95%;
    padding: 1em;
  }

  .card--success {
    border: 2px solid #02C851;
  }

  .card--failure {
    border: 2px solid #DF4C41;
  }
</style>
