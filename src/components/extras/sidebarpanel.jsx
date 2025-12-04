import React, { useState } from "react";
import {
  Tabs,
  Form,
  Select,
  Switch,
  Button,
  ColorPicker,
  Slider,
  Input,
  Space,
  Divider,
  Typography,
  Collapse,
  Radio,
  Upload,
  message,
} from "antd";
import {
  SettingOutlined,
  BgColorsOutlined,
  PictureOutlined,
  DollarOutlined,
  FileTextOutlined,
  FilterOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useContent } from "@/context/ContentContext";

const { Title, Text } = Typography;
const { Panel } = Collapse;
const { TextArea } = Input;

const SidebarPanel = () => {
  const { content, setContent } = useContent();
  const [activeTab, setActiveTab] = useState("header");
  const [form] = Form.useForm();

  // Initialize form values when content changes
  React.useEffect(() => {
    if (content) {
      form.setFieldsValue(content);
    }
  }, [content, form]);

  const handleFormChange = (changedValues, allValues) => {
    setContent(allValues);
  };

  // Header Controls Component
  const HeaderControls = () => (
    <Form
      form={form}
      layout="vertical"
      initialValues={content}
      onValuesChange={handleFormChange}
      name="headerForm"
    >
      <Title level={4}>
        <MenuOutlined /> Header Settings
      </Title>

      <Form.Item label="Header Variant" name={["header", "variant"]}>
        <Radio.Group>
          <Radio value="1">Variant 1</Radio>
          <Radio value="2">Variant 2</Radio>
          <Radio value="3">Variant 3</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Logo Style" name={["header", "logoStyle"]}>
        <Select>
          <Select.Option value="default">Default</Select.Option>
          <Select.Option value="rounded">Rounded</Select.Option>
          <Select.Option value="square">Square</Select.Option>
          <Select.Option value="text-only">Text Only</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Navbar Position" name={["header", "navbarPosition"]}>
        <Radio.Group>
          <Radio value="left">Left</Radio>
          <Radio value="center">Center</Radio>
          <Radio value="right">Right</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Background Pattern"
        name={["header", "backgroundPattern"]}
      >
        <Select>
          <Select.Option value="none">None</Select.Option>
          <Select.Option value="dots">Dots</Select.Option>
          <Select.Option value="lines">Lines</Select.Option>
          <Select.Option value="grid">Grid</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Text Color" name={["header", "textColor"]}>
        <ColorPicker />
      </Form.Item>

      <Collapse ghost>
        <Panel header="Extra Options" key="header-extra">
          <Space direction="vertical" style={{ width: "100%" }}>
            <Form.Item name={["header", "sticky"]} valuePropName="checked">
              <Switch checkedChildren="Sticky" unCheckedChildren="Not Sticky" />
            </Form.Item>
            <Form.Item name={["header", "blur"]} valuePropName="checked">
              <Switch checkedChildren="Blur" unCheckedChildren="No Blur" />
            </Form.Item>
            <Form.Item name={["header", "shadow"]} valuePropName="checked">
              <Switch checkedChildren="Shadow" unCheckedChildren="No Shadow" />
            </Form.Item>
          </Space>
        </Panel>
      </Collapse>
    </Form>
  );

  // Hero Controls Component
  const HeroControls = () => (
    <Form
      form={form}
      layout="vertical"
      initialValues={content}
      onValuesChange={handleFormChange}
      name="heroForm"
    >
      <Title level={4}>
        <PictureOutlined /> Hero Settings
      </Title>

      <Form.Item label="Hero Variant" name={["hero", "variant"]}>
        <Radio.Group>
          <Radio value="1">Variant 1</Radio>
          <Radio value="2">Variant 2</Radio>
          <Radio value="3">Variant 3</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Background Pattern"
        name={["hero", "backgroundPattern"]}
      >
        <Select>
          <Select.Option value="none">None</Select.Option>
          <Select.Option value="dots">Dots</Select.Option>
          <Select.Option value="lines">Lines</Select.Option>
          <Select.Option value="gradient">Gradient</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Title Highlight Color"
        name={["hero", "titleHighlightColor"]}
      >
        <ColorPicker />
      </Form.Item>

      <Form.Item label="Image Style" name={["hero", "imageStyle"]}>
        <Select>
          <Select.Option value="left">Left</Select.Option>
          <Select.Option value="right">Right</Select.Option>
          <Select.Option value="background">Background</Select.Option>
        </Select>
      </Form.Item>

      <Collapse ghost>
        <Panel header="Image Options" key="hero-image">
          <Space direction="vertical" style={{ width: "100%" }}>
            <Form.Item name={["hero", "imageMask"]} valuePropName="checked">
              <Switch checkedChildren="Mask" unCheckedChildren="No Mask" />
            </Form.Item>
            <Form.Item name={["hero", "imageShadow"]} valuePropName="checked">
              <Switch checkedChildren="Shadow" unCheckedChildren="No Shadow" />
            </Form.Item>
          </Space>
        </Panel>
        <Panel header="Button Options" key="hero-button">
          <Form.Item label="Button Style" name={["hero", "buttonStyle"]}>
            <Select>
              <Select.Option value="primary">Primary</Select.Option>
              <Select.Option value="secondary">Secondary</Select.Option>
              <Select.Option value="outline">Outline</Select.Option>
              <Select.Option value="ghost">Ghost</Select.Option>
            </Select>
          </Form.Item>
        </Panel>
        <Panel header="Badge Options" key="hero-badge">
          <Form.Item name={["hero", "showBadges"]} valuePropName="checked">
            <Switch checkedChildren="Show" unCheckedChildren="Hide" />
          </Form.Item>
        </Panel>
      </Collapse>
    </Form>
  );

  // Content Section Controls Component
  const ContentSectionControls = () => (
    <Form
      form={form}
      layout="vertical"
      initialValues={content}
      onValuesChange={handleFormChange}
      name="contentForm"
    >
      <Title level={4}>
        <FileTextOutlined /> Content Section Settings
      </Title>

      <Form.Item label="Layout Variant" name={["contentSection", "variant"]}>
        <Radio.Group>
          <Radio value="1">Layout 1</Radio>
          <Radio value="2">Layout 2</Radio>
          <Radio value="3">Layout 3</Radio>
          <Radio value="4">Layout 4</Radio>
          <Radio value="5">Layout 5</Radio>
          <Radio value="6">Layout 6</Radio>
          <Radio value="7">Layout 7</Radio>
          <Radio value="8">Layout 8</Radio>
          <Radio value="9">Layout 9</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Background Pattern"
        name={["contentSection", "backgroundPattern"]}
      >
        <Select>
          <Select.Option value="none">None</Select.Option>
          <Select.Option value="dots">Dots</Select.Option>
          <Select.Option value="lines">Lines</Select.Option>
          <Select.Option value="grid">Grid</Select.Option>
        </Select>
      </Form.Item>

      <Collapse ghost>
        <Panel header="Feature Cards" key="content-cards">
          <Space direction="vertical" style={{ width: "100%" }}>
            <Form.Item
              label="Card Style"
              name={["contentSection", "cardStyle"]}
            >
              <Select>
                <Select.Option value="default">Default</Select.Option>
                <Select.Option value="outlined">Outlined</Select.Option>
                <Select.Option value="shadow">Shadow</Select.Option>
                <Select.Option value="borderless">Borderless</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name={["contentSection", "showIcons"]}
              valuePropName="checked"
            >
              <Switch
                checkedChildren="Show Icons"
                unCheckedChildren="Hide Icons"
              />
            </Form.Item>
          </Space>
        </Panel>

        <Panel header="Layout Options" key="content-layout">
          <Space direction="vertical" style={{ width: "100%" }}>
            <Form.Item
              name={["contentSection", "accordionMode"]}
              valuePropName="checked"
            >
              <Switch checkedChildren="Accordion" unCheckedChildren="Regular" />
            </Form.Item>
            <Form.Item label="Spacing" name={["contentSection", "spacing"]}>
              <Radio.Group>
                <Radio value="compact">Compact</Radio>
                <Radio value="normal">Normal</Radio>
                <Radio value="large">Large</Radio>
              </Radio.Group>
            </Form.Item>
          </Space>
        </Panel>

        <Panel header="Pricing Options" key="content-pricing">
          <Space direction="vertical" style={{ width: "100%" }}>
            <Form.Item
              label="Pricing Card Shape"
              name={["contentSection", "pricingCardShape"]}
            >
              <Select>
                <Select.Option value="default">Default</Select.Option>
                <Select.Option value="rounded">Rounded</Select.Option>
                <Select.Option value="sharp">Sharp</Select.Option>
              </Select>
            </Form.Item>
          </Space>
        </Panel>

        <Panel header="Divider Options" key="content-divider">
          <Form.Item
            label="Divider Style"
            name={["contentSection", "dividerStyle"]}
          >
            <Select>
              <Select.Option value="solid">Solid</Select.Option>
              <Select.Option value="dashed">Dashed</Select.Option>
              <Select.Option value="dotted">Dotted</Select.Option>
              <Select.Option value="none">None</Select.Option>
            </Select>
          </Form.Item>
        </Panel>
      </Collapse>
    </Form>
  );

  // Pricing Controls Component
  const PricingControls = () => (
    <Form
      form={form}
      layout="vertical"
      initialValues={content}
      onValuesChange={handleFormChange}
      name="pricingForm"
    >
      <Title level={4}>
        <DollarOutlined /> Pricing Settings
      </Title>

      <Form.Item label="Price Style" name={["pricing", "priceStyle"]}>
        <Select>
          <Select.Option value="default">Default</Select.Option>
          <Select.Option value="minimal">Minimal</Select.Option>
          <Select.Option value="highlighted">Highlighted</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Popular Badge Style" name={["pricing", "badgeStyle"]}>
        <Select>
          <Select.Option value="default">Default</Select.Option>
          <Select.Option value="corner">Corner</Select.Option>
          <Select.Option value="stripe">Stripe</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Button Styles" name={["pricing", "buttonStyle"]}>
        <Select>
          <Select.Option value="primary">Primary</Select.Option>
          <Select.Option value="secondary">Secondary</Select.Option>
          <Select.Option value="outline">Outline</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Currency" name={["pricing", "currency"]}>
        <Select>
          <Select.Option value="$">$ USD</Select.Option>
          <Select.Option value="€">€ EUR</Select.Option>
          <Select.Option value="£">£ GBP</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Period" name={["pricing", "period"]}>
        <Radio.Group>
          <Radio value="monthly">Monthly</Radio>
          <Radio value="yearly">Yearly</Radio>
          <Radio value="both">Both</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="CTA Text" name={["pricing", "ctaText"]}>
        <Input placeholder="Get Started" />
      </Form.Item>
    </Form>
  );

  // Footer Controls Component
  const FooterControls = () => (
    <Form
      form={form}
      layout="vertical"
      initialValues={content}
      onValuesChange={handleFormChange}
      name="footerForm"
    >
      <Title level={4}>
        <FilterOutlined /> Footer Settings
      </Title>

      <Form.Item label="Footer Variant" name={["footer", "variant"]}>
        <Radio.Group>
          <Radio value="1">Variant 1</Radio>
          <Radio value="2">Variant 2</Radio>
          <Radio value="3">Variant 3</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Columns" name={["footer", "columns"]}>
        <Select>
          <Select.Option value="1">1 Column</Select.Option>
          <Select.Option value="2">2 Columns</Select.Option>
          <Select.Option value="3">3 Columns</Select.Option>
          <Select.Option value="4">4 Columns</Select.Option>
        </Select>
      </Form.Item>

      <Collapse ghost>
        <Panel header="Social Icons" key="footer-social">
          <Space direction="vertical" style={{ width: "100%" }}>
            <Form.Item
              name={["footer", "showSocialIcons"]}
              valuePropName="checked"
            >
              <Switch checkedChildren="Show" unCheckedChildren="Hide" />
            </Form.Item>
            <Form.Item label="Icon Style" name={["footer", "iconStyle"]}>
              <Select>
                <Select.Option value="default">Default</Select.Option>
                <Select.Option value="colored">Colored</Select.Option>
                <Select.Option value="monochrome">Monochrome</Select.Option>
              </Select>
            </Form.Item>
          </Space>
        </Panel>

        <Panel header="Background Options" key="footer-bg">
          <Form.Item
            label="Background Color"
            name={["footer", "backgroundColor"]}
          >
            <ColorPicker />
          </Form.Item>
        </Panel>

        <Panel header="Divider" key="footer-divider">
          <Form.Item name={["footer", "showDivider"]} valuePropName="checked">
            <Switch checkedChildren="Show" unCheckedChildren="Hide" />
          </Form.Item>
        </Panel>

        <Panel header="Copyright" key="footer-copyright">
          <Form.Item label="Copyright Text" name={["footer", "copyrightText"]}>
            <TextArea
              rows={2}
              placeholder="© 2023 Your Company. All rights reserved."
            />
          </Form.Item>
        </Panel>
      </Collapse>
    </Form>
  );

  // Theme Controls Component
  const ThemeControls = () => (
    <Form
      form={form}
      layout="vertical"
      initialValues={content}
      onValuesChange={handleFormChange}
      name="themeForm"
    >
      <Title level={4}>
        <BgColorsOutlined /> Theme Settings
      </Title>

      <Form.Item label="Color Palette" name={["theme", "palette"]}>
        <Select>
          <Select.Option value="default">Default</Select.Option>
          <Select.Option value="ocean">Ocean</Select.Option>
          <Select.Option value="forest">Forest</Select.Option>
          <Select.Option value="sunset">Sunset</Select.Option>
          <Select.Option value="midnight">Midnight</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Primary Color" name={["theme", "primaryColor"]}>
        <ColorPicker />
      </Form.Item>

      <Form.Item label="Secondary Color" name={["theme", "secondaryColor"]}>
        <ColorPicker />
      </Form.Item>

      <Form.Item label="Accent Color" name={["theme", "accentColor"]}>
        <ColorPicker />
      </Form.Item>

      <Form.Item label="Background Color" name={["theme", "backgroundColor"]}>
        <ColorPicker />
      </Form.Item>

      <Form.Item label="Text Color" name={["theme", "textColor"]}>
        <ColorPicker />
      </Form.Item>

      <Collapse ghost>
        <Panel header="Border Radius" key="theme-radius">
          <Form.Item label="Border Radius" name={["theme", "borderRadius"]}>
            <Slider min={0} max={20} />
          </Form.Item>
        </Panel>

        <Panel header="Shadow" key="theme-shadow">
          <Form.Item
            label="Shadow Intensity"
            name={["theme", "shadowIntensity"]}
          >
            <Slider min={0} max={20} />
          </Form.Item>
        </Panel>
      </Collapse>
    </Form>
  );

  const tabItems = [
    {
      key: "header",
      label: (
        <span>
          <MenuOutlined />
          Header
        </span>
      ),
      children: <HeaderControls />,
    },
    {
      key: "hero",
      label: (
        <span>
          <PictureOutlined />
          Hero
        </span>
      ),
      children: <HeroControls />,
    },
    {
      key: "content",
      label: (
        <span>
          <FileTextOutlined />
          Content
        </span>
      ),
      children: <ContentSectionControls />,
    },
    {
      key: "pricing",
      label: (
        <span>
          <DollarOutlined />
          Pricing
        </span>
      ),
      children: <PricingControls />,
    },
    {
      key: "footer",
      label: (
        <span>
          <FilterOutlined />
          Footer
        </span>
      ),
      children: <FooterControls />,
    },
    {
      key: "theme",
      label: (
        <span>
          <BgColorsOutlined />
          Theme
        </span>
      ),
      children: <ThemeControls />,
    },
  ];

  return (
    <div
      className="sidebar-panel"
      style={{
        height: "100%",
        overflow: "auto",
        padding: "16px",
        background: "#f5f5f5",
      }}
    >
      <div style={{ marginBottom: "16px" }}>
        <Title level={3} style={{ margin: 0 }}>
          <SettingOutlined /> Design Controls
        </Title>
        <Text type="secondary">Customize your website appearance</Text>
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        tabPosition="left"
        items={tabItems}
        style={{ height: "calc(100% - 60px)" }}
      />
    </div>
  );
};

export default SidebarPanel;
