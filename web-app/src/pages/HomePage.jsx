import React, { useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import { useDispatch } from 'react-redux';
import { loginGoogle } from '../slice/authentication';
import { toast } from 'react-toastify';
import Hero from '../components-ATI/homepage/Hero';
import WhyChoose from '../components-ATI/homepage/WhyChoose';
import Partners from '../components-ATI/homepage/Partners';
import AIIELTS from '../components-ATI/homepage/AIIELTS';
import SkillsCourses from '../components-ATI/homepage/SkillsCourses';
import Testimonials from '../components-ATI/homepage/Testimonials';
import CTASection from '../components-ATI/homepage/CTASection';


const HomePage = () => {
    const dispatch = useDispatch();
    const isProcessingRef = useRef(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        if (code && !isProcessingRef.current) {
            isProcessingRef.current = true;

            window.history.replaceState({}, "", "/");

            (async () => {
                try {
                    await dispatch(loginGoogle(code)).unwrap();
                    toast.success("Đăng nhập thành công");
                } catch {
                    toast.error("Đăng nhập thất bại");
                } finally {
                    isProcessingRef.current = false;
                }
            })();
        }
    }, [dispatch]);

    return (
        <div>
            <Hero />
            <WhyChoose />
            <Partners />
            <AIIELTS />
            <SkillsCourses />
            <Testimonials />
            <CTASection />
        </div>
    );
};

export default HomePage;