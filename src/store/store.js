import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        clientNames: [
            {
                id: 1,
                name:"Client A"
            },
            {
                id: 2,
                name: "Client B"
            },
            {
                id: 3,
                name: "Client C"
            }],
        client: '',
        orderId: 0,
        orderDate: '',
        contact: '',
        employeeNames: ["Jim George", "Susan van Dyke", "Alison Smith"],
        sellers: [],
        orderItems: [],
        productNames: ["Vacuum cleaner", "Candle", "Speedboat"],
        deliveryOptions: [
            "Carrier Pidgeon",
            "Next day delivery",
            "6 weeks low priority",
        ],
        sellersSaved: false,
        orderDetailsSaved: false,
        orderItemsSaved: false,
        formData: {}
    },
    mutations: {
        setClients: (state, payload) => (
            state.contactPeople = payload
        ),
        setSellers: (state, payload) => (
            state.sellers = payload
        ),
        setContact: (state, payload) => (
            state.contact = payload
        ),
        setClient: (state, payload) => (
            state.client = payload
        ),
        setOrderDate: (state, payload) => (
            state.orderDate = payload
        ),
        saveOrderDetails: (state) => (
            state.orderDetailsSaved = true
        ),
        addSeller: (state, payload) => {
            state.sellers.push(payload) 
        },
        saveSellers: (state) => (
            state.sellersSaved = true
        ),
        addOrderItem: (state, payload) => (
            state.orderItems.push(payload)
        ),
        deleteOrderItem: (state, payload) => {
            state.orderItems = state.orderItems.filter(item => item.id !== payload)
            if(state.orderItems.length < 1){
                state.orderItemsSaved = false
            }
        },
        saveOrderItem: (state, payload) => {
            const itemToReplace = state.orderItems.find(item => item.id === payload.id)
            state.orderItems.splice(state.orderItems.indexOf(itemToReplace), 1, payload)
        },
        saveOrderItems: (state) => (
            state.orderItemsSaved = true
        ),
        saveForm: (state) => (
            state.formData = {
                client: state.client,
                orderDate: state.orderDate,
                contact: state.contact,
                sellers: state.sellers,
                orderItems: state.orderItems,
            }
        ),
    },
    actions: {
        async saveForm(context) {
            try {
                // const res = await axios.put(
                //     process.env.baseUrl + 'order/context.state.orderId/finalize'})
                // );
                context.commit('saveForm');
            } catch (error) {
                console.error(error);
            } finally {
                this.isLoading = false;
            }
        },
        async getClients(context) {
            try {
                // const res = await axios.get(
                //     process.env.baseUrl + '/client'
                // );
                //context.commit('setClients', res.data);
                console.log(context)
            } catch (error) {
                console.error(error);
            } 
        },

        async getSellers(context) {
            try {
                // const res = await axios.get(
                //     process.env.baseUrl + '/seller'
                // );
                //context.commit('setSellers', res.data);
                console.log(context)
            } catch (error) {
                console.error(error);
            }
        },
        async saveorderDetails(context) {
            try {
                // const res = await axios.put(
                //     process.env.baseUrl + 'order',
                // {
                //     params: {
                //          client: context.state.client,
                //          orderDate: context.state.orderDate,
                //          contact: context.state.contact,
                //     }
                // })
                // );
                console.log(context)
            } catch (error) {
                console.error(error);
            }
        },
        async deleteOrderItem(context, item) {
            try {
                // const res = await axios.get(
                //     process.env.baseUrl + '/distributors'
                // );
                context.commit('deleteOrderItem', item);
            } catch (error) {
                console.error(error);
            }
        },
        async saveOrderItem(context, item) {
            try {
                // const res = await axios.get(
                //     process.env.baseUrl + '/distributors'
                // );
                context.commit('saveOrderItem', item);
            } catch (error) {
                console.error(error);
            }
        }
    }
})