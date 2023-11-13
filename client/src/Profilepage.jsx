import { Header, Image, Grid, Card, Button } from 'semantic-ui-react'

function Profilepage() {

    return (
        <Grid style={{height: "100vh"}}>
            <Grid.Row verticalAlign='middle'>
                <Grid.Column textAlign='center'>
                    <Image avatar
                        src="https://react.semantic-ui.com/images/wireframe/square-image.png"
                    />
                    <Header style={{ margin: '5px' }} as='h3'>Voornaam Achternaam</Header>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row verticalAlign='middle'>
                <Grid.Column textAlign='center'>
                    <Header as='h2'>My top 3 books</Header>
                    <Card.Group centered itemsPerRow={3}>
                        <Card style={{width: "85px", height: "130px"}} image="https://react.semantic-ui.com/images/wireframe/square-image.png"></Card>
                        <Card style={{width: "85px", height: "130px"}} image="https://react.semantic-ui.com/images/wireframe/square-image.png"></Card>
                        <Card style={{width: "85px", height: "130px"}} image="https://react.semantic-ui.com/images/wireframe/square-image.png"></Card>
                    </Card.Group>
                    <Image centered style={{width: "320px", height: "20px"}} src="..\images\boekenplank.jpg"></Image>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row verticalAlign='bottom'>
                <Grid.Column textAlign='center'>
                    <Button>Create your own shelf</Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )

}

export default Profilepage