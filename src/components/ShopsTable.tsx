import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Shop from "./Shop";
import { ColumnProps, ShopProps, ShopsTableProps } from "../utils/props";
import { Typography } from "@mui/material";

const columns: ColumnProps[] = [
  { id: "name", label: "Shop Name" },
  { id: "code", label: "Shop Code" },
  {
    id: "location",
    label: "Location",
  },
  {
    id: "phone",
    label: "Phone Number",
  },
];

export default function ShopsTable({
  shops,
  handleOpenAddModal,
}: ShopsTableProps) {
  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        marginTop: 4,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <TableContainer
        style={{
          maxHeight:
            window.innerWidth > 500
              ? window.innerHeight / 2.2
              : window.innerHeight > 670
              ? window.innerHeight / 1.6
              : window.innerHeight / 2,
          overflowX: "auto",
        }}
      >
        <Table
          stickyHeader
          aria-label="sticky table"
          sx={{
            [`& .${tableCellClasses.root}`]: {
              borderBottom: "none",
            },
          }}
        >
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={column.id}
                  style={{
                    fontWeight: "bold",

                    borderBottom: "1px solid #ddd",
                    borderRight:
                      index < columns.length - 1 ? "1px solid #ddd" : "none",
                  }}
                >
                  <Typography fontSize={{ xs: 12, md: 14 }} fontWeight="bold">
                    {column.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {shops.map((shop) => {
              return (
                <TableRow key={shop.id} hover role="checkbox" tabIndex={-1}>
                  {columns.map((column, columnIndex) => {
                    const props: ShopProps = {
                      shop: shop,
                      column: column,
                      columnIndex: columnIndex,
                      handleOpenAddModal: handleOpenAddModal,
                    };
                    return <Shop key={column.id} {...props} />;
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
