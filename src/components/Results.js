import React from "react";
import { connect } from "react-redux";
import { Col, Row, Image } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { startOver } from "../actions/gif";
import PropTypes from "prop-types";

const Results = ({ favoriteGif, totalgiphy, startOver, authenticated }) => {
  const totalGiphyWiderness = favoriteGif
    .map((data, index) => {
      return data.weirdnessLevel;
    })
    .reduce((a, b) => a + b, 0);

  const totalGiphyWierdness = Math.round(totalGiphyWiderness / 4);
  let searchTermUsed = false;
  searchTermUsed =
    favoriteGif &&
    favoriteGif.some((data, index) => {
      return data.authenticated === true;
    });

  if (searchTermUsed === false) {
    return <Redirect to="/" />;
  }
  return (
    <Col sm={12}>
      <Row>
        <Col className="bg-light" sm={12}>
          <h2 className="py-5 px-3">Wierdness Calculator</h2>
        </Col>
      </Row>
      <Row>
        <Col className="py-5 text-center" sm={12}>
          <h3>
            You Scored an {totalGiphyWierdness} out of 10 on the wierdness
            scale!
          </h3>
        </Col>
      </Row>
      <Row>
        <Col className="py-5 text-left" sm={12}>
          <h3>The GIFS you liked</h3>
        </Col>
      </Row>
      <Row>
        {favoriteGif &&
          favoriteGif.length > 0 &&
          favoriteGif.map((data, index) => (
            <Col className="text-center" key={index} sm={3}>
              <h4>{data.username}</h4>
              <Image
                className="mb-3"
                src={data.images.fixed_height_small.url}
                thumbnail
              />
            </Col>
          ))}

        {
          <Col className="text-center" sm={12}>
            <Link to="/" className="mb-4 btn btn-primary" onClick={startOver}>
              <span>Start Over</span>
            </Link>
            <Link to="/" className="ml-3 mb-4 btn btn-outline-danger">
              <span> Go Back</span>
            </Link>
          </Col>
        }
      </Row>
    </Col>
  );
};

Results.propTypes = {
  favoriteGif: PropTypes.array.isRequired,
  startOver: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  favoriteGif: state.gif_reducer
});

export default connect(
  mapStateToProps,
  { startOver }
)(Results);
