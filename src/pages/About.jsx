import React from "react";
import styled from "styled-components";

// Styled Components

const Navbar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgb(25, 22, 60);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: rgb(206, 113, 105);
  text-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;

  a {
    color: rgb(206, 113, 105);
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;
    transition: color 0.3s;

    &:hover {
      color: #ffffff;
    }
  }
`;

const AboutSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 100vh;
  padding: 2rem;
  background: rgb(25, 22, 60);
  color: #ffffff;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: rgb(206, 113, 105);
  margin-bottom: 1rem;
  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  max-width: 800px;
  margin-bottom: 2rem;
  color: #e0e7ff;
`;

const Highlight = styled.span`
  color: rgb(206, 113, 105);
  font-weight: bold;
`;

const Button = styled.button`
  padding: 1rem 2.5rem;
  font-size: 1rem;
  background: linear-gradient(45deg, rgb(206, 113, 105), #d97706);
  color: #ffffff;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
`;

const About = () => {
  return (
    <>
      <Navbar>
        <Logo>Placement Pulse</Logo>
        <NavLinks>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/register">Signup</a>
          </li>
          <li>
            <a href="/about">About Us</a>
          </li>
        </NavLinks>
      </Navbar>

      <AboutSection>
        <Title>About Placement Pulse</Title>
        <Description>
          Welcome to <Highlight>Placement Pulse</Highlight>, your ultimate
          solution for seamless placement management. Our platform combines{" "}
          <Highlight>cutting-edge technology</Highlight> with an intuitive
          interface to empower students, recruiters, and administrators alike.
          Whether you're a student preparing for your dream job or an
          administrator organizing placements,{" "}
          <Highlight>Placement Pulse</Highlight> is here to simplify the
          process.
        </Description>
      </AboutSection>
    </>
  );
};

export default About;
