<template>
  <b-container id="app">
    <b-row>
      <b-col>
        <b-card
          v-show="!formSaved"
          class="mt-4"
        >
          <h1 class="text-center">Sample Order Form</h1>
          <OrderDetails></OrderDetails>
          <Sellers></Sellers>
          <Items></Items>
          <b-button
            class="mt-3"
            variant="success"
            @click="saveForm"
            :disabled="!formsHaveBeenSaved"
          >Finalise</b-button>
          <b-alert
            v-model="showDismissibleAlert"
            class="mt-2"
            variant="danger"
            dismissible
          >
            The sum of employee bonus percentages should equal 100. Please update them and try submitting again.
          </b-alert>
        </b-card>
        <b-card v-show="formSaved">
          <b-alert
            show
            variant="success"
          >The form has been successfully saved and submitted. Thank you</b-alert>
          <b-button
            class="mt-3"
            @click="formSaved = false"
          >Edit form</b-button>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Items from "./components/Items.vue";
import OrderDetails from "./components/OrderDetails.vue";
import Sellers from "./components/Sellers.vue";
import store from "./store/store";

export default {
  name: "App",
  store,
  components: {
    Items,
    OrderDetails,
    Sellers,
  },
  data: () => ({
    showDismissibleAlert: false,
    formSaved: false,
  }),
  computed: {
    sumOfBonuses() {
      return this.$store.state.sellers
        .map((seller) => parseInt(seller.bonusPercentage))
        .reduce((acc, item) => acc + item);
    },
    formsHaveBeenSaved() {
      return (
        this.$store.state.sellersSaved &&
        this.$store.state.orderDetailsSaved &&
        this.$store.state.orderItemsSaved
      );
    },
  },
  methods: {
    saveForm() {
      if (this.sumOfBonuses !== 100) {
        this.showDismissibleAlert = true;
      } else {
        this.$store.dispatch("saveForm");
        this.formSaved = true;
      }
    },
  },
};
</script>

<style>
</style>
