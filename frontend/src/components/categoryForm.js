import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputField from "../components/input";

const CategoryForm = ({ state, handleChange, handleSave, error }) => {
  return (
    <Form>
      <InputField
        name="title"
        label="Title"
        type="text"
        onChange={handleChange}
        value={state?.title || ""}
        error={error?.title || null}
      />
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={10}
          placeholder="Description"
          onChange={handleChange}
          value={state?.description || ""}
        />
        {error && (
          <Form.Text className="text-danger" id={error.description}>
            {error.description}
          </Form.Text>
        )}
      </Form.Group>
      <div className="d-grid gap-2">
        <Button onClick={handleSave}>Save</Button>
      </div>
    </Form>
  );
};

export default CategoryForm;
