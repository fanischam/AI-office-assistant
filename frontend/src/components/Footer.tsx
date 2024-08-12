import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className='footer text-center text-lg-start'>
        <div className='text-center py-5 fs-5'>
          <p>
            Office Assistant &copy; {currentYear}
            <a
              className='text-body text-decoration-none d-flex justify-content-center align-items-center mt-3'
              href='https://github.com/fanischam/AI-office-assistant'
            >
              {' '}
              <FaGithub />
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
