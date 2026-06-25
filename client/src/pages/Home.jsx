// src/pages/Home.jsx

import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/HeroSection';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Ankit Kumar — Full Stack Developer</title>
        <meta
          name="description"
          content="BCA graduate and Full Stack Developer skilled in MERN, Java, PHP, and MySQL. Open to entry-level Software Engineer roles."
        />
      </Helmet>
      <HeroSection />
    </>
  );
}
