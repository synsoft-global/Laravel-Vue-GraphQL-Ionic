<template>
<div class="container mt-3">
<div>
  <b-button v-b-modal.modal-1>Add Product</b-button>

  <b-modal  v-model="dialog"  id="modal-1" :title="formTitle" hide-footer>
    <div>
        <div class="container">       
          <qrcode v-if="showQRCodeModal" :value="JSON.stringify(product)" :options="{ width: 200 }"></qrcode>
            <b-form v-if="!showQRCodeModal" @submit="onSubmit" @reset="onReset">
                <b-form-group
                    id="input-group-1"
                    label="Name"
                    label-for="title-input"
                >
                    <b-form-input
                        id="title-input"
                        v-model="product.name"
                        type="text"
                        required
                        placeholder="Enter Name"
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    id="input-group-2"
                    label="Quantity:"
                    label-for="qty-input"
                >
                    <b-form-input
                        id="qty-input"
                        v-model="product.quantity"
                        required
                        type=number
                        placeholder="Enter Quantity"
                    ></b-form-input>
                </b-form-group>

                 <b-form-group
                    id="input-group-3"
                    label="Sku:"
                    label-for="sku-input"
                >
                    <b-form-input
                        id="sku-input"
                        v-model="product.sku"                        
                        placeholder="Enter Sku"
                    ></b-form-input>
                </b-form-group>

                 <b-form-group
                    id="input-group-4"
                    label="Category:"
                    label-for="cat-input"
                >
             <b-form-select id="cat-input" v-model="product.category_id" class="mb-3"                     label="Category:" @change="onChangeCategory()">
                <b-form-select-option :value="null">Please select one</b-form-select-option>

                     <template v-for="item in product_category">
                         <b-form-select-option v-bind:key="item.id" :value="item.id">{{item.name}}</b-form-select-option>
  </template>
                    
                    </b-form-select>
                </b-form-group>
<b-form-group
                    id="input-group-5"
                    label="Sub Category:"
                    label-for="subcat-input"
                >
                <b-form-select id="subcaty-input" v-model="product.sub_category_id" class="mb-3"      
                               label="Sub Category:">
                       <template v-for="item in product_sub_category">
                         <b-form-select-option v-bind:key="item.id" :value="item.id">{{item.name}}</b-form-select-option>
                          </template>
          

 
              
                     
                    
                    </b-form-select>
                </b-form-group>



                <b-form-group
                    id="file-input"
                    label="Add Image:"
                    label-for="file-input"
                >
                    <!-- Styled -->
                    <b-form-file
                        id="file-input"
                        v-model="product.image"
                        :state="Boolean(product.image)"
                        placeholder="Choose a file or drop it here..."
                        drop-placeholder="Drop file here..."
                    ></b-form-file>
                   
                </b-form-group>
              
                <div class="mt-3 float-right">
                <b-button class="ml-3" type="reset" variant="danger"
                    >Cancel</b-button
                >
                <b-button class="ml-3" type="submit" variant="primary"
                    >{{submitTitle}}</b-button
                >
                </div>
                
              
            </b-form>          
        </div>
    </div>
  </b-modal>
</div>

    <div class="row" v-if="products">
      <div v-for="product of products" :key="product.id" class="col-12 col-md-6 col-lg-4 mt-2">
        <b-card
          border-variant="primary"
          header-bg-variant="primary"
          header-text-variant="white"
          :header="product.title"
          header-tag="header" footer-tag="footer"
          style="height: 400px;"
        >
        <template v-slot:header>
        <h4 class="mb-0">{{ product.name }}</h4>
      </template>

          <b-card-text class="d-flex flex-column align-items-center">
          <img
                                        :src="
                                            `${config.storageBaseUrl}/${product.image}`
                                        "

                                        alt="cover image"
                                        style="max-width:200px; max-height:200px;"
                                        @error="noImgUrlAlt"                                       
                                        class="rounded no-image"
                                    />
           
            <span>Qty:{{ product.quantity }}</span>
            <span>SKU: {{ product.sku }}</span>
          </b-card-text>
          <template v-slot:footer class="text-center">
           <b-button @click="editItem(product)" variant="primary">Edit</b-button>
          <b-button @click="deleteItem(product)" variant="danger">Delete</b-button>
          <b-button @click="shoqQRCode(product)" variant="success">QR Code</b-button>        
      </template>


       
        </b-card>
      </div>
    </div>    
  </div>  
</template>
<style scoped>


</style>
<script>

import {getProducts, getProduct, createProduct, updateProduct, deleteProduct, getCategories, getSubCategories} from '@/queries/product.gql'
import Vue from 'vue';
import VueQrcode from '@chenfengyuan/vue-qrcode';
import config from "@/config/config.js";

Vue.component(VueQrcode.name, VueQrcode);

export default {
    inject: ['$validator'],
    data: () => {
        return {           
            config,          
            products: [],
            product: {
                name: '',
                quantity: null,
                sku: '',              
                category_id:null,
                sub_category_id:null,
                image:null
            },
            defaults: {
                name: '',                
                quantity: null,             
                sku: '',
                category_id:null,
                sub_category_id:null,
                image:null
            },
            dialog: false,
            showQRCodeModal: false,          
            editedIndex: -1,          
        }
    },
    apollo: {
      products: {
        query: getProducts
      },
      product_category: {
        query: getCategories,
        variables() {
          return {
            parent_id:0
          }
        },
      },    
      product: {
        query: getProduct,
        variables() {
          return {
            id: this.product.id
          }
        },
        deep: true,
        skip:true
      },
      product_sub_category: {
        query: getSubCategories,
        variables() {
          return {
            parent_id: this.product.category_id
          }
        },
        deep: true,
        skip:true
      }
    },

    computed: {
        formTitle () {
          if(this.showQRCodeModal){
            return  'QR Code' 
          }else{
            return this.editedIndex === -1 ?  'New Product' : 'Edit Product'
          }
          
        },
        submitTitle () {
          return this.editedIndex === -1 ? 'Create' : 'Update'
        }
    },

    watch: {
        dialog (val) {
            val || this.onReset()
        }
    },
    methods: {    
        noImgUrlAlt(event) {
            event.target.src = config.baseUrl+'/img/no-image.jpg'
        },  
       editItem (item) {
            this.editedIndex = this.products.indexOf(item)
            this.$apollo.queries.product.skip = false
            this.product = Object.assign({}, item)
            this.dialog = true
        },
        onChangeCategory () {
         if(this.product.category_id!=''){ 
            this.$apollo.queries.product_sub_category.skip = false
         }
            
        },

        shoqQRCode(item){         
          this.product = Object.assign({}, item)
         if(this.product.image){
            this.product.image=config.storageBaseUrl+'/'+this.product.image;
          }
          this.dialog=true;
          this.showQRCodeModal=true;
        },

        deleteItem (item) {
          if (confirm('Are you sure you want to delete this item?'))
          {

            this.$apollo.mutate({
              mutation: deleteProduct,
              variables: {
                id: item.id
              },
              update: (store, { data: { deleteProduct } }) => {

                const data = store.readQuery({ query: getProducts })
                const index = data.products.indexOf(item)
                data.products.splice(index, 1)
                store.writeQuery({ query: getProducts, data })
              }
            })
            .then(() => {
              this.notify('The products was deleted successfully', 'success')
            })
            .catch((error) => {
              console.error({error})
              this.notify('There was an error deleting the product.', 'danger')
            })
            
          }
        },

        onReset () {
            this.dialog = false
            this.showQRCodeModal = false
            this.$apollo.queries.product.skip = true
            setTimeout(() => {
                this.product = Object.assign({}, this.defaults)
                this.editedIndex = -1
            }, 300)
        },

        onSubmit(evt) {
         evt.preventDefault();

            if (this.editedIndex > -1) {
              if(this.product.image && !this.product.image.name){
                this.product.image=null;
              }
                this.$apollo.mutate({
                  mutation: updateProduct,
                  variables: this.product,
                  context: {
                      hasUpload: true // Important!
                    },
                  optimisticResponse: {
                    __typename: 'Mutation',
                    updateProduct: { 
                      __typename: 'Product',
                      ...this.product
                    }
                  }
                })
                .then(() => {
                  this.notify('The product was modified successfully', 'success')
                })
                .catch(error => {
                  this.notify('There was an error editting the product', 'danger')
                  console.log({error})
                })

            } else {

                this.$apollo.mutate({
                  mutation: createProduct,
                  variables: this.product,
                    context: {
                      hasUpload: true // Important!
                    }  ,
                  update: (store, { data: { createProduct } }) => {
                    const data = store.readQuery({ query: getProducts })
                    data.products.push(createProduct)
                    store.writeQuery({ query: getProducts, data })
                  },
                  optimisticResponse: {
                    __typename: 'Mutation',
                    createProduct: {
                      __typename: 'Product',
                      id: -1,
                      ...this.product
                    }
                  },
                })
                .then(() => {
                  this.notify('The product was added successfully', 'success')
                })
                .catch(error => {
                  this.notify('There was an error adding the product', 'danger')
                  console.log({error})
                })     
               
            }

            this.onReset()
        },

        notify(message, type="info") {  
        let title='Warning';
          if(type==='success') {
            title='Success'
          }else if(type==='danger'){
            title="Error"
          }
          this.$bvToast.toast(message, {
          title: `${title}`,
          variant: type,
          solid: true
        })
         

        }
    }
}
</script>