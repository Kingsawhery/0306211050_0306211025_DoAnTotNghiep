import { Container, Table } from "react-bootstrap";

const TableCategory = (props) => {
  const { data, setTab, tabName, setTabName } = props;
  console.log(data);
  //
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((item, index) => {
            return (
              <tr
                key={index}
                onClick={() => {
                  setTab({ tab: 1, id: item.id });
                  setTabName({ ...tabName, category: item.name });
                }}
              >
                <td>{index + 1 + (data.currentPage - 1) * 10}</td>
                <td>{item.name}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
export default TableCategory;
