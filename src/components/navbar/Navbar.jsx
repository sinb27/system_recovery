import * as React from "react"; // นำเข้าโมดูลทั้งหมดที่ต้องการจาก React, ให้เราสามารถใช้งานฟีเจอร์ต่างๆ ของ React
import { styled, useTheme } from "@mui/material/styles"; // นำเข้าโมดูล "styled" และ "useTheme" จาก "@mui/material/styles" สำหรับการใช้งาน Styled Components และเข้าถึง Theme จาก Material-UI
import Box from "@mui/material/Box"; // นำเข้า Box จาก "@mui/material/Box" ซึ่งเป็นคอมโพเนนต์ที่ให้ความสะดวกในการจัดการ layout และ spacing
import MuiDrawer from "@mui/material/Drawer"; // นำเข้า Drawer จาก "@mui/material/Drawer" ซึ่งเป็นคอมโพเนนต์ที่เปิดเมนูแบบเลื่อนได้จากข้าง
import MuiAppBar from "@mui/material/AppBar"; // นำเข้า AppBar จาก "@mui/material/AppBar" ซึ่งเป็นคอมโพเนนต์สำหรับส่วนหัวของหน้าเว็บ
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Fuji from "/Fuji.png";
import { Link } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

//*mui icon ******************************************************
// import ComputerIcon from "@mui/icons-material/Computer";
// import CableIcon from "@mui/icons-material/Cable";
// import StayPrimaryPortraitIcon from "@mui/icons-material/StayPrimaryPortrait";
// import MemoryIcon from "@mui/icons-material/Memory";
// import DomainIcon from "@mui/icons-material/Domain";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import AccountMenu from "./AccountMenu";
//*---------------------------------------------------------------
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

// สร้าง mixin สำหรับสไตล์ของ Drawer เมื่อถูกปิด
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Navbar({ onToggle }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
    onToggle(true); // Notify parent component
  };

  const handleDrawerClose = () => {
    setOpen(false);
    onToggle(false); // Notify parent component
  };

  //bind value user from localstorage
  const userString = localStorage.getItem("userToken");
  const userObject = JSON.parse(userString);
  const userName = userObject?.user_name;
  const userSurname = userObject?.user_surname;
  // const userRole = userObject?.role_type;

  const userGuest = localStorage.getItem("guestToken");
  const userGuestObject = JSON.parse(userGuest);
  const userGuestName = userGuestObject?.user_login;
  // const userGuestRole = userGuestObject?.role_type;

  //*Menu name ******************************************************

  const [menuName, setMenuName] = React.useState("System Recovery");
  const [menuIcon, setMenuIcon] = React.useState(
    <img src="/dashboard.png" alt="" width={30} />
  );

  React.useEffect(() => {
    switch (location.pathname) {
      case "/home":
        setMenuName("Home");
        setMenuIcon(<img src="/house.png" alt="" width={30} />);
        break;
      case "/computer_in_process":
        setMenuName("Computer in Process");
        setMenuIcon(<img src="/computer.png" alt="" width={30} />);
        break;
      case "/connect_newwork":
        setMenuName("PC Connect Newwork");
        setMenuIcon(<img src="/lan.png" alt="" width={30} />);
        break;
      case "/tablet":
        setMenuName("Tablet");
        setMenuIcon(<img src="/tablet.png" alt="" width={30} />);
        break;
      case "/rasbery_pi":
        setMenuName("Rasbery Pi");
        setMenuIcon(<img src="/raspberries.png" alt="" width={30} />);
        break;
      case "/join_domain":
        setMenuName("Join Domain");
        setMenuIcon(<img src="/domain.png" alt="" width={30} />);
        break;
      default:
        setMenuName("IT Management System Recovery");
        setMenuIcon(<img src="/dashboard.png" alt="" width={30} />);
    }
  }, [location.pathname]);

  //*Active menu ******************************************************

  const isActive = (to) => {
    return location.pathname === to;
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        {/* HEADER MUI APPBAR */}

        <AppBar position="fixed" open={open}>
          <Toolbar
            sx={{ display: "flex", justifyContent: "space-between" }} // Add this
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {" "}
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <div className="animate-rtl">
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    gap: 2,
                  }}
                >
                  {menuIcon}
                  {menuName}
                </Typography>
              </div>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="p" sx={{ mr: 1, fontWeight: "Bold" }}>
                {userName && userSurname
                  ? `${userName.charAt(0).toUpperCase()}${userName
                      .slice(1)
                      .toLowerCase()} ${userSurname
                      .charAt(0)
                      .toUpperCase()}${userSurname.slice(1).toLowerCase()}`
                  : userGuestName}
              </Typography>

              <AccountMenu />

              {/* If you have other elements, you can continue adding them here */}
            </Box>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <Link to="/home">
              <img
                src={Fuji}
                alt="คำอธิบายภาพ"
                style={{
                  width: 180, // กำหนดความกว้างของภาพให้เต็มขนาดของพื้นที่ที่รองรับ
                  height: 45, // กำหนดความสูงของภาพให้ปรับแต่งตามอัตราส่วนต้นฉบับ
                }}
              />
            </Link>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />

          {/* //*Menu list ****************************************************** */}

          {/* //Home */}
          <List open={open}>
            <ListItem
              onClick={() => setMenuName("Home")}
              disablePadding
              sx={{
                display: "block",
                color: isActive("/home") ? " #3b82f6 " : "initial",
                backgroundColor: isActive("/home") ? "#D6EAF8" : "initial",
              }}
              component={Link}
              to="/home"
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "inherit", // Set initial color
                    "&:hover": {
                      color: "primary.main", // Change color on hover
                    },
                  }}
                >
                  <img src="/house.png" alt="" width={30} />
                </ListItemIcon>
                <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            {/* //Computer in Process */}
            <ListItem
              onClick={() => setMenuName("Computer in Process")}
              disablePadding
              sx={{
                display: "block",
                color: isActive("/computer_in_process")
                  ? " #3b82f6 "
                  : "initial",
                backgroundColor: isActive("/computer_in_process")
                  ? "#D6EAF8"
                  : "initial",
              }}
              component={Link}
              to="/computer_in_process"
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "inherit", // Set initial color
                    "&:hover": {
                      color: "primary.main", // Change color on hover
                    },
                  }}
                >
                  <img src="/computer.png" alt="" width={30} />
                </ListItemIcon>
                <ListItemText
                  primary="Computer in Process"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>

            {/* //Project PC */}
            <ListItem
              onClick={() => setMenuName("PC Connect Newwork")}
              disablePadding
              sx={{
                display: "block",
                color: isActive("/connect_newwork") ? " #3b82f6 " : "initial",
                backgroundColor: isActive("/connect_newwork")
                  ? "#D6EAF8"
                  : "initial",
              }}
              component={Link}
              to="/connect_newwork"
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "inherit", // Set initial color
                    "&:hover": {
                      color: "primary.main", // Change color on hover
                    },
                  }}
                >
                  <img src="/lan.png" alt="" width={30} />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography>Connect Network</Typography>}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>

            {/* //Project Tablet */}
            <ListItem
              onClick={() => setMenuName("Tablet")}
              disablePadding
              sx={{
                display: "block",
                color: isActive("/tablet") ? " #3b82f6 " : "initial",
                backgroundColor: isActive("/tablet") ? "#D6EAF8" : "initial",
              }}
              component={Link}
              to="/tablet"
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "inherit", // Set initial color
                    "&:hover": {
                      color: "primary.main", // Change color on hover
                    },
                  }}
                >
                  <img src="/tablet.png" alt="" width={30} />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography>Tablet</Typography>}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>

            {/* //Project Rasbery Pi */}
            <ListItem
              onClick={() => setMenuName("Rasbery Pi")}
              disablePadding
              sx={{
                display: "block",
                color: isActive("/rasbery_pi") ? " #3b82f6 " : "initial",
                backgroundColor: isActive("/rasbery_pi")
                  ? "#D6EAF8"
                  : "initial",
              }}
              component={Link}
              to="/rasbery_pi"
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "inherit", // Set initial color
                    "&:hover": {
                      color: "primary.main", // Change color on hover
                    },
                  }}
                >
                  <img src="/raspberries.png" alt="" width={30} />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography>Rasbery Pi</Typography>}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>

            {/* //Join Domain */}
            <ListItem
              onClick={() => setMenuName("Join Domain")}
              disablePadding
              sx={{
                display: "block",
                color: isActive("/join_domain") ? " #3b82f6 " : "initial",
                backgroundColor: isActive("/join_domain")
                  ? "#D6EAF8"
                  : "initial",
              }}
              component={Link}
              to="/join_domain"
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "inherit", // Set initial color
                    "&:hover": {
                      color: "primary.main", // Change color on hover
                    },
                  }}
                >
                  <img src="/domain.png" alt="" width={30} />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography>Join Domain</Typography>}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </Box>
    </>
  );
}
