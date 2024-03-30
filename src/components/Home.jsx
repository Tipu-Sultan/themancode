import React, { useState, useEffect } from 'react';
import Main from '../home/Main';
import IntroSection from '../home/Skills';
import Projects from '../home/Projects';
import LoadingBar from 'react-top-loading-bar';
import GitHubTimeline from '../miscellaneous/GithubTimeline';
import Location from '../miscellaneous/Location';

import Layout from './Layout';

const Home = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let startTime = performance.now();
    const timeout = 3000; // Adjust this to the expected loading time in milliseconds

    // Simulate loading time
    const simulateLoading = () => {
      const currentTime = performance.now();
      const elapsedTime = currentTime - startTime;

      if (elapsedTime >= timeout) {
        setProgress(100);
      } else {
        setProgress((elapsedTime / timeout) * 100);
        requestAnimationFrame(simulateLoading);
      }
    };

    simulateLoading();
  }, []);

  return (
    <div>
      <Layout title={'Home||Themancode'}>
        <LoadingBar color='#3decec' progress={progress} onLoaderFinished={() => setProgress(0)} />
        <Location/>
        <Main/>
        <GitHubTimeline/>
        <Projects />
        <IntroSection />
      </Layout>
    </div>
  );
};

export default Home;
