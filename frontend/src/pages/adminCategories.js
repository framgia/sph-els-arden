import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "../components/pagination";
import { UserContext } from "../utils/userContext";

const content = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur leo sit amet lorem rutrum, eget aliquam metus viverra. Maecenas egestas, neque sed placerat dignissim, neque turpis tempus purus, vel pulvinar lacus erat nec mauris. Ut hendrerit gravida ex vehicula sagittis. Pellentesque sollicitudin nulla nec libero porttitor pharetra. Cras tempus tellus non feugiat finibus. Pellentesque fringilla rutrum nisi ut malesuada. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam sem ipsum, euismod eu enim sit amet, rutrum dictum mi. Curabitur cursus sagittis ipsum sed interdum. Class aptent taciti sociosqu ad litora torquent per conubia nostra.",
  },
  {
    id: 2,
    title: "Title 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur leo sit amet lorem rutrum, eget aliquam metus viverra. Maecenas egestas, neque sed placerat dignissim, neque turpis tempus purus, vel pulvinar lacus erat nec mauris. Ut hendrerit gravida ex vehicula sagittis. Pellentesque sollicitudin nulla nec libero porttitor pharetra. Cras tempus tellus non feugiat finibus. Pellentesque fringilla rutrum nisi ut malesuada. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam sem ipsum, euismod eu enim sit amet, rutrum dictum mi. Curabitur cursus sagittis ipsum sed interdum. Class aptent taciti sociosqu ad litora torquent per conubia nostra.",
  },
  {
    id: 3,
    title: "Title 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur leo sit amet lorem rutrum, eget aliquam metus viverra. Maecenas egestas, neque sed placerat dignissim, neque turpis tempus purus, vel pulvinar lacus erat nec mauris. Ut hendrerit gravida ex vehicula sagittis. Pellentesque sollicitudin nulla nec libero porttitor pharetra. Cras tempus tellus non feugiat finibus. Pellentesque fringilla rutrum nisi ut malesuada. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam sem ipsum, euismod eu enim sit amet, rutrum dictum mi. Curabitur cursus sagittis ipsum sed interdum. Class aptent taciti sociosqu ad litora torquent per conubia nostra.",
  },
  {
    id: 4,
    title: "Title 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur leo sit amet lorem rutrum, eget aliquam metus viverra. Maecenas egestas, neque sed placerat dignissim, neque turpis tempus purus, vel pulvinar lacus erat nec mauris. Ut hendrerit gravida ex vehicula sagittis. Pellentesque sollicitudin nulla nec libero porttitor pharetra. Cras tempus tellus non feugiat finibus. Pellentesque fringilla rutrum nisi ut malesuada. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam sem ipsum, euismod eu enim sit amet, rutrum dictum mi. Curabitur cursus sagittis ipsum sed interdum. Class aptent taciti sociosqu ad litora torquent per conubia nostra.",
  },
  {
    id: 5,
    title: "Title 1",
    description: "qwe",
  },
];

const AdminCategories = () => {
  const { user } = useContext(UserContext);
  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Admin | Categories</h1>
          <Table striped bordered hover bgcolor="white">
            <thead className="text-center">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {content.map((category) => (
                <tr key={category.id}>
                  <td className="align-middle">{category.title}</td>
                  <td className="align-middle">{category.description}</td>
                  <td className="align-middle">
                    <div className="d-grid gap-2">
                      <Button size="sm">Add word</Button>
                      <Button size="sm" variant="warning">
                        Edit
                      </Button>
                      <Button size="sm" variant="danger">
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminCategories;
