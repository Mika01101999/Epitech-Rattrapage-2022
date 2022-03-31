import { Bar } from 'react-chartjs-2';
import { Box, makeStyles } from '@material-ui/core';


const useStyle = makeStyles({
    container : {
        width: '65%',
        marginTop: 5
    }
})

const Chart = ({ data: { confirmed, deaths }}) => {
    const classes = useStyle();
    return (
        <Box className = {classes.container}>
            {confirmed ? (
            <Bar 
                data = {{
                    labels: ['Infected', 'Deaths'],
                    datasets: [{
                        label: 'Peoples',
                        data: [confirmed.value, deaths.value],
                        backgroundColor: [
                            'rgba(0, 0, 255, 0.5)',
                            'rgba(255, 0, 0, 0.5)',
                        ],
                    }]
                }}
                options = {{
                    legend: {display: false},
                    title: { display: true, text: 'Current State in Country'}
                }}
            /> ) : ''
        }   
        </Box>
            
    )
}

export default Chart;