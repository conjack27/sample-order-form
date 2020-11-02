<template>
  <b-card
    bg-variant="light"
    class="mt-4"
  >
    <h3>Order Details</h3>
    <validation-observer
      ref="observer"
      v-slot="{ handleSubmit }"
    >
      <b-form @submit.stop.prevent="handleSubmit(saveOrderDetails)">
        <b-form-row>
          <b-col md>
            <validation-provider
              name="Date"
              :rules="{ required: true }"
              v-slot="validationContext"
            >
              <b-form-group
                label="Order Date:"
                label-for="orderDate"
              >
                <b-form-datepicker
                  id="orderDate"
                  name="orderDate"
                  :state="getValidationState(validationContext)"
                  v-model="orderDate"
                ></b-form-datepicker>

                <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col md>
            <validation-provider
              name="Client Name"
              :rules="{ required: true }"
              v-slot="validationContext"
            >
              <b-form-group
                label="Client Name:"
                label-for="clientName"
              >
                <b-form-select
                  v-model="client"
                  :options="clientNames"
                  value-field="id"
                  text-field="name"
                  id="clientName"
                  name="clientName"
                  :state="getValidationState(validationContext)"
                ></b-form-select>
                <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

          </b-col>
          <b-col md>
            <validation-provider
              name="Contact Person"
              :rules="{ required: true }"
              v-slot="validationContext"
            >
              <b-form-group label="Contact Person:">
                <b-form-select
                  v-model="contact"
                  :options="contactPeople"
                  id="contactPerson"
                  name="contactPerson"
                  :state="getValidationState(validationContext)"
                ></b-form-select>
                <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
          </b-col>
        </b-form-row>
        <b-button
          type="submit"
          variant="primary"
        >Save Order Details</b-button>
      </b-form>
    </validation-observer>
  </b-card>
</template>

<script>
export default {
  name: "",
  components: {},
  data: () => ({
    order: {},
  }),
  computed: {
    orderDate: {
      get() {
        return this.$store.state.orderDate;
      },
      set(value) {
        this.$store.commit("setOrderDate", value);
      },
    },
    client: {
      get() {
        return this.$store.state.client;
      },
      set(value) {
        this.$store.commit("setClient", value);
      },
    },
    contact: {
      get() {
        return this.$store.state.contact;
      },
      set(value) {
        this.$store.commit("setContact", value);
      },
    },
    clientNames() {
      return this.$store.state.clientNames;
    },
    contactPeople() {
      return this.$store.state.contactPeople;
    },
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    saveOrderDetails() {
      this.$store.commit("saveOrderDetails");
    },
  },
};
</script>

<style>
</style>