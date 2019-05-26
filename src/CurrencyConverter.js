import React, {Component} from 'react'
import { optionalCallExpression } from '@babel/types';
import CurList from './CurList'

class CurrencyConverter extends Component {
    constructor(){
        super()
        this.state = {
            amount: "1",
            baseCur: "USD",
            toCur: "AUD",
            result: "",
            allExRates: {}
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    /** componentDidMount(){
       // const base = this
        const url = "https://api.exchangeratesapi.io/latest?base=USD" 
        fetch(url)
            .then(response => response.json())
            .then(response => {
                const data = response.rates
                this.setState({
                    allExRates : data
                })
            })
    }*/

    handleChange(e){
        const {name, value} = e.target
        this.setState({
            [name] : value
        })
    }

    handleSubmit(e){
        e.preventDefault()
        //fetch data
        const url = "https://api.exchangeratesapi.io/latest?base=" + this.state.baseCur 
        console.log(url)
        fetch(url)
            .then(response => response.json())
            .then(response => {
                const data = response.rates
                this.setState({
                    allExRates : data
                })

                //get exchange rate of chosen currency.
                let rate = this.state.allExRates[this.state.toCur];
                //calculate conversion round to 2 decimal places
                let r = Number.parseFloat(this.state.amount * rate).toFixed(2)
                this.setState({
                    result: r
                })
            })
        
    }

    render(){
        const ex = this.state.allExRates.GBP
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Amount: 
                        <input type="text" name="amount" value={this.state.amount}
                        onChange={this.handleChange} placeholder="amount" />   
                    </label>
                    <label>From: 
                        <CurList sName="baseCur" sValue={this.state.baseCur} handleChange={this.handleChange}/>
                    </label>
                    <label>To: 
                        <CurList  sName="toCur" sValue={this.state.toCur} handleChange={this.handleChange}/>
                    </label>
                    <button>convert</button>
                </form>

                <h2>{this.state.result}</h2>
            </div>
        )
    }
}

export default CurrencyConverter