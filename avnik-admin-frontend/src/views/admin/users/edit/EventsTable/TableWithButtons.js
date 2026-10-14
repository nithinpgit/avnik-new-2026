// ** React Imports
import { Fragment, useState, useEffect, forwardRef } from "react";

// ** Add New Modal Component
import AddNewModal from "./AddNewModal";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import {
  ChevronDown,
  Share,
  Printer,
  FileText,
  File,
  Grid,
  Copy,
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash,
  ShieldOff,
  Calendar,
} from "react-feather";
import {
  Card,
  CardHeader,
  CardTitle,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  UncontrolledDropdown,
  InputGroup,
  InputGroupText,
  Label,
  Row,
  Badge,
  Col,
} from "reactstrap";
import { APIService } from "../../../../../Api/APIService";
import moment from "moment";
import { useParams, NavLink } from "react-router-dom";
// ** Custom Components
import Avatar from "@components/avatar";
import { setCustomProfileAvatar } from "../../../../../Api/utility";
import { columns } from "./data";
// ** Vars
const states = [
  "success",
  "danger",
  "warning",
  "info",
  "dark",
  "primary",
  "secondary",
];

const status = {
  1: { title: "paused", color: "light-primary" },
  2: { title: "started", color: "light-success" },
  3: { title: "Ended", color: "light-danger" },
};

const DataTableWithButtons = ({ selectedUser }) => {
  // ** States
  const [modal, setModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [limit, setLimit] = useState(20);
  const [searchValue, setSearchValue] = useState("");
  const [viewEvent, setViewEvent] = useState("Booking");
  const [dataLoading, setDataLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [preloader, setPreloader] = useState(false);

  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal);
  const { id } = useParams();

  const getAllEvents = () => {
    setPreloader(true);
    setDataLoading(true);
    APIService.adminUserAllEvents({ userId: id })
      .then((res) => {
        setPreloader(false);
        setDataLoading(false);
        if (res.data.status == 200) {
          setData(res.data.data);
        }
      })
      .catch((error) => {
        setPreloader(false);
        setDataLoading(false);
        console.log(error);
      });
  };
  const getAllBookedEvents = () => {
    setPreloader(true);
    setDataLoading(true);
    APIService.adminUserEventsBookings({ userId: id })
      .then((res) => {
        setPreloader(false);
        setDataLoading(false);
        if (res.data.status == 200) {
          setData(res.data.data);
        }
      })
      .catch((error) => {
        setPreloader(false);
        setDataLoading(false);
        console.log(error);
      });
  };
  const handleBooking = (type) => {
    
    if (type === "Booking") {
      getAllBookedEvents();
    } else if (type === "Hosted") {
      getAllEvents();
    }
    setTimeout(() => {
      setViewEvent(type);
    }, 2000);

  };
  useEffect(() => {
    handleBooking("Booking");
    return () => {};
  }, []);
  // ** Function to handle Modal toggle
  // const handleModal = () => setModal(!modal)

  // ** Function to handle filter
  const handleFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    setSearchValue(value);

    const status = {
      1: { title: "Current", color: "light-primary" },
      2: { title: "Professional", color: "light-success" },
      3: { title: "Rejected", color: "light-danger" },
      4: { title: "Resigned", color: "light-warning" },
      5: { title: "Applied", color: "light-info" },
    };

    if (value.length) {
      updatedData = data.filter((item) => {
        const startsWith =
          item.event_title.toLowerCase().startsWith(value.toLowerCase()) ||
          item.event_type.toLowerCase().startsWith(value.toLowerCase());

        const includes =
          item.event_title.toLowerCase().includes(value.toLowerCase()) ||
          item.event_type.toLowerCase().includes(value.toLowerCase());

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
      setFilteredData(updatedData);
      setSearchValue(value);
    }
  };

  // ** Function to handle Pagination
  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={
        searchValue.length
          ? filteredData.length / limit
          : data.length / limit || 1
      }
      breakLabel="..."
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      nextLinkClassName="page-link"
      nextClassName="page-item next"
      previousClassName="page-item prev"
      previousLinkClassName="page-link"
      pageLinkClassName="page-link"
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1"
    />
  );

  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(data[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv === null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
          <CardTitle tag="div">
            <InputGroup className="input-group-merge">
            <div className="input-group-append">
                <InputGroupText>
                  <Search size={15} />
                </InputGroupText>
              </div>
              <Input
                className="dataTable-filter "
                type="text"
                bsSize="md"
                id="search-input"
                placeholder="Search"
                value={searchValue}
                onChange={handleFilter}
              />
            </InputGroup>
          </CardTitle>
          <div className="d-flex mt-md-0 mt-1">
            {/* <UncontrolledButtonDropdown>
              <DropdownToggle color='secondary' caret outline>
                <Share size={15} />
                <span className='align-middle ml-50'>Export</span>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem className='w-100'>
                  <Printer size={15} />
                  <span className='align-middle ml-50'>Print</span>
                </DropdownItem>
                <DropdownItem className='w-100' onClick={() => downloadCSV(data)}>
                  <FileText size={15} />
                  <span className='align-middle ml-50'>CSV</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <Grid size={15} />
                  <span className='align-middle ml-50'>Excel</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <File size={15} />
                  <span className='align-middle ml-50'>PDF</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <Copy size={15} />
                  <span className='align-middle ml-50'>Copy</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown> */}
            {viewEvent === "Hosted" ? (
              dataLoading ? (
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <Button
                  className="ml-2"
                  color="primary"
                  onClick={() => handleBooking("Booking")}
                >
                  <Calendar size={15} />
                  <span className="align-middle ml-50">View Bookings</span>
                </Button>
              )
            ) : viewEvent === "Booking" ? (
              dataLoading ? (
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <Button
                  className="ml-2"
                  color="primary"
                  onClick={() => handleBooking("Hosted")}
                >
                  <Calendar size={15} />
                  <span className="align-middle ml-50">View Hosted</span>
                </Button>
              )
            ) : (
              ""
            )}
          </div>
        </CardHeader>

        <DataTable
          hover
          noHeader
          pagination
          columns={columns}
          paginationPerPage={limit}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          paginationComponent={CustomPagination}
          data={searchValue.length ? filteredData : data}
        />
      </Card>
      <AddNewModal open={modal} handleModal={handleModal} />
    </Fragment>
  );
};

export default DataTableWithButtons;
