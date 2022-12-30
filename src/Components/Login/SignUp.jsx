import React from "react";
import { Button, Form, Input, Select } from "antd";
import Typography from "@mui/material/Typography";
import {
    Upload,
  } from 'antd';

import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@mui/icons-material";


const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const SignUp = () => {
  let navigate = useNavigate();
  let userData = [];

  const [form] = Form.useForm();

  const onFinish = (values) => {
    userData.push(values);
    localStorage.setItem("userData", JSON.stringify(userData));
    navigate("/");
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="91">+91</Option>
        <Option value="0">+0</Option>
      </Select>
    </Form.Item>
  );

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  

  return (
    <div style={{width: "80%", height:'100vh' }}>
      <Typography
        variant="h3"
        gutterBottom
        textAlign="center"
        marginLeft="20%"
        marginBottom="6%"
        marginTop='2rem'
      >
        Register to access latest NEWS
      </Typography>
      <Form
        {...formItemLayout}
        form={form}
        width=""
        name="register"
        onFinish={onFinish}
        initialValues={{
          prefix: "91",
        }}
        scrollToFirstError
      >
        <Form.Item
          name="Name"
          label="Name"
          tooltip="What others generally call you?"
          rules={[
            {
              required: true,
              message: "Please input your name!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item
        name="Upload"
        label="Upload a profile picture"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="Select a profile Picture"
      >
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined/>}>Click to upload</Button>
        </Upload>
      </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[
            {
              required: true,
              message: "Please select gender!",
            },
          ]}
        >
          <Select placeholder="select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default SignUp;
