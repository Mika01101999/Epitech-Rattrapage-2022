import { Box, CircularProgress, Grid  } from "@material-ui/core";
import CountUp from 'react-countup';
import { Card } from 'react-bootstrap';

const Cards = ({ data: {confirmed, recovered, deaths, lastUpdate }}) => { 

    if(!confirmed){
        return <CircularProgress  />
    }

    return (
        <Box >
            <Grid >
            <div >
            <Card.Body>
              <Card.Text>
              Cases: <CountUp start={0} end={confirmed.value} duration={1} seperator="," />
              </Card.Text>
              <Card.Text>
              Deaths: <CountUp start={0} end={deaths.value} duration={1} seperator="," />
              </Card.Text>
            </Card.Body>
        </div>
            </Grid>
        </Box>
    )
}

export default Cards;
