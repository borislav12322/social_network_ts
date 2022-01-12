import React from "react";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import {loginTC} from "../redux/auth-reducer";

export const LoginFormik = () => {

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        // validate: (values) => {
        //     const errors: Partial<Omit<LoginParamsType, 'captcha'>> = {};
        //     if (!values.email) {
        //         errors.email = 'Required';
        //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        //         errors.email = 'Invalid email address';
        //     }
        //
        //     if (!values.password) {
        //         errors.password = 'Required'
        //     } else if (values.password.length < 3) {
        //         errors.password = 'Invalid password';
        //     }
        //     return errors;
        // },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            dispatch(loginTC(values))
            formik.resetForm();
        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <input type="email" {...formik.getFieldProps('email')}/>
                <input type="password" {...formik.getFieldProps('password')}/>
                <button type={'submit'}></button>
            </form>
        </div>
    )
}