import React from "react";
import { Col, Row, InputGroup, FormControl, Button } from "react-bootstrap";

function SearchBox(props) {
  return (
    <Row className="mb-5">
      <Col sm={8}>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search a GIF..."
            aria-label="Search a GIF..."
            name="search_feature"
            aria-describedby="basic-addon2"
            onChange={props.handleSearchChange}
            value={props.searchValue}
          />
        </InputGroup>

        {/* <input
        type="text"
        className="form-control"
        placeholder="Search"
      /> */}
      </Col>
    </Row>
  );
}

export default SearchBox;
