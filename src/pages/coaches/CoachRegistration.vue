<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <CoachForm @form-submitted="registerCoach" />
    </base-card>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
  components: {
    CoachForm
  },
  methods: {
    registerCoach(formData) {
      this.$store.dispatch('coaches/addCoach', formData);
      this.$router.replace('/coaches');
    }
  }
};
</script>

<style></style>
