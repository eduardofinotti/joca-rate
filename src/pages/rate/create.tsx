import { Create, ImageField, useForm, useSelect } from "@refinedev/antd";
import { useOne } from "@refinedev/core";
import { Form, Rate, Row, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useParams } from "react-router-dom";
import { AppIcon } from "../../components/app-icon";
import React from "react";
import { Button, Flex } from 'antd';
import { useUpdate } from "@refinedev/core";

const { Title, Paragraph } = Typography;

export const RateCreate = () => {

  const { mutate } = useUpdate();

  const { formProps, saveButtonProps, onFinish } = useForm({
    resource: "rate",
    action: "create",
    successNotification: false,
    redirect: "show",
  });

  saveButtonProps.style = {
    ...saveButtonProps.style,
    display: "none",
  }
  const { id } = useParams()

  const { data, error, isError, isLoading } = useOne({
    resource: "services",
    id: id,
    successNotification: false
  });

  const product = data?.data;

  const [rateField, setRateField] = React.useState(0);
  const [descriptionField, setDescriptionField] = React.useState('');

  const onSubmit = (e: any) => {
    setRateField(0);
    setDescriptionField('');

    onFinish({ rate: rateField, description: descriptionField, serviceId: id });

    const actualRate = product?.rate ?? 0;
    const actualQtdRate = product?.qtdRate ?? 0;

    mutate({
      successNotification: (data, values, resource) => {
        return {
          message: `Sucesso.`,
          description: "Avaliação enviada",
          type: "success",
        };
      },
      resource: "services",
      values: {
        rate: actualRate + rateField,
        qtdRate: actualQtdRate + 1,
      },
      id: `${id}`,
    });

    // window.location.reload();
  };

  return (
    <div style={{ height: "100vh", backgroundColor: "#F8F8F8", alignItems: "center", justifyContent: "center" }}>
      {product?.name && !isLoading &&
        <Flex style={{ height: "100%", alignItems: "center", justifyContent: "center", backgroundColor: "#CCCCCC0E" }}>
          <Create saveButtonProps={saveButtonProps} goBack={false} title="">
            <Row style={{ alignItems: "center", justifyContent: "center", margin: 50 }}>
              <AppIcon />
              <Title level={3} style={{ marginLeft: 30, marginTop: 10 }}>Avaliação de serviço</Title>
            </Row>

            <Row style={{ alignItems: "center", marginBottom: 30 }}>
              <ImageField value={product?.logo ?? ""} width={80} />
              <Title level={3} style={{ marginLeft: 30 }}>{product?.name ?? ""}</Title>
            </Row>

            <Form {...formProps} layout="vertical" onFinish={onSubmit}>
              <Form.Item
                label={"Nota"}
                name={["rate"]}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Rate
                  onChange={(e) => setRateField(e.valueOf())}
                  value={rateField}
                />
              </Form.Item>
              <Form.Item
                label={"Comentário"}
                name={["description"]}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <TextArea
                  rows={4}
                  value={descriptionField}
                  onChange={(e) => setDescriptionField(e.target.value)}
                />
              </Form.Item>
              <Button htmlType="submit" style={{ width: 200, marginBottom: 20 }}>Avaliar</Button>
            </Form>
          </Create>
        </Flex>
      }
      {!product?.name && !isLoading &&
        <Row style={{ alignItems: "center", justifyContent: "center", marginBottom: 30 }}>
          <AppIcon />
          <Title level={3} style={{ marginLeft: 30, marginTop: 10 }}>Prestador de serviço não encontrado</Title>
        </Row>
      }

      {isLoading &&
        <Row style={{ alignItems: "center", justifyContent: "center", marginBottom: 30 }}>
          <AppIcon />
          <Title level={3} style={{ marginLeft: 30, marginTop: 10 }}>Carregando...</Title>
        </Row>
      }
    </div>
  );
};
