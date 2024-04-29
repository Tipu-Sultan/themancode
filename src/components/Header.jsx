import {
  Box,
  Flex,
  Avatar,
  HStack,
  Image,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";

import {
  HamburgerIcon,
  CloseIcon,
  MoonIcon,
  SunIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import SearchWithMicInput from '../miscellaneous/SearchMic'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from 'react'
import axios from "axios";
import logos from "../assets/mylogo.png";
import "../App.css";

const Links = [
  { text: "Home", url: "/" },
  { text: "CodeBlock", url: "/codeblock" },
  { text: "Videos", url: "/videos" },
  { text: "Certificates", url: "/my-certificates" },
  { text: "UrlShortener", url: "/url-shortener" },
  { text: "Coins", url: "/coins" },
  { text: "Exchanges", url: "/exchanges" },
  { text: "News", url: "/news" },
  { text: "AddVideo", url: "/upload" },
  { text: "AddCode", url: "/editor" },
  { text: "AddProject", url: "/addproject" },
  { text: "MyAssets", url: "/myassets" },
];

const mainLinks = Links.slice(0, 5); // Links from Home to Coin
const dropdownLinks = Links.slice(5); // Links to be included in the dropdown

export default function WithAction() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.post(`${process.env.REACT_APP_API_HOST}/api/userlogs`);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const location = useLocation();
  const currentPath = location.pathname;
  if (currentPath !== '/login' && currentPath.split('/')[1] !== 'activation') {
    localStorage.setItem("currentPath", currentPath);
  }
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const handleLogout = () => {
    localStorage.removeItem("isLogin"); // Remove the isLogin from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("uuid");
    // Redirect or update application state accordingly
    setTimeout(() => navigate('/', 100));
  };

  const isLogin = localStorage.getItem("isLogin");
  const isUser = isLogin ? JSON.parse(isLogin) : null;
  const isAdmin = isUser?.access === "admin";
  // Determine if the device is a mobile device
  const [isMobile] = useMediaQuery("(max-width: 766px)");

  // Function to determine if a link is active based on the current URL
  const isLinkActive = (url) => {
    return location.pathname === url;
  };

  const HOST = process.env.REACT_APP_API_HOST
  const turnOffServices = async () => {
    await axios.post(`${HOST}/api/auth/turnoff`, {
      id: isUser?._id
    })
  }
  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        position={isMobile ? 'static' : 'fixed'}
        top={0}
        width="100%"
        zIndex={999}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ base: "block", md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Link to={"/"}>
                <Image
                  src={logos}
                  alt={"logo"}
                  width={isMobile ? "187px" : "250px"}
                  height={isMobile ? "31px" : "42px"}
                />
              </Link>
            </Box>
            <HStack as={"nav"} spacing={4} display={isMobile ? "none" : "flex"}>
              {mainLinks.map((link, i) => (
                <Button
                  variant={isLinkActive(link.url) ? "outline" : "ghost"}
                  key={i}
                  as={Link}
                  to={link.url}
                >
                  {link.text}
                </Button>
              ))}

              <Menu>
                <MenuButton
                  as={Button}
                  colorScheme="gray"
                  variant="ghost"
                  borderRadius="md"
                  px={4}
                  rightIcon={<ChevronDownIcon />}
                >
                  More
                </MenuButton>
                <MenuList>
                  {dropdownLinks
                    .filter(
                      (link) =>
                        !(link.text === "AddProject" || link.text === "MyAssets" || link.text === "AddCode" || link.text === "AddVideo") ||
                        isAdmin
                    )
                    .map((link, i) => (
                      <MenuItem key={i} as={Link} to={link.url}>
                        {link.text}
                      </MenuItem>
                    ))}
                </MenuList>
              </Menu>
            </HStack>
            <SearchWithMicInput />
          </HStack>
          <Flex alignItems={"center"}>
            {isMobile ? null : isLogin ? (
              <>
                <Button colorScheme="purple" right={"4"}>
                  <Link onClick={handleLogout}>Logout</Link>
                </Button>
              </>
            ) : (
              <>
                <Button
                  colorScheme="purple"
                  variant={"outline"}
                  right={"6"}
                  className="hideAuth"
                  as={Link} to={'/signup'}
                >
                  Sign Up
                </Button>
                <Button colorScheme="purple" right={"4"} className="hideAuth" as={Link} to={'/login'} >
                  Log In
                </Button>
              </>
            )}

            {isMobile ? (
              <IconButton
                aria-label="Toggle color mode"
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                right={"2"}
              />
            ) : (
              <IconButton
                aria-label="Toggle color mode"
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                right={"2"}
              />
            )}

            {isUser &&
              <Menu>
                <MenuButton
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      "https://icon-library.com/images/cool-discord-icon/cool-discord-icon-6.jpg"
                    }
                    alt="user-avatar"
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem as={Link} to={"/profile"}>
                    Profile
                  </MenuItem>
                  <MenuItem as={Link} to={"/profile"}>
                    Setting
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem as={Link} to={"/forgetpassword"}>
                    Change Password
                  </MenuItem>
                  {isAdmin &&
                    <MenuItem>
                      <Button onClick={turnOffServices} >TurnOff</Button>
                    </MenuItem>
                  }
                </MenuList>
              </Menu>
            }
          </Flex>
        </Flex>

        {isMobile && isOpen ? (
          <Box pb={4}>
            <Stack as={"nav"} spacing={4}>
              {Links.filter(
                (link) =>
                  !(link.text === "AddProject" || link.text === "MyAssets" || link.text === "AddCode" || link.text === "AddVideo") ||
                  isAdmin
              ).map((link, i) => (
                <Button
                  colorScheme="purple"
                  variant={"ghost"}
                  key={i}
                  onClick={isOpen ? onClose : onOpen}
                  as={Link}
                  to={link.url}
                >
                  {link.text}
                </Button>
              ))}

              {isLogin ? (
                <Button
                  colorScheme="purple"
                  onClick={isOpen ? onClose : onOpen}
                >
                  <Link onClick={handleLogout}>Logout</Link>
                </Button>
              ) : (
                <>
                  <Button
                    colorScheme="purple"
                    onClick={isOpen ? onClose : onOpen}
                    as={Link}
                    to={'/login'}
                  >
                    Log In
                  </Button>

                  <Button
                    colorScheme="purple"
                    variant={"outline"}
                    onClick={isOpen ? onClose : onOpen}
                    as={Link}
                    to={'/signup'}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}