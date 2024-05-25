// CustomTabs.js
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";

const CustomTabs = ({ tabLabels, tabContents }) => {
  return (
    <Tabs>
      <TabList>
        {tabLabels.map((label, index) => (
          <Tab key={index}>{label}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {tabContents.map((content, index) => (
          <TabPanel key={index}>
            <Box
              position="relative"
              paddingBottom="56.25%" // 16:9 aspect ratio
              height="0"
              overflow="hidden">
              {content}
            </Box>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default CustomTabs;
