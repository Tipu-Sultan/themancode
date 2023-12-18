import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  Box,
  Image,
  Text,
  SimpleGrid,
  Select,
  Flex,
  Badge,
  Spinner,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Newswala = () => {
  const [newsData, setNewsData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('us');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [selectedSort, setSelectedSort] = useState('publishedAt');
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);

  const countryOptions = [
    { label: 'India', value: 'in' },
    { label: 'United States', value: 'us' },
    { label: 'Canada', value: 'ca' },
    { label: 'United Kingdom', value: 'gb' },
    { label: 'Australia', value: 'au' },
    { label: 'Pakistan', value: 'pk' },
    { label: 'China', value: 'cn' },
    { label: 'Saudi Arabia', value: 'sa' },
    { label: 'UAE (United Arab Emirates)', value: 'ae' },
    { label: 'New Zealand', value: 'nz' },
    { label: 'Palestine', value: 'ps' },
    // Add more countries here
  ];

  const categoryOptions = [
    { label: 'General', value: 'general' },
    { label: 'Politics', value: 'politics' },
    { label: 'Business', value: 'business' },
    { label: 'Technology', value: 'technology' },
    { label: 'Entertainment', value: 'entertainment' },
    { label: 'Health', value: 'health' },
    // Add more categories here
  ];

  const sortOptions = [
    { label: 'Published Date', value: 'publishedAt' },
    { label: 'Popularity', value: 'popularity' },
    { label: 'Relevancy', value: 'relevancy' },
  ];

  const handleCountryChange = event => {
    setSelectedCountry(event.target.value);
    setPage(1);
  };

  const handleCategoryChange = event => {
    setSelectedCategory(event.target.value);
    setPage(1);
  };

  const handleSortChange = event => {
    setSelectedSort(event.target.value);
    setPage(1);
  };

  const handlePageSizeChange = event => {
    setPageSize(event.target.value);
    setPage(1);
  };

  useEffect(() => {
    const urlWithCategory = `https://newsapi.org/v2/top-headlines?country=${selectedCountry}&category=${selectedCategory}&sortBy=${selectedSort}&pageSize=${pageSize}&apiKey=0adc9352ddc0431f86273c69ece34451`;

    axios
      .get(urlWithCategory)
      .then(response => {
        // Append new data if page is greater than 1, otherwise replace data
        setNewsData(prevData =>
          page > 1
            ? [...prevData, ...response.data.articles]
            : response.data.articles
        );
        setTotalResults(response.data.totalResults);
        setLoading(false);
      })
      .catch(error => {
        console.log('error: ' + error);
        setLoading(false);
      });
  }, [selectedCountry, selectedCategory, selectedSort, pageSize, page]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;

    if (bottom && newsData.length < totalResults && newsData.length < 100) {
      setLoading(true);
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="center"
        position="fixed"
        width="100%"
        zIndex={1}
        mt={50}
        top={0}
        p={4}
      >
        <Select
          value={selectedCountry}
          onChange={handleCountryChange}
          mb={{ base: 2, md: 0 }}
          mr={{ base: 0, md: 4 }}
        >
          {countryOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          mb={{ base: 2, md: 0 }}
          mr={{ base: 0, md: 4 }}
        >
          {categoryOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <Select
          value={selectedSort}
          onChange={handleSortChange}
          mb={{ base: 2, md: 0 }}
          mr={{ base: 0, md: 4 }}
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <Select
          value={pageSize}
          onChange={handlePageSizeChange}
          mb={{ base: 2, md: 0 }}
          mr={{ base: 0, md: 4 }}
        >
          <option>Select Page Size</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </Select>
      </Flex>
      <Box marginTop="200px">
        <SimpleGrid
          columns={{ base: 1, md: 3, sm: 1, lg: 5 }}
          spacing={5}
          mt={50}
          mb={50}
        >
          {newsData ? (
            newsData.map((item, index) => (
              <Box
                key={index}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="lg"
                transition="transform 0.5s"
                _hover={{ transform: 'scale(0.9)' }}
              >
                <Link to={item.url} target="_blank">
                  <Image
                    src={
                      item.urlToImage ||
                      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png'
                    }
                    alt="IMAGE NOT FOUND"
                    aspectRatio={16 / 9}
                    objectFit="cover"
                  />

                  <Box p={6}>
                    <Flex justify="space-between" align="center" mb={2}>
                      <Badge variant="outline" colorScheme="teal">
                        {item.source.name || 'Unknown'}
                      </Badge>
                      <Text fontSize="sm" color="gray.500">
                        {new Date(item.publishedAt).toLocaleDateString()}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        {item.author}
                      </Text>
                    </Flex>

                    <Text
                      fontWeight="semibold"
                      fontSize="xl"
                      mb={2}
                      minHeight="3rem"
                    >
                      {item.title}
                    </Text>

                    <Text color="gray.600" noOfLines={3}>
                      {item.description}
                    </Text>
                  </Box>
                </Link>
              </Box>
            ))
          ) : (
            <Box display="flex" justifyContent="center" mt={10} color="red.600">
              <Spinner size="lg" />
            </Box>
          )}
        </SimpleGrid>
        {loading && (
          <Box display="flex" justifyContent="center"  mt={10} mb={10} color="red.600">
            <Spinner size="lg" p={10} />
          </Box>
        )}
        {newsData && newsData.length === 0 && (
          <Box p={6}>
            <Text
              fontWeight="semibold"
              fontSize="xl"
              mb={2}
              minHeight="3rem"
              color="red.300"
              align={'center'}
            >
              NEWS NOT FOUND
            </Text>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default Newswala;
