// react
import { useState, SyntheticEvent } from "react";
// react-dom
import { Link } from "react-router-dom";
// mui
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

// ** MUI Imports
import Tab from "@mui/material/Tab";
import MuiTabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { styled } from "@mui/material/styles";
import MuiTabList, { TabListProps } from "@mui/lab/TabList";
// icon
import FormatListCheckbox from "mdi-material-ui/FormatListCheckbox";
import ViewGridOutline from "mdi-material-ui/ViewGridOutline";
import PlusCircle from "mdi-material-ui/PlusCircle";
// components
import ProductList from "./../../sections/apps/ProductList";
import ProductGrid from "./../../sections/apps/ProductGrid";

// Styled TabList component
const TabList = styled(MuiTabList)<TabListProps>(({ theme }) => ({
  "& .MuiTabs-indicator": {
    backgroundColor: "transparent",
  },
  "& .Mui-selected": {
    backgroundColor: "#666CFF",
    color: "#FFFFFF !important",
  },
  "& .MuiTab-root": {
    minHeight: 38,
    minWidth: 110,
    borderRadius: 8,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

const TabPanel = styled(MuiTabPanel)({
  padding: "12px 8px",
});

function Products() {
  // ** State
  const [value, setValue] = useState<string>("list");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Typography variant="h5" fontWeight={600} fontFamily="sans-serif" m={4}>
        Danh sách sản phẩm
      </Typography>
      <Stack
        direction="row-reverse"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Link to="/add">
          <Button
            variant="contained"
            size="medium"
            color="success"
            sx={{ height: 50, mr: 4 }}
            // onClick={gotoAddProduct}
          >
            <PlusCircle sx={{ mr: 1 }} />
            Thêm sản phẩm
          </Button>
        </Link>
      </Stack>

      {/* <Box>
        <Button
          variant="contained"
          size="medium"
          color="success"
          sx={{ ml: "auto", height: 50 }}
        >
          <PlusCircle sx={{ mr: 1 }} />
          Thêm sản phẩm
        </Button>
      </Box> */}

      <Box mx={4}>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label="customized tabs example">
            <Tab value="list" label="Danh sách" icon={<FormatListCheckbox />} />
            <Tab value="gird" label="Dạng lưới" icon={<ViewGridOutline />} />
          </TabList>
          <TabPanel value="list">
            <ProductList />
          </TabPanel>
          <TabPanel value="gird">
            <ProductGrid />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}

export default Products;
