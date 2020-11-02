<template>
  <b-card
    bg-variant="light"
    class="mt-4"
  >
    <h3>Items</h3>
    <validation-observer
      ref="observer"
      v-slot="{ handleSubmit }"
    >
      <b-form @submit.stop.prevent="handleSubmit(saveItems)">
        <b-list-group>
          <b-list-group-item
            v-for="(orderItem, i) in orderItems"
            :key="i"
          >
            <h6>{{i + 1}}</h6>
            <b-form-row>
              <b-col md>
                <b-form-group label="Product:">
                  <b-form-select
                    v-model="orderItem.name"
                    :options="productNames"
                  ></b-form-select>
                </b-form-group>
              </b-col>
              <b-col md>
                <validation-provider
                  name="Price"
                  :rules="{ min_value: 0 }"
                  v-slot="validationContext"
                >
                  <b-form-group
                    label="Price:"
                    label-for="price"
                  >
                    <b-form-input
                      id="price"
                      name="price"
                      :state="getValidationState(validationContext)"
                      v-model="orderItem.price"
                    ></b-form-input>
                    <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>
              <b-col md>
                <validation-provider
                  name="Amount"
                  :rules="{ min_value: 0, integer: true }"
                  v-slot="validationContext"
                >
                  <b-form-group
                    label="Amount:"
                    label-for="amount"
                  >
                    <b-form-input
                      id="amount"
                      name="amount"
                      :state="getValidationState(validationContext)"
                      v-model="orderItem.amount"
                    ></b-form-input>
                    <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-form-row>
            <b-form-row v-if="orderItem.isSpecial">
              <b-col md>
                <b-form-group label="Delivery Type:">
                  <b-form-select
                    v-model="orderItem.deliveryType"
                    :options="deliveryOptions"
                  ></b-form-select>
                </b-form-group>
              </b-col>
              <b-col md>
                <validation-provider
                  name="Comment"
                  :rules="{ max: 250 }"
                  v-slot="validationContext"
                >
                  <b-form-group
                    label="Comment:"
                    label-for="comment"
                  >
                    <b-form-input
                      id="comment"
                      name="comment"
                      :state="getValidationState(validationContext)"
                      v-model="orderItem.comment"
                    ></b-form-input>
                    <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-form-row>
            <div class="d-flex flex-row-reverse">
              <b-button
                class="mt-3"
                variant="danger"
                @click="deleteOrderItem(orderItem.id)"
              >Delete Item</b-button>
              <b-button
                class="mt-3 mr-2"
                variant="success"
                @click="saveOrderItem(orderItem)"
              >Save Item</b-button>
            </div>
          </b-list-group-item>
          <b-list-group-item>
            <h5>Add new item</h5>
            <b-form-checkbox
              class="mb-2"
              v-model="newOrderItem.isSpecial"
            >
              Item is special
            </b-form-checkbox>
            <b-form-row>
              <b-col md>
                <b-form-group label="Product:">
                  <b-form-select
                    v-model="newOrderItem.name"
                    :options="productNames"
                  ></b-form-select>
                </b-form-group>
              </b-col>
              <b-col md>
                <validation-provider
                  name="Price"
                  :rules="{ min_value: 0 }"
                  v-slot="validationContext"
                >
                  <b-form-group
                    label="Price:"
                    label-for="newItemPrice"
                  >
                    <b-form-input
                      id="newItemPrice"
                      name="newItemPrice"
                      :state="getValidationState(validationContext)"
                      v-model="newOrderItem.price"
                    ></b-form-input>
                    <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>
              <b-col md>
                <validation-provider
                  name="Amount"
                  :rules="{ min_value: 0, integer: true }"
                  v-slot="validationContext"
                >
                  <b-form-group
                    label="Amount:"
                    label-for="newItemAmount"
                  >
                    <b-form-input
                      id="newItemAmount"
                      name="newItemAmount"
                      :state="getValidationState(validationContext)"
                      v-model="newOrderItem.amount"
                    ></b-form-input>
                    <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-form-row>
            <b-form-row v-if="newOrderItem.isSpecial">
              <b-col md>
                <b-form-group label="Delivery Type:">
                  <b-form-select
                    v-model="newOrderItem.deliveryOption"
                    :options="deliveryOptions"
                  ></b-form-select>
                </b-form-group>
              </b-col>
              <b-col md>
                <validation-provider
                  name="Comment"
                  :rules="{ max: 250 }"
                  v-slot="validationContext"
                >
                  <b-form-group
                    label="Comment:"
                    label-for="newItemComment"
                  >
                    <b-form-input
                      v-model="newOrderItem.comment"
                      id="newItemComment"
                      name="newItemComment"
                      :state="getValidationState(validationContext)"
                    ></b-form-input>
                    <b-form-invalid-feedback>{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-form-row>
            <b-button
              @click="addNewItem"
              variant="success"
            >Add Item</b-button>
          </b-list-group-item>
        </b-list-group>
        <b-button
          class="mt-3"
          type="submit"
          variant="primary"
          :disabled="orderItems < 1"
        >Save Order Items</b-button>
      </b-form>
    </validation-observer>
  </b-card>
</template>

<script>
import { uuid } from "vue-uuid";
export default {
  name: "",
  components: {},
  data: () => ({
    newOrderItem: {
      isSpecial: false,
      name: "",
      price: 0,
      amount: 0,
      deliveryOption: "",
      comment: "",
    },
  }),
  computed: {
    productNames() {
      return this.$store.state.productNames;
    },
    orderItems() {
      return this.$store.state.orderItems;
    },
    deliveryOptions() {
      return this.$store.state.deliveryOptions;
    },
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    addNewItem() {
      var newID = uuid.v1();
      this.$store.commit("addOrderItem", {
        id: newID,
        isSpecial: this.newOrderItem.isSpecial,
        name: this.newOrderItem.name,
        price: this.newOrderItem.price,
        amount: this.newOrderItem.amount,
        deliveryOption: this.newOrderItem.deliveryOption,
        comment: this.newOrderItem.comment,
      });
    },
    deleteOrderItem(itemId) {
      console.log("the id", itemId);
      this.$store.dispatch("deleteOrderItem", itemId);
    },
    saveOrderItem(item) {
      console.log("the id", item);
      this.$store.dispatch("saveOrderItem", item);
    },
    saveItems() {
      this.$store.commit("saveOrderItems");
    },
  },
};
</script>

<style>
</style>