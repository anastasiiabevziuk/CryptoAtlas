import React from 'react';
import styles from './Footer.module.css';
import SocialLink from '@/components/UI/SocialLink/SocialLink';
import { FaGithub, FaLinkedin, FaBriefcase } from 'react-icons/fa';



const Footer: React.FC = () => {
    const year = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <p className={styles.copy}>© {year} CryptoAtlas Analytics</p>
                </div>

                <div className={styles.socials}>
                    <SocialLink href="https://github.com/anastasiiabevziuk" icon={<FaGithub />} label="GitHub" />
                    <SocialLink href="https://www.upwork.com/freelancers/~01cc86fbcd09ef437d?mp_source=share" icon={<FaBriefcase />} label="Upwork" />
                    <SocialLink href=" https://www.linkedin.com/in/anastasiia-bevziuk-5212b0178/" icon={<FaLinkedin />} label="LinkedIn" />
                </div>
            </div>
        </footer>

    );
};

export default Footer;
