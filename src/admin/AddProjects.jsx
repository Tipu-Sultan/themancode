import {
    Button,
    Container,
    Heading,
    Input,
    VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';

const AddProjects = () => {
    const HOST = process.env.REACT_APP_API_HOST
    const { id } = useParams();
    const [projectData, setProjectData] = useState({
        project_name: '',
        link: '',
        banner: '',
        tools: '',
    });
    const [wait, setWait] = useState(false);

    useEffect(() => {
        // If 'id' is provided, fetch project data for updating
        const fetchProjectData = async () => {
            try {
                const response = await axios.get(`${HOST}/api/project/${id}`);
                setProjectData(response.data);
            } catch (error) {
                console.error('Error fetching project data:', error);
            }
        };

        if (id) {
            fetchProjectData();
        }
    }, [HOST, id]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setProjectData((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setWait(true);

        try {
            // Determine whether it's an add or update operation based on 'id'
            const apiUrlRes = id ? axios.put(`${HOST}/api/project/${id}`, projectData) : axios.post(`${HOST}/api/project`, projectData);
            const response = await apiUrlRes
            toast.success(response.data.message);
            setWait(false);

        } catch (error) {
            toast.error(error.response.data.error);
            setWait(false);
        }
    };


    return (
        <Layout>
            <Container maxW={'container.xl'} h={'100vh'} p={'16'}>
                <form onSubmit={handleFormSubmit}>
                    <VStack
                        alignItems={'stretch'}
                        spacing={'8'}
                        w={['full', '96']}
                        m={'auto'}
                        my={'16'}
                    >
                        <Heading textAlign={'center'}>
                            {id ? 'Update Project' : 'Add Your Project'}
                        </Heading>
                        <Input
                            placeholder={'Add project name'}
                            type={'text'}
                            required
                            focusBorderColor={'purple.500'}
                            onChange={handleInput}
                            value={projectData.project_name}
                            name="project_name"
                        />

                        <Input
                            placeholder={'Add Project link'}
                            type={'text'}
                            required
                            focusBorderColor={'purple.500'}
                            onChange={handleInput}
                            value={projectData.link}
                            name="link"
                        />

                        <Input
                            placeholder={'Add banner link'}
                            type={'text'}
                            required
                            focusBorderColor={'purple.500'}
                            onChange={handleInput}
                            value={projectData.banner}
                            name="banner"
                        />

                        <Input
                            placeholder={'Add tools or languages'}
                            type={'text'}
                            required
                            focusBorderColor={'purple.500'}
                            onChange={handleInput}
                            value={projectData.tools}
                            name="tools"
                        />
                        <Button colorScheme={'purple'} type={'submit'} isLoading={wait}>
                            {wait ? 'Please wait..' : id ? 'Update' : 'Add'}
                        </Button>
                    </VStack>
                </form>
            </Container>
        </Layout>
    );
};

export default AddProjects;