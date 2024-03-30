import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import { toast } from "react-toastify";
  
  export default function LocationTable() {
    const [locations, setLocations] = useState([]);
    const isLogin = localStorage.getItem("isLogin");
    const isUser = isLogin ? JSON.parse(isLogin) : null;
    const isAdmin = isUser?.access === "admin";
    const HOST = process.env.REACT_APP_API_HOST;
    const bgColor = useColorModeValue("#151f21", "gray.900");
  
    const deleteLocation = async (locationId) => {
      try {
        const response = await axios.delete(`${HOST}/api/location/${locationId}`);
        if (response.status === 200) {
          setLocations((prevLocations) =>
            prevLocations.filter((location) => location._id !== locationId)
          );
  
          toast.success(response.data.message);
        } else {
          toast.error("Error deleting location");
        }
      } catch (error) {
        console.error("Error deleting location:", error);
        toast.error("Error deleting location");
      }
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${HOST}/api/location`);
          setLocations(response.data);
        } catch (error) {
          console.error("Error fetching location data:", error);
        }
      };
  
      fetchData();
    }, [HOST]);
  
    return (
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>IP</Th>
            <Th>City</Th>
            <Th>Tehsil/Area</Th>
            <Th>District</Th>
            <Th>State</Th>
            <Th>Country</Th>
            <Th>Postal Code</Th>
            {isAdmin && <Th>Delete</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {locations.map((location, index) => (
            <Tr key={index}>
              <Td>{location.ipaddress}</Td>
              <Td>{location.city}</Td>
              <Td>{location.tehsil}</Td>
              <Td>{location.district}</Td>
              <Td>{location.state}</Td>
              <Td>{location.country}</Td>
              <Td>{location.postalCode}</Td>
              {isAdmin && (
                <Td>
                  <Button
                    bg={"red.400"}
                    color={"white"}
                    rounded={"md"}
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "lg",
                    }}
                    onClick={() => deleteLocation(location._id)}
                  >
                    Delete Location
                  </Button>
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  }
  