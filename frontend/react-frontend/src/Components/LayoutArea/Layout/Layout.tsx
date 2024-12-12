import { useEffect } from "react";
import { store, userActions } from "../../../Redux/state";
import { UserMenu } from "../../UserMenu/UserMenu";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Menu } from "../Menu/Menu";
import { Router } from "../Router/Router";
import { Box } from "@mui/system";
import  backgroundImg  from "../../../Assets/Images/backgroundImage.jpg"
import navImg from "../../../Assets/Images/nav_img.png";
import footerImg from "../../../Assets/Images/footer_img.png";

export function Layout(): JSX.Element {

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
          const firstName = localStorage.getItem("first_name");
          const lastName = localStorage.getItem("last_name");
          const action = userActions.login({firstName, lastName});
          store.dispatch(action);
        }
      }, []);

    const styles = {
        backgroundContainer: {
            backgroundImage: `url(${backgroundImg})`,
            backgroundRepeat: "no-repeat"

        },
        navContainer: {
            backgroundImage: `url(${navImg})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right",
            backgroundSize: "cover",

        },
        footerContainer: {
            backgroundImage: `url(${footerImg})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right",
            backgroundSize: "cover",

        }
    };

    return (
        <Box
        sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gridTemplateRows: '10% 87% 3%',
            width: '100%',
            height:'100%',
            gridTemplateAreas: `"header"
            "main"
            "footer"`,
        }}
>
            <Box sx={{ gridArea: 'header', bgcolor: 'primary.main', border: '1px solid black', display: 'flex'}} style={styles.navContainer}>
                <Menu />
                <Header />
                <UserMenu />
            </Box>
            <Box sx={{ gridArea: 'main', bgcolor: 'secondary.main', height: "100%", overflowY: "auto" }}  style={styles.backgroundContainer}><Router /></Box>
            <Box sx={{ gridArea: 'footer', bgcolor: 'warning.dark' }} style={styles.footerContainer}><Footer /></Box>
        </Box>
    );
}
