import React, {Component} from 'react'
import CurList from './CurList'
import ConversionResult from './ConversionResult'

class CurrencyConverter extends Component {
    constructor(){
        super()
        this.state = {
            amount: "1",
            baseCur: "USD",
            toCur: "GBP",
            result: "",
            selectedRate : "",
            allExRates: {}
        }
    }

    componentDidMount(){
       // const base = this
        const url = "https://api.exchangeratesapi.io/latest?base=USD" 
        fetch(url)
            .then(response => response.json())
            .then(response => {
                const data = response.rates
                const rate = response.rates[this.state.toCur]
                const r = Number.parseFloat(this.state.amount * rate).toFixed(2)
                this.setState({
                    allExRates : data,
                    result: r,
                    selectedRate : rate 

                })
            })
    }

    handleChange = (e) => {
        const {name, value} = e.target
        if(name === "baseCur") {
            const url = "https://api.exchangeratesapi.io/latest?base=" + value 
            console.log(url)
            fetch(url)
                .then(response => response.json())
                .then(response => {
                    const data = response.rates
                    const rate = response.rates[this.state.toCur]
                    const r = Number.parseFloat(this.state.amount * rate).toFixed(2)
                    this.setState({
                        allExRates : data,
                        result: r,
                        selectedRate : rate 

                    })
                })
        }
        else if(name === "toCur"){
            const rate = this.state.allExRates[value]
            const r = Number.parseFloat(this.state.amount * rate).toFixed(2)
            this.setState({
                result: r,
                selectedRate : rate
            })
        }
        else if(name === "amount"){
            const rate = this.state.allExRates[this.state.toCur]
            const r = Number.parseFloat(value * rate).toFixed(2)
            this.setState({
                result: r
            })
        }
        
        this.setState({
            [name] : value
        })
    }

    render(){
        return (
            <div>
                <form >
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
                </form>
                <ConversionResult cAmount={this.state.amount} cBaseCur={this.state.baseCur}
                    cSelectedRate={this.state.selectedRate} cToCur={this.state.toCur} 
                    cResult={this.state.result}/>
                
            </div>
        )
    }
}

export default CurrencyConverter