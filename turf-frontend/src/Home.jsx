import { Box } from "@chakra-ui/react";
import CustomTabs from "./CustomTabs";
import { VIDEOS_HIPODROMOS } from "./utils";

const Home = () => {
  const labels = ["Palermo", "San Isidro"];
  return (
    <Box>
      <CustomTabs tabLabels={labels} tabContents={VIDEOS_HIPODROMOS} />
    </Box>
  );
};

export default Home;
