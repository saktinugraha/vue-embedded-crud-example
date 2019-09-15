var products = [
  {id: 1, name: 'Lysine', description: 'Lysine is an essential amino acid which is critical to animal growth.', price: 100},
  {id: 2, name: 'Threonine', description: 'Threonine is the second or third most rapidly depleted essential amino acid after lysine in animals.', price: 100},
  {id: 3, name: 'Tryptophan', description: 'Tryptophan is the third most rapidly depleted amino acid in chicken following lysine and threonine.', price: 100},
  {id: 4, name: 'Methionine', description: 'Methionine is an important methyl-group donor for most biological methylation reactions.', price: 100},
  {id: 5, name: 'Biotector', description: 'Biotector® is a first in the world in the area of alternative antibiotic feed additives.', price: 100},
  {id: 6, name: 'Prosin', description: 'CJ PROSIN is a deep brown powder coming from the recovery of the microorganism cells which produce L-Lysine by fermentation of agricultural substrates containing sugar.', price: 100},
  {id: 7, name: 'Protide', description: 'CJ PROTIDE is an economical functional nutrient made of nucleic acids, with applications in in aquaculture, shrimp and livestock.', price: 100},
  {id: 8, name: 'Nucleotides', description: 'Followed by MSG, nucleotide is another key component to enhance flavor and taste of the food and can be divided into two types.', price: 100},
  {id: 9, name: 'MSG', description: 'Glutamate is the main flavor content that contributes a savory and rich taste to food.', price: 100},
  {id: 10, name: 'L-Arginine', description: 'Arginine is the only amino acid that creates NO (nitric oxide), a neurotransmitter that controls the contraction and relaxation of blood vessels.', price: 100}
];

function findProduct (productId) {
  return products[findProductKey(productId)];
};

function findProductKey (productId) {
  for (var key = 0; key < products.length; key++) {
    if (products[key].id == productId) {
      return key;
    }
  }
};

var List = Vue.extend({
  template: '#product-list',
  data: function () {
    return {products: products, searchKey: ''};
  },
  computed : {
    filteredProducts: function () {
    var self = this;
    console.log()
    return self.products.filter(function (product) {
      return product.name.indexOf(self.searchKey) !== -1
    })
  }
}
});

var Product = Vue.extend({
  template: '#product',
  data: function () {
    return {product: findProduct(this.$route.params.product_id)};
  }
});

var ProductEdit = Vue.extend({
  template: '#product-edit',
  data: function () {
    return {product: findProduct(this.$route.params.product_id)};
  },
  methods: {
    updateProduct: function () {
      var product = this.product;
      products[findProductKey(product.id)] = {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price
      };
      router.push('/');
    }
  }
});

var ProductDelete = Vue.extend({
  template: '#product-delete',
  data: function () {
    return {product: findProduct(this.$route.params.product_id)};
  },
  methods: {
    deleteProduct: function () {
      products.splice(findProductKey(this.$route.params.product_id), 1);
      router.push('/');
    }
  }
});

var AddProduct = Vue.extend({
  template: '#add-product',
  data: function () {
    return {product: {name: '', description: '', price: ''}
    }
  },
  methods: {
    createProduct: function() {
      var product = this.product;
      products.push({
        id: Math.random().toString().split('.')[1],
        name: product.name,
        description: product.description,
        price: product.price
      });
      router.push('/');
    }
  }
});

var router = new VueRouter({
  routes: [{path: '/', component: List},
    {path: '/product/:product_id', component: Product, name: 'product'},
    {path: '/add-product', component: AddProduct},
    {path: '/product/:product_id/edit', component: ProductEdit, name: 'product-edit'},
  {path:   '/product/:product_id/delete', component: ProductDelete, name: 'product-delete'}
]});

new Vue({
  el: '#app',
  router: router,
  template: '<router-view></router-view>'
});
