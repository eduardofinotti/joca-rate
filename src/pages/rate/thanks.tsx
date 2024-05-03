import { Create, ImageField, useForm, useSelect } from "@refinedev/antd";
import { useOne } from "@refinedev/core";
import { Form, Grid, Rate, Row, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useParams } from "react-router-dom";
import { AppIcon } from "../../components/app-icon";
import React from "react";
import { Button, Flex } from 'antd';

const { Title, Paragraph } = Typography;

export const Thanks = () => {

  return (
    <Flex style={{ height: "100vh", alignItems: "center", justifyContent: "center", backgroundColor: "#260AB219"}}>
      <AppIcon />
      <Title level={3} style={{ marginLeft: 30, marginTop: 10 }}>Obrigado</Title>
    </Flex>
  );
};
