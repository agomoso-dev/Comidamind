import { Container } from "@mui/material"
import Footer from "../../components/navigation/Footer"
import Header from "../../components/navigation/Header"
import Navigation from "../../components/navigation/Navigation"

function PageWraper({page}) {
    return (
        <>
        <Header navigation={<Navigation/>}></Header>
            <Container sx={{padding:"5%", paddingBottom:"10%", }}>
                {page}
            </Container>
        <Footer navigation={<Navigation/>}></Footer>
        </>
    )
}

export default PageWraper