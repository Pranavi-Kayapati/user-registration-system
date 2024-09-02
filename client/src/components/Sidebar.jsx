import React from "react";
import {
  Box,
  VStack,
  HStack,
  Icon,
  Text,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  FaHome,
  FaUsers,
  FaProjectDiagram,
  FaCog,
  FaBars,
} from "react-icons/fa";

const Sidebar = ({ activeSection, setActiveSection }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isDesktop = useBreakpointValue({ base: false, md: true });

  const menuItems = [
    { name: "Dashboard", icon: FaHome },
    { name: "Users", icon: FaUsers },
    { name: "Projects", icon: FaProjectDiagram },
    { name: "Settings", icon: FaCog },
  ];

  return (
    <>
      {isDesktop && (
        <Box
          w="250px"
          bg="gray.50"
          h="100vh"
          borderRight="1px"
          borderColor="gray.200"
          p={4}
        >
          <VStack align="start" spacing={6}>
            {menuItems.map((item) => (
              <HStack
                key={item.name}
                spacing={4}
                cursor="pointer"
                onClick={() => setActiveSection(item.name)}
                bg={activeSection === item.name ? "gray.100" : "transparent"}
                p={2}
                borderRadius="md"
                w="full"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                }}
              >
                <Icon
                  as={item.icon}
                  color={activeSection === item.name ? "blue.500" : "gray.600"}
                />
                <Text
                  color={activeSection === item.name ? "blue.500" : "gray.600"}
                  mt={3}
                >
                  {item.name}
                </Text>
              </HStack>
            ))}
          </VStack>
        </Box>
      )}

      {!isDesktop && (
        <>
          <IconButton
            icon={<FaBars />}
            aria-label="Open menu"
            onClick={onOpen}
            position="fixed"
            top="4"
            left="4"
            zIndex="drawer"
          />

          <Drawer isOpen={isOpen} onClose={onClose} placement="left">
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Tacnique</DrawerHeader>
              <DrawerBody>
                <VStack spacing={4}>
                  {menuItems.map((item) => (
                    <HStack
                      key={item.name}
                      spacing={4}
                      cursor="pointer"
                      onClick={() => {
                        setActiveSection(item.name);
                        onClose();
                      }}
                      bg={
                        activeSection === item.name ? "gray.100" : "transparent"
                      }
                      p={2}
                      borderRadius="md"
                      w="full"
                    >
                      <Icon
                        as={item.icon}
                        color={
                          activeSection === item.name ? "blue.500" : "gray.600"
                        }
                      />
                      <Text
                        color={
                          activeSection === item.name ? "blue.500" : "gray.600"
                        }
                      >
                        {item.name}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </>
  );
};

export default Sidebar;
