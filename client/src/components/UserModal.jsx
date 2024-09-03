import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";

let initialState = {
  name: "",
  email: "",
  phone: "",
  profession: "",
};

const UserModal = ({ isOpen, onClose, onSubmit, user = {} }) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        profession: user.profession || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    setFormData(initialState);
  };

  const handleCancel = () => {
    setFormData(initialState);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{user?.id ? "Edit User" : "Add New User"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl id="name" isRequired mt={4}>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
              />
            </FormControl>

            <FormControl id="email" isRequired mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </FormControl>

            <FormControl id="phone" isRequired mt={4}>
              <FormLabel>Phone</FormLabel>
              <Input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </FormControl>

            <FormControl id="profession" isRequired mt={4}>
              <FormLabel>Profession</FormLabel>
              <Input
                name="profession"
                type="text"
                value={formData.profession}
                onChange={handleChange}
                placeholder="Enter your profession"
              />
            </FormControl>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Save Changes
              </Button>
              <Button variant="ghost" onClick={handleCancel}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
