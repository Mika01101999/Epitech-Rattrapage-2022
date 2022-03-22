import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import logo1 from "../assets/covid-19.svg";
import axios from 'axios';
import { CircularProgress } from "@material-ui/core";
import Countries from '../components/Countries';
import Cards from '../components/Cards';
import Chart from '../components/Chart';

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
    let changedUrl = url;
    if(country){
        changedUrl = `${url}/countries/${country}`;
    }
    try {
       const { data: { confirmed, recovered, deaths, lastUpdate } } =  await axios.get(changedUrl);
       return { confirmed, recovered, deaths, lastUpdate };
    } catch(error){
        return error;
    }
}

export const fetchCountries = async() => {
  try {
      const { data: { countries } } = await axios.get(`${url}/countries`);
      return countries.map(country => country.name );
  } catch(error){
      return error;
  }
}


export class CovidCountryWidget extends Component {

  state = {
    data: {},
    country: ''
  }

  async componentDidMount(){
    const fetchedData = await fetchData("Afghanistan");
    this.setState({data: fetchedData})
    console.log(fetchedData);
  }

  handleCountryChange = async(country) => {
    const fetchedData = await fetchData(country);
    this.setState({data: fetchedData, country: country})
    console.log(fetchedData);
  }


  render(){
    const { data } = this.state;
    return (
      <div >
        <Card style={{ width: '39rem', height: '20rem' , backgroundColor: '#ececec'}}>
        <Card.Img variant="top-left" src={logo1} width="50"
            height="50" align="left"/>
        <Card.Body>
        <Card.Title>Covid Numbers by Country</Card.Title>
        <Countries handleCountryChange={this.handleCountryChange} />
        <Cards data={data} />
        </Card.Body>
        </Card>
      </div>
    )
  }
}

export class CovidCountryChartWidget extends Component {

  state = {
    data: {},
    country: ''
  }

  async componentDidMount(){
    const fetchedData = await fetchData("Afghanistan");
    this.setState({data: fetchedData})
    console.log(fetchedData);
  }

  handleCountryChange = async(country) => {
    const fetchedData = await fetchData(country);
    this.setState({data: fetchedData, country: country})
    console.log(fetchedData);
  }


  render(){
    const { data } = this.state;
    return (
      <div >
        <Card style={{ width: '39rem', height: '20rem' , backgroundColor: '#ececec'}}>
        <Card.Img variant="top-left" src={logo1} width="50"
            height="50" align="left"/>
        <Card.Body>
        <Card.Title>Covid Country Numbers Graphs</Card.Title>
        <Countries handleCountryChange={this.handleCountryChange} />
        <Chart data={data} />
        </Card.Body>
        </Card>
      </div>
    )
  }
}

export class CovidGlobalWidget extends Component {

  async componentDidMount(){
      const fetchedData = await fetchData();
      this.setState({data: fetchedData})
      console.log(fetchedData);
    }

    render() {

      if(!this.state){
          return <CircularProgress  />
      }

      return (
        <div >
          <Card style={{ width: '39rem', height: '20rem' , backgroundColor: '#ececec'}}>
            <Card.Img variant="top-left" src={logo1} width="50"
              height="50" align="left"/>
            <Card.Body>
            <Card.Title>Covid Global Numbers</Card.Title>
              <Card.Text>
                Cases: {this.state.data.confirmed.value}
              </Card.Text>
              <Card.Text>
                Deaths: {this.state.data.deaths.value}
              </Card.Text>
            </Card.Body>
            </Card>
        </div>
      )
    }
}