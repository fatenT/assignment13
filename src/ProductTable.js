import React, { Component } from 'react'
import ProductRow from './ProductRow'

class ProductTable extends Component {
    constructor(props) {
        super(props)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleDestroy = this.handleDestroy.bind(this)
    }

    handleUpdate(_id) {        
        this.props.onDestroy(_id)
                            console.log(_id)
                                       

        console.log("body=" + _id)

       
/*
        return fetch('http://localhost:5000/product/update/' + _id, {
            method: 'PUT',
            body: JSON.stringify(this.props.databody),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch((err) => console.log('error: ', err)) 
        */
        /*.then(function (resp) {
            console.log('Putting Done');
        });
        */
    }

    handleDestroy(_id) {
        this.props.onDestroy(_id)    
                                
        return fetch('http://localhost:5000/product/delete/' + _id, {
            method: 'Delete'
        })
        .then(function (resp) {
            console.log('deletion Done');
        });

    }

    
    
    render () {        
       
    let rows = []

                                       
        Object.entries(this.props.products).forEach(([key, value]) => {   
            
            if (value.product[0].name.indexOf(this.props.filterText) === -1) {
                return
            }
            rows.push (
                <ProductRow 
                    product={value.product[0]} 
                    key={value._id}
                    id={value._id} 
                    productId={value.product[0].productid}
                    onUpdate={this.handleUpdate} 
                    onDestroy={this.handleDestroy}></ProductRow>
            )
        })
    //}
    //})

        return (
            <div>
                <form>
                    <table className="table table-striped table-sm">
                        <thead className="thead-dark">
                            <tr>
                                <th>In Stock</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>&nbsp;</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </form>
            </div>
            
        )
    }
}

export default ProductTable