import React, { Component } from 'react'
import Filters from './Filters'
import ProductTable from './ProductTable'
import ProductForm from './ProductForm'


class Products extends Component {   
    constructor(props) {
        super(props)
        this.state = {
            filterText: '',
            products: {},
            products_no: 0, 
            
        }
        this.handleFilter = this.handleFilter.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleDestroy = this.handleDestroy.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }

    componentDidMount() {
        fetch("http://localhost:5000/product/get", {
            method: 'GET',
            async: true,
        }).then(res => res.json())
          .then(data => this.setState({ 
              products: data 
            })); 
    }

    handleFilter(filterInput) {
        this.setState(filterInput)
    }

    handleSave(product) {
        if (!product.id) {
            product.id = new Date().getTime()
        }
        this.setState((prevState) => {
            let products = prevState.products
            products[product.id] = product
            return { products }
        })
    }

    handleUpdate(_id) {  
        
        this.setState((prevState) => { 
            let products = prevState.products
            //products[product.productid] = product
            return { products }
                        
        })

        
    
       
    }

    handleDestroy(productId) {
        this.setState((prevState) => {
           /* let products = prevState.products
            delete products[productId]
            return { products }*/
        });
    }

    render () {   

        return (
            <div>
                <h1>My Inventory</h1>
                <Filters 
                    onFilter={this.handleFilter}></Filters>

                <ProductTable 
                    products={this.state.products}
                    filterText={this.state.filterText}
                    onUpdate={this.handleUpdate}
                    onDestroy={this.handleDestroy}
                    products_no = {this.state.products.length}
                    key={this.state.key}></ProductTable>

                <ProductForm
                    onSave={this.handleSave} products_no = {this.state.products.length}></ProductForm>
            </div>
        )
    }
}

export default Products

