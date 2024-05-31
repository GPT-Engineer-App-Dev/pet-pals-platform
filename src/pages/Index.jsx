import { Box, Button, Container, Flex, Heading, HStack, Image, Input, Stack, Text, Textarea, VStack, Select } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [filteredPets, setFilteredPets] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  const handleSearch = () => {
    // Example pets data; replace with actual data source
    const pets = [
      { name: "Buddy", species: "Dog", breed: "Labrador", age: "2", location: "New York" },
      { name: "Mittens", species: "Cat", breed: "Siamese", age: "3", location: "Los Angeles" },
      // Add more pets here
    ];

    const results = pets.filter(pet => 
      (species === "" || pet.species === species) &&
      (breed === "" || pet.breed === breed) &&
      (age === "" || pet.age === age) &&
      (location === "" || pet.location === location) &&
      (searchTerm === "" || pet.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    setFilteredPets(results);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleAdoptClick = (pet) => {
    setSelectedPet(pet);
    setIsFormVisible(true);
  };

  return (
    <Container maxW="container.xl" p={0}>
      {/* Navigation Bar */}
      <Flex as="nav" bg="teal.500" color="white" p={4} justifyContent="space-between" alignItems="center">
        <Heading size="md">Pet Adoption</Heading>
        <HStack spacing={8}>
          <Link to="/">Home</Link>
          <Link to="#adopt">Adopt a Pet</Link>
          <Link to="#how-it-works">How It Works</Link>
          <Link to="#contact">Contact Us</Link>
        </HStack>
      </Flex>

      {/* Hero Section */}
      <Box as="section" bg="gray.100" py={20} textAlign="center">
        <Heading size="2xl" mb={4}>Find Your New Best Friend</Heading>
        <Text fontSize="lg" mb={6}>Adopt a pet and give them a forever home.</Text>
        <Button colorScheme="teal" size="lg">Get Started</Button>
      </Box>

      {/* Available Pets Section */}
      <Box as="section" id="adopt" py={20} textAlign="center">
        <Heading size="xl" mb={10}>Available Pets for Adoption</Heading>
        <VStack spacing={4} mb={10}>
          <Input 
            placeholder="Search by name" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <Select placeholder="Select species" value={species} onChange={(e) => setSpecies(e.target.value)}>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            {/* Add more species options here */}
          </Select>
          <Input 
            placeholder="Breed" 
            value={breed} 
            onChange={(e) => setBreed(e.target.value)} 
          />
          <Input 
            placeholder="Age" 
            value={age} 
            onChange={(e) => setAge(e.target.value)} 
          />
          <Input 
            placeholder="Location" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
          />
          <Button colorScheme="teal" onClick={handleSearch}>Search</Button>
        </VStack>
        <Flex wrap="wrap" justifyContent="center" spacing={10}>
          {filteredPets.map((pet, index) => (
            <Box key={index} bg="white" boxShadow="md" borderRadius="md" overflow="hidden" m={4} maxW="sm">
              <Image src="https://via.placeholder.com/300" alt="Pet Image" />
              <Box p={6}>
                <Heading size="md" mb={2}>{pet.name}</Heading>
                <Text mb={4}>Breed: {pet.breed}</Text>
                <Text mb={4}>Age: {pet.age}</Text>
                <Text mb={4}>Location: {pet.location}</Text>
                <Button colorScheme="teal" onClick={() => handleAdoptClick(pet)}>Adopt Me</Button>
              </Box>
            </Box>
          ))}
          {/* Example Pet Card */}
          <Box bg="white" boxShadow="md" borderRadius="md" overflow="hidden" m={4} maxW="sm">
            <Image src="https://via.placeholder.com/300" alt="Pet Image" />
            <Box p={6}>
              <Heading size="md" mb={2}>Pet Name</Heading>
              <Text mb={4}>Breed: Breed Name</Text>
              <Button colorScheme="teal">Adopt Me</Button>
            </Box>
          </Box>
          {/* Repeat similar blocks for more pets */}
        </Flex>
      </Box>

      {isFormVisible && (
        <Box as="section" id="adoption-form" py={20} textAlign="center">
          <Heading size="xl" mb={10}>Adoption Request Form</Heading>
          <Box maxW="md" mx="auto">
            <VStack spacing={4}>
              <Text>Adopting: {selectedPet.name}</Text>
              <Input placeholder="Your Name" />
              <Input placeholder="Your Email" />
              <Textarea placeholder="Additional Information" />
              <Button colorScheme="teal" onClick={() => alert('Adoption request submitted!')}>Submit Request</Button>
            </VStack>
          </Box>
        </Box>
      )}

      {/* How It Works Section */}
      <Box as="section" id="how-it-works" bg="gray.100" py={20} textAlign="center">
        <Heading size="xl" mb={10}>How It Works</Heading>
        <Stack spacing={8} maxW="3xl" mx="auto">
          <Box>
            <Heading size="md" mb={2}>Step 1</Heading>
            <Text>Find a pet that you are interested in adopting.</Text>
          </Box>
          <Box>
            <Heading size="md" mb={2}>Step 2</Heading>
            <Text>Contact us to arrange a meeting with the pet.</Text>
          </Box>
          <Box>
            <Heading size="md" mb={2}>Step 3</Heading>
            <Text>Complete the adoption process and take your new friend home.</Text>
          </Box>
        </Stack>
      </Box>

      {/* Contact Us Section */}
      <Box as="section" id="contact" py={20} textAlign="center">
        <Heading size="xl" mb={10}>Contact Us</Heading>
        <Box maxW="md" mx="auto">
          <VStack spacing={4}>
            <Input placeholder="Your Name" />
            <Input placeholder="Your Email" />
            <Textarea placeholder="Your Message" />
            <Button colorScheme="teal">Send Message</Button>
          </VStack>
        </Box>
      </Box>
    </Container>
  );
};

export default Index;