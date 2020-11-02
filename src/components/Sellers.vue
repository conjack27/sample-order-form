<template>
  <b-card
    bg-variant="light"
    class="mt-4"
  >
    <h3>Sellers</h3>
    <validation-observer
      ref="observer"
      v-slot="{ handleSubmit }"
    >
      <b-form @submit.stop.prevent="handleSubmit(saveSellers)">
        <b-list-group>
          <b-list-group-item
            v-for="(seller, i) in sellers"
            :key="i"
          >
            <h6>{{i + 1}}</h6>
            <b-form-row>
              <b-col md>
                <validation-provider
                  name="Employee Name"
                  :rules="{ required: true }"
                  v-slot="validationContext"
                >
                  <b-form-group
                    label="Employee Name:"
                    label-for="employeeName"
                  >
                    <b-form-select
                      id="employeeName"
                      name="employeeName"
                      :state="getValidationState(validationContext)"
                      v-model="seller.name"
                      :options="employeeNames"
                    ></b-form-select>
                    <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>
              <b-col md>
                <validation-provider
                  name="Bonus Percentage"
                  :rules="{ max_value: 100, min_value: 0 }"
                  v-slot="validationContext"
                >
                  <b-form-group
                    label-for="bonusPercentage"
                    label="Bonus Percentage:"
                  >
                    <b-form-input
                      id="bonusPercentage"
                      name="bonusPercentage"
                      :state="getValidationState(validationContext)"
                      v-model="seller.bonusPercentage"
                    ></b-form-input>
                    <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-form-row>
          </b-list-group-item>
          <b-list-group-item>
            <h5>New Seller</h5>
            <b-form-row>
              <b-col md>
                <validation-provider
                  name="Employee Name"
                  :rules="{ required: true }"
                  v-slot="validationContext"
                >
                  <b-form-group
                    label-for="newEmployeeName"
                    label="Employee Name:"
                  >
                    <b-form-select
                      id="newEmployeeName"
                      name="newEmployeeName"
                      :state="getValidationState(validationContext)"
                      v-model="newSeller.name"
                      :options="employeeNames"
                    ></b-form-select>
                    <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>
              <b-col md>
                <validation-provider
                  name="Bonus Percentage"
                  :rules="{ max_value: 100, min_value: 0 }"
                  v-slot="validationContext"
                >
                  <b-form-group
                    label-for="newBonusPercentage"
                    label="Bonus Percentage:"
                  >
                    <b-form-input
                      id="newBonusPercentage"
                      name="newBonusPercentage"
                      :state="getValidationState(validationContext)"
                      v-model="newSeller.bonusPercentage"
                    ></b-form-input>
                    <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-form-row>
            <b-button
              @click="addNewSeller"
              variant="success"
            >Add New Seller</b-button>
          </b-list-group-item>

        </b-list-group>
        <b-button
          class="mt-3"
          type="submit"
          variant="primary"
          :disabled="sellers < 1"
        >Save Sellers</b-button>
      </b-form>
    </validation-observer>
  </b-card>
</template>

<script>
export default {
  name: "",
  components: {},
  data: () => ({
    newSeller: {
      name: "",
      bonusPercentage: 0,
    },
  }),
  computed: {
    employeeNames() {
      return this.$store.state.employeeNames;
    },
    sellers() {
      return this.$store.state.sellers;
    },
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    addNewSeller() {
      this.$store.commit("addSeller", {
        name: this.newSeller.name,
        bonusPercentage: this.newSeller.bonusPercentage,
      });
    },
    saveSellers() {
      this.$store.commit("saveSellers");
    },
  },
};
</script>

<style>
.classname {
}
</style>