import React from "react";
import { Box, Tab, Tabs as MUITabs } from "@mui/material";

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const Tabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabs = [
    { label: "Item One", content: "Content for Item One" },
    { label: "Item Two", content: "Content for Item Two" },
    { label: "Item Three", content: "Content for Item Three" },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <MUITabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            id={`simple-tab-${index}`}
            aria-controls={`simple-tabpanel-${index}`}
            disabled={index === value}
          />
        ))}
      </MUITabs>

      {tabs.map((tab, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {tab.content}
        </CustomTabPanel>
      ))}
    </Box>
  );
};

export default Tabs;
