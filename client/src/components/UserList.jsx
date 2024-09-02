import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteUser,
  getUser,
  postUser,
  updateUser,
} from "../redux/userReducer/action";
import {
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Text,
  Heading,
  Spacer,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure,
  Avatar,
  Wrap,
  WrapItem,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  Input,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import UserModal from "./UserModal";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const UserList = () => {
  const dispatch = useDispatch();
  const { users, isLoading, isError, error } = useSelector(
    (store) => store.userReducer
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const usersPerPage = 5;
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (!isOpen) {
      setSelectedUser(null);
    }
  }, [isOpen]);

  const handleEditUser = (id) => {
    const user = users.find((user) => user._id === id);
    setSelectedUser(user);
    onOpen();
  };

  const handleFormSubmit = (formData) => {
    if (selectedUser) {
      dispatch(updateUser(formData, selectedUser._id));
    } else {
      let newUser = {
        id: users.length + 1,
        ...formData,
      };
      dispatch(postUser(newUser));
    }
    setSelectedUser(null);
    onClose();
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  // Filtering logic
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sorting logic
  const sortUsers = (users, field, direction) => {
    return [...users].sort((a, b) => {
      if (a[field] < b[field]) return direction === "asc" ? -1 : 1;
      if (a[field] > b[field]) return direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const sortedUsers = sortUsers(filteredUsers, sortField, sortDirection);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (field) => {
    if (sortField === field) {
      setSortDirection((prevDirection) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const renderSortIcon = (field) => {
    if (sortField === field) {
      return sortDirection === "desc" ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <Box borderWidth="0px" borderRadius="md" overflow="hidden">
      <Box p={2} bg="white" boxShadow="md" borderRadius="md">
        <Flex align="center" gap={{ base: 2, md: 2 }}>
          <Box flex="1">
            <Heading size="lg">Users</Heading>
          </Box>

          <Flex
            direction={{ base: "row", md: "row" }}
            align="center"
            gap={{ base: 2, md: 4 }}
            mt={{ base: 4, md: 0 }}
          >
            <Input
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="sm"
              maxW={{ base: "100%", md: "200px" }}
            />
          </Flex>
        </Flex>
      </Box>

      <Table variant="simple" border={"none"} mt={4}>
        <Thead bg="gray.50">
          <Tr>
            <Th onClick={() => handleSortChange("id")}>
              <Flex>
                <Text>ID</Text>
                <span>{renderSortIcon("id")}</span>
              </Flex>
            </Th>
            <Th>
              <Flex>
                <Text>Avatar</Text>
              </Flex>
            </Th>
            <Th onClick={() => handleSortChange("name")}>
              <Flex>
                <Text>Name</Text>
                <span>{renderSortIcon("name")}</span>
              </Flex>
            </Th>
            <Th onClick={() => handleSortChange("email")}>
              <Flex>
                <Text>Email</Text>
                <span>{renderSortIcon("email")}</span>
              </Flex>
            </Th>
            <Th onClick={() => handleSortChange("phone")}>
              <Flex>
                <Text>Phone</Text>
                <span>{renderSortIcon("phone")}</span>
              </Flex>
            </Th>
            <Th onClick={() => handleSortChange("profession")}>
              <Flex>
                <Text>Profession</Text>
                <span>{renderSortIcon("profession")}</span>
              </Flex>
            </Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading ? (
            [1, 2, 3, 4, 5].map(() => (
              <Tr key={Math.random()}>
                <Td>
                  <Skeleton height="20px" width="40px" />
                </Td>
                <Td>
                  <Wrap>
                    <WrapItem>
                      <SkeletonCircle size="10" />
                    </WrapItem>
                  </Wrap>
                </Td>
                <Td>
                  <SkeletonText mt="4" noOfLines={1} skeletonHeight="20px" />
                </Td>
                <Td>
                  <SkeletonText mt="4" noOfLines={1} skeletonHeight="20px" />
                </Td>
                <Td>
                  <SkeletonText mt="4" noOfLines={1} skeletonHeight="20px" />
                </Td>
                <Td>
                  <Popover placement="left-start">
                    <PopoverTrigger>
                      <Button variant={"text"} isDisabled>
                        <Skeleton height="20px" width="20px" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>More</PopoverHeader>
                      <PopoverBody>
                        <Box p={3}>
                          <Skeleton height="20px" width="80px" />
                        </Box>
                        <Box p={3}>
                          <Skeleton height="20px" width="80px" />
                        </Box>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Td>
              </Tr>
            ))
          ) : paginatedUsers.length === 0 ? (
            <Tr>
              <Td colSpan={6} textAlign="center">
                <Text>No users found</Text>
              </Td>
            </Tr>
          ) : (
            paginatedUsers.map((user, index) => (
              <Tr key={user._id} p={2}>
                <Td>{index + 1}</Td>
                <Td>
                  <Wrap>
                    <WrapItem>
                      <Avatar size={"sm"} name={user.name} src={user.image} />
                    </WrapItem>
                  </Wrap>
                </Td>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.phone}</Td>
                <Td>{user.profession}</Td>
                <Td>
                  <Popover placement="left-start">
                    <PopoverTrigger>
                      <Button variant={"text"}>
                        <IoMdMore />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>More</PopoverHeader>
                      <PopoverBody>
                        <Box p={3}>
                          <Button
                            onClick={() => handleEditUser(user._id)}
                            variant="ghost"
                          >
                            Edit user details
                          </Button>
                        </Box>
                        <Box p={3}>
                          <Button
                            onClick={() => handleDelete(user._id)}
                            variant="ghost"
                          >
                            Delete user
                          </Button>
                        </Box>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>

      {/* Pagination Controls */}
      <Flex justifyContent="center" mt={4}>
        <Button
          leftIcon={<ArrowBackIcon />}
          onClick={handlePrevPage}
          isDisabled={currentPage === 1}
          mr={2}
        >
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            onClick={() => handlePageClick(index + 1)}
            colorScheme={currentPage === index + 1 ? "blue" : "gray"}
            mr={2}
            variant={currentPage === index + 1 ? "outline" : "ghost"}
            border={"none"}
            borderBottom={currentPage === index + 1 ? "1px" : "0"}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          rightIcon={<ArrowForwardIcon />}
          onClick={handleNextPage}
          isDisabled={currentPage === totalPages}
          ml={2}
        >
          Next
        </Button>
      </Flex>

      {/* User Modal */}
      {isOpen && (
        <UserModal
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleFormSubmit}
          user={selectedUser}
        />
      )}
    </Box>
  );
};

export default UserList;
