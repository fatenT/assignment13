import React, { Component } from 'react'

class ProductRow extends Component {   
                                        
    constructor(props) {                   
        super(props)
        this.destroy = this.destroy.bind(this)
        this.updateProduct = this.updateProduct.bind(this) 
        this.handleChangeName = this.handleChangeName.bind(this)  
        this.handleChangeCategory = this.handleChangeCategory.bind(this) 
        this.handleChangePrice = this.handleChangePrice.bind(this) 
        
        
        this.state = {
            nameVal: this.props.product.name,
            categoryVal: this.props.product.category,
            priceVal: this.props.product.price,

        
            databody:  {
                "id": 0,
                "product": {
                    "productid": 0,
                    "category": "",
                    "price": 0,
                    "name": "",
                    "instock": true
                }
                
            }
        };
        
    }

    updateProduct() {    
        this.props.onUpdate(this.props.id); 
          
    }

   
    destroy() {
        this.props.onDestroy(this.props.id);  
                                                        
    }

    handleChangeName(e) {
           
        this.setState({ 
            nameVal: e.target.value,
           
        })

        this.setState(prevState => ({
            databody: {                   
                ...prevState.databody, 
                "product": {   
                    ...prevState.databody.product,
                    name: this.state.nameVal 
                }     
            },
            function(){
                console.log("new data= "  + this.state)
            }
        }))

    }

    handleChangeCategory(e) {
                    
        this.setState({ 
            categoryVal: e.target.value,
           
        })

        this.setState(prevState => ({
            databody: {                  
                ...prevState.databody, 
                "product": {   
                    ...prevState.databody.product,
                    category: this.state.categoryVal 
                }      
            },
            function(){
                console.log("new data= "  + this.state)
            }
        }))

    }

    handleChangePrice(e) {
                 
       
        this.setState({ 
            priceVal: e.target.value,
           
        })

        this.setState(prevState => ({
            databody: {                   
                ...prevState.databody, 
                "product": {   
                    ...prevState.databody.product,
                    price: this.state.priceVal 
                }      
            },
            function(){
                console.log("new data= "  + this.state)
            }
        }))

    }

    render () {            
        return (  
            <tr id={this.props.product.productid}>
                <td>{this.props.instock ?  "Not In STock": "In Stock"}</td>
                <td><input type="text" name="name" id={"name_"+this.props.productId} value={this.state.nameVal} onChange={this.handleChangeName} /></td>
                <td><input type="text" name="category" id={"category_"+this.props.productId} value={this.state.categoryVal} onChange={this.handleChangeCategory} /></td>
                <td><input type="text" name="price" id={"price_"+this.props.productId} value={this.state.priceVal} onChange={this.handleChangePrice} /></td>
                <td className="text-right"><button type="button" onClick={this.updateProduct} className="btn btn-info">Update</button></td>
                <td className="text-right"><button onClick={this.destroy} className="btn btn-info">Delete</button></td>
            </tr>
        )
    }
}

export default ProductRow


